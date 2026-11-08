import { Box, Flex, Heading } from "@chakra-ui/react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { styles } from "@/app/(shop)/page.styles";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { NextImage } from "@/components/atoms/NextImage";
import { getHomePageContent } from "@/sanity/queries/getHomePageContent";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

const TAG = "HomePage";

export async function generateMetadata(): Promise<Metadata> {
  await getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.homePage);
  const t = await getTranslations();

  return {
    title: t("homePage.metadata.title"),
    description: t("homePage.metadata.description"),
  };
}

export default async function HomePage() {
  const [t, content] = await Promise.all([
    getTranslations(),
    getHomePageContent(),
  ]);

  return (
    <Flex {...styles.root}>
      <Box {...styles.bannerWrapper}>
        <NextImage src={content.banner} alt="banner" fill />
      </Box>
      <Flex {...styles.content}>
        <Heading as="h1" {...styles.heading}>
          {t("homePage.title")}
        </Heading>
        <Heading as="h2" {...styles.subheading}>
          {content.description}
        </Heading>
        <ButtonLink
          href="/salesAssistant"
          {...styles.cta}
          data-testid={`${TAG}-go-to-chat`}
        >
          {t("homePage.tryItNow")}
        </ButtonLink>
      </Flex>
    </Flex>
  );
}
