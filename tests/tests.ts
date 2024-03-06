import { readFileSync } from "fs";
import { ethers } from "ethers";
import { config } from "./config/index.js";
import { evmToAddress } from "@polkadot/util-crypto";
import * as abigen from "./ABIGEN/index.js";
import { connectApi, fromSeed, signTransaction } from "./utils.js";
import { IKeyringPair } from "@polkadot/types/types";
import { ApiPromise } from "@polkadot/api";
import { expect } from "chai";

describe("Redefi EVM Tests", async () => {
  let alice: IKeyringPair;
  let contract: ethers.Contract;
  let typizedErc20Contract: abigen.ERC20Contract;
  let wallet: ethers.Wallet;
  let ethReceiver: ethers.Wallet;
  let provider: ethers.providers.WebSocketProvider;
  let polka: ApiPromise;
  let factory: ethers.ContractFactory;
  const erc20Binary = readFileSync("sol/ETH20/bin/ERC20Contract.bin");
  const erc20Abi = readFileSync("sol/ABI/ERC20Contract.abi");
  const oneToken = 10n ** 18n;
  const halfToken = oneToken / 2n;

  before(async () => {
    expect(config.wsEndpoint).to.be.not.undefined;
    provider = new ethers.providers.WebSocketProvider(config.wsEndpoint);
    wallet = ethers.Wallet.createRandom().connect(provider);
    ethReceiver = ethers.Wallet.createRandom().connect(provider);
    polka = await connectApi(config.wsEndpoint);
    alice = fromSeed(config.aliceSeed);

    factory = new ethers.ContractFactory(
      JSON.parse(erc20Abi.toString()),
      "0x" + erc20Binary.toString(),
      wallet
    );

    await signTransaction(
      alice,
      polka.tx.balances.transferKeepAlive(
        evmToAddress(wallet.address),
        3000n * oneToken
      ),
      "api.tx.balances.transfer"
    );
  });

  after(async () => {
    await polka.disconnect();
    await provider.destroy();
  });

  describe("ERC20", async () => {
    it("Should deploy contract", async () => {
      contract = await factory.deploy(wallet.address);
      await contract.deployTransaction.wait();
      const code = await provider.getCode(contract.address);
      typizedErc20Contract = contract as any as abigen.ERC20Contract;
      expect(code, "the contract code is emtpy").to.be.not.null;
    });

    it("Calls & events", async () => {
      expect(await typizedErc20Contract.decimals()).to.be.equal(18);
      const mintTx = await typizedErc20Contract.mint(wallet.address, oneToken);
      const mintReceipt = await mintTx.wait();
      expect(
        (await typizedErc20Contract.balanceOf(wallet.address)).toBigInt()
      ).to.be.equal(oneToken);

      const mintToWalletEventFilter = typizedErc20Contract.filters.Transfer(
        null,
        wallet.address
      );
      const events = await typizedErc20Contract.queryFilter(
        mintToWalletEventFilter
      );
      expect(events.length).to.not.equal(0);

      const transferTx = await typizedErc20Contract.transfer(
        ethReceiver.address,
        halfToken,
        { from: wallet.address }
      );

      const transferReceipt = await transferTx.wait();
      expect(transferReceipt.confirmations).to.be.not.equal(0);

      const walletBalanceAfterTransfer = (
        await typizedErc20Contract.balanceOf(wallet.address)
      ).toBigInt();
      expect(walletBalanceAfterTransfer).to.be.equal(halfToken);
      const receiverBalanceAfterTransfer = (
        await typizedErc20Contract.balanceOf(ethReceiver.address)
      ).toBigInt();
      expect(receiverBalanceAfterTransfer).to.be.equal(halfToken);
    });
  });
});
