import { SANITY_SOURCE } from "@/config/env";
import { LOCALE } from "@/config/env.public";
import type { Category } from "@/lib/category/category.types";
import { client } from "@/sanity/client";
import { getBackupJson } from "@/sanity/utils/getBackupJson";

export async function getCategories(): Promise<Category[]> {
  if (SANITY_SOURCE === "local") {
    const categories = (await getBackupJson("categories")) as Category[];

    return categories;
  }

  const CATEGORIES_QUERY = `*[_id == "categories-${LOCALE}"][0]{
    categories[show == true]{
      id,
      title,
      key,
      children[] | order(show desc){
        id,
        title,
        show,
        key,
        children[show == true]{
          id,
          title,
          show,
          key
        }
      }
    }
  }
`;

  const { categories } = await client.fetch(CATEGORIES_QUERY);

  return categories;
}
