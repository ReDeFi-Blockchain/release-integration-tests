import { it } from "../../fixtures/standalone";
import { expect } from "chai";
import { GBP, NAT } from "../../utils/currency";
import { AccountAssetType, AccountBalance } from "../../utils/types";
import { expectWait } from "../../utils/matchers/expectWait";

type TestCase = {
  ASSET: AccountAssetType;
  INITIAL_BALANCE: AccountBalance;
  APPROVE_VALUE: bigint;
};

const TEST_CASES: TestCase[] = [
  {
    ASSET: "GBP",
    INITIAL_BALANCE: { NATIVE: NAT(5), GBP: GBP(5) },
    APPROVE_VALUE: GBP(3),
  },
  {
    ASSET: "SIBLING",
    INITIAL_BALANCE: { NATIVE: NAT(5), SIBLING: NAT(5) },
    APPROVE_VALUE: NAT(3),
  },
];

// NOTE: burn and burnFrom probaly should not be allowed to anyone except "admin"
for (const { ASSET, INITIAL_BALANCE, APPROVE_VALUE } of TEST_CASES) {
  describe(`${ASSET} burn`, () => {
    it("token owner cannot burn more than balance", async ({ eth }) => {
      const [account] = await eth.accounts.generate([INITIAL_BALANCE]);

      await expectWait(
        eth.assets[ASSET].connect(account).burn(INITIAL_BALANCE[ASSET]! + 1n),
      ).to.revertedWith("ERC20InsufficientBalance");

      const balance = await eth.assets[ASSET].balanceOf(account);
      expect(balance).eq(INITIAL_BALANCE[ASSET]!);
    });

    it("approved account cannot burnFrom an amount exceeding the approved limit", async ({
      eth,
    }) => {
      const [owner, spender] = await eth.accounts.generate([
        INITIAL_BALANCE,
        INITIAL_BALANCE,
      ]);

      await eth.waitForResult(
        eth.assets[ASSET].connect(owner).approve(spender, APPROVE_VALUE),
      );

      await expectWait(
        eth.assets[ASSET].connect(spender).burnFrom(owner, APPROVE_VALUE + 1n),
      ).to.revertedWith("ERC20InsufficientAllowance");

      const balance = await eth.assets[ASSET].balanceOf(owner);
      expect(balance).to.eq(INITIAL_BALANCE[ASSET]!);
    });
  });
}
