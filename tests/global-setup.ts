import fs from "fs/promises";
import path from "path";
import SubHelper from "./utils/substrate";
import { getFilenameWallet } from "./utils/filename-wallet";

export async function mochaGlobalSetup() {
  console.log("💰 depositing funds into the sponsors' accounts...");
  const testFiles = await findTestFiles("__tests__");
  const sub = await SubHelper.init();

  const transferParams = [];
  for (const file of testFiles) {
    const wallet = getFilenameWallet(file);
    transferParams.push({ to: wallet.address, value: 10000n * 10n ** 18n });
  }

  await sub.account.batchTransfer(transferParams, sub.donor);

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
    } else if (filePath.endsWith(".spec.ts")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

mochaGlobalSetup();
