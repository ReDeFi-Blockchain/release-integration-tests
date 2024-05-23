import { NAT } from "../../utils/currency";
import { ethers } from "hardhat";
import { it } from "../../fixtures/standalone";
import { expectWait } from "../../utils/matchers/expectWait";
import { HDNodeWallet } from "ethers";

describe("Native token as ERC-20", () => {
  let sender: HDNodeWallet;
  let receiver: HDNodeWallet;

  const SENDER_BALANCE = NAT(20);
  const TRANSFER_VALUE = NAT("14.1234567891012345678");

  it.beforeEach(async ({ eth }) => {
    [sender, receiver] = await eth.accounts.generate([
      { NATIVE: SENDER_BALANCE },
      {},
    ]);
  });

  it("cannot transfer more than balance", async ({ eth }) => {
    await expectWait(
      eth.assets.NATIVE.connect(sender).transfer(
        receiver.address,
        SENDER_BALANCE + 1n,
      ),
    ).to.be.rejected;
    // FIXME: substrate error: Token(FundsUnavailable)
    // ).to.be.revertedWithCustomError(
    //   eth.assets.NATIVE,
    //   "ERC20InsufficientBalance",
    // );
  });

  it("cannot send full balance because of fee", async ({ eth }) => {
    await expectWait(
      eth.assets.NATIVE.connect(sender).transfer(
        receiver.address,
        SENDER_BALANCE,
      ),
    ).to.be.rejected;
    // FIXME: should be reverted with custom error
  });

  it("cannot transfer to zero address", async ({ eth }) => {
    await expectWait(
      eth.assets.NATIVE.connect(sender).transfer(
        ethers.ZeroAddress,
        TRANSFER_VALUE,
      ),
    ).to.be.revertedWith("ERC20InvalidReceiver");
    // TODO custom error for openzeppelin
  });
});
