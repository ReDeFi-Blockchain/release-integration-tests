import { expect } from "chai";
import { ContractTransactionResponse } from "ethers";

export const expectWait = (tx: Promise<ContractTransactionResponse>) => {
  return expect(tx.then((submited) => submited.wait()));
};
