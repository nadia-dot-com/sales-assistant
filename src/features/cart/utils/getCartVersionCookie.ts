import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { CART_VERSION } from "@/features/cart/constants/cartKeys";

export function getCartVersionCookie(
  cookieStore: ReadonlyRequestCookies,
): number | undefined {
  const raw = cookieStore.get(CART_VERSION)?.value;
  return raw === undefined ? undefined : Number(raw);
}
