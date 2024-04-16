import { Wallet, ethers } from "ethers";
import { ERC20Contract, ERC20Contract__factory } from "../../ABIGEN";
import { ADDRESS } from "../constants";
import config from "../../config";

export default class EtherHelper {
  readonly provider: ethers.providers.WebSocketProvider;
  readonly nativeErc20: ERC20Contract;
  readonly ethers: typeof ethers;
  readonly wallets: {
    donor: ethers.Wallet;
  };

  constructor(filename?: string) {
    this.provider = new ethers.providers.WebSocketProvider(config.wsEndpoint);
    this.nativeErc20 = ERC20Contract__factory.connect(
      ADDRESS.NATIVE_ERC20,
      this.provider,
    );
    this.ethers = ethers;
    if (filename) this.wallets = { donor: this.getFilenameWallet(filename) };
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
    const wallet = this.ethers.Wallet.createRandom().connect(this.provider);
    if (balance) {
      await this.transfer(
        { to: wallet.address, value: balance },
        this.wallets.donor,
      );
    }
    return wallet;
  }

  getFilenameWallet(filename: string) {
    const bytes = this.ethers.utils.toUtf8Bytes(filename);
    const id = BigInt(ethers.utils.keccak256(bytes)) % 1_000_000_000n;
    const derivationPath = `m/44'/60'/0'/0/${id}`;

    const wallet = ethers.Wallet.fromMnemonic(
      config.ethSeed,
      derivationPath,
    ).connect(this.provider);
    return wallet;
  }
}
