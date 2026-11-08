import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { CART_ID_KEY } from "@/features/cart/constants/cartKeys";

export function getCartIdCookie(
  cookieStore: ReadonlyRequestCookies,
): string | undefined {
  return cookieStore.get(CART_ID_KEY)?.value;
}
