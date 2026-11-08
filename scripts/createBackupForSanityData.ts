import "dotenv/config";
import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import type { Category } from "@/lib/category/category.types";
import { getCategories } from "@/sanity/queries/getCategories";
import { getCategoryTree } from "@/sanity/queries/getCategoryTree";
import { getCheckoutContent } from "@/sanity/queries/getCheckoutContent";
import { getCssProperties } from "@/sanity/queries/getCssProperties";
import { getFooterContent } from "@/sanity/queries/getFooterContent";
import { getHeaderLogo } from "@/sanity/queries/getHeaderLogo";
import { getHomePageContent } from "@/sanity/queries/getHomePageContent";
import { getMetadata } from "@/sanity/queries/getMetadata";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { getSanityPaymentMethods } from "@/sanity/queries/getSanityPaymentMethods";
import { TRANSLATION_PAGE_IDS } from "../src/sanity/sanityConstants";

const ROOT_OUTPUT_DIRECTORY = path.join(process.cwd(), "/src/sanity/backup");

async function writeBackupFile(fileName: string, data: unknown) {
  const outputFile = path.join(ROOT_OUTPUT_DIRECTORY, `${fileName}.json`);

  await fs.writeFile(outputFile, `${JSON.stringify(data, null, 2)}\n`);

  return outputFile;
}

async function saveTranslationsFromPageToJson(pageName: string) {
  const translations = await getPageTranslationsFromSanity(pageName);
  await writeBackupFile(pageName, translations);
}

async function backupTranslations() {
  for (const page of Object.values(TRANSLATION_PAGE_IDS)) {
    await saveTranslationsFromPageToJson(page);
  }
}

async function backUpCategories() {
  const categories = await getCategories();
  await writeBackupFile("categories", categories);
}

async function backupCheckoutContent() {
  const checkoutContent = await getCheckoutContent();
  await writeBackupFile("checkoutContent", checkoutContent);
}

async function backupCssProperties() {
  const cssProperties = await getCssProperties();
  await writeBackupFile("cssProperties", cssProperties);
}

async function backupFooterContent() {
  const footerContent = await getFooterContent();
  await writeBackupFile("footerContent", footerContent);
}

async function backupHeaderLogo() {
  const headerLogo = await getHeaderLogo();
  await writeBackupFile("headerLogo", headerLogo);
}

async function backupHomePageContent() {
  const homePageContent = await getHomePageContent();
  await writeBackupFile("homePageContent", homePageContent);
}

async function backupMetaData() {
  const metadata = await getMetadata();
  await writeBackupFile("metadata", metadata);
}

async function backupSanityPaymentMethods() {
  const paymentMethods = await getSanityPaymentMethods();
  await writeBackupFile("paymentMethods", paymentMethods);
}

async function saveCategoryTreeToJson(categoryTreeKey: string) {
  const categoryTree = await getCategoryTree(categoryTreeKey);
  await writeBackupFile(categoryTreeKey, categoryTree);
}

async function backupCategoryTree() {
  const categoriesFile = path.join(ROOT_OUTPUT_DIRECTORY, "categories.json");
  const firstLevelCategories = JSON.parse(
    await fs.readFile(categoriesFile, "utf8"),
  ) as Category[];

  const keysForFirstLevelCategories = firstLevelCategories.map(
    (cat) => cat.key,
  );

  await Promise.all(
    keysForFirstLevelCategories.map((key) => saveCategoryTreeToJson(key)),
  );
}

async function createBackupForSanityData() {
  await fs.mkdir(ROOT_OUTPUT_DIRECTORY, { recursive: true });

  await Promise.all([
    backupTranslations(),
    backUpCategories(),
    backupCheckoutContent(),
    backupCssProperties(),
    backupFooterContent(),
    backupHeaderLogo(),
    backupHomePageContent(),
    backupMetaData(),
    backupSanityPaymentMethods(),
  ]);

  await backupCategoryTree();
}

createBackupForSanityData().catch((error) => {
  console.error("Failed to create Sanity backup:", error);
  process.exit(1);
});
