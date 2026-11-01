import {
  Bot,
  BrainCircuit,
  Compass,
  Cuboid,
  Globe,
  Smartphone,
  PenTool,
  Workflow,
  Search,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";

export type ServiceGroup = "AI" | "Strategy" | "Build" | "Grow";

/**
 * Optional long-form sections rendered in order on a service page.
 * Titles use "|" for a line break and *asterisks* for the serif accent.
 */
export type ServiceSection =
  | { kind: "cards"; eyebrow: string; title: string; intro?: string; items: { title: string; body: string; label?: string }[] }
  | {
      kind: "offerings";
      eyebrow: string;
      title: string;
      intro?: string;
      items: { title: string; tagline: string; body: string; points: string[]; outcome?: string }[];
    }
  | {
      kind: "phases";
      eyebrow: string;
      title: string;
      intro?: string;
      items: { title: string; tagline: string; body?: string; points?: string[]; deliverables?: string[]; checkpoint?: string }[];
    }
  | { kind: "principles"; eyebrow: string; title: string; intro?: string; items: { title: string; body: string }[] }
  | { kind: "kpis"; eyebrow: string; title: string; intro?: string; columns: [string, string, string]; rows: [string, string, string][]; note?: string }
  | { kind: "engagement"; eyebrow: string; title: string; intro?: string; items: { name: string; body: string; output: string }[]; note?: string }
  | { kind: "callout"; title: string; body: string };

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
  /** Optional hero headline; falls back to the title. */
  headline?: string;
  capabilities: string[];
  highlights: { title: string; body: string }[];
  deliverables: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
  sections?: ServiceSection[];
};

export const serviceGroups: { id: ServiceGroup; label: string; blurb: string }[] = [
  { id: "AI", label: "AI & Automation", blurb: "Agents and AI features that do real work, with people in control." },
  { id: "Strategy", label: "Strategy & Experience", blurb: "Product strategy, UX and immersive design engineering." },
  { id: "Build", label: "Build & Modernize", blurb: "Web, mobile and enterprise systems that connect what you already use." },
  { id: "Grow", label: "Grow", blurb: "Be found on Google and in AI answers." },
];

export const services: Service[] = [
  /* ------------------------------------------------------------------ AI */
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
      { q: "How long does it take to launch an AI agent?", a: "A focused pilot on one workflow typically takes a few weeks, including evaluation and a supervised rollout. We agree the timeline after discovery." },
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
      "Working prototype",
      "Production integration & APIs",
      "Evaluation dashboard",
      "Security & compliance documentation",
    ],
    stack: ["Claude", "OpenAI", "Gemini", "pgvector", "Pinecone", "AWS Bedrock", "Azure AI"],
    faqs: [
      { q: "Do we need lots of data to start?", a: "No. Most useful AI features start with the documents and systems you already have. We assess data readiness early in discovery." },
      { q: "Which AI model do you use?", a: "Whichever performs best for your task, budget and compliance needs. We test several and show you the results." },
    ],
  },

  /* ------------------------------------------------------------ Strategy */
  {
    slug: "app-web-strategy",
    number: "03",
    title: "App & Web Strategy",
    group: "Strategy",
    icon: Compass,
    short: "Turn a product vision into a scoped, architected and buildable roadmap before the code gets expensive.",
    headline: "From ambitious idea to production-ready application.",
    summary:
      "Building a successful web or mobile application takes more than great code. We help founders, product leaders and enterprise teams break a vision into requirements, user journeys, system architecture, technical milestones and measurable acceptance criteria, then guide it through design, development, launch and continuous improvement.",
    capabilities: [
      "Product discovery & ICP definition",
      "Product Requirements Documents (PRDs)",
      "UX flows, wireframes & prototypes",
      "System architecture & tech selection",
      "MVP scoping & release roadmaps",
      "Delivery governance & KPIs",
    ],
    highlights: [
      { title: "Strategy before scope", body: "Align stakeholders on the audience, problem, value proposition and desired outcomes before a feature list exists." },
      { title: "Architecture before complexity", body: "Make informed architecture and technology decisions before major implementation commitments." },
      { title: "Validation before scale", body: "Test assumptions through wireframes, prototypes, incremental releases and automated tests." },
    ],
    deliverables: [
      "Discovery & stakeholder alignment brief",
      "ICP & persona definitions",
      "Product Requirements Document",
      "Architecture, data model & API specs",
      "Prioritized backlog & release roadmap",
    ],
    stack: ["Figma", "FigJam", "Miro", "Jira", "Linear", "Notion"],
    sections: [
      {
        kind: "cards",
        eyebrow: "Why it matters",
        title: "A promising idea is only the beginning.|*Execution determines what it becomes.*",
        intro:
          "Many products struggle not because the idea lacks potential, but because the path from vision to implementation is unclear. Requirements drift, architecture decisions are deferred until they're expensive, integrations are underestimated and testing happens too late. We establish a shared understanding before complexity compounds.",
        items: [
          { title: "Clear product direction", body: "Align stakeholders on the audience, problem, value proposition and desired outcomes." },
          { title: "Controlled scope", body: "Separate launch-critical functionality from later enhancements." },
          { title: "Stronger technical foundations", body: "Make informed architecture and technology decisions before major implementation commitments." },
          { title: "Faster feedback cycles", body: "Validate assumptions through wireframes, prototypes, incremental releases and automated tests." },
          { title: "Better delivery visibility", body: "Track milestones, dependencies, risks, budgets and acceptance criteria." },
          { title: "A roadmap for growth", body: "Design for today's needs while preparing for future users, integrations, data and operational demands." },
        ],
      },
      {
        kind: "phases",
        eyebrow: "Our framework",
        title: "Four phases, each with|*clear outputs and a decision gate.*",
        items: [
          {
            title: "Discovery, ICP definition & scope alignment",
            tagline: "First, understand the business problem. Then define what needs to be built.",
            body: "Before selecting technologies or estimating effort, we establish why the product needs to exist, who it serves and what success looks like, working with founders, product owners, stakeholders and intended users.",
            points: [
              "Business model, commercial objectives and assumptions to validate",
              "Ideal Customer Profile: buyer, decision-maker and end user",
              "Existing workflows, manual workarounds and data sources",
              "The AIM lens: Audience, Intent and Message",
              "Launch-critical vs follow-on scope, using MoSCoW where useful",
            ],
            deliverables: [
              "Discovery & alignment brief",
              "ICP and personas",
              "Success criteria",
              "User journeys",
              "Prioritized feature inventory",
              "Risk register",
              "MVP definition & roadmap",
              "Preliminary estimate",
            ],
            checkpoint: "Stakeholders agree on the problem, target users, intended outcomes, initial scope and the assumptions still to validate.",
          },
          {
            title: "System architecture, UX wireframing & technology selection",
            tagline: "Turn requirements into a coherent, buildable solution.",
            body: "We define how the application should behave, how its components fit together and how it will meet functional and non-functional requirements — connecting UX decisions with feasibility, effort and long-term maintainability.",
            points: [
              "A PRD with user stories, acceptance criteria, edge cases and business rules",
              "Information architecture, user flows, wireframes and prototypes",
              "Architecture for front ends, APIs, data, identity and integrations",
              "Build-versus-buy, vendor dependency and operating-cost analysis",
              "Stack selection against documented criteria, not popularity",
            ],
            deliverables: ["PRD", "UX flows & wireframes", "Design specification", "Architecture diagrams", "Data model & API specs", "Tech selection rationale", "Refined estimates"],
            checkpoint: "Product, design and engineering agree the solution is defined, feasible and ready for implementation.",
          },
          {
            title: "Agile development, AI integrations & automated QA",
            tagline: "Build in increments. Validate continuously.",
            body: "The approved scope becomes a prioritized backlog delivered iteratively, with regular demos, automated checks, integration testing and stakeholder feedback throughout.",
            points: [
              "Sprint planning, code reviews, CI/CD and sprint demonstrations",
              "AI capabilities only where they add measurable value",
              "Unit, integration, end-to-end, regression and API contract tests",
              "Performance, security, accessibility and AI evaluation",
            ],
            deliverables: ["Working increments", "Source code", "Integrated APIs", "Automated test suites", "Sprint reports", "Release candidate"],
            checkpoint: "The release candidate meets the agreed acceptance criteria and remaining risks are documented for approval.",
          },
          {
            title: "Launch, generative engine optimization & iterative scaling",
            tagline: "Launch with confidence. Learn from real usage. Improve with evidence.",
            body: "Deployment is where real behavior and commercial outcomes start to inform the next stage. We prepare the release, establish operational visibility and build a feedback loop for continuous improvement.",
            points: [
              "Production configuration, rollback planning, monitoring and alerting",
              "Analytics and conversion-event instrumentation",
              "Technical SEO and GEO foundations for public pages",
              "Evidence-led optimization of adoption, reliability and cost",
            ],
            deliverables: ["Production release", "Monitoring & reporting", "KPI baseline", "Runbooks", "Discoverability recommendations", "Scaling roadmap"],
            checkpoint: "The product runs against agreed launch criteria and the next improvement priorities are documented.",
          },
        ],
      },
      {
        kind: "principles",
        eyebrow: "Product mindset",
        title: "Business viability. Technical scalability.|*Human-centered problem solving.*",
        items: [
          { title: "Business viability before feature volume", body: "We prioritize the core value proposition and the smallest useful release that can validate direction." },
          { title: "Scalability without unnecessary complexity", body: "A strong foundation that evolves with real requirements — not an enterprise platform on day one." },
          { title: "User-centric problem solving", body: "Journeys, prototypes, acceptance criteria and analytics validate that the product is understandable and useful." },
          { title: "AI with a clear purpose", body: "We recommend AI when it improves a defined workflow — and conventional automation when that's more reliable." },
          { title: "Transparent decisions, shared ownership", body: "Trade-offs, assumptions, dependencies and changes are documented so nothing comes as a surprise." },
        ],
      },
      {
        kind: "kpis",
        eyebrow: "Governance",
        title: "Progress should be visible.|*Success should be measurable.*",
        intro: "KPIs are selected for each project and targets are agreed after discovery and baseline assessment.",
        columns: ["Dimension", "Example KPI / KRA", "What it tells us"],
        rows: [
          ["Delivery predictability", "Milestones achieved against the agreed plan", "Whether delivery is progressing as forecast"],
          ["Budget control", "Actual and forecast spend versus approved budget", "Whether financial commitments stay visible and controlled"],
          ["Scope stability", "Approved requirements delivered; change requests tracked", "Whether delivery stays aligned with agreed scope"],
          ["Engineering quality", "Defect severity, escaped defects, regression results", "Whether the product meets the expected quality bar"],
          ["Release readiness", "Acceptance criteria met; critical blockers resolved", "Whether the release is ready to deploy"],
          ["Performance", "Response times, error rates, load-test results", "Whether the system meets performance expectations"],
          ["User experience", "Task completion, activation, usability findings", "Whether users can accomplish key tasks"],
          ["Commercial impact", "Qualified enquiries, conversion, revenue-linked outcomes", "Whether the product serves its business objective"],
        ],
      },
      {
        kind: "callout",
        title: "On time, on budget, on impact",
        body: "Delivery progress and dependencies stay visible, risks are raised early, estimates and scope changes are tracked, and success criteria are defined before launch. No responsible partner can guarantee every deadline regardless of changing scope — our commitment is transparent planning, disciplined execution and early communication when assumptions change.",
      },
    ],
    faqs: [
      { q: "Do we need a complete PRD before starting?", a: "No. Many engagements start from an idea, a business brief, an existing app or incomplete requirements. Discovery produces the level of documentation the project actually needs." },
      { q: "Can you work with our existing product and engineering team?", a: "Yes. We can support discovery, architecture, design, implementation, QA or selected parts of delivery, aligning responsibilities and decision-making with your team." },
      { q: "Do you build an MVP first or deliver the entire product?", a: "It depends on the objective and the risk. An MVP validates assumptions before larger investment; established products may need phased delivery, migration or integration." },
      { q: "How do you choose the technology stack?", a: "Against requirements, performance, team skills, integrations, security, maintainability, operating cost and future evolution — with the rationale and trade-offs documented." },
      { q: "How do you prevent scope creep?", a: "An agreed baseline, a prioritized backlog, acceptance criteria and documented change requests. New requirements are assessed for value and delivery impact before they enter the plan." },
      { q: "How long does the process take?", a: "It depends on complexity, integrations, team availability, regulation and the validation required. We set a realistic phased plan after discovery instead of a generic timeline." },
    ],
  },
  {
    slug: "product-design",
    number: "04",
    title: "Product & UX Design",
    group: "Strategy",
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
    slug: "immersive-experiences",
    number: "05",
    title: "Immersive Experiences",
    group: "Strategy",
    icon: Cuboid,
    short: "Cinematic UI, real-time 3D, WebGL, AR/VR and digital twins — visual ambition with production-grade engineering.",
    headline: "Make your digital experience impossible to ignore.",
    summary:
      "We design and engineer cinematic digital experiences that turn complex products, bold ideas and ambitious brands into interactive worlds people want to explore — from photorealistic interfaces and high-fidelity Figma prototypes to real-time 3D, WebGL, AR/VR showcases and digital twins.",
    capabilities: [
      "High-fidelity Figma prototypes",
      "Premium dark-mode interfaces & design systems",
      "Interactive 3D & WebGL",
      "Scroll-driven storytelling & motion",
      "AR/VR product showcases",
      "Digital twin interfaces & 3D configurators",
    ],
    highlights: [
      { title: "Story before spectacle", body: "Every scene, animation and interaction must help users understand, decide, navigate or feel something relevant." },
      { title: "Performance is part of the design", body: "Asset budgets, lazy loading, rendering limits and graceful fallbacks are planned from the start." },
      { title: "Accessible by default", body: "Keyboard navigation, readable contrast, semantic content and reduced-motion alternatives are built in." },
    ],
    deliverables: [
      "Experience brief & visual direction",
      "Interactive Figma prototype",
      "WebGL / 3D proof of concept",
      "Production experience & asset pipeline",
      "Performance & accessibility validation",
    ],
    stack: ["Figma", "Three.js", "React Three Fiber", "WebGL", "GSAP", "Blender", "Unity", "WebXR"],
    sections: [
      {
        kind: "cards",
        eyebrow: "The shift",
        title: "From static interfaces to|*living digital experiences.*",
        intro:
          "Static screenshots and long feature lists force people to imagine a product's value. High-fidelity design, real-time interaction and spatial storytelling make complex products easier to understand and compelling to explore. We don't add motion for decoration — we use interaction to make the story clearer and the next step more intuitive.",
        items: [
          { label: "Brands", title: "High-growth brands", body: "A distinctive digital presence that reflects the quality and ambition of the product." },
          { label: "SaaS", title: "SaaS & technology companies", body: "Sophisticated software made easier to understand through interactive narratives and realistic prototypes." },
          { label: "Mobility", title: "Automotive & EV innovators", body: "Vehicle systems, charging ecosystems and technical capabilities through immersive visualization." },
          { label: "Industry", title: "Industrial & robotics companies", body: "Complex machinery, processes and connected systems turned into explorable experiences." },
          { label: "Assets", title: "Maritime & infrastructure", body: "Vessels, facilities and operational environments communicated through 3D and digital-twin interfaces." },
        ],
      },
      {
        kind: "offerings",
        eyebrow: "Core capabilities",
        title: "Three disciplines,|*one delivery team.*",
        items: [
          {
            title: "Photorealistic web & mobile UI/UX design systems",
            tagline: "Premium visual design. Clear information architecture. Interfaces ready for engineering.",
            body: "High-fidelity products that combine cinematic aesthetics with usability, consistency and scalable design systems — from first concept to developer-ready specifications.",
            points: [
              "Interactive, realistic Figma prototypes",
              "Premium dark-mode interfaces",
              "Responsive web and mobile design",
              "Design systems, tokens and component libraries",
              "Complex dashboards and control interfaces",
              "Developer handoff specifications",
              "Usability and journey validation",
            ],
            outcome: "Ideal for SaaS platforms, enterprise portals, premium brand websites and operational dashboards.",
          },
          {
            title: "Real-time interactive animation & motion design",
            tagline: "Bring your interface to life — with motion that has a purpose.",
            body: "From subtle transitions to immersive WebGL scenes, animation that explains, guides, reveals and reinforces the value of your product — balanced against frame-rate stability and efficient asset delivery.",
            points: [
              "Interactive 3D and WebGL experiences",
              "Scroll-driven storytelling",
              "Micro-interactions and transitions",
              "Product rotations, exploded views and callouts",
              "Data-driven motion and telemetry visualization",
              "Real-time camera and scene interactions",
              "Motion systems with reduced-motion alternatives",
            ],
            outcome: "Ideal for product launches, interactive SaaS demos, campaigns and product-led growth experiences.",
          },
          {
            title: "AR/VR & digital twin showcases",
            tagline: "Turn products, spaces and operational systems into experiences people can explore.",
            body: "When a product is too complex, large, technical or expensive to demonstrate physically, immersive visualization bridges the gap between understanding and experience.",
            points: [
              "AR product visualization",
              "VR environments and guided exploration",
              "Digital twin interfaces connected to authorized data",
              "Interactive 3D product configurators",
              "Industrial and robotics showcases",
              "Automotive, EV, maritime and infrastructure environments",
            ],
            outcome: "Visualization is never presented as a substitute for validated control systems or safety interlocks.",
          },
        ],
      },
      {
        kind: "phases",
        eyebrow: "Delivery framework",
        title: "Spectacular on screen.|*Sensible under the hood.*",
        items: [
          { title: "Discover", tagline: "Audience, product, brand, journeys, objectives and technical constraints." },
          { title: "Design", tagline: "Visual direction, interaction model, information architecture and design system." },
          { title: "Prototype", tagline: "Realistic Figma prototypes or targeted interactive proofs of concept." },
          { title: "Engineer", tagline: "The approved experience in the right web, mobile, 3D, AR/VR or visualization stack." },
          { title: "Validate", tagline: "Usability, accessibility, performance, responsiveness and functional behavior." },
          { title: "Optimize", tagline: "Measure real behavior, find friction and refine with evidence." },
        ],
      },
      {
        kind: "principles",
        eyebrow: "Design & execution mindset",
        title: "Seven rules every|*experience has to follow.*",
        items: [
          { title: "Story before spectacle", body: "Begin with the audience, the product and the objective. Every visual detail must earn its place." },
          { title: "Prototype before complexity", body: "Validate layouts, transitions and demanding effects with prototypes and technical experiments first." },
          { title: "Design and engineering together", body: "Shared decisions on components, animation, assets and constraints close the gap between prototype and product." },
          { title: "Performance is part of the design", body: "Compression, texture sizes, scene complexity, code splitting and progressive enhancement from day one." },
          { title: "Accessibility in the interaction", body: "Important information never depends solely on color, animation or a 3D interaction." },
          { title: "Every journey has a purpose", body: "Map the path from first impression to confidence and action — users shouldn't have to work through the spectacle." },
          { title: "Test in the real world", body: "Validate across screen sizes, browsers, input methods, target hardware and deployment environments." },
        ],
      },
      {
        kind: "kpis",
        eyebrow: "Measurable impact",
        title: "Make it memorable.|*Make its value measurable.*",
        intro: "We compare the experience against a meaningful baseline — the existing page, a simplified variant or a controlled test — rather than assuming more animation means better results.",
        columns: ["KPI", "Measurement approach", "Business question"],
        rows: [
          ["Engaged time", "Analytics engagement metrics", "Are visitors spending meaningful time with the experience?"],
          ["Interaction rate", "Users engaging with key elements ÷ eligible users", "Are people exploring the features we meant them to discover?"],
          ["Journey completion", "Users completing a defined flow ÷ users starting it", "Does the experience guide users to the next step?"],
          ["Qualified conversion", "Qualified conversions ÷ eligible visitors", "Is the experience contributing to relevant enquiries?"],
          ["Product comprehension", "Pre/post task or survey assessment", "Does it make the product easier to understand?"],
          ["Performance", "Core Web Vitals, load and rendering tests", "Does it stay responsive on target devices?"],
        ],
        note: "These are proposed measurement categories, not claims of achieved client results. Targets are set after discovery and baseline measurement.",
      },
      {
        kind: "engagement",
        eyebrow: "Engagement models",
        title: "Start with the right|*level of immersion.*",
        items: [
          { name: "Experience strategy & visual direction", body: "Define the creative concept, user journey, interaction principles and technical feasibility.", output: "Experience brief, visual direction, user flows, key screens and roadmap." },
          { name: "High-fidelity Figma prototype", body: "Validate the look, feel, layout and core interactions before full development.", output: "Interactive prototype, responsive screens, design system and handoff specs." },
          { name: "Interactive experience sprint", body: "A focused proof of concept: WebGL scene, product showcase, configurator or interactive landing page.", output: "Working prototype, selected 3D or motion elements, performance findings." },
          { name: "Immersive product or digital twin build", body: "A broader experience with 3D assets, data visualization and integrations where required.", output: "Production experience, asset pipeline, integrations, testing and deployment." },
          { name: "Continuous experience optimization", body: "Improve with analytics, feedback, usability findings and performance data.", output: "Prioritized improvements, experiment plan and outcome reporting." },
        ],
      },
    ],
    faqs: [
      { q: "What is design engineering for digital experiences?", a: "It connects visual design, interaction design, prototyping and software implementation, so a sophisticated concept becomes a functional, maintainable and user-friendly product." },
      { q: "Do you build live 3D and WebGL experiences, or only designs?", a: "Either. The engagement can be design only, a technical proof of concept or a production build — agreed with scope, feasibility and deployment environment up front." },
      { q: "Will 3D animation slow down our website?", a: "It can if poorly optimized. We plan asset budgets, loading behavior, rendering complexity and fallbacks from the beginning and test against agreed devices and targets." },
      { q: "Can an immersive experience integrate with our product or data?", a: "Usually. We assess your architecture and interfaces first. Live data visualization needs suitable access, security and clear rules for representing system state." },
      { q: "Do we need to commit to a full project immediately?", a: "No. A discovery engagement, visual prototype or technical proof of concept can validate the direction before a larger investment." },
    ],
  },

  /* --------------------------------------------------------------- Build */
  {
    slug: "web-development",
    number: "06",
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
    number: "07",
    title: "Mobile Apps",
    group: "Build",
    icon: Smartphone,
    short: "Native-quality iOS and Android apps, from MVP to app-store scale.",
    summary:
      "We build cross-platform and native mobile apps people keep on their home screens. Offline support, push notifications, payments, analytics and the release pipeline to the App Store and Google Play are all part of the job.",
    capabilities: [
      "iOS & Android apps",
      "Cross-platform (React Native & Flutter)",
      "Offline-first field & crew apps",
      "App modernization & rescue",
      "In-app AI features",
      "Store listing & release management",
    ],
    highlights: [
      { title: "One codebase, two stores", body: "Cross-platform where it makes sense, native modules where it matters for performance." },
      { title: "Works without signal", body: "Offline-first data, queued sync and conflict handling for crews, drivers and field teams." },
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
    slug: "digital-transformation",
    number: "08",
    title: "Digital Transformation",
    group: "Build",
    icon: Workflow,
    short: "Revamp websites, modernize legacy applications and connect ERP, CRM and AI — without a big-bang replacement.",
    headline: "Modernize your digital foundation. Unlock your next stage of growth.",
    summary:
      "Outdated architectures, fragmented enterprise systems, slow digital experiences and manual workflows make it harder to win customers and scale. A cosmetic redesign won't fix that. We re-engineer your digital presence, modernize legacy applications, migrate to scalable architectures and connect websites with the systems that run your operations.",
    capabilities: [
      "Website revamps & performance engineering",
      "Legacy application modernization",
      "Headless & composable architecture",
      "Odoo ERP & CRM integration",
      "Data migration & SEO-safe cutovers",
      "Cloud, DevOps & AI readiness",
    ],
    highlights: [
      { title: "Integrate before replacing", body: "Existing ERP, CRM and operational systems hold valuable logic and trusted data. We modernize around them where possible." },
      { title: "No big-bang rewrites", body: "Staged releases, parallel environments and incremental sync reduce cutover risk and deliver value at every stage." },
      { title: "Evidence over impressions", body: "Baselines, performance budgets and acceptance criteria — not a single synthetic score or a visual makeover." },
    ],
    deliverables: [
      "Technical & UX audit with baseline",
      "Target-state architecture blueprint",
      "Integration & data migration specs",
      "Redirect & SEO migration map",
      "Deployment, rollback & monitoring runbooks",
    ],
    stack: ["Odoo", "Next.js", "AWS", "Azure", "Docker", "Kubernetes", "Terraform"],
    sections: [
      {
        kind: "cards",
        eyebrow: "When to consider it",
        title: "Your business has evolved.|*Has your digital infrastructure kept up?*",
        intro:
          "Many businesses outgrow the technology they built to support them. Systems work individually but fail to operate as one platform. We look beyond the interface to decide what to retain, repair, modernize, integrate or rebuild.",
        items: [
          { label: "01", title: "Slow websites and declining performance", body: "We profile performance, find bottlenecks and optimize delivery, rendering and backend efficiency based on measured evidence." },
          { label: "02", title: "Low conversion and difficult journeys", body: "We review analytics, journeys, accessibility, content hierarchy and mobile usability before redesigning critical experiences." },
          { label: "03", title: "Fragile, hard-to-maintain architecture", body: "We simplify where possible, introduce appropriate modularity and improve automated testing." },
          { label: "04", title: "Disconnected CRM, ERP and support", body: "We connect experiences with Odoo ERP, CRM platforms, support tools and internal APIs through controlled integration workflows." },
          { label: "05", title: "Limited readiness for AI", body: "We establish the data access, APIs, permissions and observability AI needs before introducing it where it helps." },
          { label: "06", title: "Scaling limits and rising costs", body: "We evaluate workload patterns, caching, data architecture and infrastructure cost to find the right path to scale." },
        ],
      },
      {
        kind: "phases",
        eyebrow: "Revamp & modernization framework",
        title: "Discover, architect, integrate,|*then migrate with confidence.*",
        items: [
          {
            title: "Comprehensive technical & UX audit",
            tagline: "Understand the real problems before investing in the solution.",
            points: [
              "Technical health: codebase, dependencies, database, hosting and technical debt",
              "Core Web Vitals, rendering, caching and asset delivery",
              "Navigation, journeys, accessibility, forms and conversion friction",
              "SEO: indexation, URLs, metadata, redirects and structured data",
              "Security, resilience, enterprise workflows and AI readiness",
            ],
            deliverables: ["Audit report", "Performance & conversion baseline", "Integration inventory", "Risk register", "Retain / refactor / rebuild calls", "Prioritized roadmap"],
          },
          {
            title: "Architecture modernization & performance engineering",
            tagline: "Build the right foundation for your next stage of growth.",
            points: [
              "Frontend modernization and progressive web capabilities",
              "Headless and composable architecture where it pays off",
              "Backend and API modernization with stable contracts",
              "Cloud, deployment, monitoring and recovery readiness",
              "Security by design and governed AI capabilities",
            ],
            deliverables: ["Target-state architecture", "Platform decision record", "Validated prototypes", "API & integration specs", "Performance budget"],
          },
          {
            title: "Seamless data migration & enterprise integrations",
            tagline: "Connect the new experience to the systems that run your business.",
            body: "Where Odoo is part of your environment, we integrate catalog, pricing and availability; customers and CRM; orders and invoicing; inventory; support loops; and management reporting — subject to version, modules and available interfaces.",
            points: [
              "Map data sources, ownership, structures and business rules",
              "Define integration contracts, field mappings and error handling",
              "Controlled sync via APIs, webhooks, jobs or events",
              "Reconcile counts, totals, relationships and duplicates",
              "Monitor failures, retries and reconciliation gaps",
            ],
          },
          {
            title: "Controlled migration, launch & continuous optimization",
            tagline: "Move with a plan for continuity, validation and recovery.",
            points: [
              "URL inventory and redirect mapping to protect search visibility",
              "Staging validation of integrations and critical transactions",
              "Functional, regression, accessibility, performance and security tests",
              "Backups, rollback procedures and incident response",
              "Post-launch monitoring of indexing, conversion, errors and speed",
            ],
            deliverables: ["Cutover plan", "Acceptance report", "SEO migration map", "Reconciliation report", "Rollback runbook", "Optimization backlog"],
          },
        ],
      },
      {
        kind: "principles",
        eyebrow: "Engineering mindset",
        title: "Modernize what already works.|*Fix what holds you back.*",
        items: [
          { title: "Business continuity comes first", body: "Critical journeys, data dependencies and acceptable interruptions are identified before a migration strategy is chosen." },
          { title: "Integrate before replacing", body: "We preserve what's fit for purpose and modernize the surrounding experience and integration layer." },
          { title: "Performance is a requirement", body: "Measurable performance budgets and real-user monitoring, not visual impressions." },
          { title: "Scalability should be earned", body: "No microservices or infrastructure complexity before they're justified by real workloads." },
          { title: "AI should solve a defined problem", body: "Access controls, deterministic rules, human approval and audit logs scaled to risk." },
          { title: "Adoption is part of delivery", body: "Usability, training, documentation and feedback so people actually use the new workflows." },
          { title: "Every transformation needs evidence", body: "Baselines, acceptance criteria and measured results — distinguished from targets still to validate." },
        ],
      },
      {
        kind: "kpis",
        eyebrow: "Measurable impact",
        title: "Measured by what improves for the business —|*not how different the site looks.*",
        columns: ["Area", "KPIs we track", "Key result"],
        rows: [
          ["Website performance", "LCP, INP, CLS and response times", "Faster, more stable experiences"],
          ["Conversion", "Conversion rate, form completion, qualified lead rate", "Less friction across key journeys"],
          ["Search visibility", "Organic landing traffic, index coverage, CTR trends", "Protected and improved discoverability"],
          ["Migration quality", "Redirect accuracy, broken links, data reconciliation", "Fewer defects and inconsistencies"],
          ["Integration reliability", "Sync success, failed transactions, data freshness", "Reliable exchange between systems"],
          ["Engineering delivery", "Deployment frequency, change failure rate, escaped defects", "Predictable, easier releases"],
          ["Operational efficiency", "Manual steps, duplicate entry, processing time", "Less avoidable effort"],
          ["Reliability & security", "Availability, incident frequency, recovery time", "More resilient operations"],
        ],
        note: "For every engagement we agree a baseline, target, measurement method, owner and review cadence. Results are reported only when supported by measurement.",
      },
    ],
    faqs: [
      { q: "Do we need to rebuild our entire website?", a: "No. The audit decides whether a focused redesign, performance overhaul, framework upgrade, backend refactor or full rebuild is appropriate. We avoid unnecessary replacement." },
      { q: "Can you modernize our website without replacing our ERP or CRM?", a: "Yes, where those systems expose suitable integration options. We connect the new experience through APIs, supported connectors or other appropriate patterns." },
      { q: "Can you integrate a website with Odoo ERP?", a: "Yes, depending on your version, modules, permissions and interfaces — covering products, customers, CRM leads, orders, inventory, invoicing and reporting." },
      { q: "How do you protect SEO during a migration?", a: "We audit URLs and organic landing pages, map redirects, preserve metadata and content, validate canonicals and indexing, and monitor search performance after launch." },
      { q: "Can you guarantee zero downtime?", a: "Not in every environment. We plan for minimal disruption with staged releases, parallel environments or incremental sync where feasible." },
      { q: "How do you demonstrate ROI?", a: "We set the baseline, agree measurable targets, track delivery and operational KPIs and use appropriate attribution — and say so when results depend on external factors." },
    ],
  },

  /* ---------------------------------------------------------------- Grow */
  {
    slug: "seo",
    number: "09",
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
      { q: "How long until SEO shows results?", a: "Technical fixes can move the needle within weeks; content and authority typically compound over several months." },
      { q: "Do you guarantee rankings?", a: "No one honestly can. We commit to a clear plan, transparent work and reporting tied to business results." },
    ],
  },
  {
    slug: "geo-aeo",
    number: "10",
    title: "GEO & AEO",
    group: "Grow",
    icon: ScanSearch,
    short: "Be the brand AI finds, trusts and recommends — across ChatGPT, Claude, Perplexity, Gemini and Copilot.",
    headline: "Be the brand AI finds, trusts, and recommends.",
    summary:
      "Customers increasingly discover products, compare providers and research solutions through AI assistants. Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) make your brand easier for those systems to understand, verify, cite and recommend — while strengthening the digital presence that supports traditional search.",
    capabilities: [
      "Entity & authority mapping for LLMs",
      "Generative content structuring",
      "Brand citations & multi-platform presence",
      "Schema & structured data",
      "AI-answer testing & citation tracking",
      "llms.txt & AI crawler readiness",
    ],
    highlights: [
      { title: "Discover", body: "Find the gaps in your AI answer visibility versus competitors, across a documented prompt set." },
      { title: "Strengthen", body: "Improve entity clarity, answer-first content and the evidence that supports your brand." },
      { title: "Measure", body: "Track mentions, citations, recommendation rate and the pipeline they influence." },
    ],
    deliverables: [
      "AI visibility baseline & competitor map",
      "Entity map & brand fact sheet",
      "Question taxonomy & content briefs",
      "Schema implementation",
      "Prompt test matrix & monthly insights",
    ],
    stack: ["ChatGPT", "Claude", "Perplexity", "Gemini", "Copilot", "Schema.org", "Search Console"],
    sections: [
      {
        kind: "cards",
        eyebrow: "What are AEO and GEO?",
        title: "Search is evolving.|*Your visibility strategy should too.*",
        intro:
          "Traditional SEO helps search engines rank pages. AI answer engines respond to natural-language questions with synthesized answers drawn from multiple sources. Ranking for a keyword doesn't mean an AI system will mention your company, cite your content or recommend you.",
        items: [
          { label: "SEO", title: "Get found", body: "Improve crawlability, indexing, relevance, authority and rankings so customers discover you through conventional search." },
          { label: "AEO", title: "Become a useful answer", body: "Structure information so answer-oriented systems can find clear, direct, well-supported responses to relevant questions." },
          { label: "GEO", title: "Strengthen generative discovery", body: "Improve the clarity, credibility and cross-source consistency of your brand so generative systems have stronger evidence to reference it." },
        ],
      },
      {
        kind: "cards",
        eyebrow: "Where we help you compete",
        title: "Tested across the assistants|*your buyers actually use.*",
        intro: "Platform capabilities, source selection and citation behavior vary by product, query, region and time. We test the relevant experiences instead of assuming one technique works everywhere.",
        items: [
          { label: "ChatGPT", title: "Brand & solution discovery", body: "Relevant answers and source attribution where available." },
          { label: "Claude", title: "Clear source material", body: "Structured expertise and consistent brand information." },
          { label: "Perplexity", title: "Citable pages", body: "Coverage of the questions buyers actually ask." },
          { label: "Gemini", title: "Entity clarity", body: "Relevant site content and a coherent digital footprint." },
          { label: "Copilot", title: "Business questions", body: "Discoverability across supported search and assistant experiences." },
        ],
      },
      {
        kind: "offerings",
        eyebrow: "Core offerings",
        title: "Three workstreams with|*defined deliverables.*",
        intro: "Technical SEO foundations, semantic content engineering, brand-entity clarity, digital PR and repeatable AI-answer testing — each with a defined purpose and acceptance criteria.",
        items: [
          {
            title: "Entity & authority mapping for LLMs",
            tagline: "Make your brand easier to identify, understand and distinguish.",
            body: "We map your company, products, services, leadership, expertise and supporting evidence into a consistent brand knowledge structure.",
            points: [
              "Brand entity and topic-relationship map",
              "Brand fact sheet and canonical descriptions",
              "Service, product and expert entity mapping",
              "Schema markup recommendations and implementation",
              "Entity consistency audit across directories and profiles",
              "Evidence and source-gap analysis against competitors",
            ],
            outcome: "Less ambiguity about who you are, what you offer, whom you serve and why you're relevant to a buyer's question.",
          },
          {
            title: "Generative content structuring & semantic optimization",
            tagline: "Content that answers real questions with clarity and evidence.",
            body: "We organize content around buyer intent, complete questions, entities, comparisons and verifiable claims — not keyword repetition.",
            points: [
              "AI-search query and conversational-intent research",
              "Topic clusters, pillar pages and supporting resources",
              "Direct-answer sections, FAQs, comparisons and use cases",
              "Evidence-backed claims and expert attribution",
              "Structured headings, tables, definitions and internal links",
              "Content refresh plans",
            ],
            outcome: "Concise answers backed by useful detail, original evidence and clear topical context.",
          },
          {
            title: "Brand citations & multi-platform presence",
            tagline: "Build a consistent, credible footprint beyond your website.",
            body: "We find where buyers and authoritative sources discuss your category, then plan how to earn legitimate references and keep your brand information consistent.",
            points: [
              "Competitor citation and source analysis",
              "Digital PR and expert-contribution opportunities",
              "Industry publications, associations and partners",
              "Directory and third-party profile consistency",
              "Review and reputation signal analysis",
              "Brand mention monitoring and citation-quality reporting",
            ],
            outcome: "Legitimate editorial coverage and accurate information — never fabricated reviews, paid link schemes or artificial mentions.",
          },
        ],
      },
      {
        kind: "phases",
        eyebrow: "Strategic approach",
        title: "From visibility audit to|*measurable improvement.*",
        items: [
          { title: "Audit the current landscape", tagline: "Baseline conventional search, brand mentions, AI-answer visibility, content and third-party references.", deliverables: ["Baseline report", "Competitor map", "Priority query set", "Gap register"] },
          { title: "Map buyer questions and entities", tagline: "Questions by funnel stage, industry, category, comparison and intent — mapped to entities and evidence.", deliverables: ["Question taxonomy", "Entity map", "Source opportunities", "Action plan"] },
          { title: "Engineer content and authority", tagline: "Improve key pages, publish useful content, fix technical barriers and strengthen credible references.", deliverables: ["Revised pages", "Content briefs", "Structured data", "Authority roadmap"] },
          { title: "Test across AI answer experiences", tagline: "Repeatable prompts across AI products, recording mentions, citations and competitor visibility.", deliverables: ["Prompt test matrix", "Source observations", "Visibility comparison", "Experiments"] },
          { title: "Measure, learn and iterate", tagline: "Compare with baseline and connect visibility to engagement and qualified leads where attribution permits.", deliverables: ["KPI dashboard", "Experiment log", "Monthly insights", "Next priorities"] },
        ],
      },
      {
        kind: "kpis",
        eyebrow: "Measurement",
        title: "AI visibility, website performance|*and business outcomes.*",
        intro: "A brand can gain mentions without generating leads, so reporting connects all three. Every percentage is reported with its denominator from a fixed, documented prompt set.",
        columns: ["Metric", "Definition", "Level"],
        rows: [
          ["AI citation rate", "Share of eligible test responses citing a tracked source", "AI visibility"],
          ["Brand mention rate", "Share of relevant responses that explicitly mention the brand", "AI visibility"],
          ["Recommendation rate", "Share of recommendation queries where the brand is suggested", "AI visibility"],
          ["Share of AI voice", "Brand visibility versus selected competitors on the same test set", "AI visibility"],
          ["Answer accuracy", "Whether offering, positioning and key facts are represented correctly", "AI visibility"],
          ["AI-referred traffic", "Qualified visits from identifiable AI sources, where attributable", "Website"],
          ["Qualified pipeline", "Opportunities influenced by organic and AI-assisted discovery", "Business"],
        ],
        note: "AI answer engines may not expose complete impression data. We label observed data, estimates and directional indicators separately.",
      },
      {
        kind: "engagement",
        eyebrow: "Engagement model",
        title: "Start with an assessment,|*expand based on findings.*",
        items: [
          { name: "AI visibility assessment", body: "Entity clarity, priority content, technical discoverability, competitor presence and a representative prompt set.", output: "Baseline, opportunity map and prioritized roadmap." },
          { name: "AEO/GEO implementation sprint", body: "Improve priority pages, entity consistency, semantic structure, technical issues and selected third-party presence.", output: "Implemented changes, quality checks and an experiment log." },
          { name: "Continuous visibility optimization", body: "Repeat tests, refresh content, investigate changes, expand source coverage and report business impact.", output: "Recurring insights, KPI trends and the next backlog." },
        ],
        note: "No guaranteed rankings or AI placements — a structured assessment, evidence-led recommendations and a measurable plan.",
      },
    ],
    faqs: [
      { q: "How is GEO different from SEO?", a: "SEO helps search engines discover, understand and rank content. GEO improves the likelihood that generative systems understand and use your information when producing answers. They overlap, so we treat GEO as an extension of sound search strategy." },
      { q: "Can you guarantee ChatGPT or Gemini will recommend our brand?", a: "No. AI systems decide answers through processes that vary by product, query, context and sources. We improve and test your signals, track visibility and report changes." },
      { q: "Do we need to publish lots of AI-generated content?", a: "No. Useful, accurate, distinctive content that demonstrates expertise matters more. Mass-produced content without value can damage trust." },
      { q: "How do you measure AI citations?", a: "With a documented prompt set, recording mentions and source citations across platforms and time — distinguishing owned-page citations from general mentions." },
      { q: "Can this work alongside our existing marketing agency?", a: "Yes. We provide the audit framework, technical recommendations, implementation support and reporting alongside your SEO, content, PR and development teams." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function servicesByGroup(group: ServiceGroup) {
  return services.filter((s) => s.group === group);
}
