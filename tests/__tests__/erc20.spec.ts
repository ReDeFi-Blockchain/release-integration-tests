import { ethers } from "ethers";
import { beforeAll, describe, expect, it } from "vitest";
import { loadFixture } from "../fixtures";
import EtherHelper from "../utils/ether";
import { BAX } from "../utils/currency";
import { ERC20Contract__factory } from "../ABIGEN";

describe("Redefi EVM Tests", () => {
  let ethReceiver: ethers.Wallet;
  let wallet: ethers.Wallet;
  let ERC20Factory: ERC20Contract__factory;
  let eth: EtherHelper;

  beforeAll(async () => {
    const helpers = await loadFixture(import.meta.filename);
    eth = helpers.eth;
    wallet = helpers.eth.donor;
    ethReceiver = await eth.accounts.getRandomWallet();
    ERC20Factory = new ERC20Contract__factory(wallet);
  });

  describe("ERC20", () => {
    it("Should deploy contract", async () => {
      const erc20Contract = await ERC20Factory.deploy(wallet.address);
      await erc20Contract.deployTransaction.wait();
      const code = await eth.provider.getCode(erc20Contract.address);
      expect(code, "the contract code is emtpy").to.be.not.null;
    });

    it("Calls and events", async () => {
      const erc20Contract = await ERC20Factory.deploy(wallet.address);
      const deployReceipt = await erc20Contract.deployTransaction.wait();

      expect(await erc20Contract.decimals()).to.be.equal(18);
      const mintTx = await erc20Contract.mint(wallet.address, BAX(1));
      await mintTx.wait();
      expect(await erc20Contract.balanceOf(wallet.address)).to.deep.equal(
        BAX(1),
      );

      const mintToWalletEventFilter = erc20Contract.filters.Transfer(
        null,
        wallet.address,
      );
      const events = await erc20Contract.queryFilter(
        mintToWalletEventFilter,
        deployReceipt.blockNumber,
      );
      expect(events.length).to.not.equal(0);

      const transferTx = await eth.signAndSend(
        erc20Contract.transfer(ethReceiver.address, BAX(0.5), {
          from: wallet.address,
        }),
      );

      expect(transferTx.receipt.confirmations).to.be.not.equal(0);

      const walletBalanceAfterTransfer = await erc20Contract.balanceOf(
        wallet.address,
      );
      expect(walletBalanceAfterTransfer).to.deep.equal(BAX(0.5));

      const receiverBalanceAfterTransfer = await erc20Contract.balanceOf(
        ethReceiver.address,
      );
      expect(receiverBalanceAfterTransfer).to.deep.equal(BAX(0.5));
    });
  });
});
