import { config } from "dotenv";
config();

const getEnvs = () => {
  const { CROSSCHAIN, RPC_URL_MAIN, RPC_URL_SIBLING } = process.env;

  if (!CROSSCHAIN || !RPC_URL_MAIN || !RPC_URL_SIBLING)
    throw Error("env.ts: Did you forget to set .env?");

  if (RPC_URL_MAIN === RPC_URL_SIBLING)
    throw Error(
      "env.ts: RPC_URL_MAIN and RPC_URL_SIBLING should not be the same",
    );

  const isCrosschain = CROSSCHAIN === "true";

  return {
    CROSSCHAIN: isCrosschain,
    RPC_URL_MAIN,
    RPC_URL_SIBLING,
  };
};

export const env = getEnvs();
