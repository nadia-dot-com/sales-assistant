import "server-only";

import {
  CTP_API_URL,
  CTP_AUTH_URL,
  CTP_PROJECT_KEY,
  CTP_USER_CLIENT_ID,
  CTP_USER_CLIENT_SECRET,
  CTP_USER_SCOPES,
} from "@/config/env";

export const userConfig = {
  projectKey: CTP_PROJECT_KEY,
  clientId: CTP_USER_CLIENT_ID,
  clientSecret: CTP_USER_CLIENT_SECRET,
  authUrl: CTP_AUTH_URL,
  apiUrl: CTP_API_URL,
  scopes: CTP_USER_SCOPES,
} as const;
