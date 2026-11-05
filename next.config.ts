import type { NextConfig } from "next";

/** Canonical host: the apex. www and the vercel.app alias redirect here once DNS is live (spec §3.2). */
const CANONICAL_HOST = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://zetaconsulting.in").host;
// OFF until cutover day: redirecting vercel.app to an apex that doesn't resolve yet would lock everyone out of staging.
const redirectsEnabled = process.env.ENABLE_CANONICAL_REDIRECTS === "true";

const toApex = (host: string) => ({
  source: "/:path*",
  has: [{ type: "host" as const, value: host }],
  destination: `https://${CANONICAL_HOST}/:path*`,
  statusCode: 301 as const, // permanent; the query string is preserved
});

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return redirectsEnabled ? [toApex(`www.${CANONICAL_HOST}`), toApex("zetaconsulting.vercel.app")] : [];
  },
  async headers() {
    return [
      {
        // Every host except the canonical apex (previews, vercel.app, www before redirects) stays out of the index.
        // Done with a header, not robots.txt, so crawlers can still see the redirect and the noindex.
        source: "/:path*",
        missing: [{ type: "host", value: CANONICAL_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
