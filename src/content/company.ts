import {
  Users,
  Layers,
  Sparkles,
  Rocket,
  KeyRound,
  ScanSearch,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Rotating highlights above the hero headline.
 * Swap these for real achievements as you earn them, e.g. "Top rated on Clutch", "Featured on Behance".
 */
export const heroHighlights: { icon: LucideIcon; text: string }[] = [
  { icon: Zap, text: "First working release in 2–4 weeks" },
  { icon: Sparkles, text: "AI agents built for production, not demos" },
  { icon: Users, text: "Senior engineers and designers on every project" },
  { icon: ScanSearch, text: "Built to rank on Google and in AI answers" },
  { icon: KeyRound, text: "You own 100% of the code and IP" },
];

/** How Zeta works — shown on Home and About. */
export const process = [
  {
    step: "01",
    title: "Discover",
    timing: "Week 1",
    body: "We dig into your goals, users, constraints and data. You leave with a clear scope, known risks and a plan you can take to your board.",
    outputs: ["Goals & success metrics", "Scope & estimate", "Risk register"],
  },
  {
    step: "02",
    title: "Design",
    timing: "Weeks 1–3",
    body: "Flows, prototypes and UI, tested with real users before any production code is written.",
    outputs: ["User journeys", "Clickable prototype", "Design system"],
  },
  {
    step: "03",
    title: "Build",
    timing: "Weeks 2–8",
    body: "Senior engineers ship in weekly increments. You see working software every week, not a status report.",
    outputs: ["Weekly demos", "Automated tests", "Staging environment"],
  },
  {
    step: "04",
    title: "Launch",
    timing: "Launch week",
    body: "Hardened, tested and deployed with monitoring, analytics and documentation in place from day one.",
    outputs: ["Production release", "Monitoring & alerts", "Handover docs"],
  },
  {
    step: "05",
    title: "Grow",
    timing: "Ongoing",
    body: "We measure, iterate and scale: new features, SEO and GEO programs, and AI improvements driven by real usage data.",
    outputs: ["Growth roadmap", "Monthly reporting", "Continuous improvement"],
  },
];

export const values: { title: string; body: string; icon: LucideIcon }[] = [
  { icon: Users, title: "Senior team only", body: "The people on your first call are the people building your product. No bait-and-switch." },
  { icon: Layers, title: "One team, end to end", body: "Strategy, design, engineering, AI and growth under one roof, so nothing gets lost between vendors." },
  { icon: Sparkles, title: "AI-first, not AI-washed", body: "We use AI where it measurably saves time or makes money, and tell you plainly where it doesn't." },
  { icon: Rocket, title: "Shipping every week", body: "Working software every week and a shared board, so you always know exactly where things stand." },
  { icon: KeyRound, title: "You own everything", body: "Code, designs, data and accounts belong to you from day one. No lock-in." },
  { icon: ScanSearch, title: "Built to be found", body: "Everything we ship is fast, accessible and structured for search engines and AI answers." },
];

/** Commitments rather than vanity stats — adjust to what you can stand behind. */
export const commitments = [
  { value: 2, suffix: "–4 wks", label: "To a first working release" },
  { value: 8, suffix: "", label: "Service lines, one accountable team" },
  { value: 24, suffix: "h", label: "Response time on business days" },
  { value: 100, suffix: "%", label: "Code & IP ownership for clients" },
];

export const engagements = [
  {
    name: "Project",
    tagline: "Fixed scope, fixed price",
    bestFor: "MVPs, websites, AI pilots and audits",
    price: "Fixed quote",
    points: ["Scoped in a short discovery", "Fixed timeline & milestones", "Post-launch support window"],
    featured: false,
  },
  {
    name: "Dedicated team",
    tagline: "Your senior squad, monthly",
    bestFor: "Product builds and long-running roadmaps",
    price: "Monthly",
    points: ["Designers, engineers & a product lead", "Scale up or down month to month", "Weekly demos & shared roadmap"],
    featured: true,
  },
  {
    name: "Growth retainer",
    tagline: "SEO, GEO & conversion",
    bestFor: "Compounding organic and AI visibility",
    price: "Monthly",
    points: ["Technical, content & authority work", "AI mention & citation tracking", "Reporting tied to pipeline"],
    featured: false,
  },
];

/** Technologies shown in the hero marquee. */
export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Claude",
  "OpenAI",
  "React Native",
  "Flutter",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Google Cloud",
  "Azure",
  "Figma",
  "Vercel",
  "Supabase",
];

/** General FAQs — review the answers so they match your actual policies. */
export const faqs = [
  {
    q: "What kind of companies do you work with?",
    a: "Startups building their first product, growing SaaS companies, and established businesses modernizing how they operate. If you have a clear problem and want a senior team to solve it, we're likely a good fit.",
  },
  {
    q: "How quickly can you start?",
    a: "Usually within one to two weeks of agreeing scope. An intro call can happen this week, and a short discovery phase follows right after.",
  },
  {
    q: "How do you price projects?",
    a: "Fixed-scope projects get a fixed quote after discovery. Ongoing work runs on a monthly dedicated-team or retainer model. You always see the price before any work starts.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You do. All code, designs, content and accounts are yours from day one, and we're happy to sign an NDA before any detailed conversation.",
  },
  {
    q: "What's the difference between SEO, GEO and AEO?",
    a: "SEO helps you rank in traditional search results. AEO (Answer Engine Optimization) structures content so it's chosen as the direct answer in featured snippets and voice assistants. GEO (Generative Engine Optimization) makes your brand the source AI tools like ChatGPT, Gemini and Perplexity cite. We run all three as one program.",
  },
  {
    q: "Can you work with our existing team or codebase?",
    a: "Yes. We regularly embed with in-house teams, take over existing codebases after an audit, and work alongside other vendors.",
  },
  {
    q: "Is AI actually right for my business?",
    a: "Not always, and we'll tell you. We start with a short readiness assessment to find where AI saves real time or money, then run a pilot before you commit to a full build.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Every project includes a post-launch support window, and most clients continue on a monthly plan for maintenance, improvements and growth.",
  },
];
