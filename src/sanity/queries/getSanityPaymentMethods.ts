import { SANITY_SOURCE } from "@/config/env";
import { LOCALE } from "@/config/env.public";
import { client } from "@/sanity/client";
import type { PaymentMethod } from "@/sanity/types/footer.types";
import type { FooterPaymentMethod } from "@/sanity/types/footerContent.types";
import { getBackupJson } from "@/sanity/utils/getBackupJson";

const PAYMENT_METHODS_QUERY = `*[_id == "paymentMethods-${LOCALE}"][0].payment[]{ paymentMethodName, paymentMethodIcon }`;

export async function getSanityPaymentMethods(): Promise<
  FooterPaymentMethod[]
> {
  if (SANITY_SOURCE === "local") {
    return getBackupJson("paymentMethods") as Promise<FooterPaymentMethod[]>;
  }
  try {
    const paymentMethods: PaymentMethod[] | null = await client.fetch(
      PAYMENT_METHODS_QUERY,
    );

    return (paymentMethods ?? []).map((paymentMethod) => ({
      name: paymentMethod.paymentMethodName,
      icon: paymentMethod.paymentMethodIcon,
    }));
  } catch (error) {
    console.error(
      "Error fetching payment methods:",
      error instanceof Error ? error.message : error,
    );
    return [];
  }
}
