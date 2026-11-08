import type { SearchFacetInput } from "@/features/product/helpers/filterAndFacetsTypes/filterAndFacetsTypes.types";
import type { ProductFacet } from "@/features/product/types/productResponse.types";

export const buildFacets = (facets: ProductFacet[]): SearchFacetInput[] => {
  const facetBuilder: SearchFacetInput[] = [];

  for (const facet of facets) {
    if (facet.type.name === "enum" || facet.type.name === "set") {
      facetBuilder.push({
        model: {
          terms: {
            path: `variants.attributes.${facet.name}.key`,
            alias: facet.name,
            countProducts: true,
          },
        },
      });
    }
  }

  return facetBuilder;
};
