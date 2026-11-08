import type { Header } from "next/dist/lib/load-custom-routes";
// biome-ignore lint/style/noRestrictedImports: <it has to come from there because if not it will cause some errors>
import { NEXT_PUBLIC_ENV, NEXT_PUBLIC_SITE_URL } from "../config/env.public";

function isHTTPS(url: string): boolean {
  return /^https:\/\//.test(url);
}

function isSiteRootPath(url: string): boolean {
  return /^https:\/\/[a-zA-Z]+\.[a-zA-Z]+\/?$/.test(url);
}

/**
 * Strict-Transport-Security requires that the site is served over HTTPS,
 * so we need to check if `NEXT_PUBLIC_SITE_URL` starts with https://
 *
 * Strict-Transport-Security: '..., preload' is only allowed for root paths, for example:
 * https://example.com/ - allowed
 * https://another.example.com/ - not allowed
 */
export function getStrictTransportSecurityHeader(): null | ArrayValues<
  Header["headers"]
> {
  const siteUrl = NEXT_PUBLIC_SITE_URL || "";

  const isHttps = isHTTPS(siteUrl);
  const isRoot = isSiteRootPath(siteUrl);

  const strictTransportSecurity =
    isHttps && isRoot
      ? "max-age=31536000; includeSubDomains; preload"
      : isHttps && "max-age=31536000; includeSubDomains";

  return strictTransportSecurity
    ? { key: "Strict-Transport-Security", value: strictTransportSecurity }
    : null;
}

/**
 * Returns security headers.
 * @link https://securityheaders.com/
 */
async function getSecurityHeaders(): Promise<Header[]> {
  return [
    /**
     * Security headers.
     * @link https://securityheaders.com/
     */
    {
      source: "/(.*)",
      headers: [
        /**
         * `X-Content-Type-Options` header is used to prevent MIME type sniffing.
         * `nosniff` value means that the browser will not try to guess the MIME type of a resource,
         * and will only use the type specified in the `Content-Type` header.
         */
        { key: "X-Content-Type-Options", value: "nosniff" },
        /**
         * `X-XSS-Protection` header is used to enable the Cross-Site Scripting (XSS) filter built into most browsers.
         * `1; mode=block` value means that the browser will block the page if an XSS attack is detected.
         */
        { key: "X-XSS-Protection", value: "1; mode=block" },
        /**
         * `Referrer-Policy` header controls how much referrer information is passed when navigating from the site.
         * `strict-origin-when-cross-origin` value means that the referrer will be sent only for same-origin requests.
         */
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        /**
         * `X-DNS-Prefetch-Control` header allows browsers to prefetch DNS records for links on the page.
         */
        { key: "X-DNS-Prefetch-Control", value: "on" },
        /**
         * `Strict-Transport-Security` header informs browsers that the host should only be accessed using HTTPS,
         */
        getStrictTransportSecurityHeader(),
        /**
         * `Upgrade-Insecure-Requests` header instructs browsers to upgrade HTTP requests to HTTPS.
         * This helps to protect against man-in-the-middle attacks by ensuring all resources are loaded securely.
         */
        NEXT_PUBLIC_ENV === "local"
          ? null
          : { key: "Upgrade-Insecure-Requests", value: "1" },
        /**
         * `Content-Security-Policy` header defines approved sources of content that the browser may load.
         * This CSP allows scripts, styles, and other resources from trusted sources while allowing
         * iframes specifically from Contentful. Images, videos, and scripts are allowed from any source.
         */
        // TODO: Add Content-Security-Policy header once we have all in place
        /**
         * `Permissions-Policy` header controls which features can be used in the browser.
         * Modified to allow fullscreen for self, YouTube and Vimeo while restricting other permissions.
         * Camera and microphone are allowed for self and Imbox widget.
         */
        {
          key: "Permissions-Policy",
          value: [
            "camera=(self)",
            "microphone=(self)",
            "geolocation=()",
            `fullscreen=(*)`, // Allow fullscreen for YouTube and Vimeo etc.
            "payment=()",
          ].join(", "),
        },
      ].filter((item) => item !== null),
    },
  ];
}

export { getSecurityHeaders };
