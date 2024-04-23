import { BAX } from "../../utils/currency";
import { expect } from "chai";
import { txExpect } from "../../utils/matchers/txEvents";
import { ethers } from "ethers";
import { it } from "../../fixtures/general-fixture";

describe("Native token as ERC-20", () => {
  it("spender can transferFrom an amount within the approved limit", async ({
    eth,
  }) => {
    const APPROVER_BALANCE = BAX(1.5);
    const SPENDER_BALANCE = BAX(0.3);

    const APPROVED_VALUE = BAX(0.8);
    const TRANSFER_FROM_VALUE1 = BAX(0.6);
    const TRANSFER_FROM_VALUE2 = BAX(0.2);

    const approver = await eth.accounts.generate(APPROVER_BALANCE);
    const spender = await eth.accounts.generate(SPENDER_BALANCE);

    const approveTx = await eth.signAndSend(
      eth.nativeErc20
        .connect(approver)
        .approve(spender.address, APPROVED_VALUE),
    );

    const transferFromTx = await eth.signAndSend(
      eth.nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, TRANSFER_FROM_VALUE1),
    );

    // Assert balances after transferFrom
    let approverBalance = await eth.nativeErc20.balanceOf(approver.address);
    expect(approverBalance).to.be.equal(
      APPROVER_BALANCE - TRANSFER_FROM_VALUE1 - approveTx.fee,
    );

    let spenderBalance = await eth.nativeErc20.balanceOf(spender.address);
    expect(spenderBalance).to.deep.eq(
      SPENDER_BALANCE + TRANSFER_FROM_VALUE1 - transferFromTx.fee,
    );

    // Assert allowance decreased
    const allowance = await eth.nativeErc20.allowance(
      approver.address,
      spender.address,
    );
    expect(allowance).to.deep.eq(APPROVED_VALUE - TRANSFER_FROM_VALUE1);

    // Can transferFrom the remaining amount

    const transferFromRemainingsTx = await eth.signAndSend(
      eth.nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, TRANSFER_FROM_VALUE2),
    );
    approverBalance = await eth.nativeErc20.balanceOf(approver.address);
    expect(approverBalance).to.eq(
      APPROVER_BALANCE -
        TRANSFER_FROM_VALUE1 -
        TRANSFER_FROM_VALUE2 -
        approveTx.fee,
    );
    spenderBalance = await eth.nativeErc20.balanceOf(spender.address);
    expect(spenderBalance).to.eq(
      SPENDER_BALANCE +
        TRANSFER_FROM_VALUE1 +
        TRANSFER_FROM_VALUE2 -
        transferFromTx.fee -
        transferFromRemainingsTx.fee,
    );
  });

  it("transferFrom allows delegated token transfers", async ({ eth }) => {
    const ACCOUNT_BALANCE = BAX(10);

    const APPROVED_VALUE = BAX(10);
    const TRANSFER_VALUE = BAX(5);

    const [approver, spender, recipient] = await eth.accounts.generateMany([
      ACCOUNT_BALANCE,
      ACCOUNT_BALANCE,
      ACCOUNT_BALANCE,
    ]);

    const approveTx = await eth.signAndSend(
      eth.nativeErc20
        .connect(approver)
        .approve(spender.address, APPROVED_VALUE),
    );

    const transferFromTx = eth.nativeErc20
      .connect(spender)
      .transferFrom(approver.address, recipient.address, TRANSFER_VALUE);

    await txExpect(transferFromTx)
      .to.emit(eth.nativeErc20, "Transfer")
      .withArgs(approver.address, recipient.address, TRANSFER_VALUE);

    const transferFromReceipt = await eth.signAndSend(transferFromTx);

    const approverBalance = await eth.nativeErc20.balanceOf(approver.address);
    const spenderBalance = await eth.nativeErc20.balanceOf(spender.address);
    const recipientBalance = await eth.nativeErc20.balanceOf(recipient.address);

    expect(approverBalance).to.eq(
      ACCOUNT_BALANCE - approveTx.fee - TRANSFER_VALUE,
    );
    expect(spenderBalance).to.eq(ACCOUNT_BALANCE - transferFromReceipt.fee);
    expect(recipientBalance).to.eq(ACCOUNT_BALANCE + TRANSFER_VALUE);

    // Allowance decreased
    const allowance = await eth.nativeErc20.allowance(approver, spender);
    expect(allowance).to.eq(APPROVED_VALUE - TRANSFER_VALUE);
  });

  it("transferFrom emits Transfer event", async ({ eth }) => {
    const APPROVED_VALUE = BAX(6);

    const approver = await eth.accounts.generate(BAX(10));
    const spender = await eth.accounts.generate(BAX(10));

    await eth.signAndSend(
      eth.nativeErc20
        .connect(approver)
        .approve(spender.address, APPROVED_VALUE),
    );

    await txExpect(
      eth.nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, APPROVED_VALUE),
    )
      .to.emit(eth.nativeErc20, "Transfer")
      .withArgs(approver.address, spender.address, APPROVED_VALUE);

    // FIXME: also should emit Approval event
    // .to.emit(eth.nativeErc20, "Approval")
    // .withArgs(approver, spender, 0);
  });

  it("spender cannot transfer an amount exceeding the approved limit", async ({
    eth,
  }) => {
    const approver = await eth.accounts.generate(BAX(10));
    const spender = await eth.accounts.generate(BAX(1));

    await eth.signAndSend(
      eth.nativeErc20.connect(approver).approve(spender.address, BAX(8)),
    );

    // Assert - cannot transfer more than initially approved
    await txExpect(
      eth.nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, BAX(9), {}),
    ).revertedWith("ERC20InsufficientAllowance"); // FIXME: custom error?

    // Assert - cannot transfer more than left after transfer
    await eth.signAndSend(
      eth.nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, BAX(6)),
    );

    await txExpect(
      eth.nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, BAX(2.00000001), {}),
    ).revertedWith("ERC20InsufficientAllowance");
  });

  // FIXME: wait for uin256 support
  describe.skip("when unlimited allowance", () => {
    it("does not decrease the spender allowance", async ({ eth }) => {
      const [approver, spender] = await eth.accounts.generateMany([
        BAX(10),
        BAX(1),
      ]);

      // Approve unlimited
      await eth.signAndSend(
        eth.nativeErc20
          .connect(approver)
          .approve(spender.address, ethers.MaxUint256),
      );

      const allowanceBefore = await eth.nativeErc20.allowance(
        approver.address,
        spender.address,
      );

      expect(allowanceBefore).to.eq(ethers.MaxUint256);
      await eth.signAndSend(
        eth.nativeErc20
          .connect(spender)
          .transferFrom(approver.address, spender.address, BAX(5)),
      );

      const allowanceAfter = await eth.nativeErc20.allowance(
        approver.address,
        spender.address,
      );
      // Allowance does not decreased
      expect(allowanceAfter).to.eq(ethers.MaxUint256);
    });

    it("does not emit an approval event", async ({ eth }) => {
      const [approver, spender] = await eth.accounts.generateMany([
        BAX(10),
        BAX(1),
      ]);

      // Approve unlimited
      await eth.signAndSend(
        eth.nativeErc20
          .connect(approver)
          .approve(spender.address, ethers.MaxUint256),
      );

      await txExpect(
        eth.nativeErc20
          .connect(spender)
          .transferFrom(approver.address, spender.address, BAX(5)),
      ).to.not.emit(eth.nativeErc20, "Approval");
    });
  });
});
