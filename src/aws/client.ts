import "server-only";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { AwsClient } from "aws4fetch";

let awsClientPromise: Promise<AwsClient> | null = null;

async function createAwsClient(): Promise<AwsClient> {
  const credentials = await fromNodeProviderChain()();

  return new AwsClient({
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
  });
}

export async function signedFetch(
  url: string,
  init: RequestInit,
): Promise<Response> {
  awsClientPromise ??= createAwsClient();
  const awsClient = await awsClientPromise;

  return awsClient.fetch(url, init);
}
