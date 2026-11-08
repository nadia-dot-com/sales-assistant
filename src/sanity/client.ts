import "server-only";
import { createClient } from "next-sanity";
import {
  SANITY_API_VERSION,
  SANITY_AUTH_TOKEN,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_USE_CDN,
} from "@/config/env";

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  // change to true for backup version
  useCdn: SANITY_USE_CDN === "true",
  token: SANITY_AUTH_TOKEN,
});
