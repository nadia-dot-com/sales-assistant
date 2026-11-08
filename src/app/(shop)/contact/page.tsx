import { getTranslations } from "next-intl/server";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

export default async function Contact() {
  await getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.contactPage);
  const t = await getTranslations();

  return <h1>{t("contactPage.title")}</h1>;
}
