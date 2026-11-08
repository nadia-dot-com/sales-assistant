import { SANITY_SOURCE } from "@/config/env";
import type { Category } from "@/lib/category/category.types";
import { client } from "@/sanity/client";
import { getBackupJson } from "@/sanity/utils/getBackupJson";

export async function getCategoryTree(categoryKey: string): Promise<Category> {
  if (SANITY_SOURCE === "local") {
    return getBackupJson(categoryKey);
  }

  const CATEGORY_TREE_QUERY = `*[_id == "categories-en"][0] {
  categories[key == "${categoryKey}"] 
}`;

  const { categories } = await client.fetch(CATEGORY_TREE_QUERY);

  return categories[0];
}
