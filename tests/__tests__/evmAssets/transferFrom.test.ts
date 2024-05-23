import { CurrencyConverter, GBP, NAT } from "../../utils/currency";
import { expect } from "chai";
import { expectWait } from "../../utils/matchers/expectWait";
import { it } from "../../fixtures/standalone";
import { AccountAssetType } from "../../utils/types";

type TestCase = {
  ASSET: AccountAssetType;
  TKN: CurrencyConverter;
};

const CASES: TestCase[] = [
  {
    ASSET: "SIBLING",
    TKN: NAT,
  },
  {
    ASSET: "GBP",
    TKN: GBP,
  },
];

for (const { ASSET, TKN } of CASES) {
  describe(`${ASSET} asset`, () => {
    it("spender can transferFrom an amount within the approved limit", async ({
      eth,
    }) => {
      const OWNER_BALANCE = TKN(2);
      const SPENDER_BALANCE = TKN(0);
      const APPROVE_VALUE = TKN(1.5);
      const TRANSFER_FROM_VALUE1 = TKN(1.2);
      const TRANSFER_FROM_VALUE2 = TKN(0.3);

      const [owner, spender] = await eth.accounts.generate([
        { NATIVE: NAT(2), [ASSET]: OWNER_BALANCE },
        { NATIVE: NAT(2), [ASSET]: SPENDER_BALANCE },
      ]);

      await eth.waitForResult(
        eth.assets[ASSET].connect(owner).approve(
          spender.address,
          APPROVE_VALUE,
        ),
      );

      await eth.waitForResult(
        eth.assets[ASSET].connect(spender).transferFrom(
          owner.address,
          spender.address,
          TRANSFER_FROM_VALUE1,
        ),
      );

      // Assert balances after transferFrom
      let ownerBalance = await eth.assets[ASSET].balanceOf(owner.address);
      expect(ownerBalance).to.be.equal(OWNER_BALANCE - TRANSFER_FROM_VALUE1);

      let spenderBalance = await eth.assets[ASSET].balanceOf(spender.address);
      expect(spenderBalance).to.eq(SPENDER_BALANCE + TRANSFER_FROM_VALUE1);

      // Assert allowance decreased
      const allowance = await eth.assets[ASSET].allowance(
        owner.address,
        spender.address,
      );
      expect(allowance).to.eq(APPROVE_VALUE - TRANSFER_FROM_VALUE1);

      // Can transferFrom the remaining amount

      await eth.waitForResult(
        eth.assets[ASSET].connect(spender).transferFrom(
          owner.address,
          spender.address,
          TRANSFER_FROM_VALUE2,
        ),
      );
      ownerBalance = await eth.assets[ASSET].balanceOf(owner.address);
      expect(ownerBalance).to.eq(
        OWNER_BALANCE - TRANSFER_FROM_VALUE1 - TRANSFER_FROM_VALUE2,
      );
      spenderBalance = await eth.assets[ASSET].balanceOf(spender.address);
      expect(spenderBalance).to.eq(
        SPENDER_BALANCE + TRANSFER_FROM_VALUE1 + TRANSFER_FROM_VALUE2,
      );
    });

    it("transferFrom allows delegated token transfers", async ({ eth }) => {
      const ACCOUNT_BALANCE = TKN(1);
      const APPROVED_VALUE = TKN(0.8);

      const [owner, spender, recipient] = await eth.accounts.generate([
        { NATIVE: NAT(1), [ASSET]: ACCOUNT_BALANCE },
        { NATIVE: NAT(1), [ASSET]: ACCOUNT_BALANCE },
        { NATIVE: NAT(1), [ASSET]: ACCOUNT_BALANCE },
      ]);

      // approve
      await eth.waitForResult(
        eth.assets[ASSET].connect(owner).approve(
          spender.address,
          APPROVED_VALUE,
        ),
      );

      // transferFrom
      const transferFromTx = eth.assets[ASSET].connect(spender).transferFrom(
        owner.address,
        recipient.address,
        APPROVED_VALUE,
      );

      // event fired with correct params
      await expectWait(transferFromTx)
        .to.emit(eth.assets[ASSET], "Transfer")
        .withArgs(owner.address, recipient.address, APPROVED_VALUE);
      // TODO should emit Approval event
      // .to.emit(eth.assets[ASSET], "Approval")
      // .withArgs(owner, spender, 0);

      const ownerBalance = await eth.assets[ASSET].balanceOf(owner.address);
      const spenderBalance = await eth.assets[ASSET].balanceOf(spender.address);
      const recipientBalance = await eth.assets[ASSET].balanceOf(
        recipient.address,
      );

      // balances correct
      expect(ownerBalance).to.eq(ACCOUNT_BALANCE - APPROVED_VALUE);
      expect(spenderBalance).to.eq(ACCOUNT_BALANCE);
      expect(recipientBalance).to.eq(ACCOUNT_BALANCE + APPROVED_VALUE);

      // allowance decreased
      const allowance = await eth.assets[ASSET].allowance(owner, spender);
      expect(allowance).to.eq(0);
    });

    it("transferFrom emits Transfer and Approval events", async ({ eth }) => {
      const APPROVED_VALUE = TKN(1);

      const [owner, spender] = await eth.accounts.generate([
        { NATIVE: NAT(1), [ASSET]: TKN(1) },
        { NATIVE: NAT(1) },
      ]);

      await eth.waitForResult(
        eth.assets[ASSET].connect(owner).approve(
          spender.address,
          APPROVED_VALUE,
        ),
      );

      await expectWait(
        eth.assets[ASSET].connect(spender).transferFrom(
          owner.address,
          spender.address,
          APPROVED_VALUE,
        ),
      )
        .to.emit(eth.assets[ASSET], "Transfer")
        .withArgs(owner.address, spender.address, APPROVED_VALUE);
      // TODO should emit Approval
      // .to.emit(eth.assets[ASSET], "Approval")
      // .withArgs(owner, spender, 0);
    });

    it("spender cannot transfer an amount exceeding the approved limit", async ({
      eth,
    }) => {
      const APPROVE_VALUE = TKN(0.8);
      const TRANSFER_FROM_VALUE_1 = TKN(0.6);
      const TRANSFER_FROM_VALUE_2 = APPROVE_VALUE - TRANSFER_FROM_VALUE_1 + 1n;

      const [owner, spender] = await eth.accounts.generate([
        { NATIVE: NAT(1), [ASSET]: TKN(1) },
        { NATIVE: NAT(1) },
      ]);

      await eth.waitForResult(
        eth.assets[ASSET].connect(owner).approve(
          spender.address,
          APPROVE_VALUE,
        ),
      );

      // Assert - cannot transfer more than initially approved
      await expectWait(
        eth.assets[ASSET].connect(spender).transferFrom(
          owner.address,
          spender.address,
          APPROVE_VALUE + 1n,
          {},
        ),
        // TODO: custom error
      ).revertedWith("ERC20InsufficientAllowance");

      // Assert - cannot transfer more than left after transfer
      await eth.waitForResult(
        eth.assets[ASSET].connect(spender).transferFrom(
          owner.address,
          spender.address,
          TRANSFER_FROM_VALUE_1,
        ),
      );

      await expectWait(
        eth.assets[ASSET].connect(spender).transferFrom(
          owner.address,
          spender.address,
          TRANSFER_FROM_VALUE_2,
          {},
        ),
        // TODO custom error
      ).revertedWith("ERC20InsufficientAllowance");
    });

    // NOTE: @openzeppelin uses u256.max for unlimited allowance
    // but Substrate can only work with u128 out of the box
    describe("when unlimited allowance", () => {
      const maxUint128 = 2n ** 128n - 1n;

      it("does not decrease the spender allowance", async ({ eth }) => {
        const TRANSFER_FROM_VALUE = TKN(0.8);

        const [owner, spender] = await eth.accounts.generate([
          { NATIVE: NAT(1), [ASSET]: TKN(1) },
          { NATIVE: NAT(1) },
        ]);

        // Approve unlimited
        await eth.waitForResult(
          eth.assets[ASSET].connect(owner).approve(spender.address, maxUint128),
        );

        const allowanceBefore = await eth.assets[ASSET].allowance(
          owner.address,
          spender.address,
        );
        expect(allowanceBefore).to.eq(maxUint128);

        await eth.waitForResult(
          eth.assets[ASSET].connect(spender).transferFrom(
            owner.address,
            spender.address,
            TRANSFER_FROM_VALUE,
          ),
        );

        const allowanceAfter = await eth.assets[ASSET].allowance(
          owner.address,
          spender.address,
        );
        // Allowance does not decreased
        expect(allowanceAfter).to.eq(maxUint128);
      });

      it("does not emit an approval event", async ({ eth }) => {
        const TRANSFER_FROM_VALUE = TKN(0.8);

        const [owner, spender] = await eth.accounts.generate([
          { NATIVE: NAT(1), [ASSET]: TKN(1) },
          { NATIVE: NAT(1) },
        ]);

        // Approve unlimited
        await eth.waitForResult(
          eth.assets[ASSET].connect(owner).approve(spender.address, maxUint128),
        );

        await expectWait(
          eth.assets[ASSET].connect(spender).transferFrom(
            owner.address,
            spender.address,
            TRANSFER_FROM_VALUE,
          ),
        ).to.not.emit(eth.assets[ASSET], "Approval");
      });
    });
  });
}
