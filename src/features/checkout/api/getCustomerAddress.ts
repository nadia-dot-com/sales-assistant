import "server-only";

import type { Address } from "@commercetools/platform-sdk";
import { customerServiceApiRoot } from "@/graphQl/client/user/client";

interface CustomerAddressData {
  address: Address | undefined;
  version: number;
}

export async function getCustomerAddress(
  customerId: string,
): Promise<CustomerAddressData> {
  const response = await customerServiceApiRoot()
    .customers()
    .withId({ ID: customerId })
    .get()
    .execute();

  const customer = response.body;
  const address =
    customer.addresses.find(
      (customerAddress) =>
        customerAddress.id === customer.defaultShippingAddressId,
    ) ?? customer.addresses[0];

  return { address, version: customer.version };
}
