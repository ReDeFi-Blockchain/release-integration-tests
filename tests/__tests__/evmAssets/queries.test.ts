import { GBP, NAT } from "../../utils/currency";
import { expect } from "chai";
import { it } from "../../fixtures/general-fixture";
import { AccountAssetType, AccountBalance } from "../../utils/types";

type TestCase = {
  ASSET: AccountAssetType;
  ACCOUNT_BALANCE: AccountBalance;
  EXPECTED_SUPPLY: bigint;
  EXPECTED_BALANCE: bigint;
};

const CASES: TestCase[] = [
  {
    ASSET: "SIBLING",
    ACCOUNT_BALANCE: { NATIVE: NAT(2), SIBLING: NAT(1) },
    EXPECTED_BALANCE: NAT(1),
    EXPECTED_SUPPLY: NAT(120_000),
  },
  {
    ASSET: "GBP",
    ACCOUNT_BALANCE: { NATIVE: NAT(2), GBP: GBP(1) },
    EXPECTED_BALANCE: GBP(1),
    EXPECTED_SUPPLY: GBP(120_000),
  },
];

for (const TEST_CASE of CASES) {
  describe(`${TEST_CASE.ASSET} asset`, () => {
    it("should have correct name", async ({ eth }) => {
      const name = await eth.assets[TEST_CASE.ASSET].name();
      expect(name).to.eq(eth.CONSTANTS[TEST_CASE.ASSET].NAME);
    });

    it("should have correct symbol", async ({ eth }) => {
      const symbol = await eth.assets[TEST_CASE.ASSET].symbol();
      expect(symbol).to.eq(eth.CONSTANTS[TEST_CASE.ASSET].SYMBOL);
    });

    it("should have correct decimals", async ({ eth }) => {
      const decimals = await eth.assets[TEST_CASE.ASSET].decimals();
      expect(decimals).to.eq(eth.CONSTANTS[TEST_CASE.ASSET].DECIMALS);
    });

    it("should return totalSupply", async ({ eth }) => {
      const ethTotalSupply = await eth.assets[TEST_CASE.ASSET].totalSupply();
      expect(ethTotalSupply).to.eq(TEST_CASE.EXPECTED_SUPPLY);
    });

    describe("should return balanceOf", () => {
      it("for non-existent account", async ({ eth }) => {
        const [newEthAccount] = await eth.accounts.generateV2([{}]);
        const balanceOfEmpty = await eth.assets[TEST_CASE.ASSET].balanceOf(
          newEthAccount.address,
        );
        expect(balanceOfEmpty).to.eq(0);
      });

      it("for account with balance", async ({ eth }) => {
        const [ethAccount] = await eth.accounts.generateV2([
          TEST_CASE.ACCOUNT_BALANCE,
        ]);

        const balance = await eth.assets.NATIVE.balanceOf(ethAccount.address);
        expect(balance).to.eq(TEST_CASE.EXPECTED_BALANCE);
      });
    });
  });
}
