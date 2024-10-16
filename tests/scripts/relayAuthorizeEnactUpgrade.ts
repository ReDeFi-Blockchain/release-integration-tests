import { readFile } from "fs/promises";
import { u8aToHex } from "@polkadot/util";
import SubHelper from "../utils/substrate";
import config from "../utils/config";

const main = async () => {
  const codePath = process.env.CODE_PATH;
  if (!codePath) throw new Error("missing code path argument");

  const code = await readFile(codePath);

  const sub = await SubHelper.init(config.wsEndpointMain);

  const setCodeTx = sub.api.tx.sudo.sudoUncheckedWeight(
    sub.api.tx.system.setCode(u8aToHex(code)),
    {refTime: 0, proofSize: 0}
  );

  await sub.utils.signAndSend(sub.sudo, setCodeTx);

  process.exit(0);
};

main().catch((e) => {
  console.error("~~~~~~~~~~~~~~~~");
  console.error("Error while relayAuthorizeEnactUpgrade.ts");
  console.error("~~~~~~~~~~~~~~~~");

  throw e;
});
