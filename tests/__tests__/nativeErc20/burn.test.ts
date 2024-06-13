import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { NAT } from "../../utils/currency";

// Native mint, burn, burnFrom not implemented
describe.skip("Native token burn", () => {
  const INITIAL_BALANCE = NAT(5);
  const APPROVE_VALUE = NAT(3);
  const BURN_AMOUNT = 1n;

  it("token owner can burn", async ({ eth }) => {
    const [account] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
    ]);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(account).burn(BURN_AMOUNT),
    );

    throw Error("Continue this test when burn added");
    // events
    // balances
  });

  it("approved account can burnFrom", async ({ eth }) => {
    const [owner, spender] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
      { NATIVE: INITIAL_BALANCE },
    ]);

    const { fee: approveFee } = await eth.waitForResult(
      eth.assets.NATIVE.connect(owner).approve(spender, APPROVE_VALUE),
    );

    await eth.waitForResult(
      eth.assets.NATIVE.connect(spender).burnFrom(owner, BURN_AMOUNT),
    );

    throw Error("Continue this test when burn added");
    // events
    // balances

    const balance = await eth.assets.NATIVE.balanceOf(owner);
    expect(balance).to.eq(INITIAL_BALANCE - approveFee);
  });

  it("burnFrom decreases allowance", async ({ eth }) => {
    const [owner, spender] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
      { NATIVE: INITIAL_BALANCE },
    ]);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(owner).approve(spender, APPROVE_VALUE),
    );

    await eth.waitForResult(
      eth.assets.NATIVE.connect(spender).burnFrom(owner, BURN_AMOUNT),
    );

    const allowance = await eth.assets.NATIVE.allowance(owner, spender);
    expect(allowance).to.eq(APPROVE_VALUE - BURN_AMOUNT);
  });
});
