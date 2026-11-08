import "server-only";
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { load } from "js-yaml";
import { findTranslationsFiles } from "@/lib/helpers/findTranslationsFiles";
import { client } from "@/sanity/client";

const ROOT_DIRECTORY = path.join(process.cwd(), "src/app");

type KeyReference = {
  _key: string;
  _type: "reference";
  _ref: string;
};

function mergeExistingTranslationsWithCurrentTranslations(
  existingKeysByPage: Map<string, KeyReference[]>,
  pageName: string,
) {
  const mergedKeys = new Map<string, KeyReference>();

  for (const existingKey of existingKeysByPage.get(pageName) ?? []) {
    mergedKeys.set(existingKey._ref, existingKey);
  }
  return mergedKeys;
}

function splitTranslationsToIndividualPages(entries: [string, string][]) {
  const pagesMap = new Map<string, [string, string][]>();

  for (const entry of entries) {
    const pageName = entry[0].split(".")[0];
    const pageEntries = pagesMap.get(pageName) ?? [];
    pageEntries.push(entry);
    pagesMap.set(pageName, pageEntries);
  }

  return pagesMap;
}

async function insertTranslationsToSanity(
  translations: Record<string, string>,
) {
  const entries = Object.entries(translations);

  const pagesNamesWithTranslations =
    splitTranslationsToIndividualPages(entries);

  const existingPages = await client.fetch<
    { _id: string; keys?: KeyReference[] }[]
  >('*[_type == "translationPage"]{ _id, keys }');

  const existingKeysByPage = new Map(
    existingPages.map((page) => [page._id, page.keys ?? []]),
  );

  const tx = entries.reduce(
    (transaction, [key, value]) =>
      transaction
        .createIfNotExists({
          _id: key,
          _type: "translationKey",
          key,
        })
        .patch(key, (patch) =>
          patch.set({ key, originalTranslation: value, obsolete: false }),
        ),
    client.transaction(),
  );

  for (const [pageName, pageTranslationsValues] of pagesNamesWithTranslations) {
    const mergedKeys = mergeExistingTranslationsWithCurrentTranslations(
      existingKeysByPage,
      pageName,
    );

    for (const [key] of pageTranslationsValues) {
      mergedKeys.set(key, {
        _key: key,
        _type: "reference",
        _ref: key,
      });
    }

    tx.createOrReplace({
      _id: `${pageName}`,
      _type: "translationPage",
      title: `${pageName}`,
      keys: [...mergedKeys.values()],
    });
  }

  await tx.commit();
}

async function markObsoleteTranslations(activeKeys: string[]) {
  const obsoleteKeys = await client.fetch<string[]>(
    '*[_type == "translationKey" && !(_id in $activeKeys)]._id',
    { activeKeys },
  );

  if (obsoleteKeys.length === 0) return;

  const tx = obsoleteKeys.reduce(
    (transaction, id) =>
      transaction.patch(id, (patch) => patch.set({ obsolete: true })),
    client.transaction(),
  );

  await tx.commit();
}

async function syncTranslations() {
  const translations: Record<string, string> = {};

  for (const filePath of findTranslationsFiles(ROOT_DIRECTORY)) {
    const rawContents = fs.readFileSync(filePath, "utf8");
    const parsed = (rawContents.trim() ? load(rawContents) : {}) as Record<
      string,
      string
    >;

    Object.assign(translations, parsed);
  }

  await insertTranslationsToSanity(translations);
  await markObsoleteTranslations(Object.keys(translations));
}

syncTranslations();
