const floatPowerTenToBigInt = (
  float: number | string,
  power: number,
): bigint => {
  let floatString = float.toString();
  if (floatString.indexOf(".") < 0)
    return BigInt(floatString + "0".repeat(power));
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

  return BigInt(floatString);
};

export const BAX = (float: number | string) => {
  return floatPowerTenToBigInt(float, 18);
};
