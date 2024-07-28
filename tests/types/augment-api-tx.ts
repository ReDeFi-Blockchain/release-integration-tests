// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/submittable';

import type { ApiTypes, AugmentedSubmittable, SubmittableExtrinsic, SubmittableExtrinsicFunction } from '@polkadot/api-base/types';
import type { Bytes, Compact, Null, Option, U256, Vec, bool, u128, u16, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H160, H256, MultiAddress } from '@polkadot/types/interfaces/runtime';
import type { CumulusPrimitivesCoreAggregateMessageOrigin, CumulusPrimitivesParachainInherentParachainInherentData, EthereumTransactionTransactionV2, PalletBalancesAdjustmentDirection, RedefiRuntimeOriginCaller, SpConsensusAuraSr25519AppSr25519Public, SpWeightsWeightV2Weight, StagingXcmV4Location, XcmV3WeightLimit, XcmVersionedAssets, XcmVersionedLocation, XcmVersionedXcm } from '@polkadot/types/lookup';

export type __AugmentedSubmittable = AugmentedSubmittable<() => unknown>;
export type __SubmittableExtrinsic<ApiType extends ApiTypes> = SubmittableExtrinsic<ApiType>;
export type __SubmittableExtrinsicFunction<ApiType extends ApiTypes> = SubmittableExtrinsicFunction<ApiType>;

declare module '@polkadot/api-base/types/submittable' {
  interface AugmentedSubmittables<ApiType extends ApiTypes> {
    balances: {
      /**
       * Adjust the total issuance in a saturating way.
       * 
       * Can only be called by root and always needs a positive `delta`.
       * 
       * # Example
       **/
      forceAdjustTotalIssuance: AugmentedSubmittable<(direction: PalletBalancesAdjustmentDirection | 'Increase' | 'Decrease' | number | Uint8Array, delta: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [PalletBalancesAdjustmentDirection, Compact<u128>]>;
      /**
       * Set the regular balance of a given account.
       * 
       * The dispatch origin for this call is `root`.
       **/
      forceSetBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Exactly as `transfer_allow_death`, except the origin must be root and the source account
       * may be specified.
       **/
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, Compact<u128>]>;
      /**
       * Unreserve some balance from a user by force.
       * 
       * Can only be called by ROOT.
       **/
      forceUnreserve: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u128]>;
      /**
       * Transfer the entire transferable balance from the caller account.
       * 
       * NOTE: This function only attempts to transfer _transferable_ balances. This means that
       * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
       * transferred by this function. To ensure that this function results in a killed account,
       * you might need to prepare the account by removing any reference counters, storage
       * deposits, etc...
       * 
       * The dispatch origin of this call must be Signed.
       * 
       * - `dest`: The recipient of the transfer.
       * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
       * of the funds the account has, causing the sender account to be killed (false), or
       * transfer everything except at least the existential deposit, which will guarantee to
       * keep the sender account alive (true).
       **/
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, bool]>;
      /**
       * Transfer some liquid free balance to another account.
       * 
       * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       **/
      transferAllowDeath: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
       * kill the origin account.
       * 
       * 99% of the time you want [`transfer_allow_death`] instead.
       * 
       * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * Upgrade a specified account.
       * 
       * - `origin`: Must be `Signed`.
       * - `who`: The account to be upgraded.
       * 
       * This will waive the transaction fee if at least all but 10% of the accounts needed to
       * be upgraded. (We let some not have to be upgraded just in order to allow for the
       * possibililty of churn).
       **/
      upgradeAccounts: AugmentedSubmittable<(who: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    cumulusXcm: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    ethereum: {
      /**
       * Transact an Ethereum transaction.
       **/
      transact: AugmentedSubmittable<(transaction: EthereumTransactionTransactionV2 | { Legacy: any } | { EIP2930: any } | { EIP1559: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [EthereumTransactionTransactionV2]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    evm: {
      /**
       * Issue an EVM call operation. This is similar to a message call transaction in Ethereum.
       **/
      call: AugmentedSubmittable<(source: H160 | string | Uint8Array, target: H160 | string | Uint8Array, input: Bytes | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | Uint8Array | U256 | AnyNumber, nonce: Option<U256> | null | Uint8Array | U256 | AnyNumber, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, H160, Bytes, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * Issue an EVM create operation. This is similar to a contract creation transaction in
       * Ethereum.
       **/
      create: AugmentedSubmittable<(source: H160 | string | Uint8Array, init: Bytes | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | Uint8Array | U256 | AnyNumber, nonce: Option<U256> | null | Uint8Array | U256 | AnyNumber, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * Issue an EVM create2 operation.
       **/
      create2: AugmentedSubmittable<(source: H160 | string | Uint8Array, init: Bytes | string | Uint8Array, salt: H256 | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | Uint8Array | U256 | AnyNumber, nonce: Option<U256> | null | Uint8Array | U256 | AnyNumber, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, H256, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * Withdraw balance from EVM into currency/balances pallet.
       **/
      withdraw: AugmentedSubmittable<(address: H160 | string | Uint8Array, value: u128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, u128]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    messageQueue: {
      /**
       * Execute an overweight message.
       * 
       * Temporary processing errors will be propagated whereas permanent errors are treated
       * as success condition.
       * 
       * - `origin`: Must be `Signed`.
       * - `message_origin`: The origin from which the message to be executed arrived.
       * - `page`: The page in the queue in which the message to be executed is sitting.
       * - `index`: The index into the queue of the message to be executed.
       * - `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
       * of the message.
       * 
       * Benchmark complexity considerations: O(index + weight_limit).
       **/
      executeOverweight: AugmentedSubmittable<(messageOrigin: CumulusPrimitivesCoreAggregateMessageOrigin | { Here: any } | { Parent: any } | { Sibling: any } | string | Uint8Array, page: u32 | AnyNumber | Uint8Array, index: u32 | AnyNumber | Uint8Array, weightLimit: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CumulusPrimitivesCoreAggregateMessageOrigin, u32, u32, SpWeightsWeightV2Weight]>;
      /**
       * Remove a page which has no more messages remaining to be processed or is stale.
       **/
      reapPage: AugmentedSubmittable<(messageOrigin: CumulusPrimitivesCoreAggregateMessageOrigin | { Here: any } | { Parent: any } | { Sibling: any } | string | Uint8Array, pageIndex: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [CumulusPrimitivesCoreAggregateMessageOrigin, u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    parachainInfo: {
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    parachainSystem: {
      /**
       * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
       * later.
       * 
       * The `check_version` parameter sets a boolean flag for whether or not the runtime's spec
       * version and name should be verified on upgrade. Since the authorization only has a hash,
       * it cannot actually perform the verification.
       * 
       * This call requires Root origin.
       **/
      authorizeUpgrade: AugmentedSubmittable<(codeHash: H256 | string | Uint8Array, checkVersion: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256, bool]>;
      /**
       * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
       * 
       * If the authorization required a version check, this call will ensure the spec name
       * remains unchanged and that the spec version has increased.
       * 
       * Note that this function will not apply the new `code`, but only attempt to schedule the
       * upgrade with the Relay Chain.
       * 
       * All origins are allowed.
       **/
      enactAuthorizedUpgrade: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the current validation data.
       * 
       * This should be invoked exactly once per block. It will panic at the finalization
       * phase if the call was not invoked.
       * 
       * The dispatch origin for this call must be `Inherent`
       * 
       * As a side effect, this function upgrades the current validation function
       * if the appropriate time has come.
       **/
      setValidationData: AugmentedSubmittable<(data: CumulusPrimitivesParachainInherentParachainInherentData | { validationData?: any; relayChainState?: any; downwardMessages?: any; horizontalMessages?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [CumulusPrimitivesParachainInherentParachainInherentData]>;
      sudoSendUpwardMessage: AugmentedSubmittable<(message: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    polkadotXcm: {
      /**
       * Claims assets trapped on this pallet because of leftover assets during XCM execution.
       * 
       * - `origin`: Anyone can call this extrinsic.
       * - `assets`: The exact assets that were trapped. Use the version to specify what version
       * was the latest when they were trapped.
       * - `beneficiary`: The location/account where the claimed assets will be deposited.
       **/
      claimAssets: AugmentedSubmittable<(assets: XcmVersionedAssets | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedAssets, XcmVersionedLocation]>;
      /**
       * Execute an XCM message from a local, signed, origin.
       * 
       * An event is deposited indicating whether `msg` could be executed completely or only
       * partially.
       * 
       * No more than `max_weight` will be used in its attempted execution. If this is less than
       * the maximum amount of weight that the message could take to be executed, then no
       * execution attempt will be made.
       **/
      execute: AugmentedSubmittable<(message: XcmVersionedXcm | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedXcm, SpWeightsWeightV2Weight]>;
      /**
       * Set a safe XCM version (the version that XCM should be encoded with if the most recent
       * version a destination can accept is unknown).
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
       **/
      forceDefaultXcmVersion: AugmentedSubmittable<(maybeXcmVersion: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Option<u32>]>;
      /**
       * Ask a location to notify us regarding their XCM version and any changes to it.
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `location`: The location to which we should subscribe for XCM version notifications.
       **/
      forceSubscribeVersionNotify: AugmentedSubmittable<(location: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation]>;
      /**
       * Set or unset the global suspension state of the XCM executor.
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `suspended`: `true` to suspend, `false` to resume.
       **/
      forceSuspension: AugmentedSubmittable<(suspended: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [bool]>;
      /**
       * Require that a particular destination should no longer notify us regarding any XCM
       * version changes.
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `location`: The location to which we are currently subscribed for XCM version
       * notifications which we no longer desire.
       **/
      forceUnsubscribeVersionNotify: AugmentedSubmittable<(location: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation]>;
      /**
       * Extoll that a particular destination can be communicated with through a particular
       * version of XCM.
       * 
       * - `origin`: Must be an origin specified by AdminOrigin.
       * - `location`: The destination that is being described.
       * - `xcm_version`: The latest version of XCM that `location` supports.
       **/
      forceXcmVersion: AugmentedSubmittable<(location: StagingXcmV4Location | { parents?: any; interior?: any } | string | Uint8Array, version: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [StagingXcmV4Location, u32]>;
      /**
       * Transfer some assets from the local chain to the destination chain through their local,
       * destination or remote reserve.
       * 
       * `assets` must have same reserve location and may not be teleportable to `dest`.
       * - `assets` have local reserve: transfer assets to sovereign account of destination
       * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
       * assets to `beneficiary`.
       * - `assets` have destination reserve: burn local assets and forward a notification to
       * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
       * deposit them to `beneficiary`.
       * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
       * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
       * to mint and deposit reserve-based assets to `beneficiary`.
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
       * is needed than `weight_limit`, then the operation will fail and the assets send may be
       * at risk.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `[Parent,
       * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
       * relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` (and possibly reserve) chains.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
       **/
      limitedReserveTransferAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, assets: XcmVersionedAssets | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array, weightLimit: XcmV3WeightLimit | { Unlimited: any } | { Limited: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32, XcmV3WeightLimit]>;
      /**
       * Teleport some assets from the local chain to some destination chain.
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
       * is needed than `weight_limit`, then the operation will fail and the assets send may be
       * at risk.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `[Parent,
       * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
       * relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` chain.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
       **/
      limitedTeleportAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, assets: XcmVersionedAssets | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array, weightLimit: XcmV3WeightLimit | { Unlimited: any } | { Limited: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32, XcmV3WeightLimit]>;
      /**
       * Transfer some assets from the local chain to the destination chain through their local,
       * destination or remote reserve.
       * 
       * `assets` must have same reserve location and may not be teleportable to `dest`.
       * - `assets` have local reserve: transfer assets to sovereign account of destination
       * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
       * assets to `beneficiary`.
       * - `assets` have destination reserve: burn local assets and forward a notification to
       * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
       * deposit them to `beneficiary`.
       * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
       * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
       * to mint and deposit reserve-based assets to `beneficiary`.
       * 
       * **This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
       * with all fees taken as needed from the asset.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `[Parent,
       * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
       * relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` (and possibly reserve) chains.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       **/
      reserveTransferAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, assets: XcmVersionedAssets | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32]>;
      send: AugmentedSubmittable<(dest: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, message: XcmVersionedXcm | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedXcm]>;
      /**
       * Teleport some assets from the local chain to some destination chain.
       * 
       * **This function is deprecated: Use `limited_teleport_assets` instead.**
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
       * with all fees taken as needed from the asset.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `[Parent,
       * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
       * relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` chain.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       **/
      teleportAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, assets: XcmVersionedAssets | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32]>;
      /**
       * Transfer some assets from the local chain to the destination chain through their local,
       * destination or remote reserve, or through teleports.
       * 
       * Fee payment on the destination side is made from the asset in the `assets` vector of
       * index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
       * `weight_limit` of weight. If more weight is needed than `weight_limit`, then the
       * operation will fail and the assets sent may be at risk.
       * 
       * `assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
       * to `dest`, no limitations imposed on `fees`.
       * - for local reserve: transfer assets to sovereign account of destination chain and
       * forward a notification XCM to `dest` to mint and deposit reserve-based assets to
       * `beneficiary`.
       * - for destination reserve: burn local assets and forward a notification to `dest` chain
       * to withdraw the reserve assets from this chain's sovereign account and deposit them
       * to `beneficiary`.
       * - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
       * from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
       * and deposit reserve-based assets to `beneficiary`.
       * - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
       * assets and deposit them to `beneficiary`.
       * 
       * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
       * - `dest`: Destination context for the assets. Will typically be `X2(Parent,
       * Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
       * from relay to parachain.
       * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
       * generally be an `AccountId32` value.
       * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
       * fee on the `dest` (and possibly reserve) chains.
       * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
       * fees.
       * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
       **/
      transferAssets: AugmentedSubmittable<(dest: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, beneficiary: XcmVersionedLocation | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, assets: XcmVersionedAssets | { V2: any } | { V3: any } | { V4: any } | string | Uint8Array, feeAssetItem: u32 | AnyNumber | Uint8Array, weightLimit: XcmV3WeightLimit | { Unlimited: any } | { Limited: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [XcmVersionedLocation, XcmVersionedLocation, XcmVersionedAssets, u32, XcmV3WeightLimit]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    privateBalancesAuraExt: {
      setAuthorities: AugmentedSubmittable<(authorities: Vec<SpConsensusAuraSr25519AppSr25519Public> | (SpConsensusAuraSr25519AppSr25519Public | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<SpConsensusAuraSr25519AppSr25519Public>]>;
      setTrustedAuthorities: AugmentedSubmittable<(authorities: Vec<SpConsensusAuraSr25519AppSr25519Public> | (SpConsensusAuraSr25519AppSr25519Public | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<SpConsensusAuraSr25519AppSr25519Public>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * Permanently removes the sudo key.
       * 
       * **This cannot be un-done.**
       **/
      removeKey: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
       * key.
       **/
      setKey: AugmentedSubmittable<(updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       **/
      sudo: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * 
       * The dispatch origin for this call must be _Signed_.
       **/
      sudoAs: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       * 
       * The dispatch origin for this call must be _Signed_.
       **/
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, SpWeightsWeightV2Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
       * 
       * If the authorization required a version check, this call will ensure the spec name
       * remains unchanged and that the spec version has increased.
       * 
       * Depending on the runtime's `OnSetCode` configuration, this function may directly apply
       * the new `code` in the same block or attempt to schedule the upgrade.
       * 
       * All origins are allowed.
       **/
      applyAuthorizedUpgrade: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
       * later.
       * 
       * This call requires Root origin.
       **/
      authorizeUpgrade: AugmentedSubmittable<(codeHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
       * later.
       * 
       * WARNING: This authorizes an upgrade that will take place without any safety checks, for
       * example that the spec name remains the same and that the version number increases. Not
       * recommended for normal use. Use `authorize_upgrade` instead.
       * 
       * This call requires Root origin.
       **/
      authorizeUpgradeWithoutChecks: AugmentedSubmittable<(codeHash: H256 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [H256]>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       * 
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       **/
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      /**
       * Kill some items from storage.
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * Make some on-chain remark.
       * 
       * Can be executed by every `origin`.
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Make some on-chain remark and emit event.
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code.
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       * 
       * Note that runtime upgrades will not run if this is called with a not-increasing spec
       * version!
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Set some items of storage.
       **/
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * Set the current time.
       * 
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * 
       * The timestamp should be greater than the previous one by the amount specified by
       * [`Config::MinimumPeriod`].
       * 
       * The dispatch origin for this call must be _None_.
       * 
       * This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
       * that changing the complexity of this call could result exhausting the resources in a
       * block to execute any other calls.
       * 
       * ## Complexity
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
       * `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       **/
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    treasury: {
      /**
       * Approve a proposal.
       * 
       * ## Dispatch Origin
       * 
       * Must be [`Config::ApproveOrigin`].
       * 
       * ## Details
       * 
       * At a later time, the proposal will be allocated to the beneficiary and the original
       * deposit will be returned.
       * 
       * ### Complexity
       * - O(1).
       * 
       * ## Events
       * 
       * No events are emitted from this dispatch.
       **/
      approveProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Check the status of the spend and remove it from the storage if processed.
       * 
       * ## Dispatch Origin
       * 
       * Must be signed.
       * 
       * ## Details
       * 
       * The status check is a prerequisite for retrying a failed payout.
       * If a spend has either succeeded or expired, it is removed from the storage by this
       * function. In such instances, transaction fees are refunded.
       * 
       * ### Parameters
       * - `index`: The spend index.
       * 
       * ## Events
       * 
       * Emits [`Event::PaymentFailed`] if the spend payout has failed.
       * Emits [`Event::SpendProcessed`] if the spend payout has succeed.
       **/
      checkStatus: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Claim a spend.
       * 
       * ## Dispatch Origin
       * 
       * Must be signed.
       * 
       * ## Details
       * 
       * Spends must be claimed within some temporal bounds. A spend may be claimed within one
       * [`Config::PayoutPeriod`] from the `valid_from` block.
       * In case of a payout failure, the spend status must be updated with the `check_status`
       * dispatchable before retrying with the current function.
       * 
       * ### Parameters
       * - `index`: The spend index.
       * 
       * ## Events
       * 
       * Emits [`Event::Paid`] if successful.
       **/
      payout: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Put forward a suggestion for spending.
       * 
       * ## Dispatch Origin
       * 
       * Must be signed.
       * 
       * ## Details
       * A deposit proportional to the value is reserved and slashed if the proposal is rejected.
       * It is returned once the proposal is awarded.
       * 
       * ### Complexity
       * - O(1)
       * 
       * ## Events
       * 
       * Emits [`Event::Proposed`] if successful.
       **/
      proposeSpend: AugmentedSubmittable<(value: Compact<u128> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, MultiAddress]>;
      /**
       * Reject a proposed spend.
       * 
       * ## Dispatch Origin
       * 
       * Must be [`Config::RejectOrigin`].
       * 
       * ## Details
       * The original deposit will be slashed.
       * 
       * ### Complexity
       * - O(1)
       * 
       * ## Events
       * 
       * Emits [`Event::Rejected`] if successful.
       **/
      rejectProposal: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Force a previously approved proposal to be removed from the approval queue.
       * 
       * ## Dispatch Origin
       * 
       * Must be [`Config::RejectOrigin`].
       * 
       * ## Details
       * 
       * The original deposit will no longer be returned.
       * 
       * ### Parameters
       * - `proposal_id`: The index of a proposal
       * 
       * ### Complexity
       * - O(A) where `A` is the number of approvals
       * 
       * ### Errors
       * - [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
       * approval queue, i.e., the proposal has not been approved. This could also mean the
       * proposal does not exist altogether, thus there is no way it would have been approved
       * in the first place.
       **/
      removeApproval: AugmentedSubmittable<(proposalId: Compact<u32> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u32>]>;
      /**
       * Propose and approve a spend of treasury funds.
       * 
       * ## Dispatch Origin
       * 
       * Must be [`Config::SpendOrigin`] with the `Success` value being at least
       * `amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
       * for assertion using the [`Config::BalanceConverter`].
       * 
       * ## Details
       * 
       * Create an approved spend for transferring a specific `amount` of `asset_kind` to a
       * designated beneficiary. The spend must be claimed using the `payout` dispatchable within
       * the [`Config::PayoutPeriod`].
       * 
       * ### Parameters
       * - `asset_kind`: An indicator of the specific asset class to be spent.
       * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
       * - `beneficiary`: The beneficiary of the spend.
       * - `valid_from`: The block number from which the spend can be claimed. It can refer to
       * the past if the resulting spend has not yet expired according to the
       * [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
       * approval.
       * 
       * ## Events
       * 
       * Emits [`Event::AssetSpendApproved`] if successful.
       **/
      spend: AugmentedSubmittable<(assetKind: Null | null, amount: Compact<u128> | AnyNumber | Uint8Array, beneficiary: AccountId32 | string | Uint8Array, validFrom: Option<u32> | null | Uint8Array | u32 | AnyNumber) => SubmittableExtrinsic<ApiType>, [Null, Compact<u128>, AccountId32, Option<u32>]>;
      /**
       * Propose and approve a spend of treasury funds.
       * 
       * ## Dispatch Origin
       * 
       * Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
       * 
       * ### Details
       * NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
       * beneficiary.
       * 
       * ### Parameters
       * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
       * - `beneficiary`: The destination account for the transfer.
       * 
       * ## Events
       * 
       * Emits [`Event::SpendApproved`] if successful.
       **/
      spendLocal: AugmentedSubmittable<(amount: Compact<u128> | AnyNumber | Uint8Array, beneficiary: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u128>, MultiAddress]>;
      /**
       * Void previously approved spend.
       * 
       * ## Dispatch Origin
       * 
       * Must be [`Config::RejectOrigin`].
       * 
       * ## Details
       * 
       * A spend void is only possible if the payout has not been attempted yet.
       * 
       * ### Parameters
       * - `index`: The spend index.
       * 
       * ## Events
       * 
       * Emits [`Event::AssetSpendVoided`] if successful.
       **/
      voidSpend: AugmentedSubmittable<(index: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u32]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    utility: {
      /**
       * Send a call through an indexed pseudonym of the sender.
       * 
       * Filter from origin are passed along. The call will be dispatched with an origin which
       * use the same filter as the origin of this call.
       * 
       * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
       * because you expect `proxy` to have been used prior in the call stack and you do not want
       * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
       * in the Multisig pallet instead.
       * 
       * NOTE: Prior to version *12, this was called `as_limited_sub`.
       * 
       * The dispatch origin for this call must be _Signed_.
       **/
      asDerivative: AugmentedSubmittable<(index: u16 | AnyNumber | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Call]>;
      /**
       * Send a batch of dispatch calls.
       * 
       * May be called from any origin except `None`.
       * 
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       * 
       * If origin is root then the calls are dispatched without checking origin filter. (This
       * includes bypassing `frame_system::Config::BaseCallFilter`).
       * 
       * ## Complexity
       * - O(C) where C is the number of calls to be batched.
       * 
       * This will return `Ok` in all circumstances. To determine the success of the batch, an
       * event is deposited. If a call failed and the batch was interrupted, then the
       * `BatchInterrupted` event is deposited, along with the number of successful calls made
       * and the error of the failed call. If all were successful, then the `BatchCompleted`
       * event is deposited.
       **/
      batch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Send a batch of dispatch calls and atomically execute them.
       * The whole transaction will rollback and fail if any of the calls failed.
       * 
       * May be called from any origin except `None`.
       * 
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       * 
       * If origin is root then the calls are dispatched without checking origin filter. (This
       * includes bypassing `frame_system::Config::BaseCallFilter`).
       * 
       * ## Complexity
       * - O(C) where C is the number of calls to be batched.
       **/
      batchAll: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Dispatches a function call with a provided origin.
       * 
       * The dispatch origin for this call must be _Root_.
       * 
       * ## Complexity
       * - O(1).
       **/
      dispatchAs: AugmentedSubmittable<(asOrigin: RedefiRuntimeOriginCaller | { system: any } | { Void: any } | { PolkadotXcm: any } | { CumulusXcm: any } | { Ethereum: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [RedefiRuntimeOriginCaller, Call]>;
      /**
       * Send a batch of dispatch calls.
       * Unlike `batch`, it allows errors and won't interrupt.
       * 
       * May be called from any origin except `None`.
       * 
       * - `calls`: The calls to be dispatched from the same origin. The number of call must not
       * exceed the constant: `batched_calls_limit` (available in constant metadata).
       * 
       * If origin is root then the calls are dispatch without checking origin filter. (This
       * includes bypassing `frame_system::Config::BaseCallFilter`).
       * 
       * ## Complexity
       * - O(C) where C is the number of calls to be batched.
       **/
      forceBatch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * Dispatch a function call with a specified weight.
       * 
       * This function does not check the weight of the call, and instead allows the
       * Root origin to specify the weight of the call.
       * 
       * The dispatch origin for this call must be _Root_.
       **/
      withWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, SpWeightsWeightV2Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
