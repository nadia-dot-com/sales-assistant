"use client";
import { MoveLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { styles } from "@/components/atoms/RedirectBackButton/RedirectBackButton.styles";

export function RedirectBackButton() {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const href = searchParams.get("redirectTo") ?? "/";

  return (
    <ButtonLink href={href} variant="ghost" {...styles.button}>
      <MoveLeft />
      {t("authLayout.goBackButton.title")}
    </ButtonLink>
  );
}
