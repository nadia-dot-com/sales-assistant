"use server";

import { cookies } from "next/headers";
import { CART_ID_KEY, CART_VERSION } from "@/features/cart/constants/cartKeys";

export async function clearCartCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(CART_ID_KEY);
  cookieStore.delete(CART_VERSION);
}
