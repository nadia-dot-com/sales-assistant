"use server";
import { APIError } from "better-auth/api";
import { auth } from "@/features/auth/config/server/auth";
import type { LoginSchema } from "@/zod/schema/authSchema";

export const loginAction = async (
  data: LoginSchema,
): Promise<ActionResponse> => {
  const { email, password } = data;

  try {
    await auth.api.signInCommercetools({
      body: {
        email,
        password,
      },
    });

    return { error: false, message: "" };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        error: true,
        message: "authLayout.forms.errors.invalidCredentials",
      };
    }

    return { error: true, message: "common.errors.unexpected" };
  }
};
