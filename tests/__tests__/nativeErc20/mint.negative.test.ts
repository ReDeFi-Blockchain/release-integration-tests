import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { NAT } from "../../utils/currency";
import { AccountAssetType } from "../../utils/types";

const TEST_CASES: AccountAssetType[] = ["NATIVE"] as const;

// Native mint, burn, burnFrom not implemented
for (const ASSET of TEST_CASES) {
  it.skip(`${ASSET} mint by random account reverted with OwnableUnauthorizedAccount`, async ({
    eth,
  }) => {
    const MINT_AMOUNT = 1;
    const [account] = await eth.accounts.generate([{ NATIVE: NAT(5) }]);

    await expect(
      eth.waitForResult(
        eth.assets[ASSET].connect(account).mint(account, MINT_AMOUNT),
      ),
    ).revertedWith("OwnableUnauthorizedAccount");

    const balance = await eth.assets[ASSET].balanceOf(account);
    expect(balance).to.eq(0);
  });
}
