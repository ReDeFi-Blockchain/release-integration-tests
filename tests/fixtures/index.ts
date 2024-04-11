import { ApiPromise } from "@polkadot/api";
import { ERC20Contract, ERC20Contract__factory } from "ABIGEN";
import { config } from "config";
import ethers from "ethers";
import { ADDRESS } from "utils/constants";
import { connectApi } from "utils/utils";

type BaseFixtue = {
  polka: ApiPromise;
  etherProvider: ethers.providers.WebSocketProvider;
  nativeErc20: ERC20Contract;
};

let initialized: boolean;
let polka: ApiPromise;
let etherProvider: ethers.providers.WebSocketProvider;
let nativeErc20: ERC20Contract;

export const loadFixture = async (): Promise<BaseFixtue> => {
  if (initialized) return { polka, etherProvider, nativeErc20 };

  polka = await connectApi(config.wsEndpoint);
  etherProvider = new ethers.providers.WebSocketProvider(config.wsEndpoint);
  nativeErc20 = ERC20Contract__factory.connect(
    ADDRESS.NATIVE_ERC20,
    etherProvider,
  );
  return { polka, etherProvider, nativeErc20 };
};
