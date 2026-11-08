"use client";

import { Flex, Heading, Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { routes } from "@/config/routes";
import { styles } from "@/features/checkout/components/CheckoutSuccess/CheckoutSuccess.styles";

const TAG = "CheckoutSuccess";

interface CheckoutSuccessProps {
  animation: object;
}

export function CheckoutSuccess({ animation }: CheckoutSuccessProps) {
  const t = useTranslations();

  return (
    <Flex {...styles.root} data-testid={TAG}>
      {animation && (
        <Flex {...styles.imageWrapper}>
          <Lottie
            animationData={animation}
            loop={false}
            style={{ ...styles.animationStyle }}
          />
        </Flex>
      )}
      <Flex {...styles.info}>
        <Heading as="h3" {...styles.title}>
          {t("checkoutPage.success.title")}
        </Heading>
        <Text>{t("checkoutPage.success.description")}</Text>
      </Flex>
      <ButtonLink href={routes.home} {...styles.button}>
        {t("checkoutPage.success.backButton")}
      </ButtonLink>
    </Flex>
  );
}
