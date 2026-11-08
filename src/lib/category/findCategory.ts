import type { Category } from "@/lib/category/category.types";

export function findCategory(
  root: Category | undefined,
  predicate: (category: Category) => boolean,
): Category | undefined {
  if (!root) return undefined;
  if (predicate(root)) return root;

  for (const child of root.children ?? []) {
    const match = findCategory(child, predicate);
    if (match) return match;
  }

  return undefined;
}

export function findCategoryPath(
  root: Category | undefined,
  id: string,
): Category[] {
  if (!root) return [];
  if (root.id === id) return [root];

  for (const child of root.children ?? []) {
    const path = findCategoryPath(child, id);
    if (path.length) return [root, ...path];
  }

  return [];
}
