import { ApiPromise } from "@polkadot/api";
import { SubBase } from "./base";

export class SubSystem extends SubBase {
  constructor(api: ApiPromise) {
    super(api);
  }

  async getTotalIssuance() {
    const totalIssuance = await this.api.query.balances.totalIssuance();
    return BigInt(totalIssuance.toHex());
  }
}
