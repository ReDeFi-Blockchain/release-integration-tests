import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { GBP, NAT } from "../../utils/currency";
import { ASSETS, NETWORK_CONSTANTS } from "../../utils/constants";
import { AccountPermissions } from "../../utils/substrate/accounts";

const ASSET = "GBP";

describe(`Test account permissions control`, () => {
    it(`Owner can set permission and allow another account to mint tokens`, async ({ eth, sub }) => {
        // Permissions control exists only on parachain.
        if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

        const startAssetValue = GBP(1000);
        const [admin] = await eth.accounts.generate([{ GBP: startAssetValue, NATIVE: NAT(1000) }]);

        const assetValue = GBP(10);
        const assetAddress = ASSETS[ASSET].ADDRESS;

        // No mint permission.
        await expect(
            eth.waitForResult(
                eth.assets[ASSET].connect(admin).mint(admin, assetValue)
            )
        ).revertedWith("UnauthorizedAccount");

        // Give mint permissions.
        await sub.accounts.setPermissions(
            { account: admin.address, permissions: AccountPermissions.Mint, erc20: assetAddress },
            sub.sudo,
        );

        // Check mint.
        await eth.waitForResult(
            eth.assets[ASSET].connect(admin).mint(admin, assetValue)
        );

        const balance = await eth.assets[ASSET].balanceOf(admin);
        expect(balance).to.eq(startAssetValue + assetValue);
    });

    it(`Owner can disallow another account to mint tokens`, async ({ eth, sub }) => {
        // Permissions control exists only on parachain.
        if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

        const startAssetValue = GBP(1000);
        const [admin] = await eth.accounts.generate([{ GBP: startAssetValue, NATIVE: NAT(1000) }]);

        const assetValue = GBP(10);
        const assetAddress = ASSETS[ASSET].ADDRESS;

        // Give mint permissions.
        await sub.accounts.setPermissions(
            { account: admin.address, permissions: AccountPermissions.Mint, erc20: assetAddress },
            sub.sudo,
        );

        // Check mint.
        await eth.waitForResult(
            eth.assets[ASSET].connect(admin).mint(admin, assetValue)
        );

        const balance = await eth.assets[ASSET].balanceOf(admin);
        expect(balance).to.eq(startAssetValue + assetValue);

        // Take mint permissions.
        await sub.accounts.setPermissions(
            { account: admin.address, permissions: AccountPermissions.Empty, erc20: assetAddress },
            sub.sudo,
        );

        // No mint permission.
        await expect(
            eth.waitForResult(
                eth.assets[ASSET].connect(admin).mint(admin, assetValue)
            )
        ).revertedWith("UnauthorizedAccount");
    });

    it(`Only owner can set permissions for account`, async ({ eth, sub }) => {
        // Permissions control exists only on parachain.
        if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

        const startAssetValue = GBP(1000);
        const [admin] = await eth.accounts.generate([{ GBP: startAssetValue, NATIVE: NAT(1000) }]);

        const assetValue = GBP(10);

        // No mint permission.
        await expect(
            eth.waitForResult(
                eth.assets[ASSET].connect(admin).mint(admin, assetValue)
            )
        ).revertedWith("UnauthorizedAccount");

        // Give permission for yourself.
        await expect(
            eth.waitForResult(
                eth.assets[ASSET].connect(admin).setAccountPermissions(admin, AccountPermissions.Mint as number)
            )
        ).revertedWith("OwnableUnauthorizedAccount");

        // Checking that permissions not changed.
        await expect(
            eth.waitForResult(
                eth.assets[ASSET].connect(admin).mint(admin, assetValue)
            )
        ).revertedWith("UnauthorizedAccount");
    });
});