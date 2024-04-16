import { defineConfig } from "vite";

export default defineConfig({
  test: {
    testTimeout: 100_000,
    globalSetup: "./global-setup.ts",
  },
  envPrefix: "REDEFI",
});
