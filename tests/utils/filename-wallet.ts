import { ethers } from "hardhat";
import config from "./config";

export const getFilenameWallet = (filename: string) => {
  const bytes = ethers.toUtf8Bytes(filename);
  const id = BigInt(ethers.keccak256(bytes)) % 1000000000n;
  const derivationPath = `m/44'/60'/0'/0/${id}`;

  const wallet = ethers.HDNodeWallet.fromMnemonic(
    config.ethSeed,
    derivationPath,
  );
  return wallet;
};
