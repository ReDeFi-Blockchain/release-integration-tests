import globalConfig from "./global.js";
import localConfig from "./local.js";

export const config = localConfig
  ? { ...globalConfig, ...localConfig }
  : { ...globalConfig };
