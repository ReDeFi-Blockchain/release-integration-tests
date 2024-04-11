import globalConfig from "./global";
import localConfig from "./local";

export const config = localConfig
  ? { ...globalConfig, ...localConfig }
  : { ...globalConfig };
