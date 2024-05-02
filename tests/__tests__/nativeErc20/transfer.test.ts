import { BAX } from "../../utils/currency";
import { expect } from "chai";
import { ethers } from "hardhat";
import { it } from "../../fixtures/general-fixture";
import { expectWait } from "../../utils/matchers/expectWait";

describe("Native token as ERC-20", () => {
  it("can be sent by transfer", async ({ eth, sub }) => {
    const TRANSFER_VALUE = BAX(14.7888);
    const sender = await eth.accounts.generate(BAX(20));
    const receiver = await eth.accounts.generate();

    // Act
    await eth.signAndSend(
      eth.ERC20.native
        .connect(sender)
        .transfer(receiver.address, TRANSFER_VALUE),
    );

    // Assert
    const subBalance = await sub.account.getBalance(receiver.address);
    const ethBalance = await eth.provider.getBalance(receiver.address);
    const erc20Balance = await eth.ERC20.native.balanceOf(receiver.address);

    expect(subBalance).to.eq(ethBalance).to.eq(erc20Balance);
  });

  it("transfer emits Transfer event", async ({ eth }) => {
    const sender = await eth.accounts.generate(BAX(20));

    await expectWait(
      eth.ERC20.native.connect(sender).transfer(eth.donor.address, BAX(18)),
    )
      .to.emit(eth.ERC20.native, "Transfer")
      .withArgs(sender.address, eth.donor.address, BAX(18));
  });

  it("cannot transfer more than balance", async ({ eth }) => {
    const sender = await eth.accounts.generate(BAX(20));

    await expectWait(
      eth.ERC20.native
        .connect(sender)
        .transfer(eth.donor.address, BAX("20.000000000000000001")),
    ).to.be.revertedWithCustomError(
      eth.ERC20.native,
      "ERC20InsufficientBalance",
    );
    // FIXME: substrate error: Token(FundsUnavailable)
  });

  it("cannot send full balance because of fee", async ({ eth }) => {
    const sender = await eth.accounts.generate(BAX(20));

    await expectWait(
      eth.ERC20.native.connect(sender).transfer(eth.donor.address, BAX(20)),
    ).to.be.rejected;

    // FIXME: should be reverted with custom error
    // .to.be.revertedWithCustomError(
    //   eth.ERC20.native,
    //   "ERC20InsufficientBalance",
    // );
  });

  it("cannot transfer to zero address", async ({ eth }) => {
    const sender = await eth.accounts.generate(BAX(20));

    await expectWait(
      eth.ERC20.native.connect(sender).transfer(ethers.ZeroAddress, BAX(1)),
    ).to.be.revertedWith("ERC20InvalidReceiver");
    // TODO custom error for openzeppelin
  });
});
