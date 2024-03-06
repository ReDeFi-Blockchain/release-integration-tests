import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { IKeyringPair } from "@polkadot/types/types";

export const transactionStatus = {
  NOT_READY: "NotReady",
  FAIL: "Fail",
  SUCCESS: "Success",
};

export const getTransactionStatus = ({ events, status }): string => {
  if (status.isReady) {
    return transactionStatus.NOT_READY;
  }
  if (status.isBroadcast) {
    return transactionStatus.NOT_READY;
  }
  if (status.isInBlock || status.isFinalized) {
    const errors = events.filter(
      (e) => e.event.data.method === "ExtrinsicFailed"
    );
    if (errors.length > 0) {
      return transactionStatus.FAIL;
    }
    if (
      events.filter((e) => e.event.data.method === "ExtrinsicSuccess").length >
      0
    ) {
      return transactionStatus.SUCCESS;
    }
  }

  return status.FAIL;
};

export const signTransaction = (
  sender: IKeyringPair,
  transaction: any,
  label = "transaction"
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let unsub = await transaction.signAndSend(sender, (result) => {
        const status = getTransactionStatus(result);

        if (status === transactionStatus.SUCCESS) {
          console.log(`${label} successful`);
          resolve({ result, status });
          unsub();
        } else if (status === transactionStatus.FAIL) {
          console.error(
            `Something went wrong with ${label}. Status: ${status}`
          );
          console.error(result.toHuman());
          reject({ result, status });
          unsub();
        }
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const connectApi = async (wsEndpoint: string): Promise<ApiPromise> => {
  const api = new ApiPromise({
    provider: new WsProvider(wsEndpoint),
  });

  await api.isReadyOrError;

  return api;
};

export const fromSeed = (seed: string, ss58Format = 0) => {
  const keyring = new Keyring({ type: "sr25519", ss58Format });

  return keyring.addFromUri(seed);
};
