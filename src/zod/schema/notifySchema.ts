import * as z from "zod";

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const notifySchema = z.object({
  email: z.string().regex(EMAIL_PATTERN),
});
