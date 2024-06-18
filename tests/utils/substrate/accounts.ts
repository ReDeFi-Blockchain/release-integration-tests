import { ApiPromise } from "@polkadot/api";
import { IKeyringPair } from "@polkadot/types/types";
import { evmToAddress, addressToEvm } from "@polkadot/util-crypto";
import { SubBase } from "./base";
import { SubUtils } from "./utils";
import { SignerOptions } from "@polkadot/api/types";

export enum AccountPermissions {
  Empty = 0,
  Mint = 1 << 0,
}

export class SubAccounts extends SubBase {
  private utils: SubUtils;

  constructor(api: ApiPromise, utils: SubUtils) {
    super(api);
    this.utils = utils;
  }

  async setPermissions(    
      params: { account: string, permissions: AccountPermissions, erc20: `0x${string}` },
      signer: IKeyringPair,
      options?: Partial<SignerOptions>,
  ) {
    return this.utils.signAndSend(
      signer,
      this.makeSetPermissionTx({ ...params, owner: signer.address }),
      options,
    );
  }

  private makeSetPermissionTx(params: {
    erc20: `0x${string}`
    owner: string,
    account: string;
    permissions: AccountPermissions;
  }) {
    const transferSignature = "0xd901570d"; // Signature for "setAccountPermissions(address, permissions)"
    const encodedAccount = params.account.substring(2).padStart(64, "0"); // hex account padded with zeros
    const encodedPermissions = (params.permissions as number).toString(16).padStart(64, "0"); // hex permissions padded with zeros
    const payload = transferSignature + encodedAccount + encodedPermissions;

    return this.evmCall(
      addressToEvm(params.owner),
      params.erc20,
      payload,
      0n,
      100_000,
      1_000_000_000_000_000n,
    );
  }

  async getBalance(address: string) {
    if (address.startsWith("0x")) address = evmToAddress(address);
    const balance = await this.api.query.system.account(address);
    const { data } = balance.toJSON() as { data: { free: string } };

    return BigInt(data.free);
  }

  async mint(
    params: { to: string; value: bigint; erc20: `0x${string}` },
    signer: IKeyringPair,
    options?: Partial<SignerOptions>,
  ) {
    return this.utils.signAndSend(
      signer,
      this.makeMintAssetTx({ ...params, owner: signer.address }),
      options,
    );
  }
  
  private makeMintAssetTx(params: {
    erc20: `0x${string}`
    owner: string,
    to: string;
    value: bigint;
  }) {
    const transferSignature = "0x40c10f19"; // Signature for "mint(address, uint256)"
    const encodedTo = params.to.substring(2).padStart(64, "0"); // hex recipient padded with zeros
    const encodedAmount = params.value.toString(16).padStart(64, "0"); // hex amount padded with zeros
    const payload = transferSignature + encodedTo + encodedAmount;

    return this.evmCall(
      addressToEvm(params.owner),
      params.erc20,
      payload,
      0n,
      100_000,
      1_000_000_000_000_000n,
    );
  }

  async transferAsset(
    params: { to: string; value: bigint; erc20: `0x${string}` },
    signer: IKeyringPair,
    options?: Partial<SignerOptions>,
  ) {
    return this.utils.signAndSend(
      signer,
      this.makeTransferAssetTx({ ...params, from: signer.address }),
      options,
    );
  }

  async transferNative(
    params: { to: string; value: bigint },
    signer: IKeyringPair,
    options?: Partial<SignerOptions>,
  ) {
    return this.utils.signAndSend(
      signer,
      this.makeTransferNativeTx(params),
      options,
    );
  }

  async batchTransferAsset(
    params: { to: string; value: bigint; erc20: `0x${string}` }[],
    signer: IKeyringPair,
  ) {
    const txs = [];
    for (const p of params)
      txs.push(this.makeTransferAssetTx({ ...p, from: signer.address }));

    await this.utils.batch(signer, txs);
  }

  async batchTransferNative(
    params: { to: string; value: bigint }[],
    signer: IKeyringPair,
  ) {
    const txs = [];
    for (const p of params) txs.push(this.makeTransferNativeTx(p));

    await this.utils.batch(signer, txs);
  }

  async getNonce(address: string): Promise<number> {
    const account = await this.api.query.system.account(address);
    const { nonce } = account.toJSON() as { nonce: number };
    return nonce;
  }

  private makeTransferNativeTx(params: { to: string; value: bigint }) {
    if (params.to.startsWith("0x")) params.to = evmToAddress(params.to);
    return this.api.tx.balances.transferKeepAlive(params.to, params.value);
  }

  private makeTransferAssetTx(params: {
    erc20: `0x${string}`;
    from: string;
    to: string;
    value: bigint;
  }) {
    const transferSignature = "0xa9059cbb"; // Signature for "transfer(address,uint256)"
    const encodedTo = params.to.substring(2).padStart(64, "0"); // hex recipient padded with zeros
    const encodedAmount = params.value.toString(16).padStart(64, "0"); // hex amount padded with zeros
    const payload = transferSignature + encodedTo + encodedAmount;

    return this.evmCall(
      addressToEvm(params.from),
      params.erc20,
      payload,
      0n,
      100_000,
      1_000_000_000_000_000n
    );
  }

  private evmCall(
    source: `0x${string}` | Uint8Array,
    target: `0x${string}` | Uint8Array,
    input: string | Uint8Array,
    value: bigint,
    gasLimit: number,
    maxFeePerGas: bigint,
    maxPriorityFeePerGas?: bigint,
    nonce?: bigint,
  ) {
    return this.api.tx.evm.call(
      source,
      target,
      input,
      value,
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      /* accessList */ null,
    );
  }
}
