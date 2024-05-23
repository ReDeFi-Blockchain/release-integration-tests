import { expect } from "chai";
import { it } from "../../fixtures/cross-chain";
import { GBP, NAT } from "../../utils/currency";
import { AccountAssetType, AccountBalance } from "../../utils/types";

type TestCase = {
  ASSET: AccountAssetType;
  SENDER_BALANCE: AccountBalance;
  TRANSFER_VALUE: bigint;
};

const CASES: TestCase[] = [
  {
    ASSET: "GBP",
    SENDER_BALANCE: { NATIVE: NAT(2), GBP: GBP(3) },
    TRANSFER_VALUE: GBP(1.5),
  },
];

describe("Cross-chain", () => {
  for (const { ASSET, SENDER_BALANCE, TRANSFER_VALUE } of CASES) {
    it(`can transfer ${ASSET} tokens`, async ({ ethMain, ethSibling }) => {
      const [account] = await ethMain.accounts.generate([SENDER_BALANCE]);

      // Arrange: get balances before
      const siblingBalanceBefore = await ethSibling.assets[ASSET].balanceOf(
        account.address,
      );
      expect(siblingBalanceBefore).to.eq(0n);

      // TODO this is probably flaky test
      //      because total supply can be changed during the execution:
      const totalSupplyMainBefore = await ethMain.assets[ASSET].totalSupply();
      const totalSupplySiblingBefore =
        await ethSibling.assets[ASSET].totalSupply();

      // Make cross-chain transfer
      await ethMain.waitForResult(
        ethMain.assets[ASSET].connect(account).crossChainTransfer(
          ethSibling.CONSTANTS.CHAIN_ID,
          account.address,
          TRANSFER_VALUE,
        ),
      );

      await ethSibling.waitForBlock(3);

      // Assert: get balances and supply after cross chain transfer
      const mainBalanceAfter = await ethMain.assets[ASSET].balanceOf(
        account.address,
      );
      const siblingBalanceAfter = await ethSibling.assets[ASSET].balanceOf(
        account.address,
      );
      const totalSupplyMainAfter = await ethMain.assets[ASSET].totalSupply();
      const totalSupplySiblingAfter =
        await ethSibling.assets[ASSET].totalSupply();

      expect(mainBalanceAfter).to.eq(SENDER_BALANCE[ASSET]! - TRANSFER_VALUE);
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
