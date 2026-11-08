import { stripFacetPrefix } from "@/features/product/helpers/facets/facetPrefix";

export function removeFacetOption(
  params: URLSearchParams,
  facet: string,
  option: string,
) {
  const key = stripFacetPrefix(facet);
  const restOptions = params
    .get(key)
    ?.split(".")
    .filter((value) => value !== stripFacetPrefix(option));

  restOptions?.length
    ? params.set(key, restOptions.join("."))
    : params.delete(key);
}

export function clearFilters(params: URLSearchParams) {
  const query = params.get("query");
  const firstLevelCategory = params.get("firstLevelCategory");
  const searchCategory = params.get("searchCategory");
  const filters = [...params.keys()];

  filters.forEach((key) => {
    params.delete(key);
  });

  if (query) {
    params.set("query", query);
  } else if (firstLevelCategory && searchCategory) {
    params.set("firstLevelCategory", firstLevelCategory);
    params.set("searchCategory", searchCategory);
  }
}
