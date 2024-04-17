import { Wallet, ethers } from "ethers";

export class EthAccount {
  protected readonly provider: ethers.providers.WebSocketProvider;
  protected readonly donor: Wallet;

  constructor(provider: ethers.providers.WebSocketProvider, donor: Wallet) {
    this.provider = provider;
    this.donor = donor;
  }

  async transfer(
    params: { to: string; value: ethers.BigNumberish },
    signer: Wallet,
  ) {
    const tx = await signer.sendTransaction({
      to: params.to,
      value: params.value,
    });
    return tx.wait();
  }

  async getRandomWallet(balance?: ethers.BigNumberish) {
    const wallet = ethers.Wallet.createRandom().connect(this.provider);
    if (balance) {
      await this.transfer({ to: wallet.address, value: balance }, this.donor);
    }
    return wallet;
  }
}
