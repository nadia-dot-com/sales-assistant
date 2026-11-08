export const SORT_OPTIONS = [
  "name_asc",
  "name_desc",
  "price_asc",
  "price_desc",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];
