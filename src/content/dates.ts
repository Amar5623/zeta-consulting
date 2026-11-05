/**
 * When each area of content last changed. The sitemap's <lastmod> comes from here, so bump the date
 * when you edit that content — never stamp every URL with the build time (spec §3.3).
 */
export const contentUpdated = {
  home: "2026-11-05",
  about: "2026-11-05",
  contact: "2026-11-05",
  services: "2026-11-05",
  industries: "2026-11-05",
  work: "2026-11-05",
  insights: "2026-11-05",
  legal: "2026-11-05",
} as const;
