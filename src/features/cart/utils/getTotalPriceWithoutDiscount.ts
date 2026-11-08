import type { CartItem } from "@/features/cart/types/cartTypes.types";
import type { PriceType } from "@/types/price.types";

export function getTotalPriceWithoutDiscount(
  cartItems: CartItem[],
  currencyCode: string,
): PriceType {
  const centAmount = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.price.centAmount * cartItem.quantity,
    0,
  );

  return { centAmount, currencyCode };
}
