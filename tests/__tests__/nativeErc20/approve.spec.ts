import EtherHelper from "../../utils/ether";
import { BAX } from "../../utils/currency";
import { TestERC20 } from "../../typechain-types";
import { loadFixture } from "../../utils/fixture";
import { expect } from "chai";

let eth: EtherHelper;
let nativeErc20: TestERC20;

before(async () => {
  const helpers = await loadFixture(__filename);
  eth = helpers.eth;
  nativeErc20 = helpers.eth.nativeErc20;
});

describe("Native token as ERC-20", () => {
  it("allowance is zero by default", async () => {
    const randomAccount1 = await eth.accounts.generate();
    const randomAccount2 = await eth.accounts.generate();

    const allowance = await nativeErc20.allowance(
      randomAccount1.address,
      randomAccount2.address,
    );

    expect(allowance).to.eq(0);
  });

  it("can be changed by approve", async () => {
    const APPROVED = BAX(0.8);
    const approver = await eth.accounts.generate(BAX(1.5));
    const spender = await eth.accounts.generate(BAX(0.3));

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
