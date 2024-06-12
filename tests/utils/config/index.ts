import { Mnemonic } from "ethers";
import { env } from "./env";

const getConfig = () => {
  const { CROSSCHAIN, RPC_URL_MAIN, RPC_URL_SIBLING } = env;

  const protocolRegexp = /^(http:\/\/|https:\/\/|ws:\/\/|wss:\/\/)/;

  const rpcMain = RPC_URL_MAIN.replace(protocolRegexp, "");
  const rpcSibling = RPC_URL_SIBLING.replace(protocolRegexp, "");

  return {
    isCrosschain: CROSSCHAIN,
    wsEndpointMain: `ws://${rpcMain}`,
    rpcEndpointMain: `http://${rpcMain}`,
    wsEndpointSibling: `ws://${rpcSibling}`,
    rpcEndpointSibling: `http://${rpcSibling}`,
    ethSeed: Mnemonic.fromPhrase(
      "test test test test test test test test test test test junk",
    ),
  };
};

export default getConfig();
