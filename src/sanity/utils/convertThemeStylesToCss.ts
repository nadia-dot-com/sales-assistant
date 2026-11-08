import type { CSSProperties } from "react";

export const convertThemeStylesToCss = (
  theme: Record<string, string>,
): CSSProperties => {
  const cssValueMap: Record<string, string> = {};

  for (const [key, value] of Object.entries(theme)) {
    if (typeof value !== "string" || key.startsWith("_")) continue;

    const keyFromCamelCaseToKebabCase = key.replace(
      /([a-z0-9])([A-Z])/g,
      "$1-$2",
    );

    const cssName = `--${keyFromCamelCaseToKebabCase.toLowerCase()}`;

    cssValueMap[cssName] = value;
  }

  return cssValueMap;
};
