import EtherHelper from "../../utils/ether";
import { BAX } from "../../utils/currency";
import { TestERC20 } from "../../typechain-types";
import { loadFixture } from "../../utils/fixture";
import { expect } from "chai";
import { HDNodeWallet, ethers } from "ethers";
import { txExpect } from "../../utils/matchers/txEvents";

let eth: EtherHelper;
let nativeErc20: TestERC20;

before(async () => {
  const helpers = await loadFixture(__filename);
  eth = helpers.eth;
  nativeErc20 = helpers.eth.nativeErc20;
});

describe("Native token as ERC-20 allowance", () => {
  it("zero for new account", async () => {
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

  describe("when unlimited allowance", async () => {
    let approver: HDNodeWallet;
    let spender: HDNodeWallet;

    beforeEach(async () => {
      [approver, spender] = await eth.accounts.generateMany([BAX(10), BAX(1)]);

      // Approve unlimited
      await eth.signAndSend(
        nativeErc20
          .connect(approver)
          .approve(spender.address, ethers.MaxUint256),
      );
    });

    it("does not decrease the spender allowance", async function () {
      const allowanceBefore = await nativeErc20.allowance(
        approver.address,
        spender.address,
      );

      expect(allowanceBefore).to.eq(ethers.MaxUint256);
      await eth.signAndSend(
        nativeErc20
          .connect(spender)
          .transferFrom(approver.address, spender.address, BAX(5)),
      );

      const allowanceAfter = await nativeErc20.allowance(
        approver.address,
        spender.address,
      );
      // Allowance does not decreased
      expect(allowanceAfter).to.eq(ethers.MaxUint256);
    });

    it("does not emit an approval event", async function () {
      await txExpect(
        nativeErc20
          .connect(spender)
          .transferFrom(approver.address, spender.address, BAX(5)),
      ).to.not.emit(this.token, "Approval");
    });
  });
});
