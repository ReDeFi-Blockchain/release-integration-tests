import {
  ContractTransactionResponse,
  HDNodeWallet,
  JsonRpcProvider,
  ethers,
} from "ethers";
import {
  NativeFungibleAssets,
  NativeFungibleAssets__factory,
} from "../../typechain-types";
import { NETWORK_CONSTANTS } from "../constants";
import { getFilenameWallet } from "../filename-wallet";
import { AccountAssetType, NetworkConstants } from "../types";
import { EthAccount } from "./accounts";
import { Retry } from "../retry";

export default class EvmHelper {
  // NOTE: Use JsonRpcProvider instead of WebSocketProvider.
  // Ethers has a bug where the nonce may not increment on time on fast nodes.
  readonly provider: JsonRpcProvider;
  readonly accounts: EthAccount;
  readonly assets: Record<AccountAssetType, NativeFungibleAssets>;
  readonly donor: HDNodeWallet;
  readonly CONSTANTS: NetworkConstants;

  private constructor(
    filenameOrWallet: HDNodeWallet | string,
    provider: JsonRpcProvider,
    constants: NetworkConstants,
  ) {
    this.provider = provider;
    this.CONSTANTS = constants;
    this.assets = {
      NATIVE: NativeFungibleAssets__factory.connect(
        constants.NATIVE.ADDRESS,
        this.provider,
      ),
      SIBLING: NativeFungibleAssets__factory.connect(
        constants.SIBLING.ADDRESS,
        this.provider,
      ),
      GBP: NativeFungibleAssets__factory.connect(
        constants.GBP.ADDRESS,
        this.provider,
      ),
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
    rpcEndpoint: string,
  ) {
    const provider = new ethers.JsonRpcProvider(rpcEndpoint);
    const { chainId } = await provider.getNetwork();

    let constants: NetworkConstants;

    if (chainId === NETWORK_CONSTANTS.L1.CHAIN_ID)
      constants = NETWORK_CONSTANTS.L1;
    else if (chainId === NETWORK_CONSTANTS.L2.CHAIN_ID)
      constants = NETWORK_CONSTANTS.L2;
    else throw Error("Unknown Chain Id");

    return new EvmHelper(filenameOrWallet, provider, constants);
  }

  async waitForResult(tx: Promise<ContractTransactionResponse>) {
    const transaction = await tx;
    const receipt = await transaction.wait();
    if (!receipt) throw Error("Cannot get receipt");

    return { receipt, fee: receipt.fee };
  }

  async waitForBlock(blocks: number) {
    const currentBlock = await this.provider.getBlockNumber();

    await Retry.until(
      () => this.provider.getBlockNumber(),
      (blockNumber) => blockNumber >= currentBlock + blocks,
      // TODO too much
      blocks * 30000,
    );
  }
}
