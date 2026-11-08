import { getTranslations } from "next-intl/server";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

interface CampaignPageProps
  extends Omit<PageProps<"/campaigns/[campaignSlug]">, "searchParams"> {}

export default async function CampaignPage({ params }: CampaignPageProps) {
  await getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.campaignPage);
  const t = await getTranslations();
  const { campaignSlug } = await params;

  return (
    <section>
      <h1>{t("campaignPage.welcome")}</h1>
      <h2>{campaignSlug}</h2>
    </section>
  );
}
