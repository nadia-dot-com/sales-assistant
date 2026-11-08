import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { CART_ID_KEY } from "@/features/cart/constants/cartKeys";

export function setCartId(cookieStore: ReadonlyRequestCookies, id: string) {
  cookieStore.set(CART_ID_KEY, id);
}
