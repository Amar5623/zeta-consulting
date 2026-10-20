import {
  Bot,
  BrainCircuit,
  Globe,
  Smartphone,
  PenTool,
  Workflow,
  Search,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";

export type ServiceGroup = "AI" | "Build" | "Transform" | "Grow";

export type Service = {
  slug: string;
  number: string;
  title: string;
  group: ServiceGroup;
  icon: LucideIcon;
  /** One line — used in menus, cards and meta descriptions. */
  short: string;
  /** Intro paragraph for the service page. */
  summary: string;
  capabilities: string[];
  highlights: { title: string; body: string }[];
  deliverables: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
};

export const serviceGroups: { id: ServiceGroup; label: string; blurb: string }[] = [
  { id: "AI", label: "AI & Automation", blurb: "Agents and AI features that do real work." },
  { id: "Build", label: "Build", blurb: "Web, mobile and product design." },
  { id: "Transform", label: "Transform", blurb: "Modernize systems and operations." },
  { id: "Grow", label: "Grow", blurb: "Be found on Google and in AI answers." },
];

export const services: Service[] = [
  {
    slug: "ai-agents",
    number: "01",
    title: "AI Agents & Automation",
    group: "AI",
    icon: Bot,
    short: "Autonomous agents that run support, sales and back-office workflows end to end.",
    summary:
      "We design and deploy AI agents that do real work: triaging tickets, qualifying leads, reconciling data and running multi-step workflows across your tools. Every agent ships with guardrails, evaluation suites and human-in-the-loop controls, so you can trust what it does in production.",
    capabilities: [
      "Customer support agents",
      "Sales & lead qualification agents",
      "Back-office workflow automation",
      "Tool-using & multi-agent systems",
      "Voice agents",
      "Human-in-the-loop review",
    ],
    highlights: [
      { title: "Built around your tools", body: "Agents connect to your CRM, helpdesk, ERP and internal APIs, so they act inside the systems your team already uses." },
      { title: "Measured before launch", body: "Each agent is tested against real scenarios with an evaluation suite, so accuracy is known, not hoped for." },
      { title: "Safe by design", body: "Permissions, approval steps and full audit logs keep people in control of every consequential action." },
    ],
    deliverables: [
      "Workflow mapping & ROI case",
      "Agent architecture & tool design",
      "Evaluation & red-team test suite",
      "Production deployment with monitoring",
      "Runbooks & team training",
    ],
    stack: ["Claude", "OpenAI", "MCP", "LangGraph", "Temporal", "Python", "TypeScript"],
    faqs: [
      { q: "How long does it take to launch an AI agent?", a: "A focused pilot on one workflow typically takes 3–6 weeks, including evaluation and a supervised rollout." },
      { q: "Will an agent replace my team?", a: "We design agents to take on repetitive, high-volume work and hand edge cases to people. Most teams redeploy time to higher-value work." },
    ],
  },
  {
    slug: "ai-solutions",
    number: "02",
    title: "AI Solutions & Integration",
    group: "AI",
    icon: BrainCircuit,
    short: "LLM copilots, RAG search and AI features built into the products you already have.",
    summary:
      "From a private knowledge assistant to AI features inside your SaaS, we take generative AI from prototype to production. We choose the right models, connect them securely to your data and measure quality, cost and latency before anything goes live.",
    capabilities: [
      "RAG & enterprise knowledge search",
      "AI copilots inside your product",
      "Document processing & extraction",
      "Model selection & fine-tuning",
      "AI strategy & readiness audits",
      "LLMOps, evals & cost control",
    ],
    highlights: [
      { title: "Your data stays yours", body: "Private deployments, access controls and data-handling that your security team can sign off on." },
      { title: "Model-agnostic", body: "We benchmark leading models for your use case and design so you can switch providers without a rebuild." },
      { title: "Cost under control", body: "Caching, routing and monitoring keep per-request costs predictable as usage grows." },
    ],
    deliverables: [
      "AI opportunity & readiness assessment",
      "Working prototype in weeks",
      "Production integration & APIs",
      "Evaluation dashboard",
      "Security & compliance documentation",
    ],
    stack: ["Claude", "OpenAI", "Gemini", "pgvector", "Pinecone", "AWS Bedrock", "Azure AI"],
    faqs: [
      { q: "Do we need lots of data to start?", a: "No. Most useful AI features start with the documents and systems you already have. We assess data readiness in the first week." },
      { q: "Which AI model do you use?", a: "Whichever performs best for your task, budget and compliance needs. We test several and show you the results." },
    ],
  },
  {
    slug: "web-development",
    number: "03",
    title: "Web Platforms",
    group: "Build",
    icon: Globe,
    short: "Fast, accessible websites, SaaS products and web apps engineered to scale.",
    summary:
      "Marketing sites that load instantly, customer portals, dashboards and full SaaS platforms. We build on modern, well-supported stacks with clean architecture, automated tests and CI/CD, so your product stays easy to change long after launch.",
    capabilities: [
      "Marketing & corporate websites",
      "SaaS products & dashboards",
      "Customer portals & internal tools",
      "Headless CMS & e-commerce",
      "APIs & integrations",
      "Performance & accessibility audits",
    ],
    highlights: [
      { title: "Fast by default", body: "Core Web Vitals in the green and pages that feel instant on any device." },
      { title: "Built to be edited", body: "A CMS your marketing team can actually use, without filing a ticket for every change." },
      { title: "Engineered to last", body: "Typed code, automated tests and documented architecture your next hire can pick up." },
    ],
    deliverables: [
      "Technical architecture",
      "Design-to-code component library",
      "CMS setup & content migration",
      "Automated tests & CI/CD",
      "Analytics, SEO & accessibility baseline",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Vercel", "AWS"],
    faqs: [
      { q: "Can you redesign our site without losing SEO rankings?", a: "Yes. Every migration includes a redirect map, content parity checks and post-launch monitoring in Search Console." },
      { q: "Which CMS do you recommend?", a: "It depends on your team and content. We commonly use Sanity, Contentful, Payload or WordPress (headless)." },
    ],
  },
  {
    slug: "mobile-apps",
    number: "04",
    title: "Mobile Apps",
    group: "Build",
    icon: Smartphone,
    short: "Native-quality iOS and Android apps, from MVP to app-store scale.",
    summary:
      "We build cross-platform and native mobile apps people keep on their home screens. Offline support, push notifications, payments, analytics and the release pipeline to the App Store and Google Play are all part of the job.",
    capabilities: [
      "iOS & Android apps",
      "Cross-platform (React Native & Flutter)",
      "MVPs & clickable prototypes",
      "App modernization & rescue",
      "In-app AI features",
      "Store listing & release management",
    ],
    highlights: [
      { title: "One codebase, two stores", body: "Cross-platform where it makes sense, native modules where it matters for performance." },
      { title: "Release without drama", body: "Automated builds, beta channels and over-the-air updates for quick fixes." },
      { title: "Usage you can see", body: "Product analytics and crash reporting wired in from the first build." },
    ],
    deliverables: [
      "UX flows & interactive prototype",
      "iOS & Android builds",
      "Backend & API integration",
      "Store submission & listing",
      "Analytics & crash reporting",
    ],
    stack: ["React Native", "Expo", "Flutter", "Swift", "Kotlin", "Firebase", "Supabase"],
    faqs: [
      { q: "Native or cross-platform?", a: "For most products, cross-platform gets you to both stores faster at lower cost. We recommend native when performance or device APIs demand it." },
      { q: "Can you take over an existing app?", a: "Yes. We start with a code and architecture audit, stabilize what's there, then improve it." },
    ],
  },
  {
    slug: "product-design",
    number: "05",
    title: "Product & UX Design",
    group: "Build",
    icon: PenTool,
    short: "Research-led UX, UI and design systems that make complex products feel simple.",
    summary:
      "Good software starts with clear decisions. We run discovery, map user journeys, prototype quickly and test with real users, then hand engineering a design system they can build from without guesswork.",
    capabilities: [
      "Product discovery & strategy",
      "UX research & usability testing",
      "UI design & prototyping",
      "Design systems",
      "UX audits",
      "Brand & visual identity",
    ],
    highlights: [
      { title: "Evidence over opinion", body: "Decisions are backed by user interviews, analytics and usability tests." },
      { title: "Prototype first", body: "Clickable prototypes let you validate ideas before paying for engineering." },
      { title: "Systems, not screens", body: "Reusable components and tokens keep design and code consistent as you grow." },
    ],
    deliverables: [
      "Research findings & personas",
      "User journeys & information architecture",
      "High-fidelity UI & prototype",
      "Design system in Figma",
      "Developer handoff",
    ],
    stack: ["Figma", "FigJam", "Maze", "Framer", "Storybook"],
    faqs: [
      { q: "Do you only design, or also build?", a: "Both. Design can be a standalone engagement, but it works best when the same team carries it into development." },
      { q: "Can you work with our existing brand?", a: "Of course. We extend your brand into the product, or refresh it if it's holding you back." },
    ],
  },
  {
    slug: "digital-transformation",
    number: "06",
    title: "Digital Transformation",
    group: "Transform",
    icon: Workflow,
    short: "Modernize legacy systems, move to the cloud and automate how your business runs.",
    summary:
      "We help established businesses replace spreadsheets, paperwork and ageing systems with software that fits how they work today. It starts with an honest audit, then we modernize in stages so operations keep running while things improve.",
    capabilities: [
      "Legacy modernization & re-platforming",
      "Cloud migration & DevOps",
      "Process automation",
      "Data platforms & BI dashboards",
      "ERP & CRM integration",
      "Technology roadmaps & audits",
    ],
    highlights: [
      { title: "No big-bang rewrites", body: "Incremental modernization reduces risk and delivers value at every stage." },
      { title: "One source of truth", body: "Connected systems and clean data your leadership can make decisions on." },
      { title: "People-first change", body: "Training and documentation so your team adopts the new tools from day one." },
    ],
    deliverables: [
      "Current-state audit & roadmap",
      "Cloud architecture & migration plan",
      "Integrations & automations",
      "Dashboards & reporting",
      "Training & documentation",
    ],
    stack: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "dbt"],
    faqs: [
      { q: "Where do we even start?", a: "With a 2–3 week audit of your systems, processes and data. You get a prioritized roadmap with costs and expected returns." },
      { q: "Will this disrupt our operations?", a: "We plan migrations in stages with parallel runs and rollback paths, so day-to-day work isn't interrupted." },
    ],
  },
  {
    slug: "seo",
    number: "07",
    title: "SEO",
    group: "Grow",
    icon: Search,
    short: "Technical, content and local SEO that compounds into qualified organic traffic.",
    summary:
      "We fix what holds your site back technically, build content around what your buyers actually search for, and earn authority that lasts. Every month you get clear reporting tied to leads and revenue, not vanity rankings.",
    capabilities: [
      "Technical SEO audits & fixes",
      "Keyword & content strategy",
      "On-page optimization",
      "Local SEO & Google Business Profile",
      "Link building & digital PR",
      "Analytics & reporting",
    ],
    highlights: [
      { title: "Technical foundation", body: "Crawlability, speed, structured data and indexation fixed at the source code level." },
      { title: "Content that converts", body: "Pages mapped to search intent and the questions buyers ask before they buy." },
      { title: "Reporting you can use", body: "Monthly dashboards tied to leads, pipeline and revenue." },
    ],
    deliverables: [
      "Technical audit & fix plan",
      "Keyword & topic map",
      "Content calendar & briefs",
      "On-page & schema implementation",
      "Monthly performance reports",
    ],
    stack: ["Google Search Console", "GA4", "Ahrefs", "Semrush", "Screaming Frog", "Looker Studio"],
    faqs: [
      { q: "How long until SEO shows results?", a: "Technical fixes can move the needle within weeks; content and authority typically compound over 3–6 months." },
      { q: "Do you guarantee rankings?", a: "No one honestly can. We commit to a clear plan, transparent work and reporting tied to business results." },
    ],
  },
  {
    slug: "geo-aeo",
    number: "08",
    title: "GEO & AEO",
    group: "Grow",
    icon: ScanSearch,
    short: "Get cited by ChatGPT, Gemini, Perplexity and Google AI Overviews.",
    summary:
      "More buyers now ask AI assistants before they search. Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) make your brand the source those engines quote: structured data, entity building, answer-first content and tracking how often you're mentioned.",
    capabilities: [
      "AI visibility audits",
      "Answer-first content",
      "Schema & structured data",
      "Entity & knowledge-graph building",
      "llms.txt & AI crawler readiness",
      "AI mention & citation tracking",
    ],
    highlights: [
      { title: "See where you stand", body: "We measure how often AI assistants mention and cite you versus competitors." },
      { title: "Become the source", body: "Clear, well-structured answers that AI engines can extract and attribute to you." },
      { title: "Works with SEO", body: "GEO and AEO build on strong SEO foundations, so we run them as one program." },
    ],
    deliverables: [
      "AI visibility baseline report",
      "Entity & schema implementation",
      "Answer-first content plan",
      "AI crawler & llms.txt setup",
      "Monthly citation tracking",
    ],
    stack: ["Schema.org", "ChatGPT", "Perplexity", "Gemini", "Google AI Overviews", "Copilot"],
    faqs: [
      { q: "What's the difference between GEO and AEO?", a: "AEO focuses on being chosen as the direct answer in featured snippets and voice assistants. GEO focuses on being cited inside AI-generated answers from tools like ChatGPT and Perplexity." },
      { q: "Is GEO replacing SEO?", a: "No. AI engines lean heavily on well-ranked, well-structured pages. GEO extends SEO rather than replacing it." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesByGroup(group: ServiceGroup) {
  return services.filter((s) => s.group === group);
}
