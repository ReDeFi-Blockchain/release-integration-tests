import { HDNodeWallet, ethers } from "ethers";

export class EthAccount {
  protected readonly provider: ethers.WebSocketProvider;
  protected readonly donor: HDNodeWallet;

  constructor(provider: ethers.WebSocketProvider, donor: HDNodeWallet) {
    this.provider = provider;
    this.donor = donor;
  }

  async transfer(
    params: { to: string; value: ethers.BigNumberish; nonce?: number },
    signer: HDNodeWallet,
  ) {
    const tx = await signer.sendTransaction({
      to: params.to,
      value: params.value,
      nonce: params.nonce,
    });
    return tx.wait();
  }

  async generate(balance?: ethers.BigNumberish, donor = this.donor) {
    const wallet = ethers.HDNodeWallet.createRandom().connect(this.provider);
    if (balance) {
      await this.transfer({ to: wallet.address, value: balance }, donor);
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
          this.transfer({ to: wallet.address, value: balance, nonce }, donor),
        );
        nonce++;
      }
    }
    await Promise.all(transfers);
    return wallets;
  }
}
