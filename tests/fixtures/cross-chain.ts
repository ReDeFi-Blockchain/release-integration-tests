import config from "../utils/config";
import EtherHelper from "../utils/evm";
import { createTestSuite } from "../utils/fixtureManager";
import SubHelper from "../utils/substrate";

export const it = createTestSuite({
  ethMain: {
    setup: async () => {
      const testFileName = module.parent?.filename;
      if (!testFileName) throw Error("Cannot determine test name");
      return EtherHelper.init(testFileName, config.rpcEndpointMain);
    },
    teardown: async () => {},
  },
  subMain: {
    setup: async () => {
      return SubHelper.init(config.wsEndpointMain);
    },
    teardown: async () => {},
  },
  ethSibling: {
    setup: async () => {
      const testFileName = module.parent?.filename;
      if (!testFileName) throw Error("Cannot determine test name");
      return EtherHelper.init(testFileName, config.rpcEndpointSibling);
    },
    teardown: async () => {},
  },
  subSibling: {
    setup: async () => {
      return SubHelper.init(config.wsEndpointSibling);
    },
    teardown: async () => {},
  },
});
