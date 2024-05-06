import { HDNodeWallet, JsonRpcProvider, ethers } from "ethers";
import { ERC20 } from "../../typechain-types";
import { AccountAssetType, AccountBalance } from "../types";

export class EthAccount {
  protected readonly provider: JsonRpcProvider;
  protected readonly donor: HDNodeWallet;
  protected readonly ERC20: Record<AccountAssetType, ERC20>;

  constructor(
    provider: JsonRpcProvider,
    erc20: Record<AccountAssetType, ERC20>,
    donor: HDNodeWallet,
  ) {
    this.provider = provider;
    this.ERC20 = erc20;
    this.donor = donor;
  }

  async transferNative(
    params: { to: string; value: bigint },
    signer: HDNodeWallet,
    nonce?: number,
  ) {
    const tx = await signer.sendTransaction({
      to: params.to,
      value: params.value,
      nonce,
    });
    return tx.wait();
  }

  async transferAsset(
    params: {
      to: string;
      value: bigint;
      assetType: AccountAssetType;
    },
    signer: HDNodeWallet,
    nonce?: number,
  ) {
    const asset = this.ERC20[params.assetType];

    const receipt = await asset
      .connect(signer)
      .transfer(params.to, params.value, { nonce })
      .then((tx) => tx.wait());
    if (!receipt) throw Error("Cannot get receipt");
    return receipt;
  }

  async generateV2(balances: AccountBalance[], donor = this.donor) {
    let nonce = await this.donor.getNonce();
    const transfers = [];
    const wallets = [];

    for (const balance of balances) {
      const wallet = ethers.HDNodeWallet.createRandom().connect(this.provider);
      wallets.push(wallet);

      for (const key in balance) {
        const assetType = key as keyof AccountBalance;
        const value = balance[assetType];
        if (!value) continue;
        if (assetType === "NATIVE") {
          transfers.push(
            this.transferNative({ to: wallet.address, value }, donor, nonce),
          );
        } else {
          transfers.push(
            this.transferAsset(
              {
                to: wallet.address,
                value,
                assetType,
              },
              donor,
              nonce,
            ),
          );
        }
        nonce++;
      }
    }
    await Promise.all(transfers);
    return wallets;
  }

  async generate(balance?: bigint, donor = this.donor) {
    const wallet = ethers.HDNodeWallet.createRandom().connect(this.provider);
    if (balance) {
      await this.transferNative({ to: wallet.address, value: balance }, donor);
    }
    return wallet;
  }

  async generateMany(balances: bigint[], donor = this.donor) {
    let nonce = await this.donor.getNonce();
    const transfers = [];
    const wallets = [];
    for (const balance of balances) {
      const wallet = ethers.HDNodeWallet.createRandom().connect(this.provider);
      wallets.push(wallet);
      if (balance) {
        transfers.push(
          this.transferNative(
            { to: wallet.address, value: balance },
            donor,
            nonce,
          ),
        );
        nonce++;
      }
    }
    await Promise.all(transfers);
    return wallets;
  }
}
