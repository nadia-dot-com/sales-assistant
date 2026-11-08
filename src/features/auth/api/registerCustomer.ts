import "server-only";

import {
  type LoginResponse,
  loginCustomer,
} from "@/features/auth/api/loginCustomer";
import type { RegisterCustomerPayload } from "@/features/auth/types/auth.types";
import { customerServiceApiRoot } from "@/graphQl/client/user/client";

export async function registerCustomer(
  userPayload: RegisterCustomerPayload,
): Promise<LoginResponse> {
  const { email, password, firstName, lastName } = userPayload;

  await customerServiceApiRoot()
    .me()
    .signup()
    .post({
      body: {
        email,
        password,
        firstName,
        lastName,
      },
    })
    .execute();

  return loginCustomer(email, password);
}
