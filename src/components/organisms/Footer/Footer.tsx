import { Box, Flex, Text } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import { NextImage } from "@/components/atoms/NextImage";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/organisms/Footer/Footer.styles";
import { FooterIconList } from "@/components/organisms/Footer/FooterIconList/FooterIconList";
import { FooterLinkList } from "@/components/organisms/Footer/FooterLinkList/FooterLinkList";
import { routes } from "@/config/routes";
import { getFooterContent } from "@/sanity/queries/getFooterContent";
import { getSanityPaymentMethods } from "@/sanity/queries/getSanityPaymentMethods";

const TAG = "Footer";

export async function Footer() {
  const [t, footerContent, paymentMethods] = await Promise.all([
    getTranslations(),
    getFooterContent(),
    getSanityPaymentMethods(),
  ]);
  const currentYear = new Date().getFullYear();

  return (
    <Flex {...styles.footer} as="footer" data-testid={TAG}>
      <Flex {...styles.topSection}>
        <Flex {...styles.brandSection}>
          {footerContent.brandLogo && (
            <NextLink href={routes.home}>
              <NextImage
                src={footerContent.brandLogo}
                alt={t("rootLayout.footer.logo.alt")}
                width={250}
                height={100}
              />
            </NextLink>
          )}

          <Box>{footerContent.brandDescription}</Box>

          {footerContent.socials.length > 0 && (
            <FooterIconList
              heading={t("rootLayout.footer.socials.title")}
              items={footerContent.socials}
            />
          )}

          {paymentMethods.length > 0 && (
            <FooterIconList
              heading={t("rootLayout.footer.paymentMethods.title")}
              items={paymentMethods}
            />
          )}
        </Flex>

        <Flex {...styles.navColumns}>
          {footerContent.links.length > 0 && (
            <FooterLinkList
              heading={t("rootLayout.footer.links.title")}
              items={footerContent.links}
              as="nav"
            />
          )}
          {footerContent.contacts.length > 0 && (
            <FooterLinkList
              heading={t("rootLayout.footer.contact.title")}
              items={footerContent.contacts}
            />
          )}
        </Flex>
      </Flex>

      <Flex {...styles.legalBar}>
        <Text>&copy; {`${currentYear} ${t("rootLayout.footer.rights")}`}</Text>
        {footerContent.legalBar.length > 0 && (
          <FooterLinkList items={footerContent.legalBar} />
        )}
      </Flex>
    </Flex>
  );
}
