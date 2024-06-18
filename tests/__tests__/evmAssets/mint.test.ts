import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { GBP, NAT } from "../../utils/currency";
import { AccountAssetType } from "../../utils/types";
import { ASSETS, NETWORK_CONSTANTS } from "../../utils/constants";

const TEST_CASES: AccountAssetType[] = ["GBP"] as const;

for (const ASSET of TEST_CASES) {
  it(`${ASSET} mint by Alice`, async ({
    eth, sub,
  }) => {
    const [account] = await eth.accounts.generate([{ NATIVE: NAT(5) }]);
    
    const assetValue = BigInt(1000);
    const assetAddress = await ASSETS[ASSET].ADDRESS;

    sub.accounts.mint(
      { to: account.address, value: assetValue, erc20: assetAddress },
      sub.sudo,
    )

    const balance = await eth.assets[ASSET].balanceOf(account);
    expect(balance).to.eq(1000);
  });
}
