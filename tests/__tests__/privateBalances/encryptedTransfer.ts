import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { expectWait } from "../../utils/matchers/expectWait";
import { NAT } from "../../utils/currency";
import { AbiCoder } from "ethers";

describe("Move some native tokens between private balances", () => {
  it("valid encrypted transfer", async ({ eth }) => {
    const INITIAL_BALANCE = NAT(10);
    const PRIVATE_BALANCE = NAT(5);

    const [sender, recipient] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
      { NATIVE: 0n },
    ]);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(sender).hideBalance(PRIVATE_BALANCE),
    );

    const senderPrivateBalanceBeforeTransfer =
      await eth.assets.NATIVE.connect(sender).getBalance();
    expect(senderPrivateBalanceBeforeTransfer).to.eq(PRIVATE_BALANCE);

    const recipientPrivateBalanceBeforeTransfer =
      await eth.assets.NATIVE.connect(recipient).getBalance();
    expect(recipientPrivateBalanceBeforeTransfer).to.eq(0n);

    const abiCoder = new AbiCoder();
    const tx = abiCoder.encode(
      ["address", "uint256"],
      [recipient.address, PRIVATE_BALANCE],
    );

    const ephemeralKey = new Uint8Array(32);
    const nonce = new Uint8Array(12);
    const encryptedTx = new Uint8Array(52);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(sender).encryptedTransfer(
        encryptedTx,
        ephemeralKey,
        nonce,
      ),
    );

    const senderPrivateBalanceAfterTransfer =
      await eth.assets.NATIVE.connect(sender).getBalance();
    expect(senderPrivateBalanceAfterTransfer).to.eq(0n);

    const recipientPrivateBalanceAfterTransfer =
      await eth.assets.NATIVE.connect(recipient).getBalance();
    expect(recipientPrivateBalanceAfterTransfer).to.eq(PRIVATE_BALANCE);
  });
});
