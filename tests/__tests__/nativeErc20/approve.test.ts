import { expect } from "chai";
import { NAT } from "../../utils/currency";
import { it } from "../../fixtures/general-fixture";

describe("Native token as ERC-20 allowance", () => {
  it("zero for new account", async ({ eth }) => {
    const [randomAccount1, randomAccount2] = await eth.accounts.generate([
      {},
      {},
    ]);

    const allowance = await eth.assets.NATIVE.allowance(
      randomAccount1.address,
      randomAccount2.address,
    );

    expect(allowance).to.eq(0);
  });

  it("can be changed by approve", async ({ eth }) => {
    const APPROVED = NAT(0.8);
    const [owner, spender] = await eth.accounts.generate([
      { NATIVE: NAT(1.5) },
      { NATIVE: NAT(0.3) },
    ]);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(owner).approve(spender.address, APPROVED),
    );

    // Increase approve value
    const allowance = await eth.assets.NATIVE.allowance(
      owner.address,
      spender.address,
    );

    expect(allowance).to.eq(APPROVED);

    // Decrease approve value
    await eth.waitForResult(
      eth.assets.NATIVE.connect(owner).approve(spender.address, 0),
    );

    const allowanceAfter = await eth.assets.NATIVE.allowance(
      owner.address,
      spender.address,
    );
    expect(allowanceAfter).to.eq(0);
  });
});
