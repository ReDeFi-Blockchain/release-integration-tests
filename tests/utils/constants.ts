import { ERC20Asset, NetworkConstants } from "./types";

export const ASSETS: Record<string, ERC20Asset> = {
  BAX: {
    ADDRESS: "0xFFFFFFFF0000000000000000000000000000BABB",
    NAME: "redefi",
    SYMBOL: "BAX",
    DECIMALS: 18,
  },
  RED: {
    ADDRESS: "0xFFFFFFFFBABB0000000000000000000000000000",
    NAME: "redefi",
    SYMBOL: "RED",
    DECIMALS: 18,
  },
  GBP: {
    ADDRESS: "0xFFFFFFFFBABB0000000000000000000000000010",
    NAME: "Onchain GBP",
    SYMBOL: "GBP",
    DECIMALS: 6,
  },
} as const;

export const NETWORK_CONSTANTS: Record<string, NetworkConstants> = {
  RELAY: {
    CHAIN_ID: 47803n,
    NATIVE: ASSETS.BAX,
    SIBLING: ASSETS.RED,
    GBP: ASSETS.GBP,
  },
  PARACHAIN: {
    CHAIN_ID: 1899n,
    NATIVE: ASSETS.RED,
    SIBLING: ASSETS.BAX,
    GBP: ASSETS.GBP,
  },
} as const;

export const ASSET_TYPES = ["NATIVE", "SIBLING", "GBP"] as const;
