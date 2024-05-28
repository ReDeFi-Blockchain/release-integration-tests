import { Mnemonic } from "ethers";
import { env } from "./env";

const getConfig = () => {
  const wsEndpoint = `ws://${env.RPC_URL}`;
  const rpcEndpoint = `http://${env.RPC_URL}`;

  return {
    wsEndpoint,
    rpcEndpoint,
    ethSeed: Mnemonic.fromPhrase(
      "test test test test test test test test test test test junk",
    ),
  };
};

export default getConfig();
