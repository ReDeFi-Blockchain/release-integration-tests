import { expect } from "chai";
import { it } from "../../fixtures/cross-chain";
import { GBP, NAT } from "../../utils/currency";
import { AccountAssetType, AccountBalance } from "../../utils/types";
import { expectWait } from "../../utils/matchers/expectWait";

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
    TRANSFER_VALUE: NAT(2) + 1n,
  },
  {
    ASSET_TRANSFER: "SIBLING",
    ASSET_RECEIVE: "NATIVE",
    SENDER_BALANCE: { NATIVE: NAT(2), SIBLING: NAT(3) },
    TRANSFER_VALUE: NAT(2) + 1n,
  },
  {
    ASSET_TRANSFER: "NATIVE",
    ASSET_RECEIVE: "SIBLING",
    SENDER_BALANCE: { NATIVE: NAT(10) },
    TRANSFER_VALUE: NAT(10) + 1n,
  },
];

describe("[Negative] Cross-chain", () => {
  for (const {
    ASSET_TRANSFER,
    ASSET_RECEIVE,
    SENDER_BALANCE,
    TRANSFER_VALUE,
  } of CASES) {
    it(`cannot crossChainTransfer ${ASSET_TRANSFER} more than balance`, async ({
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
      await expectWait(
        ethMain.assets[ASSET_TRANSFER].connect(account).crossChainTransfer(
          ethSibling.CONSTANTS.CHAIN_ID,
          account.address,
          TRANSFER_VALUE,
        ),
      ).revertedWith("ERC20InsufficientBalance");
    });
  }
});
