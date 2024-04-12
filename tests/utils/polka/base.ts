import { ApiPromise } from "@polkadot/api";

export abstract class SubBase {
  protected api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }
}
