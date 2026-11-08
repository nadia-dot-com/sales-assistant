import type { CSSProperties } from "react";
import { SANITY_SOURCE } from "@/config/env";
import { client } from "@/sanity/client";
import { convertThemeStylesToCss } from "@/sanity/utils/convertThemeStylesToCss";
import { getBackupJson } from "@/sanity/utils/getBackupJson";

const THEME_QUERY = `*[_type == "themeSettings"][0]`;

export async function getCssProperties(): Promise<CSSProperties> {
  if (SANITY_SOURCE === "local") {
    return getBackupJson("cssProperties") as Promise<CSSProperties>;
  }
  const theme = await client.fetch(THEME_QUERY);
  const cssProperties = convertThemeStylesToCss(theme);

  return cssProperties;
}
