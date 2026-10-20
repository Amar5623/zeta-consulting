/**
 * Case studies — ALL PLACEHOLDERS.
 * Replace each entry with a real project. Add a `cover` image path (e.g. "/work/project-name/cover.jpg")
 * and `gallery` images once you have them; until then the UI renders designed placeholders.
 * Set `placeholder: false` once an entry is real so the page is indexed by search engines.
 */
export type CaseStudy = {
  slug: string;
  placeholder: boolean;
  title: string;
  client: string;
  industry: string;
  category: WorkCategory;
  services: string[]; // service slugs
  year: string;
  duration: string;
  summary: string;
  metrics: { value: string; label: string }[];
  challenge: string;
  approach: string;
  outcome: string;
  /** Background tint for the placeholder media. */
  tint: string;
  cover?: string;
  gallery?: string[];
};

export const workCategories = [
  "AI & Automation",
  "Web Platforms",
  "Mobile Apps",
  "Product Design",
  "Digital Transformation",
  "SEO & GEO",
] as const;
export type WorkCategory = (typeof workCategories)[number];

const placeholderCopy = {
  challenge:
    "Placeholder. Describe the client's situation before Zeta got involved: the business problem, what was at stake, and any constraints such as timeline, budget, legacy systems or compliance.",
  approach:
    "Placeholder. Explain how the team tackled it: discovery findings, key decisions, the architecture or design direction, and how you collaborated with the client's team week to week.",
  outcome:
    "Placeholder. Summarize the results in concrete terms: what shipped, how it performs, and the measurable impact on revenue, cost, time saved, traffic or user satisfaction.",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "case-study-one",
    placeholder: true,
    title: "AI support agent for a fintech platform",
    client: "Client name",
    industry: "Fintech",
    category: "AI & Automation",
    services: ["ai-agents", "ai-solutions"],
    year: "2026",
    duration: "00 weeks",
    summary: "One or two sentences on the problem solved and the result delivered for this client.",
    metrics: [
      { value: "00%", label: "Tickets resolved automatically" },
      { value: "00h", label: "Saved per week" },
    ],
    tint: "#E7E5F3",
    ...placeholderCopy,
  },
  {
    slug: "case-study-two",
    placeholder: true,
    title: "SaaS platform rebuild for a B2B scale-up",
    client: "Client name",
    industry: "B2B SaaS",
    category: "Web Platforms",
    services: ["web-development", "product-design"],
    year: "2026",
    duration: "00 weeks",
    summary: "One or two sentences on the problem solved and the result delivered for this client.",
    metrics: [
      { value: "0.0×", label: "Faster page loads" },
      { value: "00%", label: "Increase in trial sign-ups" },
    ],
    tint: "#E2EBE5",
    ...placeholderCopy,
  },
  {
    slug: "case-study-three",
    placeholder: true,
    title: "Cross-platform app for a healthcare provider",
    client: "Client name",
    industry: "Healthcare",
    category: "Mobile Apps",
    services: ["mobile-apps", "product-design"],
    year: "2025",
    duration: "00 weeks",
    summary: "One or two sentences on the problem solved and the result delivered for this client.",
    metrics: [
      { value: "0.0★", label: "App Store rating" },
      { value: "00k", label: "Monthly active users" },
    ],
    tint: "#F2E6DD",
    ...placeholderCopy,
  },
  {
    slug: "case-study-four",
    placeholder: true,
    title: "Organic growth and AI visibility for an e-commerce brand",
    client: "Client name",
    industry: "E-commerce",
    category: "SEO & GEO",
    services: ["seo", "geo-aeo"],
    year: "2025",
    duration: "Ongoing",
    summary: "One or two sentences on the problem solved and the result delivered for this client.",
    metrics: [
      { value: "000%", label: "Organic traffic growth" },
      { value: "00", label: "AI answer citations / month" },
    ],
    tint: "#E1E8F0",
    ...placeholderCopy,
  },
  {
    slug: "case-study-five",
    placeholder: true,
    title: "Operations modernization for a logistics company",
    client: "Client name",
    industry: "Logistics",
    category: "Digital Transformation",
    services: ["digital-transformation", "ai-agents"],
    year: "2025",
    duration: "00 weeks",
    summary: "One or two sentences on the problem solved and the result delivered for this client.",
    metrics: [
      { value: "00%", label: "Reduction in manual work" },
      { value: "0 → 1", label: "Single source of truth" },
    ],
    tint: "#EEEAE0",
    ...placeholderCopy,
  },
  {
    slug: "case-study-six",
    placeholder: true,
    title: "Product discovery and design system for an edtech startup",
    client: "Client name",
    industry: "Education",
    category: "Product Design",
    services: ["product-design", "web-development"],
    year: "2024",
    duration: "00 weeks",
    summary: "One or two sentences on the problem solved and the result delivered for this client.",
    metrics: [
      { value: "00%", label: "Task completion rate" },
      { value: "000", label: "Reusable components" },
    ],
    tint: "#DFEBF1",
    ...placeholderCopy,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
