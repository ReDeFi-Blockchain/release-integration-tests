import { it } from "../../fixtures/standalone";

// Native mint, burn, burnFrom not implemented
describe.skip("Native token burn [negative]", () => {
  it("token owner cannot burn more than balance", () => {
    throw Error("not implemented");
  });

  it("approved account cannot burnFrom an amount exceeding the approved limit", () => {
    throw Error("not implemented");
  });
});
