import "server-only";

import type { Cart, CartDraft } from "@commercetools/platform-sdk";
import { httpApiRoot } from "@/graphQl/client/admin/client";

export async function createCustomerCart(
  customerId: string,
  currency: string,
): Promise<Cart> {
  const cartDraft: CartDraft = {
    currency: currency,
    customerId: customerId,
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
