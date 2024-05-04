import { GBP, NAT } from "../../utils/currency";
import { expect } from "chai";
import { ethers } from "hardhat";
import { it } from "../../fixtures/general-fixture";
import { expectWait } from "../../utils/matchers/expectWait";
import { AccountAssetType, AccountBalance } from "../../utils/types";

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
    it("can be sent by transfer", async ({ eth }) => {
      const [sender, receiver] = await eth.accounts.generateV2([
        TEST_CASE.ACCOUNT_BALANCE,
        {},
      ]);

      await eth.signAndSend(
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
      const [sender] = await eth.accounts.generateV2([
        TEST_CASE.ACCOUNT_BALANCE,
      ]);

      await expectWait(
        eth.assets[TEST_CASE.ASSET]
          .connect(sender)
          .transfer(eth.donor.address, TEST_CASE.TRANSFER_VALUE),
      )
        .to.emit(eth.assets.NATIVE, "Transfer")
        .withArgs(sender.address, eth.donor.address, TEST_CASE.TRANSFER_VALUE);
    });

    it("cannot transfer more than balance", async ({ eth }) => {
      const [sender] = await eth.accounts.generateV2([
        TEST_CASE.ACCOUNT_BALANCE,
      ]);

      await expectWait(
        eth.assets[TEST_CASE.ASSET]
          .connect(sender)
          .transfer(eth.donor.address, TEST_CASE.SENDER_BALANCE + 1n),
      ).to.be.revertedWithCustomError(
        eth.assets.NATIVE,
        "ERC20InsufficientBalance",
      );
    });

    it("can transfer full balance", async ({ eth }) => {
      const [sender] = await eth.accounts.generateV2([
        TEST_CASE.ACCOUNT_BALANCE,
      ]);

      await expectWait(
        eth.assets[TEST_CASE.ASSET]
          .connect(sender)
          .transfer(eth.donor.address, TEST_CASE.SENDER_BALANCE),
      ).to.changeTokenBalances(
        TEST_CASE.ASSET,
        [sender, eth.donor],
        [-TEST_CASE.SENDER_BALANCE, TEST_CASE.SENDER_BALANCE],
      );
    });

    it("cannot transfer to zero address", async ({ eth }) => {
      const [sender] = await eth.accounts.generateV2([
        TEST_CASE.ACCOUNT_BALANCE,
      ]);

      await expectWait(
        eth.assets[TEST_CASE.ASSET]
          .connect(sender)
          .transfer(ethers.ZeroAddress, 1n),
      ).to.be.revertedWith("ERC20InvalidReceiver");
    });
  });
}
