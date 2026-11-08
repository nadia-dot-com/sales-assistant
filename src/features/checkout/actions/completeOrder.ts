"use server";
import { SECOND } from "@/config/constants";
import { cleanCart } from "@/features/cart/actions/cleanCart.action";
import type { CompleteOrderStatus } from "@/features/checkout/types/completeOrderStatus.types";
import { pause } from "@/utils/pause";

//TODO: add complete Order logic
export async function completeOrder(
  _: CompleteOrderStatus | null,
  _formData: FormData,
): Promise<CompleteOrderStatus> {
  await pause(SECOND * 2);

  try {
    await cleanCart();
    return { success: true, error: false };
  } catch (error) {
    console.error(
      "Error completing order:",
      error instanceof Error ? error.message : error,
    );
    return { success: false, error: true };
  }
}
