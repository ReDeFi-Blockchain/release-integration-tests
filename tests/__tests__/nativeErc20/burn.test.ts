import { it } from "../../fixtures/standalone";
import { expect } from "chai";
import { NAT } from "../../utils/currency";
import { expectWait } from "../../utils/matchers/expectWait";
import { ethers } from "hardhat";
import { NETWORK_CONSTANTS } from "../../utils/constants";

// NOTE: burn and burnFrom probaly should not be allowed to anyone except "admin"
describe(`NATIVE burn`, () => {
  const INITIAL_BALANCE = NAT(10000);
  const APPROVE_VALUE = NAT(1000);
  const BURN_AMOUNT = NAT(1);

  it("token owner can burn", async ({ eth }) => {
    // Mint exists only on parachain.
    if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

    const [account] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
    ]);

    const burnTx = eth.assets.NATIVE.connect(account).burn(BURN_AMOUNT);

    await expectWait(burnTx)
      .to.emit(eth.assets.NATIVE, "Transfer")
      .withArgs(account.address, ethers.ZeroAddress, BURN_AMOUNT);

    const burnFee = (await eth.waitForResult(burnTx)).fee;

    const balance = await eth.assets.NATIVE.balanceOf(account);
    expect(balance).eq(INITIAL_BALANCE - BURN_AMOUNT - burnFee);
  });

  it("approved account can burnFrom", async ({ eth }) => {
    // Mint exists only on parachain.
    if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

    const [owner, spender] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
      { NATIVE: INITIAL_BALANCE },
    ]);

    const { fee: approveFee } = await eth.waitForResult(
      eth.assets.NATIVE.connect(owner).approve(spender, APPROVE_VALUE),
    );

    await expectWait(
      eth.assets.NATIVE.connect(spender).burnFrom(owner, BURN_AMOUNT),
    )
      .to.emit(eth.assets.NATIVE, "Transfer")
      .withArgs(owner.address, ethers.ZeroAddress, BURN_AMOUNT);

    const balance = await eth.assets.NATIVE.balanceOf(owner);
    expect(balance).to.eq(INITIAL_BALANCE - BURN_AMOUNT - approveFee);
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
