import { ethers } from "ethers";
import config from "../config";

export const getFilenameWallet = (filename: string) => {
  const bytes = ethers.utils.toUtf8Bytes(filename);
  const id = BigInt(ethers.utils.keccak256(bytes)) % 1000000000n;
  const derivationPath = `m/44'/60'/0'/0/${id}`;

  const wallet = ethers.Wallet.fromMnemonic(config.ethSeed, derivationPath);
  return wallet;
};
