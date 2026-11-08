"use client";
import { Flex, Grid } from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { AppliedFilter } from "@/components/organisms/FiltersBar/AppliedFilter/AppliedFilter";
import { ClearAllFiltersButton } from "@/components/organisms/FiltersBar/ClearAllFiltersButton/ClearAllFiltersButton";
import { ControlFilters } from "@/components/organisms/FiltersBar/ControlFilters/ControlFilters";
import {
  Filter,
  type FilterProps,
} from "@/components/organisms/FiltersBar/Filter/Filter";
import { styles } from "@/components/organisms/FiltersBar/FiltersBar.styles";
import {
  PriceRangeSlider,
  type PriceRangeSliderProps,
} from "@/components/organisms/FiltersBar/PriceRangeSlider/PriceRangeSlider";
import {
  SortSelect,
  type SortSelectProps,
} from "@/components/organisms/FiltersBar/SortSelect/SortSelect";
import { CURRENCY } from "@/config/constants";
import {
  clearFilters,
  removeFacetOption,
} from "@/features/product/helpers/params/pure";
import type { ProductFacetResponse } from "@/features/product/types/productResponse.types";
import { useFiltersParams } from "@/hooks/useFilterParams";
import { useFormattedPrice } from "@/hooks/useFormattedPrice";

const TAG = "FiltersBar";
const CLEAR_ALL_KEY = "clear-all";
const PRICE_RANGE_FACET = "priceRange";

interface FiltersBarProps
  extends Omit<SortSelectProps, "performMutation">,
    Omit<PriceRangeSliderProps, "performMutation"> {
  filters: Omit<FilterProps, "performMutation">[] | undefined;
  facetMap: ProductFacetResponse["facetMap"];
  onChange?: (params: URLSearchParams) => void;
}

export function FiltersBar({
  selectedSortOption,
  priceBounds,
  selectedRange,
  filters,
  facetMap,
  onChange,
}: FiltersBarProps) {
  const selectedFilters = filters
    ? filters
        .filter((filter) => filter.selectedOptions?.length)
        .flatMap((filter) => {
          const labels = facetMap.get(filter.facet);
          return {
            facet: filter.facet,
            options: filter.selectedOptions?.map((option) => ({
              value: option,
              label: labels?.get(option) ?? option,
            })),
          };
        })
    : [];

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { performMutation, pending } = useFiltersParams(onChange);

  const handleFilterDeletion = (facet: string, value: string) => {
    performMutation((params) => {
      if (facet === PRICE_RANGE_FACET) {
        params.delete("priceFrom");
        params.delete("priceTo");
      } else {
        removeFacetOption(params, facet, value);
      }
    }, value);
  };

  const handleClearAll = () => {
    performMutation((params) => clearFilters(params), CLEAR_ALL_KEY);
  };

  const selectedFrom = Number(selectedRange.from) || priceBounds.min;
  const selectedTo = Number(selectedRange.to) || priceBounds.max;

  const from = useFormattedPrice({
    centAmount: selectedFrom,
    currencyCode: CURRENCY,
  });
  const to = useFormattedPrice({
    centAmount: selectedTo,
    currencyCode: CURRENCY,
  });

  if (selectedFrom !== priceBounds.min || selectedTo !== priceBounds.max) {
    const appliedFilter = {
      facet: PRICE_RANGE_FACET,
      options: [
        {
          value: "price-range",
          label: `${from} - ${to}`,
        },
      ],
    };

    selectedFilters.push(appliedFilter);
  }

  return (
    <Flex {...styles.flex} data-testid={TAG}>
      {showFilters ? (
        <Flex {...styles.filtersBar}>
          <ControlFilters
            show={showFilters}
            onClick={() => setShowFilters(false)}
          />
          <Grid {...styles.grid}>
            <PriceRangeSlider
              performMutation={performMutation}
              priceBounds={priceBounds}
              selectedRange={selectedRange}
            />
            <SortSelect
              performMutation={performMutation}
              selectedSortOption={selectedSortOption}
            />
            <Suspense>
              {filters?.map((filter) => (
                <Filter
                  key={filter.facet}
                  facet={filter.facet}
                  terms={filter.terms}
                  selectedOptions={filter.selectedOptions}
                  performMutation={performMutation}
                />
              ))}
            </Suspense>
          </Grid>
        </Flex>
      ) : (
        <ControlFilters
          show={showFilters}
          onClick={() => setShowFilters(true)}
        />
      )}

      {selectedFilters && selectedFilters.length > 0 && (
        <Flex {...styles.appliedFilters}>
          {selectedFilters.flatMap((filterGroup) =>
            (filterGroup.options ?? []).map((filter) => (
              <AppliedFilter
                key={filter.value}
                label={filter.label}
                isPending={pending.includes(filter.value)}
                onRemove={() =>
                  handleFilterDeletion(filterGroup.facet, filter.value)
                }
              />
            )),
          )}
          <ClearAllFiltersButton
            isPending={pending.includes(CLEAR_ALL_KEY)}
            onRemove={handleClearAll}
          />
        </Flex>
      )}
    </Flex>
  );
}
