"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import {
  createContext,
  startTransition,
  useActionState,
  useCallback,
  useMemo,
} from "react";
import {
  ADD_TO_CART,
  CLEAN_CART,
  REMOVE_FROM_CART,
  SET_CART,
  UPDATE_QUANTITY,
  updateCartAction,
} from "@/features/cart/context/reducer";
import type {
  CartContextValue,
  CartStateValue,
} from "@/features/cart/types/cartTypes.types";
import { createContextHook } from "@/hooks/createContextHook";

export const CartContext = createContext<CartContextValue | null>(null);

export const INITIAL_CART_STATE: CartStateValue = {
  cartId: null,
  cartItems: [],
  totalPrice: null,
};

interface CartPoviderProps {
  children: ReactNode;
  initialCartState: CartStateValue | null;
}

export function CartProvider({ children, initialCartState }: CartPoviderProps) {
  const t = useTranslations();
  const boundUpdateCartAction = useCallback(
    (
      prevState: CartStateValue,
      actionPayload: Parameters<typeof updateCartAction>[1],
    ) => updateCartAction(prevState, actionPayload, t),
    [t],
  );

  const [cartState, dispatchCartAction, isPending] = useActionState(
    boundUpdateCartAction,
    initialCartState || INITIAL_CART_STATE,
  );

  const addToCart = useCallback(
    (sku: string, quantity: number = 1) => {
      startTransition(() => {
        dispatchCartAction({ type: ADD_TO_CART, payload: { sku, quantity } });
      });
    },
    [dispatchCartAction],
  );

  const updateQuantity = useCallback(
    (lineItemId: string, quantity: number) => {
      startTransition(() => {
        dispatchCartAction({
          type: UPDATE_QUANTITY,
          payload: { lineItemId, quantity },
        });
      });
    },
    [dispatchCartAction],
  );

  const removeFromCart = useCallback(
    (lineItemId: string) => {
      startTransition(() => {
        dispatchCartAction({ type: REMOVE_FROM_CART, payload: { lineItemId } });
      });
    },
    [dispatchCartAction],
  );

  const refreshCart = useCallback(() => {
    startTransition(() => {
      dispatchCartAction({ type: SET_CART });
    });
  }, [dispatchCartAction]);

  const resetCart = useCallback(() => {
    startTransition(() => {
      dispatchCartAction({ type: CLEAN_CART });
    });
  }, [dispatchCartAction]);

  const value = useMemo(
    () => ({
      cartId: cartState.cartId,
      cartItems: cartState.cartItems,
      totalPrice: cartState.totalPrice,
      addToCart,
      updateQuantity,
      removeFromCart,
      refreshCart,
      resetCart,
      isPending,
    }),
    [
      cartState,
      addToCart,
      updateQuantity,
      removeFromCart,
      refreshCart,
      resetCart,
      isPending,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartContext = createContextHook(CartContext, CartProvider);
