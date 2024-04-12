import { env } from "./env";

const getConfig = () => {
  return {
    wsEndpoint: env.REDEFI_RELAY_URL,
    rpcEndpoint: env.REDEFI_RELAY_HTTP_URL,
    appHost: env.REDEFI_RELAY_HTTP_URL,
    aliceSeed: "//Alice",
    bobSeed: "//Bob",
    charlieSeed: "//Charlie",
  };
};

export default getConfig();
