import { httpApiRoot } from "@/graphQl/client/admin/client";

export async function getCart(cartId: string) {
  try {
    const response = await httpApiRoot
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute();
    return response.body;
  } catch {
    return null;
  }
}
