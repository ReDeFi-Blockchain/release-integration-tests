import { expect } from "chai";
import { BigNumber } from "ethers";
import { beforeAll, describe, it } from "vitest";
import { loadFixture } from "./fixtures";
import EtherHelper from "./utils/ether";
import SubHelper from "./utils/polka";
import { BUX } from "./utils/utils";

let sub: SubHelper;
let eth: EtherHelper;

beforeAll(async () => {
  const helpers = await loadFixture();
  sub = helpers.sub;
  eth = helpers.eth;
});

describe("Native token as ERC-20", () => {
  it("should return totalSupply", async () => {
    const polkaSupply = await sub.system.getTotalIssuance();
    const totalSupply = await eth.nativeErc20.totalSupply();

    expect(totalSupply).to.deep.eq(polkaSupply);
  });

  describe("should return balanceOf", () => {
    it("for non-existent account", async () => {
      const newEthAccount = eth.getRandomWallet();
      const balanceOfEmpty = await eth.nativeErc20.balanceOf(
        newEthAccount.address,
      );
      expect(balanceOfEmpty).to.deep.eq(BigNumber.from(0));
    });

    it("for account with balance", async () => {
      const AMOUNT = BigNumber.from(1000);
      const ethAccount = eth.getRandomWallet();
      await sub.balance.transfer(
        { to: ethAccount.address, amount: AMOUNT },
        sub.keyrings.alice,
      );
      const balance = await eth.nativeErc20.balanceOf(ethAccount.address);
      expect(balance).to.deep.eq(AMOUNT);
    });
  });

  it("can be sent using transfer", async () => {
    const AMOUNT = BUX(14.7888);
    const sender = eth.getRandomWallet();
    const receiver = eth.getRandomWallet();

    await sub.balance.transfer(
      { to: sender.address, amount: BUX(20) },
      sub.keyrings.alice,
    );

    // Act
    const transferTx = await eth.nativeErc20
      .connect(sender)
      .transfer(receiver.address, AMOUNT);
    await transferTx.wait();

    // Assert
    const subBalance = await sub.balance.get(receiver.address);
    const ethBalance = await eth.provider.getBalance(receiver.address);
    const erc20Balance = await eth.nativeErc20.balanceOf(receiver.address);

    expect(subBalance).to.deep.eq(ethBalance).to.deep.eq(erc20Balance);
    // TODO more checks
  });
});
