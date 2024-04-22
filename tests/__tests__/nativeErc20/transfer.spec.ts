import EtherHelper from "../../utils/ether";
import { BAX } from "../../utils/currency";
import { TestERC20 } from "../../typechain-types";
import { expect } from "chai";
import { loadFixture } from "../../utils/fixture";
import SubHelper from "../../utils/substrate";
import { ethers } from "hardhat";

let sub: SubHelper;
let eth: EtherHelper;
let nativeErc20: TestERC20;

before(async () => {
  const helpers = await loadFixture(__filename);
  sub = helpers.sub;
  eth = helpers.eth;
  nativeErc20 = helpers.eth.nativeErc20;
});

describe("Native token as ERC-20", () => {
  it("can be sent by transfer", async () => {
    const AMOUNT = BAX(14.7888);
    const sender = await eth.accounts.generate(BAX(20));
    const receiver = await eth.accounts.generate();

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
    const sender = await eth.accounts.generate(BAX(20));

    await expect(
      (
        await nativeErc20.connect(sender).transfer(eth.donor.address, BAX(18))
      ).wait(),
    )
      .to.emit(nativeErc20, "Transfer")
      .withArgs(sender.address, eth.donor.address, BAX(18));
  });

  it("cannot transfer more than balance", async () => {
    const sender = await eth.accounts.generate(BAX(20));

    await expect(
      nativeErc20
        .connect(sender)
        .transfer(eth.donor.address, BAX("20.000000000000000001")),
    ).to.be.revertedWithCustomError(nativeErc20, "ERC20InsufficientBalance");
    // FIXME: substrate error: Token(FundsUnavailable)
  });

  it("cannot send full balance because of fee", async () => {
    const sender = await eth.accounts.generate(BAX(20));

    await expect(
      eth.signAndSend(
        nativeErc20.connect(sender).transfer(eth.donor.address, BAX(20)),
      ),
    ).to.be.revertedWithCustomError(nativeErc20, "ERC20InsufficientBalance");
  });

  it("cannot transfer to zero address", async () => {
    const sender = await eth.accounts.generate(BAX(20));

    await expect(
      nativeErc20.connect(sender).transfer(ethers.ZeroAddress, BAX(1)),
    ).to.be.revertedWithCustomError(nativeErc20, "ERC20InvalidReceiver");
    // FIXME, also can send to ERC-20 address itself
  });
});
