import { Box } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { styles } from "@/app/(shop)/checkout/page.styles";
import { routes } from "@/config/routes";
import { getServerSession } from "@/features/auth/session/getServerSession";
import { getCustomerAddress } from "@/features/checkout/api/getCustomerAddress";
import { CheckoutContent } from "@/features/checkout/components/CheckoutContent/CheckoutContent";
import { getCheckoutContent } from "@/sanity/queries/getCheckoutContent";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

export default async function CheckoutPage() {
  const [session, checkoutContent] = await Promise.all([
    getServerSession(),
    getCheckoutContent(),
    getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.checkoutPage),
  ]);
  await getTranslations();

  if (!session) {
    redirect(routes.login);
  }

  const { address, version } = await getCustomerAddress(
    session.user.ctCustomerId,
  );

  return (
    <Box {...styles.checkout}>
      <CheckoutContent
        user={session.user}
        addressVersion={version}
        initialAddress={address}
        checkoutContent={checkoutContent}
      />
    </Box>
  );
}
