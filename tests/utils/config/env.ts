import { config } from "dotenv";
config();

const getEnvs = () => {
  const { CROSSCHAIN, RPC_URL_MAIN, RPC_URL_SIBLING } = process.env;

  if (!CROSSCHAIN || !RPC_URL_MAIN)
    throw Error("env.ts: Did you forget to set .env?");

  const isCrosschain = CROSSCHAIN === "true";

  if (isCrosschain && !RPC_URL_SIBLING)
    throw Error(
      "env.ts: for the CROSSCHAIN tests RPC_URL_SIBLING should be set",
    );

  if (RPC_URL_MAIN === RPC_URL_SIBLING)
    throw Error(
      "env.ts: RPC_URL_MAIN and RPC_URL_SIBLING should not be the same",
    );

  return {
    CROSSCHAIN: isCrosschain,
    RPC_URL_MAIN,
    RPC_URL_SIBLING,
  };
};

export const env = getEnvs();
