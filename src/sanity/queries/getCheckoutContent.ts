import { SANITY_SOURCE } from "@/config/env";
import { client } from "@/sanity/client";
import type { CheckoutType } from "@/sanity/types/checkout.types";
import { getBackupJson } from "@/sanity/utils/getBackupJson";

const CHECKOUT_QUERY = `*[_type == "checkout"][0]{
                           "checkoutSuccess": checkoutSuccess.asset ->url,
                           "checkoutError" : checkoutError.asset ->url,
                         }`;

const CHECKOUT_INITIAL: CheckoutType = {
  checkoutSuccess: {},
  checkoutError: {},
};

export async function getCheckoutContent(): Promise<CheckoutType> {
  if (SANITY_SOURCE === "local") {
    return getBackupJson("checkoutContent");
  }

  try {
    const content = await client.fetch(CHECKOUT_QUERY);

    const [checkoutSuccess, checkoutError] = await Promise.all([
      fetch(content.checkoutSuccess).then((res) => res.json()),
      fetch(content.checkoutError).then((res) => res.json()),
    ]);

    return {
      checkoutSuccess,
      checkoutError,
    };
  } catch (error) {
    console.error(
      "Error fetching checkout content content: ",
      error instanceof Error ? error.message : error,
    );
    return CHECKOUT_INITIAL;
  }
}
