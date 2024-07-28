import "../../types/types-lookup";
import "../../types/augment-types";
import "../../types/registry";
import "../../types/augment-api";

export * from "../../types";

import { ApiPromise, WsProvider } from "@polkadot/api";
import { IKeyringPair } from "@polkadot/types/types";
import { SubAccounts } from "./accounts";
import { SubAura } from "./aura";
import { SubSystem } from "./system";
import { SubUtils } from "./utils";

export default class SubHelper {
  readonly api: ApiPromise;
  readonly sudo: IKeyringPair;

  readonly utils: SubUtils;
  readonly accounts: SubAccounts;
  readonly system: SubSystem;
  readonly aura: SubAura;

  private constructor(api: ApiPromise) {
    this.api = api;
    this.utils = new SubUtils(api);
    this.accounts = new SubAccounts(api, this.utils);
    this.system = new SubSystem(api);
    this.aura = new SubAura(api, this.utils);
    // TODO change to filename account
    this.sudo = this.utils.fromSeed("//Alice");
  }

  static async init(wsEndpoint: string) {
    const api = await ApiPromise.create({
      provider: new WsProvider(wsEndpoint),
    });

    console.log(await api.query.timestamp.now());

    await api.isReadyOrError;

    return new SubHelper(api);
  }
}
