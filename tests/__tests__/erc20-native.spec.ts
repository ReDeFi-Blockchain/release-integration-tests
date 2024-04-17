import { expect } from "chai";
import { BigNumber } from "ethers";
import { beforeAll, describe, it } from "vitest";
import { loadFixture } from "../fixtures";
import EtherHelper from "../utils/ether";
import SubHelper from "../utils/polka";
import { BAX } from "../utils/utils";

let sub: SubHelper;
let eth: EtherHelper;

beforeAll(async () => {
  const helpers = await loadFixture(import.meta.filename);
  sub = helpers.sub;
  eth = helpers.eth;
});

describe("Native token as ERC-20", () => {
  it("should implement IERC20Metadata", async () => {
    const name = await eth.nativeErc20.name();
    const symbol = await eth.nativeErc20.symbol();
    const decimals = await eth.nativeErc20.decimals();

    expect(name).to.eq("redefi");
    expect(symbol).to.eq("BAX");
    expect(decimals).to.eq(18);
  });

  it("should return totalSupply", async () => {
    const subTotalSupply = await sub.system.getTotalIssuance();
    const ethTotalSupply = await eth.nativeErc20.totalSupply();

    expect(ethTotalSupply).to.deep.eq(subTotalSupply);
  });

  describe("should return balanceOf", () => {
    it("for non-existent account", async () => {
      const newEthAccount = await eth.getRandomWallet();
      const balanceOfEmpty = await eth.nativeErc20.balanceOf(
        newEthAccount.address,
      );
      expect(balanceOfEmpty).to.deep.eq(BigNumber.from(0));
    });

    it("for account with balance", async () => {
      const BALANCE = BAX(0.5890002);
      const ethAccount = await eth.getRandomWallet(BALANCE);

      const balance = await eth.nativeErc20.balanceOf(ethAccount.address);
      expect(balance).to.deep.eq(BALANCE);
    });
  });

  it("can be sent by transfer", async () => {
    const AMOUNT = BAX(14.7888);
    const sender = await eth.getRandomWallet(BAX(20));
    const receiver = await eth.getRandomWallet();

    // Act
    const transferTx = await eth.nativeErc20
      .connect(sender)
      .transfer(receiver.address, AMOUNT);
    await transferTx.wait();

    // Assert
    const subBalance = await sub.account.getBalance(receiver.address);
    const ethBalance = await eth.provider.getBalance(receiver.address);
    const erc20Balance = await eth.nativeErc20.balanceOf(receiver.address);

    expect(subBalance).to.deep.eq(ethBalance).to.deep.eq(erc20Balance);
    // TODO more checks
  });

  describe("allowance", () => {
    it("zero by default", async () => {
      const randomAccount1 = await eth.getRandomWallet();
      const randomAccount2 = await eth.getRandomWallet();

      const allowance = await eth.nativeErc20.allowance(
        randomAccount1.address,
        randomAccount2.address,
      );

      expect(allowance).to.deep.eq(BigNumber.from(0));
    });

    it("can be approved for transferFrom", async () => {
      const APPROVED = BAX(0.8);
      const approver = await eth.getRandomWallet(BAX(1.5));
      const spender = await eth.getRandomWallet(BAX(0.3));

      const approveTx = await eth.nativeErc20
        .connect(approver)
        .approve(spender.address, APPROVED);
      await approveTx.wait();

      const allowance = await eth.nativeErc20.allowance(
        approver.address,
        spender.address,
      );

      expect(allowance).to.deep.eq(APPROVED);
      // TODO check events, fee
    });

    it("can be sent by transferFrom", async () => {
      const APPROVER_BALANCE = BAX(1.5);
      const SPENDER_BALANCE = BAX(0.3);

      const APPROVED_VALUE = BAX(0.8);
      const TRANSFER_FROM_VALUE = BAX(0.6);

      const approver = await eth.getRandomWallet(APPROVER_BALANCE);
      const spender = await eth.getRandomWallet(SPENDER_BALANCE);

      const approveTx = await eth.nativeErc20
        .connect(approver)
        .approve(spender.address, APPROVED_VALUE);
      const approveReceipt = await approveTx.wait();
      const approveFee = approveReceipt.gasUsed.mul(
        approveReceipt.effectiveGasPrice,
      );

      const transferFromTx = await eth.nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, TRANSFER_FROM_VALUE);
      const transferFromReceipt = await transferFromTx.wait();
      const transferFromFee = transferFromReceipt.gasUsed.mul(
        transferFromReceipt.effectiveGasPrice,
      );

      // Assert balances after transferFrom
      const approverBalance = await eth.nativeErc20.balanceOf(approver.address);
      expect(approverBalance).to.deep.eq(
        APPROVER_BALANCE.sub(TRANSFER_FROM_VALUE).sub(approveFee),
      );

      const spenderBalance = await eth.nativeErc20.balanceOf(spender.address);
      expect(spenderBalance).to.deep.eq(
        SPENDER_BALANCE.add(TRANSFER_FROM_VALUE).sub(transferFromFee),
      );

      // Assert allowance decreased
      const allowance = await eth.nativeErc20.allowance(
        approver.address,
        spender.address,
      );
      expect(allowance).to.deep.eq(APPROVED_VALUE.sub(TRANSFER_FROM_VALUE));
    });
  });
});
