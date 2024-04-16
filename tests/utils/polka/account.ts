import { ApiPromise } from "@polkadot/api";
import { IKeyringPair } from "@polkadot/types/types";
import { evmToAddress } from "@polkadot/util-crypto";
import { BigNumber } from "ethers";
import { SubBase } from "./base";
import { SubUtils } from "./utils";
import { SignerOptions } from "@polkadot/api/types";

export class SubAccount extends SubBase {
  private utils: SubUtils;

  constructor(api: ApiPromise, utils: SubUtils) {
    super(api);
    this.utils = utils;
  }

  async getBalance(address: string) {
    if (address.startsWith("0x")) address = evmToAddress(address);
    const balance = await this.api.query.system.account(address);
    const { data } = balance.toJSON() as { data: { free: string } };

    return BigNumber.from(data.free);
  }

  async transfer(
    params: { to: string; value: BigNumber },
    signer: IKeyringPair,
    options: Partial<SignerOptions> = null,
  ) {
    if (params.to.startsWith("0x")) params.to = evmToAddress(params.to);

    const result = await this.utils.signAndSend(
      signer,
      this.api.tx.balances.transferKeepAlive(params.to, params.value),
      options,
    );

    return result;
  }

  async getNonce(address: string): Promise<number> {
    const account = await this.api.query.system.account(address);
    const { nonce } = account.toJSON() as { nonce: number };
    return nonce;
  }
}
