import { BAX } from "../../utils/currency";
import { expect } from "chai";
import { it } from "../../fixtures/general-fixture";

describe("Native token as ERC-20 should withdraw reasonable fee", () => {
  it("for transfer", async ({ eth }) => {
    const REASONABLE_FEE = BAX(0.02);
    const user = await eth.accounts.generate(BAX(10));
    const transferTx = await eth.signAndSend(
      eth.ERC20.native.connect(user).transfer(eth.donor.address, BAX(5)),
    );

    expect(transferTx.fee).lessThan(REASONABLE_FEE);
  });

  it("for approve", async ({ eth }) => {
    const REASONABLE_FEE = BAX(0.01);
    const user = await eth.accounts.generate(BAX(10));
    const approveTx = await eth.signAndSend(
      eth.ERC20.native.connect(user).approve(eth.donor.address, BAX(10)),
    );

    expect(approveTx.fee).lessThan(REASONABLE_FEE);
  });

  it("for transferFrom", async ({ eth }) => {
    const REASONABLE_FEE = BAX(0.02);
    const user = await eth.accounts.generate(BAX(10));

    await eth.signAndSend(
      eth.ERC20.native.connect(eth.donor).approve(user.address, BAX(10)),
    );

    const transferTx = await eth.signAndSend(
      eth.ERC20.native
        .connect(user)
        .transferFrom(eth.donor.address, user.address, BAX(5)),
    );

    expect(transferTx.fee).lessThan(REASONABLE_FEE);
  });
});
