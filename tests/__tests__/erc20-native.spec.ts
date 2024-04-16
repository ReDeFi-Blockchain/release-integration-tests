import { expect } from "chai";
import { BigNumber } from "ethers";
import { beforeAll, describe, it } from "vitest";
import { loadFixture } from "../fixtures";
import EtherHelper from "../utils/ether";
import SubHelper from "../utils/polka";
import { BUX } from "../utils/utils";

let sub: SubHelper;
let eth: EtherHelper;

beforeAll(async () => {
  const helpers = await loadFixture(import.meta.filename);
  sub = helpers.sub;
  eth = helpers.eth;
});

describe("Native token as ERC-20", () => {
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
      const AMOUNT = BigNumber.from(1000);
      const ethAccount = await eth.getRandomWallet(AMOUNT);

      const balance = await eth.nativeErc20.balanceOf(ethAccount.address);
      expect(balance).to.deep.eq(AMOUNT);
    });
  });

  it("can be sent using transfer", async () => {
    const AMOUNT = BUX(14.7888);
    const sender = await eth.getRandomWallet(BUX(20));
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
});
