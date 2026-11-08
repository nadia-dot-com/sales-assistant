"use server";

import { cookies } from "next/headers";
import { getCartIdCookie } from "@/features/cart/utils/getCartIdCookie";
import { getCartVersionCookie } from "@/features/cart/utils/getCartVersionCookie";
import { httpApiRoot } from "@/graphQl/client/admin/client";

export async function cleanCart() {
  const cookieStore = await cookies();
  const version = getCartVersionCookie(cookieStore);
  const cartId = getCartIdCookie(cookieStore);
  if (version === undefined) {
    throw new Error("Missing cart version");
  }

  if (cartId === undefined) {
    throw new Error("Missing cart id");
  }

  await httpApiRoot
    .carts()
    .withId({ ID: cartId })
    .delete({
      queryArgs: {
        version,
      },
    })
    .execute();
}
