import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { BETTER_AUTH_SECRET } from "@/config/env";
import { BETTER_AUTH_URL } from "@/config/env.public";
import { commercetoolsPlugin } from "@/features/auth/config/server/commercetoolsPlugin";

export const auth = betterAuth({
  secret: BETTER_AUTH_SECRET,
  baseURL: BETTER_AUTH_URL,
  trustedOrigins: [BETTER_AUTH_URL],
  emailAndPassword: { enabled: false },
  plugins: [commercetoolsPlugin(), nextCookies()],
});
