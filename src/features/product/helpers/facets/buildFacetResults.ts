import type {
  ProductFacetResponse,
  ProductFacetResult,
} from "@/features/product/types/productResponse.types";

interface RawTerm {
  term: string;
  count: number;
}

interface RawFacet {
  facet: string;
  value: {
    terms?: RawTerm[];
  };
}

export const buildFacetResults = (
  facets: RawFacet[],
  facetMap: ProductFacetResponse["facetMap"],
): ProductFacetResult[] => {
  const results: ProductFacetResult[] = [];

  for (const facet of facets) {
    if (!facet.value.terms) {
      continue;
    }

    const labels = facetMap.get(facet.facet);

    results.push({
      facet: facet.facet,
      terms: facet.value.terms
        .map((term) => ({
          key: term.term,
          label: labels?.get(term.term) ?? term.term,
          count: term.count,
        }))
        .filter((res) => res.label !== "blank"),
    });
  }

  return results;
};
