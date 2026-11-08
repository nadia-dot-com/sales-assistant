import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import mergeTranslations from "@/lib/system/mergeTranslations";

require("dotenv").config({ path: ".env.local" });

const rootDir = path.join(process.cwd(), "src/app");
const outputPath = path.join(process.cwd(), `messages/translations.json`);

fs.writeFileSync(outputPath, mergeTranslations(rootDir));
