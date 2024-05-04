import { HDNodeWallet } from "ethers";
import { NAT } from "../utils/currency";
import { ethers } from "hardhat";
import { TestERC20__factory } from "../typechain-types";
import { expect } from "chai";
import { it } from "../fixtures/general-fixture";

describe("Redefi EVM Tests", () => {
  let ethReceiver: HDNodeWallet;
  let ERC20Factory: TestERC20__factory;

  it.before(async ({ eth }) => {
    ethReceiver = await eth.accounts.generate();
    ERC20Factory = await ethers.getContractFactory("TestERC20");
  });

  describe("ERC20", () => {
    it("Should deploy contract", async ({ eth }) => {
      const erc20Contract = await ERC20Factory.deploy(eth.donor.address).then(
        (c) => c.waitForDeployment(),
      );
      const code = await eth.provider.getCode(await erc20Contract.getAddress());
      expect(code, "the contract code is emtpy").to.be.not.null;
    });

    it("Calls and events", async ({ eth }) => {
      const erc20Contract = await ERC20Factory.connect(eth.donor)
        .deploy(eth.donor.address)
        .then((c) => c.waitForDeployment());

      expect(await erc20Contract.decimals()).to.be.equal(18);
      const mintTx = await erc20Contract.mint(eth.donor.address, NAT(1));
      await mintTx.wait();
      expect(await erc20Contract.balanceOf(eth.donor.address)).to.equal(NAT(1));

      const mintToWalletEventFilter = erc20Contract.filters.Transfer(
        undefined,
        eth.donor.address,
      );
      const events = await erc20Contract.queryFilter(
        mintToWalletEventFilter,
        erc20Contract.deploymentTransaction()!.blockNumber!,
      );
      expect(events.length).to.not.equal(0);

      const transferTx = await eth.signAndSend(
        erc20Contract.transfer(ethReceiver.address, NAT(0.5), {
          from: eth.donor.address,
        }),
      );

      expect(await transferTx.receipt.confirmations()).to.be.not.equal(0);

      const walletBalanceAfterTransfer = await erc20Contract.balanceOf(
        eth.donor.address,
      );
      expect(walletBalanceAfterTransfer).to.equal(NAT(0.5));

      const receiverBalanceAfterTransfer = await erc20Contract.balanceOf(
        ethReceiver.address,
      );
      expect(receiverBalanceAfterTransfer).to.equal(NAT(0.5));
    });
  });
});
