import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { expectWait } from "../../utils/matchers/expectWait";
import { NAT } from "../../utils/currency";

describe("Move some native tokens to private balance", () => {
  it("account can hide some tokens", async ({ eth }) => {
    const INITIAL_BALANCE = NAT(10);
    const PRIVATE_BALANCE = NAT(5);

    const [account] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
    ]);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(account).hideBalance(PRIVATE_BALANCE),
    );

    const privateBalance =
      await eth.assets.NATIVE.connect(account).getBalance();
    expect(privateBalance).to.eq(PRIVATE_BALANCE);

    const publicBalance = await eth.assets.NATIVE.balanceOf(account);
    expect(publicBalance).to.eq(INITIAL_BALANCE - PRIVATE_BALANCE);
  });

  it("account can't hide more than have on public balance", async ({ eth }) => {
    const INITIAL_BALANCE = NAT(10);
    const PRIVATE_BALANCE = INITIAL_BALANCE * 2n;

    const [account] = await eth.accounts.generate([
      { NATIVE: INITIAL_BALANCE },
    ]);

    await expectWait(
      eth.assets.NATIVE.connect(account).hideBalance(PRIVATE_BALANCE),
    ).revertedWith("insufficient balance");

    const privateBalance =
      await eth.assets.NATIVE.connect(account).getBalance();
    expect(privateBalance).to.eq(0n);

    const publicBalance = await eth.assets.NATIVE.balanceOf(account);
    expect(publicBalance).to.eq(INITIAL_BALANCE);
  });
});
