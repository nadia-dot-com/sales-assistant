"use client";
import { Button, Text } from "@chakra-ui/react";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { styles } from "@/components/organisms/FiltersBar/ControlFilters/ControlFilters.styles";

const TAG = "ControlFilters";

export interface ControlFiltersProps {
  show: boolean;
  onClick: () => void;
}

export function ControlFilters({ show, onClick }: ControlFiltersProps) {
  const t = useTranslations();
  return (
    <Button
      variant="plain"
      onClick={onClick}
      data-testid={TAG}
      {...styles.button}
    >
      <Text {...styles.label}>
        {show
          ? t("searchPage.filtersBar.hideFilters")
          : t("searchPage.filtersBar.showFilters")}
      </Text>
      <SlidersHorizontal />
    </Button>
  );
}
