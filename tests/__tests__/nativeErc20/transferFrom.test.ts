import { NAT } from "../../utils/currency";
import { expect } from "chai";
import { expectWait } from "../../utils/matchers/expectWait";
import { ethers } from "ethers";
import { it } from "../../fixtures/general-fixture";

describe("Native token as ERC-20", () => {
  it("spender can transferFrom an amount within the approved limit", async ({
    eth,
  }) => {
    const OWNER_BALANCE = NAT(1.5);
    const SPENDER_BALANCE = NAT(0.3);

    const APPROVED_VALUE = NAT(0.8);
    const TRANSFER_FROM_VALUE1 = NAT(0.6);
    const TRANSFER_FROM_VALUE2 = NAT(0.2);

    const [owner, spender] = await eth.accounts.generate([
      { NATIVE: OWNER_BALANCE },
      { NATIVE: SPENDER_BALANCE },
    ]);

    const approveTx = await eth.signAndSend(
      eth.assets.NATIVE.connect(owner).approve(spender.address, APPROVED_VALUE),
    );

    const transferFromTx = await eth.signAndSend(
      eth.assets.NATIVE.connect(spender).transferFrom(
        owner.address,
        spender.address,
        TRANSFER_FROM_VALUE1,
      ),
    );

    // Assert balances after transferFrom
    let ownerBalance = await eth.assets.NATIVE.balanceOf(owner.address);
    expect(ownerBalance).to.be.equal(
      OWNER_BALANCE - TRANSFER_FROM_VALUE1 - approveTx.fee,
    );

    let spenderBalance = await eth.assets.NATIVE.balanceOf(spender.address);
    expect(spenderBalance).to.eq(
      SPENDER_BALANCE + TRANSFER_FROM_VALUE1 - transferFromTx.fee,
    );

    // Assert allowance decreased
    const allowance = await eth.assets.NATIVE.allowance(
      owner.address,
      spender.address,
    );
    expect(allowance).to.eq(APPROVED_VALUE - TRANSFER_FROM_VALUE1);

    // Can transferFrom the remaining amount

    const transferFromRemainingsTx = await eth.signAndSend(
      eth.assets.NATIVE.connect(spender).transferFrom(
        owner.address,
        spender.address,
        TRANSFER_FROM_VALUE2,
      ),
    );
    ownerBalance = await eth.assets.NATIVE.balanceOf(owner.address);
    expect(ownerBalance).to.eq(
      OWNER_BALANCE -
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

    const [owner, spender, recipient] = await eth.accounts.generate([
      { NATIVE: ACCOUNT_BALANCE },
      { NATIVE: ACCOUNT_BALANCE },
      { NATIVE: ACCOUNT_BALANCE },
    ]);

    const approveTx = await eth.signAndSend(
      eth.assets.NATIVE.connect(owner).approve(spender.address, APPROVED_VALUE),
    );

    const transferFromTx = eth.assets.NATIVE.connect(spender).transferFrom(
      owner.address,
      recipient.address,
      TRANSFER_VALUE,
    );

    await expectWait(transferFromTx)
      .to.emit(eth.assets.NATIVE, "Transfer")
      .withArgs(owner.address, recipient.address, TRANSFER_VALUE);

    const transferFromReceipt = await eth.signAndSend(transferFromTx);

    const ownerBalance = await eth.assets.NATIVE.balanceOf(owner.address);
    const spenderBalance = await eth.assets.NATIVE.balanceOf(spender.address);
    const recipientBalance = await eth.assets.NATIVE.balanceOf(
      recipient.address,
    );

    expect(ownerBalance).to.eq(
      ACCOUNT_BALANCE - approveTx.fee - TRANSFER_VALUE,
    );
    expect(spenderBalance).to.eq(ACCOUNT_BALANCE - transferFromReceipt.fee);
    expect(recipientBalance).to.eq(ACCOUNT_BALANCE + TRANSFER_VALUE);

    // Allowance decreased
    const allowance = await eth.assets.NATIVE.allowance(owner, spender);
    expect(allowance).to.eq(APPROVED_VALUE - TRANSFER_VALUE);
  });

  it("transferFrom emits Transfer event", async ({ eth }) => {
    const APPROVED_VALUE = NAT(6);

    const [owner, spender] = await eth.accounts.generate([
      { NATIVE: NAT(10) },
      { NATIVE: NAT(10) },
    ]);

    await eth.signAndSend(
      eth.assets.NATIVE.connect(owner).approve(spender.address, APPROVED_VALUE),
    );

    await expectWait(
      eth.assets.NATIVE.connect(spender).transferFrom(
        owner.address,
        spender.address,
        APPROVED_VALUE,
      ),
    )
      .to.emit(eth.assets.NATIVE, "Transfer")
      .withArgs(owner.address, spender.address, APPROVED_VALUE);

    // FIXME: also should emit Approval event
    // .to.emit(eth.ERC20.native, "Approval")
    // .withArgs(approver, spender, 0);
  });

  it("spender cannot transfer an amount exceeding the approved limit", async ({
    eth,
  }) => {
    const APPROVED_VALUE = NAT(8);
    const PARTIAL_TRANSFER_FROM = NAT(6);

    const [owner, spender] = await eth.accounts.generate([
      { NATIVE: NAT(10) },
      { NATIVE: NAT(10) },
    ]);

    await eth.signAndSend(
      eth.assets.NATIVE.connect(owner).approve(spender.address, APPROVED_VALUE),
    );

    // Assert - cannot transfer more than initially approved
    await expectWait(
      eth.assets.NATIVE.connect(spender).transferFrom(
        owner.address,
        spender.address,
        APPROVED_VALUE + 1n,
        {},
      ),
    ).revertedWith("ERC20InsufficientAllowance"); // FIXME: custom error?

    // Assert - cannot transfer more than left after transfer
    await eth.signAndSend(
      eth.assets.NATIVE.connect(spender).transferFrom(
        owner.address,
        spender.address,
        PARTIAL_TRANSFER_FROM,
      ),
    );

    await expectWait(
      eth.assets.NATIVE.connect(spender).transferFrom(
        owner.address,
        spender.address,
        APPROVED_VALUE - PARTIAL_TRANSFER_FROM + 1n,
        {},
      ),
    ).revertedWith("ERC20InsufficientAllowance");
  });

  // NOTE: @openzeppelin uses u256.max for unlimited allowance
  // but Substrate can only work with u128 out of the box
  // TODO: use u128.max for unlimited allowance
  describe.skip("when unlimited allowance", () => {
    it("does not decrease the spender allowance", async ({ eth }) => {
      const [owner, spender] = await eth.accounts.generate([
        { NATIVE: NAT(10) },
        { NATIVE: NAT(1) },
      ]);

      // Approve unlimited
      await eth.signAndSend(
        eth.assets.NATIVE.connect(owner).approve(
          spender.address,
          ethers.MaxUint256,
        ),
      );

      const allowanceBefore = await eth.assets.NATIVE.allowance(
        owner.address,
        spender.address,
      );

      expect(allowanceBefore).to.eq(ethers.MaxUint256);
      await eth.signAndSend(
        eth.assets.NATIVE.connect(spender).transferFrom(
          owner.address,
          spender.address,
          NAT(5),
        ),
      );

      const allowanceAfter = await eth.assets.NATIVE.allowance(
        owner.address,
        spender.address,
      );
      // Allowance does not decreased
      expect(allowanceAfter).to.eq(ethers.MaxUint256);
    });

    it("does not emit an approval event", async ({ eth }) => {
      const [owner, spender] = await eth.accounts.generate([
        { NATIVE: NAT(10) },
        { NATIVE: NAT(1) },
      ]);

      // Approve unlimited
      await eth.signAndSend(
        eth.assets.NATIVE.connect(owner).approve(
          spender.address,
          ethers.MaxUint256,
        ),
      );

      await expectWait(
        eth.assets.NATIVE.connect(spender).transferFrom(
          owner.address,
          spender.address,
          NAT(5),
        ),
      ).to.not.emit(eth.assets.NATIVE, "Approval");
    });
  });
});
