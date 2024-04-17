import { defineConfig } from "vite";

export default defineConfig({
  test: {
    testTimeout: 100_000,
    globalSetup: "./global-setup.ts",
    setupFiles: './setup-runner.ts',
    globals: true,
  },
  envPrefix: "REDEFI",
});
