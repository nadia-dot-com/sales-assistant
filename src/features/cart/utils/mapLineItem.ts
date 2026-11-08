import type { LineItem } from "@commercetools/platform-sdk";
import type { CartItem } from "@/features/cart/types/cartTypes.types";
import { defineLowStock } from "@/features/product/utils/defineLowStock";

export function mapLineItem(lineItem: LineItem, locale: string): CartItem {
  const availability = lineItem.variant.availability;

  return {
    id: lineItem.id,
    productKey: lineItem.productKey ?? "",
    name: lineItem.name[locale],
    img: {
      url: lineItem.variant.images?.[0]?.url ?? "",
      alt: lineItem.name[locale],
    },
    price: {
      centAmount: lineItem.price.value.centAmount,
      currencyCode: lineItem.price.value.currencyCode,
    },
    totalPrice: {
      centAmount: lineItem.totalPrice.centAmount,
      currencyCode: lineItem.totalPrice.currencyCode,
    },
    discounted: lineItem.price.discounted
      ? {
          name: lineItem.price.discounted.discount.obj?.name?.[locale] ?? "",
          centAmount: lineItem.price.discounted.value.centAmount,
        }
      : null,
    availability: {
      isOnStock: availability?.isOnStock ?? false,
      lowStock: defineLowStock(availability?.availableQuantity ?? 0),
    },
    quantity: lineItem.quantity,
  };
}
