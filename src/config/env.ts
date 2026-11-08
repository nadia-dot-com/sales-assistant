import "server-only";
import { getEnv } from "@/config/getEnv";

// Sanity
export const SANITY_PROJECT_ID = getEnv("SANITY_PROJECT_ID");
export const SANITY_DATASET = getEnv("SANITY_DATASET");
export const SANITY_API_VERSION = getEnv("SANITY_API_VERSION");
export const SANITY_USE_CDN = getEnv("SANITY_USE_CDN");
export const SANITY_AUTH_TOKEN = getEnv("SANITY_AUTH_TOKEN");
export const SANITY_WEBHOOK_SECRET = getEnv("SANITY_WEBHOOK_SECRET");
export const SANITY_SOURCE = getEnv("SANITY_SOURCE");

// GraphQl
const parseCtpScopes = (rawVar: string): string[] => {
  return rawVar.split(/\s+/).filter(Boolean);
};

// CommerceTools General
export const CTP_PROJECT_KEY = getEnv("CTP_PROJECT_KEY");
export const CTP_AUTH_URL = getEnv("CTP_AUTH_URL");
export const CTP_API_URL = getEnv("CTP_API_URL");

// CommerceTools Admin
export const CTP_CLIENT_ID = getEnv("CTP_CLIENT_ID");
export const CTP_CLIENT_SECRET = getEnv("CTP_CLIENT_SECRET");
export const CTP_SCOPES = parseCtpScopes(getEnv("CTP_SCOPES"));

// CommerceTools User
export const CTP_USER_CLIENT_ID = getEnv("CTP_USER_CLIENT_ID");
export const CTP_USER_CLIENT_SECRET = getEnv("CTP_USER_CLIENT_SECRET");
export const CTP_USER_SCOPES = parseCtpScopes(getEnv("CTP_USER_SCOPES"));

// Better Auth
export const BETTER_AUTH_SECRET = getEnv("BETTER_AUTH_SECRET");
