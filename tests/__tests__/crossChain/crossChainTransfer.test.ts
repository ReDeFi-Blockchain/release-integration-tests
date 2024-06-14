import { expect } from "chai";
import { it } from "../../fixtures/cross-chain";
import { GBP, NAT } from "../../utils/currency";
import { AccountAssetType, AccountBalance } from "../../utils/types";
import { expectWait } from "../../utils/matchers/expectWait";
import { ethers } from "hardhat";

type TestCase = {
  ASSET_TRANSFER: AccountAssetType;
  ASSET_RECEIVE: AccountAssetType;
  SENDER_BALANCE: AccountBalance;
  TRANSFER_VALUE: bigint;
};

const CASES: TestCase[] = [
  {
    ASSET_TRANSFER: "GBP",
    ASSET_RECEIVE: "GBP",
    SENDER_BALANCE: { NATIVE: NAT(2), GBP: GBP(3) },
    TRANSFER_VALUE: GBP(1.5),
  },
  {
    ASSET_TRANSFER: "SIBLING",
    ASSET_RECEIVE: "NATIVE",
    SENDER_BALANCE: { NATIVE: NAT(2), SIBLING: NAT(3) },
    TRANSFER_VALUE: NAT(2),
  },
  {
    ASSET_TRANSFER: "NATIVE",
    ASSET_RECEIVE: "SIBLING",
    SENDER_BALANCE: { NATIVE: NAT(10) },
    TRANSFER_VALUE: NAT(2),
  },
];

describe("Cross-chain", () => {
  for (const {
    ASSET_TRANSFER,
    ASSET_RECEIVE,
    SENDER_BALANCE,
    TRANSFER_VALUE,
  } of CASES) {
    it(`can crossChainTransfer ${ASSET_TRANSFER} tokens`, async ({
      ethMain,
      ethSibling,
    }) => {
      const [account] = await ethMain.accounts.generate([SENDER_BALANCE]);

      // Arrange: get balances before
      const siblingBalanceBefore = await ethSibling.assets[
        ASSET_RECEIVE
      ].balanceOf(account.address);
      expect(siblingBalanceBefore).to.eq(0n);

      // Make cross-chain transfer
      const tx = ethMain.assets[ASSET_TRANSFER].connect(
        account,
      ).crossChainTransfer(
        ethSibling.CONSTANTS.CHAIN_ID,
        account.address,
        TRANSFER_VALUE,
      );

      // Transfer event emited on sender chain
      await expectWait(tx)
        .to.emit(ethMain.assets[ASSET_TRANSFER], "Transfer")
        .withArgs(account.address, ethers.ZeroAddress, TRANSFER_VALUE);
      // TODO check events on receiver chain

      const { fee } = await ethMain.waitForResult(tx);

      await ethSibling.waitForBlock(3);

      // Assert: get balances and supply after cross chain transfer
      const mainBalanceAfter = await ethMain.assets[ASSET_TRANSFER].balanceOf(
        account.address,
      );
      const siblingBalanceAfter = await ethSibling.assets[
        ASSET_RECEIVE
      ].balanceOf(account.address);

      // Sender's balance on the sender's chain should be eq
      // "initial balance" minus "transfer", and if it is native token minus "fee"
      const expectedBalanceMain =
        SENDER_BALANCE[ASSET_TRANSFER]! -
        TRANSFER_VALUE -
        (ASSET_TRANSFER === "NATIVE" ? fee : 0n);

      expect(mainBalanceAfter).to.eq(expectedBalanceMain);
      expect(siblingBalanceAfter).to.eq(TRANSFER_VALUE);
    });
  }
});
