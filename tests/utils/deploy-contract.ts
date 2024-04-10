/* eslint-disable */
import { readFile } from "fs/promises";
import { ethers } from "ethers";
import { config } from "../config/index.js";
import { evmToAddress } from "@polkadot/util-crypto";
import * as abigen from "../ABIGEN/index.js";
import { connectApi, fromSeed, signTransaction } from "./utils.js";

export const deployContract = async (): Promise<void> => {
  const provider = new ethers.providers.WebSocketProvider(config.wsEndpoint);
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const ethRecevier = ethers.Wallet.createRandom().connect(provider);
  let finalizedBlock = await provider.getBlock("finalized");
  console.log(`finalized block: ${finalizedBlock.number}`);
  const polka = await connectApi(config.wsEndpoint);
  const alice = fromSeed(config.aliceSeed);

  console.log(alice.address);
  console.log(wallet.address);

  const oneToken = 10n ** 18n;
  await signTransaction(
    alice,
    polka.tx.balances.transferKeepAlive(
      evmToAddress(wallet.address),
      3000n * oneToken,
    ),
    "api.tx.balances.transfer",
  );

  const erc20Binary = await readFile("sol/ETH20/bin/ERC20Contract.bin");
  const erc20Abi = await readFile("sol/ABI/ERC20Contract.abi");

  const factory = new ethers.ContractFactory(
    JSON.parse(erc20Abi.toString()),
    "0x" + erc20Binary.toString(),
    wallet,
  );
  const contract = await factory.deploy(wallet.address);
  await contract.deployTransaction.wait();
  console.log(`ERC20 contract address: ${contract.address}`);

  const typizedErc20Contract = contract as any as abigen.ERC20Contract;

  finalizedBlock = await provider.getBlock("finalized");
  const lastBlock = await provider.getBlockNumber();
  console.log(
    `finalized block after contract deployment: ${finalizedBlock.number}`,
  );
  console.log(`last block: ${lastBlock}`);
  console.log(`transaction hash: \n ${contract.deployTransaction.hash}`);
  const tr = await provider.getTransaction(contract.deployTransaction.hash);
  console.log(
    `tr confirmations : ${tr.confirmations}\ntr block: ${tr.blockNumber}`,
  );
  console.log("\n ***Contract calls***\n");

  console.log(`Contract decimals: ${await contract.decimals()}`);

  const mintTx = await typizedErc20Contract.mint(wallet.address, oneToken);
  const mintReceipt = await mintTx.wait();
  const transferToWalletEventFilter = typizedErc20Contract.filters.Transfer(
    null,
    wallet.address,
  );
  const events = await typizedErc20Contract.queryFilter(
    transferToWalletEventFilter,
  );

  console.log(events);
  console.log(
    `Mint to ${wallet.address}:
    tx hash: ${mintTx.hash} || confirmations: ${mintReceipt.confirmations} || block number: ${mintReceipt.blockNumber}`,
  );

  const balanceAfterMint = (
    await typizedErc20Contract.balanceOf(wallet.address)
  ).toBigInt();

  console.log(
    `Balance for ${wallet.address}:  ${balanceAfterMint}.
    Is expected value: ${balanceAfterMint == oneToken}`,
  );

  const halfToken = oneToken / 2n;
  const transferTx = await typizedErc20Contract.transfer(
    ethRecevier.address,
    halfToken,
    { from: wallet.address },
  );

  const transferReceipt = await transferTx.wait();

  const walletBalanceAftertransfer = (
    await typizedErc20Contract.balanceOf(wallet.address)
  ).toBigInt();

  const receiverBalanceAfterTransfer = (
    await typizedErc20Contract.balanceOf(ethRecevier.address)
  ).toBigInt();

  console.log(
    `Balance for wallet(${
      wallet.address
    }) after transfer:  ${walletBalanceAftertransfer}.
    Balance for ethReceiver(${
      ethRecevier.address
    }): ${receiverBalanceAfterTransfer}
    Is expected values: ${
      walletBalanceAftertransfer == halfToken &&
      receiverBalanceAfterTransfer == halfToken
    }`,
  );
  await polka.disconnect();
};
