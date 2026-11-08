import type {
  FacetResult,
  PriceBounds,
} from "@/features/product/helpers/priceRange/priceRange.type";
import { PRICE_PATH } from "@/features/product/helpers/priceRange/priceRangeQuery";

export function parsePriceBounds(
  facets: FacetResult[] | undefined,
): PriceBounds {
  const range = facets?.find((f) => f.facet === PRICE_PATH)?.value?.ranges?.[0];

  if (!range) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.round(range.min),
    max: Math.round(range.max),
  };
}
