import type { CartItem } from "@/features/cart/types/cartTypes.types";

export const getCartItemsCount = (cartItems: CartItem[]): number =>
  cartItems.reduce((acc, item) => item.quantity + acc, 0);
