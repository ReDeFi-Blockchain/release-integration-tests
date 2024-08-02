// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { BTreeMap, BTreeSet, Bytes, Compact, Enum, Null, Option, Result, Struct, Text, U256, U8aFixed, Vec, bool, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H160, H256, MultiAddress } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

/** @name CumulusPalletParachainSystemCall */
export interface CumulusPalletParachainSystemCall extends Enum {
  readonly isSetValidationData: boolean;
  readonly asSetValidationData: {
    readonly data: CumulusPrimitivesParachainInherentParachainInherentData;
  } & Struct;
  readonly isSudoSendUpwardMessage: boolean;
  readonly asSudoSendUpwardMessage: {
    readonly message: Bytes;
  } & Struct;
  readonly isAuthorizeUpgrade: boolean;
  readonly asAuthorizeUpgrade: {
    readonly codeHash: H256;
    readonly checkVersion: bool;
  } & Struct;
  readonly isEnactAuthorizedUpgrade: boolean;
  readonly asEnactAuthorizedUpgrade: {
    readonly code: Bytes;
  } & Struct;
  readonly type: 'SetValidationData' | 'SudoSendUpwardMessage' | 'AuthorizeUpgrade' | 'EnactAuthorizedUpgrade';
}

/** @name CumulusPalletParachainSystemError */
export interface CumulusPalletParachainSystemError extends Enum {
  readonly isOverlappingUpgrades: boolean;
  readonly isProhibitedByPolkadot: boolean;
  readonly isTooBig: boolean;
  readonly isValidationDataNotAvailable: boolean;
  readonly isHostConfigurationNotAvailable: boolean;
  readonly isNotScheduled: boolean;
  readonly isNothingAuthorized: boolean;
  readonly isUnauthorized: boolean;
  readonly type: 'OverlappingUpgrades' | 'ProhibitedByPolkadot' | 'TooBig' | 'ValidationDataNotAvailable' | 'HostConfigurationNotAvailable' | 'NotScheduled' | 'NothingAuthorized' | 'Unauthorized';
}

/** @name CumulusPalletParachainSystemEvent */
export interface CumulusPalletParachainSystemEvent extends Enum {
  readonly isValidationFunctionStored: boolean;
  readonly isValidationFunctionApplied: boolean;
  readonly asValidationFunctionApplied: {
    readonly relayChainBlockNum: u32;
  } & Struct;
  readonly isValidationFunctionDiscarded: boolean;
  readonly isDownwardMessagesReceived: boolean;
  readonly asDownwardMessagesReceived: {
    readonly count: u32;
  } & Struct;
  readonly isDownwardMessagesProcessed: boolean;
  readonly asDownwardMessagesProcessed: {
    readonly weightUsed: SpWeightsWeightV2Weight;
    readonly dmqHead: H256;
  } & Struct;
  readonly isUpwardMessageSent: boolean;
  readonly asUpwardMessageSent: {
    readonly messageHash: Option<U8aFixed>;
  } & Struct;
  readonly type: 'ValidationFunctionStored' | 'ValidationFunctionApplied' | 'ValidationFunctionDiscarded' | 'DownwardMessagesReceived' | 'DownwardMessagesProcessed' | 'UpwardMessageSent';
}

/** @name CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot */
export interface CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot extends Struct {
  readonly dmqMqcHead: H256;
  readonly relayDispatchQueueRemainingCapacity: CumulusPalletParachainSystemRelayStateSnapshotRelayDispatchQueueRemainingCapacity;
  readonly ingressChannels: Vec<ITuple<[u32, PolkadotPrimitivesV6AbridgedHrmpChannel]>>;
  readonly egressChannels: Vec<ITuple<[u32, PolkadotPrimitivesV6AbridgedHrmpChannel]>>;
}

/** @name CumulusPalletParachainSystemRelayStateSnapshotRelayDispatchQueueRemainingCapacity */
export interface CumulusPalletParachainSystemRelayStateSnapshotRelayDispatchQueueRemainingCapacity extends Struct {
  readonly remainingCount: u32;
  readonly remainingSize: u32;
}

/** @name CumulusPalletParachainSystemUnincludedSegmentAncestor */
export interface CumulusPalletParachainSystemUnincludedSegmentAncestor extends Struct {
  readonly usedBandwidth: CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth;
  readonly paraHeadHash: Option<H256>;
  readonly consumedGoAheadSignal: Option<PolkadotPrimitivesV6UpgradeGoAhead>;
}

/** @name CumulusPalletParachainSystemUnincludedSegmentHrmpChannelUpdate */
export interface CumulusPalletParachainSystemUnincludedSegmentHrmpChannelUpdate extends Struct {
  readonly msgCount: u32;
  readonly totalBytes: u32;
}

/** @name CumulusPalletParachainSystemUnincludedSegmentSegmentTracker */
export interface CumulusPalletParachainSystemUnincludedSegmentSegmentTracker extends Struct {
  readonly usedBandwidth: CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth;
  readonly hrmpWatermark: Option<u32>;
  readonly consumedGoAheadSignal: Option<PolkadotPrimitivesV6UpgradeGoAhead>;
}

/** @name CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth */
export interface CumulusPalletParachainSystemUnincludedSegmentUsedBandwidth extends Struct {
  readonly umpMsgCount: u32;
  readonly umpTotalBytes: u32;
  readonly hrmpOutgoing: BTreeMap<u32, CumulusPalletParachainSystemUnincludedSegmentHrmpChannelUpdate>;
}

/** @name CumulusPalletXcmCall */
export interface CumulusPalletXcmCall extends Null {}

/** @name CumulusPalletXcmEvent */
export interface CumulusPalletXcmEvent extends Enum {
  readonly isInvalidFormat: boolean;
  readonly asInvalidFormat: U8aFixed;
  readonly isUnsupportedVersion: boolean;
  readonly asUnsupportedVersion: U8aFixed;
  readonly isExecutedDownward: boolean;
  readonly asExecutedDownward: ITuple<[U8aFixed, StagingXcmV4TraitsOutcome]>;
  readonly type: 'InvalidFormat' | 'UnsupportedVersion' | 'ExecutedDownward';
}

/** @name CumulusPalletXcmOrigin */
export interface CumulusPalletXcmOrigin extends Enum {
  readonly isRelay: boolean;
  readonly isSiblingParachain: boolean;
  readonly asSiblingParachain: u32;
  readonly type: 'Relay' | 'SiblingParachain';
}

/** @name CumulusPrimitivesCoreAggregateMessageOrigin */
export interface CumulusPrimitivesCoreAggregateMessageOrigin extends Enum {
  readonly isHere: boolean;
  readonly isParent: boolean;
  readonly isSibling: boolean;
  readonly asSibling: u32;
  readonly type: 'Here' | 'Parent' | 'Sibling';
}

/** @name CumulusPrimitivesParachainInherentParachainInherentData */
export interface CumulusPrimitivesParachainInherentParachainInherentData extends Struct {
  readonly validationData: PolkadotPrimitivesV6PersistedValidationData;
  readonly relayChainState: SpTrieStorageProof;
  readonly downwardMessages: Vec<PolkadotCorePrimitivesInboundDownwardMessage>;
  readonly horizontalMessages: BTreeMap<u32, Vec<PolkadotCorePrimitivesInboundHrmpMessage>>;
}

/** @name EthbloomBloom */
export interface EthbloomBloom extends U8aFixed {}

/** @name EthereumBlock */
export interface EthereumBlock extends Struct {
  readonly header: EthereumHeader;
  readonly transactions: Vec<EthereumTransactionTransactionV2>;
  readonly ommers: Vec<EthereumHeader>;
}

/** @name EthereumHeader */
export interface EthereumHeader extends Struct {
  readonly parentHash: H256;
  readonly ommersHash: H256;
  readonly beneficiary: H160;
  readonly stateRoot: H256;
  readonly transactionsRoot: H256;
  readonly receiptsRoot: H256;
  readonly logsBloom: EthbloomBloom;
  readonly difficulty: U256;
  readonly number: U256;
  readonly gasLimit: U256;
  readonly gasUsed: U256;
  readonly timestamp: u64;
  readonly extraData: Bytes;
  readonly mixHash: H256;
  readonly nonce: EthereumTypesHashH64;
}

/** @name EthereumLog */
export interface EthereumLog extends Struct {
  readonly address: H160;
  readonly topics: Vec<H256>;
  readonly data: Bytes;
}

/** @name EthereumReceiptEip658ReceiptData */
export interface EthereumReceiptEip658ReceiptData extends Struct {
  readonly statusCode: u8;
  readonly usedGas: U256;
  readonly logsBloom: EthbloomBloom;
  readonly logs: Vec<EthereumLog>;
}

/** @name EthereumReceiptReceiptV3 */
export interface EthereumReceiptReceiptV3 extends Enum {
  readonly isLegacy: boolean;
  readonly asLegacy: EthereumReceiptEip658ReceiptData;
  readonly isEip2930: boolean;
  readonly asEip2930: EthereumReceiptEip658ReceiptData;
  readonly isEip1559: boolean;
  readonly asEip1559: EthereumReceiptEip658ReceiptData;
  readonly type: 'Legacy' | 'Eip2930' | 'Eip1559';
}

/** @name EthereumTransactionAccessListItem */
export interface EthereumTransactionAccessListItem extends Struct {
  readonly address: H160;
  readonly storageKeys: Vec<H256>;
}

/** @name EthereumTransactionEip1559Transaction */
export interface EthereumTransactionEip1559Transaction extends Struct {
  readonly chainId: u64;
  readonly nonce: U256;
  readonly maxPriorityFeePerGas: U256;
  readonly maxFeePerGas: U256;
  readonly gasLimit: U256;
  readonly action: EthereumTransactionTransactionAction;
  readonly value: U256;
  readonly input: Bytes;
  readonly accessList: Vec<EthereumTransactionAccessListItem>;
  readonly oddYParity: bool;
  readonly r: H256;
  readonly s: H256;
}

/** @name EthereumTransactionEip2930Transaction */
export interface EthereumTransactionEip2930Transaction extends Struct {
  readonly chainId: u64;
  readonly nonce: U256;
  readonly gasPrice: U256;
  readonly gasLimit: U256;
  readonly action: EthereumTransactionTransactionAction;
  readonly value: U256;
  readonly input: Bytes;
  readonly accessList: Vec<EthereumTransactionAccessListItem>;
  readonly oddYParity: bool;
  readonly r: H256;
  readonly s: H256;
}

/** @name EthereumTransactionLegacyTransaction */
export interface EthereumTransactionLegacyTransaction extends Struct {
  readonly nonce: U256;
  readonly gasPrice: U256;
  readonly gasLimit: U256;
  readonly action: EthereumTransactionTransactionAction;
  readonly value: U256;
  readonly input: Bytes;
  readonly signature: EthereumTransactionTransactionSignature;
}

/** @name EthereumTransactionTransactionAction */
export interface EthereumTransactionTransactionAction extends Enum {
  readonly isCall: boolean;
  readonly asCall: H160;
  readonly isCreate: boolean;
  readonly type: 'Call' | 'Create';
}

/** @name EthereumTransactionTransactionSignature */
export interface EthereumTransactionTransactionSignature extends Struct {
  readonly v: u64;
  readonly r: H256;
  readonly s: H256;
}

/** @name EthereumTransactionTransactionV2 */
export interface EthereumTransactionTransactionV2 extends Enum {
  readonly isLegacy: boolean;
  readonly asLegacy: EthereumTransactionLegacyTransaction;
  readonly isEip2930: boolean;
  readonly asEip2930: EthereumTransactionEip2930Transaction;
  readonly isEip1559: boolean;
  readonly asEip1559: EthereumTransactionEip1559Transaction;
  readonly type: 'Legacy' | 'Eip2930' | 'Eip1559';
}

/** @name EthereumTypesHashH64 */
export interface EthereumTypesHashH64 extends U8aFixed {}

/** @name EvmCoreErrorExitError */
export interface EvmCoreErrorExitError extends Enum {
  readonly isStackUnderflow: boolean;
  readonly isStackOverflow: boolean;
  readonly isInvalidJump: boolean;
  readonly isInvalidRange: boolean;
  readonly isDesignatedInvalid: boolean;
  readonly isCallTooDeep: boolean;
  readonly isCreateCollision: boolean;
  readonly isCreateContractLimit: boolean;
  readonly isOutOfOffset: boolean;
  readonly isOutOfGas: boolean;
  readonly isOutOfFund: boolean;
  readonly isPcUnderflow: boolean;
  readonly isCreateEmpty: boolean;
  readonly isOther: boolean;
  readonly asOther: Text;
  readonly isMaxNonce: boolean;
  readonly isInvalidCode: boolean;
  readonly asInvalidCode: u8;
  readonly type: 'StackUnderflow' | 'StackOverflow' | 'InvalidJump' | 'InvalidRange' | 'DesignatedInvalid' | 'CallTooDeep' | 'CreateCollision' | 'CreateContractLimit' | 'OutOfOffset' | 'OutOfGas' | 'OutOfFund' | 'PcUnderflow' | 'CreateEmpty' | 'Other' | 'MaxNonce' | 'InvalidCode';
}

/** @name EvmCoreErrorExitFatal */
export interface EvmCoreErrorExitFatal extends Enum {
  readonly isNotSupported: boolean;
  readonly isUnhandledInterrupt: boolean;
  readonly isCallErrorAsFatal: boolean;
  readonly asCallErrorAsFatal: EvmCoreErrorExitError;
  readonly isOther: boolean;
  readonly asOther: Text;
  readonly type: 'NotSupported' | 'UnhandledInterrupt' | 'CallErrorAsFatal' | 'Other';
}

/** @name EvmCoreErrorExitReason */
export interface EvmCoreErrorExitReason extends Enum {
  readonly isSucceed: boolean;
  readonly asSucceed: EvmCoreErrorExitSucceed;
  readonly isError: boolean;
  readonly asError: EvmCoreErrorExitError;
  readonly isRevert: boolean;
  readonly asRevert: EvmCoreErrorExitRevert;
  readonly isFatal: boolean;
  readonly asFatal: EvmCoreErrorExitFatal;
  readonly type: 'Succeed' | 'Error' | 'Revert' | 'Fatal';
}

/** @name EvmCoreErrorExitRevert */
export interface EvmCoreErrorExitRevert extends Enum {
  readonly isReverted: boolean;
  readonly type: 'Reverted';
}

/** @name EvmCoreErrorExitSucceed */
export interface EvmCoreErrorExitSucceed extends Enum {
  readonly isStopped: boolean;
  readonly isReturned: boolean;
  readonly isSuicided: boolean;
  readonly type: 'Stopped' | 'Returned' | 'Suicided';
}

/** @name FpRpcTransactionStatus */
export interface FpRpcTransactionStatus extends Struct {
  readonly transactionHash: H256;
  readonly transactionIndex: u32;
  readonly from: H160;
  readonly to: Option<H160>;
  readonly contractAddress: Option<H160>;
  readonly logs: Vec<EthereumLog>;
  readonly logsBloom: EthbloomBloom;
}

/** @name FrameSupportDispatchDispatchClass */
export interface FrameSupportDispatchDispatchClass extends Enum {
  readonly isNormal: boolean;
  readonly isOperational: boolean;
  readonly isMandatory: boolean;
  readonly type: 'Normal' | 'Operational' | 'Mandatory';
}

/** @name FrameSupportDispatchDispatchInfo */
export interface FrameSupportDispatchDispatchInfo extends Struct {
  readonly weight: SpWeightsWeightV2Weight;
  readonly class: FrameSupportDispatchDispatchClass;
  readonly paysFee: FrameSupportDispatchPays;
}

/** @name FrameSupportDispatchPays */
export interface FrameSupportDispatchPays extends Enum {
  readonly isYes: boolean;
  readonly isNo: boolean;
  readonly type: 'Yes' | 'No';
}

/** @name FrameSupportDispatchPerDispatchClassU32 */
export interface FrameSupportDispatchPerDispatchClassU32 extends Struct {
  readonly normal: u32;
  readonly operational: u32;
  readonly mandatory: u32;
}

/** @name FrameSupportDispatchPerDispatchClassWeight */
export interface FrameSupportDispatchPerDispatchClassWeight extends Struct {
  readonly normal: SpWeightsWeightV2Weight;
  readonly operational: SpWeightsWeightV2Weight;
  readonly mandatory: SpWeightsWeightV2Weight;
}

/** @name FrameSupportDispatchPerDispatchClassWeightsPerClass */
export interface FrameSupportDispatchPerDispatchClassWeightsPerClass extends Struct {
  readonly normal: FrameSystemLimitsWeightsPerClass;
  readonly operational: FrameSystemLimitsWeightsPerClass;
  readonly mandatory: FrameSystemLimitsWeightsPerClass;
}

/** @name FrameSupportDispatchRawOrigin */
export interface FrameSupportDispatchRawOrigin extends Enum {
  readonly isRoot: boolean;
  readonly isSigned: boolean;
  readonly asSigned: AccountId32;
  readonly isNone: boolean;
  readonly type: 'Root' | 'Signed' | 'None';
}

/** @name FrameSupportMessagesProcessMessageError */
export interface FrameSupportMessagesProcessMessageError extends Enum {
  readonly isBadFormat: boolean;
  readonly isCorrupt: boolean;
  readonly isUnsupported: boolean;
  readonly isOverweight: boolean;
  readonly asOverweight: SpWeightsWeightV2Weight;
  readonly isYield: boolean;
  readonly type: 'BadFormat' | 'Corrupt' | 'Unsupported' | 'Overweight' | 'Yield';
}

/** @name FrameSupportPalletId */
export interface FrameSupportPalletId extends U8aFixed {}

/** @name FrameSupportTokensMiscBalanceStatus */
export interface FrameSupportTokensMiscBalanceStatus extends Enum {
  readonly isFree: boolean;
  readonly isReserved: boolean;
  readonly type: 'Free' | 'Reserved';
}

/** @name FrameSystemAccountInfo */
export interface FrameSystemAccountInfo extends Struct {
  readonly nonce: u32;
  readonly consumers: u32;
  readonly providers: u32;
  readonly sufficients: u32;
  readonly data: PalletBalancesAccountData;
}

/** @name FrameSystemCall */
export interface FrameSystemCall extends Enum {
  readonly isRemark: boolean;
  readonly asRemark: {
    readonly remark: Bytes;
  } & Struct;
  readonly isSetHeapPages: boolean;
  readonly asSetHeapPages: {
    readonly pages: u64;
  } & Struct;
  readonly isSetCode: boolean;
  readonly asSetCode: {
    readonly code: Bytes;
  } & Struct;
  readonly isSetCodeWithoutChecks: boolean;
  readonly asSetCodeWithoutChecks: {
    readonly code: Bytes;
  } & Struct;
  readonly isSetStorage: boolean;
  readonly asSetStorage: {
    readonly items: Vec<ITuple<[Bytes, Bytes]>>;
  } & Struct;
  readonly isKillStorage: boolean;
  readonly asKillStorage: {
    readonly keys_: Vec<Bytes>;
  } & Struct;
  readonly isKillPrefix: boolean;
  readonly asKillPrefix: {
    readonly prefix: Bytes;
    readonly subkeys: u32;
  } & Struct;
  readonly isRemarkWithEvent: boolean;
  readonly asRemarkWithEvent: {
    readonly remark: Bytes;
  } & Struct;
  readonly isAuthorizeUpgrade: boolean;
  readonly asAuthorizeUpgrade: {
    readonly codeHash: H256;
  } & Struct;
  readonly isAuthorizeUpgradeWithoutChecks: boolean;
  readonly asAuthorizeUpgradeWithoutChecks: {
    readonly codeHash: H256;
  } & Struct;
  readonly isApplyAuthorizedUpgrade: boolean;
  readonly asApplyAuthorizedUpgrade: {
    readonly code: Bytes;
  } & Struct;
  readonly type: 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent' | 'AuthorizeUpgrade' | 'AuthorizeUpgradeWithoutChecks' | 'ApplyAuthorizedUpgrade';
}

/** @name FrameSystemCodeUpgradeAuthorization */
export interface FrameSystemCodeUpgradeAuthorization extends Struct {
  readonly codeHash: H256;
  readonly checkVersion: bool;
}

/** @name FrameSystemError */
export interface FrameSystemError extends Enum {
  readonly isInvalidSpecName: boolean;
  readonly isSpecVersionNeedsToIncrease: boolean;
  readonly isFailedToExtractRuntimeVersion: boolean;
  readonly isNonDefaultComposite: boolean;
  readonly isNonZeroRefCount: boolean;
  readonly isCallFiltered: boolean;
  readonly isMultiBlockMigrationsOngoing: boolean;
  readonly isNothingAuthorized: boolean;
  readonly isUnauthorized: boolean;
  readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered' | 'MultiBlockMigrationsOngoing' | 'NothingAuthorized' | 'Unauthorized';
}

/** @name FrameSystemEvent */
export interface FrameSystemEvent extends Enum {
  readonly isExtrinsicSuccess: boolean;
  readonly asExtrinsicSuccess: {
    readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
  } & Struct;
  readonly isExtrinsicFailed: boolean;
  readonly asExtrinsicFailed: {
    readonly dispatchError: SpRuntimeDispatchError;
    readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
  } & Struct;
  readonly isCodeUpdated: boolean;
  readonly isNewAccount: boolean;
  readonly asNewAccount: {
    readonly account: AccountId32;
  } & Struct;
  readonly isKilledAccount: boolean;
  readonly asKilledAccount: {
    readonly account: AccountId32;
  } & Struct;
  readonly isRemarked: boolean;
  readonly asRemarked: {
    readonly sender: AccountId32;
    readonly hash_: H256;
  } & Struct;
  readonly isUpgradeAuthorized: boolean;
  readonly asUpgradeAuthorized: {
    readonly codeHash: H256;
    readonly checkVersion: bool;
  } & Struct;
  readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked' | 'UpgradeAuthorized';
}

/** @name FrameSystemEventRecord */
export interface FrameSystemEventRecord extends Struct {
  readonly phase: FrameSystemPhase;
  readonly event: Event;
  readonly topics: Vec<H256>;
}

/** @name FrameSystemExtensionsCheckGenesis */
export interface FrameSystemExtensionsCheckGenesis extends Null {}

/** @name FrameSystemExtensionsCheckNonce */
export interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

/** @name FrameSystemExtensionsCheckSpecVersion */
export interface FrameSystemExtensionsCheckSpecVersion extends Null {}

/** @name FrameSystemExtensionsCheckTxVersion */
export interface FrameSystemExtensionsCheckTxVersion extends Null {}

/** @name FrameSystemExtensionsCheckWeight */
export interface FrameSystemExtensionsCheckWeight extends Null {}

/** @name FrameSystemLastRuntimeUpgradeInfo */
export interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
  readonly specVersion: Compact<u32>;
  readonly specName: Text;
}

/** @name FrameSystemLimitsBlockLength */
export interface FrameSystemLimitsBlockLength extends Struct {
  readonly max: FrameSupportDispatchPerDispatchClassU32;
}

/** @name FrameSystemLimitsBlockWeights */
export interface FrameSystemLimitsBlockWeights extends Struct {
  readonly baseBlock: SpWeightsWeightV2Weight;
  readonly maxBlock: SpWeightsWeightV2Weight;
  readonly perClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
}

/** @name FrameSystemLimitsWeightsPerClass */
export interface FrameSystemLimitsWeightsPerClass extends Struct {
  readonly baseExtrinsic: SpWeightsWeightV2Weight;
  readonly maxExtrinsic: Option<SpWeightsWeightV2Weight>;
  readonly maxTotal: Option<SpWeightsWeightV2Weight>;
  readonly reserved: Option<SpWeightsWeightV2Weight>;
}

/** @name FrameSystemPhase */
export interface FrameSystemPhase extends Enum {
  readonly isApplyExtrinsic: boolean;
  readonly asApplyExtrinsic: u32;
  readonly isFinalization: boolean;
  readonly isInitialization: boolean;
  readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
}

/** @name PalletBalancesAccountData */
export interface PalletBalancesAccountData extends Struct {
  readonly free: u128;
  readonly reserved: u128;
  readonly frozen: u128;
  readonly flags: u128;
}

/** @name PalletBalancesAdapterAccountPermissions */
export interface PalletBalancesAdapterAccountPermissions extends Struct {
  readonly bits: u64;
}

/** @name PalletBalancesAdapterError */
export interface PalletBalancesAdapterError extends Enum {
  readonly isErc20InsufficientAllowance: boolean;
  readonly isErc20InvalidReceiver: boolean;
  readonly isErc20InvalidApprover: boolean;
  readonly isErc20InvalidSender: boolean;
  readonly isErc20InvalidSpender: boolean;
  readonly isErc20InsufficientBalance: boolean;
  readonly isOwnerNotFound: boolean;
  readonly isInvalidOwnerKey: boolean;
  readonly isOwnableUnauthorizedAccount: boolean;
  readonly isUnauthorizedAccount: boolean;
  readonly isAssetNotFound: boolean;
  readonly type: 'Erc20InsufficientAllowance' | 'Erc20InvalidReceiver' | 'Erc20InvalidApprover' | 'Erc20InvalidSender' | 'Erc20InvalidSpender' | 'Erc20InsufficientBalance' | 'OwnerNotFound' | 'InvalidOwnerKey' | 'OwnableUnauthorizedAccount' | 'UnauthorizedAccount' | 'AssetNotFound';
}

/** @name PalletBalancesAdjustmentDirection */
export interface PalletBalancesAdjustmentDirection extends Enum {
  readonly isIncrease: boolean;
  readonly isDecrease: boolean;
  readonly type: 'Increase' | 'Decrease';
}

/** @name PalletBalancesBalanceLock */
export interface PalletBalancesBalanceLock extends Struct {
  readonly id: U8aFixed;
  readonly amount: u128;
  readonly reasons: PalletBalancesReasons;
}

/** @name PalletBalancesCall */
export interface PalletBalancesCall extends Enum {
  readonly isTransferAllowDeath: boolean;
  readonly asTransferAllowDeath: {
    readonly dest: MultiAddress;
    readonly value: Compact<u128>;
  } & Struct;
  readonly isForceTransfer: boolean;
  readonly asForceTransfer: {
    readonly source: MultiAddress;
    readonly dest: MultiAddress;
    readonly value: Compact<u128>;
  } & Struct;
  readonly isTransferKeepAlive: boolean;
  readonly asTransferKeepAlive: {
    readonly dest: MultiAddress;
    readonly value: Compact<u128>;
  } & Struct;
  readonly isTransferAll: boolean;
  readonly asTransferAll: {
    readonly dest: MultiAddress;
    readonly keepAlive: bool;
  } & Struct;
  readonly isForceUnreserve: boolean;
  readonly asForceUnreserve: {
    readonly who: MultiAddress;
    readonly amount: u128;
  } & Struct;
  readonly isUpgradeAccounts: boolean;
  readonly asUpgradeAccounts: {
    readonly who: Vec<AccountId32>;
  } & Struct;
  readonly isForceSetBalance: boolean;
  readonly asForceSetBalance: {
    readonly who: MultiAddress;
    readonly newFree: Compact<u128>;
  } & Struct;
  readonly isForceAdjustTotalIssuance: boolean;
  readonly asForceAdjustTotalIssuance: {
    readonly direction: PalletBalancesAdjustmentDirection;
    readonly delta: Compact<u128>;
  } & Struct;
  readonly type: 'TransferAllowDeath' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve' | 'UpgradeAccounts' | 'ForceSetBalance' | 'ForceAdjustTotalIssuance';
}

/** @name PalletBalancesError */
export interface PalletBalancesError extends Enum {
  readonly isVestingBalance: boolean;
  readonly isLiquidityRestrictions: boolean;
  readonly isInsufficientBalance: boolean;
  readonly isExistentialDeposit: boolean;
  readonly isExpendability: boolean;
  readonly isExistingVestingSchedule: boolean;
  readonly isDeadAccount: boolean;
  readonly isTooManyReserves: boolean;
  readonly isTooManyHolds: boolean;
  readonly isTooManyFreezes: boolean;
  readonly isIssuanceDeactivated: boolean;
  readonly isDeltaZero: boolean;
  readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'Expendability' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves' | 'TooManyHolds' | 'TooManyFreezes' | 'IssuanceDeactivated' | 'DeltaZero';
}

/** @name PalletBalancesEvent */
export interface PalletBalancesEvent extends Enum {
  readonly isEndowed: boolean;
  readonly asEndowed: {
    readonly account: AccountId32;
    readonly freeBalance: u128;
  } & Struct;
  readonly isDustLost: boolean;
  readonly asDustLost: {
    readonly account: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isTransfer: boolean;
  readonly asTransfer: {
    readonly from: AccountId32;
    readonly to: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isBalanceSet: boolean;
  readonly asBalanceSet: {
    readonly who: AccountId32;
    readonly free: u128;
  } & Struct;
  readonly isReserved: boolean;
  readonly asReserved: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isUnreserved: boolean;
  readonly asUnreserved: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isReserveRepatriated: boolean;
  readonly asReserveRepatriated: {
    readonly from: AccountId32;
    readonly to: AccountId32;
    readonly amount: u128;
    readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
  } & Struct;
  readonly isDeposit: boolean;
  readonly asDeposit: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isWithdraw: boolean;
  readonly asWithdraw: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isSlashed: boolean;
  readonly asSlashed: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isMinted: boolean;
  readonly asMinted: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isBurned: boolean;
  readonly asBurned: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isSuspended: boolean;
  readonly asSuspended: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isRestored: boolean;
  readonly asRestored: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isUpgraded: boolean;
  readonly asUpgraded: {
    readonly who: AccountId32;
  } & Struct;
  readonly isIssued: boolean;
  readonly asIssued: {
    readonly amount: u128;
  } & Struct;
  readonly isRescinded: boolean;
  readonly asRescinded: {
    readonly amount: u128;
  } & Struct;
  readonly isLocked: boolean;
  readonly asLocked: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isUnlocked: boolean;
  readonly asUnlocked: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isFrozen: boolean;
  readonly asFrozen: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isThawed: boolean;
  readonly asThawed: {
    readonly who: AccountId32;
    readonly amount: u128;
  } & Struct;
  readonly isTotalIssuanceForced: boolean;
  readonly asTotalIssuanceForced: {
    readonly old: u128;
    readonly new_: u128;
  } & Struct;
  readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed' | 'Minted' | 'Burned' | 'Suspended' | 'Restored' | 'Upgraded' | 'Issued' | 'Rescinded' | 'Locked' | 'Unlocked' | 'Frozen' | 'Thawed' | 'TotalIssuanceForced';
}

/** @name PalletBalancesIdAmount */
export interface PalletBalancesIdAmount extends Struct {
  readonly id: U8aFixed;
  readonly amount: u128;
}

/** @name PalletBalancesReasons */
export interface PalletBalancesReasons extends Enum {
  readonly isFee: boolean;
  readonly isMisc: boolean;
  readonly isAll: boolean;
  readonly type: 'Fee' | 'Misc' | 'All';
}

/** @name PalletBalancesReserveData */
export interface PalletBalancesReserveData extends Struct {
  readonly id: U8aFixed;
  readonly amount: u128;
}

/** @name PalletEthereumCall */
export interface PalletEthereumCall extends Enum {
  readonly isTransact: boolean;
  readonly asTransact: {
    readonly transaction: EthereumTransactionTransactionV2;
  } & Struct;
  readonly type: 'Transact';
}

/** @name PalletEthereumError */
export interface PalletEthereumError extends Enum {
  readonly isInvalidSignature: boolean;
  readonly isPreLogExists: boolean;
  readonly type: 'InvalidSignature' | 'PreLogExists';
}

/** @name PalletEthereumEvent */
export interface PalletEthereumEvent extends Enum {
  readonly isExecuted: boolean;
  readonly asExecuted: {
    readonly from: H160;
    readonly to: H160;
    readonly transactionHash: H256;
    readonly exitReason: EvmCoreErrorExitReason;
    readonly extraData: Bytes;
  } & Struct;
  readonly type: 'Executed';
}

/** @name PalletEthereumFakeTransactionFinalizer */
export interface PalletEthereumFakeTransactionFinalizer extends Null {}

/** @name PalletEthereumRawOrigin */
export interface PalletEthereumRawOrigin extends Enum {
  readonly isEthereumTransaction: boolean;
  readonly asEthereumTransaction: H160;
  readonly type: 'EthereumTransaction';
}

/** @name PalletEvmAssetsAccountPermissions */
export interface PalletEvmAssetsAccountPermissions extends Struct {
  readonly bits: u64;
}

/** @name PalletEvmAssetsAssetDetails */
export interface PalletEvmAssetsAssetDetails extends Struct {
  readonly owner: H160;
  readonly supply: u128;
}

/** @name PalletEvmAssetsAssetMetadata */
export interface PalletEvmAssetsAssetMetadata extends Struct {
  readonly name: Bytes;
  readonly symbol: Bytes;
  readonly decimals: u8;
  readonly isFrozen: bool;
}

/** @name PalletEvmAssetsAssets */
export interface PalletEvmAssetsAssets extends Struct {
  readonly bits: u8;
}

/** @name PalletEvmAssetsError */
export interface PalletEvmAssetsError extends Enum {
  readonly isErc20InsufficientAllowance: boolean;
  readonly isErc20InvalidReceiver: boolean;
  readonly isErc20InvalidApprover: boolean;
  readonly isErc20InvalidSender: boolean;
  readonly isErc20InvalidSpender: boolean;
  readonly isErc20InsufficientBalance: boolean;
  readonly isOwnableUnauthorizedAccount: boolean;
  readonly isUnauthorizedAccount: boolean;
  readonly isAssetNotFound: boolean;
  readonly type: 'Erc20InsufficientAllowance' | 'Erc20InvalidReceiver' | 'Erc20InvalidApprover' | 'Erc20InvalidSender' | 'Erc20InvalidSpender' | 'Erc20InsufficientBalance' | 'OwnableUnauthorizedAccount' | 'UnauthorizedAccount' | 'AssetNotFound';
}

/** @name PalletEvmCall */
export interface PalletEvmCall extends Enum {
  readonly isWithdraw: boolean;
  readonly asWithdraw: {
    readonly address: H160;
    readonly value: u128;
  } & Struct;
  readonly isCall: boolean;
  readonly asCall: {
    readonly source: H160;
    readonly target: H160;
    readonly input: Bytes;
    readonly value: U256;
    readonly gasLimit: u64;
    readonly maxFeePerGas: U256;
    readonly maxPriorityFeePerGas: Option<U256>;
    readonly nonce: Option<U256>;
    readonly accessList: Vec<ITuple<[H160, Vec<H256>]>>;
  } & Struct;
  readonly isCreate: boolean;
  readonly asCreate: {
    readonly source: H160;
    readonly init: Bytes;
    readonly value: U256;
    readonly gasLimit: u64;
    readonly maxFeePerGas: U256;
    readonly maxPriorityFeePerGas: Option<U256>;
    readonly nonce: Option<U256>;
    readonly accessList: Vec<ITuple<[H160, Vec<H256>]>>;
  } & Struct;
  readonly isCreate2: boolean;
  readonly asCreate2: {
    readonly source: H160;
    readonly init: Bytes;
    readonly salt: H256;
    readonly value: U256;
    readonly gasLimit: u64;
    readonly maxFeePerGas: U256;
    readonly maxPriorityFeePerGas: Option<U256>;
    readonly nonce: Option<U256>;
    readonly accessList: Vec<ITuple<[H160, Vec<H256>]>>;
  } & Struct;
  readonly type: 'Withdraw' | 'Call' | 'Create' | 'Create2';
}

/** @name PalletEvmCodeMetadata */
export interface PalletEvmCodeMetadata extends Struct {
  readonly size_: u64;
  readonly hash_: H256;
}

/** @name PalletEvmCoderSubstrateError */
export interface PalletEvmCoderSubstrateError extends Enum {
  readonly isOutOfGas: boolean;
  readonly isOutOfFund: boolean;
  readonly type: 'OutOfGas' | 'OutOfFund';
}

/** @name PalletEvmContractHelpersError */
export interface PalletEvmContractHelpersError extends Enum {
  readonly isNoPermission: boolean;
  readonly type: 'NoPermission';
}

/** @name PalletEvmError */
export interface PalletEvmError extends Enum {
  readonly isBalanceLow: boolean;
  readonly isFeeOverflow: boolean;
  readonly isPaymentOverflow: boolean;
  readonly isWithdrawFailed: boolean;
  readonly isGasPriceTooLow: boolean;
  readonly isInvalidNonce: boolean;
  readonly isGasLimitTooLow: boolean;
  readonly isGasLimitTooHigh: boolean;
  readonly isInvalidChainId: boolean;
  readonly isInvalidSignature: boolean;
  readonly isReentrancy: boolean;
  readonly isTransactionMustComeFromEOA: boolean;
  readonly isUndefined: boolean;
  readonly type: 'BalanceLow' | 'FeeOverflow' | 'PaymentOverflow' | 'WithdrawFailed' | 'GasPriceTooLow' | 'InvalidNonce' | 'GasLimitTooLow' | 'GasLimitTooHigh' | 'InvalidChainId' | 'InvalidSignature' | 'Reentrancy' | 'TransactionMustComeFromEOA' | 'Undefined';
}

/** @name PalletEvmEvent */
export interface PalletEvmEvent extends Enum {
  readonly isLog: boolean;
  readonly asLog: {
    readonly log: EthereumLog;
  } & Struct;
  readonly isCreated: boolean;
  readonly asCreated: {
    readonly address: H160;
  } & Struct;
  readonly isCreatedFailed: boolean;
  readonly asCreatedFailed: {
    readonly address: H160;
  } & Struct;
  readonly isExecuted: boolean;
  readonly asExecuted: {
    readonly address: H160;
  } & Struct;
  readonly isExecutedFailed: boolean;
  readonly asExecutedFailed: {
    readonly address: H160;
  } & Struct;
  readonly type: 'Log' | 'Created' | 'CreatedFailed' | 'Executed' | 'ExecutedFailed';
}

/** @name PalletMessageQueueBookState */
export interface PalletMessageQueueBookState extends Struct {
  readonly begin: u32;
  readonly end: u32;
  readonly count: u32;
  readonly readyNeighbours: Option<PalletMessageQueueNeighbours>;
  readonly messageCount: u64;
  readonly size_: u64;
}

/** @name PalletMessageQueueCall */
export interface PalletMessageQueueCall extends Enum {
  readonly isReapPage: boolean;
  readonly asReapPage: {
    readonly messageOrigin: CumulusPrimitivesCoreAggregateMessageOrigin;
    readonly pageIndex: u32;
  } & Struct;
  readonly isExecuteOverweight: boolean;
  readonly asExecuteOverweight: {
    readonly messageOrigin: CumulusPrimitivesCoreAggregateMessageOrigin;
    readonly page: u32;
    readonly index: u32;
    readonly weightLimit: SpWeightsWeightV2Weight;
  } & Struct;
  readonly type: 'ReapPage' | 'ExecuteOverweight';
}

/** @name PalletMessageQueueError */
export interface PalletMessageQueueError extends Enum {
  readonly isNotReapable: boolean;
  readonly isNoPage: boolean;
  readonly isNoMessage: boolean;
  readonly isAlreadyProcessed: boolean;
  readonly isQueued: boolean;
  readonly isInsufficientWeight: boolean;
  readonly isTemporarilyUnprocessable: boolean;
  readonly isQueuePaused: boolean;
  readonly isRecursiveDisallowed: boolean;
  readonly type: 'NotReapable' | 'NoPage' | 'NoMessage' | 'AlreadyProcessed' | 'Queued' | 'InsufficientWeight' | 'TemporarilyUnprocessable' | 'QueuePaused' | 'RecursiveDisallowed';
}

/** @name PalletMessageQueueEvent */
export interface PalletMessageQueueEvent extends Enum {
  readonly isProcessingFailed: boolean;
  readonly asProcessingFailed: {
    readonly id: H256;
    readonly origin: CumulusPrimitivesCoreAggregateMessageOrigin;
    readonly error: FrameSupportMessagesProcessMessageError;
  } & Struct;
  readonly isProcessed: boolean;
  readonly asProcessed: {
    readonly id: H256;
    readonly origin: CumulusPrimitivesCoreAggregateMessageOrigin;
    readonly weightUsed: SpWeightsWeightV2Weight;
    readonly success: bool;
  } & Struct;
  readonly isOverweightEnqueued: boolean;
  readonly asOverweightEnqueued: {
    readonly id: U8aFixed;
    readonly origin: CumulusPrimitivesCoreAggregateMessageOrigin;
    readonly pageIndex: u32;
    readonly messageIndex: u32;
  } & Struct;
  readonly isPageReaped: boolean;
  readonly asPageReaped: {
    readonly origin: CumulusPrimitivesCoreAggregateMessageOrigin;
    readonly index: u32;
  } & Struct;
  readonly type: 'ProcessingFailed' | 'Processed' | 'OverweightEnqueued' | 'PageReaped';
}

/** @name PalletMessageQueueNeighbours */
export interface PalletMessageQueueNeighbours extends Struct {
  readonly prev: CumulusPrimitivesCoreAggregateMessageOrigin;
  readonly next: CumulusPrimitivesCoreAggregateMessageOrigin;
}

/** @name PalletMessageQueuePage */
export interface PalletMessageQueuePage extends Struct {
  readonly remaining: u32;
  readonly remainingSize: u32;
  readonly firstIndex: u32;
  readonly first: u32;
  readonly last: u32;
  readonly heap: Bytes;
}

/** @name PalletPrivateBalancesAuraExtCall */
export interface PalletPrivateBalancesAuraExtCall extends Enum {
  readonly isSetAuthorities: boolean;
  readonly asSetAuthorities: {
    readonly authorities: Vec<SpConsensusAuraSr25519AppSr25519Public>;
  } & Struct;
  readonly isSetTrustedAuthorities: boolean;
  readonly asSetTrustedAuthorities: {
    readonly authorities: Vec<SpConsensusAuraSr25519AppSr25519Public>;
  } & Struct;
  readonly type: 'SetAuthorities' | 'SetTrustedAuthorities';
}

/** @name PalletPrivateBalancesAuraExtError */
export interface PalletPrivateBalancesAuraExtError extends Enum {
  readonly isEmptyAuthorities: boolean;
  readonly type: 'EmptyAuthorities';
}

/** @name PalletSudoCall */
export interface PalletSudoCall extends Enum {
  readonly isSudo: boolean;
  readonly asSudo: {
    readonly call: Call;
  } & Struct;
  readonly isSudoUncheckedWeight: boolean;
  readonly asSudoUncheckedWeight: {
    readonly call: Call;
    readonly weight: SpWeightsWeightV2Weight;
  } & Struct;
  readonly isSetKey: boolean;
  readonly asSetKey: {
    readonly new_: MultiAddress;
  } & Struct;
  readonly isSudoAs: boolean;
  readonly asSudoAs: {
    readonly who: MultiAddress;
    readonly call: Call;
  } & Struct;
  readonly isRemoveKey: boolean;
  readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs' | 'RemoveKey';
}

/** @name PalletSudoError */
export interface PalletSudoError extends Enum {
  readonly isRequireSudo: boolean;
  readonly type: 'RequireSudo';
}

/** @name PalletSudoEvent */
export interface PalletSudoEvent extends Enum {
  readonly isSudid: boolean;
  readonly asSudid: {
    readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
  } & Struct;
  readonly isKeyChanged: boolean;
  readonly asKeyChanged: {
    readonly old: Option<AccountId32>;
    readonly new_: AccountId32;
  } & Struct;
  readonly isKeyRemoved: boolean;
  readonly isSudoAsDone: boolean;
  readonly asSudoAsDone: {
    readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
  } & Struct;
  readonly type: 'Sudid' | 'KeyChanged' | 'KeyRemoved' | 'SudoAsDone';
}

/** @name PalletTimestampCall */
export interface PalletTimestampCall extends Enum {
  readonly isSet: boolean;
  readonly asSet: {
    readonly now: Compact<u64>;
  } & Struct;
  readonly type: 'Set';
}

/** @name PalletTransactionPaymentChargeTransactionPayment */
export interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

/** @name PalletTransactionPaymentEvent */
export interface PalletTransactionPaymentEvent extends Enum {
  readonly isTransactionFeePaid: boolean;
  readonly asTransactionFeePaid: {
    readonly who: AccountId32;
    readonly actualFee: u128;
    readonly tip: u128;
  } & Struct;
  readonly type: 'TransactionFeePaid';
}

/** @name PalletTransactionPaymentReleases */
export interface PalletTransactionPaymentReleases extends Enum {
  readonly isV1Ancient: boolean;
  readonly isV2: boolean;
  readonly type: 'V1Ancient' | 'V2';
}

/** @name PalletTreasuryCall */
export interface PalletTreasuryCall extends Enum {
  readonly isProposeSpend: boolean;
  readonly asProposeSpend: {
    readonly value: Compact<u128>;
    readonly beneficiary: MultiAddress;
  } & Struct;
  readonly isRejectProposal: boolean;
  readonly asRejectProposal: {
    readonly proposalId: Compact<u32>;
  } & Struct;
  readonly isApproveProposal: boolean;
  readonly asApproveProposal: {
    readonly proposalId: Compact<u32>;
  } & Struct;
  readonly isSpendLocal: boolean;
  readonly asSpendLocal: {
    readonly amount: Compact<u128>;
    readonly beneficiary: MultiAddress;
  } & Struct;
  readonly isRemoveApproval: boolean;
  readonly asRemoveApproval: {
    readonly proposalId: Compact<u32>;
  } & Struct;
  readonly isSpend: boolean;
  readonly asSpend: {
    readonly assetKind: Null;
    readonly amount: Compact<u128>;
    readonly beneficiary: AccountId32;
    readonly validFrom: Option<u32>;
  } & Struct;
  readonly isPayout: boolean;
  readonly asPayout: {
    readonly index: u32;
  } & Struct;
  readonly isCheckStatus: boolean;
  readonly asCheckStatus: {
    readonly index: u32;
  } & Struct;
  readonly isVoidSpend: boolean;
  readonly asVoidSpend: {
    readonly index: u32;
  } & Struct;
  readonly type: 'ProposeSpend' | 'RejectProposal' | 'ApproveProposal' | 'SpendLocal' | 'RemoveApproval' | 'Spend' | 'Payout' | 'CheckStatus' | 'VoidSpend';
}

/** @name PalletTreasuryError */
export interface PalletTreasuryError extends Enum {
  readonly isInsufficientProposersBalance: boolean;
  readonly isInvalidIndex: boolean;
  readonly isTooManyApprovals: boolean;
  readonly isInsufficientPermission: boolean;
  readonly isProposalNotApproved: boolean;
  readonly isFailedToConvertBalance: boolean;
  readonly isSpendExpired: boolean;
  readonly isEarlyPayout: boolean;
  readonly isAlreadyAttempted: boolean;
  readonly isPayoutError: boolean;
  readonly isNotAttempted: boolean;
  readonly isInconclusive: boolean;
  readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'TooManyApprovals' | 'InsufficientPermission' | 'ProposalNotApproved' | 'FailedToConvertBalance' | 'SpendExpired' | 'EarlyPayout' | 'AlreadyAttempted' | 'PayoutError' | 'NotAttempted' | 'Inconclusive';
}

/** @name PalletTreasuryEvent */
export interface PalletTreasuryEvent extends Enum {
  readonly isProposed: boolean;
  readonly asProposed: {
    readonly proposalIndex: u32;
  } & Struct;
  readonly isSpending: boolean;
  readonly asSpending: {
    readonly budgetRemaining: u128;
  } & Struct;
  readonly isAwarded: boolean;
  readonly asAwarded: {
    readonly proposalIndex: u32;
    readonly award: u128;
    readonly account: AccountId32;
  } & Struct;
  readonly isRejected: boolean;
  readonly asRejected: {
    readonly proposalIndex: u32;
    readonly slashed: u128;
  } & Struct;
  readonly isBurnt: boolean;
  readonly asBurnt: {
    readonly burntFunds: u128;
  } & Struct;
  readonly isRollover: boolean;
  readonly asRollover: {
    readonly rolloverBalance: u128;
  } & Struct;
  readonly isDeposit: boolean;
  readonly asDeposit: {
    readonly value: u128;
  } & Struct;
  readonly isSpendApproved: boolean;
  readonly asSpendApproved: {
    readonly proposalIndex: u32;
    readonly amount: u128;
    readonly beneficiary: AccountId32;
  } & Struct;
  readonly isUpdatedInactive: boolean;
  readonly asUpdatedInactive: {
    readonly reactivated: u128;
    readonly deactivated: u128;
  } & Struct;
  readonly isAssetSpendApproved: boolean;
  readonly asAssetSpendApproved: {
    readonly index: u32;
    readonly assetKind: Null;
    readonly amount: u128;
    readonly beneficiary: AccountId32;
    readonly validFrom: u32;
    readonly expireAt: u32;
  } & Struct;
  readonly isAssetSpendVoided: boolean;
  readonly asAssetSpendVoided: {
    readonly index: u32;
  } & Struct;
  readonly isPaid: boolean;
  readonly asPaid: {
    readonly index: u32;
    readonly paymentId: Null;
  } & Struct;
  readonly isPaymentFailed: boolean;
  readonly asPaymentFailed: {
    readonly index: u32;
    readonly paymentId: Null;
  } & Struct;
  readonly isSpendProcessed: boolean;
  readonly asSpendProcessed: {
    readonly index: u32;
  } & Struct;
  readonly type: 'Proposed' | 'Spending' | 'Awarded' | 'Rejected' | 'Burnt' | 'Rollover' | 'Deposit' | 'SpendApproved' | 'UpdatedInactive' | 'AssetSpendApproved' | 'AssetSpendVoided' | 'Paid' | 'PaymentFailed' | 'SpendProcessed';
}

/** @name PalletTreasuryPaymentState */
export interface PalletTreasuryPaymentState extends Enum {
  readonly isPending: boolean;
  readonly isAttempted: boolean;
  readonly asAttempted: {
    readonly id: Null;
  } & Struct;
  readonly isFailed: boolean;
  readonly type: 'Pending' | 'Attempted' | 'Failed';
}

/** @name PalletTreasuryProposal */
export interface PalletTreasuryProposal extends Struct {
  readonly proposer: AccountId32;
  readonly value: u128;
  readonly beneficiary: AccountId32;
  readonly bond: u128;
}

/** @name PalletTreasurySpendStatus */
export interface PalletTreasurySpendStatus extends Struct {
  readonly assetKind: Null;
  readonly amount: u128;
  readonly beneficiary: AccountId32;
  readonly validFrom: u32;
  readonly expireAt: u32;
  readonly status: PalletTreasuryPaymentState;
}

/** @name PalletUtilityCall */
export interface PalletUtilityCall extends Enum {
  readonly isBatch: boolean;
  readonly asBatch: {
    readonly calls: Vec<Call>;
  } & Struct;
  readonly isAsDerivative: boolean;
  readonly asAsDerivative: {
    readonly index: u16;
    readonly call: Call;
  } & Struct;
  readonly isBatchAll: boolean;
  readonly asBatchAll: {
    readonly calls: Vec<Call>;
  } & Struct;
  readonly isDispatchAs: boolean;
  readonly asDispatchAs: {
    readonly asOrigin: RedefiRuntimeOriginCaller;
    readonly call: Call;
  } & Struct;
  readonly isForceBatch: boolean;
  readonly asForceBatch: {
    readonly calls: Vec<Call>;
  } & Struct;
  readonly isWithWeight: boolean;
  readonly asWithWeight: {
    readonly call: Call;
    readonly weight: SpWeightsWeightV2Weight;
  } & Struct;
  readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs' | 'ForceBatch' | 'WithWeight';
}

/** @name PalletUtilityError */
export interface PalletUtilityError extends Enum {
  readonly isTooManyCalls: boolean;
  readonly type: 'TooManyCalls';
}

/** @name PalletUtilityEvent */
export interface PalletUtilityEvent extends Enum {
  readonly isBatchInterrupted: boolean;
  readonly asBatchInterrupted: {
    readonly index: u32;
    readonly error: SpRuntimeDispatchError;
  } & Struct;
  readonly isBatchCompleted: boolean;
  readonly isBatchCompletedWithErrors: boolean;
  readonly isItemCompleted: boolean;
  readonly isItemFailed: boolean;
  readonly asItemFailed: {
    readonly error: SpRuntimeDispatchError;
  } & Struct;
  readonly isDispatchedAs: boolean;
  readonly asDispatchedAs: {
    readonly result: Result<Null, SpRuntimeDispatchError>;
  } & Struct;
  readonly type: 'BatchInterrupted' | 'BatchCompleted' | 'BatchCompletedWithErrors' | 'ItemCompleted' | 'ItemFailed' | 'DispatchedAs';
}

/** @name PalletXcmCall */
export interface PalletXcmCall extends Enum {
  readonly isSend: boolean;
  readonly asSend: {
    readonly dest: XcmVersionedLocation;
    readonly message: XcmVersionedXcm;
  } & Struct;
  readonly isTeleportAssets: boolean;
  readonly asTeleportAssets: {
    readonly dest: XcmVersionedLocation;
    readonly beneficiary: XcmVersionedLocation;
    readonly assets: XcmVersionedAssets;
    readonly feeAssetItem: u32;
  } & Struct;
  readonly isReserveTransferAssets: boolean;
  readonly asReserveTransferAssets: {
    readonly dest: XcmVersionedLocation;
    readonly beneficiary: XcmVersionedLocation;
    readonly assets: XcmVersionedAssets;
    readonly feeAssetItem: u32;
  } & Struct;
  readonly isExecute: boolean;
  readonly asExecute: {
    readonly message: XcmVersionedXcm;
    readonly maxWeight: SpWeightsWeightV2Weight;
  } & Struct;
  readonly isForceXcmVersion: boolean;
  readonly asForceXcmVersion: {
    readonly location: StagingXcmV4Location;
    readonly version: u32;
  } & Struct;
  readonly isForceDefaultXcmVersion: boolean;
  readonly asForceDefaultXcmVersion: {
    readonly maybeXcmVersion: Option<u32>;
  } & Struct;
  readonly isForceSubscribeVersionNotify: boolean;
  readonly asForceSubscribeVersionNotify: {
    readonly location: XcmVersionedLocation;
  } & Struct;
  readonly isForceUnsubscribeVersionNotify: boolean;
  readonly asForceUnsubscribeVersionNotify: {
    readonly location: XcmVersionedLocation;
  } & Struct;
  readonly isLimitedReserveTransferAssets: boolean;
  readonly asLimitedReserveTransferAssets: {
    readonly dest: XcmVersionedLocation;
    readonly beneficiary: XcmVersionedLocation;
    readonly assets: XcmVersionedAssets;
    readonly feeAssetItem: u32;
    readonly weightLimit: XcmV3WeightLimit;
  } & Struct;
  readonly isLimitedTeleportAssets: boolean;
  readonly asLimitedTeleportAssets: {
    readonly dest: XcmVersionedLocation;
    readonly beneficiary: XcmVersionedLocation;
    readonly assets: XcmVersionedAssets;
    readonly feeAssetItem: u32;
    readonly weightLimit: XcmV3WeightLimit;
  } & Struct;
  readonly isForceSuspension: boolean;
  readonly asForceSuspension: {
    readonly suspended: bool;
  } & Struct;
  readonly isTransferAssets: boolean;
  readonly asTransferAssets: {
    readonly dest: XcmVersionedLocation;
    readonly beneficiary: XcmVersionedLocation;
    readonly assets: XcmVersionedAssets;
    readonly feeAssetItem: u32;
    readonly weightLimit: XcmV3WeightLimit;
  } & Struct;
  readonly isClaimAssets: boolean;
  readonly asClaimAssets: {
    readonly assets: XcmVersionedAssets;
    readonly beneficiary: XcmVersionedLocation;
  } & Struct;
  readonly type: 'Send' | 'TeleportAssets' | 'ReserveTransferAssets' | 'Execute' | 'ForceXcmVersion' | 'ForceDefaultXcmVersion' | 'ForceSubscribeVersionNotify' | 'ForceUnsubscribeVersionNotify' | 'LimitedReserveTransferAssets' | 'LimitedTeleportAssets' | 'ForceSuspension' | 'TransferAssets' | 'ClaimAssets';
}

/** @name PalletXcmError */
export interface PalletXcmError extends Enum {
  readonly isUnreachable: boolean;
  readonly isSendFailure: boolean;
  readonly isFiltered: boolean;
  readonly isUnweighableMessage: boolean;
  readonly isDestinationNotInvertible: boolean;
  readonly isEmpty: boolean;
  readonly isCannotReanchor: boolean;
  readonly isTooManyAssets: boolean;
  readonly isInvalidOrigin: boolean;
  readonly isBadVersion: boolean;
  readonly isBadLocation: boolean;
  readonly isNoSubscription: boolean;
  readonly isAlreadySubscribed: boolean;
  readonly isCannotCheckOutTeleport: boolean;
  readonly isLowBalance: boolean;
  readonly isTooManyLocks: boolean;
  readonly isAccountNotSovereign: boolean;
  readonly isFeesNotMet: boolean;
  readonly isLockNotFound: boolean;
  readonly isInUse: boolean;
  readonly isInvalidAssetNotConcrete: boolean;
  readonly isInvalidAssetUnknownReserve: boolean;
  readonly isInvalidAssetUnsupportedReserve: boolean;
  readonly isTooManyReserves: boolean;
  readonly isLocalExecutionIncomplete: boolean;
  readonly type: 'Unreachable' | 'SendFailure' | 'Filtered' | 'UnweighableMessage' | 'DestinationNotInvertible' | 'Empty' | 'CannotReanchor' | 'TooManyAssets' | 'InvalidOrigin' | 'BadVersion' | 'BadLocation' | 'NoSubscription' | 'AlreadySubscribed' | 'CannotCheckOutTeleport' | 'LowBalance' | 'TooManyLocks' | 'AccountNotSovereign' | 'FeesNotMet' | 'LockNotFound' | 'InUse' | 'InvalidAssetNotConcrete' | 'InvalidAssetUnknownReserve' | 'InvalidAssetUnsupportedReserve' | 'TooManyReserves' | 'LocalExecutionIncomplete';
}

/** @name PalletXcmEvent */
export interface PalletXcmEvent extends Enum {
  readonly isAttempted: boolean;
  readonly asAttempted: {
    readonly outcome: StagingXcmV4TraitsOutcome;
  } & Struct;
  readonly isSent: boolean;
  readonly asSent: {
    readonly origin: StagingXcmV4Location;
    readonly destination: StagingXcmV4Location;
    readonly message: StagingXcmV4Xcm;
    readonly messageId: U8aFixed;
  } & Struct;
  readonly isUnexpectedResponse: boolean;
  readonly asUnexpectedResponse: {
    readonly origin: StagingXcmV4Location;
    readonly queryId: u64;
  } & Struct;
  readonly isResponseReady: boolean;
  readonly asResponseReady: {
    readonly queryId: u64;
    readonly response: StagingXcmV4Response;
  } & Struct;
  readonly isNotified: boolean;
  readonly asNotified: {
    readonly queryId: u64;
    readonly palletIndex: u8;
    readonly callIndex: u8;
  } & Struct;
  readonly isNotifyOverweight: boolean;
  readonly asNotifyOverweight: {
    readonly queryId: u64;
    readonly palletIndex: u8;
    readonly callIndex: u8;
    readonly actualWeight: SpWeightsWeightV2Weight;
    readonly maxBudgetedWeight: SpWeightsWeightV2Weight;
  } & Struct;
  readonly isNotifyDispatchError: boolean;
  readonly asNotifyDispatchError: {
    readonly queryId: u64;
    readonly palletIndex: u8;
    readonly callIndex: u8;
  } & Struct;
  readonly isNotifyDecodeFailed: boolean;
  readonly asNotifyDecodeFailed: {
    readonly queryId: u64;
    readonly palletIndex: u8;
    readonly callIndex: u8;
  } & Struct;
  readonly isInvalidResponder: boolean;
  readonly asInvalidResponder: {
    readonly origin: StagingXcmV4Location;
    readonly queryId: u64;
    readonly expectedLocation: Option<StagingXcmV4Location>;
  } & Struct;
  readonly isInvalidResponderVersion: boolean;
  readonly asInvalidResponderVersion: {
    readonly origin: StagingXcmV4Location;
    readonly queryId: u64;
  } & Struct;
  readonly isResponseTaken: boolean;
  readonly asResponseTaken: {
    readonly queryId: u64;
  } & Struct;
  readonly isAssetsTrapped: boolean;
  readonly asAssetsTrapped: {
    readonly hash_: H256;
    readonly origin: StagingXcmV4Location;
    readonly assets: XcmVersionedAssets;
  } & Struct;
  readonly isVersionChangeNotified: boolean;
  readonly asVersionChangeNotified: {
    readonly destination: StagingXcmV4Location;
    readonly result: u32;
    readonly cost: StagingXcmV4AssetAssets;
    readonly messageId: U8aFixed;
  } & Struct;
  readonly isSupportedVersionChanged: boolean;
  readonly asSupportedVersionChanged: {
    readonly location: StagingXcmV4Location;
    readonly version: u32;
  } & Struct;
  readonly isNotifyTargetSendFail: boolean;
  readonly asNotifyTargetSendFail: {
    readonly location: StagingXcmV4Location;
    readonly queryId: u64;
    readonly error: XcmV3TraitsError;
  } & Struct;
  readonly isNotifyTargetMigrationFail: boolean;
  readonly asNotifyTargetMigrationFail: {
    readonly location: XcmVersionedLocation;
    readonly queryId: u64;
  } & Struct;
  readonly isInvalidQuerierVersion: boolean;
  readonly asInvalidQuerierVersion: {
    readonly origin: StagingXcmV4Location;
    readonly queryId: u64;
  } & Struct;
  readonly isInvalidQuerier: boolean;
  readonly asInvalidQuerier: {
    readonly origin: StagingXcmV4Location;
    readonly queryId: u64;
    readonly expectedQuerier: StagingXcmV4Location;
    readonly maybeActualQuerier: Option<StagingXcmV4Location>;
  } & Struct;
  readonly isVersionNotifyStarted: boolean;
  readonly asVersionNotifyStarted: {
    readonly destination: StagingXcmV4Location;
    readonly cost: StagingXcmV4AssetAssets;
    readonly messageId: U8aFixed;
  } & Struct;
  readonly isVersionNotifyRequested: boolean;
  readonly asVersionNotifyRequested: {
    readonly destination: StagingXcmV4Location;
    readonly cost: StagingXcmV4AssetAssets;
    readonly messageId: U8aFixed;
  } & Struct;
  readonly isVersionNotifyUnrequested: boolean;
  readonly asVersionNotifyUnrequested: {
    readonly destination: StagingXcmV4Location;
    readonly cost: StagingXcmV4AssetAssets;
    readonly messageId: U8aFixed;
  } & Struct;
  readonly isFeesPaid: boolean;
  readonly asFeesPaid: {
    readonly paying: StagingXcmV4Location;
    readonly fees: StagingXcmV4AssetAssets;
  } & Struct;
  readonly isAssetsClaimed: boolean;
  readonly asAssetsClaimed: {
    readonly hash_: H256;
    readonly origin: StagingXcmV4Location;
    readonly assets: XcmVersionedAssets;
  } & Struct;
  readonly isVersionMigrationFinished: boolean;
  readonly asVersionMigrationFinished: {
    readonly version: u32;
  } & Struct;
  readonly type: 'Attempted' | 'Sent' | 'UnexpectedResponse' | 'ResponseReady' | 'Notified' | 'NotifyOverweight' | 'NotifyDispatchError' | 'NotifyDecodeFailed' | 'InvalidResponder' | 'InvalidResponderVersion' | 'ResponseTaken' | 'AssetsTrapped' | 'VersionChangeNotified' | 'SupportedVersionChanged' | 'NotifyTargetSendFail' | 'NotifyTargetMigrationFail' | 'InvalidQuerierVersion' | 'InvalidQuerier' | 'VersionNotifyStarted' | 'VersionNotifyRequested' | 'VersionNotifyUnrequested' | 'FeesPaid' | 'AssetsClaimed' | 'VersionMigrationFinished';
}

/** @name PalletXcmOrigin */
export interface PalletXcmOrigin extends Enum {
  readonly isXcm: boolean;
  readonly asXcm: StagingXcmV4Location;
  readonly isResponse: boolean;
  readonly asResponse: StagingXcmV4Location;
  readonly type: 'Xcm' | 'Response';
}

/** @name PalletXcmQueryStatus */
export interface PalletXcmQueryStatus extends Enum {
  readonly isPending: boolean;
  readonly asPending: {
    readonly responder: XcmVersionedLocation;
    readonly maybeMatchQuerier: Option<XcmVersionedLocation>;
    readonly maybeNotify: Option<ITuple<[u8, u8]>>;
    readonly timeout: u32;
  } & Struct;
  readonly isVersionNotifier: boolean;
  readonly asVersionNotifier: {
    readonly origin: XcmVersionedLocation;
    readonly isActive: bool;
  } & Struct;
  readonly isReady: boolean;
  readonly asReady: {
    readonly response: XcmVersionedResponse;
    readonly at: u32;
  } & Struct;
  readonly type: 'Pending' | 'VersionNotifier' | 'Ready';
}

/** @name PalletXcmRemoteLockedFungibleRecord */
export interface PalletXcmRemoteLockedFungibleRecord extends Struct {
  readonly amount: u128;
  readonly owner: XcmVersionedLocation;
  readonly locker: XcmVersionedLocation;
  readonly consumers: Vec<ITuple<[Null, u128]>>;
}

/** @name PalletXcmVersionMigrationStage */
export interface PalletXcmVersionMigrationStage extends Enum {
  readonly isMigrateSupportedVersion: boolean;
  readonly isMigrateVersionNotifiers: boolean;
  readonly isNotifyCurrentTargets: boolean;
  readonly asNotifyCurrentTargets: Option<Bytes>;
  readonly isMigrateAndNotifyOldTargets: boolean;
  readonly type: 'MigrateSupportedVersion' | 'MigrateVersionNotifiers' | 'NotifyCurrentTargets' | 'MigrateAndNotifyOldTargets';
}

/** @name PolkadotCorePrimitivesInboundDownwardMessage */
export interface PolkadotCorePrimitivesInboundDownwardMessage extends Struct {
  readonly sentAt: u32;
  readonly msg: Bytes;
}

/** @name PolkadotCorePrimitivesInboundHrmpMessage */
export interface PolkadotCorePrimitivesInboundHrmpMessage extends Struct {
  readonly sentAt: u32;
  readonly data: Bytes;
}

/** @name PolkadotCorePrimitivesOutboundHrmpMessage */
export interface PolkadotCorePrimitivesOutboundHrmpMessage extends Struct {
  readonly recipient: u32;
  readonly data: Bytes;
}

/** @name PolkadotPrimitivesV6AbridgedHostConfiguration */
export interface PolkadotPrimitivesV6AbridgedHostConfiguration extends Struct {
  readonly maxCodeSize: u32;
  readonly maxHeadDataSize: u32;
  readonly maxUpwardQueueCount: u32;
  readonly maxUpwardQueueSize: u32;
  readonly maxUpwardMessageSize: u32;
  readonly maxUpwardMessageNumPerCandidate: u32;
  readonly hrmpMaxMessageNumPerCandidate: u32;
  readonly validationUpgradeCooldown: u32;
  readonly validationUpgradeDelay: u32;
  readonly asyncBackingParams: PolkadotPrimitivesV6AsyncBackingAsyncBackingParams;
}

/** @name PolkadotPrimitivesV6AbridgedHrmpChannel */
export interface PolkadotPrimitivesV6AbridgedHrmpChannel extends Struct {
  readonly maxCapacity: u32;
  readonly maxTotalSize: u32;
  readonly maxMessageSize: u32;
  readonly msgCount: u32;
  readonly totalSize: u32;
  readonly mqcHead: Option<H256>;
}

/** @name PolkadotPrimitivesV6AsyncBackingAsyncBackingParams */
export interface PolkadotPrimitivesV6AsyncBackingAsyncBackingParams extends Struct {
  readonly maxCandidateDepth: u32;
  readonly allowedAncestryLen: u32;
}

/** @name PolkadotPrimitivesV6PersistedValidationData */
export interface PolkadotPrimitivesV6PersistedValidationData extends Struct {
  readonly parentHead: Bytes;
  readonly relayParentNumber: u32;
  readonly relayParentStorageRoot: H256;
  readonly maxPovSize: u32;
}

/** @name PolkadotPrimitivesV6UpgradeGoAhead */
export interface PolkadotPrimitivesV6UpgradeGoAhead extends Enum {
  readonly isAbort: boolean;
  readonly isGoAhead: boolean;
  readonly type: 'Abort' | 'GoAhead';
}

/** @name PolkadotPrimitivesV6UpgradeRestriction */
export interface PolkadotPrimitivesV6UpgradeRestriction extends Enum {
  readonly isPresent: boolean;
  readonly type: 'Present';
}

/** @name RedefiRuntimeOriginCaller */
export interface RedefiRuntimeOriginCaller extends Enum {
  readonly isSystem: boolean;
  readonly asSystem: FrameSupportDispatchRawOrigin;
  readonly isVoid: boolean;
  readonly asVoid: SpCoreVoid;
  readonly isPolkadotXcm: boolean;
  readonly asPolkadotXcm: PalletXcmOrigin;
  readonly isCumulusXcm: boolean;
  readonly asCumulusXcm: CumulusPalletXcmOrigin;
  readonly isEthereum: boolean;
  readonly asEthereum: PalletEthereumRawOrigin;
  readonly type: 'System' | 'Void' | 'PolkadotXcm' | 'CumulusXcm' | 'Ethereum';
}

/** @name RedefiRuntimeRuntime */
export interface RedefiRuntimeRuntime extends Null {}

/** @name RedefiRuntimeRuntimeHoldReason */
export interface RedefiRuntimeRuntimeHoldReason extends Null {}

/** @name SpArithmeticArithmeticError */
export interface SpArithmeticArithmeticError extends Enum {
  readonly isUnderflow: boolean;
  readonly isOverflow: boolean;
  readonly isDivisionByZero: boolean;
  readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
}

/** @name SpConsensusAuraSr25519AppSr25519Public */
export interface SpConsensusAuraSr25519AppSr25519Public extends SpCoreSr25519Public {}

/** @name SpCoreEcdsaSignature */
export interface SpCoreEcdsaSignature extends U8aFixed {}

/** @name SpCoreEd25519Signature */
export interface SpCoreEd25519Signature extends U8aFixed {}

/** @name SpCoreSr25519Public */
export interface SpCoreSr25519Public extends U8aFixed {}

/** @name SpCoreSr25519Signature */
export interface SpCoreSr25519Signature extends U8aFixed {}

/** @name SpCoreVoid */
export interface SpCoreVoid extends Null {}

/** @name SpRuntimeDigest */
export interface SpRuntimeDigest extends Struct {
  readonly logs: Vec<SpRuntimeDigestDigestItem>;
}

/** @name SpRuntimeDigestDigestItem */
export interface SpRuntimeDigestDigestItem extends Enum {
  readonly isOther: boolean;
  readonly asOther: Bytes;
  readonly isConsensus: boolean;
  readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
  readonly isSeal: boolean;
  readonly asSeal: ITuple<[U8aFixed, Bytes]>;
  readonly isPreRuntime: boolean;
  readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
  readonly isRuntimeEnvironmentUpdated: boolean;
  readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
}

/** @name SpRuntimeDispatchError */
export interface SpRuntimeDispatchError extends Enum {
  readonly isOther: boolean;
  readonly isCannotLookup: boolean;
  readonly isBadOrigin: boolean;
  readonly isModule: boolean;
  readonly asModule: SpRuntimeModuleError;
  readonly isConsumerRemaining: boolean;
  readonly isNoProviders: boolean;
  readonly isTooManyConsumers: boolean;
  readonly isToken: boolean;
  readonly asToken: SpRuntimeTokenError;
  readonly isArithmetic: boolean;
  readonly asArithmetic: SpArithmeticArithmeticError;
  readonly isTransactional: boolean;
  readonly asTransactional: SpRuntimeTransactionalError;
  readonly isExhausted: boolean;
  readonly isCorruption: boolean;
  readonly isUnavailable: boolean;
  readonly isRootNotAllowed: boolean;
  readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional' | 'Exhausted' | 'Corruption' | 'Unavailable' | 'RootNotAllowed';
}

/** @name SpRuntimeModuleError */
export interface SpRuntimeModuleError extends Struct {
  readonly index: u8;
  readonly error: U8aFixed;
}

/** @name SpRuntimeMultiSignature */
export interface SpRuntimeMultiSignature extends Enum {
  readonly isEd25519: boolean;
  readonly asEd25519: SpCoreEd25519Signature;
  readonly isSr25519: boolean;
  readonly asSr25519: SpCoreSr25519Signature;
  readonly isEcdsa: boolean;
  readonly asEcdsa: SpCoreEcdsaSignature;
  readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
}

/** @name SpRuntimeTokenError */
export interface SpRuntimeTokenError extends Enum {
  readonly isFundsUnavailable: boolean;
  readonly isOnlyProvider: boolean;
  readonly isBelowMinimum: boolean;
  readonly isCannotCreate: boolean;
  readonly isUnknownAsset: boolean;
  readonly isFrozen: boolean;
  readonly isUnsupported: boolean;
  readonly isCannotCreateHold: boolean;
  readonly isNotExpendable: boolean;
  readonly isBlocked: boolean;
  readonly type: 'FundsUnavailable' | 'OnlyProvider' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported' | 'CannotCreateHold' | 'NotExpendable' | 'Blocked';
}

/** @name SpRuntimeTransactionalError */
export interface SpRuntimeTransactionalError extends Enum {
  readonly isLimitReached: boolean;
  readonly isNoLayer: boolean;
  readonly type: 'LimitReached' | 'NoLayer';
}

/** @name SpTrieStorageProof */
export interface SpTrieStorageProof extends Struct {
  readonly trieNodes: BTreeSet<Bytes>;
}

/** @name SpVersionRuntimeVersion */
export interface SpVersionRuntimeVersion extends Struct {
  readonly specName: Text;
  readonly implName: Text;
  readonly authoringVersion: u32;
  readonly specVersion: u32;
  readonly implVersion: u32;
  readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
  readonly transactionVersion: u32;
  readonly stateVersion: u8;
}

/** @name SpWeightsRuntimeDbWeight */
export interface SpWeightsRuntimeDbWeight extends Struct {
  readonly read: u64;
  readonly write: u64;
}

/** @name SpWeightsWeightV2Weight */
export interface SpWeightsWeightV2Weight extends Struct {
  readonly refTime: Compact<u64>;
  readonly proofSize: Compact<u64>;
}

/** @name StagingParachainInfoCall */
export interface StagingParachainInfoCall extends Null {}

/** @name StagingXcmV3MultiLocation */
export interface StagingXcmV3MultiLocation extends Struct {
  readonly parents: u8;
  readonly interior: XcmV3Junctions;
}

/** @name StagingXcmV4Asset */
export interface StagingXcmV4Asset extends Struct {
  readonly id: StagingXcmV4AssetAssetId;
  readonly fun: StagingXcmV4AssetFungibility;
}

/** @name StagingXcmV4AssetAssetFilter */
export interface StagingXcmV4AssetAssetFilter extends Enum {
  readonly isDefinite: boolean;
  readonly asDefinite: StagingXcmV4AssetAssets;
  readonly isWild: boolean;
  readonly asWild: StagingXcmV4AssetWildAsset;
  readonly type: 'Definite' | 'Wild';
}

/** @name StagingXcmV4AssetAssetId */
export interface StagingXcmV4AssetAssetId extends StagingXcmV4Location {}

/** @name StagingXcmV4AssetAssetInstance */
export interface StagingXcmV4AssetAssetInstance extends Enum {
  readonly isUndefined: boolean;
  readonly isIndex: boolean;
  readonly asIndex: Compact<u128>;
  readonly isArray4: boolean;
  readonly asArray4: U8aFixed;
  readonly isArray8: boolean;
  readonly asArray8: U8aFixed;
  readonly isArray16: boolean;
  readonly asArray16: U8aFixed;
  readonly isArray32: boolean;
  readonly asArray32: U8aFixed;
  readonly type: 'Undefined' | 'Index' | 'Array4' | 'Array8' | 'Array16' | 'Array32';
}

/** @name StagingXcmV4AssetAssets */
export interface StagingXcmV4AssetAssets extends Vec<StagingXcmV4Asset> {}

/** @name StagingXcmV4AssetFungibility */
export interface StagingXcmV4AssetFungibility extends Enum {
  readonly isFungible: boolean;
  readonly asFungible: Compact<u128>;
  readonly isNonFungible: boolean;
  readonly asNonFungible: StagingXcmV4AssetAssetInstance;
  readonly type: 'Fungible' | 'NonFungible';
}

/** @name StagingXcmV4AssetWildAsset */
export interface StagingXcmV4AssetWildAsset extends Enum {
  readonly isAll: boolean;
  readonly isAllOf: boolean;
  readonly asAllOf: {
    readonly id: StagingXcmV4AssetAssetId;
    readonly fun: StagingXcmV4AssetWildFungibility;
  } & Struct;
  readonly isAllCounted: boolean;
  readonly asAllCounted: Compact<u32>;
  readonly isAllOfCounted: boolean;
  readonly asAllOfCounted: {
    readonly id: StagingXcmV4AssetAssetId;
    readonly fun: StagingXcmV4AssetWildFungibility;
    readonly count: Compact<u32>;
  } & Struct;
  readonly type: 'All' | 'AllOf' | 'AllCounted' | 'AllOfCounted';
}

/** @name StagingXcmV4AssetWildFungibility */
export interface StagingXcmV4AssetWildFungibility extends Enum {
  readonly isFungible: boolean;
  readonly isNonFungible: boolean;
  readonly type: 'Fungible' | 'NonFungible';
}

/** @name StagingXcmV4Instruction */
export interface StagingXcmV4Instruction extends Enum {
  readonly isWithdrawAsset: boolean;
  readonly asWithdrawAsset: StagingXcmV4AssetAssets;
  readonly isReserveAssetDeposited: boolean;
  readonly asReserveAssetDeposited: StagingXcmV4AssetAssets;
  readonly isReceiveTeleportedAsset: boolean;
  readonly asReceiveTeleportedAsset: StagingXcmV4AssetAssets;
  readonly isQueryResponse: boolean;
  readonly asQueryResponse: {
    readonly queryId: Compact<u64>;
    readonly response: StagingXcmV4Response;
    readonly maxWeight: SpWeightsWeightV2Weight;
    readonly querier: Option<StagingXcmV4Location>;
  } & Struct;
  readonly isTransferAsset: boolean;
  readonly asTransferAsset: {
    readonly assets: StagingXcmV4AssetAssets;
    readonly beneficiary: StagingXcmV4Location;
  } & Struct;
  readonly isTransferReserveAsset: boolean;
  readonly asTransferReserveAsset: {
    readonly assets: StagingXcmV4AssetAssets;
    readonly dest: StagingXcmV4Location;
    readonly xcm: StagingXcmV4Xcm;
  } & Struct;
  readonly isTransact: boolean;
  readonly asTransact: {
    readonly originKind: XcmV2OriginKind;
    readonly requireWeightAtMost: SpWeightsWeightV2Weight;
    readonly call: XcmDoubleEncoded;
  } & Struct;
  readonly isHrmpNewChannelOpenRequest: boolean;
  readonly asHrmpNewChannelOpenRequest: {
    readonly sender: Compact<u32>;
    readonly maxMessageSize: Compact<u32>;
    readonly maxCapacity: Compact<u32>;
  } & Struct;
  readonly isHrmpChannelAccepted: boolean;
  readonly asHrmpChannelAccepted: {
    readonly recipient: Compact<u32>;
  } & Struct;
  readonly isHrmpChannelClosing: boolean;
  readonly asHrmpChannelClosing: {
    readonly initiator: Compact<u32>;
    readonly sender: Compact<u32>;
    readonly recipient: Compact<u32>;
  } & Struct;
  readonly isClearOrigin: boolean;
  readonly isDescendOrigin: boolean;
  readonly asDescendOrigin: StagingXcmV4Junctions;
  readonly isReportError: boolean;
  readonly asReportError: StagingXcmV4QueryResponseInfo;
  readonly isDepositAsset: boolean;
  readonly asDepositAsset: {
    readonly assets: StagingXcmV4AssetAssetFilter;
    readonly beneficiary: StagingXcmV4Location;
  } & Struct;
  readonly isDepositReserveAsset: boolean;
  readonly asDepositReserveAsset: {
    readonly assets: StagingXcmV4AssetAssetFilter;
    readonly dest: StagingXcmV4Location;
    readonly xcm: StagingXcmV4Xcm;
  } & Struct;
  readonly isExchangeAsset: boolean;
  readonly asExchangeAsset: {
    readonly give: StagingXcmV4AssetAssetFilter;
    readonly want: StagingXcmV4AssetAssets;
    readonly maximal: bool;
  } & Struct;
  readonly isInitiateReserveWithdraw: boolean;
  readonly asInitiateReserveWithdraw: {
    readonly assets: StagingXcmV4AssetAssetFilter;
    readonly reserve: StagingXcmV4Location;
    readonly xcm: StagingXcmV4Xcm;
  } & Struct;
  readonly isInitiateTeleport: boolean;
  readonly asInitiateTeleport: {
    readonly assets: StagingXcmV4AssetAssetFilter;
    readonly dest: StagingXcmV4Location;
    readonly xcm: StagingXcmV4Xcm;
  } & Struct;
  readonly isReportHolding: boolean;
  readonly asReportHolding: {
    readonly responseInfo: StagingXcmV4QueryResponseInfo;
    readonly assets: StagingXcmV4AssetAssetFilter;
  } & Struct;
  readonly isBuyExecution: boolean;
  readonly asBuyExecution: {
    readonly fees: StagingXcmV4Asset;
    readonly weightLimit: XcmV3WeightLimit;
  } & Struct;
  readonly isRefundSurplus: boolean;
  readonly isSetErrorHandler: boolean;
  readonly asSetErrorHandler: StagingXcmV4Xcm;
  readonly isSetAppendix: boolean;
  readonly asSetAppendix: StagingXcmV4Xcm;
  readonly isClearError: boolean;
  readonly isClaimAsset: boolean;
  readonly asClaimAsset: {
    readonly assets: StagingXcmV4AssetAssets;
    readonly ticket: StagingXcmV4Location;
  } & Struct;
  readonly isTrap: boolean;
  readonly asTrap: Compact<u64>;
  readonly isSubscribeVersion: boolean;
  readonly asSubscribeVersion: {
    readonly queryId: Compact<u64>;
    readonly maxResponseWeight: SpWeightsWeightV2Weight;
  } & Struct;
  readonly isUnsubscribeVersion: boolean;
  readonly isBurnAsset: boolean;
  readonly asBurnAsset: StagingXcmV4AssetAssets;
  readonly isExpectAsset: boolean;
  readonly asExpectAsset: StagingXcmV4AssetAssets;
  readonly isExpectOrigin: boolean;
  readonly asExpectOrigin: Option<StagingXcmV4Location>;
  readonly isExpectError: boolean;
  readonly asExpectError: Option<ITuple<[u32, XcmV3TraitsError]>>;
  readonly isExpectTransactStatus: boolean;
  readonly asExpectTransactStatus: XcmV3MaybeErrorCode;
  readonly isQueryPallet: boolean;
  readonly asQueryPallet: {
    readonly moduleName: Bytes;
    readonly responseInfo: StagingXcmV4QueryResponseInfo;
  } & Struct;
  readonly isExpectPallet: boolean;
  readonly asExpectPallet: {
    readonly index: Compact<u32>;
    readonly name: Bytes;
    readonly moduleName: Bytes;
    readonly crateMajor: Compact<u32>;
    readonly minCrateMinor: Compact<u32>;
  } & Struct;
  readonly isReportTransactStatus: boolean;
  readonly asReportTransactStatus: StagingXcmV4QueryResponseInfo;
  readonly isClearTransactStatus: boolean;
  readonly isUniversalOrigin: boolean;
  readonly asUniversalOrigin: StagingXcmV4Junction;
  readonly isExportMessage: boolean;
  readonly asExportMessage: {
    readonly network: StagingXcmV4JunctionNetworkId;
    readonly destination: StagingXcmV4Junctions;
    readonly xcm: StagingXcmV4Xcm;
  } & Struct;
  readonly isLockAsset: boolean;
  readonly asLockAsset: {
    readonly asset: StagingXcmV4Asset;
    readonly unlocker: StagingXcmV4Location;
  } & Struct;
  readonly isUnlockAsset: boolean;
  readonly asUnlockAsset: {
    readonly asset: StagingXcmV4Asset;
    readonly target: StagingXcmV4Location;
  } & Struct;
  readonly isNoteUnlockable: boolean;
  readonly asNoteUnlockable: {
    readonly asset: StagingXcmV4Asset;
    readonly owner: StagingXcmV4Location;
  } & Struct;
  readonly isRequestUnlock: boolean;
  readonly asRequestUnlock: {
    readonly asset: StagingXcmV4Asset;
    readonly locker: StagingXcmV4Location;
  } & Struct;
  readonly isSetFeesMode: boolean;
  readonly asSetFeesMode: {
    readonly jitWithdraw: bool;
  } & Struct;
  readonly isSetTopic: boolean;
  readonly asSetTopic: U8aFixed;
  readonly isClearTopic: boolean;
  readonly isAliasOrigin: boolean;
  readonly asAliasOrigin: StagingXcmV4Location;
  readonly isUnpaidExecution: boolean;
  readonly asUnpaidExecution: {
    readonly weightLimit: XcmV3WeightLimit;
    readonly checkOrigin: Option<StagingXcmV4Location>;
  } & Struct;
  readonly type: 'WithdrawAsset' | 'ReserveAssetDeposited' | 'ReceiveTeleportedAsset' | 'QueryResponse' | 'TransferAsset' | 'TransferReserveAsset' | 'Transact' | 'HrmpNewChannelOpenRequest' | 'HrmpChannelAccepted' | 'HrmpChannelClosing' | 'ClearOrigin' | 'DescendOrigin' | 'ReportError' | 'DepositAsset' | 'DepositReserveAsset' | 'ExchangeAsset' | 'InitiateReserveWithdraw' | 'InitiateTeleport' | 'ReportHolding' | 'BuyExecution' | 'RefundSurplus' | 'SetErrorHandler' | 'SetAppendix' | 'ClearError' | 'ClaimAsset' | 'Trap' | 'SubscribeVersion' | 'UnsubscribeVersion' | 'BurnAsset' | 'ExpectAsset' | 'ExpectOrigin' | 'ExpectError' | 'ExpectTransactStatus' | 'QueryPallet' | 'ExpectPallet' | 'ReportTransactStatus' | 'ClearTransactStatus' | 'UniversalOrigin' | 'ExportMessage' | 'LockAsset' | 'UnlockAsset' | 'NoteUnlockable' | 'RequestUnlock' | 'SetFeesMode' | 'SetTopic' | 'ClearTopic' | 'AliasOrigin' | 'UnpaidExecution';
}

/** @name StagingXcmV4Junction */
export interface StagingXcmV4Junction extends Enum {
  readonly isParachain: boolean;
  readonly asParachain: Compact<u32>;
  readonly isAccountId32: boolean;
  readonly asAccountId32: {
    readonly network: Option<StagingXcmV4JunctionNetworkId>;
    readonly id: U8aFixed;
  } & Struct;
  readonly isAccountIndex64: boolean;
  readonly asAccountIndex64: {
    readonly network: Option<StagingXcmV4JunctionNetworkId>;
    readonly index: Compact<u64>;
  } & Struct;
  readonly isAccountKey20: boolean;
  readonly asAccountKey20: {
    readonly network: Option<StagingXcmV4JunctionNetworkId>;
    readonly key: U8aFixed;
  } & Struct;
  readonly isPalletInstance: boolean;
  readonly asPalletInstance: u8;
  readonly isGeneralIndex: boolean;
  readonly asGeneralIndex: Compact<u128>;
  readonly isGeneralKey: boolean;
  readonly asGeneralKey: {
    readonly length: u8;
    readonly data: U8aFixed;
  } & Struct;
  readonly isOnlyChild: boolean;
  readonly isPlurality: boolean;
  readonly asPlurality: {
    readonly id: XcmV3JunctionBodyId;
    readonly part: XcmV3JunctionBodyPart;
  } & Struct;
  readonly isGlobalConsensus: boolean;
  readonly asGlobalConsensus: StagingXcmV4JunctionNetworkId;
  readonly type: 'Parachain' | 'AccountId32' | 'AccountIndex64' | 'AccountKey20' | 'PalletInstance' | 'GeneralIndex' | 'GeneralKey' | 'OnlyChild' | 'Plurality' | 'GlobalConsensus';
}

/** @name StagingXcmV4JunctionNetworkId */
export interface StagingXcmV4JunctionNetworkId extends Enum {
  readonly isByGenesis: boolean;
  readonly asByGenesis: U8aFixed;
  readonly isByFork: boolean;
  readonly asByFork: {
    readonly blockNumber: u64;
    readonly blockHash: U8aFixed;
  } & Struct;
  readonly isPolkadot: boolean;
  readonly isKusama: boolean;
  readonly isWestend: boolean;
  readonly isRococo: boolean;
  readonly isWococo: boolean;
  readonly isEthereum: boolean;
  readonly asEthereum: {
    readonly chainId: Compact<u64>;
  } & Struct;
  readonly isBitcoinCore: boolean;
  readonly isBitcoinCash: boolean;
  readonly isPolkadotBulletin: boolean;
  readonly type: 'ByGenesis' | 'ByFork' | 'Polkadot' | 'Kusama' | 'Westend' | 'Rococo' | 'Wococo' | 'Ethereum' | 'BitcoinCore' | 'BitcoinCash' | 'PolkadotBulletin';
}

/** @name StagingXcmV4Junctions */
export interface StagingXcmV4Junctions extends Enum {
  readonly isHere: boolean;
  readonly isX1: boolean;
  readonly asX1: Vec<Lookup47>;
  readonly isX2: boolean;
  readonly asX2: Vec<Lookup47>;
  readonly isX3: boolean;
  readonly asX3: Vec<Lookup47>;
  readonly isX4: boolean;
  readonly asX4: Vec<Lookup47>;
  readonly isX5: boolean;
  readonly asX5: Vec<Lookup47>;
  readonly isX6: boolean;
  readonly asX6: Vec<Lookup47>;
  readonly isX7: boolean;
  readonly asX7: Vec<Lookup47>;
  readonly isX8: boolean;
  readonly asX8: Vec<Lookup47>;
  readonly type: 'Here' | 'X1' | 'X2' | 'X3' | 'X4' | 'X5' | 'X6' | 'X7' | 'X8';
}

/** @name StagingXcmV4Location */
export interface StagingXcmV4Location extends Struct {
  readonly parents: u8;
  readonly interior: StagingXcmV4Junctions;
}

/** @name StagingXcmV4PalletInfo */
export interface StagingXcmV4PalletInfo extends Struct {
  readonly index: Compact<u32>;
  readonly name: Bytes;
  readonly moduleName: Bytes;
  readonly major: Compact<u32>;
  readonly minor: Compact<u32>;
  readonly patch: Compact<u32>;
}

/** @name StagingXcmV4QueryResponseInfo */
export interface StagingXcmV4QueryResponseInfo extends Struct {
  readonly destination: StagingXcmV4Location;
  readonly queryId: Compact<u64>;
  readonly maxWeight: SpWeightsWeightV2Weight;
}

/** @name StagingXcmV4Response */
export interface StagingXcmV4Response extends Enum {
  readonly isNull: boolean;
  readonly isAssets: boolean;
  readonly asAssets: StagingXcmV4AssetAssets;
  readonly isExecutionResult: boolean;
  readonly asExecutionResult: Option<ITuple<[u32, XcmV3TraitsError]>>;
  readonly isVersion: boolean;
  readonly asVersion: u32;
  readonly isPalletsInfo: boolean;
  readonly asPalletsInfo: Vec<StagingXcmV4PalletInfo>;
  readonly isDispatchResult: boolean;
  readonly asDispatchResult: XcmV3MaybeErrorCode;
  readonly type: 'Null' | 'Assets' | 'ExecutionResult' | 'Version' | 'PalletsInfo' | 'DispatchResult';
}

/** @name StagingXcmV4TraitsOutcome */
export interface StagingXcmV4TraitsOutcome extends Enum {
  readonly isComplete: boolean;
  readonly asComplete: {
    readonly used: SpWeightsWeightV2Weight;
  } & Struct;
  readonly isIncomplete: boolean;
  readonly asIncomplete: {
    readonly used: SpWeightsWeightV2Weight;
    readonly error: XcmV3TraitsError;
  } & Struct;
  readonly isError: boolean;
  readonly asError: {
    readonly error: XcmV3TraitsError;
  } & Struct;
  readonly type: 'Complete' | 'Incomplete' | 'Error';
}

/** @name StagingXcmV4Xcm */
export interface StagingXcmV4Xcm extends Vec<StagingXcmV4Instruction> {}

/** @name XcmDoubleEncoded */
export interface XcmDoubleEncoded extends Struct {
  readonly encoded: Bytes;
}

/** @name XcmV2BodyId */
export interface XcmV2BodyId extends Enum {
  readonly isUnit: boolean;
  readonly isNamed: boolean;
  readonly asNamed: Bytes;
  readonly isIndex: boolean;
  readonly asIndex: Compact<u32>;
  readonly isExecutive: boolean;
  readonly isTechnical: boolean;
  readonly isLegislative: boolean;
  readonly isJudicial: boolean;
  readonly isDefense: boolean;
  readonly isAdministration: boolean;
  readonly isTreasury: boolean;
  readonly type: 'Unit' | 'Named' | 'Index' | 'Executive' | 'Technical' | 'Legislative' | 'Judicial' | 'Defense' | 'Administration' | 'Treasury';
}

/** @name XcmV2BodyPart */
export interface XcmV2BodyPart extends Enum {
  readonly isVoice: boolean;
  readonly isMembers: boolean;
  readonly asMembers: {
    readonly count: Compact<u32>;
  } & Struct;
  readonly isFraction: boolean;
  readonly asFraction: {
    readonly nom: Compact<u32>;
    readonly denom: Compact<u32>;
  } & Struct;
  readonly isAtLeastProportion: boolean;
  readonly asAtLeastProportion: {
    readonly nom: Compact<u32>;
    readonly denom: Compact<u32>;
  } & Struct;
  readonly isMoreThanProportion: boolean;
  readonly asMoreThanProportion: {
    readonly nom: Compact<u32>;
    readonly denom: Compact<u32>;
  } & Struct;
  readonly type: 'Voice' | 'Members' | 'Fraction' | 'AtLeastProportion' | 'MoreThanProportion';
}

/** @name XcmV2Instruction */
export interface XcmV2Instruction extends Enum {
  readonly isWithdrawAsset: boolean;
  readonly asWithdrawAsset: XcmV2MultiassetMultiAssets;
  readonly isReserveAssetDeposited: boolean;
  readonly asReserveAssetDeposited: XcmV2MultiassetMultiAssets;
  readonly isReceiveTeleportedAsset: boolean;
  readonly asReceiveTeleportedAsset: XcmV2MultiassetMultiAssets;
  readonly isQueryResponse: boolean;
  readonly asQueryResponse: {
    readonly queryId: Compact<u64>;
    readonly response: XcmV2Response;
    readonly maxWeight: Compact<u64>;
  } & Struct;
  readonly isTransferAsset: boolean;
  readonly asTransferAsset: {
    readonly assets: XcmV2MultiassetMultiAssets;
    readonly beneficiary: XcmV2MultiLocation;
  } & Struct;
  readonly isTransferReserveAsset: boolean;
  readonly asTransferReserveAsset: {
    readonly assets: XcmV2MultiassetMultiAssets;
    readonly dest: XcmV2MultiLocation;
    readonly xcm: XcmV2Xcm;
  } & Struct;
  readonly isTransact: boolean;
  readonly asTransact: {
    readonly originType: XcmV2OriginKind;
    readonly requireWeightAtMost: Compact<u64>;
    readonly call: XcmDoubleEncoded;
  } & Struct;
  readonly isHrmpNewChannelOpenRequest: boolean;
  readonly asHrmpNewChannelOpenRequest: {
    readonly sender: Compact<u32>;
    readonly maxMessageSize: Compact<u32>;
    readonly maxCapacity: Compact<u32>;
  } & Struct;
  readonly isHrmpChannelAccepted: boolean;
  readonly asHrmpChannelAccepted: {
    readonly recipient: Compact<u32>;
  } & Struct;
  readonly isHrmpChannelClosing: boolean;
  readonly asHrmpChannelClosing: {
    readonly initiator: Compact<u32>;
    readonly sender: Compact<u32>;
    readonly recipient: Compact<u32>;
  } & Struct;
  readonly isClearOrigin: boolean;
  readonly isDescendOrigin: boolean;
  readonly asDescendOrigin: XcmV2MultilocationJunctions;
  readonly isReportError: boolean;
  readonly asReportError: {
    readonly queryId: Compact<u64>;
    readonly dest: XcmV2MultiLocation;
    readonly maxResponseWeight: Compact<u64>;
  } & Struct;
  readonly isDepositAsset: boolean;
  readonly asDepositAsset: {
    readonly assets: XcmV2MultiassetMultiAssetFilter;
    readonly maxAssets: Compact<u32>;
    readonly beneficiary: XcmV2MultiLocation;
  } & Struct;
  readonly isDepositReserveAsset: boolean;
  readonly asDepositReserveAsset: {
    readonly assets: XcmV2MultiassetMultiAssetFilter;
    readonly maxAssets: Compact<u32>;
    readonly dest: XcmV2MultiLocation;
    readonly xcm: XcmV2Xcm;
  } & Struct;
  readonly isExchangeAsset: boolean;
  readonly asExchangeAsset: {
    readonly give: XcmV2MultiassetMultiAssetFilter;
    readonly receive: XcmV2MultiassetMultiAssets;
  } & Struct;
  readonly isInitiateReserveWithdraw: boolean;
  readonly asInitiateReserveWithdraw: {
    readonly assets: XcmV2MultiassetMultiAssetFilter;
    readonly reserve: XcmV2MultiLocation;
    readonly xcm: XcmV2Xcm;
  } & Struct;
  readonly isInitiateTeleport: boolean;
  readonly asInitiateTeleport: {
    readonly assets: XcmV2MultiassetMultiAssetFilter;
    readonly dest: XcmV2MultiLocation;
    readonly xcm: XcmV2Xcm;
  } & Struct;
  readonly isQueryHolding: boolean;
  readonly asQueryHolding: {
    readonly queryId: Compact<u64>;
    readonly dest: XcmV2MultiLocation;
    readonly assets: XcmV2MultiassetMultiAssetFilter;
    readonly maxResponseWeight: Compact<u64>;
  } & Struct;
  readonly isBuyExecution: boolean;
  readonly asBuyExecution: {
    readonly fees: XcmV2MultiAsset;
    readonly weightLimit: XcmV2WeightLimit;
  } & Struct;
  readonly isRefundSurplus: boolean;
  readonly isSetErrorHandler: boolean;
  readonly asSetErrorHandler: XcmV2Xcm;
  readonly isSetAppendix: boolean;
  readonly asSetAppendix: XcmV2Xcm;
  readonly isClearError: boolean;
  readonly isClaimAsset: boolean;
  readonly asClaimAsset: {
    readonly assets: XcmV2MultiassetMultiAssets;
    readonly ticket: XcmV2MultiLocation;
  } & Struct;
  readonly isTrap: boolean;
  readonly asTrap: Compact<u64>;
  readonly isSubscribeVersion: boolean;
  readonly asSubscribeVersion: {
    readonly queryId: Compact<u64>;
    readonly maxResponseWeight: Compact<u64>;
  } & Struct;
  readonly isUnsubscribeVersion: boolean;
  readonly type: 'WithdrawAsset' | 'ReserveAssetDeposited' | 'ReceiveTeleportedAsset' | 'QueryResponse' | 'TransferAsset' | 'TransferReserveAsset' | 'Transact' | 'HrmpNewChannelOpenRequest' | 'HrmpChannelAccepted' | 'HrmpChannelClosing' | 'ClearOrigin' | 'DescendOrigin' | 'ReportError' | 'DepositAsset' | 'DepositReserveAsset' | 'ExchangeAsset' | 'InitiateReserveWithdraw' | 'InitiateTeleport' | 'QueryHolding' | 'BuyExecution' | 'RefundSurplus' | 'SetErrorHandler' | 'SetAppendix' | 'ClearError' | 'ClaimAsset' | 'Trap' | 'SubscribeVersion' | 'UnsubscribeVersion';
}

/** @name XcmV2Junction */
export interface XcmV2Junction extends Enum {
  readonly isParachain: boolean;
  readonly asParachain: Compact<u32>;
  readonly isAccountId32: boolean;
  readonly asAccountId32: {
    readonly network: XcmV2NetworkId;
    readonly id: U8aFixed;
  } & Struct;
  readonly isAccountIndex64: boolean;
  readonly asAccountIndex64: {
    readonly network: XcmV2NetworkId;
    readonly index: Compact<u64>;
  } & Struct;
  readonly isAccountKey20: boolean;
  readonly asAccountKey20: {
    readonly network: XcmV2NetworkId;
    readonly key: U8aFixed;
  } & Struct;
  readonly isPalletInstance: boolean;
  readonly asPalletInstance: u8;
  readonly isGeneralIndex: boolean;
  readonly asGeneralIndex: Compact<u128>;
  readonly isGeneralKey: boolean;
  readonly asGeneralKey: Bytes;
  readonly isOnlyChild: boolean;
  readonly isPlurality: boolean;
  readonly asPlurality: {
    readonly id: XcmV2BodyId;
    readonly part: XcmV2BodyPart;
  } & Struct;
  readonly type: 'Parachain' | 'AccountId32' | 'AccountIndex64' | 'AccountKey20' | 'PalletInstance' | 'GeneralIndex' | 'GeneralKey' | 'OnlyChild' | 'Plurality';
}

/** @name XcmV2MultiAsset */
export interface XcmV2MultiAsset extends Struct {
  readonly id: XcmV2MultiassetAssetId;
  readonly fun: XcmV2MultiassetFungibility;
}

/** @name XcmV2MultiassetAssetId */
export interface XcmV2MultiassetAssetId extends Enum {
  readonly isConcrete: boolean;
  readonly asConcrete: XcmV2MultiLocation;
  readonly isAbstract: boolean;
  readonly asAbstract: Bytes;
  readonly type: 'Concrete' | 'Abstract';
}

/** @name XcmV2MultiassetAssetInstance */
export interface XcmV2MultiassetAssetInstance extends Enum {
  readonly isUndefined: boolean;
  readonly isIndex: boolean;
  readonly asIndex: Compact<u128>;
  readonly isArray4: boolean;
  readonly asArray4: U8aFixed;
  readonly isArray8: boolean;
  readonly asArray8: U8aFixed;
  readonly isArray16: boolean;
  readonly asArray16: U8aFixed;
  readonly isArray32: boolean;
  readonly asArray32: U8aFixed;
  readonly isBlob: boolean;
  readonly asBlob: Bytes;
  readonly type: 'Undefined' | 'Index' | 'Array4' | 'Array8' | 'Array16' | 'Array32' | 'Blob';
}

/** @name XcmV2MultiassetFungibility */
export interface XcmV2MultiassetFungibility extends Enum {
  readonly isFungible: boolean;
  readonly asFungible: Compact<u128>;
  readonly isNonFungible: boolean;
  readonly asNonFungible: XcmV2MultiassetAssetInstance;
  readonly type: 'Fungible' | 'NonFungible';
}

/** @name XcmV2MultiassetMultiAssetFilter */
export interface XcmV2MultiassetMultiAssetFilter extends Enum {
  readonly isDefinite: boolean;
  readonly asDefinite: XcmV2MultiassetMultiAssets;
  readonly isWild: boolean;
  readonly asWild: XcmV2MultiassetWildMultiAsset;
  readonly type: 'Definite' | 'Wild';
}

/** @name XcmV2MultiassetMultiAssets */
export interface XcmV2MultiassetMultiAssets extends Vec<XcmV2MultiAsset> {}

/** @name XcmV2MultiassetWildFungibility */
export interface XcmV2MultiassetWildFungibility extends Enum {
  readonly isFungible: boolean;
  readonly isNonFungible: boolean;
  readonly type: 'Fungible' | 'NonFungible';
}

/** @name XcmV2MultiassetWildMultiAsset */
export interface XcmV2MultiassetWildMultiAsset extends Enum {
  readonly isAll: boolean;
  readonly isAllOf: boolean;
  readonly asAllOf: {
    readonly id: XcmV2MultiassetAssetId;
    readonly fun: XcmV2MultiassetWildFungibility;
  } & Struct;
  readonly type: 'All' | 'AllOf';
}

/** @name XcmV2MultiLocation */
export interface XcmV2MultiLocation extends Struct {
  readonly parents: u8;
  readonly interior: XcmV2MultilocationJunctions;
}

/** @name XcmV2MultilocationJunctions */
export interface XcmV2MultilocationJunctions extends Enum {
  readonly isHere: boolean;
  readonly isX1: boolean;
  readonly asX1: XcmV2Junction;
  readonly isX2: boolean;
  readonly asX2: ITuple<[XcmV2Junction, XcmV2Junction]>;
  readonly isX3: boolean;
  readonly asX3: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
  readonly isX4: boolean;
  readonly asX4: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
  readonly isX5: boolean;
  readonly asX5: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
  readonly isX6: boolean;
  readonly asX6: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
  readonly isX7: boolean;
  readonly asX7: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
  readonly isX8: boolean;
  readonly asX8: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
  readonly type: 'Here' | 'X1' | 'X2' | 'X3' | 'X4' | 'X5' | 'X6' | 'X7' | 'X8';
}

/** @name XcmV2NetworkId */
export interface XcmV2NetworkId extends Enum {
  readonly isAny: boolean;
  readonly isNamed: boolean;
  readonly asNamed: Bytes;
  readonly isPolkadot: boolean;
  readonly isKusama: boolean;
  readonly type: 'Any' | 'Named' | 'Polkadot' | 'Kusama';
}

/** @name XcmV2OriginKind */
export interface XcmV2OriginKind extends Enum {
  readonly isNative: boolean;
  readonly isSovereignAccount: boolean;
  readonly isSuperuser: boolean;
  readonly isXcm: boolean;
  readonly type: 'Native' | 'SovereignAccount' | 'Superuser' | 'Xcm';
}

/** @name XcmV2Response */
export interface XcmV2Response extends Enum {
  readonly isNull: boolean;
  readonly isAssets: boolean;
  readonly asAssets: XcmV2MultiassetMultiAssets;
  readonly isExecutionResult: boolean;
  readonly asExecutionResult: Option<ITuple<[u32, XcmV2TraitsError]>>;
  readonly isVersion: boolean;
  readonly asVersion: u32;
  readonly type: 'Null' | 'Assets' | 'ExecutionResult' | 'Version';
}

/** @name XcmV2TraitsError */
export interface XcmV2TraitsError extends Enum {
  readonly isOverflow: boolean;
  readonly isUnimplemented: boolean;
  readonly isUntrustedReserveLocation: boolean;
  readonly isUntrustedTeleportLocation: boolean;
  readonly isMultiLocationFull: boolean;
  readonly isMultiLocationNotInvertible: boolean;
  readonly isBadOrigin: boolean;
  readonly isInvalidLocation: boolean;
  readonly isAssetNotFound: boolean;
  readonly isFailedToTransactAsset: boolean;
  readonly isNotWithdrawable: boolean;
  readonly isLocationCannotHold: boolean;
  readonly isExceedsMaxMessageSize: boolean;
  readonly isDestinationUnsupported: boolean;
  readonly isTransport: boolean;
  readonly isUnroutable: boolean;
  readonly isUnknownClaim: boolean;
  readonly isFailedToDecode: boolean;
  readonly isMaxWeightInvalid: boolean;
  readonly isNotHoldingFees: boolean;
  readonly isTooExpensive: boolean;
  readonly isTrap: boolean;
  readonly asTrap: u64;
  readonly isUnhandledXcmVersion: boolean;
  readonly isWeightLimitReached: boolean;
  readonly asWeightLimitReached: u64;
  readonly isBarrier: boolean;
  readonly isWeightNotComputable: boolean;
  readonly type: 'Overflow' | 'Unimplemented' | 'UntrustedReserveLocation' | 'UntrustedTeleportLocation' | 'MultiLocationFull' | 'MultiLocationNotInvertible' | 'BadOrigin' | 'InvalidLocation' | 'AssetNotFound' | 'FailedToTransactAsset' | 'NotWithdrawable' | 'LocationCannotHold' | 'ExceedsMaxMessageSize' | 'DestinationUnsupported' | 'Transport' | 'Unroutable' | 'UnknownClaim' | 'FailedToDecode' | 'MaxWeightInvalid' | 'NotHoldingFees' | 'TooExpensive' | 'Trap' | 'UnhandledXcmVersion' | 'WeightLimitReached' | 'Barrier' | 'WeightNotComputable';
}

/** @name XcmV2WeightLimit */
export interface XcmV2WeightLimit extends Enum {
  readonly isUnlimited: boolean;
  readonly isLimited: boolean;
  readonly asLimited: Compact<u64>;
  readonly type: 'Unlimited' | 'Limited';
}

/** @name XcmV2Xcm */
export interface XcmV2Xcm extends Vec<XcmV2Instruction> {}

/** @name XcmV3Instruction */
export interface XcmV3Instruction extends Enum {
  readonly isWithdrawAsset: boolean;
  readonly asWithdrawAsset: XcmV3MultiassetMultiAssets;
  readonly isReserveAssetDeposited: boolean;
  readonly asReserveAssetDeposited: XcmV3MultiassetMultiAssets;
  readonly isReceiveTeleportedAsset: boolean;
  readonly asReceiveTeleportedAsset: XcmV3MultiassetMultiAssets;
  readonly isQueryResponse: boolean;
  readonly asQueryResponse: {
    readonly queryId: Compact<u64>;
    readonly response: XcmV3Response;
    readonly maxWeight: SpWeightsWeightV2Weight;
    readonly querier: Option<StagingXcmV3MultiLocation>;
  } & Struct;
  readonly isTransferAsset: boolean;
  readonly asTransferAsset: {
    readonly assets: XcmV3MultiassetMultiAssets;
    readonly beneficiary: StagingXcmV3MultiLocation;
  } & Struct;
  readonly isTransferReserveAsset: boolean;
  readonly asTransferReserveAsset: {
    readonly assets: XcmV3MultiassetMultiAssets;
    readonly dest: StagingXcmV3MultiLocation;
    readonly xcm: XcmV3Xcm;
  } & Struct;
  readonly isTransact: boolean;
  readonly asTransact: {
    readonly originKind: XcmV2OriginKind;
    readonly requireWeightAtMost: SpWeightsWeightV2Weight;
    readonly call: XcmDoubleEncoded;
  } & Struct;
  readonly isHrmpNewChannelOpenRequest: boolean;
  readonly asHrmpNewChannelOpenRequest: {
    readonly sender: Compact<u32>;
    readonly maxMessageSize: Compact<u32>;
    readonly maxCapacity: Compact<u32>;
  } & Struct;
  readonly isHrmpChannelAccepted: boolean;
  readonly asHrmpChannelAccepted: {
    readonly recipient: Compact<u32>;
  } & Struct;
  readonly isHrmpChannelClosing: boolean;
  readonly asHrmpChannelClosing: {
    readonly initiator: Compact<u32>;
    readonly sender: Compact<u32>;
    readonly recipient: Compact<u32>;
  } & Struct;
  readonly isClearOrigin: boolean;
  readonly isDescendOrigin: boolean;
  readonly asDescendOrigin: XcmV3Junctions;
  readonly isReportError: boolean;
  readonly asReportError: XcmV3QueryResponseInfo;
  readonly isDepositAsset: boolean;
  readonly asDepositAsset: {
    readonly assets: XcmV3MultiassetMultiAssetFilter;
    readonly beneficiary: StagingXcmV3MultiLocation;
  } & Struct;
  readonly isDepositReserveAsset: boolean;
  readonly asDepositReserveAsset: {
    readonly assets: XcmV3MultiassetMultiAssetFilter;
    readonly dest: StagingXcmV3MultiLocation;
    readonly xcm: XcmV3Xcm;
  } & Struct;
  readonly isExchangeAsset: boolean;
  readonly asExchangeAsset: {
    readonly give: XcmV3MultiassetMultiAssetFilter;
    readonly want: XcmV3MultiassetMultiAssets;
    readonly maximal: bool;
  } & Struct;
  readonly isInitiateReserveWithdraw: boolean;
  readonly asInitiateReserveWithdraw: {
    readonly assets: XcmV3MultiassetMultiAssetFilter;
    readonly reserve: StagingXcmV3MultiLocation;
    readonly xcm: XcmV3Xcm;
  } & Struct;
  readonly isInitiateTeleport: boolean;
  readonly asInitiateTeleport: {
    readonly assets: XcmV3MultiassetMultiAssetFilter;
    readonly dest: StagingXcmV3MultiLocation;
    readonly xcm: XcmV3Xcm;
  } & Struct;
  readonly isReportHolding: boolean;
  readonly asReportHolding: {
    readonly responseInfo: XcmV3QueryResponseInfo;
    readonly assets: XcmV3MultiassetMultiAssetFilter;
  } & Struct;
  readonly isBuyExecution: boolean;
  readonly asBuyExecution: {
    readonly fees: XcmV3MultiAsset;
    readonly weightLimit: XcmV3WeightLimit;
  } & Struct;
  readonly isRefundSurplus: boolean;
  readonly isSetErrorHandler: boolean;
  readonly asSetErrorHandler: XcmV3Xcm;
  readonly isSetAppendix: boolean;
  readonly asSetAppendix: XcmV3Xcm;
  readonly isClearError: boolean;
  readonly isClaimAsset: boolean;
  readonly asClaimAsset: {
    readonly assets: XcmV3MultiassetMultiAssets;
    readonly ticket: StagingXcmV3MultiLocation;
  } & Struct;
  readonly isTrap: boolean;
  readonly asTrap: Compact<u64>;
  readonly isSubscribeVersion: boolean;
  readonly asSubscribeVersion: {
    readonly queryId: Compact<u64>;
    readonly maxResponseWeight: SpWeightsWeightV2Weight;
  } & Struct;
  readonly isUnsubscribeVersion: boolean;
  readonly isBurnAsset: boolean;
  readonly asBurnAsset: XcmV3MultiassetMultiAssets;
  readonly isExpectAsset: boolean;
  readonly asExpectAsset: XcmV3MultiassetMultiAssets;
  readonly isExpectOrigin: boolean;
  readonly asExpectOrigin: Option<StagingXcmV3MultiLocation>;
  readonly isExpectError: boolean;
  readonly asExpectError: Option<ITuple<[u32, XcmV3TraitsError]>>;
  readonly isExpectTransactStatus: boolean;
  readonly asExpectTransactStatus: XcmV3MaybeErrorCode;
  readonly isQueryPallet: boolean;
  readonly asQueryPallet: {
    readonly moduleName: Bytes;
    readonly responseInfo: XcmV3QueryResponseInfo;
  } & Struct;
  readonly isExpectPallet: boolean;
  readonly asExpectPallet: {
    readonly index: Compact<u32>;
    readonly name: Bytes;
    readonly moduleName: Bytes;
    readonly crateMajor: Compact<u32>;
    readonly minCrateMinor: Compact<u32>;
  } & Struct;
  readonly isReportTransactStatus: boolean;
  readonly asReportTransactStatus: XcmV3QueryResponseInfo;
  readonly isClearTransactStatus: boolean;
  readonly isUniversalOrigin: boolean;
  readonly asUniversalOrigin: XcmV3Junction;
  readonly isExportMessage: boolean;
  readonly asExportMessage: {
    readonly network: XcmV3JunctionNetworkId;
    readonly destination: XcmV3Junctions;
    readonly xcm: XcmV3Xcm;
  } & Struct;
  readonly isLockAsset: boolean;
  readonly asLockAsset: {
    readonly asset: XcmV3MultiAsset;
    readonly unlocker: StagingXcmV3MultiLocation;
  } & Struct;
  readonly isUnlockAsset: boolean;
  readonly asUnlockAsset: {
    readonly asset: XcmV3MultiAsset;
    readonly target: StagingXcmV3MultiLocation;
  } & Struct;
  readonly isNoteUnlockable: boolean;
  readonly asNoteUnlockable: {
    readonly asset: XcmV3MultiAsset;
    readonly owner: StagingXcmV3MultiLocation;
  } & Struct;
  readonly isRequestUnlock: boolean;
  readonly asRequestUnlock: {
    readonly asset: XcmV3MultiAsset;
    readonly locker: StagingXcmV3MultiLocation;
  } & Struct;
  readonly isSetFeesMode: boolean;
  readonly asSetFeesMode: {
    readonly jitWithdraw: bool;
  } & Struct;
  readonly isSetTopic: boolean;
  readonly asSetTopic: U8aFixed;
  readonly isClearTopic: boolean;
  readonly isAliasOrigin: boolean;
  readonly asAliasOrigin: StagingXcmV3MultiLocation;
  readonly isUnpaidExecution: boolean;
  readonly asUnpaidExecution: {
    readonly weightLimit: XcmV3WeightLimit;
    readonly checkOrigin: Option<StagingXcmV3MultiLocation>;
  } & Struct;
  readonly type: 'WithdrawAsset' | 'ReserveAssetDeposited' | 'ReceiveTeleportedAsset' | 'QueryResponse' | 'TransferAsset' | 'TransferReserveAsset' | 'Transact' | 'HrmpNewChannelOpenRequest' | 'HrmpChannelAccepted' | 'HrmpChannelClosing' | 'ClearOrigin' | 'DescendOrigin' | 'ReportError' | 'DepositAsset' | 'DepositReserveAsset' | 'ExchangeAsset' | 'InitiateReserveWithdraw' | 'InitiateTeleport' | 'ReportHolding' | 'BuyExecution' | 'RefundSurplus' | 'SetErrorHandler' | 'SetAppendix' | 'ClearError' | 'ClaimAsset' | 'Trap' | 'SubscribeVersion' | 'UnsubscribeVersion' | 'BurnAsset' | 'ExpectAsset' | 'ExpectOrigin' | 'ExpectError' | 'ExpectTransactStatus' | 'QueryPallet' | 'ExpectPallet' | 'ReportTransactStatus' | 'ClearTransactStatus' | 'UniversalOrigin' | 'ExportMessage' | 'LockAsset' | 'UnlockAsset' | 'NoteUnlockable' | 'RequestUnlock' | 'SetFeesMode' | 'SetTopic' | 'ClearTopic' | 'AliasOrigin' | 'UnpaidExecution';
}

/** @name XcmV3Junction */
export interface XcmV3Junction extends Enum {
  readonly isParachain: boolean;
  readonly asParachain: Compact<u32>;
  readonly isAccountId32: boolean;
  readonly asAccountId32: {
    readonly network: Option<XcmV3JunctionNetworkId>;
    readonly id: U8aFixed;
  } & Struct;
  readonly isAccountIndex64: boolean;
  readonly asAccountIndex64: {
    readonly network: Option<XcmV3JunctionNetworkId>;
    readonly index: Compact<u64>;
  } & Struct;
  readonly isAccountKey20: boolean;
  readonly asAccountKey20: {
    readonly network: Option<XcmV3JunctionNetworkId>;
    readonly key: U8aFixed;
  } & Struct;
  readonly isPalletInstance: boolean;
  readonly asPalletInstance: u8;
  readonly isGeneralIndex: boolean;
  readonly asGeneralIndex: Compact<u128>;
  readonly isGeneralKey: boolean;
  readonly asGeneralKey: {
    readonly length: u8;
    readonly data: U8aFixed;
  } & Struct;
  readonly isOnlyChild: boolean;
  readonly isPlurality: boolean;
  readonly asPlurality: {
    readonly id: XcmV3JunctionBodyId;
    readonly part: XcmV3JunctionBodyPart;
  } & Struct;
  readonly isGlobalConsensus: boolean;
  readonly asGlobalConsensus: XcmV3JunctionNetworkId;
  readonly type: 'Parachain' | 'AccountId32' | 'AccountIndex64' | 'AccountKey20' | 'PalletInstance' | 'GeneralIndex' | 'GeneralKey' | 'OnlyChild' | 'Plurality' | 'GlobalConsensus';
}

/** @name XcmV3JunctionBodyId */
export interface XcmV3JunctionBodyId extends Enum {
  readonly isUnit: boolean;
  readonly isMoniker: boolean;
  readonly asMoniker: U8aFixed;
  readonly isIndex: boolean;
  readonly asIndex: Compact<u32>;
  readonly isExecutive: boolean;
  readonly isTechnical: boolean;
  readonly isLegislative: boolean;
  readonly isJudicial: boolean;
  readonly isDefense: boolean;
  readonly isAdministration: boolean;
  readonly isTreasury: boolean;
  readonly type: 'Unit' | 'Moniker' | 'Index' | 'Executive' | 'Technical' | 'Legislative' | 'Judicial' | 'Defense' | 'Administration' | 'Treasury';
}

/** @name XcmV3JunctionBodyPart */
export interface XcmV3JunctionBodyPart extends Enum {
  readonly isVoice: boolean;
  readonly isMembers: boolean;
  readonly asMembers: {
    readonly count: Compact<u32>;
  } & Struct;
  readonly isFraction: boolean;
  readonly asFraction: {
    readonly nom: Compact<u32>;
    readonly denom: Compact<u32>;
  } & Struct;
  readonly isAtLeastProportion: boolean;
  readonly asAtLeastProportion: {
    readonly nom: Compact<u32>;
    readonly denom: Compact<u32>;
  } & Struct;
  readonly isMoreThanProportion: boolean;
  readonly asMoreThanProportion: {
    readonly nom: Compact<u32>;
    readonly denom: Compact<u32>;
  } & Struct;
  readonly type: 'Voice' | 'Members' | 'Fraction' | 'AtLeastProportion' | 'MoreThanProportion';
}

/** @name XcmV3JunctionNetworkId */
export interface XcmV3JunctionNetworkId extends Enum {
  readonly isByGenesis: boolean;
  readonly asByGenesis: U8aFixed;
  readonly isByFork: boolean;
  readonly asByFork: {
    readonly blockNumber: u64;
    readonly blockHash: U8aFixed;
  } & Struct;
  readonly isPolkadot: boolean;
  readonly isKusama: boolean;
  readonly isWestend: boolean;
  readonly isRococo: boolean;
  readonly isWococo: boolean;
  readonly isEthereum: boolean;
  readonly asEthereum: {
    readonly chainId: Compact<u64>;
  } & Struct;
  readonly isBitcoinCore: boolean;
  readonly isBitcoinCash: boolean;
  readonly isPolkadotBulletin: boolean;
  readonly type: 'ByGenesis' | 'ByFork' | 'Polkadot' | 'Kusama' | 'Westend' | 'Rococo' | 'Wococo' | 'Ethereum' | 'BitcoinCore' | 'BitcoinCash' | 'PolkadotBulletin';
}

/** @name XcmV3Junctions */
export interface XcmV3Junctions extends Enum {
  readonly isHere: boolean;
  readonly isX1: boolean;
  readonly asX1: XcmV3Junction;
  readonly isX2: boolean;
  readonly asX2: ITuple<[XcmV3Junction, XcmV3Junction]>;
  readonly isX3: boolean;
  readonly asX3: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
  readonly isX4: boolean;
  readonly asX4: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
  readonly isX5: boolean;
  readonly asX5: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
  readonly isX6: boolean;
  readonly asX6: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
  readonly isX7: boolean;
  readonly asX7: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
  readonly isX8: boolean;
  readonly asX8: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
  readonly type: 'Here' | 'X1' | 'X2' | 'X3' | 'X4' | 'X5' | 'X6' | 'X7' | 'X8';
}

/** @name XcmV3MaybeErrorCode */
export interface XcmV3MaybeErrorCode extends Enum {
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly asError: Bytes;
  readonly isTruncatedError: boolean;
  readonly asTruncatedError: Bytes;
  readonly type: 'Success' | 'Error' | 'TruncatedError';
}

/** @name XcmV3MultiAsset */
export interface XcmV3MultiAsset extends Struct {
  readonly id: XcmV3MultiassetAssetId;
  readonly fun: XcmV3MultiassetFungibility;
}

/** @name XcmV3MultiassetAssetId */
export interface XcmV3MultiassetAssetId extends Enum {
  readonly isConcrete: boolean;
  readonly asConcrete: StagingXcmV3MultiLocation;
  readonly isAbstract: boolean;
  readonly asAbstract: U8aFixed;
  readonly type: 'Concrete' | 'Abstract';
}

/** @name XcmV3MultiassetAssetInstance */
export interface XcmV3MultiassetAssetInstance extends Enum {
  readonly isUndefined: boolean;
  readonly isIndex: boolean;
  readonly asIndex: Compact<u128>;
  readonly isArray4: boolean;
  readonly asArray4: U8aFixed;
  readonly isArray8: boolean;
  readonly asArray8: U8aFixed;
  readonly isArray16: boolean;
  readonly asArray16: U8aFixed;
  readonly isArray32: boolean;
  readonly asArray32: U8aFixed;
  readonly type: 'Undefined' | 'Index' | 'Array4' | 'Array8' | 'Array16' | 'Array32';
}

/** @name XcmV3MultiassetFungibility */
export interface XcmV3MultiassetFungibility extends Enum {
  readonly isFungible: boolean;
  readonly asFungible: Compact<u128>;
  readonly isNonFungible: boolean;
  readonly asNonFungible: XcmV3MultiassetAssetInstance;
  readonly type: 'Fungible' | 'NonFungible';
}

/** @name XcmV3MultiassetMultiAssetFilter */
export interface XcmV3MultiassetMultiAssetFilter extends Enum {
  readonly isDefinite: boolean;
  readonly asDefinite: XcmV3MultiassetMultiAssets;
  readonly isWild: boolean;
  readonly asWild: XcmV3MultiassetWildMultiAsset;
  readonly type: 'Definite' | 'Wild';
}

/** @name XcmV3MultiassetMultiAssets */
export interface XcmV3MultiassetMultiAssets extends Vec<XcmV3MultiAsset> {}

/** @name XcmV3MultiassetWildFungibility */
export interface XcmV3MultiassetWildFungibility extends Enum {
  readonly isFungible: boolean;
  readonly isNonFungible: boolean;
  readonly type: 'Fungible' | 'NonFungible';
}

/** @name XcmV3MultiassetWildMultiAsset */
export interface XcmV3MultiassetWildMultiAsset extends Enum {
  readonly isAll: boolean;
  readonly isAllOf: boolean;
  readonly asAllOf: {
    readonly id: XcmV3MultiassetAssetId;
    readonly fun: XcmV3MultiassetWildFungibility;
  } & Struct;
  readonly isAllCounted: boolean;
  readonly asAllCounted: Compact<u32>;
  readonly isAllOfCounted: boolean;
  readonly asAllOfCounted: {
    readonly id: XcmV3MultiassetAssetId;
    readonly fun: XcmV3MultiassetWildFungibility;
    readonly count: Compact<u32>;
  } & Struct;
  readonly type: 'All' | 'AllOf' | 'AllCounted' | 'AllOfCounted';
}

/** @name XcmV3PalletInfo */
export interface XcmV3PalletInfo extends Struct {
  readonly index: Compact<u32>;
  readonly name: Bytes;
  readonly moduleName: Bytes;
  readonly major: Compact<u32>;
  readonly minor: Compact<u32>;
  readonly patch: Compact<u32>;
}

/** @name XcmV3QueryResponseInfo */
export interface XcmV3QueryResponseInfo extends Struct {
  readonly destination: StagingXcmV3MultiLocation;
  readonly queryId: Compact<u64>;
  readonly maxWeight: SpWeightsWeightV2Weight;
}

/** @name XcmV3Response */
export interface XcmV3Response extends Enum {
  readonly isNull: boolean;
  readonly isAssets: boolean;
  readonly asAssets: XcmV3MultiassetMultiAssets;
  readonly isExecutionResult: boolean;
  readonly asExecutionResult: Option<ITuple<[u32, XcmV3TraitsError]>>;
  readonly isVersion: boolean;
  readonly asVersion: u32;
  readonly isPalletsInfo: boolean;
  readonly asPalletsInfo: Vec<XcmV3PalletInfo>;
  readonly isDispatchResult: boolean;
  readonly asDispatchResult: XcmV3MaybeErrorCode;
  readonly type: 'Null' | 'Assets' | 'ExecutionResult' | 'Version' | 'PalletsInfo' | 'DispatchResult';
}

/** @name XcmV3TraitsError */
export interface XcmV3TraitsError extends Enum {
  readonly isOverflow: boolean;
  readonly isUnimplemented: boolean;
  readonly isUntrustedReserveLocation: boolean;
  readonly isUntrustedTeleportLocation: boolean;
  readonly isLocationFull: boolean;
  readonly isLocationNotInvertible: boolean;
  readonly isBadOrigin: boolean;
  readonly isInvalidLocation: boolean;
  readonly isAssetNotFound: boolean;
  readonly isFailedToTransactAsset: boolean;
  readonly isNotWithdrawable: boolean;
  readonly isLocationCannotHold: boolean;
  readonly isExceedsMaxMessageSize: boolean;
  readonly isDestinationUnsupported: boolean;
  readonly isTransport: boolean;
  readonly isUnroutable: boolean;
  readonly isUnknownClaim: boolean;
  readonly isFailedToDecode: boolean;
  readonly isMaxWeightInvalid: boolean;
  readonly isNotHoldingFees: boolean;
  readonly isTooExpensive: boolean;
  readonly isTrap: boolean;
  readonly asTrap: u64;
  readonly isExpectationFalse: boolean;
  readonly isPalletNotFound: boolean;
  readonly isNameMismatch: boolean;
  readonly isVersionIncompatible: boolean;
  readonly isHoldingWouldOverflow: boolean;
  readonly isExportError: boolean;
  readonly isReanchorFailed: boolean;
  readonly isNoDeal: boolean;
  readonly isFeesNotMet: boolean;
  readonly isLockError: boolean;
  readonly isNoPermission: boolean;
  readonly isUnanchored: boolean;
  readonly isNotDepositable: boolean;
  readonly isUnhandledXcmVersion: boolean;
  readonly isWeightLimitReached: boolean;
  readonly asWeightLimitReached: SpWeightsWeightV2Weight;
  readonly isBarrier: boolean;
  readonly isWeightNotComputable: boolean;
  readonly isExceedsStackLimit: boolean;
  readonly type: 'Overflow' | 'Unimplemented' | 'UntrustedReserveLocation' | 'UntrustedTeleportLocation' | 'LocationFull' | 'LocationNotInvertible' | 'BadOrigin' | 'InvalidLocation' | 'AssetNotFound' | 'FailedToTransactAsset' | 'NotWithdrawable' | 'LocationCannotHold' | 'ExceedsMaxMessageSize' | 'DestinationUnsupported' | 'Transport' | 'Unroutable' | 'UnknownClaim' | 'FailedToDecode' | 'MaxWeightInvalid' | 'NotHoldingFees' | 'TooExpensive' | 'Trap' | 'ExpectationFalse' | 'PalletNotFound' | 'NameMismatch' | 'VersionIncompatible' | 'HoldingWouldOverflow' | 'ExportError' | 'ReanchorFailed' | 'NoDeal' | 'FeesNotMet' | 'LockError' | 'NoPermission' | 'Unanchored' | 'NotDepositable' | 'UnhandledXcmVersion' | 'WeightLimitReached' | 'Barrier' | 'WeightNotComputable' | 'ExceedsStackLimit';
}

/** @name XcmV3WeightLimit */
export interface XcmV3WeightLimit extends Enum {
  readonly isUnlimited: boolean;
  readonly isLimited: boolean;
  readonly asLimited: SpWeightsWeightV2Weight;
  readonly type: 'Unlimited' | 'Limited';
}

/** @name XcmV3Xcm */
export interface XcmV3Xcm extends Vec<XcmV3Instruction> {}

/** @name XcmVersionedAssetId */
export interface XcmVersionedAssetId extends Enum {
  readonly isV3: boolean;
  readonly asV3: XcmV3MultiassetAssetId;
  readonly isV4: boolean;
  readonly asV4: StagingXcmV4AssetAssetId;
  readonly type: 'V3' | 'V4';
}

/** @name XcmVersionedAssets */
export interface XcmVersionedAssets extends Enum {
  readonly isV2: boolean;
  readonly asV2: XcmV2MultiassetMultiAssets;
  readonly isV3: boolean;
  readonly asV3: XcmV3MultiassetMultiAssets;
  readonly isV4: boolean;
  readonly asV4: StagingXcmV4AssetAssets;
  readonly type: 'V2' | 'V3' | 'V4';
}

/** @name XcmVersionedLocation */
export interface XcmVersionedLocation extends Enum {
  readonly isV2: boolean;
  readonly asV2: XcmV2MultiLocation;
  readonly isV3: boolean;
  readonly asV3: StagingXcmV3MultiLocation;
  readonly isV4: boolean;
  readonly asV4: StagingXcmV4Location;
  readonly type: 'V2' | 'V3' | 'V4';
}

/** @name XcmVersionedResponse */
export interface XcmVersionedResponse extends Enum {
  readonly isV2: boolean;
  readonly asV2: XcmV2Response;
  readonly isV3: boolean;
  readonly asV3: XcmV3Response;
  readonly isV4: boolean;
  readonly asV4: StagingXcmV4Response;
  readonly type: 'V2' | 'V3' | 'V4';
}

/** @name XcmVersionedXcm */
export interface XcmVersionedXcm extends Enum {
  readonly isV2: boolean;
  readonly asV2: XcmV2Xcm;
  readonly isV3: boolean;
  readonly asV3: XcmV3Xcm;
  readonly isV4: boolean;
  readonly asV4: StagingXcmV4Xcm;
  readonly type: 'V2' | 'V3' | 'V4';
}

export type PHANTOM_DEFAULT = 'default';
