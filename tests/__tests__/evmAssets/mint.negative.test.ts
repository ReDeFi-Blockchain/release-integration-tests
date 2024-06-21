import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { NAT } from "../../utils/currency";
import { AccountAssetType } from "../../utils/types";
import { NETWORK_CONSTANTS } from "../../utils/constants";

const TEST_CASES: AccountAssetType[] = ["GBP", "SIBLING"] as const;

for (const ASSET of TEST_CASES) {
  it(`${ASSET} mint by random account reverted with OwnableUnauthorizedAccount`, async ({
    eth,
  }) => {
    const MINT_AMOUNT = 1;
    const [account] = await eth.accounts.generate([{ NATIVE: NAT(5) }]);

    await expect(
      eth.waitForResult(
        eth.assets[ASSET].connect(account).mint(account, MINT_AMOUNT),
      ),
    ).revertedWith(
      // FIXME(vklachkov): Behaviour of relay chain and parachain is different
      // after PR https://github.com/ReDeFi-Blockchain/redefi-parachain/pull/9.
      eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID
        ? "OwnableUnauthorizedAccount"
        : "UnauthorizedAccount",
    );

    const balance = await eth.assets[ASSET].balanceOf(account);
    expect(balance).to.eq(0);
  });
}
