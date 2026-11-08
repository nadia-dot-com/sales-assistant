// biome-ignore lint/style/noRestrictedImports: loaded by next.config.ts at config time, where the @/ alias is not resolved
import { getEnv } from "./getEnv";

export const LOCALE = getEnv("LOCALE");
export const NEXT_PUBLIC_SITE_URL = getEnv("NEXT_PUBLIC_SITE_URL");
export const NEXT_PUBLIC_ENV = getEnv("NEXT_PUBLIC_ENV");
export const BETTER_AUTH_URL = getEnv("BETTER_AUTH_URL");
