"use client";

import { Flex } from "@chakra-ui/react";
import type { FilterProps } from "@/components/organisms/FiltersBar/Filter/Filter";
import { FiltersBar } from "@/components/organisms/FiltersBar/FiltersBar";
import type { PriceRangeSliderProps } from "@/components/organisms/FiltersBar/PriceRangeSlider/PriceRangeSlider";
import type { SortSelectProps } from "@/components/organisms/FiltersBar/SortSelect/SortSelect";
import { ProductGrid } from "@/features/product/components/ProductsGrid/ProductsGrid";
import { ProductsListEmptyState } from "@/features/product/components/ProductsList/ProductListEmptyState/ProductListEmptyState";
import {
  ProductListPagination,
  type ProductPagePagination,
} from "@/features/product/components/ProductsList/ProductListPagination/ProductListPagination";
import { styles } from "@/features/product/components/ProductsList/ProductsList.styles";
import type {
  ProductFacetResponse,
  ProductsResponse,
} from "@/features/product/types/productResponse.types";
import type { Category } from "@/lib/category/category.types";

interface ProductsListProps
  extends ProductsResponse,
    ProductPagePagination,
    Omit<SortSelectProps, "performMutation">,
    Omit<PriceRangeSliderProps, "performMutation"> {
  currentCategory?: Category;
  filters: Omit<FilterProps, "performMutation">[] | undefined;
  facetMap: ProductFacetResponse["facetMap"];
  onChange?: (params: URLSearchParams) => void;
  onPageChange?: (page: number) => void;
}

const TAG = "ProductsList";

export function ProductsList({
  totalProducts,
  products,
  currentPageNumber,
  lastPageNumber,
  selectedSortOption,
  selectedRange,
  priceBounds,
  filters,
  facetMap,
  onChange,
  onPageChange,
}: ProductsListProps) {
  return (
    <Flex {...styles.list}>
      <FiltersBar
        selectedSortOption={selectedSortOption}
        selectedRange={selectedRange}
        priceBounds={priceBounds}
        filters={filters}
        facetMap={facetMap}
        onChange={onChange}
      />
      {totalProducts === 0 || products.length === 0 ? (
        <ProductsListEmptyState showDescription />
      ) : (
        <>
          <Flex>
            <Flex as="section" {...styles.container} data-testid={TAG}>
              <ProductGrid
                productsResult={{ totalProducts, products, priceBounds }}
              />
            </Flex>
          </Flex>
          <ProductListPagination
            currentPageNumber={currentPageNumber}
            lastPageNumber={lastPageNumber}
            onPageChange={onPageChange}
          />
        </>
      )}
    </Flex>
  );
}
