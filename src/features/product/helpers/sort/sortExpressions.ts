import "server-only";

import { LOCALE } from "@/config/env.public";
import type { SortOption } from "@/features/product/helpers/sort/sortOptions";

export const SORT_EXPRESSIONS = {
  name_asc: `name.${LOCALE} asc`,
  name_desc: `name.${LOCALE} desc`,
  price_asc: "price asc",
  price_desc: "price desc",
} satisfies Record<SortOption, string>;
