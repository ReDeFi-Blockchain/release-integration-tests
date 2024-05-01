import config from "../utils/config";
import EtherHelper from "../utils/ether";
import { createTestSuite } from "../utils/fixtureManager";
import SubHelper from "../utils/substrate";

export const it = createTestSuite({
  eth: {
    setup: async () => {
      const testFileName = module.parent?.filename;
      if (!testFileName) throw Error("Cannot determine test name");
      return EtherHelper.init(testFileName, config.wsEndpoint);
    },
    teardown: async () => {},
  },
  sub: {
    setup: async () => {
      return SubHelper.init(config.wsEndpoint);
    },
    teardown: async () => {},
  },
});
