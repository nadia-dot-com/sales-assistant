import { type NextRequest, NextResponse } from "next/server";
import { routes } from "@/config/routes";
import { SESSION_COOKIE_NAME } from "@/features/auth/session/sessionCookie";

const GUEST_ONLY_ROUTES = [routes.login, routes.register];
const AUTH_REQUIRED_ROUTES = [
  routes.account,
  routes.order,
  routes.checkout,
  routes.salesAssistant,
];

function matches(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export async function proxy(request: NextRequest) {
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);
  const { pathname, searchParams } = request.nextUrl;

  if (hasSession && matches(pathname, GUEST_ONLY_ROUTES)) {
    const redirectTo = searchParams.get("redirectTo") ?? "/";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (!hasSession && matches(pathname, AUTH_REQUIRED_ROUTES)) {
    const loginUrl = new URL(routes.login, request.url);
    loginUrl.searchParams.set(
      "redirectTo",
      searchParams.get("redirectTo") ?? pathname,
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
