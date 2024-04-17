import { BigNumber } from "ethers";
import { beforeAll, describe, it, expect } from "vitest";
import { loadFixture } from "../../fixtures";
import EtherHelper from "../../utils/ether";
import SubHelper from "../../utils/polka";
import { BAX } from "../../utils/currency";
import { ERC20Contract } from "../../ABIGEN";

let sub: SubHelper;
let eth: EtherHelper;
let nativeErc20: ERC20Contract;

beforeAll(async () => {
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
      const newEthAccount = await eth.accounts.getRandomWallet();
      const balanceOfEmpty = await nativeErc20.balanceOf(newEthAccount.address);
      expect(balanceOfEmpty).to.deep.eq(BigNumber.from(0));
    });

    it("for account with balance", async () => {
      const BALANCE = BAX(0.5890002);
      const ethAccount = await eth.accounts.getRandomWallet(BALANCE);

      const balance = await nativeErc20.balanceOf(ethAccount.address);
      expect(balance).to.deep.eq(BALANCE);
    });
  });
});
