import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { NAT } from "../../utils/currency";

it(`NATIVE mint by random account reverted with UnauthorizedAccount`, async ({
  eth,
}) => {
  const INITIAL_BALANCE = NAT(10000);
  const MINT_VALUE = NAT(5000);

  const [account] = await eth.accounts.generate([{ NATIVE: INITIAL_BALANCE }]);

  await expect(
    eth.waitForResult(
      eth.assets.NATIVE.connect(account).mint(account, MINT_VALUE),
    ),
  ).revertedWith("UnauthorizedAccount");

  const balance = await eth.assets.NATIVE.balanceOf(account);
  expect(balance).to.eq(INITIAL_BALANCE);
});
