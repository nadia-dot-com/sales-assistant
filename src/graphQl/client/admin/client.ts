import "server-only";

import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  type AuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from "@commercetools/ts-client";
import { config } from "@/graphQl/client/admin/config";

export const projectKey = config.projectKey;

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: config.authUrl,
  projectKey,
  credentials: {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
  },
  scopes: config.scopes,
  httpClient: fetch,
};

const httpAPIHTTPMiddlewareOptions: HttpMiddlewareOptions = {
  host: config.apiUrl,
  httpClient: fetch,
};

export const ctpClientHTTPAPI = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpAPIHTTPMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const httpApiRoot = createApiBuilderFromCtpClient(
  ctpClientHTTPAPI,
).withProjectKey({
  projectKey,
});
