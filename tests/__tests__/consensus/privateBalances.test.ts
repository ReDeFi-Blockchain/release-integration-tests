import { ApiPromise, Keyring } from "@polkadot/api";
import { EventRecord, ExtrinsicStatus } from "@polkadot/types/interfaces";
import { IKeyringPair, ISubmittableResult } from "@polkadot/types/types";
import { itSub, expect } from "./util/index.js";
import { SignerOptions } from "@polkadot/api/types";
import { SubmittableExtrinsic } from "@polkadot/api/types/submittable";
import { Header } from "@polkadot/types/interfaces/runtime";

export class SubAura {
  api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }

  async getApi(blockHash?: Uint8Array | string) {
    return blockHash ? await this.api.at(blockHash) : this.api;
  }

  async getAuthoritiesFromAura(blockHash?: Uint8Array | string) {
    return await this.getApi(blockHash)
      .then((api) => api.query.aura.authorities())
      .then((authorities) =>
        authorities.map((authority) => authority.toString() as `0x${string}`),
      );
  }

  async getAuthoritiesFromCumulusExt(blockHash?: Uint8Array | string) {
    return await this.getApi(blockHash)
      .then((api) => api.query.auraExt.authorities())
      .then((authorities) =>
        authorities.map((authority) => authority.toString() as `0x${string}`),
      );
  }

  async getAuthoritiesFromPrivateBalancesExt(blockHash?: Uint8Array | string) {
    return await this.getApi(blockHash)
      .then((api) => api.query.privateBalancesAuraExt.authorities())
      .then((authorities) =>
        authorities.map((authority) => authority.toString() as `0x${string}`),
      );
  }

  async getTrustedAuthoritiesFromPrivateBalancesExt(
    blockHash?: Uint8Array | string,
  ) {
    return await this.getApi(blockHash)
      .then((api) => api.query.privateBalancesAuraExt.trustedAuthorities())
      .then((authorities) =>
        authorities.map((authority) => authority.toString() as `0x${string}`),
      );
  }

  async setTrustedAuthorities(
    params: { authorities: `0x${string}`[] },
    signer: IKeyringPair,
    options?: Partial<SignerOptions>,
  ) {
    return await signAndSend(
      signer,
      this.api.tx.sudo.sudo(
        this.api.tx.privateBalancesAuraExt.setTrustedAuthorities(
          params.authorities,
        ),
      ),
      options,
    );
  }

  async setAuthorities(
    params: { authorities: `0x${string}`[] },
    signer: IKeyringPair,
    options?: Partial<SignerOptions>,
  ) {
    return await signAndSend(
      signer,
      this.api.tx.sudo.sudo(
        this.api.tx.privateBalancesAuraExt.setAuthorities(params.authorities),
      ),
      options,
    );
  }
}

export const transactionStatus = {
  NOT_READY: "NotReady",
  FAIL: "Fail",
  RETRACTED: "Retracted",
  SUCCESS: "Success",
} as const;

export type TransactionStatus =
  (typeof transactionStatus)[keyof typeof transactionStatus];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function signAndSend(
  sender: IKeyringPair,
  transaction: SubmittableExtrinsic<"promise">,
  options: Partial<SignerOptions> = {},
): Promise<{ result: ISubmittableResult; status: TransactionStatus }> {
  return new Promise((resolve, reject) => {
    let unsub: () => void;

    transaction
      .signAndSend(sender, options, (result) => {
        try {
          const txStatus = getTransactionStatus(
            result as unknown as {
              events: EventRecord[];
              status: ExtrinsicStatus;
            },
          );

          if (txStatus === transactionStatus.SUCCESS) {
            resolve({ result, status: txStatus });
            if (unsub) unsub();
          } else if (txStatus === transactionStatus.RETRACTED) {
            console.log("Retracted, resending after 15s ...");
            resolve(
              delay(15000).then(() =>
                signAndSend(sender, transaction, options),
              ),
            );
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

function getTransactionStatus(submitableResult: {
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
      events.filter((e) => e.event.data.method === "ExtrinsicSuccess").length >
      0
    ) {
      return transactionStatus.SUCCESS;
    }
  }
  if (status.isRetracted) {
    return transactionStatus.RETRACTED;
  }

  return transactionStatus.FAIL;
}

function fromSeed(seed: string, ss58Format = 42) {
  const keyring = new Keyring({ type: "sr25519", ss58Format });
  return keyring.addFromUri(seed);
}

function stringsArrayEq(a1: string[], a2: string[]) {
  if (a1.length != a2.length) {
    return false;
  }

  for (let i = 0; i < a1.length; i += 1) {
    if (a1[i] != a2[i]) {
      return false;
    }
  }

  return true;
}

describe("Private balances consensus changes", () => {
  itSub("modify list of trusted collators [#serial]", async ({ helper }) => {
    const aura = new SubAura(helper.api!);
    const sudo = fromSeed("//Alice");

    const authorities = await aura.getAuthoritiesFromAura();

    await aura.setTrustedAuthorities({ authorities }, sudo);

    const trustedAuthorities =
      await aura.getTrustedAuthoritiesFromPrivateBalancesExt();

    expect(authorities).to.deep.equal(trustedAuthorities);
  });

  itSub("clear list of trusted collators [#serial]", async ({ helper }) => {
    const aura = new SubAura(helper.api!);
    const sudo = fromSeed("//Alice");

    await aura.setTrustedAuthorities({ authorities: [] }, sudo);

    const trustedAuthorities =
      await aura.getTrustedAuthoritiesFromPrivateBalancesExt();

    expect(trustedAuthorities).to.be.empty;
  });

  itSub("modify list of untrusted collators [#serial]", async ({ helper }) => {
    const aura = new SubAura(helper.api!);
    const sudo = fromSeed("//Alice");

    const initialAuthorities = await aura.getAuthoritiesFromAura();
    const authorities = [initialAuthorities[1]];

    await aura.setAuthorities({ authorities }, sudo);

    const authoritiesR = await aura.getAuthoritiesFromPrivateBalancesExt();

    expect(authoritiesR).to.deep.equal(authorities);

    // Restore authorities for next tests
    await aura.setAuthorities({ authorities: initialAuthorities }, sudo);
  });

  itSub(
    "untrusted collators list can not be empty [#serial]",
    async ({ helper }) => {
      const aura = new SubAura(helper.api!);
      const sudo = fromSeed("//Alice");

      await aura.setAuthorities({ authorities: [] }, sudo);

      /// TODO: Check sudo result
    },
  );

  itSub(
    "use trusted collators every even block [#serial]",
    async ({ helper }) => {
      const api = helper.api!;
      const aura = new SubAura(api);
      const sudo = fromSeed("//Alice");

      const untrustedAuthorities =
        await aura.getAuthoritiesFromPrivateBalancesExt();

      const trustedAuthorities = [untrustedAuthorities[0]];
      await aura.setTrustedAuthorities(
        { authorities: trustedAuthorities },
        sudo,
      );

      let count: number = 0;
      let finished: boolean = false;
      let invalidAuthorities:
        | {
            header: Header;
            currentAuthorities: `0x${string}`[];
            expectedAuthorities: `0x${string}`[];
          }
        | undefined;

      const unsub = await api.rpc.chain.subscribeNewHeads(async (header) => {
        const currentAuthorities = await aura.getAuthoritiesFromAura(
          header.hash,
        );

        const shouldBeTrusted = header.number.toNumber() % 2 == 0;
        const expectedAuthorities = shouldBeTrusted
          ? untrustedAuthorities // WTF?
          : trustedAuthorities;

        // console.log(`Block #${header.number} authorities: ${currentAuthorities}, expected: ${expectedAuthorities} (should be trusted? ${shouldBeTrusted})`);

        if (!stringsArrayEq(currentAuthorities, expectedAuthorities)) {
          unsub();
          invalidAuthorities = {
            header,
            currentAuthorities,
            expectedAuthorities,
          };
          finished = true;
        }

        if (++count == 4) {
          unsub();
          finished = true;
        }
      });

      while (!finished) {
        await delay(1000);
      }

      if (invalidAuthorities) {
        const { header, currentAuthorities, expectedAuthorities } =
          invalidAuthorities;
        expect(currentAuthorities).to.deep.equal(
          expectedAuthorities,
          // Why message is not work?
          `invalid authorities at block #${header.number} (${header.hash}). Expected ${expectedAuthorities}, found ${currentAuthorities}`,
        );
      }
    },
  );

  itSub("producing blocks over time [#stability]", async ({ helper }) => {
    // TODO
  });
});
