import "@/app/globals.css";
import { Box } from "@chakra-ui/react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type PropsWithChildren, Suspense } from "react";
import { styles } from "@/app/layout.styles";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import { Provider as ChakraUIProvider } from "@/components/ui/provider/provider";
import { Toaster } from "@/components/ui/toaster/toaster";
import { BETTER_AUTH_URL, LOCALE, NEXT_PUBLIC_ENV } from "@/config/env.public";
import { getStoredCart } from "@/features/cart/actions/getStoredCart.action";
import { CartProvider } from "@/features/cart/context/CartContext";
import { dmSans, instrumentSans } from "@/fonts/fonts";
import { getCssProperties } from "@/sanity/queries/getCssProperties";
import { getMetadata } from "@/sanity/queries/getMetadata";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";
import { toShareDescription } from "@/utils/toShareDescription";

export async function generateMetadata(): Promise<Metadata> {
  await getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.rootLayout);
  const [t, metadata] = await Promise.all([
    await getTranslations(),
    await getMetadata(),
  ]);

  const description = toShareDescription(t("rootLayout.metadata.description"));

  return {
    title: t("rootLayout.metadata.title"),
    description,

    icons: {
      icon: metadata.favicon,
    },

    openGraph: {
      title: t("rootLayout.metadata.title"),
      description,
      url: BETTER_AUTH_URL,
      siteName: t("rootLayout.metadata.title"),
      images: [
        {
          url: metadata.socialShareImage,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("rootLayout.metadata.title"),
      description,
      images: [metadata.socialShareImage],
    },

    other: {
      env: NEXT_PUBLIC_ENV,
      buildDate: process.env.NEXT_PUBLIC_BUILD_DATE,
      version: process.env.NEXT_PUBLIC_VERSION,
    },
  };
}

interface RootLayoutProps extends PropsWithChildren {}

export default async function RootLayout({ children }: RootLayoutProps) {
  const [cssProperties, initialCartState] = await Promise.all([
    getCssProperties(),
    getStoredCart(),
    getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.common),
  ]);

  return (
    <html
      lang={LOCALE}
      className={`${instrumentSans.variable} ${dmSans.variable}`}
      style={cssProperties}
      suppressHydrationWarning
    >
      <head>
        <meta name="env" content={NEXT_PUBLIC_ENV} />
        <meta name="buildDate" content={process.env.NEXT_PUBLIC_BUILD_DATE} />
        <meta name="version" content={process.env.NEXT_PUBLIC_VERSION} />
      </head>
      <body>
        <NextIntlClientProvider locale={LOCALE}>
          <ChakraUIProvider defaultTheme="light">
            <CartProvider initialCartState={initialCartState}>
              <Suspense>
                <Header />
              </Suspense>
              <Box as="main" {...styles.main}>
                {children}
              </Box>
              <Footer />
              <Toaster />
            </CartProvider>
          </ChakraUIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
