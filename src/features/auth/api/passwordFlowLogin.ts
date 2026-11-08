import "server-only";

import type {
  CommerceToolsToken,
  CommerceToolsTokenResponse,
} from "@/features/auth/types/auth.types";
import { userConfig } from "@/graphQl/client/user/config";

export async function passwordFlowLogin(
  email: string,
  password: string,
): Promise<CommerceToolsToken> {
  const url = `${userConfig.authUrl}/oauth/${userConfig.projectKey}/customers/token`;
  const basicAuth = Buffer.from(
    `${userConfig.clientId}:${userConfig.clientSecret}`,
  ).toString("base64");

  const body = new URLSearchParams({
    grant_type: "password",
    username: email,
    password,
  });

  if (userConfig.scopes.length > 0) {
    body.set("scope", userConfig.scopes.join(" "));
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  const data = (await response.json()) as CommerceToolsTokenResponse;

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
}
