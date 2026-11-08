import { LOW_STOCK } from "@/config/stock";

export function defineLowStock(availableQuantity: number) {
  return availableQuantity <= LOW_STOCK;
}
