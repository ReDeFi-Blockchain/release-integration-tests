import { NAT } from "../../utils/currency";
import { expect } from "chai";
import { it } from "../../fixtures/standalone";

describe("Native token as ERC-20", () => {
  it("should have correct name", async ({ eth }) => {
    const name = await eth.assets.NATIVE.name();
    expect(name).to.eq(eth.CONSTANTS.NATIVE.NAME);
  });

  it("should have correct symbol", async ({ eth }) => {
    const symbol = await eth.assets.NATIVE.symbol();
    expect(symbol).to.eq(eth.CONSTANTS.NATIVE.SYMBOL);
  });

  it("should have correct decimals", async ({ eth }) => {
    const decimals = await eth.assets.NATIVE.decimals();
    expect(decimals).to.eq(eth.CONSTANTS.NATIVE.DECIMALS);
  });

  it("should return totalSupply", async ({ sub, eth }) => {
    const subTotalSupply = await sub.system.getTotalIssuance();
    const ethTotalSupply = await eth.assets.NATIVE.totalSupply();

    expect(ethTotalSupply).to.eq(subTotalSupply);
  });

  describe("should return balanceOf", () => {
    it("for non-existent account", async ({ eth }) => {
      const [newEthAccount] = await eth.accounts.generate([{}]);
      const balanceOfEmpty = await eth.assets.NATIVE.balanceOf(
        newEthAccount.address,
      );
      expect(balanceOfEmpty).to.eq(0);
    });

    it("for account with balance", async ({ eth }) => {
      const BALANCE = NAT(0.5890002);
      const [ethAccount] = await eth.accounts.generate([{ NATIVE: BALANCE }]);

      const balance = await eth.assets.NATIVE.balanceOf(ethAccount.address);
      expect(balance).to.eq(BALANCE);
    });
  });
});
