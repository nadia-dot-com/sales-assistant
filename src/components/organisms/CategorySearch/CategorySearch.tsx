import { Flex, Heading } from "@chakra-ui/react";
import type { FiltersAppliedType, SearchPage } from "@/app/(shop)/search/page";
import { CategoryBreadcrumb } from "@/components/molecules/CategoryBreadcrumb/CategoryBreadcrumb";
import { CategoryStack } from "@/components/molecules/CategoryStack/CategoryStack";
import { CategoryTree } from "@/components/molecules/CategoryTree/CategoryTree";
import { styles } from "@/components/organisms/CategorySearch//CategorySearch.styles";
import type { PriceRangeSliderProps } from "@/components/organisms/FiltersBar/PriceRangeSlider/PriceRangeSlider";
import { PRODUCTS_PER_PAGE_LIMIT } from "@/config/constants";
import { getProductsInCategory } from "@/features/product/api/getProductsInCategory";
import { ProductsList } from "@/features/product/components/ProductsList/ProductsList";
import type { SearchFacetInput } from "@/features/product/helpers/filterAndFacetsTypes/filterAndFacetsTypes.types";
import type { SortOption } from "@/features/product/helpers/sort/sortOptions";
import type { ProductFacetResponse } from "@/features/product/types/productResponse.types";
import { findCategoryPath } from "@/lib/category/findCategory";
import { getCategoryTree } from "@/sanity/queries/getCategoryTree";

interface CategorySearchProps
  extends SearchPage,
    Omit<PriceRangeSliderProps, "performMutation" | "priceBounds">,
    Omit<ProductFacetResponse, "facets"> {
  selectedSortOption: SortOption;
  firstLevelCategory: string;
  searchCategory: string;
  buildedFacets: SearchFacetInput[];
  filtersApplied: FiltersAppliedType[];
}

const TAG = "CategorySearch";

export async function CategorySearch({
  firstLevelCategory,
  searchCategory,
  page,
  selectedSortOption,
  selectedRange,
  facetMap,
  buildedFacets,
  filtersApplied,
}: CategorySearchProps) {
  const [categoryTree, { totalProducts, products, priceBounds, facets }] =
    await Promise.all([
      getCategoryTree(firstLevelCategory as string),
      getProductsInCategory(
        page,
        searchCategory as string,
        selectedSortOption,
        selectedRange,
        buildedFacets,
        facetMap,
        filtersApplied,
      ),
    ]);

  const currentCategoryTree = findCategoryPath(categoryTree, searchCategory);
  const currentCategory = currentCategoryTree[currentCategoryTree.length - 1];
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
      <Flex {...styles.topSection}>
        <CategoryBreadcrumb categoryList={currentCategoryTree} />
        <Heading as="h1" {...styles.h1}>
          {currentCategory?.title}
        </Heading>
      </Flex>
      <Flex {...styles.wrapper}>
        <CategoryTree
          category={categoryTree}
          currentCategoryId={searchCategory}
        />
        {currentCategory.children && (
          <CategoryStack
            firstLevelCategory={firstLevelCategory}
            categories={currentCategory.children}
            currentCategory={currentCategory}
          />
        )}
        <ProductsList
          totalProducts={totalProducts}
          products={products}
          currentPageNumber={page}
          lastPageNumber={lastPageNumber}
          selectedSortOption={selectedSortOption}
          selectedRange={selectedRange}
          priceBounds={priceBounds}
          filters={filtersAppliedToFacets}
          facetMap={facetMap}
        />
      </Flex>
    </Flex>
  );
}
