import { config } from "dotenv";
config();

const getEnvs = () => {
  const { RPC_URL } = process.env;

  if (!RPC_URL) throw Error("Did you forget to set .env?");

  return {
    RPC_URL,
  };
};

export const env = getEnvs();
