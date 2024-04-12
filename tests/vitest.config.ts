import { defineConfig } from "vite";

export default defineConfig({
  test: {
    testTimeout: 100_000,
  },
  envPrefix: "REDEFI",
});
