import { BAX } from "../../utils/currency";
import { expect } from "chai";
import { it } from "../../fixtures/general-fixture";

describe("Native token as ERC-20", () => {
  it("should implement IERC20Metadata", async ({ eth }) => {
    const name = await eth.nativeErc20.name();
    const symbol = await eth.nativeErc20.symbol();
    const decimals = await eth.nativeErc20.decimals();

    expect(name).to.eq(eth.CONSTANTS.NAME);
    expect(symbol).to.eq(eth.CONSTANTS.SYMBOL);
    expect(decimals).to.eq(eth.CONSTANTS.DECIMALS);
  });

  it("should return totalSupply", async ({ sub, eth }) => {
    const subTotalSupply = await sub.system.getTotalIssuance();
    const ethTotalSupply = await eth.nativeErc20.totalSupply();

    expect(ethTotalSupply).to.eq(subTotalSupply);
  });

  describe("should return balanceOf", () => {
    it("for non-existent account", async ({ eth }) => {
      const newEthAccount = await eth.accounts.generate();
      const balanceOfEmpty = await eth.nativeErc20.balanceOf(
        newEthAccount.address,
      );
      expect(balanceOfEmpty).to.eq(0);
    });

    it("for account with balance", async ({ eth }) => {
      const BALANCE = BAX(0.5890002);
      const ethAccount = await eth.accounts.generate(BALANCE);

      const balance = await eth.nativeErc20.balanceOf(ethAccount.address);
      expect(balance).to.eq(BALANCE);
    });
  });
});
