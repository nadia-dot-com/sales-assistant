"use server";

import { SECOND } from "@/config/constants";
import type { NotifyFormStatus } from "@/features/product/types/notifyFormStatus.types";
import { pause } from "@/utils/pause";
import { notifySchema } from "@/zod/schema/notifySchema";

//TODO add send Notify Form logic
export async function sendNotifyForm(
  _: NotifyFormStatus | null,
  formData: FormData,
): Promise<NotifyFormStatus> {
  const rawEmail = String(formData.get("email"));
  const result = notifySchema.safeParse({ email: rawEmail });

  await pause(2 * SECOND);

  if (!result.success) {
    return {
      success: false,
      error: true,
      email: rawEmail,
    };
  }

  return {
    success: true,
    error: false,
    email: result.data.email,
  };
}
