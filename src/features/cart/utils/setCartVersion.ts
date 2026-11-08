import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { CART_VERSION } from "@/features/cart/constants/cartKeys";

export function setCartVersion(
  cookieStore: ReadonlyRequestCookies,
  version: number,
) {
  cookieStore.set(CART_VERSION, String(version));
}
