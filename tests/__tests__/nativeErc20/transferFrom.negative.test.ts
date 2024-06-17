import { NAT } from "../../utils/currency";
import { expectWait } from "../../utils/matchers/expectWait";
import { it } from "../../fixtures/standalone";

describe("Native token as ERC-20", () => {
  it("spender cannot transferFrom an amount exceeding the approved limit", async ({
    eth,
  }) => {
    const APPROVED_VALUE = NAT(8);
    const PARTIAL_TRANSFER_FROM = NAT(6);

    const [owner, spender] = await eth.accounts.generate([
      { NATIVE: NAT(10) },
      { NATIVE: NAT(10) },
    ]);

    await eth.waitForResult(
      eth.assets.NATIVE.connect(owner).approve(spender.address, APPROVED_VALUE),
    );

    // Assert - cannot transfer more than initially approved
    await expectWait(
      eth.assets.NATIVE.connect(spender).transferFrom(
        owner.address,
        spender.address,
        APPROVED_VALUE + 1n,
        {},
      ),
    ).revertedWith("ERC20InsufficientAllowance"); // FIXME: custom error?

    // Assert - cannot transfer more than left after transfer
    await eth.waitForResult(
      eth.assets.NATIVE.connect(spender).transferFrom(
        owner.address,
        spender.address,
        PARTIAL_TRANSFER_FROM,
      ),
    );

    await expectWait(
      eth.assets.NATIVE.connect(spender).transferFrom(
        owner.address,
        spender.address,
        APPROVED_VALUE - PARTIAL_TRANSFER_FROM + 1n,
        {},
      ),
    ).revertedWith("ERC20InsufficientAllowance");
  });
});
