"use server";

import type { CartUpdateAction } from "@commercetools/platform-sdk";
import { cookies } from "next/headers";
import { LOCALE } from "@/config/env.public";
import type { CartResponse } from "@/features/cart/types/cartTypes.types";
import { getCartVersionCookie } from "@/features/cart/utils/getCartVersionCookie";
import { mapLineItem } from "@/features/cart/utils/mapLineItem";
import { setCartVersion } from "@/features/cart/utils/setCartVersion";
import { httpApiRoot } from "@/graphQl/client/admin/client";

export async function removeCommercetoolsCartProduct(
  cartId: string,
  lineItemId: string,
): Promise<CartResponse> {
  const cookieStore = await cookies();
  const version = getCartVersionCookie(cookieStore);

  if (version === undefined) {
    throw new Error("Missing cart version");
  }

  const action: CartUpdateAction = { action: "removeLineItem", lineItemId };

  const response = await httpApiRoot
    .carts()
    .withId({ ID: cartId })
    .post({ body: { version, actions: [action] } })
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
