import { NAT } from "../../utils/currency";
import { expect } from "chai";
import { it } from "../../fixtures/general-fixture";

// TODO extract to common tests for all type of assets (NATIVE, SIBLING, GBP...)
describe("Native token as ERC-20 should withdraw reasonable fee", () => {
  it("for transfer", async ({ eth }) => {
    const REASONABLE_FEE = NAT(0.02);
    const [user] = await eth.accounts.generate([{ NATIVE: NAT(10) }]);
    const transferTx = await eth.waitForResult(
      eth.assets.NATIVE.connect(user).transfer(eth.donor.address, NAT(5)),
    );

    expect(transferTx.fee).lessThan(REASONABLE_FEE);
  });

  it("for approve", async ({ eth }) => {
    const REASONABLE_FEE = NAT(0.01);
    const [user] = await eth.accounts.generate([{ NATIVE: NAT(10) }]);
    const approveTx = await eth.waitForResult(
      eth.assets.NATIVE.connect(user).approve(eth.donor.address, NAT(10)),
    );

    expect(approveTx.fee).lessThan(REASONABLE_FEE);
  });

  it("for transferFrom", async ({ eth }) => {
    const REASONABLE_FEE = NAT(0.02);
    const [user] = await eth.accounts.generate([{ NATIVE: NAT(10) }]);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(eth.donor).approve(user.address, NAT(10)),
    );

    const transferTx = await eth.waitForResult(
      eth.assets.NATIVE.connect(user).transferFrom(
        eth.donor.address,
        user.address,
        NAT(5),
      ),
    );

    expect(transferTx.fee).lessThan(REASONABLE_FEE);
  });
});
