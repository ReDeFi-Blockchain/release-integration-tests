import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { GBP, NAT } from "../../utils/currency";
import { AccountAssetType } from "../../utils/types";

type TestCase = {
  ASSET: AccountAssetType;
  MINT_VALUE: bigint;
};

const TEST_CASES: TestCase[] = [
  {
    ASSET: "GBP",
    MINT_VALUE: GBP(10000),
  },
  {
    ASSET: "SIBLING",
    MINT_VALUE: NAT(10000),
  },
];

for (const TEST_CASE of TEST_CASES) {
  const { ASSET, MINT_VALUE } = TEST_CASE;

  it(`${ASSET} owner can mint new tokens`, async ({ eth, sub }) => {
    const [account] = await eth.accounts.generate([{ NATIVE: NAT(10000) }]);

    await sub.accounts.mint(
      {
        to: account.address,
        value: MINT_VALUE,
        erc20: eth.CONSTANTS[ASSET].ADDRESS,
      },
      sub.sudo,
    );

    const balance = await eth.assets[ASSET].balanceOf(account);
    expect(balance).to.eq(MINT_VALUE);
  });
}
