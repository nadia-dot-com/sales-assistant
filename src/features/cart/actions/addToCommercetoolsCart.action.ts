"use server";

import type { CartUpdateAction } from "@commercetools/platform-sdk";
import { cookies } from "next/headers";
import { LOCALE } from "@/config/env.public";
import { getActiveCart } from "@/features/cart/actions/getActiveCart.action";
import type { CartResponse } from "@/features/cart/types/cartTypes.types";
import { getCartVersionCookie } from "@/features/cart/utils/getCartVersionCookie";
import { mapLineItem } from "@/features/cart/utils/mapLineItem";
import { setCartVersion } from "@/features/cart/utils/setCartVersion";
import { httpApiRoot } from "@/graphQl/client/admin/client";

export async function addToCommercetoolsCart(
  sku: string,
  quantity: number = 1,
  cartId?: string,
): Promise<CartResponse> {
  const cookieStore = await cookies();
  const cartVersion = getCartVersionCookie(cookieStore);

  const cart =
    cartId && cartVersion !== undefined
      ? { id: cartId, version: cartVersion }
      : await getActiveCart();

  const addLineItemAction: CartUpdateAction = {
    action: "addLineItem",
    sku,
    quantity,
  };

  const response = await httpApiRoot
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [addLineItemAction],
      },
    })
    .execute();

  const actualCart = response.body;
  setCartVersion(cookieStore, actualCart.version);

  return {
    cartId: actualCart.id,
    cartItems: actualCart.lineItems.map((lineItem) =>
      mapLineItem(lineItem, LOCALE),
    ),
    totalPrice: {
      centAmount: actualCart.totalPrice.centAmount,
      currencyCode: actualCart.totalPrice.currencyCode,
    },
  };
}
