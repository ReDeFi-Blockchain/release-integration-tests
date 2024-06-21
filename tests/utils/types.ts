import { ASSET_TYPES } from "./constants";

export type AccountAssetType = (typeof ASSET_TYPES)[number];

export type ERC20Asset = {
  ADDRESS: `0x${string}`;
  NAME: string;
  SYMBOL: string;
  DECIMALS: number;
};

export type AccountBalance = {
  [Asset in AccountAssetType]?: bigint;
};

type AccountAsset = {
  [Asset in AccountAssetType]?: ERC20Asset;
};

export type NetworkConstants = Required<AccountAsset> & {
  CHAIN_ID: bigint;
};

export enum AccountPermissions {
  Empty = 0,
  Mint = 1 << 0,
}
