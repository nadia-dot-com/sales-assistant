"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { auth } from "@/features/auth/config/server/auth";

export const logoutAction = async (): Promise<void> => {
  await auth.api.signOutCommercetools({
    headers: await headers(),
  });

  redirect(routes.home);
};
