export type StockStatus = "inStock" | "lowStock" | "outOfStock";

export function defineStockStatus(
  isOnStock: boolean,
  lowStock: boolean,
): StockStatus {
  if (!isOnStock) return "outOfStock";
  if (lowStock) return "lowStock";
  return "inStock";
}
