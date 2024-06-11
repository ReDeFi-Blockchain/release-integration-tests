import { expect } from "chai";
import { it } from "../../fixtures/cross-chain";
import { GBP, NAT } from "../../utils/currency";

describe("Cross-chain", () => {
  it("can transfer native tokens ", async ({ ethMain, ethSibling }) => {
    const BALANCE = GBP(3);
    const TRANSFER = GBP(2);

    const [account] = await ethMain.accounts.generate([
      { NATIVE: NAT(10), GBP: GBP(3) },
    ]);

    // Arrange: get balances before
    const siblingBalanceBefore = await ethSibling.assets.GBP.balanceOf(
      account.address,
    );
    expect(siblingBalanceBefore).to.eq(0n);

    // TODO this is probably flaky test
    //      because total supply can be changed during the execution:
    const totalSupplyMainBefore = await ethMain.assets.GBP.totalSupply();
    const totalSupplySiblingBefore = await ethSibling.assets.GBP.totalSupply();

    // Make cross-chain transfer
    await ethMain.waitForResult(
      ethMain.assets.GBP.connect(account).crossChainTransfer(
        ethSibling.CONSTANTS.CHAIN_ID,
        account.address,
        TRANSFER,
      ),
    );

    await ethSibling.waitForBlock(3);

    // Assert: get balances and supply after cross chain transfer
    const mainBalanceAfter = await ethMain.assets.GBP.balanceOf(
      account.address,
    );
    const siblingBalanceAfter = await ethSibling.assets.GBP.balanceOf(
      account.address,
    );
    const totalSupplyMainAfter = await ethMain.assets.GBP.totalSupply();
    const totalSupplySiblingAfter = await ethSibling.assets.GBP.totalSupply();

    expect(mainBalanceAfter).to.eq(BALANCE - TRANSFER);
    expect(siblingBalanceAfter).to.eq(TRANSFER);
    expect(totalSupplyMainAfter).to.eq(totalSupplyMainBefore - TRANSFER);
    expect(totalSupplySiblingAfter).to.eq(totalSupplySiblingBefore + TRANSFER);
  });
});
