import * as z from "zod";
import { CASH, PAYMENT_CARD } from "@/config/constants";

export const checkoutSchema = z.object({
  contact: z.object({
    email: z.email({ error: "checkoutPage.errors.invalidEmail" }),
  }),
  address: z.object({
    pinned: z.literal(true, { error: "checkoutPage.errors.required" }),
  }),
  delivery: z.object({
    method: z.literal("pickup"),
  }),
  payment: z.object({
    method: z.enum([CASH, PAYMENT_CARD]),
    acceptTerms: z.literal(true, {
      error: "checkoutPage.errors.termsRequired",
    }),
  }),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
