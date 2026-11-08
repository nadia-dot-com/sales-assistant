import * as z from "zod";

export const LOWERCASE_REGEX = /[a-z]/;
export const UPPERCASE_REGEX = /[A-Z]/;
export const SPECIAL_CHARACTER_REGEX = /[^A-Za-z0-9]/;

export const loginSchema = z.object({
  email: z.email({ error: "authLayout.forms.errors.invalidEmail" }),
  password: z
    .string()
    .min(8, { error: "authLayout.forms.errors.password.tooShort" })
    .max(64, { error: "authLayout.forms.errors.password.tooLong" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z.email({ error: "authLayout.forms.errors.invalidEmail" }),
  password: z
    .string()
    .min(8, { error: "authLayout.forms.errors.password.tooShort" })
    .max(64, { error: "authLayout.forms.errors.password.tooLong" })
    .regex(LOWERCASE_REGEX, {
      error: "authLayout.forms.errors.password.lowercase",
    })
    .regex(UPPERCASE_REGEX, {
      error: "authLayout.forms.errors.password.uppercase",
    })
    .regex(SPECIAL_CHARACTER_REGEX, {
      error: "authLayout.forms.errors.password.special",
    }),
  firstName: z
    .string()
    .min(3, { error: "authLayout.forms.errors.firstName.tooShort" })
    .max(64, { error: "authLayout.forms.errors.firstName.tooLong" }),
  lastName: z
    .string()
    .min(3, { error: "authLayout.forms.errors.lastName.tooShort" })
    .max(64, { error: "authLayout.forms.errors.lastName.tooLong" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
