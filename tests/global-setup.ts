import fs from "fs/promises";
import path from "path";
import SubHelper from "./utils/polka";
import { BUX } from "./utils/utils";
import EtherHelper from "./utils/ether";

export const setup = async () => {
  const testFiles = await readDirRecursive("__tests__");
  const sub = await SubHelper.init();
  const eth = new EtherHelper();
  let nonce = await sub.account.getNonce(sub.keyrings.alice.address);

  const txs = [];
  for (const file of testFiles) {
    const wallet = eth.getFilenameWallet(file);

    txs.push(
      sub.account.transfer(
        { to: wallet.address, value: BUX(1000) },
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
