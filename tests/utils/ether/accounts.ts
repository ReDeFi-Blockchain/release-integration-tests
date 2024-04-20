import { HDNodeWallet, ethers } from "ethers";

export class EthAccount {
  protected readonly provider: ethers.WebSocketProvider;
  protected readonly donor: HDNodeWallet;

  constructor(provider: ethers.WebSocketProvider, donor: HDNodeWallet) {
    this.provider = provider;
    this.donor = donor;
  }

  async transfer(
    params: { to: string; value: ethers.BigNumberish },
    signer: HDNodeWallet,
  ) {
    const tx = await signer.sendTransaction({
      to: params.to,
      value: params.value,
    });
    return tx.wait();
  }

  async getRandomWallet(balance?: ethers.BigNumberish, donor = this.donor) {
    const wallet = ethers.HDNodeWallet.createRandom().connect(this.provider);
    if (balance) {
      await this.transfer({ to: wallet.address, value: balance }, this.donor);
    }
    return wallet;
  }
}
