import { expect } from "chai";
import { it } from "../../fixtures/cross-chain";
import { NAT } from "../../utils/currency";

describe("Cross-chain", () => {
  it("can transfer native tokens ", async ({ ethMain, ethSibling }) => {
    const BALANCE = NAT(100);
    const TRANSFER = NAT(80);

    const [account] = await ethMain.accounts.generate([{ NATIVE: BALANCE }]);

    // Arrange: get balances before
    const siblingBalanceBefore = await ethSibling.assets.SIBLING.balanceOf(
      account.address,
    );
    expect(siblingBalanceBefore).to.eq(0n);

    // TODO this is probably flaky test
    //      because total supply can be changed during the execution:
    const totalSupplyMainBefore = await ethMain.assets.NATIVE.totalSupply();
    const totalSupplySiblingBefore = await ethMain.assets.SIBLING.totalSupply();

    // Make cross-chain transfer
    const { fee } = await ethMain.waitForResult(
      ethMain.assets.NATIVE.connect(account).crossChainTransfer(
        ethSibling.CONSTANTS.CHAIN_ID,
        account.address,
        TRANSFER,
      ),
    );

    await ethSibling.waitForBlock(2);

    // Assert: get balances and supply after cross chain transfer
    const mainBalanceAfter = await ethMain.assets.NATIVE.balanceOf(
      account.address,
    );
    const siblingBalanceAfter = await ethSibling.assets.SIBLING.balanceOf(
      account.address,
    );
    const totalSupplyMainAfter = await ethMain.assets.NATIVE.totalSupply();
    const totalSupplySiblingAfter = await ethMain.assets.SIBLING.totalSupply();

    expect(mainBalanceAfter).to.eq(BALANCE - TRANSFER - fee);
    expect(siblingBalanceAfter).to.eq(TRANSFER);
    expect(totalSupplyMainAfter).to.eq(totalSupplyMainBefore - TRANSFER);
    expect(totalSupplySiblingAfter).to.eq(totalSupplySiblingBefore + TRANSFER);
  });
});
