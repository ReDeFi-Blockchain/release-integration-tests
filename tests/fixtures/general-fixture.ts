import config from "../utils/config";
import EtherHelper from "../utils/ether";
import { createTestSuite } from "../utils/fixtureManager";
import SubHelper from "../utils/substrate";

export const it = createTestSuite({
  eth: {
    setup: async () => {
      const testFileName = module.parent?.filename;
      if (!testFileName) throw Error("Cannot determine test name");
      return await EtherHelper.init(testFileName, config.wsEndpoint);
    },
    teardown: async () => {},
  },
  sub: {
    setup: async () => {
      const sub = await SubHelper.init(config.wsEndpoint);
      return sub;
    },
    teardown: async () => {},
  },
});
