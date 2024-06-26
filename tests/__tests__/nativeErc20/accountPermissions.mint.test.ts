import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { NAT } from "../../utils/currency";
import { AccountPermissions } from "../../utils/types";

describe(`Account permissions control [#serial]`, () => {
  const INITIAL_BALANCE = NAT(10000);
  const MINT_VALUE = NAT(5000);

  it(`NATIVE owner can set permission and allow another account to mint tokens`, async ({
    eth,
    sub,
  }) => {
    const [admin] = await eth.accounts.generate([{ NATIVE: INITIAL_BALANCE }]);

    // No mint permission.
    await expect(
      eth.waitForResult(
        eth.assets.NATIVE.connect(admin).mint(admin, MINT_VALUE),
      ),
    ).revertedWith("UnauthorizedAccount");

    // Give mint permissions.
    await sub.accounts.setPermissions(
      {
        account: admin.address,
        permissions: AccountPermissions.Mint,
        erc20: eth.CONSTANTS.NATIVE.ADDRESS,
      },
      sub.sudo,
    );

    // Check mint.
    const mintTx = await eth.waitForResult(
      eth.assets.NATIVE.connect(admin).mint(admin, MINT_VALUE),
    );

    const balance = await eth.assets.NATIVE.balanceOf(admin);
    expect(balance).to.eq(INITIAL_BALANCE + MINT_VALUE - mintTx.fee);
  });

  it(`NATIVE owner can disallow another account to mint tokens`, async ({
    eth,
    sub,
  }) => {
    const [admin] = await eth.accounts.generate([{ NATIVE: INITIAL_BALANCE }]);

    // Give mint permissions.
    await sub.accounts.setPermissions(
      {
        account: admin.address,
        permissions: AccountPermissions.Mint,
        erc20: eth.CONSTANTS.NATIVE.ADDRESS,
      },
      sub.sudo,
    );

    // Check mint.
    const mintTx = await eth.waitForResult(
      eth.assets.NATIVE.connect(admin).mint(admin, MINT_VALUE),
    );

    const balance = await eth.assets.NATIVE.balanceOf(admin);
    expect(balance).to.eq(INITIAL_BALANCE + MINT_VALUE - mintTx.fee);

    // Take mint permissions.
    await sub.accounts.setPermissions(
      {
        account: admin.address,
        permissions: AccountPermissions.Empty,
        erc20: eth.CONSTANTS.NATIVE.ADDRESS,
      },
      sub.sudo,
    );

    // No mint permission.
    await expect(
      eth.waitForResult(
        eth.assets.NATIVE.connect(admin).mint(admin, MINT_VALUE),
      ),
    ).revertedWith("UnauthorizedAccount");
  });

  it(`Only NATIVE owner can set permissions for account`, async ({ eth }) => {
    const [admin] = await eth.accounts.generate([{ NATIVE: INITIAL_BALANCE }]);

    // No mint permission.

    await expect(
      eth.waitForResult(
        eth.assets.NATIVE.connect(admin).mint(admin, MINT_VALUE),
      ),
    ).revertedWith("UnauthorizedAccount");

    // Give permission for yourself.
    await expect(
      eth.waitForResult(
        eth.assets.NATIVE.connect(admin).setAccountPermissions(
          admin,
          AccountPermissions.Mint as number,
        ),
      ),
    ).revertedWith("OwnableUnauthorizedAccount");

    // Checking that permissions not changed.
    await expect(
      eth.waitForResult(
        eth.assets.NATIVE.connect(admin).mint(admin, MINT_VALUE),
      ),
    ).revertedWith("UnauthorizedAccount");
  });
});
