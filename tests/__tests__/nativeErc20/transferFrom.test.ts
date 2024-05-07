import { NAT } from "../../utils/currency";
import { expect } from "chai";
import { expectWait } from "../../utils/matchers/expectWait";
import { ethers } from "ethers";
import { it } from "../../fixtures/general-fixture";

describe("Native token as ERC-20", () => {
  it("spender can transferFrom an amount within the approved limit", async ({
    eth,
  }) => {
    const APPROVER_BALANCE = NAT(1.5);
    const SPENDER_BALANCE = NAT(0.3);

    const APPROVED_VALUE = NAT(0.8);
    const TRANSFER_FROM_VALUE1 = NAT(0.6);
    const TRANSFER_FROM_VALUE2 = NAT(0.2);

    const approver = await eth.accounts.generate(APPROVER_BALANCE);
    const spender = await eth.accounts.generate(SPENDER_BALANCE);

    const approveTx = await eth.signAndSend(
      eth.assets.NATIVE.connect(approver).approve(
        spender.address,
        APPROVED_VALUE,
      ),
    );

    const transferFromTx = await eth.signAndSend(
      eth.assets.NATIVE.connect(spender).transferFrom(
        approver.address,
        spender.address,
        TRANSFER_FROM_VALUE1,
      ),
    );

    // Assert balances after transferFrom
    let approverBalance = await eth.assets.NATIVE.balanceOf(approver.address);
    expect(approverBalance).to.be.equal(
      APPROVER_BALANCE - TRANSFER_FROM_VALUE1 - approveTx.fee,
    );

    let spenderBalance = await eth.assets.NATIVE.balanceOf(spender.address);
    expect(spenderBalance).to.eq(
      SPENDER_BALANCE + TRANSFER_FROM_VALUE1 - transferFromTx.fee,
    );

    // Assert allowance decreased
    const allowance = await eth.assets.NATIVE.allowance(
      approver.address,
      spender.address,
    );
    expect(allowance).to.eq(APPROVED_VALUE - TRANSFER_FROM_VALUE1);

    // Can transferFrom the remaining amount

    const transferFromRemainingsTx = await eth.signAndSend(
      eth.assets.NATIVE.connect(spender).transferFrom(
        approver.address,
        spender.address,
        TRANSFER_FROM_VALUE2,
      ),
    );
    approverBalance = await eth.assets.NATIVE.balanceOf(approver.address);
    expect(approverBalance).to.eq(
      APPROVER_BALANCE -
        TRANSFER_FROM_VALUE1 -
        TRANSFER_FROM_VALUE2 -
        approveTx.fee,
    );
    spenderBalance = await eth.assets.NATIVE.balanceOf(spender.address);
    expect(spenderBalance).to.eq(
      SPENDER_BALANCE +
        TRANSFER_FROM_VALUE1 +
        TRANSFER_FROM_VALUE2 -
        transferFromTx.fee -
        transferFromRemainingsTx.fee,
    );
  });

  it("transferFrom allows delegated token transfers", async ({ eth }) => {
    const ACCOUNT_BALANCE = NAT(10);

    const APPROVED_VALUE = NAT(10);
    const TRANSFER_VALUE = NAT(5);

    const [approver, spender, recipient] = await eth.accounts.generateMany([
      ACCOUNT_BALANCE,
      ACCOUNT_BALANCE,
      ACCOUNT_BALANCE,
    ]);

    const approveTx = await eth.signAndSend(
      eth.assets.NATIVE.connect(approver).approve(
        spender.address,
        APPROVED_VALUE,
      ),
    );

    const transferFromTx = eth.assets.NATIVE.connect(spender).transferFrom(
      approver.address,
      recipient.address,
      TRANSFER_VALUE,
    );

    await expectWait(transferFromTx)
      .to.emit(eth.assets.NATIVE, "Transfer")
      .withArgs(approver.address, recipient.address, TRANSFER_VALUE);

    const transferFromReceipt = await eth.signAndSend(transferFromTx);

    const approverBalance = await eth.assets.NATIVE.balanceOf(approver.address);
    const spenderBalance = await eth.assets.NATIVE.balanceOf(spender.address);
    const recipientBalance = await eth.assets.NATIVE.balanceOf(
      recipient.address,
    );

    expect(approverBalance).to.eq(
      ACCOUNT_BALANCE - approveTx.fee - TRANSFER_VALUE,
    );
    expect(spenderBalance).to.eq(ACCOUNT_BALANCE - transferFromReceipt.fee);
    expect(recipientBalance).to.eq(ACCOUNT_BALANCE + TRANSFER_VALUE);

    // Allowance decreased
    const allowance = await eth.assets.NATIVE.allowance(approver, spender);
    expect(allowance).to.eq(APPROVED_VALUE - TRANSFER_VALUE);
  });

  it("transferFrom emits Transfer event", async ({ eth }) => {
    const APPROVED_VALUE = NAT(6);

    const approver = await eth.accounts.generate(NAT(10));
    const spender = await eth.accounts.generate(NAT(10));

    await eth.signAndSend(
      eth.assets.NATIVE.connect(approver).approve(
        spender.address,
        APPROVED_VALUE,
      ),
    );

    await expectWait(
      eth.assets.NATIVE.connect(spender).transferFrom(
        approver.address,
        spender.address,
        APPROVED_VALUE,
      ),
    )
      .to.emit(eth.assets.NATIVE, "Transfer")
      .withArgs(approver.address, spender.address, APPROVED_VALUE);

    // FIXME: also should emit Approval event
    // .to.emit(eth.ERC20.native, "Approval")
    // .withArgs(approver, spender, 0);
  });

  it("spender cannot transfer an amount exceeding the approved limit", async ({
    eth,
  }) => {
    const approver = await eth.accounts.generate(NAT(10));
    const spender = await eth.accounts.generate(NAT(1));

    await eth.signAndSend(
      eth.assets.NATIVE.connect(approver).approve(spender.address, NAT(8)),
    );

    // Assert - cannot transfer more than initially approved
    await expectWait(
      eth.assets.NATIVE.connect(spender).transferFrom(
        approver.address,
        spender.address,
        NAT(9),
        {},
      ),
    ).revertedWith("ERC20InsufficientAllowance"); // FIXME: custom error?

    // Assert - cannot transfer more than left after transfer
    await eth.signAndSend(
      eth.assets.NATIVE.connect(spender).transferFrom(
        approver.address,
        spender.address,
        NAT(6),
      ),
    );

    await expectWait(
      eth.assets.NATIVE.connect(spender).transferFrom(
        approver.address,
        spender.address,
        NAT(2.00000001),
        {},
      ),
    ).revertedWith("ERC20InsufficientAllowance");
  });

  // NOTE: @openzeppelin uses u256.max for unlimited allowance
  // but Substrate can only work with u128 out of the box
  // TODO: use u128.max for unlimited allowance
  describe.skip("when unlimited allowance", () => {
    it("does not decrease the spender allowance", async ({ eth }) => {
      const [approver, spender] = await eth.accounts.generateMany([
        NAT(10),
        NAT(1),
      ]);

      // Approve unlimited
      await eth.signAndSend(
        eth.assets.NATIVE.connect(approver).approve(
          spender.address,
          ethers.MaxUint256,
        ),
      );

      const allowanceBefore = await eth.assets.NATIVE.allowance(
        approver.address,
        spender.address,
      );

      expect(allowanceBefore).to.eq(ethers.MaxUint256);
      await eth.signAndSend(
        eth.assets.NATIVE.connect(spender).transferFrom(
          approver.address,
          spender.address,
          NAT(5),
        ),
      );

      const allowanceAfter = await eth.assets.NATIVE.allowance(
        approver.address,
        spender.address,
      );
      // Allowance does not decreased
      expect(allowanceAfter).to.eq(ethers.MaxUint256);
    });

    it("does not emit an approval event", async ({ eth }) => {
      const [approver, spender] = await eth.accounts.generateMany([
        NAT(10),
        NAT(1),
      ]);

      // Approve unlimited
      await eth.signAndSend(
        eth.assets.NATIVE.connect(approver).approve(
          spender.address,
          ethers.MaxUint256,
        ),
      );

      await expectWait(
        eth.assets.NATIVE.connect(spender).transferFrom(
          approver.address,
          spender.address,
          NAT(5),
        ),
      ).to.not.emit(eth.assets.NATIVE, "Approval");
    });
  });
});
