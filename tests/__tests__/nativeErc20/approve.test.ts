import { expect } from "chai";
import { BAX } from "../../utils/currency";
import { it } from "../../fixtures/general-fixture";

describe("Native token as ERC-20 allowance", () => {
  it("zero for new account", async ({ eth }) => {
    const randomAccount1 = await eth.accounts.generate();
    const randomAccount2 = await eth.accounts.generate();

    const allowance = await eth.ERC20.native.allowance(
      randomAccount1.address,
      randomAccount2.address,
    );

    expect(allowance).to.eq(0);
  });

  it("can be changed by approve", async ({ eth }) => {
    const APPROVED = BAX(0.8);
    const approver = await eth.accounts.generate(BAX(1.5));
    const spender = await eth.accounts.generate(BAX(0.3));

    await eth.signAndSend(
      eth.ERC20.native.connect(approver).approve(spender.address, APPROVED),
    );

    // Increase approve value
    const allowance = await eth.ERC20.native.allowance(
      approver.address,
      spender.address,
    );

    expect(allowance).to.eq(APPROVED);

    // Decrease approve value
    await eth.signAndSend(
      eth.ERC20.native.connect(approver).approve(spender.address, 0),
    );

    const allowanceAfter = await eth.ERC20.native.allowance(
      approver.address,
      spender.address,
    );
    expect(allowanceAfter).to.eq(0);
  });
});
