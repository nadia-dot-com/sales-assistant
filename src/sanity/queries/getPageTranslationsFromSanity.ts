import { SANITY_SOURCE } from "@/config/env";
import { LOCALE } from "@/config/env.public";
import { getRequestMessages } from "@/i18n/request";
import { client } from "@/sanity/client";
import { patchMessages } from "@/sanity/utils/patchMessages";

export type TranslationEntry = { key: string; value: string };

export async function getPageTranslationsFromSanity(
  pageId: string,
): Promise<TranslationEntry[]> {
  if (SANITY_SOURCE === "local") {
    const backup = (await import(`@/sanity/backup/${pageId}.json`))
      .default as TranslationEntry[];
    patchMessages(getRequestMessages(), backup);
    return backup;
  }

  const TRANSLATIONS_QUERY = `*[
  _type == "translationPage" &&
  _id == "${pageId}"
  ].keys[
  @->obsolete == false
  ]->{
  key,
  "value": coalesce(
    ${LOCALE},
    originalTranslation
  )
  }`;

  try {
    const pageMessages =
      await client.fetch<TranslationEntry[]>(TRANSLATIONS_QUERY);

    patchMessages(getRequestMessages(), pageMessages);

    return pageMessages;
  } catch (error) {
    console.error(
      "Failed to fetch page translations:",
      error instanceof Error ? error.message : error,
    );

    return [];
  }
}
