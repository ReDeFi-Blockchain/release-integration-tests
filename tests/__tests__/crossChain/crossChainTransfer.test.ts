import { expect } from "chai";
import { it } from "../../fixtures/cross-chain";
import { GBP, NAT } from "../../utils/currency";
import { AccountAssetType, AccountBalance } from "../../utils/types";

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
];

describe("Cross-chain", () => {
  for (const {
    ASSET_TRANSFER,
    ASSET_RECEIVE,
    SENDER_BALANCE,
    TRANSFER_VALUE,
  } of CASES) {
    it(`can transfer ${ASSET_TRANSFER} tokens`, async ({
      ethMain,
      ethSibling,
    }) => {
      const [account] = await ethMain.accounts.generate([SENDER_BALANCE]);

      // Arrange: get balances before
      const siblingBalanceBefore = await ethSibling.assets[
        ASSET_RECEIVE
      ].balanceOf(account.address);
      expect(siblingBalanceBefore).to.eq(0n);

      // TODO this is probably flaky test
      //      because total supply can be changed during the execution:
      const totalSupplyMainBefore =
        await ethMain.assets[ASSET_TRANSFER].totalSupply();
      const totalSupplySiblingBefore =
        await ethSibling.assets[ASSET_RECEIVE].totalSupply();

      // Make cross-chain transfer
      await ethMain.waitForResult(
        ethMain.assets[ASSET_TRANSFER].connect(account).crossChainTransfer(
          ethSibling.CONSTANTS.CHAIN_ID,
          account.address,
          TRANSFER_VALUE,
        ),
      );

      await ethSibling.waitForBlock(3);

      // Assert: get balances and supply after cross chain transfer
      const mainBalanceAfter = await ethMain.assets[ASSET_TRANSFER].balanceOf(
        account.address,
      );
      const siblingBalanceAfter = await ethSibling.assets[
        ASSET_RECEIVE
      ].balanceOf(account.address);
      const totalSupplyMainAfter =
        await ethMain.assets[ASSET_TRANSFER].totalSupply();
      const totalSupplySiblingAfter =
        await ethSibling.assets[ASSET_RECEIVE].totalSupply();

      expect(mainBalanceAfter).to.eq(
        SENDER_BALANCE[ASSET_TRANSFER]! - TRANSFER_VALUE,
      );
      expect(siblingBalanceAfter).to.eq(TRANSFER_VALUE);
      expect(totalSupplyMainAfter).to.eq(
        totalSupplyMainBefore - TRANSFER_VALUE,
      );
      expect(totalSupplySiblingAfter).to.eq(
        totalSupplySiblingBefore + TRANSFER_VALUE,
      );
    });
  }
});
