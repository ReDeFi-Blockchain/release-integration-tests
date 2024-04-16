import EtherHelper from "../utils/ether";
import SubHelper from "../utils/polka";

type BaseFixture = {
  sub: SubHelper;
  eth: EtherHelper;
};

let initialized: boolean;
let sub: SubHelper;
let eth: EtherHelper;

export const loadFixture = async (filename?: string): Promise<BaseFixture> => {
  if (initialized) return { sub, eth };

  sub = await SubHelper.init();
  eth = new EtherHelper(filename);

  initialized = true;
  return { sub, eth };
};
