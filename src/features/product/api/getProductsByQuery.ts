import "server-only";

import type { FiltersAppliedType } from "@/app/(shop)/search/page";
import { PRODUCTS_PER_PAGE_LIMIT } from "@/config/constants";
import { LOCALE } from "@/config/env.public";
import { buildFacetResults } from "@/features/product/helpers/facets/buildFacetResults";
import type {
  SearchFacetInput,
  SearchFilterInput,
} from "@/features/product/helpers/filterAndFacetsTypes/filterAndFacetsTypes.types";
import { OUT_OF_STOCK_NOT_SHOWING } from "@/features/product/helpers/filterAndFacetsTypes/outOfStockNotShowing";
import { buildFilters } from "@/features/product/helpers/filters/buildFilters";
import { buildPriceFilters } from "@/features/product/helpers/priceRange/buildPriceFilters";
import { parsePriceBounds } from "@/features/product/helpers/priceRange/parsePriceBounds";
import type { PriceRange } from "@/features/product/helpers/priceRange/priceRange.type";
import {
  PRICE_CURRENCY_FILTER,
  PRICE_RANGE_FACET,
  PRICE_SELECTOR,
} from "@/features/product/helpers/priceRange/priceRangeQuery";
import { SORT_EXPRESSIONS } from "@/features/product/helpers/sort/sortExpressions";
import type { SortOption } from "@/features/product/helpers/sort/sortOptions";
import type {
  ProductFacetResponse,
  ProductsResponse,
} from "@/features/product/types/productResponse.types";
import { httpApiRoot } from "@/graphQl/client/admin/client";

export async function getProductsForQuery(
  page: number,
  query: string,
  sort: SortOption,
  priceRange: PriceRange,
  buildedFacets: SearchFacetInput[],
  facetMap: ProductFacetResponse["facetMap"],
  filtersApplied: FiltersAppliedType[],
): Promise<ProductsResponse> {
  const offset = 0 + (page - 1) * PRODUCTS_PER_PAGE_LIMIT;

  const sortExpression = sort ? SORT_EXPRESSIONS[sort] : `name.${LOCALE} asc`;

  const filters: SearchFilterInput[] = [...buildPriceFilters(priceRange)];
  const facets: SearchFacetInput[] = [PRICE_RANGE_FACET, ...buildedFacets];

  const facetFilters: SearchFilterInput[] = [PRICE_CURRENCY_FILTER];
  const queryFilters: SearchFilterInput[] = [
    ...buildFilters(filtersApplied),
    OUT_OF_STOCK_NOT_SHOWING,
  ];

  const QUERY_PRODUCT_SEARCH = `
    query SearchProducts($searchTerm: String!, $locale: Locale!, $limit: Int!, $offset: Int!, $filters: [SearchFilterInput!], $facets: [SearchFacetInput!], $facetFilters: [SearchFilterInput!], $queryFilters: [SearchFilterInput!]) {
        productProjectionSearch(
            sorts: ["${sortExpression}"]
            text: $searchTerm
            locale: $locale
            staged: false
            fuzzy: true
            limit: $limit
            offset: $offset
            ${PRICE_SELECTOR}
            facets: $facets
            facetFilters: $facetFilters
            filters: $filters
            queryFilters: $queryFilters
        ) {
            total
            count
            offset
            results {
                key
                name(locale: $locale)
                masterVariant {
                    price(currency: "EUR") {
                        value { centAmount, currencyCode }
                        discounted {
                            value { 
                                centAmount 
                            }
                            discount {
                                name(locale: $locale)
                            }
                        }
                    }
                    images { 
                      url 
                    }
                    availability {
                        noChannel {
                            isOnStock
                        }
                    }
                    attributesRaw(includeNames: ["gp26_brand"]) {
                        name
                        value
                    } 
                }
                categories { 
                    key 
                }
            }
            facets {
                facet
                value {
                    ... on RangeFacetResult {
                        ranges {
                            ... on RangeCountDouble {
                                min
                                max
                            }
                        }
                    }
                    ... on TermsFacetResult {
                      terms {
                        term
                        count
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
        query: QUERY_PRODUCT_SEARCH,
        variables: {
          searchTerm: query,
          locale: LOCALE,
          limit: PRODUCTS_PER_PAGE_LIMIT,
          offset,
          filters,
          facets,
          facetFilters,
          queryFilters,
        },
      },
    })
    .execute();

  if (response.body.errors) {
    throw response.body.errors;
  }

  const data = response.body.data.productProjectionSearch;

  return {
    totalProducts: data.total,
    products: data.results,
    priceBounds: parsePriceBounds(data.facets),
    facets: buildFacetResults(data.facets, facetMap),
  };
}
