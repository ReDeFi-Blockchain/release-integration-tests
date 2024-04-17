import { beforeAll, describe, it, expect } from "vitest";
import { loadFixture } from "../../fixtures";
import EtherHelper from "../../utils/ether";
import { BAX } from "../../utils/currency";
import { ERC20Contract } from "../../ABIGEN";

let eth: EtherHelper;
let nativeErc20: ERC20Contract;

beforeAll(async () => {
  const helpers = await loadFixture(__filename);
  eth = helpers.eth;
  nativeErc20 = helpers.eth.nativeErc20;
});

describe("Native token as ERC-20", () => {
  it("can be sent by transferFrom", async () => {
    const APPROVER_BALANCE = BAX(1.5);
    const SPENDER_BALANCE = BAX(0.3);

    const APPROVED_VALUE = BAX(0.8);
    const TRANSFER_FROM_VALUE = BAX(0.6);

    const approver = await eth.accounts.getRandomWallet(APPROVER_BALANCE);
    const spender = await eth.accounts.getRandomWallet(SPENDER_BALANCE);

    const approveTx = await eth.signAndSend(
      nativeErc20.connect(approver).approve(spender.address, APPROVED_VALUE),
    );

    const transferFromTx = await eth.signAndSend(
      nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, TRANSFER_FROM_VALUE),
    );

    // Assert balances after transferFrom
    const approverBalance = await nativeErc20.balanceOf(approver.address);
    expect(approverBalance).to.deep.eq(
      APPROVER_BALANCE.sub(TRANSFER_FROM_VALUE).sub(approveTx.fee),
    );

    const spenderBalance = await nativeErc20.balanceOf(spender.address);
    expect(spenderBalance).to.deep.eq(
      SPENDER_BALANCE.add(TRANSFER_FROM_VALUE).sub(transferFromTx.fee),
    );

    // Assert allowance decreased
    const allowance = await nativeErc20.allowance(
      approver.address,
      spender.address,
    );
    expect(allowance).to.deep.eq(APPROVED_VALUE.sub(TRANSFER_FROM_VALUE));
  });

  it("transferFrom emits Transfer and Approval event", async () => {
    const APPROVED_VALUE = BAX(6);

    const approver = await eth.accounts.getRandomWallet(BAX(10));
    const spender = await eth.accounts.getRandomWallet(BAX(10));

    await eth.signAndSend(
      nativeErc20.connect(approver).approve(spender.address, APPROVED_VALUE),
    );

    await expect(
      nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, APPROVED_VALUE),
    )
      .to.emit(nativeErc20, "Transfer")
      .withArgs(approver.address, spender.address, APPROVED_VALUE)
      .to.emit(nativeErc20, "Approval")
      .withArgs(approver, spender, 0);
  });

  it("cannot transferFrom more than approved", async () => {
    const approver = await eth.accounts.getRandomWallet(BAX(10));
    const spender = await eth.accounts.getRandomWallet(BAX(1));

    await eth.signAndSend(
      nativeErc20.connect(approver).approve(spender.address, BAX(8)),
    );

    await eth.signAndSend(
      nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, BAX(9), {}),
    );

    // Assert - cannot transfer more than initially approved
    const badTransferFromTx = nativeErc20
      .connect(spender)
      .transferFrom(approver.address, spender.address, BAX(9), {});

    await expect(badTransferFromTx).to.be.revertedWith(""); // TODO custom errors check

    // Assert - cannot transfer more than left after transfer
    await eth.signAndSend(
      nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, BAX(6)),
    );

    const badTransferFromTx2 = eth.signAndSend(
      nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, BAX(2.00000001), {}),
    );
    await expect(badTransferFromTx2).to.be.revertedWith("");
  });
});
