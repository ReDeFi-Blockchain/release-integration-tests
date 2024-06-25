import { expect } from "chai";
import { it } from "../fixtures/standalone";
import { NAT } from "../utils/currency";

describe("Fees", () => {
  // TODO move to constants
  const TREASURY_ADDRESS = "rdhCnasiURA3DLeppbwAWu2VuHjYMWogNtfLpP8UTPY1GbNKV";

  it("[serial] are payed to the treasury and are not burned", async ({
    eth,
    sub,
  }) => {
    const [account, recipient] = await eth.accounts.generate([
      { NATIVE: NAT(10) },
      {},
    ]);

    const totalSupplyBefore = await eth.assets.NATIVE.totalSupply();
    const treasuryBalanceBefore =
      await sub.accounts.getBalance(TREASURY_ADDRESS);

    const { fee } = await eth.waitForResult(
      eth.assets.NATIVE.connect(account).transfer(recipient, NAT(5)),
    );

    const treasuryBalanceAfter =
      await sub.accounts.getBalance(TREASURY_ADDRESS);
    const totalSupplyAfter = await eth.assets.NATIVE.totalSupply();

    // Treasury balance increased
    expect(treasuryBalanceAfter).to.eq(treasuryBalanceBefore + fee);
    expect(totalSupplyBefore).to.eq(totalSupplyAfter);
  });
});
