"use client";
import { Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ActionButton } from "@/components/atoms/ActionButton";
import { styles } from "@/components/organisms/FiltersBar/ClearAllFiltersButton/ClearAllFiltersButton.styles";

const TAG = "ClearAllFiltersButton";

interface ClearAllFiltersButtonProps {
  isPending: boolean;
  onRemove: () => void;
}

export function ClearAllFiltersButton({
  isPending,
  onRemove,
}: ClearAllFiltersButtonProps) {
  const t = useTranslations();

  return (
    <ActionButton
      onClick={onRemove}
      variant="plain"
      {...styles.clearAll}
      isPending={isPending}
      disabled={isPending}
      data-testid={TAG}
    >
      <Text>{t("searchPage.clearAllFiltersButton.label")}</Text>
    </ActionButton>
  );
}
