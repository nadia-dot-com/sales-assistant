import { cache } from "react";
import type {
  ProductFacet,
  ProductFacetResponse,
} from "@/features/product/types/productResponse.types";
import { httpApiRoot } from "@/graphQl/client/admin/client";

async function getProductFacets(): Promise<ProductFacetResponse> {
  const PRODUCT_FACETS_QUERY = `
    query AttrEnums {
      productTypes {
        results {
          key
          attributeDefinitions {
            results {
              name

              isSearchable
              type {
                name
                ... on EnumAttributeDefinitionType {
                  values {
                    results {
                      key
                      label
                    }
                  }
                }
                ... on SetAttributeDefinitionType {
                  elementType {
                    name
                    ... on EnumAttributeDefinitionType {
                      values {
                        results {
                          key
                          label
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await httpApiRoot
    .graphql()
    .post({
      body: {
        query: PRODUCT_FACETS_QUERY,
      },
    })
    .execute();

  if (response.body.errors) {
    throw response.body.errors;
  }

  const data = response.body.data.productTypes;

  const searchAbleFacets = data.results[0].attributeDefinitions.results.filter(
    (facet: ProductFacet) => facet.isSearchable === true,
  );

  const FACET_MAP = new Map<string, Map<string, string>>();

  for (const searchAbleFacet of searchAbleFacets) {
    const values =
      searchAbleFacet.type.name === "enum"
        ? searchAbleFacet.type.values.results
        : searchAbleFacet.type.elementType.values.results;

    const valueMap = new Map<string, string>(
      values.map((val: { key: string; label: string }) => [val.key, val.label]),
    );

    FACET_MAP.set(searchAbleFacet.name, valueMap);
  }

  return {
    facets: searchAbleFacets,
    facetMap: FACET_MAP,
  };
}

const cachedGetProductFacets = cache(getProductFacets);

export { cachedGetProductFacets as getProductFacets };
