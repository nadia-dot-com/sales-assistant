"use server";
import { APIError } from "better-auth/api";
import { auth } from "@/features/auth/config/server/auth";
import type { RegisterSchema } from "@/zod/schema/authSchema";

export const registerAction = async (
  data: RegisterSchema,
): Promise<ActionResponse> => {
  const { email, password, firstName, lastName } = data;

  try {
    await auth.api.signUpCommercetools({
      body: {
        email,
        password,
        firstName,
        lastName,
      },
    });

    return { error: false, message: "" };
  } catch (error) {
    if (error instanceof APIError) {
      if (error.body?.code === "DuplicateField") {
        return { error: true, message: "registerPage.duplicatedAccount" };
      }

      return { error: true, message: "registerPage.error.unableToRegister" };
    }

    return { error: true, message: "common.errors.unexpected" };
  }
};
