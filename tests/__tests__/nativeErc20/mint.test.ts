import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { NETWORK_CONSTANTS } from "../../utils/constants";
import { NAT } from "../../utils/currency";

it(`NATIVE owner can mint new tokens`, async ({ eth, sub }) => {
  // Mint exists only on parachain.
  if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

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
