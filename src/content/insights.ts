/**
 * Insights: answer-first explainers (spec §3.5). Each opens with a 40–60 word direct answer,
 * uses question-phrased H2s, includes a comparison table, an architecture diagram with alt text,
 * a last-updated date, a named author and linked primary sources.
 *
 * Inline text supports **bold** and [links](https://…).
 */

export type DiagramKind = "agent-loop" | "hybrid-automation" | "rag-pipeline";
export type CoverKind = "agent" | "versus" | "rag";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "diagram"; kind: DiagramKind; alt: string; caption: string }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  /** The 40–60 word direct answer that opens the article. */
  answer: string;
  /** Meta description and card excerpt. */
  excerpt: string;
  category: string;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  readTime: string;
  cover: CoverKind;
  services: string[];
  body: Block[];
  sources: { label: string; url: string }[];
};

export const author = {
  name: "Zeta Consulting Engineering Team",
  credentials:
    "Written and reviewed by the senior engineers who design, build and operate Zeta's AI agent, retrieval and integration projects for client platforms.",
};

const sources = {
  anthropicAgents: {
    label: "Anthropic — Building effective agents (December 2024)",
    url: "https://www.anthropic.com/engineering/building-effective-agents",
  },
  react: {
    label: "Yao et al. — ReAct: Synergizing Reasoning and Acting in Language Models (2022)",
    url: "https://arxiv.org/abs/2210.03629",
  },
  owasp: {
    label: "OWASP — Top 10 for LLM Applications (2025 edition)",
    url: "https://genai.owasp.org/llm-top-10/",
  },
  nist: {
    label: "NIST — AI Risk Management Framework (AI RMF 1.0, January 2023)",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
  },
  rag: {
    label: "Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (2020)",
    url: "https://arxiv.org/abs/2005.11401",
  },
  lora: {
    label: "Hu et al. — LoRA: Low-Rank Adaptation of Large Language Models (2021)",
    url: "https://arxiv.org/abs/2106.09685",
  },
};

export const posts: Post[] = [
  {
    slug: "what-is-an-ai-agent",
    title: "What is an AI agent? A practical definition for business teams",
    answer:
      "An AI agent is software that uses a large language model to decide its own next steps toward a goal: it reads context, chooses tools such as APIs or databases, acts, checks the result and repeats until the task is done or a human must approve. Zeta builds agents that work inside your existing systems.",
    excerpt:
      "A plain-language definition of AI agents: how they differ from chatbots and workflows, how the agent loop works, which tasks suit them, and what it takes to run one safely.",
    category: "AI & Automation",
    datePublished: "2026-10-14",
    dateModified: "2026-11-05",
    readTime: "8 min read",
    cover: "agent",
    services: ["ai-agents", "ai-solutions"],
    body: [
      { type: "h2", text: "How is an AI agent different from a chatbot?" },
      {
        type: "p",
        text: "A chatbot answers. An agent acts. A chatbot takes a message and returns text; whatever happens next is up to the person reading it. An agent is given a goal and a set of tools, and it decides which tool to call, in what order, until the goal is met.",
      },
      {
        type: "p",
        text: "In practice the line is a spectrum. A support assistant that only drafts replies is a chatbot. The same assistant becomes an agent when it can look up the order, check the refund policy, prepare the refund and ask a supervisor to approve it — choosing those steps itself based on what it finds.",
      },
      {
        type: "table",
        caption: "Chatbots, workflow automation and AI agents compared",
        columns: ["", "Chatbot", "Workflow automation", "AI agent"],
        rows: [
          ["Who decides the next step", "The user", "Pre-written rules", "The model, within limits you set"],
          ["Uses tools and systems", "Rarely", "Yes, fixed integrations", "Yes, chosen per task"],
          ["Handles messy, unstructured input", "Yes", "Poorly", "Yes"],
          ["Predictability", "Medium", "High", "Medium — needs guardrails and evaluation"],
          ["Best for", "Answering questions", "Stable, high-volume processes", "Variable, multi-step tasks that need judgment"],
        ],
      },
      { type: "h2", text: "How does an AI agent work?" },
      {
        type: "p",
        text: "Most agents run the same loop. The model reads the goal and the current context, reasons about what to do, calls a tool, observes the result and decides again. Research such as [ReAct](https://arxiv.org/abs/2210.03629) showed that interleaving reasoning with actions in this way makes models more reliable on multi-step tasks than reasoning alone.",
      },
      {
        type: "diagram",
        kind: "agent-loop",
        alt: "Diagram of the AI agent loop: a goal and context feed a language model that plans the next step, calls a tool such as a CRM, database or API, observes the result and loops back. Guardrails wrap the loop, and high-impact actions go to a human for approval before they run.",
        caption: "The agent loop: plan, act, observe, repeat — inside guardrails, with a human approving high-impact actions.",
      },
      {
        type: "list",
        items: [
          "**Model** — the language model that interprets the goal and chooses the next step.",
          "**Tools** — the functions the agent is allowed to call: search, read a record, create a ticket, send a draft.",
          "**Context and memory** — the instructions, documents and conversation history the model can see.",
          "**Guardrails** — permissions, input and output checks, spending and rate limits, and stop conditions.",
          "**Human in the loop** — approval steps for anything irreversible, expensive or customer-facing.",
        ],
      },
      { type: "h2", text: "What is the difference between an AI workflow and an AI agent?" },
      {
        type: "p",
        text: "Anthropic's engineering guide draws a useful distinction: workflows are systems where language models and tools are orchestrated through predefined code paths, while agents are systems where the model dynamically directs its own process and tool use. [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) also recommends starting with the simplest solution that works and adding autonomy only when it clearly pays off.",
      },
      {
        type: "p",
        text: "We follow the same rule. Many requests that arrive as \"we need an agent\" are better served by a workflow with one model call in the middle: cheaper, faster and easier to test. We reach for a true agent when the steps genuinely vary from case to case.",
      },
      { type: "h2", text: "Which business tasks are a good fit for AI agents?" },
      {
        type: "p",
        text: "Good candidates share three traits: the input is unstructured, the steps vary, and a person currently spends time gathering information from several systems before acting.",
      },
      {
        type: "list",
        items: [
          "Triage and first response for support, sales or operations inboxes.",
          "Reading documents such as invoices, contracts or delivery notes and reconciling them against system records.",
          "Research and preparation: compiling account history, prior tickets and policy before a person decides.",
          "Internal assistants that answer questions from company knowledge and file the follow-up task.",
          "Exception handling in operations, where most cases are routine but each exception needs investigation.",
        ],
      },
      { type: "h2", text: "When should you not use an AI agent?" },
      {
        type: "p",
        text: "Skip the agent when the process is stable and fully rule-based, when a wrong action would be costly and cannot be reviewed, or when you cannot yet measure what good looks like. Deterministic code or conventional automation is more reliable in those cases, and we will say so.",
      },
      {
        type: "callout",
        title: "A quick test",
        text: "If you can write the process as a flowchart that never says \"it depends\", you probably need automation, not an agent.",
      },
      { type: "h2", text: "What does it take to run an agent safely in production?" },
      {
        type: "p",
        text: "Production agents need the same discipline as any system that touches customer data and money, plus a few risks that are specific to language models. The [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) lists prompt injection and sensitive information disclosure as the top two risks, and both apply directly to agents that read external content and call tools.",
      },
      {
        type: "list",
        items: [
          "Give each tool the narrowest permission it needs, and keep write actions behind approval until the agent has earned trust.",
          "Treat every document, email and web page the agent reads as untrusted input.",
          "Log every step — inputs, tool calls, outputs and approvals — so any decision can be audited.",
          "Evaluate against a fixed test set before each release, and monitor quality, cost and latency after launch.",
          "Map risks and controls to a recognised framework such as the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework).",
        ],
      },
      { type: "h2", text: "How should you measure an AI agent?" },
      {
        type: "p",
        text: "Measure the business outcome first and the model second. Set a baseline from the current process before the pilot starts, then compare like for like.",
      },
      {
        type: "table",
        caption: "Metrics we agree before an agent pilot",
        columns: ["Metric", "What it tells you", "How to set the target"],
        rows: [
          ["Task completion rate", "Share of cases finished without a person redoing the work", "Measure the current manual process first"],
          ["Escalation rate", "How often the agent correctly hands off to a human", "Agree which cases must always escalate"],
          ["Handling time", "End-to-end time per case, including review", "Compare with the pre-pilot baseline"],
          ["Error rate after review", "Mistakes that reached a customer or a system of record", "Set a ceiling, not an average"],
          ["Cost per completed task", "Model, infrastructure and review cost per case", "Compare with the fully loaded manual cost"],
        ],
      },
      { type: "h2", text: "How do you get started?" },
      {
        type: "p",
        text: "Pick one workflow with clear volume and a measurable baseline, map the systems it touches, and run a short pilot with a human approving every action. If the numbers hold, widen the agent's permissions step by step. Our [AI agents service](/services/ai-agents) follows exactly this path, and it starts with a conversation about the workflow, not the model.",
      },
    ],
    sources: [sources.anthropicAgents, sources.react, sources.owasp, sources.nist],
  },
  {
    slug: "ai-agents-vs-rpa",
    title: "AI agents vs RPA: which one fits your workflow?",
    answer:
      "RPA (robotic process automation) replays fixed, rule-based steps on stable screens and structured data; it is fast and predictable but breaks when inputs vary. AI agents handle variable, unstructured inputs and choose their own steps, at the cost of more oversight. Most teams need both, and Zeta designs automation that combines them.",
    excerpt:
      "RPA and AI agents solve different automation problems. A side-by-side comparison, when each one wins, how to combine them, and a checklist for choosing per workflow.",
    category: "AI & Automation",
    datePublished: "2026-10-22",
    dateModified: "2026-11-05",
    readTime: "7 min read",
    cover: "versus",
    services: ["ai-agents", "digital-transformation"],
    body: [
      { type: "h2", text: "What is RPA?" },
      {
        type: "p",
        text: "Robotic process automation uses software bots to repeat the clicks and keystrokes a person would make in an application: copy a value from one screen, paste it into another, submit a form. It is deterministic. Given the same input, it does the same thing every time, which makes it auditable and fast for stable, high-volume work.",
      },
      {
        type: "p",
        text: "RPA's weakness is change. A moved button, a new field or an email that does not match the expected format can stop a bot. That is why RPA programs often carry a long tail of maintenance.",
      },
      { type: "h2", text: "What is an AI agent?" },
      {
        type: "p",
        text: "An AI agent uses a language model to interpret a goal, decide which tools to use and act until the task is complete or needs a human. It copes with unstructured input — free-text emails, scanned documents, conversations — and adapts its steps to each case. We cover the details in [What is an AI agent?](/insights/what-is-an-ai-agent).",
      },
      { type: "h2", text: "What are the key differences between AI agents and RPA?" },
      {
        type: "table",
        caption: "RPA and AI agents compared",
        columns: ["", "RPA", "AI agent"],
        rows: [
          ["How it decides", "Follows a recorded script", "Chooses steps based on the goal and context"],
          ["Input it handles well", "Structured data, stable screens", "Unstructured text, documents, varied cases"],
          ["Behavior", "Deterministic and repeatable", "Probabilistic; needs evaluation and guardrails"],
          ["What breaks it", "Interface or format changes", "Ambiguous goals, missing context, unsafe inputs"],
          ["Integration style", "Often drives the user interface", "Usually calls APIs and data services"],
          ["Oversight needed", "Exception queues", "Approvals, logging and quality monitoring"],
          ["Best for", "High-volume, rule-based transactions", "Judgment-heavy, variable, multi-step work"],
        ],
      },
      { type: "h2", text: "When is RPA the better choice?" },
      {
        type: "list",
        items: [
          "The process is fully rule-based and rarely changes.",
          "Inputs are structured: spreadsheets, fixed forms, system exports.",
          "The target system has no usable API and the interface is stable.",
          "Every step must be exactly reproducible for audit or compliance reasons.",
        ],
      },
      { type: "h2", text: "When is an AI agent the better choice?" },
      {
        type: "list",
        items: [
          "Work arrives as emails, chats, PDFs or scans in many formats.",
          "The right next step depends on what the case contains.",
          "People currently gather context from several systems before deciding.",
          "The volume of exceptions is what actually consumes your team's time.",
        ],
      },
      { type: "h2", text: "Can RPA and AI agents work together?" },
      {
        type: "p",
        text: "Yes, and this is usually where the value is. Let the agent do what models are good at — reading, classifying and deciding — and hand structured, validated instructions to deterministic automation or APIs for execution. People review the exceptions and anything high-impact.",
      },
      {
        type: "diagram",
        kind: "hybrid-automation",
        alt: "Diagram of a hybrid automation: unstructured inputs such as emails and PDFs go to an AI agent that classifies them and extracts structured data. A validation step checks the data; valid cases go to RPA or API automation that updates the system of record, and exceptions go to a human review queue.",
        caption: "A hybrid design: the agent interprets, validation gates, deterministic automation executes, people handle exceptions.",
      },
      {
        type: "p",
        text: "This split also contains risk. The agent never writes directly to the system of record; it produces data that is checked against rules before anything changes. Anthropic's guidance on [building effective agents](https://www.anthropic.com/engineering/building-effective-agents) makes the same point from the other direction: use the least autonomy that solves the problem.",
      },
      { type: "h2", text: "How do you decide for a specific workflow?" },
      {
        type: "list",
        ordered: true,
        items: [
          "Write the process down step by step, including every \"it depends\".",
          "Count the volume and how many cases are exceptions.",
          "Mark which steps need reading or judgment and which are pure data movement.",
          "Check which systems have APIs and which only have a user interface.",
          "Assign judgment steps to an agent, data movement to automation, and irreversible actions to a human approval.",
          "Agree the baseline and success metrics before building anything.",
        ],
      },
      { type: "h2", text: "What does each cost to run?" },
      {
        type: "p",
        text: "RPA costs are mostly licences and maintenance when interfaces change. Agent costs are mostly model usage, evaluation and review time, and they scale with the number and length of tasks. Neither is cheap if it is applied to the wrong problem, which is why we price automation against the measured cost of the current manual process, not against a generic benchmark.",
      },
      {
        type: "callout",
        title: "Already running RPA?",
        text: "You rarely need to replace it. Adding an agent in front of existing bots to handle unstructured intake is often the fastest win. See how we approach [digital transformation](/services/digital-transformation) without rip-and-replace.",
      },
    ],
    sources: [sources.anthropicAgents, sources.owasp, sources.nist],
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs fine-tuning: how to give an AI model your company's knowledge",
    answer:
      "Use retrieval-augmented generation (RAG) when the model needs your current, changing facts, such as policies, product data or tickets, with citations. Use fine-tuning when you need a consistent behavior, format or tone that prompting cannot achieve. Most production systems start with RAG; Zeta builds both and tests which one your use case needs.",
    excerpt:
      "When to use retrieval-augmented generation, when to fine-tune, how the two compare on freshness, cost and control, and how to evaluate either before you commit.",
    category: "AI & Automation",
    datePublished: "2026-10-29",
    dateModified: "2026-11-05",
    readTime: "8 min read",
    cover: "rag",
    services: ["ai-solutions", "ai-agents"],
    body: [
      { type: "h2", text: "What is retrieval-augmented generation (RAG)?" },
      {
        type: "p",
        text: "RAG gives a model the right information at the moment it answers. Your documents are split into passages, indexed for search, and the most relevant passages are retrieved and placed in the prompt alongside the question. The model then answers from that material and can cite it. The approach was formalised by [Lewis et al. (2020)](https://arxiv.org/abs/2005.11401), who showed that combining a retriever with a generator improves performance on knowledge-intensive tasks.",
      },
      {
        type: "diagram",
        kind: "rag-pipeline",
        alt: "Diagram of a RAG pipeline: company documents are chunked and indexed into a search index. A user question is used to retrieve the most relevant passages, which are passed with the question to a language model that writes an answer with citations back to the source documents.",
        caption: "RAG: index your knowledge once, retrieve the relevant passages per question, answer with citations.",
      },
      {
        type: "p",
        text: "Because knowledge lives in the index rather than in the model, updating it is as simple as re-indexing a changed document. Access control can be enforced at retrieval time, so people only receive answers built from documents they are allowed to see.",
      },
      { type: "h2", text: "What is fine-tuning?" },
      {
        type: "p",
        text: "Fine-tuning continues training a model on your own examples so that it adopts a behavior: a house style, a strict output format, a classification scheme or domain-specific phrasing. Parameter-efficient methods such as [LoRA](https://arxiv.org/abs/2106.09685) make this far cheaper than full retraining; the original paper reports reducing the number of trainable parameters by 10,000 times compared with full fine-tuning of GPT-3 175B.",
      },
      {
        type: "p",
        text: "Fine-tuning is a poor way to teach facts that change. Updating knowledge means preparing new data and training again, and a fine-tuned model cannot point to the document an answer came from.",
      },
      { type: "h2", text: "What are the differences between RAG and fine-tuning?" },
      {
        type: "table",
        caption: "RAG and fine-tuning compared",
        columns: ["", "RAG", "Fine-tuning"],
        rows: [
          ["Primary purpose", "Supply current, specific knowledge", "Shape consistent behavior, format or tone"],
          ["Keeping knowledge fresh", "Re-index changed documents", "Prepare new data and retrain"],
          ["Citations and traceability", "Yes, to the retrieved passages", "No built-in source attribution"],
          ["Access control", "Enforced per user at retrieval time", "Anything in training data can surface"],
          ["Upfront effort", "Data pipeline, chunking, search tuning", "Curated, labelled training examples"],
          ["Running cost driver", "Longer prompts and search infrastructure", "Training runs and model hosting"],
          ["Typical failure", "Retrieves the wrong or incomplete passage", "Confident answers that drift from the facts"],
        ],
      },
      { type: "h2", text: "When should you choose RAG?" },
      {
        type: "list",
        items: [
          "Answers must reflect documents that change: policies, catalogues, contracts, tickets.",
          "Users need to see and verify the source of each answer.",
          "Different people are allowed to see different documents.",
          "You want to start quickly and improve iteratively without retraining.",
        ],
      },
      { type: "h2", text: "When should you choose fine-tuning?" },
      {
        type: "list",
        items: [
          "Output must follow a strict structure every time, and prompting alone is not consistent enough.",
          "You need a specific tone or domain vocabulary across very high volumes.",
          "A smaller, cheaper model must match a larger one on a narrow, well-defined task.",
          "You have hundreds or thousands of good examples of the behavior you want.",
        ],
      },
      { type: "h2", text: "Can you combine RAG and fine-tuning?" },
      {
        type: "p",
        text: "Yes. A common pattern is a model fine-tuned for format and tone that still receives its facts through retrieval. Start with RAG and strong prompts; fine-tune only when evaluation shows a behavior gap that prompting and better retrieval cannot close.",
      },
      { type: "h2", text: "How do you evaluate either approach?" },
      {
        type: "p",
        text: "Build a test set before you build the system: real questions, the correct answers and the documents that support them. Then measure retrieval and generation separately, so you know which part to fix.",
      },
      {
        type: "table",
        caption: "What to measure in a knowledge assistant",
        columns: ["Measure", "Question it answers"],
        rows: [
          ["Retrieval recall", "Did the right passage appear in the retrieved set?"],
          ["Answer faithfulness", "Is every claim supported by the retrieved passages?"],
          ["Answer correctness", "Does the answer match the agreed reference answer?"],
          ["Refusal quality", "Does the system say \"I don't know\" when the source is missing?"],
          ["Latency and cost", "Is it fast and affordable enough at expected volume?"],
        ],
      },
      { type: "h2", text: "What are the common failure modes?" },
      {
        type: "list",
        items: [
          "**Poor chunking** that splits a rule from its exceptions, so the model answers from half a policy.",
          "**Stale indexes** because nobody owns re-indexing when documents change.",
          "**Leaking restricted content** when permissions are not applied at retrieval — listed by [OWASP](https://genai.owasp.org/llm-top-10/) as sensitive information disclosure.",
          "**Fine-tuning on facts**, which bakes in knowledge that is out of date by the next release.",
          "**No evaluation set**, so nobody can tell whether a change made things better or worse.",
        ],
      },
      {
        type: "callout",
        title: "Where we start",
        text: "For most knowledge assistants we build a RAG baseline with an evaluation set in the first iteration, then decide with data whether fine-tuning is worth it. See our [AI solutions and integration service](/services/ai-solutions).",
      },
    ],
    sources: [sources.rag, sources.lora, sources.owasp, sources.nist],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}
