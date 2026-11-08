"use server";

import { cookies } from "next/headers";
import { LOCALE } from "@/config/env.public";
import { getServerSession } from "@/features/auth/session/getServerSession";
import { getCart } from "@/features/cart/api/getCart";
import { ANONYMOUS_ID_KEY } from "@/features/cart/constants/cartKeys";
import type { CartResponse } from "@/features/cart/types/cartTypes.types";
import { getCartIdCookie } from "@/features/cart/utils/getCartIdCookie";
import { mapLineItem } from "@/features/cart/utils/mapLineItem";

export async function getStoredCart(): Promise<CartResponse | null> {
  const cookieStore = await cookies();
  const anonymousId = cookieStore.get(ANONYMOUS_ID_KEY)?.value;
  const session = await getServerSession();

  if (!anonymousId && !session) {
    return null;
  }

  const cartId = getCartIdCookie(cookieStore);

  if (!cartId) {
    return null;
  }

  const existingCart = await getCart(cartId);

  if (existingCart && existingCart.cartState === "Active") {
    return {
      cartId: existingCart.id,
      cartItems: existingCart.lineItems.map((lineItem) =>
        mapLineItem(lineItem, LOCALE),
      ),
      totalPrice: {
        centAmount: existingCart.totalPrice.centAmount,
        currencyCode: existingCart.totalPrice.currencyCode,
      },
    };
  }

  return null;
}
