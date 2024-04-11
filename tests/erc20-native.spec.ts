import { expect } from "chai";
import { BigNumber } from "ethers";
import { loadFixture } from "fixtures";
import { describe, it, beforeAll } from "vitest";

beforeAll(async () => {});

describe("Native token as ERC-20", () => {
  it("should return total supply", async () => {
    const { nativeErc20, polka } = await loadFixture();

    const polkaSupply = BigNumber.from(
      (await polka.query.balances.totalIssuance()).toJSON(),
    );
    const totalSupply = await nativeErc20.totalSupply();

    expect(totalSupply).to.deep.eq(polkaSupply);
  });
});
