import { GBP, NAT } from "../../utils/currency";
import { expect } from "chai";
import { ethers } from "hardhat";
import { it } from "../../fixtures/standalone";
import { expectWait } from "../../utils/matchers/expectWait";
import { AccountAssetType, AccountBalance } from "../../utils/types";
import { HDNodeWallet } from "ethers";

type TestCase = {
  ASSET: AccountAssetType;
  SENDER_BALANCE: bigint;
  TRANSFER_VALUE: bigint;
  ACCOUNT_BALANCE: AccountBalance;
};

const CASES: TestCase[] = [
  {
    ASSET: "SIBLING",
    SENDER_BALANCE: NAT(1),
    TRANSFER_VALUE: NAT(0.9),
    ACCOUNT_BALANCE: { NATIVE: NAT(20), SIBLING: NAT(1) },
  },
  {
    ASSET: "GBP",
    SENDER_BALANCE: GBP(1),
    TRANSFER_VALUE: GBP(0.9),
    ACCOUNT_BALANCE: { NATIVE: NAT(20), GBP: GBP(1) },
  },
];

for (const TEST_CASE of CASES) {
  describe(`${TEST_CASE.ASSET} asset`, () => {
    let sender: HDNodeWallet;
    let receiver: HDNodeWallet;

    it.beforeEach(async ({ eth }) => {
      [sender, receiver] = await eth.accounts.generate([
        TEST_CASE.ACCOUNT_BALANCE,
        {},
      ]);
    });

    it("can be sent by transfer", async ({ eth }) => {
      await eth.waitForResult(
        eth.assets[TEST_CASE.ASSET]
          .connect(sender)
          .transfer(receiver.address, TEST_CASE.TRANSFER_VALUE),
      );

      const receiverAssetBalance = await eth.assets[TEST_CASE.ASSET].balanceOf(
        receiver.address,
      );
      const senderAssetBalance = await eth.assets[TEST_CASE.ASSET].balanceOf(
        sender.address,
      );

      expect(receiverAssetBalance).to.eq(TEST_CASE.TRANSFER_VALUE);
      expect(senderAssetBalance).to.eq(
        TEST_CASE.SENDER_BALANCE - TEST_CASE.TRANSFER_VALUE,
      );
    });

    it("transfer emits Transfer event", async ({ eth }) => {
      await expectWait(
        eth.assets[TEST_CASE.ASSET]
          .connect(sender)
          .transfer(receiver.address, TEST_CASE.TRANSFER_VALUE),
      )
        .to.emit(eth.assets[TEST_CASE.ASSET], "Transfer")
        .withArgs(sender.address, receiver.address, TEST_CASE.TRANSFER_VALUE);
    });

    it("cannot transfer more than balance", async ({ eth }) => {
      await expectWait(
        eth.assets[TEST_CASE.ASSET]
          .connect(sender)
          .transfer(receiver.address, TEST_CASE.SENDER_BALANCE + 1n),
      ).to.be.revertedWith("ERC20InsufficientBalance");
      // TODO: revertedWithCustomError
    });

    it("can transfer full balance", async ({ eth }) => {
      await eth.waitForResult(
        eth.assets[TEST_CASE.ASSET]
          .connect(sender)
          .transfer(receiver.address, TEST_CASE.SENDER_BALANCE),
      );

      const senderBalance = await eth.assets[TEST_CASE.ASSET].balanceOf(
        sender.address,
      );
      const receiverBalance = await eth.assets[TEST_CASE.ASSET].balanceOf(
        receiver.address,
      );

      expect(senderBalance).to.eq(0);
      expect(receiverBalance).to.eq(TEST_CASE.SENDER_BALANCE);
    });

    it("cannot transfer to zero address", async ({ eth }) => {
      await expectWait(
        eth.assets[TEST_CASE.ASSET]
          .connect(sender)
          .transfer(ethers.ZeroAddress, 1n),
      ).to.be.revertedWith("ERC20InvalidReceiver");
    });
  });
}
