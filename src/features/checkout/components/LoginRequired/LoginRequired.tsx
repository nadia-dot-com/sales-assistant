"use client";

import { EmptyState } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import {
  DialogCloseTrigger,
  DialogContent,
} from "@/components/ui/dialog/dialog";
import { routes } from "@/config/routes";
import { styles } from "@/features/checkout/components/LoginRequired/LoginRequired.styles";

const TAG = "LoginRequired";

export function LoginRequired() {
  const t = useTranslations();

  return (
    <DialogContent data-testid={TAG} {...styles.root}>
      <EmptyState.Root {...styles.content}>
        <EmptyState.Content>
          <EmptyState.Title>
            {t("checkoutPage.loginRequired.title")}
          </EmptyState.Title>
          <ButtonLink
            href={`/login?redirectTo=${encodeURIComponent(routes.cart)}`}
            {...styles.button}
          >
            {t("checkoutPage.loginRequired.button")}
          </ButtonLink>
        </EmptyState.Content>
      </EmptyState.Root>
      <DialogCloseTrigger />
    </DialogContent>
  );
}
