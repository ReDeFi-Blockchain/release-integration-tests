const floatPowerTenToBigInt = (float: number | string, power: number) => {
  const [integerPart, fractionalPart = ""] = float.toString().split(".");
  const shift = Math.min(fractionalPart.length, power);
  let newInteger = integerPart + fractionalPart.substring(0, shift);
  newInteger += "0".repeat(power - shift);

  return BigInt(newInteger);
};

/**
 * Abstract token
 * @param float
 * @param decimals
 * @returns
 */
export const TOKEN = (float: number | string, decimals: number) => floatPowerTenToBigInt(float, decimals);

/**
 * Native token - BAX or RED, 18 decimals
 * @param float
 * @returns
 */
export const NAT = (float: number | string) => TOKEN(float, 18);

/**
 * GBP Asset, 6 decimals
 * @param float
 * @returns
 */
export const GBP = (float: number | string) => TOKEN(float, 6);


export type CurrencyConverter = (float: number | string) => bigint;
