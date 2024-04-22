import { BAX } from "../../utils/currency";
import { expect } from "chai";
import { ethers } from "hardhat";
import { it } from "../../fixtures/general-fixture";
import { txExpect } from "../../utils/matchers/txEvents";

describe("Native token as ERC-20", () => {
  it("can be sent by transfer", async ({ eth, sub }) => {
    const AMOUNT = BAX(14.7888);
    const sender = await eth.accounts.generate(BAX(20));
    const receiver = await eth.accounts.generate();

    // Act
    await eth.signAndSend(
      eth.nativeErc20.connect(sender).transfer(receiver.address, AMOUNT),
    );

    // Assert
    const subBalance = await sub.account.getBalance(receiver.address);
    const ethBalance = await eth.provider.getBalance(receiver.address);
    const erc20Balance = await eth.nativeErc20.balanceOf(receiver.address);

    expect(subBalance).to.deep.eq(ethBalance).to.deep.eq(erc20Balance);
    // TODO more checks
  });

  it("transfer emits Transfer event", async ({ eth }) => {
    const sender = await eth.accounts.generate(BAX(20));

    await expect(
      (
        await eth.nativeErc20
          .connect(sender)
          .transfer(eth.donor.address, BAX(18))
      ).wait(),
    )
      .to.emit(eth.nativeErc20, "Transfer")
      .withArgs(sender.address, eth.donor.address, BAX(18));
  });

  it("cannot transfer more than balance", async ({ eth }) => {
    const sender = await eth.accounts.generate(BAX(20));

    await expect(
      eth.nativeErc20
        .connect(sender)
        .transfer(eth.donor.address, BAX("20.000000000000000001")),
    ).to.be.revertedWithCustomError(
      eth.nativeErc20,
      "ERC20InsufficientBalance",
    );
    // FIXME: substrate error: Token(FundsUnavailable)
  });

  it("cannot send full balance because of fee", async ({ eth }) => {
    const sender = await eth.accounts.generate(BAX(20));

    await txExpect(
      eth.nativeErc20.connect(sender).transfer(eth.donor.address, BAX(20)),
    ).to.be.rejected;

    // FIXME: should be reverted with custom error
    // .to.be.revertedWithCustomError(
    //   eth.nativeErc20,
    //   "ERC20InsufficientBalance",
    // );
  });

  it("cannot transfer to zero address", async ({ eth }) => {
    const sender = await eth.accounts.generate(BAX(20));

    await txExpect(
      eth.nativeErc20.connect(sender).transfer(ethers.ZeroAddress, BAX(1)),
    ).to.be.revertedWithCustomError(eth.nativeErc20, "ERC20InvalidReceiver");
    // FIXME, also can send to ERC-20 address itself
  });
});
