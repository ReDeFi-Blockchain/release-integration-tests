import { BigNumber } from "ethers";
import { beforeAll, describe, it, expect } from "vitest";
import { loadFixture } from "../../fixtures";
import EtherHelper from "../../utils/ether";
import { BAX } from "../../utils/currency";
import { ERC20Contract } from "../../ABIGEN";

let eth: EtherHelper;
let nativeErc20: ERC20Contract;

beforeAll(async () => {
  const helpers = await loadFixture(__filename);
  eth = helpers.eth;
  nativeErc20 = helpers.eth.nativeErc20;
});

describe("Native token as ERC-20", () => {
  it("allowance is zero by default", async () => {
    const randomAccount1 = await eth.accounts.getRandomWallet();
    const randomAccount2 = await eth.accounts.getRandomWallet();

    const allowance = await nativeErc20.allowance(
      randomAccount1.address,
      randomAccount2.address,
    );

    expect(allowance).to.deep.eq(BigNumber.from(0));
  });

  it("can be changed by approve", async () => {
    const APPROVED = BAX(0.8);
    const approver = await eth.accounts.getRandomWallet(BAX(1.5));
    const spender = await eth.accounts.getRandomWallet(BAX(0.3));

    await eth.signAndSend(
      nativeErc20.connect(approver).approve(spender.address, APPROVED),
    );

    // Increase approve value
    const allowance = await nativeErc20.allowance(
      approver.address,
      spender.address,
    );

    expect(allowance).to.deep.eq(APPROVED);

    // Decrease approve value
    await eth.signAndSend(
      nativeErc20.connect(approver).approve(spender.address, 0),
    );

    const allowanceAfter = await nativeErc20.allowance(
      approver.address,
      spender.address,
    );
    expect(allowanceAfter).to.deep.eq(0);
  });

  it.skip("Can set unlimited allowance");
});
