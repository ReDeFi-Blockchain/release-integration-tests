import { it } from "../../fixtures/standalone";
import { expect } from "chai";
import { GBP, NAT } from "../../utils/currency";
import { AccountAssetType, AccountBalance } from "../../utils/types";
import { expectWait } from "../../utils/matchers/expectWait";
import { ethers } from "hardhat";

type TestCase = {
  ASSET: AccountAssetType;
  INITIAL_BALANCE: AccountBalance;
  APPROVE_VALUE: bigint;
  BURN_AMOUNT: bigint;
};

const TEST_CASES: TestCase[] = [
  {
    ASSET: "GBP",
    INITIAL_BALANCE: { NATIVE: NAT(5), GBP: GBP(5) },
    APPROVE_VALUE: GBP(3),
    BURN_AMOUNT: 1n,
  },
  {
    ASSET: "SIBLING",
    INITIAL_BALANCE: { NATIVE: NAT(5), SIBLING: NAT(5) },
    APPROVE_VALUE: NAT(3),
    BURN_AMOUNT: 1n,
  },
];

// NOTE: burn and burnFrom probaly should not be allowed to anyone except "admin"
for (const {
  ASSET,
  INITIAL_BALANCE,
  BURN_AMOUNT,
  APPROVE_VALUE,
} of TEST_CASES) {
  describe(`${ASSET} burn`, () => {
    it("token owner can burn", async ({ eth }) => {
      const [account] = await eth.accounts.generate([INITIAL_BALANCE]);

      await expectWait(eth.assets[ASSET].connect(account).burn(BURN_AMOUNT))
        .to.emit(eth.assets[ASSET], "Transfer")
        .withArgs(account.address, ethers.ZeroAddress, BURN_AMOUNT);

      const balance = await eth.assets[ASSET].balanceOf(account);
      expect(balance).eq(INITIAL_BALANCE[ASSET]! - BURN_AMOUNT);
    });

    it("approved account can burnFrom", async ({ eth }) => {
      const [owner, spender] = await eth.accounts.generate([
        INITIAL_BALANCE,
        INITIAL_BALANCE,
      ]);

      await eth.waitForResult(
        eth.assets[ASSET].connect(owner).approve(spender, APPROVE_VALUE),
      );

      await expectWait(
        eth.assets[ASSET].connect(spender).burnFrom(owner, BURN_AMOUNT),
      )
        .to.emit(eth.assets[ASSET], "Transfer")
        .withArgs(owner.address, ethers.ZeroAddress, BURN_AMOUNT);

      const balance = await eth.assets[ASSET].balanceOf(owner);
      expect(balance).to.eq(INITIAL_BALANCE[ASSET]! - BURN_AMOUNT);
    });

    it("burnFrom decreases allowance", async ({ eth }) => {
      const [owner, spender] = await eth.accounts.generate([
        INITIAL_BALANCE,
        INITIAL_BALANCE,
      ]);

      await eth.waitForResult(
        eth.assets[ASSET].connect(owner).approve(spender, APPROVE_VALUE),
      );

      await eth.waitForResult(
        eth.assets[ASSET].connect(spender).burnFrom(owner, BURN_AMOUNT),
      );

      const allowance = await eth.assets[ASSET].allowance(owner, spender);
      expect(allowance).to.eq(APPROVE_VALUE - BURN_AMOUNT);
    });
  });
}
