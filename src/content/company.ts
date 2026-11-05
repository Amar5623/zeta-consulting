import {
  Layers,
  KeyRound,
  ScanSearch,
  ShieldCheck,
  Network,
  Target,
  ChartLine,
  Globe,
  type LucideIcon,
} from "lucide-react";

/**
 * Rotating highlights above the hero headline.
 * Swap these for real achievements as you earn them, e.g. "Top rated on Clutch", "Featured on Behance".
 */
export const heroHighlights: { icon: LucideIcon; text: string }[] = [
  { icon: Network, text: "Built around the systems you already use" },
  { icon: ShieldCheck, text: "AI with human oversight, by design" },
  { icon: ChartLine, text: "Measured against a baseline, not a promise" },
  { icon: Globe, text: "Solutions for 12 industries, from maritime to marketplaces" },
  { icon: KeyRound, text: "You own 100% of the code and IP" },
];

/** How Zeta works — the cross-industry delivery framework, shown on Home and About. */
export const process = [
  {
    step: "01",
    title: "Discover & baseline",
    timing: "Stage 1",
    body: "Understand users, business processes, existing systems and constraints. Establish the current baseline and prioritize the highest-value problem.",
    outputs: ["KPIs & baseline", "Priority problem", "Risk register"],
  },
  {
    step: "02",
    title: "Architect & validate",
    timing: "Stage 2",
    body: "Define the experience, system boundaries, integrations, security, data model and acceptance tests. Validate feasibility before committing to outcomes.",
    outputs: ["Target architecture", "Prototypes", "Acceptance criteria"],
  },
  {
    step: "03",
    title: "Build & integrate",
    timing: "Stage 3",
    body: "Deliver in controlled increments, integrating with existing systems where practical, with observability and automated tests built in.",
    outputs: ["Working increments", "Integrations", "Test suites"],
  },
  {
    step: "04",
    title: "Pilot & measure",
    timing: "Stage 4",
    body: "Test against agreed criteria using representative workflows and real constraints. Compare with the baseline and document limitations.",
    outputs: ["Pilot results", "Baseline comparison", "Go / adjust decision"],
  },
  {
    step: "05",
    title: "Scale & optimize",
    timing: "Stage 5",
    body: "Expand based on evidence and readiness. Monitor reliability, adoption, cost, security and outcomes after launch.",
    outputs: ["Rollout plan", "Monitoring", "Improvement backlog"],
  },
];

export const values: { title: string; body: string; icon: LucideIcon }[] = [
  { icon: Target, title: "Business-first engineering", body: "We start with bottlenecks, users, workflows and commercial goals — then choose technology to fit the outcome." },
  { icon: Network, title: "Integration over replacement", body: "We extend your existing ERP, CRM, databases and operational systems wherever that's the practical path." },
  { icon: ShieldCheck, title: "AI with human oversight", body: "We automate repeatable work and keep review and escalation for the exceptions that matter." },
  { icon: Layers, title: "Architecture for real operations", body: "Designed for security, scale, resilience and the constraints of the environment it actually runs in." },
  { icon: ChartLine, title: "Outcome-oriented delivery", body: "We set baselines and success criteria first, and measure results before making performance claims." },
  { icon: ScanSearch, title: "Built to be found", body: "Everything we ship is fast, accessible and structured for search engines and AI answers." },
];

/** Commitments rather than vanity stats — adjust to what you can stand behind. */
export const commitments = [
  { value: 12, suffix: "", label: "Industries with dedicated solution playbooks" },
  { value: 10, suffix: "", label: "Service lines, one accountable team" },
  { value: 5, suffix: "", label: "Stage delivery framework, baseline to scale" },
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
    a: "Startups validating a product, growing SaaS companies and established businesses across e-commerce, mobility, logistics, maritime, real estate, manufacturing, finance, education, healthcare and hospitality. If you have a clear problem and want a team that connects strategy, engineering and integration, we're likely a good fit.",
  },
  {
    q: "Do we have to replace our existing systems?",
    a: "Usually not. We look for practical ways to extend the ERP, CRM and operational systems you already have, and only recommend replacement when the audit shows it's the better path.",
  },
  {
    q: "How quickly can you start?",
    a: "Usually within one to two weeks of agreeing scope. A first conversation can happen this week, and a short discovery phase follows right after.",
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
    a: "Not always, and we'll tell you. We recommend AI when it improves a defined workflow, and conventional automation or deterministic rules when those are more reliable. Where AI fits, we pilot it against a baseline before you commit to a full build.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee transparency, not outcomes we can't control. Every engagement agrees a baseline, targets, a measurement method and an owner up front, and we report measured results separately from targets still being validated.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Every project includes a post-launch support window, and most clients continue on a monthly plan for maintenance, improvements and growth.",
  },
];
