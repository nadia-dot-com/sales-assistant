import { Flex } from "@chakra-ui/react";
import { type PropsWithChildren, Suspense } from "react";
import { styles } from "@/app/(auth)/layout.styles";
import { RedirectBackButton } from "@/components/atoms/RedirectBackButton/RedirectBackButton";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

interface RootLayoutProps extends PropsWithChildren {}

export default async function AuthLayout({ children }: RootLayoutProps) {
  await getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.authLayout);

  return (
    <>
      <Suspense>
        <RedirectBackButton />
      </Suspense>
      <Flex as="main" {...styles.main}>
        {children}
      </Flex>
    </>
  );
}
