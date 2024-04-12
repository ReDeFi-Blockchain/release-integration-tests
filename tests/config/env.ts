import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    REDEFI_RELAY_HTTP_URL: z.string().url(),
    REDEFI_RELAY_URL: z.string().url(),
  },
  clientPrefix: "FIX: https://github.com/t3-oss/t3-env/issues/151",
  client: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
