import fs from "node:fs";
import { load } from "js-yaml";

export type NestedTranslation = { [key: string]: string | NestedTranslation };

export function parseTranslationsFile(absPath: string): NestedTranslation {
  const rawContents = fs.readFileSync(absPath, "utf8");
  const flatTranslations = (
    rawContents.trim() ? load(rawContents) : {}
  ) as Record<string, string>;
  const result: NestedTranslation = {};

  for (const [flatKey, value] of Object.entries(flatTranslations)) {
    const segments = flatKey.split(".");
    let node = result;

    segments.forEach((segment, index) => {
      if (index === segments.length - 1) {
        node[segment] = value;
      } else {
        node[segment] = (node[segment] as NestedTranslation) ?? {};
        node = node[segment] as NestedTranslation;
      }
    });
  }

  return result;
}
