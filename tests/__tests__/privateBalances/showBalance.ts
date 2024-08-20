import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { expectWait } from "../../utils/matchers/expectWait";
import { NAT } from "../../utils/currency";

describe("Move some native tokens from private balance", () => {
  it("account can move some tokens to public balance", async ({ eth }) => {
    const INITIAL_BALANCE = NAT(10);
    const PRIVATE_BALANCE = NAT(5);

    const [account] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
    ]);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(account).hideBalance(PRIVATE_BALANCE),
    );

    const privateBalanceBeforeShow =
      await eth.assets.NATIVE.connect(account).getBalance();
    expect(privateBalanceBeforeShow).to.eq(PRIVATE_BALANCE);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(account).showBalance(PRIVATE_BALANCE),
    );

    const privateBalanceAfterShow =
      await eth.assets.NATIVE.connect(account).getBalance();
    expect(privateBalanceAfterShow).to.eq(0n);

    const publicBalance = await eth.assets.NATIVE.balanceOf(account);
    expect(publicBalance).to.eq(INITIAL_BALANCE);
  });

  it("account can't show more than have on private balance", async ({
    eth,
  }) => {
    const INITIAL_BALANCE = NAT(10);
    const PRIVATE_BALANCE = NAT(5);

    const [account] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
    ]);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(account).hideBalance(PRIVATE_BALANCE),
    );

    const privateBalanceBeforeShow =
      await eth.assets.NATIVE.connect(account).getBalance();
    expect(privateBalanceBeforeShow).to.eq(PRIVATE_BALANCE);

    await expectWait(
      eth.assets.NATIVE.connect(account).showBalance(PRIVATE_BALANCE * 2n),
    ).revertedWith("insufficient balance");

    const privateBalanceAfterShow =
      await eth.assets.NATIVE.connect(account).getBalance();
    expect(privateBalanceAfterShow).to.eq(PRIVATE_BALANCE);

    const publicBalance = await eth.assets.NATIVE.balanceOf(account);
    expect(publicBalance).to.eq(INITIAL_BALANCE);
  });
});
