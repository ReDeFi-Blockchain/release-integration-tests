import config from "../utils/config";
import EvmHelper from "../utils/evm";
import { createTestSuite } from "../utils/fixtureManager";

export const it = createTestSuite({
  ethMain: {
    setup: async () => {
      const testFileName = module.parent?.filename;
      if (!testFileName) throw Error("Cannot determine test name");
      return EvmHelper.init(testFileName, config.rpcEndpointMain);
    },
    teardown: () => {},
  },
  ethSibling: {
    setup: async () => {
      const testFileName = module.parent?.filename;
      if (!testFileName) throw Error("Cannot determine test name");
      return EvmHelper.init(testFileName, config.rpcEndpointSibling);
    },
    teardown: () => {},
  },
});
