import "server-only";

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from "@commercetools/ts-client";
import { userConfig } from "@/graphQl/client/user/config";

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: userConfig.apiUrl,
  httpClient: fetch,
};

export function createExistingTokenApiRoot(accessToken: string) {
  const client = new ClientBuilder()
    .withProjectKey(userConfig.projectKey)
    .withExistingTokenFlow(`Bearer ${accessToken}`, { force: true })
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: userConfig.projectKey,
  });
}

export function customerServiceApiRoot() {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: userConfig.authUrl,
    projectKey: userConfig.projectKey,
    credentials: {
      clientId: userConfig.clientId,
      clientSecret: userConfig.clientSecret,
    },
    scopes: userConfig.scopes,
    httpClient: fetch,
  };

  const client = new ClientBuilder()
    .withProjectKey(userConfig.projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: userConfig.projectKey,
  });
}
