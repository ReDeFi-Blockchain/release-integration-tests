import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { GBP, NAT } from "../../utils/currency";
import {
  AccountAssetType,
  AccountBalance,
  AccountPermissions,
} from "../../utils/types";

type TestCase = {
  ASSET: AccountAssetType;
  INITIAL_BALANCE: AccountBalance;
  MINT_VALUE: bigint;
};

const TEST_CASES: TestCase[] = [
  {
    ASSET: "GBP",
    INITIAL_BALANCE: { GBP: GBP(10000), NATIVE: NAT(10000) },
    MINT_VALUE: GBP(10000),
  },
];

for (const { ASSET, INITIAL_BALANCE, MINT_VALUE } of TEST_CASES) {
  describe(`Account permissions control`, () => {
    it(`${ASSET} owner can set permission and allow another account to mint tokens`, async ({
      eth,
      sub,
    }) => {
      const [admin] = await eth.accounts.generate([INITIAL_BALANCE]);

      // No mint permission.
      await expect(
        eth.waitForResult(
          eth.assets[ASSET].connect(admin).mint(admin, MINT_VALUE),
        ),
      ).revertedWith("UnauthorizedAccount");

      // Give mint permissions.
      await sub.accounts.setPermissions(
        {
          account: admin.address,
          permissions: AccountPermissions.Mint,
          erc20: eth.CONSTANTS[ASSET].ADDRESS,
        },
        sub.sudo,
      );

      // Check mint.
      await eth.waitForResult(
        eth.assets[ASSET].connect(admin).mint(admin, MINT_VALUE),
      );

      const balance = await eth.assets[ASSET].balanceOf(admin);
      expect(balance).to.eq(INITIAL_BALANCE[ASSET]! + MINT_VALUE);
    });

    it(`${ASSET} owner can disallow another account to mint tokens`, async ({
      eth,
      sub,
    }) => {
      const [admin] = await eth.accounts.generate([INITIAL_BALANCE]);

      // Give mint permissions.
      await sub.accounts.setPermissions(
        {
          account: admin.address,
          permissions: AccountPermissions.Mint,
          erc20: eth.CONSTANTS[ASSET].ADDRESS,
        },
        sub.sudo,
      );

      // Check mint.
      await eth.waitForResult(
        eth.assets[ASSET].connect(admin).mint(admin, MINT_VALUE),
      );

      const balance = await eth.assets[ASSET].balanceOf(admin);
      expect(balance).to.eq(INITIAL_BALANCE[ASSET]! + MINT_VALUE);

      // Take mint permissions.
      await sub.accounts.setPermissions(
        {
          account: admin.address,
          permissions: AccountPermissions.Empty,
          erc20: eth.CONSTANTS[ASSET].ADDRESS,
        },
        sub.sudo,
      );

      // No mint permission.
      await expect(
        eth.waitForResult(
          eth.assets[ASSET].connect(admin).mint(admin, MINT_VALUE),
        ),
      ).revertedWith("UnauthorizedAccount");
    });

    it(`Only ${ASSET} owner can set permissions for account`, async ({
      eth,
    }) => {
      const [admin] = await eth.accounts.generate([INITIAL_BALANCE]);

      // No mint permission.

      await expect(
        eth.waitForResult(
          eth.assets[ASSET].connect(admin).mint(admin, MINT_VALUE),
        ),
      ).revertedWith("UnauthorizedAccount");

      // Give permission for yourself.
      await expect(
        eth.waitForResult(
          eth.assets[ASSET].connect(admin).setAccountPermissions(
            admin,
            AccountPermissions.Mint as number,
          ),
        ),
      ).revertedWith("OwnableUnauthorizedAccount");

      // Checking that permissions not changed.
      await expect(
        eth.waitForResult(
          eth.assets[ASSET].connect(admin).mint(admin, MINT_VALUE),
        ),
      ).revertedWith("UnauthorizedAccount");
    });
  });
}
