import { BigNumber } from "ethers";

const floatPowerTenToBigNumber = (float: number, power: number): BigNumber => {
  let floatString = String(float);
  if (floatString.indexOf(".") < 0)
    return BigNumber.from(floatString + "0".repeat(power));
  for (let i = 0; i < power; i++) {
    const dotIndex = floatString.indexOf(".");
    if (dotIndex < 0) {
      floatString += "0";
    } else if (dotIndex === floatString.length - 2) {
      floatString = floatString.replace(".", "");
    } else {
      floatString =
        floatString.slice(0, dotIndex) +
        floatString.charAt(dotIndex + 1) +
        "." +
        floatString.slice(dotIndex + 2, floatString.length);
    }
  }

  return BigNumber.from(floatString);
};

export const BAX = (float: number) => {
  return floatPowerTenToBigNumber(float, 18);
};
