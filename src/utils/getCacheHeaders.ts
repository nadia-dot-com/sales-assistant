import type { Header } from "next/dist/lib/load-custom-routes";

/**
 * Returns Cache-Control headers.
 * All images are immutable and can be cached for 1 year.
 */
async function getCacheHeaders(): Promise<Header[]> {
  return [
    {
      source: "/:path*\\.(jpg|jpeg|png|webp|avif|gif|bmp|svg|ico)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3153600, immutable",
        },
      ],
    },
    {
      source: "/_next/image/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=3153600, immutable",
        },
      ],
    },
  ];
}

export { getCacheHeaders };
