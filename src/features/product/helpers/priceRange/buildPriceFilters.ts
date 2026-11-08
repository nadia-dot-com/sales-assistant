import type { SearchFilterInput } from "@/features/product/helpers/filterAndFacetsTypes/filterAndFacetsTypes.types";
import type { PriceRange } from "@/features/product/helpers/priceRange/priceRange.type";
import {
  PRICE_CURRENCY_FILTER,
  PRICE_PATH,
} from "@/features/product/helpers/priceRange/priceRangeQuery";

export function buildPriceFilters(priceRange: PriceRange): SearchFilterInput[] {
  const { from, to } = priceRange;

  if (!from && !to) {
    return [];
  }

  const fromCents = from || "0";
  const toCents = to || "*";

  return [
    {
      model: {
        range: { path: PRICE_PATH, ranges: [{ from: fromCents, to: toCents }] },
      },
    },
    PRICE_CURRENCY_FILTER,
  ];
}
