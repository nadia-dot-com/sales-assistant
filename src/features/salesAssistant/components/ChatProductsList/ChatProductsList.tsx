"use client";

import { Flex } from "@chakra-ui/react";
import { ResponseTail } from "@/components/atoms/ResponseTail/ResponseTail";
import type { FilterProps } from "@/components/organisms/FiltersBar/Filter/Filter";
import { FiltersBar } from "@/components/organisms/FiltersBar/FiltersBar";
import type { PriceRangeSliderProps } from "@/components/organisms/FiltersBar/PriceRangeSlider/PriceRangeSlider";
import { CHAT_PRODUCTS_PER_PAGE_LIMIT } from "@/config/constants";
import { ProductGrid } from "@/features/product/components/ProductsGrid/ProductsGrid";
import { ProductsListEmptyState } from "@/features/product/components/ProductsList/ProductListEmptyState/ProductListEmptyState";
import {
  ProductListPagination,
  type ProductPagePagination,
} from "@/features/product/components/ProductsList/ProductListPagination/ProductListPagination";
import type {
  ProductFacetResponse,
  ProductsResponse,
} from "@/features/product/types/productResponse.types";
import { styles } from "@/features/salesAssistant/components/ChatProductsList/ChatProductsList.styles";
import type { Category } from "@/lib/category/category.types";

interface ChatProductsListProps
  extends ProductsResponse,
    ProductPagePagination,
    Omit<PriceRangeSliderProps, "performMutation"> {
  currentCategory?: Category;
  filters: Omit<FilterProps, "performMutation">[] | undefined;
  facetMap: ProductFacetResponse["facetMap"];
  onChange?: (params: URLSearchParams) => void;
  onPageChange?: (page: number) => void;
}

const TAG = "ProductsList";

export function ChatProductsList({
  totalProducts,
  products,
  currentPageNumber,
  lastPageNumber,
  selectedRange,
  priceBounds,
  filters,
  facetMap,
  onChange,
  onPageChange,
}: ChatProductsListProps) {
  return (
    <Flex {...styles.list}>
      <Flex {...styles.outsideContainer}>
        <Flex as="section" {...styles.container} data-testid={TAG}>
          <FiltersBar
            selectedRange={selectedRange}
            priceBounds={priceBounds}
            filters={filters}
            facetMap={facetMap}
            onChange={onChange}
          />
          {totalProducts === 0 || products.length === 0 ? (
            <Flex {...styles.emptyState}>
              <ProductsListEmptyState />
            </Flex>
          ) : (
            <ProductGrid
              productsResult={{ totalProducts, products, priceBounds }}
              isChat={true}
            />
          )}
        </Flex>
        <ResponseTail />
        {totalProducts > CHAT_PRODUCTS_PER_PAGE_LIMIT && (
          <Flex {...styles.paginationContainer}>
            <ProductListPagination
              currentPageNumber={currentPageNumber}
              lastPageNumber={lastPageNumber}
              onPageChange={onPageChange}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
