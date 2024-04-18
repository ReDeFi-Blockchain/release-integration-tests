import { beforeAll, describe, expect, it } from "vitest";
import { ERC20Contract } from "../../ABIGEN";
import { loadFixture } from "../../fixtures";
import { BAX } from "../../utils/currency";
import EtherHelper from "../../utils/ether";

let eth: EtherHelper;
let nativeErc20: ERC20Contract;

beforeAll(async () => {
  const helpers = await loadFixture(__filename);
  eth = helpers.eth;
  nativeErc20 = helpers.eth.nativeErc20;
});

describe("Native token as ERC-20 should withdraw reasonable fee", () => {
  it("for transfer", async () => {
    const REASONABLE_FEE = BAX(0.02).toBigInt();
    const user = await eth.accounts.getRandomWallet(BAX(10));
    const transferTx = await eth.signAndSend(
      nativeErc20.connect(user).transfer(eth.donor.address, BAX(5)),
    );

    expect(transferTx.fee.toBigInt()).toBeLessThan(REASONABLE_FEE);
  });

  it("for approve", async () => {
    const REASONABLE_FEE = BAX(0.01).toBigInt();
    const user = await eth.accounts.getRandomWallet(BAX(10));
    const approveTx = await eth.signAndSend(
      nativeErc20.connect(user).approve(eth.donor.address, BAX(10)),
    );

    expect(approveTx.fee.toBigInt()).toBeLessThan(REASONABLE_FEE);
  });

  it("for transferFrom", async () => {
    const REASONABLE_FEE = BAX(0.02).toBigInt();
    const user = await eth.accounts.getRandomWallet(BAX(10));

    await eth.signAndSend(
      nativeErc20.connect(eth.donor).approve(user.address, BAX(10)),
    );

    const transferTx = await eth.signAndSend(
      nativeErc20
        .connect(user)
        .transferFrom(eth.donor.address, user.address, BAX(5)),
    );

    expect(transferTx.fee.toBigInt()).toBeLessThan(REASONABLE_FEE);
  });
});
