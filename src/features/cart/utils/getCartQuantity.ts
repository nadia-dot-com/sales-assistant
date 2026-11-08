import { MAX_VISIBLE_CART_ITEMS_COUNT } from "@/config/constants";
import type { CartItem } from "@/features/cart/types/cartTypes.types";
import { getCartItemsCount } from "@/utils/getCartItemsCount";

export function getCartQuantity(cartItems: CartItem[]) {
  return getCartItemsCount(cartItems) >= MAX_VISIBLE_CART_ITEMS_COUNT
    ? `${MAX_VISIBLE_CART_ITEMS_COUNT}+`
    : getCartItemsCount(cartItems);
}
