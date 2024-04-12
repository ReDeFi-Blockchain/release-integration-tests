import { ethers } from "ethers";
import { ERC20Contract, ERC20Contract__factory } from "../../ABIGEN";
import { ADDRESS } from "../constants";
import config from "../../config";

export default class EtherHelper {
  readonly provider: ethers.providers.WebSocketProvider;
  readonly nativeErc20: ERC20Contract;
  readonly ethers: typeof ethers;

  constructor() {
    this.provider = new ethers.providers.WebSocketProvider(config.wsEndpoint);
    this.nativeErc20 = ERC20Contract__factory.connect(
      ADDRESS.NATIVE_ERC20,
      this.provider,
    );
    this.ethers = ethers;
  }

  getRandomWallet() {
    return this.ethers.Wallet.createRandom().connect(this.provider);
  }
}
