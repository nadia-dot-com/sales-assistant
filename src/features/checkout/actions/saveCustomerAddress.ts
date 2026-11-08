"use server";

import type { Address, AddressDraft } from "@commercetools/platform-sdk";
import { customerServiceApiRoot } from "@/graphQl/client/user/client";
import type { AddressSchema } from "@/zod/schema/addressSchema";

const ADDRESS_KEY = "checkout-default";

interface SaveAddressResult extends ActionResponse {
  address?: Address;
}

export async function saveCustomerAddress(
  customerId: string,
  version: number,
  data: AddressSchema,
): Promise<SaveAddressResult> {
  const addressDraft: AddressDraft = {
    key: ADDRESS_KEY,
    ...data,
  };

  try {
    const response = await customerServiceApiRoot()
      .customers()
      .withId({ ID: customerId })
      .post({
        body: {
          version,
          actions: [
            { action: "addAddress", address: addressDraft },
            {
              action: "setDefaultShippingAddress",
              addressKey: ADDRESS_KEY,
            },
          ],
        },
      })
      .execute();

    const address = response.body.addresses.find(
      (customerAddress) => customerAddress.key === ADDRESS_KEY,
    );

    return { error: false, message: "", address };
  } catch (error) {
    console.error(
      "Error saving customer address:",
      error instanceof Error ? error.message : error,
    );
    return { error: true, message: "checkoutPage.address.errors.saveFailed" };
  }
}
