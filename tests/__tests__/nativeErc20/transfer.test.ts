import { NAT } from "../../utils/currency";
import { expect } from "chai";
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

  it("can be sent by transfer [#smoke]", async ({ eth, sub }) => {
    const { fee } = await eth.waitForResult(
      eth.assets.NATIVE.connect(sender).transfer(
        receiver.address,
        TRANSFER_VALUE,
      ),
    );

    const receiverSubBalance = await sub.accounts.getBalance(receiver.address);
    const receiverEthBalance = await eth.provider.getBalance(receiver.address);
    const receiverErc20Balance = await eth.assets.NATIVE.balanceOf(
      receiver.address,
    );

    expect(receiverSubBalance)
      .to.eq(receiverEthBalance)
      .to.eq(receiverErc20Balance)
      .to.eq(TRANSFER_VALUE);

    const senderSubBalance = await sub.accounts.getBalance(sender.address);
    const senderEthBalance = await eth.provider.getBalance(sender.address);
    const senderErc20Balance = await eth.assets.NATIVE.balanceOf(
      sender.address,
    );

    expect(senderSubBalance)
      .to.eq(senderEthBalance)
      .to.eq(senderErc20Balance)
      .to.eq(SENDER_BALANCE - TRANSFER_VALUE - fee);
  });

  it("transfer emits Transfer event", async ({ eth }) => {
    await expectWait(
      eth.assets.NATIVE.connect(sender).transfer(
        receiver.address,
        TRANSFER_VALUE,
      ),
    )
      .to.emit(eth.assets.NATIVE, "Transfer")
      .withArgs(sender.address, receiver.address, TRANSFER_VALUE);
  });
});
