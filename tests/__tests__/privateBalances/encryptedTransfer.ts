import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import * as crypto from "crypto";
import { expectWait } from "../../utils/matchers/expectWait";
import { NAT } from "../../utils/currency";
import { AbiCoder } from "ethers";
import { extendConfig } from "hardhat/config";

// TODO: get key form node
const nodeX25519Key: Buffer = Buffer.from([
  53, 4, 137, 17, 40, 242, 206, 104, 152, 206, 62, 230, 187, 9, 142, 128, 225,
  195, 194, 6, 230, 177, 89, 73, 168, 231, 38, 228, 38, 146, 236, 116,
]);

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
    const ecdh = generateSharedSecret(nodeX25519Key);
    const encrypted = encryptAES256GCM(Buffer.from(tx), ecdh.sharedSecret);

    const ephemeralKey = new Uint8Array(32);
    const nonce = new Uint8Array(12);
    const encryptedTx = new Uint8Array(52);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(sender).encryptedTransfer(
        encrypted.encryptedData,
        ecdh.ephemeralKey,
        encrypted.nonce,
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

function encryptAES256GCM(plaintext: Buffer, key: Buffer) {
  const iv = crypto.randomBytes(12); // Nonce (IV)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return { encryptedData: Buffer.concat([encrypted, authTag]), nonce: iv };
}

function generateSharedSecret(recipientPublicKey: Buffer) {
  const ecdh = crypto.createECDH("x25519");
  ecdh.generateKeys();
  return {
    ephemeralKey: ecdh.getPublicKey(),
    sharedSecret: ecdh.computeSecret(recipientPublicKey),
  };
}
