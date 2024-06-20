import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { NAT, TOKEN } from "../../utils/currency";
import { AccountAssetType } from "../../utils/types";

const TEST_ASSETS: AccountAssetType[] = ["GBP", "SIBLING"] as const;

for (const ASSET of TEST_ASSETS) {
  it(`${ASSET} owner can mint new tokens`, async ({
    eth, sub,
  }) => {
    const asset = eth.assets[ASSET];

    const [account] = await eth.accounts.generate([{ NATIVE: NAT(10000) }]);
    
    const assetDecimals = asset.decimals()
    const mintValue = TOKEN(10000, Number(assetDecimals));
    const assetAddress = await asset.getAddress() as `0x${string}`;

    await sub.accounts.mint(
      { to: account.address, value: mintValue, erc20: assetAddress },
      sub.sudo,
    )

    const balance = await asset.balanceOf(account);
    expect(balance).to.eq(mintValue);
  });
}
