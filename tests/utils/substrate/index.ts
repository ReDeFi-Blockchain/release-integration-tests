import { ApiPromise, WsProvider } from "@polkadot/api";
import { IKeyringPair } from "@polkadot/types/types";
import { SubUtils } from "./utils";
import { SubBalance } from "./balance";
import { SubSystem } from "./system";

export default class SubHelper {
  readonly api: ApiPromise;
  readonly sudo: IKeyringPair;

  readonly utils: SubUtils;
  readonly balance: SubBalance;
  readonly system: SubSystem;

  private constructor(api: ApiPromise) {
    this.api = api;
    this.utils = new SubUtils(api);
    this.balance = new SubBalance(api, this.utils);
    this.system = new SubSystem(api);
    // TODO change to filename account
    this.sudo = this.utils.fromSeed("//Alice");
  }

  static async init(wsEndpoint: string) {
    const api = await ApiPromise.create({
      provider: new WsProvider(wsEndpoint),
    });

    await api.isReadyOrError;

    return new SubHelper(api);
  }
}
