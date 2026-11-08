"use client";

import { Flex, Heading, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { routes } from "@/config/routes";
import { styles } from "@/features/checkout/components/CheckoutError/CheckoutError.styles";

const TAG = "CheckoutError";

interface CheckoutErrorProps {
  animation: object;
}

export function CheckoutError({ animation }: CheckoutErrorProps) {
  const t = useTranslations();

  return (
    <Flex {...styles.root} data-testid={TAG}>
      {animation && (
        <Flex {...styles.imageWrapper}>
          <Lottie
            animationData={animation}
            loop={false}
            autoplay
            style={{ ...styles.animationStyle }}
          />
        </Flex>
      )}
      <Flex {...styles.info}>
        <Heading as="h1" {...styles.title}>
          {t("checkoutPage.error.title")}
        </Heading>
        <Text>{t("checkoutPage.error.description")}</Text>
      </Flex>
      <ButtonLink href={routes.cart} {...styles.button}>
        {t("checkoutPage.error.backButton")}
      </ButtonLink>
    </Flex>
  );
}
