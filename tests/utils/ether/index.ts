import { ContractTransactionResponse, HDNodeWallet, ethers } from "ethers";
import { TestERC20, TestERC20__factory } from "../../typechain-types";
import { ADDRESS } from "../constants";
import { EthAccount } from "./accounts";
import config from "../config";
import { getFilenameWallet } from "../filename-wallet";

export default class EtherHelper {
  readonly provider: ethers.WebSocketProvider;
  readonly nativeErc20: TestERC20;
  readonly donor: HDNodeWallet;
  readonly accounts: EthAccount;

  constructor(wallet: HDNodeWallet);
  constructor(filename: string);
  constructor(filenameOrWallet: HDNodeWallet | string) {
    this.provider = new ethers.WebSocketProvider(config.wsEndpoint);
    this.nativeErc20 = TestERC20__factory.connect(
      ADDRESS.NATIVE_ERC20,
      this.provider,
    );

    if (typeof filenameOrWallet === "string") {
      this.donor = getFilenameWallet(filenameOrWallet).connect(this.provider);
    } else this.donor = filenameOrWallet.connect(this.provider);

    this.accounts = new EthAccount(this.provider, this.donor);
  }

  async signAndSend(tx: Promise<ContractTransactionResponse>) {
    const transaction = await tx;
    const receipt = await transaction.wait();
    if (!receipt) throw Error("Cannot get receipt");
    const fee = receipt.gasPrice * receipt.gasUsed;

    return { receipt, fee };
  }
}
