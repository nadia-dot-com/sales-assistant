import type { FiltersAppliedType } from "@/app/(shop)/search/page";
import type { SearchFilterInput } from "@/features/product/helpers/filterAndFacetsTypes/filterAndFacetsTypes.types";

export const buildFilters = (
  appliedFilters: FiltersAppliedType[],
): SearchFilterInput[] => {
  return appliedFilters
    .filter(
      (filter): filter is FiltersAppliedType & { selectedOptions: string[] } =>
        Boolean(filter.selectedOptions?.length),
    )
    .map((filter) => ({
      model: {
        value: {
          path: `variants.attributes.${filter.key}.key`,
          values: filter.selectedOptions,
        },
      },
    }));
};
