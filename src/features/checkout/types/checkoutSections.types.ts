import type { CASH, PAYMENT_CARD } from "@/config/constants";

export enum CheckoutValues {
  Contact = "contact",
  Address = "address",
  Delivery = "delivery",
  Payment = "payment",
}

export interface SelectedOptions {
  address: boolean;
  delivery: boolean;
  payment: boolean;
}

export type DeliveryOption = "default" | "new";

export type PaymentOption = typeof CASH | typeof PAYMENT_CARD;

export interface PaymentOptionItem {
  value: PaymentOption;
  label: string;
}
