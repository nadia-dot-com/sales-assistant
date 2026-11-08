import type { useTranslations } from "next-intl";
import { toaster } from "@/components/ui/toaster/toaster";
import { MIN_QUANTITY } from "@/config/constants";
import { addToCommercetoolsCart } from "@/features/cart/actions/addToCommercetoolsCart.action";
import { getStoredCart } from "@/features/cart/actions/getStoredCart.action";
import { removeCommercetoolsCartProduct } from "@/features/cart/actions/removeCommercetoolsCartProduct.action";
import { updateCommercetoolsCartQuantity } from "@/features/cart/actions/updateCommercetoolsCartQuantity.action";
import { INITIAL_CART_STATE } from "@/features/cart/context/CartContext";
import type {
  CartItem,
  CartStateValue,
} from "@/features/cart/types/cartTypes.types";
import { clearCartCookies } from "@/features/cart/utils/clearCartCookies";
import type { PriceType } from "@/types/price.types";
import { getCartItemsCount } from "@/utils/getCartItemsCount";

export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_CART = "SET_CART";
export const CLEAN_CART = "CLEAN_CART";

export type CartState = {
  cartId: string | null;
  cartItems: CartItem[];
  totalPrice: PriceType | null;
};

export type CartAction =
  | {
      type: typeof ADD_TO_CART;
      payload: {
        sku: string;
        quantity: number;
      };
    }
  | {
      type: typeof UPDATE_QUANTITY;
      payload: {
        lineItemId: string;
        quantity: number;
      };
    }
  | {
      type: typeof REMOVE_FROM_CART;
      payload: {
        lineItemId: string;
      };
    }
  | {
      type: typeof SET_CART;
    }
  | {
      type: typeof CLEAN_CART;
    };

export async function updateCartAction(
  prevState: CartStateValue,
  actionPayload: CartAction,
  t: ReturnType<typeof useTranslations>,
): Promise<CartStateValue> {
  try {
    switch (actionPayload.type) {
      case ADD_TO_CART: {
        const cart = await addToCommercetoolsCart(
          actionPayload.payload.sku,
          actionPayload.payload.quantity || MIN_QUANTITY,
          prevState.cartId ?? undefined,
        );

        const previousTotalQuantity = getCartItemsCount(prevState.cartItems);
        const newTotalQuantity = getCartItemsCount(cart.cartItems);

        if (newTotalQuantity <= previousTotalQuantity) {
          toaster.error({
            title: t("common.cartToasts.addToCart.error.title"),
            description: t("common.cartToasts.addToCart.error.description"),
            closable: true,
          });
          return prevState;
        }

        toaster.success({
          title: t("common.cartToasts.addToCart.success.title"),
          description: t("common.cartToasts.addToCart.success.description"),
          closable: true,
        });
        return {
          cartId: cart.cartId,
          cartItems: cart.cartItems,
          totalPrice: cart.totalPrice,
        };
      }
      case UPDATE_QUANTITY: {
        if (!prevState.cartId) return prevState;

        const cart = await updateCommercetoolsCartQuantity(
          prevState.cartId,
          actionPayload.payload.lineItemId,
          actionPayload.payload.quantity,
        );

        const requestedQuantity = actionPayload.payload.quantity;
        const actualQuantity =
          cart.cartItems.find(
            (item) => item.id === actionPayload.payload.lineItemId,
          )?.quantity ?? 0;

        if (actualQuantity !== requestedQuantity) {
          toaster.error({
            title: t("common.cartToasts.updateQuantity.error.title"),
            description: t(
              "common.cartToasts.updateQuantity.error.description",
            ),
            closable: true,
          });
          return prevState;
        }

        return {
          cartId: cart.cartId,
          cartItems: cart.cartItems,
          totalPrice: cart.totalPrice,
        };
      }
      case REMOVE_FROM_CART: {
        if (!prevState.cartId) return prevState;
        const cart = await removeCommercetoolsCartProduct(
          prevState.cartId,
          actionPayload.payload.lineItemId,
        );
        return {
          cartId: cart.cartId,
          cartItems: cart.cartItems,
          totalPrice: cart.totalPrice,
        };
      }
      case SET_CART: {
        const cart = await getStoredCart();
        return cart || INITIAL_CART_STATE;
      }
      case CLEAN_CART: {
        await clearCartCookies();
        return INITIAL_CART_STATE;
      }
      default:
        return prevState;
    }
  } catch {
    const key =
      actionPayload.type === "ADD_TO_CART"
        ? "addToCart"
        : actionPayload.type === "UPDATE_QUANTITY"
          ? "updateQuantity"
          : "removeFromCart";
    toaster.error({
      title: t(`common.cartToasts.${key}.error.title`),
      description: t(`common.cartToasts.${key}.error.description`),
      closable: true,
    });
    return prevState;
  }
}
