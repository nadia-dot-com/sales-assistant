"use client";
import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { styles } from "@/components/organisms/FiltersBar/SortSelect/SortSelect.styles";
import {
  SORT_OPTIONS,
  type SortOption,
} from "@/features/product/helpers/sort/sortOptions";

const sortingOptions = createListCollection({
  items: SORT_OPTIONS.map((value) => {
    return { value };
  }),
});

const TAG = "SortSelect";

export interface SortSelectProps {
  selectedSortOption?: SortOption;
  performMutation: (
    mutate: (params: URLSearchParams) => void,
    pendingKey?: string,
  ) => void;
}

export function SortSelect({
  selectedSortOption,
  performMutation,
}: SortSelectProps) {
  const [sortOption, setSortOption] = useState<string[]>(
    selectedSortOption && SORT_OPTIONS.includes(selectedSortOption)
      ? [selectedSortOption]
      : [],
  );
  const t = useTranslations();

  const handleSortOptionChange = (option: string[]) => {
    performMutation((params) => {
      params.set("sort", option.toString());
      params.set("page", "1");
    });
    setSortOption(option);
  };

  return (
    <Select.Root
      collection={sortingOptions}
      size="md"
      value={sortOption}
      onValueChange={(e) => handleSortOptionChange(e.value)}
      positioning={{ placement: "bottom", flip: false, sameWidth: true }}
      data-testid={TAG}
    >
      <Select.HiddenSelect />
      <Select.Label {...styles.label}>
        {t("searchPage.sortSelect.placeholder")}
      </Select.Label>
      <Select.Control>
        <Select.Trigger {...styles.trigger}>
          <Select.ValueText
            placeholder={t("searchPage.sortSelect.placeholder")}
          >
            {sortOption.length > 0
              ? t(`searchPage.sortSelect.${sortOption}`)
              : undefined}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content {...styles.content}>
            {sortingOptions.items.map((sortingOptions) => (
              <Select.Item
                item={sortingOptions}
                key={sortingOptions.value}
                {...styles.item}
              >
                {t(`searchPage.sortSelect.${sortingOptions.value}`)}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
