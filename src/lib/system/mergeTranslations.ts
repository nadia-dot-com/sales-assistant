import { findTranslationsFiles } from "@/lib/helpers/findTranslationsFiles";
import {
  type NestedTranslation,
  parseTranslationsFile,
} from "@/lib/system/parseTranslationsToJson";

function deepMerge(target: NestedTranslation, source: NestedTranslation) {
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === "object" && typeof target[key] === "object") {
      deepMerge(target[key] as NestedTranslation, value as NestedTranslation);
    } else {
      target[key] = value;
    }
  }
}

export default function mergeTranslations(rootDir: string): string {
  const result: NestedTranslation = {};

  for (const filePath of findTranslationsFiles(rootDir)) {
    deepMerge(result, parseTranslationsFile(filePath));
  }

  return JSON.stringify(result, null, 2);
}
