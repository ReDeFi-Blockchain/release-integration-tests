import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { NAT } from "../../utils/currency";

it(`[serial] NATIVE owner can mint new tokens`, async ({ eth, sub }) => {
  const INITIAL_BALANCE = NAT(10000);
  const MINT_VALUE = NAT(5000);

  const [account] = await eth.accounts.generate([{ NATIVE: INITIAL_BALANCE }]);

  await sub.accounts.mint(
    {
      to: account.address,
      value: MINT_VALUE,
      erc20: eth.CONSTANTS.NATIVE.ADDRESS,
    },
    sub.sudo,
  );

  const balance = await eth.assets.NATIVE.balanceOf(account);
  expect(balance).to.eq(INITIAL_BALANCE + MINT_VALUE);
});
