import "server-only";

import { cookies } from "next/headers";
import { BETTER_AUTH_SECRET } from "@/config/env";
import {
  decodeSession,
  SESSION_COOKIE_NAME,
} from "@/features/auth/session/sessionCookie";
import type { SessionData } from "@/features/auth/types/auth.types";

export async function getServerSession(): Promise<SessionData | null> {
  const store = await cookies();
  const encryptedSession = store.get(SESSION_COOKIE_NAME)?.value;

  if (!encryptedSession) {
    return null;
  }

  return decodeSession(encryptedSession, BETTER_AUTH_SECRET);
}
