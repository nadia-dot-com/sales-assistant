import type { FiltersAppliedType } from "@/app/(shop)/search/page";
import { addFacetPrefix } from "@/features/product/helpers/facets/facetPrefix";
import type { PriceRange } from "@/features/product/helpers/priceRange/priceRange.type";
import {
  SORT_OPTIONS,
  type SortOption,
} from "@/features/product/helpers/sort/sortOptions";

export const DEFAULT_SORT_OPTION: SortOption = "name_asc";
export const INITIAL_PAGE = 1;

const FILTERS_QUERY_PARAM_KEYS = new Set([
  "sort",
  "priceFrom",
  "priceTo",
  "page",
  "language",
]);

export function parseFiltersFromParams(params: URLSearchParams): {
  sort: SortOption;
  priceRange: PriceRange;
  filtersApplied: FiltersAppliedType[];
  page: number;
} {
  const sortParam = params.get("sort");
  const sort = SORT_OPTIONS.includes(sortParam as SortOption)
    ? (sortParam as SortOption)
    : DEFAULT_SORT_OPTION;
  const priceRange: PriceRange = {
    from: params.get("priceFrom") ?? "",
    to: params.get("priceTo") ?? "",
  };
  const page = Number(params.get("page")) || INITIAL_PAGE;

  const filtersApplied: FiltersAppliedType[] = [...params.keys()]
    .filter((key) => !FILTERS_QUERY_PARAM_KEYS.has(key))
    .map((key) => {
      const rawValue = params.get(key);
      return {
        key: addFacetPrefix(key),
        selectedOptions: rawValue
          ? rawValue.split(".").filter(Boolean).map(addFacetPrefix)
          : [],
      };
    });

  return { sort, priceRange, filtersApplied, page };
}
