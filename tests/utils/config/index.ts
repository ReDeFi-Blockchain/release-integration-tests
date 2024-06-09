import { Mnemonic } from "ethers";
import { env } from "./env";

const getConfig = () => {
  const rpcUrl = env.RPC_URL.replace("https://", "")
    .replace("http://", "")
    .replace("wss://", "")
    .replace("ws://", "");

  const wsEndpoint = `ws://${rpcUrl}`;
  const rpcEndpoint = `http://${rpcUrl}`;

  return {
    wsEndpoint,
    rpcEndpoint,
    ethSeed: Mnemonic.fromPhrase(
      "test test test test test test test test test test test junk",
    ),
  };
};

export default getConfig();
