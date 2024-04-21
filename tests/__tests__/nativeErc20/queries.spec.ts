import EtherHelper from "../../utils/ether";
import { BAX } from "../../utils/currency";
import { TestERC20 } from "../../typechain-types";
import { loadFixture } from "../../utils/fixture";
import SubHelper from "../../utils/substrate";
import { expect } from "chai";

let sub: SubHelper;
let eth: EtherHelper;
let nativeErc20: TestERC20;

before(async () => {
  const helpers = await loadFixture(__filename);
  sub = helpers.sub;
  eth = helpers.eth;
  nativeErc20 = helpers.eth.nativeErc20;
});

describe("Native token as ERC-20", () => {
  it("should implement IERC20Metadata", async () => {
    const name = await nativeErc20.name();
    const symbol = await nativeErc20.symbol();
    const decimals = await nativeErc20.decimals();

    expect(name).to.eq("redefi");
    expect(symbol).to.eq("BAX");
    expect(decimals).to.eq(18);
  });

  it("should return totalSupply", async () => {
    const subTotalSupply = await sub.system.getTotalIssuance();
    const ethTotalSupply = await nativeErc20.totalSupply();

    expect(ethTotalSupply).to.deep.eq(subTotalSupply);
  });

  describe("should return balanceOf", () => {
    it("for non-existent account", async () => {
      const newEthAccount = await eth.accounts.generate();
      const balanceOfEmpty = await nativeErc20.balanceOf(newEthAccount.address);
      expect(balanceOfEmpty).to.deep.eq(0);
    });

    it("for account with balance", async () => {
      const BALANCE = BAX(0.5890002);
      const ethAccount = await eth.accounts.generate(BALANCE);

      const balance = await nativeErc20.balanceOf(ethAccount.address);
      expect(balance).to.deep.eq(BALANCE);
    });
  });
});
