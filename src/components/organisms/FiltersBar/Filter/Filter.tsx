"use client";
import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { styles } from "@/components/organisms/FiltersBar/Filter/Filter.styles";
import { stripFacetPrefix } from "@/features/product/helpers/facets/facetPrefix";
import type { ProductFacetResult } from "@/features/product/types/productResponse.types";

const TAG = "Filter";

export interface FilterProps extends ProductFacetResult {
  selectedOptions?: string[];
  performMutation: (
    mutate: (params: URLSearchParams) => void,
    pendingKey?: string,
  ) => void;
}

export function Filter({
  facet,
  terms,
  selectedOptions,
  performMutation,
}: FilterProps) {
  const initialValue = selectedOptions ? selectedOptions : [];
  const [optionValue, setOptionValue] = useState<string[]>(initialValue);
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);

  useEffect(() => {
    setOptionValue(selectedOptions ?? []);
  }, [selectedOptions]);

  if (terms.length === 0) {
    return null;
  }

  const handleFilterOptionChange = (option: string[]) => {
    setOptionValue(option);
  };

  const handleMultiSelectApply = () => {
    const normalized = optionValue.map(stripFacetPrefix);
    const paramKey = stripFacetPrefix(facet);

    performMutation((params) => {
      if (optionValue.length > 0) {
        params.set(paramKey, normalized.join("."));
      } else {
        params.delete(paramKey);
      }
      params.set("page", "1");
    });
  };

  const filterCollection = createListCollection({
    items: terms.map((value) => {
      return { label: value.label, value: value.key, count: value.count };
    }),
  });

  const capitalizedName = stripFacetPrefix(facet)
    .split("_")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <Select.Root
      collection={filterCollection}
      open={isFilterOpened}
      onOpenChange={() => setIsFilterOpened(!isFilterOpened)}
      onExitComplete={handleMultiSelectApply}
      size="md"
      value={optionValue}
      onValueChange={(e) => handleFilterOptionChange(e.value)}
      positioning={{ placement: "bottom", flip: false, sameWidth: true }}
      multiple
      data-testid={TAG}
    >
      <Select.Label {...styles.label}>{capitalizedName}</Select.Label>
      <Select.Control>
        <Select.Trigger {...styles.trigger}>
          <Select.ValueText placeholder={facet}>
            {capitalizedName}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content {...styles.content}>
            {filterCollection.items.map((filterOption) => (
              <Select.Item
                item={filterOption}
                key={filterOption.value}
                {...styles.item}
              >
                {filterOption.label} ({filterOption.count})
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
