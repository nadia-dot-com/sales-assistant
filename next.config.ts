import type { NextConfig } from "next";
import type { Header } from "next/dist/lib/load-custom-routes";
import createNextIntlPlugin from "next-intl/plugin";
import { getCacheHeaders } from "@/utils/getCacheHeaders";
import { getNoVarySearchHeader } from "@/utils/getNoVarySearchHeader";
import { getSecurityHeaders } from "@/utils/getSecurityHeaders";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    authInterrupts: true,
    agentUpgrade: "security",
  },
  /**
   * Increase the max header size to support larger cookies
   * https://nextjs.org/docs/app/api-reference/config/next-config-js/reactMaxHeadersLength
   * Default is 6000 bytes (6 KB)
   */
  reactMaxHeadersLength: 16 * 1024, // 16 KiB
  /**
   * We want to have source maps on started local and dev built version.
   */
  productionBrowserSourceMaps: ["local", "dev"].includes(
    process.env.NEXT_PUBLIC_ENV,
  ),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.cdn.europe-west1.gcp.commercetools.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_VERSION:
      process.env.NEXT_PUBLIC_VERSION || process.env.npm_package_version,
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      convertTransform: false,
                      collapseGroups: false,
                      moveGroupAttrsToElems: false,
                      cleanupIds: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
  headers: async (): Promise<Header[]> => {
    const headers = await Promise.all([
      getSecurityHeaders(),
      getCacheHeaders(),
      getNoVarySearchHeader(),
    ]);
    return headers.flat();
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
