import type { TranslationEntry } from "@/sanity/queries/getPageTranslationsFromSanity";

/**
 * Mutates `originalMessages` in place, overwriting the nested value at each
 * `sanityMessages` entry's dotted `key` path with its `value`.
 *
 * @example
 * const originalMessages = { homePage: { welcome: "Welcome" } };
 * const sanityMessages = [{ key: "homePage.welcome", value: "Hej!" }];
 *
 * patchMessage(originalMessages, sanityMessages);
 * // originalMessages is now { homePage: { welcome: "Hej!" } }
 */
export function patchMessages(
  originalMessages: Record<string, unknown>,
  sanityMessages: TranslationEntry[],
) {
  for (const { key, value } of sanityMessages) {
    const keys = key.split(".");
    let current = originalMessages;

    keys.forEach((part, index) => {
      if (index === keys.length - 1) {
        current[part] = value;
      } else {
        if (typeof current[part] !== "object" || current[part] === null) {
          current[part] = {};
        }
        current = current[part] as Record<string, unknown>;
      }
    });
  }
}
