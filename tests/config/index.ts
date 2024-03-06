import globalConfig  from './global.js';
// @ts-ignore
import localConfig from './local.js';

export const config = localConfig ? { ...globalConfig, ...localConfig } : { ...globalConfig }
