import { BigNumber } from "ethers";
import { beforeAll, describe, it, expect } from "vitest";
import { loadFixture } from "../fixtures";
import EtherHelper from "../utils/ether";
import SubHelper from "../utils/polka";
import { BAX } from "../utils/currency";
import { ERC20Contract, ERC20Contract__factory } from "../ABIGEN";

let sub: SubHelper;
let eth: EtherHelper;
let nativeErc20: ERC20Contract;

beforeAll(async () => {
  const helpers = await loadFixture(import.meta.filename);
  sub = helpers.sub;
  eth = helpers.eth;
  nativeErc20 = helpers.eth.nativeErc20;
});

describe("Native token as ERC-20", () => {
  it("should implement IERC20Metadata", async () => {
    const name = await nativeErc20.name();
    const symbol = await nativeErc20.symbol();
    const decimals = await nativeErc20.decimals();

    expect(name).to.eq("redefi");
    expect(symbol).to.eq("BAX");
    expect(decimals).to.eq(18);
  });

  it("should return totalSupply", async () => {
    const subTotalSupply = await sub.system.getTotalIssuance();
    const ethTotalSupply = await nativeErc20.totalSupply();

    expect(ethTotalSupply).to.deep.eq(subTotalSupply);
  });

  describe("should return balanceOf", () => {
    it("for non-existent account", async () => {
      const newEthAccount = await eth.accounts.getRandomWallet();
      const balanceOfEmpty = await nativeErc20.balanceOf(newEthAccount.address);
      expect(balanceOfEmpty).to.deep.eq(BigNumber.from(0));
    });

    it("for account with balance", async () => {
      const BALANCE = BAX(0.5890002);
      const ethAccount = await eth.accounts.getRandomWallet(BALANCE);

      const balance = await nativeErc20.balanceOf(ethAccount.address);
      expect(balance).to.deep.eq(BALANCE);
    });
  });

  it("can be sent by transfer", async () => {
    const AMOUNT = BAX(14.7888);
    const sender = await eth.accounts.getRandomWallet(BAX(20));
    const receiver = await eth.accounts.getRandomWallet();

    // Act
    await eth.signAndSend(
      nativeErc20.connect(sender).transfer(receiver.address, AMOUNT),
    );

    // Assert
    const subBalance = await sub.account.getBalance(receiver.address);
    const ethBalance = await eth.provider.getBalance(receiver.address);
    const erc20Balance = await nativeErc20.balanceOf(receiver.address);

    expect(subBalance).to.deep.eq(ethBalance).to.deep.eq(erc20Balance);
    // TODO more checks
  });

  it("transfer emits Transfer event", async () => {
    const sender = await eth.accounts.getRandomWallet(BAX(20));

    await expect(
      nativeErc20.connect(sender).transfer(eth.donor.address, BAX(18)),
    )
      .to.emit(nativeErc20, "Transfer")
      .withArgs(sender.address, eth.donor.address, BAX(18));
  });

  describe("allowance", () => {
    it("zero by default", async () => {
      const randomAccount1 = await eth.accounts.getRandomWallet();
      const randomAccount2 = await eth.accounts.getRandomWallet();

      const allowance = await nativeErc20.allowance(
        randomAccount1.address,
        randomAccount2.address,
      );

      expect(allowance).to.deep.eq(BigNumber.from(0));
    });

    it("can be approved for transferFrom", async () => {
      const APPROVED = BAX(0.8);
      const approver = await eth.accounts.getRandomWallet(BAX(1.5));
      const spender = await eth.accounts.getRandomWallet(BAX(0.3));

      await eth.signAndSend(
        nativeErc20.connect(approver).approve(spender.address, APPROVED),
      );

      const allowance = await nativeErc20.allowance(
        approver.address,
        spender.address,
      );

      expect(allowance).to.deep.eq(APPROVED);
    });

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

    it("cannot transferFrom more than approved", async () => {
      const approver = await eth.accounts.getRandomWallet(BAX(10));
      const spender = await eth.accounts.getRandomWallet(BAX(1));

      // TODO remove
      const nativeErc20 = await new ERC20Contract__factory(eth.donor).deploy(
        eth.donor.address,
      );
      await nativeErc20.deployTransaction.wait();
      await nativeErc20.mint(approver.address, BAX(200));
      // TODO remove

      await eth.signAndSend(
        nativeErc20.connect(approver).approve(spender.address, BAX(8)),
      );

      // Assert - cannot transfer more than initially approved
      const badTransferFromTx = nativeErc20
        .connect(spender)
        .transferFrom(approver.address, spender.address, BAX(9), {
          gasLimit: 1000_000,
        });

      await expect(badTransferFromTx).revertedWith(
        "ERC20InsufficientAllowance",
      );

      // Assert - cannot transfer more than left after transfer
      await eth.signAndSend(
        nativeErc20
          .connect(spender)
          .transferFrom(approver.address, spender.address, BAX(6)),
      );

      const badTransferFromTx2 = eth.signAndSend(
        nativeErc20
          .connect(spender)
          .transferFrom(approver.address, spender.address, BAX(2.00000001)),
      );
      expect(await badTransferFromTx2).to.throws("TODO");
    });
  });
});
