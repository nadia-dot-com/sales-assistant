import { getTranslations } from "next-intl/server";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

interface OrderPageProps
  extends Omit<PageProps<"/order/[orderId]">, "searchParams"> {}

export default async function OrderPage({ params }: OrderPageProps) {
  await getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.orderPage);
  const t = await getTranslations();
  const { orderId } = await params;

  return (
    <div>
      {t("orderPage.orderNumber")}

      <h2>{orderId.slice(0, 5)}</h2>
    </div>
  );
}
