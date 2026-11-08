import { getServerSession } from "@/features/auth/session/getServerSession";
import { CartPageContent } from "@/features/cart/components/CartPageContent/CartPageContent";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { getSanityPaymentMethods } from "@/sanity/queries/getSanityPaymentMethods";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

export default async function Cart() {
  const [paymentMethods, , session] = await Promise.all([
    getSanityPaymentMethods(),
    getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.cartPage),
    getServerSession(),
  ]);

  return (
    <CartPageContent paymentMethods={paymentMethods} isLoggedIn={!!session} />
  );
}
