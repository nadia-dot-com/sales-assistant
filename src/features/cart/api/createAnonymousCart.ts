import "server-only";

import type { Cart, CartDraft } from "@commercetools/platform-sdk";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { ANONYMOUS_ID_KEY } from "@/features/cart/constants/cartKeys";
import { httpApiRoot } from "@/graphQl/client/admin/client";

export async function createAnonymousCart(currency: string): Promise<Cart> {
  const cookieStore = await cookies();

  let anonymousId = cookieStore.get(ANONYMOUS_ID_KEY)?.value;

  if (!anonymousId) {
    anonymousId = uuidv4();
    cookieStore.set(ANONYMOUS_ID_KEY, anonymousId);
  }

  const cartDraft: CartDraft = {
    currency: currency,
    anonymousId: anonymousId,
    inventoryMode: "ReserveOnCart",
  };

  const response = await httpApiRoot
    .carts()
    .post({
      body: cartDraft,
    })
    .execute();

  return response.body;
}
