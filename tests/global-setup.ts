import fs from "fs/promises";
import path from "path";
import SubHelper from "./utils/polka";
import { BAX } from "./utils/currency";
import EtherHelper from "./utils/ether";
import { getFilenameWallet } from "./utils/filename-wallet";

export const setup = async () => {
  console.log("💰 depositing funds into the sponsors' accounts...");
  const testFiles = await readDirRecursive("__tests__");
  const sub = await SubHelper.init();
  const eth = new EtherHelper();
  let nonce = await sub.account.getNonce(sub.keyrings.alice.address);

  const txs = [];
  for (const file of testFiles) {
    const wallet = getFilenameWallet(file).connect(eth.provider);

    txs.push(
      sub.account.transfer(
        { to: wallet.address, value: BAX(1000) },
        sub.keyrings.alice,
        { nonce },
      ),
    );
    nonce++;
  }

  await Promise.all(txs).catch((e) => console.log(e));
};

async function readDirRecursive(
  dir: string,
  fileList: string[] = [],
): Promise<string[]> {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.resolve(dir, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await readDirRecursive(filePath, fileList);
    } else if (filePath.endsWith(".spec.ts")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}
