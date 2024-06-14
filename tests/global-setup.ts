import fs from "fs/promises";
import path from "path";
import SubHelper from "./utils/substrate";
import { getFilenameWallet } from "./utils/filename-wallet";
import testConfig from "./utils/config";
import testConfig from "./utils/config";
import { NAT, GBP } from "./utils/currency";
import { ASSETS, NETWORK_CONSTANTS } from "./utils/constants";

const testDirectory = "__tests__";
const testName = ".test.ts";
const donorBalance = 100_000;

export async function globalSetup() {
  console.log(">>> 💰 Depositing funds into the sponsors' accounts...");
  const testFiles = await findTestFiles(testDirectory);
  console.log(">>> Found test files:", testFiles.length);

  const availableNetworks = testConfig.isCrosschain
    ? [testConfig.wsEndpointMain, testConfig.wsEndpointSibling]
    : [testConfig.wsEndpointMain];

  for (const network of availableNetworks) {
    const sub = await SubHelper.init(network);
    const [decimals] = sub.api.registry.chainDecimals;
    if (decimals !== 18)
      throw Error(`Bad configuration: decimals should be 18, got ${decimals}`);
const testDirectory = "__tests__";
const testName = ".test.ts";
const donorBalance = 100_000;

export async function globalSetup() {
  console.log(">>> 💰 Depositing funds into the sponsors' accounts...");
  const testFiles = await findTestFiles(testDirectory);
  console.log(">>> Found test files:", testFiles.length);

  const availableNetworks = testConfig.isCrosschain
    ? [testConfig.wsEndpointMain, testConfig.wsEndpointSibling]
    : [testConfig.wsEndpointMain];

  for (const network of availableNetworks) {
    const sub = await SubHelper.init(network);
    const [decimals] = sub.api.registry.chainDecimals;
    if (decimals !== 18)
      throw Error(`Bad configuration: decimals should be 18, got ${decimals}`);

    // Get an existing Asset on chain (opposite one to the native token)
    // RED for L1, BAX for L2
    const chainId = await sub.system.getChainId();
    let baxOrRedAddress: `0x${string}`;
    if (chainId === NETWORK_CONSTANTS.L1.CHAIN_ID)
      baxOrRedAddress = ASSETS.RED.ADDRESS;
    else if (chainId === NETWORK_CONSTANTS.L2.CHAIN_ID)
      baxOrRedAddress = ASSETS.BAX.ADDRESS;
    else throw Error("Unknown Chain ID");
    // Get an existing Asset on chain (opposite one to the native token)
    // RED for L1, BAX for L2
    const chainId = await sub.system.getChainId();
    let baxOrRedAddress: `0x${string}`;
    if (chainId === NETWORK_CONSTANTS.L1.CHAIN_ID)
      baxOrRedAddress = ASSETS.RED.ADDRESS;
    else if (chainId === NETWORK_CONSTANTS.L2.CHAIN_ID)
      baxOrRedAddress = ASSETS.BAX.ADDRESS;
    else throw Error("Unknown Chain ID");

    // Transfer Native tokens and Assets to "Filename accounts"
    const transferParamsNative = [];
    const transferParamsGBP = [];
    const transferParamsBAXorRED = [];
    // Transfer Native tokens and Assets to "Filename accounts"
    const transferParamsNative = [];
    const transferParamsGBP = [];
    const transferParamsBAXorRED = [];

    for (const file of testFiles) {
      const wallet = getFilenameWallet(file);
      transferParamsNative.push({
        to: wallet.address,
        value: NAT(donorBalance),
      });
      transferParamsGBP.push({
        to: wallet.address,
        value: GBP(donorBalance),
        erc20: ASSETS.GBP.ADDRESS,
      });
      transferParamsBAXorRED.push({
        to: wallet.address,
        value: NAT(donorBalance),
        erc20: baxOrRedAddress,
      });
    }
    for (const file of testFiles) {
      const wallet = getFilenameWallet(file);
      transferParamsNative.push({
        to: wallet.address,
        value: NAT(donorBalance),
      });
      transferParamsGBP.push({
        to: wallet.address,
        value: GBP(donorBalance),
        erc20: ASSETS.GBP.ADDRESS,
      });
      transferParamsBAXorRED.push({
        to: wallet.address,
        value: NAT(donorBalance),
        erc20: baxOrRedAddress,
      });
    }

    console.log(`>>> ${chainId}: Topping up sponsors' balances...`);
    await sub.account.batchTransferNative(transferParamsNative, sub.donor);
    await sub.account.batchTransferAsset(transferParamsGBP, sub.donor);
    await sub.account.batchTransferAsset(transferParamsBAXorRED, sub.donor);
    console.log(`>>> ${chainId}: Topping up sponsors' balances...`);
    await sub.account.batchTransferNative(transferParamsNative, sub.donor);
    await sub.account.batchTransferAsset(transferParamsGBP, sub.donor);
    await sub.account.batchTransferAsset(transferParamsBAXorRED, sub.donor);

    console.log(">>> The balances have been topped up!");

    if (testConfig.isCrosschain && chainId === NETWORK_CONSTANTS.L2.CHAIN_ID) {
      console.log(">>> Configuring XCM...");

      const setXcmV3tx = sub.api.tx.sudo.sudo(
        sub.api.tx.polkadotXcm.forceXcmVersion(
          {
            parents: 1,
            interrior: "Here",
          },
          3,
        ),
      );

      await sub.utils.signAndSend(sub.donor, setXcmV3tx);
      console.log(">>> XCM V3 configured");
    }
  }

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
    } else if (filePath.endsWith(testName)) {
    } else if (filePath.endsWith(testName)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

globalSetup().catch((e) => {
globalSetup().catch((e) => {
  console.error("Something went wrong during global-setup");
  console.error(e);
  throw e;
});
