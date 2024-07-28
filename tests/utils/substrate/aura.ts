import { ApiPromise } from "@polkadot/api";
import { IKeyringPair } from "@polkadot/types/types";
import { evmToAddress, addressToEvm } from "@polkadot/util-crypto";
import { SubBase } from "./base";
import { SubUtils } from "./utils";
import { SignerOptions } from "@polkadot/api/types";
import { AccountPermissions } from "../types";
import { Coder } from "ethers/lib.commonjs/abi/coders/abstract-coder";
import { fromTwos } from "ethers";

export class SubAura extends SubBase {
  private utils: SubUtils;

  constructor(api: ApiPromise, utils: SubUtils) {
    super(api);
    this.utils = utils;
  }

  async getAuthoritiesFromAura() {
    let codec = await this.api.query.aura.authorities();
    let authorities = codec.entries(([_i, authority]) => authority.toHuman());
    return Array.from(authorities);
  }

  async getAuthoritiesFromCumulusExt() {}

  async getAuthoritiesFromPrivateBalancesExt() {}

  async getTrustedAuthoritiesFromPrivateBalancesExt() {}

  async setTrustedAuthorities(
    params: { authorities: `0x${string}`[] },
    signer: IKeyringPair,
    options?: Partial<SignerOptions>,
  ) {
    // TODO
  }

  async setAuthorities(
    params: { authorities: `0x${string}`[] },
    signer: IKeyringPair,
    options?: Partial<SignerOptions>,
  ) {
    // TODO
  }
}
