import { Center, Heading } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import { CategorySearch } from "@/components/organisms/CategorySearch/CategorySearch";
import { QuerySearch } from "@/components/organisms/QuerySearch/QuerySearch";
import { getProductFacets } from "@/features/product/api/getProductFacets";
import { buildFacets } from "@/features/product/helpers/facets/buildFacets";
import { addFacetPrefix } from "@/features/product/helpers/facets/facetPrefix";
import type { PriceRange } from "@/features/product/helpers/priceRange/priceRange.type";
import type { SortOption } from "@/features/product/helpers/sort/sortOptions";
import { searchParamValue } from "@/lib/helpers/searchParamValue";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

interface SearchPageProps extends Omit<PageProps<"/search">, "params"> {}

export interface SearchPage {
  page: number;
}

export interface FiltersAppliedType {
  key: string;
  selectedOptions: string[] | undefined;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const [
    ,
    {
      query,
      firstLevelCategory,
      searchCategory,
      page,
      sort,
      priceFrom,
      priceTo,
      ...attributes
    },
    { facets, facetMap },
  ] = await Promise.all([
    getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.searchPage),
    searchParams,
    getProductFacets(),
  ]);
  const t = await getTranslations();
  const buildedFacets = buildFacets(facets);

  const queryValue = searchParamValue(query);
  const firstLevelCategoryValue = searchParamValue(firstLevelCategory);
  const searchCategoryValue = searchParamValue(searchCategory);
  const pageNumber = Number(searchParamValue(page)) || 1;

  const sortValue = sort ?? "name_asc";

  const priceFromValue = searchParamValue(priceFrom);
  const priceToValue = searchParamValue(priceTo);
  const priceRange: PriceRange = { from: priceFromValue, to: priceToValue };
  const filtersApplied: FiltersAppliedType[] = Object.entries(attributes).map(
    ([key, value]) => {
      const rawValue = searchParamValue(value);
      return {
        key: addFacetPrefix(key),
        selectedOptions: rawValue
          ? rawValue.split(".").filter(Boolean).map(addFacetPrefix)
          : [],
      };
    },
  );

  if (query) {
    return (
      <QuerySearch
        query={queryValue}
        page={pageNumber}
        selectedSortOption={sortValue as SortOption}
        selectedRange={priceRange}
        buildedFacets={buildedFacets}
        facetMap={facetMap}
        filtersApplied={filtersApplied}
      />
    );
  }

  if (firstLevelCategory && searchCategory) {
    return (
      <CategorySearch
        firstLevelCategory={firstLevelCategoryValue}
        searchCategory={searchCategoryValue}
        page={pageNumber}
        selectedSortOption={sortValue as SortOption}
        selectedRange={priceRange}
        buildedFacets={buildedFacets}
        facetMap={facetMap}
        filtersApplied={filtersApplied}
      />
    );
  }

  return (
    <Center>
      <Heading as="h1">{t("searchPage.error.invalidSearch")}</Heading>
    </Center>
  );
}
