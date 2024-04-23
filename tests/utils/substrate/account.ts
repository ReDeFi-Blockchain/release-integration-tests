import { ApiPromise } from "@polkadot/api";
import { IKeyringPair } from "@polkadot/types/types";
import { evmToAddress } from "@polkadot/util-crypto";
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

    return BigInt(data.free);
  }

  async transfer(
    params: { to: string; value: bigint },
    signer: IKeyringPair,
    options?: Partial<SignerOptions>,
  ) {
    if (params.to.startsWith("0x")) params.to = evmToAddress(params.to);

    const result = await this.utils.signAndSend(
      signer,
      this.api.tx.balances.transferKeepAlive(params.to, params.value),
      options,
    );

    return result;
  }

  async batchTransfer(
    params: { to: string; value: bigint }[],
    signer: IKeyringPair,
  ) {
    const txs = [];

    for (const p of params) {
      if (p.to.startsWith("0x")) p.to = evmToAddress(p.to);
      txs.push(this.api.tx.balances.transferKeepAlive(p.to, p.value));
    }

    await this.utils.batch(signer, txs);
  }

  async getNonce(address: string): Promise<number> {
    const account = await this.api.query.system.account(address);
    const { nonce } = account.toJSON() as { nonce: number };
    return nonce;
  }
}
