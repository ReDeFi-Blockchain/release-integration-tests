import fs from "fs/promises";
import path from "path";
import SubHelper from "./utils/substrate";
import { getFilenameWallet } from "./utils/filename-wallet";
import config from "./utils/config";
import { NAT, GBP } from "./utils/currency";
import { ASSETS, NETWORK_CONSTANTS } from "./utils/constants";

export async function mochaGlobalSetup() {
  console.log("💰 depositing funds into the sponsors' accounts...");
  const testFiles = await findTestFiles("__tests__");
  const sub = await SubHelper.init(config.wsEndpoint);

  // Get existing Asset on chain (opposite one to the native token)
  // RED for Relay, BAX for Parachain
  const baxOrRedAddress =
    (await sub.system.getChainId()) === NETWORK_CONSTANTS.RELAY.CHAIN_ID
      ? ASSETS.RED.ADDRESS
      : ASSETS.BAX.ADDRESS;

  // Transfer Native tokens and Assets to "Filename accounts"
  const transferParamsNative = [];
  const transferParamsGBP = [];
  const transferParamsBAXorRED = [];

  for (const file of testFiles) {
    const wallet = getFilenameWallet(file);
    transferParamsNative.push({ to: wallet.address, value: NAT(10000) });
    transferParamsGBP.push({
      to: wallet.address,
      value: GBP(100),
      erc20: ASSETS.GBP.ADDRESS,
    });
    transferParamsBAXorRED.push({
      to: wallet.address,
      value: NAT(100),
      erc20: baxOrRedAddress,
    });
  }

  await sub.account.batchTransferNative(transferParamsNative, sub.donor);
  await sub.account.batchTransferAsset(transferParamsGBP, sub.donor);
  await sub.account.batchTransferAsset(transferParamsBAXorRED, sub.donor);

  console.log("The sponsors' balance has been topped up!");

  process.exit(0);
}

async function findTestFiles(
  dir: string,
  fileList: string[] = [],
): Promise<string[]> {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.resolve(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await findTestFiles(filePath, fileList);
    } else if (filePath.endsWith(".test.ts")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

mochaGlobalSetup().catch((e) => {
  console.error("Something went wrong during global-setup");
  console.error(e);
  throw e;
});
