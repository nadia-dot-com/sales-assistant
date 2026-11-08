"use client";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { ActionButton } from "@/components/atoms/ActionButton";
import { logoutAction } from "@/features/auth/actions/logoutAction";
import { styles } from "@/features/auth/components/LogoutButton/LogoutButton.styles";
import { useCartContext } from "@/features/cart/context/CartContext";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const { resetCart } = useCartContext();

  function handleLogout() {
    startTransition(async () => {
      resetCart();
      await logoutAction();
    });
  }

  return (
    <ActionButton
      type="button"
      isPending={isPending}
      onClick={handleLogout}
      disabled={isPending}
      data-testid="LogoutButton"
      {...styles.button}
    >
      {t("accountPage.logOutButton.title")}
    </ActionButton>
  );
}
