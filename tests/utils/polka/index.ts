import { ApiPromise, WsProvider } from "@polkadot/api";
import { IKeyringPair } from "@polkadot/types/types";
import { SubAccount } from "./account";
import { SubSystem } from "./system";
import { SubUtils } from "./utils";
import config from "../../config";

export default class SubHelper {
  readonly api: ApiPromise;
  readonly utils: SubUtils;
  readonly account: SubAccount;
  readonly system: SubSystem;
  readonly keyrings: {
    alice: IKeyringPair;
  };

  private constructor(api: ApiPromise) {
    this.api = api;
    this.utils = new SubUtils(api);
    this.account = new SubAccount(api, this.utils);
    this.system = new SubSystem(api);
    this.keyrings = {
      alice: this.utils.fromSeed("//Alice"),
    };
  }

  static async init(wsEndpoint = config.wsEndpoint) {
    const api = await ApiPromise.create({
      provider: new WsProvider(wsEndpoint),
    });

    await api.isReadyOrError;

    return new SubHelper(api);
  }
}
