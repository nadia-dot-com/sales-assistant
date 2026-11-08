import { HIGH_STOCK, LOW_STOCK, OUT_OF_STOCK } from "@/config/stock";

export function defineMaxStock(isOnStock: boolean, lowStock: boolean) {
  if (!isOnStock) {
    return OUT_OF_STOCK;
  }

  if (lowStock) {
    return LOW_STOCK;
  } else {
    return HIGH_STOCK;
  }
}
