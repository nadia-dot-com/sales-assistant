import fs from "node:fs";
import path from "node:path";

const TRANSLATION_FILE_NAME = "translation.yaml";
const IGNORED_DIRS = new Set(["node_modules", ".git", ".next"]);

export function findTranslationsFiles(rootDir: string): string[] {
  const result: string[] = [];

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (IGNORED_DIRS.has(entry.name)) continue;
        walk(path.join(dir, entry.name));
      } else if (entry.name === TRANSLATION_FILE_NAME) {
        result.push(path.join(dir, entry.name));
      }
    }
  };

  walk(rootDir);

  return result;
}
