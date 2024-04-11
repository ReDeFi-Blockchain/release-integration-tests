import { config } from "dotenv";
config();

const getConfig = () => {
  const { REDEFI_RELAY_URL, REDEFI_RELAY_HTTP_URL } = process.env;

  if (!REDEFI_RELAY_URL || !REDEFI_RELAY_HTTP_URL)
    throw Error("Did you forget to set .env?");

  return {
    wsEndpoint: REDEFI_RELAY_URL,
    rpcEndpoint: REDEFI_RELAY_HTTP_URL,
    appHost: REDEFI_RELAY_HTTP_URL,
    aliceSeed: "//Alice",
    bobSeed: "//Bob",
    charlieSeed: "//Charlie",
  };
};

export default getConfig();
