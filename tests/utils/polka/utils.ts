import { ApiPromise, Keyring } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/types/submittable";
import { EventRecord, ExtrinsicStatus } from "@polkadot/types/interfaces";
import { IKeyringPair, ISubmittableResult } from "@polkadot/types/types";
import { SubBase } from "./base";

export const transactionStatus = {
  NOT_READY: "NotReady",
  FAIL: "Fail",
  SUCCESS: "Success",
} as const;

export type TransactionStatus =
  (typeof transactionStatus)[keyof typeof transactionStatus];

export class SubUtils extends SubBase {
  constructor(api: ApiPromise) {
    super(api);
  }

  signAndSend(
    sender: IKeyringPair,
    transaction: SubmittableExtrinsic<"promise">,
    label = "transaction",
  ): Promise<{ result: ISubmittableResult; status: TransactionStatus }> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const unsub = await transaction.signAndSend(sender, (result) => {
          const txStatus = this.getTransactionStatus(
            result as unknown as {
              events: EventRecord[];
              status: ExtrinsicStatus;
            },
          );
          if (txStatus === transactionStatus.SUCCESS) {
            console.log(`${label} successful`);
            resolve({ result, status: txStatus });
            unsub();
          } else if (txStatus === transactionStatus.FAIL) {
            console.error(
              `Something went wrong with ${label}. Status: ${txStatus}`,
            );
            console.error(result.toHuman());
            reject({ result, status: txStatus });
            unsub();
          }
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  getTransactionStatus(submitableResult: {
    events: EventRecord[];
    status: ExtrinsicStatus;
  }): string {
    const { events, status } = submitableResult;
    if (status.isReady) {
      return transactionStatus.NOT_READY;
    }
    if (status.isBroadcast) {
      return transactionStatus.NOT_READY;
    }
    if (status.isInBlock || status.isFinalized) {
      const errors = events.filter(
        (e) => e.event.data.method === "ExtrinsicFailed",
      );
      if (errors.length > 0) {
        return transactionStatus.FAIL;
      }
      if (
        events.filter((e) => e.event.data.method === "ExtrinsicSuccess")
          .length > 0
      ) {
        return transactionStatus.SUCCESS;
      }
    }

    return transactionStatus.FAIL;
  }

  fromSeed(seed: string, ss58Format = 42) {
    const keyring = new Keyring({ type: "sr25519", ss58Format });
    return keyring.addFromUri(seed);
  }
}
