import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

/** Search engines and AI crawlers are explicitly welcome — visibility in AI answers is part of the offer. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
