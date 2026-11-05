import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Search, answer-engine and user-initiated AI crawlers are welcome (spec §3.3). Never disallow /_next/. */
const SEARCH_AND_USER_BOTS = ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User"];
const TRAINING_BOTS = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"];
const ALLOW_TRAINING = true; // business decision: visibility in AI answers is part of Zeta's offer
const PRIVATE = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: [{ userAgent: "*", disallow: "/" }] }; // previews
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: SEARCH_AND_USER_BOTS, allow: "/", disallow: PRIVATE },
      { userAgent: TRAINING_BOTS, ...(ALLOW_TRAINING ? { allow: "/", disallow: PRIVATE } : { disallow: "/" }) },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
