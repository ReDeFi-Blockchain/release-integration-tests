import {
  ContractTransactionResponse,
  HDNodeWallet,
  WebSocketProvider,
  ethers,
} from "ethers";
import { ERC20, ERC20__factory } from "../../typechain-types";
import { NETWORK_CONSTANTS } from "../constants";
import { getFilenameWallet } from "../filename-wallet";
import { AccountAssetType, NetworkConstants } from "../types";
import { EthAccount } from "./accounts";

export default class EtherHelper {
  readonly provider: WebSocketProvider;
  readonly accounts: EthAccount;
  readonly assets: Record<AccountAssetType, ERC20>;
  readonly donor: HDNodeWallet;
  readonly CONSTANTS: NetworkConstants;

  private constructor(
    filenameOrWallet: HDNodeWallet | string,
    provider: WebSocketProvider,
    constants: NetworkConstants,
  ) {
    this.provider = provider;
    this.CONSTANTS = constants;
    this.assets = {
      NATIVE: ERC20__factory.connect(constants.NATIVE.ADDRESS, this.provider),
      SIBLING: ERC20__factory.connect(constants.SIBLING.ADDRESS, this.provider),
      GBP: ERC20__factory.connect(constants.GBP.ADDRESS, this.provider),
    };

    if (typeof filenameOrWallet === "string") {
      this.donor = getFilenameWallet(filenameOrWallet).connect(this.provider);
    } else {
      this.donor = filenameOrWallet.connect(this.provider);
    }

    this.accounts = new EthAccount(this.provider, this.assets, this.donor);
  }

  static async init(
    filenameOrWallet: HDNodeWallet | string,
    wsEndpoint: string,
  ) {
    const provider = new ethers.WebSocketProvider(wsEndpoint);
    const { chainId } = await provider.getNetwork();
    const constants =
      chainId === NETWORK_CONSTANTS.PARACHAIN.CHAIN_ID
        ? NETWORK_CONSTANTS.PARACHAIN
        : NETWORK_CONSTANTS.RELAY;

    return new EtherHelper(filenameOrWallet, provider, constants);
  }

  async signAndSend(tx: Promise<ContractTransactionResponse>) {
    const transaction = await tx;
    const receipt = await transaction.wait();
    if (!receipt) throw Error("Cannot get receipt");
    const fee = receipt.gasPrice * receipt.gasUsed;

    return { receipt, fee };
  }
}
