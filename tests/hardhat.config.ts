import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    l1: {
      url: "http://localhost:9699",
      accounts: [],
    },
  },
  paths: {
    tests: "__tests__",
  },
  mocha: {
    timeout: 100000,
  },
};

export default config;
