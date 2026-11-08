import fs from "node:fs";
import path from "node:path";
import { getEnv } from "../src/config/getEnv";

require("dotenv").config({ path: ".env.local" });
const fixturesDir = path.join(process.cwd(), "src/cypress/fixtures");

const users = {
  employee: {
    firstName: getEnv("E2E_EMPLOYEE_FIRST_NAME"),
    lastName: getEnv("E2E_EMPLOYEE_LAST_NAME"),
    email: getEnv("E2E_EMPLOYEE_EMAIL"),
    password: getEnv("E2E_EMPLOYEE_PASSWORD"),
  },
  unauthorizedUser: {
    firstName: getEnv("E2E_USER_FIRST_NAME"),
    lastName: getEnv("E2E_USER_LAST_NAME"),
    email: getEnv("E2E_USER_EMAIL"),
    password: getEnv("E2E_USER_PASSWORD"),
  },
};

fs.mkdirSync(fixturesDir, { recursive: true });

for (const [name, user] of Object.entries(users)) {
  const outputPath = path.join(fixturesDir, `${name}.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify(user, null, 2)}\n`);
}
