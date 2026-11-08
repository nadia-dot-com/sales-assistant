"use server";

import type { FiltersAppliedType } from "@/app/(shop)/search/page";
import {
  BRAND_ATTRIBUTE,
  CHAT_PRODUCTS_PER_PAGE_LIMIT,
  CURRENCY,
} from "@/config/constants";
import { LOCALE } from "@/config/env.public";
import { ATTRIBUTES_RAW_KEYS } from "@/features/product/constants/attributesRawKeys";
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
  ProductInList,
  ProductMatch,
  ProductsByKeysResponse,
} from "@/features/product/types/productResponse.types";
import { httpApiRoot } from "@/graphQl/client/admin/client";

export async function getProductsByKeys(
  productsMatch: ProductMatch[],
  page: number,
  sort: SortOption,
  priceRange: PriceRange,
  buildedFacets: SearchFacetInput[],
  facetMap: ProductFacetResponse["facetMap"],
  filtersApplied: FiltersAppliedType[],
  sortByScore: boolean,
): Promise<ProductsByKeysResponse> {
  const productsKeys = productsMatch.map((p) => p.id);

  const sortExpression = sort ? SORT_EXPRESSIONS[sort] : "";

  const KEY_FILTER: SearchFilterInput = {
    model: { value: { path: "key", values: productsKeys } },
  };

  const filters: SearchFilterInput[] = [
    KEY_FILTER,
    ...buildPriceFilters(priceRange),
  ];
  const facets: SearchFacetInput[] = [PRICE_RANGE_FACET, ...buildedFacets];

  const facetFilters: SearchFilterInput[] = [PRICE_CURRENCY_FILTER, KEY_FILTER];
  const queryFilters: SearchFilterInput[] = [
    ...buildFilters(filtersApplied),
    OUT_OF_STOCK_NOT_SHOWING,
  ];

  const QUERY_PRODUCT_SEARCH = `
        query SearchProducts(
        $locale: Locale!,
        $currency: Currency!,
        $brandAttribute: String!,
        $shortDescriptionAttribute: String!,
        $limit: Int!
        $offset: Int!
        $filters: [SearchFilterInput!],
        $facets: [SearchFacetInput!],
        $facetFilters: [SearchFilterInput!],
        $queryFilters: [SearchFilterInput!]
        ) {
                productProjectionSearch(
                sorts: ["${sortExpression}"]
                limit: $limit
                offset: $offset
                queryFilters: $queryFilters
                ${PRICE_SELECTOR}
                facets: $facets
                facetFilters: $facetFilters
                filters: $filters
                ) {
                total
                results {
                    key
                    name(locale: $locale)
                    masterVariant {
                        price(currency: $currency) {
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
                        attributesRaw(includeNames: [$brandAttribute, $shortDescriptionAttribute]) {
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
          locale: LOCALE,
          currency: CURRENCY,
          brandAttribute: BRAND_ATTRIBUTE,
          shortDescriptionAttribute: ATTRIBUTES_RAW_KEYS.short_description,
          limit: productsKeys.length,
          offset: 0,
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

  const productsWithScore = data.results.map((product: ProductInList) => {
    const matchedProduct = productsMatch.find(
      (match) => match.id === product.key,
    );

    return {
      ...product,
      score: matchedProduct?.score ?? 0,
      matchedTags: matchedProduct?.positive,
    };
  });

  const sortedProducts = sortByScore
    ? productsWithScore.sort(
        (a: ProductInList, b: ProductInList) => (b.score ?? 0) - (a.score ?? 0),
      )
    : productsWithScore;

  const pageOffset = (page - 1) * CHAT_PRODUCTS_PER_PAGE_LIMIT;

  return {
    totalProducts: data.total,
    products: sortedProducts.slice(
      pageOffset,
      pageOffset + CHAT_PRODUCTS_PER_PAGE_LIMIT,
    ),
    priceBounds: parsePriceBounds(data.facets),
    facets: buildFacetResults(data.facets, facetMap),
  };
}
