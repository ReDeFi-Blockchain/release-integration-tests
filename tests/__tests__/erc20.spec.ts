import { ethers } from "ethers";
import { readFileSync } from "fs";
import { beforeAll, describe, expect, test } from "vitest";
import * as abigen from "../ABIGEN";
import { loadFixture } from "../fixtures";
import EtherHelper from "../utils/ether";
import { BUX } from "../utils/utils";

describe("Redefi EVM Tests", () => {
  let contract: ethers.Contract;
  let erc20Contract: abigen.ERC20Contract;
  let ethReceiver: ethers.Wallet;
  let factory: ethers.ContractFactory;
  const erc20Binary = readFileSync("sol/ETH20/bin/ERC20Contract.bin");
  const erc20Abi = readFileSync("sol/ABI/ERC20Contract.abi");
  let wallet: ethers.Wallet;

  let eth: EtherHelper;

  beforeAll(async () => {
    const helpers = await loadFixture(import.meta.filename);
    eth = helpers.eth;
    wallet = helpers.eth.wallets.donor;
    ethReceiver = await eth.getRandomWallet();

    factory = new ethers.ContractFactory(
      erc20Abi.toString(),
      "0x" + erc20Binary.toString(),
      eth.wallets.donor,
    );
  });

  describe("ERC20", () => {
    test("Should deploy contract", async () => {
      contract = await factory.deploy(wallet.address);
      await contract.deployTransaction.wait();
      const code = await eth.provider.getCode(contract.address);
      erc20Contract = contract as abigen.ERC20Contract;
      expect(code, "the contract code is emtpy").to.be.not.null;
    });

    test("Calls & events", async () => {
      expect(await erc20Contract.decimals()).to.be.equal(18);
      const mintTx = await erc20Contract.mint(wallet.address, BUX(1));
      await mintTx.wait();
      expect(await erc20Contract.balanceOf(wallet.address)).to.deep.equal(
        BUX(1),
      );

      const mintToWalletEventFilter = erc20Contract.filters.Transfer(
        null,
        wallet.address,
      );
      const events = await erc20Contract.queryFilter(mintToWalletEventFilter);
      expect(events.length).to.not.equal(0);

      const transferTx = await erc20Contract.transfer(
        ethReceiver.address,
        BUX(0.5),
        { from: wallet.address },
      );

      const transferReceipt = await transferTx.wait();
      expect(transferReceipt.confirmations).to.be.not.equal(0);

      const walletBalanceAfterTransfer = await erc20Contract.balanceOf(
        wallet.address,
      );
      expect(walletBalanceAfterTransfer).to.deep.equal(BUX(0.5));

      const receiverBalanceAfterTransfer = await erc20Contract.balanceOf(
        ethReceiver.address,
      );
      expect(receiverBalanceAfterTransfer).to.deep.equal(BUX(0.5));
    });
  });
});
