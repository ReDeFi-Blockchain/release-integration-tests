import EtherHelper from "../utils/ether";
import { createTestSuite } from "../utils/fixtureManager";
import SubHelper from "../utils/substrate";

export const it = createTestSuite({
  eth: {
    setup: async () => {
      const testFileName = module.parent?.filename;
      if (!testFileName) throw Error("Cannot determine test name");
      return new EtherHelper(testFileName);
    },
    teardown: async () => {},
  },
  sub: {
    setup: async () => {
      const sub = await SubHelper.init();
      return sub;
    },
    teardown: async () => {},
  },
});
