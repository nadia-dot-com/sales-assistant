import { Flex, Heading } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import type { FiltersAppliedType, SearchPage } from "@/app/(shop)/search/page";
import type { PriceRangeSliderProps } from "@/components/organisms/FiltersBar/PriceRangeSlider/PriceRangeSlider";
import { styles } from "@/components/organisms/QuerySearch/QuerySearch.styles";
import { PRODUCTS_PER_PAGE_LIMIT } from "@/config/constants";
import { getProductsForQuery } from "@/features/product/api/getProductsByQuery";
import { ProductsList } from "@/features/product/components/ProductsList/ProductsList";
import type { SearchFacetInput } from "@/features/product/helpers/filterAndFacetsTypes/filterAndFacetsTypes.types";
import type { SortOption } from "@/features/product/helpers/sort/sortOptions";
import type { ProductFacetResponse } from "@/features/product/types/productResponse.types";

const TAG = "QuerySearch";

interface QuerySearchProps
  extends SearchPage,
    Omit<PriceRangeSliderProps, "performMutation" | "priceBounds">,
    Omit<ProductFacetResponse, "facets"> {
  selectedSortOption: SortOption;
  query: string;
  buildedFacets: SearchFacetInput[];
  filtersApplied: FiltersAppliedType[];
}

export async function QuerySearch({
  page,
  query,
  selectedSortOption,
  selectedRange,
  buildedFacets,
  facetMap,
  filtersApplied,
}: QuerySearchProps) {
  const [t, { totalProducts, products, priceBounds, facets }] =
    await Promise.all([
      getTranslations(),
      getProductsForQuery(
        page,
        query,
        selectedSortOption,
        selectedRange,
        buildedFacets,
        facetMap,
        filtersApplied,
      ),
    ]);

  const lastPageNumber = Math.ceil(totalProducts / PRODUCTS_PER_PAGE_LIMIT);

  const filtersAppliedToFacets = facets?.map((facet) => {
    return {
      ...facet,
      selectedOptions: filtersApplied.find(
        (filter) => filter.key === facet.facet,
      )?.selectedOptions,
    };
  });

  return (
    <Flex as="article" {...styles.container} data-testid={TAG}>
      <Heading as="h1" {...styles.h1}>
        {t("searchPage.searchingFor")} {query}
      </Heading>

      <ProductsList
        lastPageNumber={lastPageNumber}
        currentPageNumber={page}
        totalProducts={totalProducts}
        products={products}
        selectedSortOption={selectedSortOption}
        selectedRange={selectedRange}
        priceBounds={priceBounds}
        filters={filtersAppliedToFacets}
        facetMap={facetMap}
      />
    </Flex>
  );
}
