import { expect } from "chai";
import { GBP, NAT } from "../../utils/currency";
import { it } from "../../fixtures/general-fixture";
import { AccountAssetType, AccountBalance } from "../../utils/types";

type TestCase = {
  ASSET: AccountAssetType;
  OWNER_BALANCE: AccountBalance;
  SPENDER_BALANCE: AccountBalance;
  APPROVE_VALUE: bigint;
};

const CASES: TestCase[] = [
  {
    ASSET: "SIBLING",
    OWNER_BALANCE: { NATIVE: NAT(2), SIBLING: NAT(2) },
    SPENDER_BALANCE: { NATIVE: NAT(2) },
    APPROVE_VALUE: NAT(1.5),
  },
  {
    ASSET: "GBP",
    OWNER_BALANCE: { NATIVE: NAT(2), GBP: GBP(2) },
    SPENDER_BALANCE: { NATIVE: NAT(2) },
    APPROVE_VALUE: GBP(1.5),
  },
];

for (const TEST_CASE of CASES) {
  describe(`${TEST_CASE.ASSET} asset allowance`, () => {
    it("zero for new account", async ({ eth }) => {
      const [randomAccount1, randomAccount2] = await eth.accounts.generateV2([
        {},
        {},
      ]);

      const allowance = await eth.assets[TEST_CASE.ASSET].allowance(
        randomAccount1.address,
        randomAccount2.address,
      );

      expect(allowance).to.eq(0);
    });

    it("can be changed by approve", async ({ eth }) => {
      const [owner, spender] = await eth.accounts.generateV2([
        TEST_CASE.OWNER_BALANCE,
        TEST_CASE.SPENDER_BALANCE,
      ]);

      await eth.signAndSend(
        eth.assets[TEST_CASE.ASSET]
          .connect(owner)
          .approve(spender.address, TEST_CASE.APPROVE_VALUE),
      );

      // Increase approve value
      const allowance = await eth.assets[TEST_CASE.ASSET].allowance(
        owner.address,
        spender.address,
      );

      expect(allowance).to.eq(TEST_CASE.APPROVE_VALUE);

      // Decrease approve value
      await eth.signAndSend(
        eth.assets[TEST_CASE.ASSET].connect(owner).approve(spender.address, 0),
      );

      const allowanceAfter = await eth.assets[TEST_CASE.ASSET].allowance(
        owner.address,
        spender.address,
      );
      expect(allowanceAfter).to.eq(0);
    });
  });
}
