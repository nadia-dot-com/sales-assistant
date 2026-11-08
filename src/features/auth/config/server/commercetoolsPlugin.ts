import "server-only";

import type { ErrorResponse } from "@commercetools/platform-sdk";
import type { BetterAuthPlugin } from "better-auth";
import { APIError, createAuthEndpoint } from "better-auth/api";
import { cookies } from "next/headers";
import type { LoginResponse } from "@/features/auth/api/loginCustomer";
import { loginCustomer } from "@/features/auth/api/loginCustomer";
import { registerCustomer } from "@/features/auth/api/registerCustomer";
import { revokeCtToken } from "@/features/auth/api/revokeCtToken";
import { getServerSession } from "@/features/auth/session/getServerSession";
import {
  encodeSession,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
} from "@/features/auth/session/sessionCookie";
import type {
  SessionData,
  SessionUser,
} from "@/features/auth/types/auth.types";
import {
  ANONYMOUS_ID_KEY,
  CART_ID_KEY,
  CART_VERSION,
} from "@/features/cart/constants/cartKeys";
import { getCartIdCookie } from "@/features/cart/utils/getCartIdCookie";
import { setCartId } from "@/features/cart/utils/setCartId";
import { setCartVersion } from "@/features/cart/utils/setCartVersion";
import { loginSchema, registerSchema } from "@/zod/schema/authSchema";

function toSessionData(loggedUser: LoginResponse): SessionData {
  return {
    user: {
      ctCustomerId: loggedUser.customer.id,
      email: loggedUser.customer.email,
      firstName: loggedUser.customer.firstName,
      lastName: loggedUser.customer.lastName,
    },
    ct: loggedUser.tokens,
    issuedAt: Date.now(),
  };
}

async function buildSessionCookie(
  result: LoginResponse,
  secret: string,
): Promise<{ value: string; user: SessionUser }> {
  const session = toSessionData(result);
  return { value: await encodeSession(session, secret), user: session.user };
}

export const commercetoolsPlugin = () =>
  ({
    id: "commercetools",
    endpoints: {
      signUpCommercetools: createAuthEndpoint(
        "/sign-up/commercetools",
        {
          method: "POST",
          body: registerSchema,
        },
        async (ctx) => {
          let result: LoginResponse;
          try {
            result = await registerCustomer(ctx.body);
          } catch (error) {
            const errorBody = (error as { body?: ErrorResponse }).body;

            if (errorBody?.errors?.[0]?.code === "DuplicateField") {
              throw new APIError("BAD_REQUEST", {
                code: "DuplicateField",
              });
            }

            throw new APIError("BAD_REQUEST", {
              message: "Unable to complete registration",
            });
          }

          const { value, user } = await buildSessionCookie(
            result,
            ctx.context.secret,
          );
          ctx.setCookie(SESSION_COOKIE_NAME, value, sessionCookieOptions());
          return ctx.json({ user });
        },
      ),

      signInCommercetools: createAuthEndpoint(
        "/sign-in/commercetools",
        {
          method: "POST",
          body: loginSchema,
        },
        async (ctx) => {
          const cookieStore = await cookies();
          const anonymousCartId = getCartIdCookie(cookieStore);

          let result: LoginResponse;
          try {
            result = await loginCustomer(
              ctx.body.email,
              ctx.body.password,
              anonymousCartId,
            );
          } catch (error) {
            console.error("[auth] login failed:", error);
            throw new APIError("UNAUTHORIZED", {
              message: "Invalid email or password",
            });
          }

          if (result.cart) {
            setCartId(cookieStore, result.cart.id);
            setCartVersion(cookieStore, result.cart.version);
            cookieStore.delete(ANONYMOUS_ID_KEY);
          }

          const { value, user } = await buildSessionCookie(
            result,
            ctx.context.secret,
          );
          ctx.setCookie(SESSION_COOKIE_NAME, value, sessionCookieOptions());
          return ctx.json({ user });
        },
      ),

      signOutCommercetools: createAuthEndpoint(
        "/sign-out/commercetools",
        { method: "POST" },
        async (ctx) => {
          const cookieStore = await cookies();
          const session = await getServerSession();

          if (session) {
            const results = await Promise.allSettled([
              revokeCtToken(session.ct.accessToken, "access_token"),
              revokeCtToken(session.ct.refreshToken, "refresh_token"),
            ]);

            for (const result of results) {
              if (result.status === "rejected") {
                console.error(
                  "[auth] CT token revocation failed:",
                  result.reason,
                );
              }
            }
          }

          ctx.setCookie(SESSION_COOKIE_NAME, "", {
            ...sessionCookieOptions(),
            maxAge: 0,
          });
          cookieStore.delete(CART_ID_KEY);
          cookieStore.delete(CART_VERSION);
          return ctx.json({ success: true });
        },
      ),
    },
  }) satisfies BetterAuthPlugin;
