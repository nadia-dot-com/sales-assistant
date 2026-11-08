import type { ProductImage } from "@/features/product/types/product.types";
import type { DiscountedType, PriceType } from "@/types/price.types";

export interface CartItem {
  id: string;
  productKey: string;
  name: string;
  img: ProductImage;
  price: PriceType;
  totalPrice: PriceType;
  discounted: DiscountedType | null;
  availability: {
    isOnStock: boolean;
    lowStock: boolean;
  };
  quantity: number;
}

export interface CartResponse {
  cartId: string;
  cartItems: CartItem[];
  totalPrice: PriceType;
}

export interface CartStateValue {
  cartId: string | null;
  cartItems: CartItem[];
  totalPrice: PriceType | null;
}

export interface CartContextValue extends CartStateValue {
  addToCart: (sku: string, quantity?: number) => void;
  updateQuantity: (lineItemId: string, quantity: number) => void;
  removeFromCart: (lineItemId: string) => void;
  refreshCart: () => void;
  resetCart: () => void;
  isPending: boolean;
}
