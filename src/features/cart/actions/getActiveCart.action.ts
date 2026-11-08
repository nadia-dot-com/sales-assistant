"use server";

import { cookies } from "next/headers";
import { CURRENCY } from "@/config/constants";
import { getServerSession } from "@/features/auth/session/getServerSession";
import { createAnonymousCart } from "@/features/cart/api/createAnonymousCart";
import { createCustomerCart } from "@/features/cart/api/createCustomerCart";
import { getCart } from "@/features/cart/api/getCart";
import { getCartIdCookie } from "@/features/cart/utils/getCartIdCookie";
import { setCartId } from "@/features/cart/utils/setCartId";
import { setCartVersion } from "@/features/cart/utils/setCartVersion";

export async function getActiveCart() {
  const cookieStore = await cookies();
  const session = await getServerSession();

  const cartId = getCartIdCookie(cookieStore);
  const existingCart = cartId ? await getCart(cartId) : null;

  if (existingCart && existingCart.cartState === "Active") {
    setCartVersion(cookieStore, existingCart.version);
    return existingCart;
  }

  const newCart = session
    ? await createCustomerCart(session.user.ctCustomerId, CURRENCY)
    : await createAnonymousCart(CURRENCY);
  setCartId(cookieStore, newCart.id);
  setCartVersion(cookieStore, newCart.version);

  return newCart;
}
