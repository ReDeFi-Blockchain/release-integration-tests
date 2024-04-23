import {
  ContractTransactionResponse,
  HDNodeWallet,
  WebSocketProvider,
  ethers,
} from "ethers";
import { TestERC20, TestERC20__factory } from "../../typechain-types";
import { NETWORK_CONSTANTS, NetworkConstants } from "../constants";
import { EthAccount } from "./accounts";
import { getFilenameWallet } from "../filename-wallet";

export default class EtherHelper {
  readonly provider: ethers.WebSocketProvider;
  readonly nativeErc20: TestERC20;
  readonly donor: HDNodeWallet;
  readonly accounts: EthAccount;
  readonly CONSTANTS: NetworkConstants;

  private constructor(
    filenameOrWallet: HDNodeWallet | string,
    provider: WebSocketProvider,
    constants: NetworkConstants,
  ) {
    this.provider = provider;
    this.CONSTANTS = constants;
    this.nativeErc20 = TestERC20__factory.connect(
      constants.NATIVE_ERC20,
      this.provider,
    );

    if (typeof filenameOrWallet === "string") {
      this.donor = getFilenameWallet(filenameOrWallet).connect(this.provider);
    } else this.donor = filenameOrWallet.connect(this.provider);

    this.accounts = new EthAccount(this.provider, this.donor);
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
