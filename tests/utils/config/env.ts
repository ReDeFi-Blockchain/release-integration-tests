import { config } from "dotenv";
config();

const getEnvs = () => {
  const { REDEFI_RELAY_HTTP_URL, REDEFI_RELAY_URL } = process.env;

  if (!REDEFI_RELAY_HTTP_URL || !REDEFI_RELAY_URL)
    throw Error("Did you forget to set .env?");

  return {
    REDEFI_RELAY_HTTP_URL,
    REDEFI_RELAY_URL,
  };
};

export const env = getEnvs();
