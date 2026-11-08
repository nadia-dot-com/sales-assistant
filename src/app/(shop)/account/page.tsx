import { Flex, Heading } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import { styles } from "@/app/(shop)/account/page.styles";
import { LogoutButton } from "@/features/auth/components/LogoutButton/LogoutButton";
import { getServerSession } from "@/features/auth/session/getServerSession";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

export default async function AccountPage() {
  const [t, session] = await Promise.all([
    getTranslations(),
    getServerSession(),
    getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.accountPage),
  ]);

  if (!session) {
    return null;
  }

  return (
    <Flex {...styles.root}>
      <Flex {...styles.content}>
        <Heading>
          {`${t("accountPage.welcome")} ${session.user.firstName} ${session.user.lastName}`}
        </Heading>
        <LogoutButton />
      </Flex>
    </Flex>
  );
}
