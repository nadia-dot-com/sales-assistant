import "server-only";

import type { Cart, Customer } from "@commercetools/platform-sdk";
import { passwordFlowLogin } from "@/features/auth/api/passwordFlowLogin";
import type { CommerceToolsToken } from "@/features/auth/types/auth.types";
import { customerServiceApiRoot } from "@/graphQl/client/user/client";

export interface LoginResponse {
  tokens: CommerceToolsToken;
  customer: Customer;
  cart?: Cart;
}

export async function loginCustomer(
  email: string,
  password: string,
  anonymousCartId?: string,
): Promise<LoginResponse> {
  const tokens = await passwordFlowLogin(email, password);

  const { body } = await customerServiceApiRoot()
    .login()
    .post({
      body: {
        email,
        password,
        ...(anonymousCartId && {
          anonymousCart: { typeId: "cart", id: anonymousCartId },
          anonymousCartSignInMode: "MergeWithExistingCustomerCart",
        }),
      },
    })
    .execute();

  return { tokens, customer: body.customer, cart: body.cart };
}
