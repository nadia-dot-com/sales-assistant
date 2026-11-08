import type { Header } from "next/dist/lib/load-custom-routes";

/**
 * Most common tracking query parameters to ignore in cache key.
 * @link https://github.com/spekulatius/url-parameter-tracker-list/blob/master/common-tracking-params.txt
 */
const IGNORED_QUERY_PARAMS: ReadonlyArray<string> = Array.from(
  new Set([
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    // Google Ads
    "gclid",
    // Facebook Ads
    "fbclid",
    // Microsoft Ads
    "msclkid",
    // Other common tracking parameters
    "srsltid",
    "dclid",
    "igshid",
    "mc_cid",
    "mc_eid",
  ] satisfies ReadonlyArray<string>).values(),
);

/**
 * Remove URL query parameters from cache key for all pages.
 * This is useful for ignoring UTM parameters and other tracking parameters
 * that do not affect the content of the page.
 * @link https://calendar.perfplanet.com/2025/fixing-the-url-params-performance-penalty/
 */
function getNoVarySearchHeader(): Header[] {
  return [
    {
      source: "/(.*)",
      headers: [
        {
          key: "No-Vary-Search",
          value: `key-order, params=(${IGNORED_QUERY_PARAMS.map((item) => `"${item}"`).join(" ")})`,
        },
      ],
    },
  ];
}

export { getNoVarySearchHeader };
