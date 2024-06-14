import { ApiPromise, Keyring } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/types/submittable";
import { EventRecord, ExtrinsicStatus } from "@polkadot/types/interfaces";
import { IKeyringPair, ISubmittableResult } from "@polkadot/types/types";
import { SubBase } from "./base";
import { SignerOptions } from "@polkadot/api/types";

export const transactionStatus = {
  NOT_READY: "NotReady",
  FAIL: "Fail",
  RETRACTED: "Retracted",
  SUCCESS: "Success",
} as const;

export type TransactionStatus =
  (typeof transactionStatus)[keyof typeof transactionStatus];

export class SubUtils extends SubBase {
  constructor(api: ApiPromise) {
    super(api);
  }

  async batch(
    sender: IKeyringPair,
    transactions: SubmittableExtrinsic<"promise">[],
  ) {
    const tx = this.api.tx.utility.batchAll(transactions);
    return this.signAndSend(sender, tx);
  }

  async signAndSend(
    sender: IKeyringPair,
    transaction: SubmittableExtrinsic<"promise">,
    options: Partial<SignerOptions> = {},
  ): Promise<{ result: ISubmittableResult; status: TransactionStatus }> {
    return new Promise((resolve, reject) => {
      let unsub: () => void;

      transaction
        .signAndSend(sender, options, (result) => {
          try {
            const txStatus = this.getTransactionStatus(
              result as unknown as {
                events: EventRecord[];
                status: ExtrinsicStatus;
              },
            );

            if (txStatus === transactionStatus.SUCCESS) {
              resolve({ result, status: txStatus });
              if (unsub) unsub();
            } else if (txStatus === transactionStatus.RETRACTED) {
              console.log("Retracted, resending...");
              resolve(this.signAndSend(sender, transaction, options));
            } else if (txStatus === transactionStatus.FAIL) {
              console.error(result.toHuman());
              reject({ result, status: txStatus });
              if (unsub) unsub();
            }
          } catch (error) {
            console.error(error);
            reject(error);
            if (unsub) unsub();
          }
        })
        .then((_unsub) => {
          unsub = _unsub;
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  getTransactionStatus(submitableResult: {
    events: EventRecord[];
    status: ExtrinsicStatus;
  }): string {
    const { events, status } = submitableResult;
    if (status.isReady || status.isInBlock) {
      return transactionStatus.NOT_READY;
    }
    if (status.isBroadcast) {
      return transactionStatus.NOT_READY;
    }
    if (status.isFinalized) {
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
    if (status.isRetracted) {
      return transactionStatus.RETRACTED;
    }

    return transactionStatus.FAIL;
  }

  fromSeed(seed: string, ss58Format = 42) {
    const keyring = new Keyring({ type: "sr25519", ss58Format });
    return keyring.addFromUri(seed);
  }
}
