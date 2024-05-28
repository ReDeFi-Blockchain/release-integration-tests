import { Mnemonic } from "ethers";
import { env } from "./env";

const getConfig = () => {
  return {
    wsEndpoint: env.WS_URL,
    rpcEndpoint: env.HTTP_URL,
    ethSeed: Mnemonic.fromPhrase(
      "test test test test test test test test test test test junk",
    ),
  };
};

export default getConfig();
