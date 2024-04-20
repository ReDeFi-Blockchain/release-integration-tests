import { HDNodeWallet } from "ethers";
import EtherHelper from "../utils/ether";
import { BAX } from "../utils/currency";
import { ethers } from "hardhat";
import { TestERC20__factory } from "../typechain-types";
import { loadFixture } from "../utils/fixture";
import { expect } from "chai";

describe("Redefi EVM Tests", () => {
  let ethReceiver: HDNodeWallet;
  let wallet: HDNodeWallet;
  let ERC20Factory: TestERC20__factory;
  let eth: EtherHelper;

  before(async () => {
    const helpers = await loadFixture(__filename);
    eth = helpers.eth;
    wallet = helpers.eth.donor;
    ethReceiver = await eth.accounts.getRandomWallet();
    ERC20Factory = await ethers.getContractFactory("TestERC20");
  });

  describe("ERC20", () => {
    it("Should deploy contract", async () => {
      const erc20Contract = await ERC20Factory.deploy(wallet.address).then(
        (c) => c.waitForDeployment(),
      );
      const code = await eth.provider.getCode(await erc20Contract.getAddress());
      expect(code, "the contract code is emtpy").to.be.not.null;
    });

    it("Calls and events", async () => {
      const erc20Contract = await ERC20Factory.connect(eth.donor)
        .deploy(wallet.address)
        .then((c) => c.waitForDeployment());

      expect(await erc20Contract.decimals()).to.be.equal(18);
      const mintTx = await erc20Contract.mint(wallet.address, BAX(1));
      await mintTx.wait();
      expect(await erc20Contract.balanceOf(wallet.address)).to.deep.equal(
        BAX(1),
      );

      const mintToWalletEventFilter = erc20Contract.filters.Transfer(
        undefined,
        wallet.address,
      );
      const events = await erc20Contract.queryFilter(
        mintToWalletEventFilter,
        erc20Contract.deploymentTransaction()!.blockNumber!,
      );
      expect(events.length).to.not.equal(0);

      const transferTx = await eth.signAndSend(
        erc20Contract.transfer(ethReceiver.address, BAX(0.5), {
          from: wallet.address,
        }),
      );

      expect(await transferTx.receipt.confirmations()).to.be.not.equal(0);

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
