import { deployContract } from "./deploy-contract.js";

const args = process.argv.slice(2);

if (args[0] === "deploy-contract") {
  deployContract()
    .then(() => {
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
