import "server-only";

import { symmetricDecrypt, symmetricEncrypt } from "better-auth/crypto";
import { BETTER_AUTH_URL } from "@/config/env.public";
import type { SessionData } from "@/features/auth/types/auth.types";

const isSecure = BETTER_AUTH_URL.startsWith("https://");

export const SESSION_COOKIE_NAME = isSecure
  ? "graduates.__Secure-ct-session"
  : "graduates.ct-session";

export const SESSION_MAX_AGE_SECONDS = 14 * 24 * 60 * 60;

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  } as const;
}

export async function encodeSession(
  data: SessionData,
  secret: string,
): Promise<string> {
  return symmetricEncrypt({ key: secret, data: JSON.stringify(data) });
}

export async function decodeSession(
  encryptedSession: string,
  secret: string,
): Promise<SessionData | null> {
  try {
    const decryptedSessionInJson = await symmetricDecrypt({
      key: secret,
      data: encryptedSession,
    });
    const sessionData = JSON.parse(decryptedSessionInJson) as SessionData;
    const sessionHasExpired =
      Date.now() - sessionData.issuedAt > SESSION_MAX_AGE_SECONDS * 1000;

    if (sessionHasExpired) {
      return null;
    }

    return sessionData;
  } catch {
    return null;
  }
}
