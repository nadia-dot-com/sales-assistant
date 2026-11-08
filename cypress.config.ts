import { defineConfig } from "cypress";
import { BETTER_AUTH_URL } from "@/config/env.public";

export default defineConfig({
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    baseUrl: BETTER_AUTH_URL,
    specPattern: "src/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "src/cypress/support/e2e.ts",
    fixturesFolder: "src/cypress/fixtures",
  },
});
