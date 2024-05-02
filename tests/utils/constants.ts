export const NETWORK_CONSTANTS: Record<string, NetworkConstants> = {
  RELAY: {
    NAME: "redefi",
    DECIMALS: 18,
    SYMBOL: "BAX",
    NATIVE_ERC20: "0xFFFFFFFF0000000000000000000000000000BABB",
    GBP: "0xFFFFFFFFBABB0000000000000000000000000010",
    CHAIN_ID: 47803n,
  },
  PARACHAIN: {
    NAME: "redefi",
    DECIMALS: 18,
    SYMBOL: "RED",
    NATIVE_ERC20: "0xFFFFFFFFBABB0000000000000000000000000000",
    GBP: "0xFFFFFFFFBABB0000000000000000000000000010",
    CHAIN_ID: 1899n,
  },
} as const;

export type NetworkConstants = {
  NAME: string;
  DECIMALS: number;
  SYMBOL: string;
  NATIVE_ERC20: `0x${string}`;
  GBP: `0x${string}`;
  CHAIN_ID: bigint;
};
