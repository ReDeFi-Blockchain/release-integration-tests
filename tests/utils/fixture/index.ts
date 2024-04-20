import EtherHelper from "../ether";
import SubHelper from "../substrate";

type BaseFixture = {
  eth: EtherHelper;
  sub: SubHelper;
};

let initialized: boolean;
let eth: EtherHelper;
let sub: SubHelper;

export const loadFixture = async (filename: string): Promise<BaseFixture> => {
  if (initialized) return { eth, sub };

  eth = new EtherHelper(filename);
  sub = await SubHelper.init();

  initialized = true;
  return { eth, sub };
};
