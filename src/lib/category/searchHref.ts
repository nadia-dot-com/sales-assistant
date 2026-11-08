export function searchHref(
  query: string | null,
  firstLevelCategory: string,
  searchCategory: string,
  page: number,
): string {
  const params: Record<string, string> = {};

  if (query) {
    params.query = query;
  } else {
    params.firstLevelCategory = firstLevelCategory;
    params.searchCategory = searchCategory;
  }

  if (page) {
    params.page = page.toString();
  }

  return `/search?${new URLSearchParams(params)}`;
}
