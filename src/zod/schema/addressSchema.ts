import * as z from "zod";

const isSpace = (value: string) => value.trim() === "";

const requiredText = (errorMessage: string) =>
  z
    .string()
    .min(1, { error: errorMessage })
    .refine((value: string) => !isSpace(value), {
      error: errorMessage,
    });

export const addressSchema = z.object({
  streetName: requiredText("checkoutPage.address.streetName.errors.required"),
  streetNumber: requiredText(
    "checkoutPage.address.streetNumber.errors.required",
  ),
  city: requiredText("checkoutPage.address.city.errors.required"),
  postalCode: requiredText("checkoutPage.address.postalCode.errors.required"),
  country: z
    .string()
    .length(2, { error: "checkoutPage.address.errors.invalidCountry" }),
});

export type AddressSchema = z.infer<typeof addressSchema>;
