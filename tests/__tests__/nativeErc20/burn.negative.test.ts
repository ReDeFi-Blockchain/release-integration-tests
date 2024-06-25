import { it } from "../../fixtures/standalone";
import { expect } from "chai";
import { NAT } from "../../utils/currency";
import { expectWait } from "../../utils/matchers/expectWait";
import { NETWORK_CONSTANTS } from "../../utils/constants";

// NOTE: burn and burnFrom probaly should not be allowed to anyone except "admin"
describe(`NATIVE burn`, () => {
  const INITIAL_BALANCE = NAT(10000);
  const APPROVE_VALUE = NAT(1000);

  it("token owner cannot burn more than balance", async ({ eth }) => {
    // Mint exists only on parachain.
    if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

    const [account] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
    ]);

    await expectWait(
      eth.assets.NATIVE.connect(account).burn(INITIAL_BALANCE + 1n),
    ).to.revertedWith("ERC20InsufficientBalance");

    const balance = await eth.assets.NATIVE.balanceOf(account);
    expect(balance).eq(INITIAL_BALANCE);
  });

  it("approved account cannot burnFrom an amount exceeding the approved limit", async ({
    eth,
  }) => {
    // Mint exists only on parachain.
    if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

    const [owner, spender] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
      { NATIVE: INITIAL_BALANCE },
    ]);

    const approveTx = await eth.waitForResult(
      eth.assets.NATIVE.connect(owner).approve(spender, APPROVE_VALUE),
    );

    await expectWait(
      eth.assets.NATIVE.connect(spender).burnFrom(owner, APPROVE_VALUE + 1n),
    ).to.revertedWith("ERC20InsufficientAllowance");

    const balance = await eth.assets.NATIVE.balanceOf(owner);
    expect(balance).to.eq(INITIAL_BALANCE - approveTx.fee);
  });
});
