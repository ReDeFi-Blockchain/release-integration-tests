import { expect } from "chai";
import { it } from "../../fixtures/standalone";
import { GBP, NAT } from "../../utils/currency";
import { NETWORK_CONSTANTS } from "../../utils/constants";
import { AccountPermissions } from "../../utils/types";

describe(`Test account permissions control`, () => {
    it(`Owner can set permission and allow another account to mint tokens`, async ({ eth, sub }) => {
        // Permissions control exists only on parachain.
        if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

        const initialBalance = { GBP: GBP(10000), NATIVE: NAT(10000) };
        const [admin] = await eth.accounts.generate([ initialBalance ]);

        const asset = eth.assets["GBP"];
        const assetAddress = await asset.getAddress() as `0x${string}`;
        const mintValue = GBP(10000);

        // No mint permission.
        await expect(
            eth.waitForResult(
                asset.connect(admin).mint(admin, mintValue)
            )
        ).revertedWith("UnauthorizedAccount");

        // Give mint permissions.
        await sub.accounts.setPermissions(
            { account: admin.address, permissions: AccountPermissions.Mint, erc20: assetAddress },
            sub.sudo,
        );

        // Check mint.
        await eth.waitForResult(
            asset.connect(admin).mint(admin, mintValue)
        );

        const balance = await asset.balanceOf(admin);
        expect(balance).to.eq(initialBalance.GBP + mintValue);
    });

    it(`Owner can disallow another account to mint tokens`, async ({ eth, sub }) => {
        // Permissions control exists only on parachain.
        if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

        const initialBalance = { GBP: GBP(10000), NATIVE: NAT(10000) };
        const [admin] = await eth.accounts.generate([ initialBalance ]);

        const asset = eth.assets["GBP"];
        const assetAddress = await asset.getAddress() as `0x${string}`;
        const mintValue = GBP(10000);

        // Give mint permissions.
        await sub.accounts.setPermissions(
            { account: admin.address, permissions: AccountPermissions.Mint, erc20: assetAddress },
            sub.sudo,
        );

        // Check mint.
        await eth.waitForResult(
            asset.connect(admin).mint(admin, mintValue)
        );

        const balance = await asset.balanceOf(admin);
        expect(balance).to.eq(initialBalance.GBP + mintValue);

        // Take mint permissions.
        await sub.accounts.setPermissions(
            { account: admin.address, permissions: AccountPermissions.Empty, erc20: assetAddress },
            sub.sudo,
        );

        // No mint permission.
        await expect(
            eth.waitForResult(
                asset.connect(admin).mint(admin, mintValue)
            )
        ).revertedWith("UnauthorizedAccount");
    });

    it(`Only owner can set permissions for account`, async ({ eth }) => {
        // Permissions control exists only on parachain.
        if (eth.CONSTANTS.CHAIN_ID == NETWORK_CONSTANTS.L1.CHAIN_ID) return;

        const initialBalance = { GBP: GBP(10000), NATIVE: NAT(10000) };
        const [admin] = await eth.accounts.generate([ initialBalance ]);

        const asset = eth.assets["GBP"];
        const mintValue = GBP(10000);

        // No mint permission.
        await expect(
            eth.waitForResult(
                asset.connect(admin).mint(admin, mintValue)
            )
        ).revertedWith("UnauthorizedAccount");

        // Give permission for yourself.
        await expect(
            eth.waitForResult(
                asset.connect(admin).setAccountPermissions(admin, AccountPermissions.Mint as number)
            )
        ).revertedWith("OwnableUnauthorizedAccount");

        // Checking that permissions not changed.
        await expect(
            eth.waitForResult(
                asset.connect(admin).mint(admin, mintValue)
            )
        ).revertedWith("UnauthorizedAccount");
    });
});