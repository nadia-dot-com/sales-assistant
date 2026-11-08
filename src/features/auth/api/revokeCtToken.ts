import "server-only";

import { userConfig } from "@/graphQl/client/user/config";

type TokenTypeHint = "access_token" | "refresh_token";

export async function revokeCtToken(
  token: string,
  tokenTypeHint: TokenTypeHint,
): Promise<void> {
  const url = `${userConfig.authUrl}/oauth/token/revoke`;
  const basicAuth = Buffer.from(
    `${userConfig.clientId}:${userConfig.clientSecret}`,
  ).toString("base64");

  const body = new URLSearchParams({
    token,
    token_type_hint: tokenTypeHint,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Failed to revoke commercetools ${tokenTypeHint}`);
  }
}
