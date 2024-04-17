import { ContractTransaction, Wallet, ethers } from "ethers";
import { ERC20Contract, ERC20Contract__factory } from "../../ABIGEN";
import config from "../../config";
import { ADDRESS } from "../constants";
import { getFilenameWallet } from "../filename-wallet";
import { EthAccount } from "./accounts";

export default class EtherHelper {
  readonly provider: ethers.providers.WebSocketProvider;
  readonly nativeErc20: ERC20Contract;
  readonly donor: Wallet;
  readonly accounts: EthAccount;

  constructor();
  constructor(wallet: Wallet);
  constructor(filename: string);
  constructor(filenameOrWallet?: Wallet | string) {
    this.provider = new ethers.providers.WebSocketProvider(config.wsEndpoint);
    this.nativeErc20 = ERC20Contract__factory.connect(
      ADDRESS.NATIVE_ERC20,
      this.provider,
    );

    if (typeof filenameOrWallet === "string") {
      this.donor = getFilenameWallet(filenameOrWallet).connect(this.provider);
    } else this.donor = filenameOrWallet;

    this.accounts = new EthAccount(this.provider, this.donor);
  }

  async signAndSend(tx: Promise<ContractTransaction>) {
    const transaction = await tx;
    const receipt = await transaction.wait();
    const fee = receipt.gasUsed.mul(receipt.effectiveGasPrice);
    return { receipt, fee, events: receipt.events };
  }
}
