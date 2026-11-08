import "server-only";
import {
  CTP_API_URL,
  CTP_AUTH_URL,
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_PROJECT_KEY,
  CTP_SCOPES,
} from "@/config/env";

export const config = {
  projectKey: CTP_PROJECT_KEY,
  clientId: CTP_CLIENT_ID,
  clientSecret: CTP_CLIENT_SECRET,
  authUrl: CTP_AUTH_URL,
  apiUrl: CTP_API_URL,
  scopes: CTP_SCOPES,
} as const;
