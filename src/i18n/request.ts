import { getRequestConfig } from "next-intl/server";
import { cache } from "react";
import { LOCALE } from "@/config/env.public";
// biome-ignore lint/style/noRestrictedImports: messages/ lives at the repo root, outside the "@/" (src) alias.
import baseTranslations from "../../messages/translations.json";

// cache() scopes this per request: each request gets its own clone to patch,
// so concurrent requests never mutate the same messages object.
export const getRequestMessages = cache(() =>
  structuredClone(baseTranslations),
);

export default getRequestConfig(async () => {
  return {
    locale: LOCALE,
    messages: getRequestMessages(),
  };
});
