/**
 * Case studies from the Industry Solutions & Case Study Library.
 *
 * Every entry carries a `status` so the site never overstates what was delivered:
 *  - "blueprint": a technically grounded example of what we build — not a completed customer deployment.
 *  - "discovery": a real business problem and proposed pilot — not yet a delivered project.
 *  - "reference": real platform context, presented as a reference architecture until our role is confirmed.
 * Client names from private material are intentionally anonymized.
 * Add `cover` / `gallery` paths (e.g. "/work/<slug>/cover.jpg") once real screenshots are approved;
 * until then each case study renders its industry's designed visual.
 */
export type CaseStatus = "blueprint" | "discovery" | "reference";

export type CaseStudy = {
  slug: string;
  industry: string; // industry slug
  status: CaseStatus;
  title: string;
  client: string; // anonymized descriptor
  summary: string;
  services: string[]; // service slugs
  challenge: string[];
  approachIntro: string;
  layers: { name: string; body: string }[];
  approachNote?: string;
  features: string[];
  kpis: { area: string; metrics: string }[];
  kpiNote?: string;
  cover?: string;
  gallery?: string[];
};

export const statusMeta: Record<CaseStatus, { label: string; description: string }> = {
  blueprint: {
    label: "Solution blueprint",
    description: "A technically grounded example of what we build. It is not a claim of a completed customer deployment.",
  },
  discovery: {
    label: "Discovery stage",
    description: "A real business problem and a proposed pilot. It is not yet a delivered project or agreed contract.",
  },
  reference: {
    label: "Platform reference",
    description: "Based on real platform context and presented as a reference architecture.",
  },
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-vendor-commerce-platform",
    industry: "ecommerce-marketplaces",
    status: "reference",
    title: "Multi-vendor discovery and commerce platform",
    client: "Multi-category marketplace",
    summary:
      "A marketplace architecture that makes discovery simple for customers while giving vendors control of their presence — designed to add categories, locations and integrations without a rebuild.",
    services: ["web-development", "mobile-apps", "ai-agents"],
    challenge: [
      "A marketplace spanning multiple product and service categories must make discovery simple for customers while giving vendors enough control to manage their own presence.",
      "As categories and locations grow, inconsistent listing quality and fragmented customer communication undermine trust and conversion.",
    ],
    approachIntro: "We structure the platform around four connected layers on a modular, API-driven backend.",
    layers: [
      { name: "Customer experience", body: "Search, browse, compare, enquire and return." },
      { name: "Merchant operations", body: "Profiles, offers, availability, listings and customer communication." },
      { name: "Marketplace orchestration", body: "Categories, moderation, workflows, notifications and business rules." },
      { name: "Data & analytics", body: "Discovery behavior, enquiry conversion, vendor activity and marketplace health." },
    ],
    approachNote: "AI supports search and customer service, while transaction-sensitive actions stay governed by explicit business rules.",
    features: [
      "Multi-vendor, multi-category listings",
      "Location-aware discovery and vendor profiles",
      "Offers, ratings and reviews",
      "Direct customer–provider communication where appropriate",
      "Merchant onboarding and listing moderation",
      "Admin controls for categories, users and content",
      "Event tracking for searches, enquiries, orders and repeat visits",
      "Optional payment, delivery, CRM and messaging integrations",
    ],
    kpis: [
      { area: "Conversion", metrics: "Listing-view-to-enquiry and product-view-to-order rates" },
      { area: "Discovery", metrics: "Search success, zero-result rate and time to find a listing" },
      { area: "Merchant activation", metrics: "Onboarding completion, time to first listing, active-vendor ratio" },
      { area: "Commercial performance", metrics: "GMV, commission revenue and average order value" },
      { area: "Retention", metrics: "Repeat purchase rate and returning-customer share" },
      { area: "Scalability", metrics: "Active vendors, listings, concurrent users and API response times" },
    ],
    kpiNote: "Measured against a pre-launch or pre-improvement baseline.",
  },
  {
    slug: "solar-ev-roi-simulator",
    industry: "ev-mobility",
    status: "blueprint",
    title: "Commercial solar and EV infrastructure ROI simulator",
    client: "Parking operators, municipalities and property owners",
    summary:
      "A configurable decision-support tool that turns site and commercial assumptions into a transparent investment model for solar canopies, EV charging and battery storage.",
    services: ["web-development", "app-web-strategy", "immersive-experiences"],
    challenge: [
      "Parking operators, municipalities, landowners and commercial property owners may have space for solar canopies or EV charging but no consistent way to compare investment options.",
      "Decisions depend on site characteristics, energy consumption, tariffs, installation costs, charging demand and assumptions about future utilization.",
    ],
    approachIntro: "A layered model that keeps user inputs, estimates and measured site data clearly separated.",
    layers: [
      { name: "Input layer", body: "Site size, parking capacity, solar potential, charger count, utilization, tariffs and installation costs." },
      { name: "Calculation layer", body: "Solar generation, charging demand, grid imports, self-consumption, operating costs and financial scenarios." },
      { name: "Scenario layer", body: "Compare charger configurations, solar capacity, battery storage and tariff assumptions." },
      { name: "Presentation layer", body: "Interactive dashboards, assumptions register, sensitivity analysis and exportable reports." },
      { name: "Integration layer", body: "Optional weather, mapping, tariff, CRM and project-management services." },
    ],
    approachNote: "A simulation is never presented as a guaranteed return.",
    features: [
      "Site and parking-capacity inputs",
      "Solar generation and EV charging scenarios",
      "Capex and operating cost estimates",
      "Payback and NPV where inputs allow",
      "Sensitivity analysis for prices, utilization and install cost",
      "Solar-only vs charging-only vs combined comparisons",
      "Lead capture, downloadable reports and CRM handoff",
      "Versioned scenarios and an assumptions log",
    ],
    kpis: [
      { area: "Decision efficiency", metrics: "Time to prepare a feasibility assessment" },
      { area: "Commercial conversion", metrics: "Qualified leads, completion rate, lead-to-consultation" },
      { area: "Model usability", metrics: "Scenario completion, report downloads and drop-off" },
      { area: "Investment quality", metrics: "Variance between forecast and actual costs or returns" },
      { area: "Asset performance", metrics: "Charger uptime, utilization and failed-session rate" },
      { area: "Energy performance", metrics: "Self-consumption, grid offset and energy cost per session" },
    ],
    kpiNote: "Proposed measurement categories. Financial projections must be validated against real site and tariff data.",
  },
  {
    slug: "fleet-visibility-trailer-security",
    industry: "logistics-supply-chain",
    status: "discovery",
    title: "Fleet visibility and trailer-security enhancement",
    client: "Regional transport operator",
    summary:
      "Operational intelligence layered around an existing fleet environment — detecting trailer separation and tamper events, routing alerts to the right teams and connecting fleet context to ERP.",
    services: ["digital-transformation", "ai-agents", "web-development"],
    challenge: [
      "A transport operator running several hundred tractor units and trailers had tracking spread across multiple providers, with business processes in an enterprise ERP.",
      "Ordinary GPS tracking didn't fully address locating a trailer after disconnection, or alerting the right teams quickly when it happened.",
    ],
    approachIntro: "Add operational intelligence around the existing environment rather than replacing it wholesale.",
    layers: [
      { name: "Telemetry adapters", body: "Receive supported vehicle and trailer data from compatible devices and providers." },
      { name: "Event processing", body: "Detect trailer separation, unexpected movement, communication loss and configured tamper events." },
      { name: "Alert orchestration", body: "Route alerts to authorized staff with escalation and acknowledgement rules." },
      { name: "Fleet context", body: "Connect vehicle identity, assignments, maintenance and status to existing systems where interfaces permit." },
      { name: "Operations dashboard", body: "Live locations, incident history, alert status and fleet context." },
    ],
    approachNote:
      "Device power, connectivity, installation constraints, warranties, regulation and false-alert handling are validated before any security capability is promised.",
    features: [
      "Trailer-to-tractor association and separation alerts",
      "Independent trailer location where hardware supports it",
      "SMS or email notification to designated teams",
      "Incident location sharing and escalation workflows",
      "Status classes including assigned-but-idle and unallocated",
      "Maintenance visibility from history and ERP data",
      "Natural-language queries over supported operational data",
      "Pilot dashboard and acceptance criteria for a vehicle subset",
    ],
    kpis: [
      { area: "Security", metrics: "Time from separation to alert, device uptime, detection coverage" },
      { area: "Recovery", metrics: "Time to locate a detached trailer and coordinate a response" },
      { area: "Reliability", metrics: "False-positive rate, missed events and telemetry availability" },
      { area: "Fleet utilization", metrics: "Productive utilization, idle hours by category, assignment delays" },
      { area: "Maintenance", metrics: "Unplanned downtime and service-related cancellations" },
      { area: "Operational efficiency", metrics: "Time to prepare reports and investigate exceptions" },
    ],
    kpiNote: "The pilot establishes baselines, agrees hardware and acceptance criteria, and measures value beyond existing GPS capability.",
  },
  {
    slug: "offline-first-vessel-operations",
    industry: "maritime",
    status: "blueprint",
    title: "Offline-first vessel operations platform",
    client: "Maritime fleet operator",
    summary:
      "Dependable onboard workflows that keep running without shore connectivity, with a sync engine, digital twin data model and fleet-wide visibility once vessels reconnect.",
    services: ["mobile-apps", "web-development", "immersive-experiences"],
    challenge: [
      "A maritime operator needs onboard workflows that work when connectivity to shore is unavailable or unreliable.",
      "A cloud-only app can stop crews from opening checklists, recording inspections or updating maintenance at precisely the moment the information is needed.",
    ],
    approachIntro: "The architecture treats connectivity as a constraint to design around, not an assumption.",
    layers: [
      { name: "Onboard application", body: "Stores permitted operational data locally in an encrypted database." },
      { name: "Sync engine", body: "Queues changes, retries transfers, detects conflicts and applies documented resolution rules." },
      { name: "Vessel data service", body: "Normalizes equipment, maintenance, inspection and operational records." },
      { name: "Digital twin layer", body: "Latest known state of selected equipment, with the timestamp and source of every update." },
      { name: "Shore-side platform", body: "Fleet dashboards, reports, permissions and audit history." },
      { name: "AI assistance", body: "Retrieves approved procedures and records with source references and stale-data handling." },
    ],
    approachNote: "The twin distinguishes live telemetry from the last synchronized value — it never implies an offline asset is monitored in real time.",
    features: [
      "Offline access to tasks and approved procedures",
      "Inspection forms, defect reports, photos and signatures",
      "Queued updates with retry and conflict handling",
      "Equipment hierarchy and maintenance history",
      "Vessel- and fleet-level dashboards",
      "Sync status and stale-data indicators",
      "Incident escalation and shore notifications",
      "Audit-ready activity history and controlled access",
    ],
    kpis: [
      { area: "Operational continuity", metrics: "Share of critical workflows available offline" },
      { area: "Data integrity", metrics: "Sync success, unresolved conflicts and duplicate records" },
      { area: "Crew productivity", metrics: "Time to complete inspections and maintenance documentation" },
      { area: "Maintenance", metrics: "Overdue work orders, repeat defects and equipment downtime" },
      { area: "Reliability", metrics: "Crash rate, sync recovery time and data-loss incidents" },
      { area: "Compliance support", metrics: "Record completeness and retrieval time during audits" },
    ],
  },
  {
    slug: "property-discovery-asset-platform",
    industry: "real-estate",
    status: "blueprint",
    title: "Interactive property discovery and asset platform",
    client: "Property and asset management business",
    summary:
      "One property data model powering both customer-facing discovery — search, tours, bookings — and internal asset operations, reporting and maintenance.",
    services: ["web-development", "immersive-experiences", "ai-solutions"],
    challenge: [
      "A property business manages listings, enquiries, viewing appointments and asset information across many properties.",
      "Manual handoffs delay responses, and inconsistent property data confuses prospects and internal teams alike.",
    ],
    approachIntro: "We separate property data, user experience and operational workflow so listings power both discovery and reporting.",
    layers: [
      { name: "Property catalog", body: "Standardized property, unit, location, amenity, pricing and availability data." },
      { name: "Experience layer", body: "Search, filters, galleries, virtual tours and responsive property pages." },
      { name: "Lead workflow", body: "Enquiry capture, qualification, agent assignment, reminders and booking integration." },
      { name: "Asset operations", body: "Occupancy, maintenance requests, document history and status tracking." },
      { name: "Analytics", body: "Enquiry sources, viewing conversion, vacancy duration and property performance." },
    ],
    approachNote: "AI assists with natural-language search and first-line enquiries; price changes, contracts and booking exceptions stay under authorized control.",
    features: [
      "Searchable property and unit catalog",
      "Interactive floor plans, galleries and virtual tours",
      "Enquiry forms with lead-to-CRM sync",
      "Viewing calendar and automated reminders",
      "Agent and property-manager dashboards",
      "Tenant service and maintenance workflows",
      "Role-based document access",
      "Reporting by property, agent, location and portfolio",
    ],
    kpis: [
      { area: "Lead conversion", metrics: "Listing-view-to-enquiry and enquiry-to-viewing rates" },
      { area: "Response efficiency", metrics: "Time to first response and to assign an enquiry" },
      { area: "Sales & leasing", metrics: "Viewing-to-application and application-to-transaction rates" },
      { area: "Occupancy", metrics: "Vacancy duration and occupancy rate" },
      { area: "Engagement", metrics: "Virtual-tour completion and repeat property visits" },
      { area: "Data quality", metrics: "Listing completeness, availability accuracy and duplicates" },
    ],
  },
  {
    slug: "machine-vision-industrial-telemetry",
    industry: "robotics-industrial-iot",
    status: "reference",
    title: "Machine-vision inspection and industrial telemetry",
    client: "Automated manufacturing line",
    summary:
      "Edge vision inspection connected to traceability, maintenance and production decisions — with deterministic safety controls that AI predictions can never bypass.",
    services: ["ai-solutions", "digital-transformation", "immersive-experiences"],
    challenge: [
      "A manufacturer running automated equipment needs to identify defects consistently, connect inspection outcomes to quality records and understand equipment performance.",
      "An isolated camera or sensor can detect a problem yet fail to connect it to traceability, maintenance and production decisions.",
    ],
    approachIntro: "Inspection, safety and analytics designed as one pipeline from the edge to the plant floor systems.",
    layers: [
      { name: "Edge acquisition", body: "Capture supported camera images and machine signals close to the line." },
      { name: "Inference service", body: "Run a validated vision model against defined defect classes and confidence thresholds." },
      { name: "Decision & safety layer", body: "Deterministic rules, permitted operating states and fail-safe behavior." },
      { name: "Industrial integration", body: "Approved outcomes sent to PLCs, MES, QMS or maintenance systems via supported interfaces." },
      { name: "Observability", body: "Defect events, model version, confidence, timestamps and equipment context." },
      { name: "Analytics", body: "Defect patterns, machine conditions and shift-level trends." },
    ],
    approachNote: "Safety-critical actions stay within engineered controls, interlocks and authorized PLC logic.",
    features: [
      "Image acquisition and inspection-event logging",
      "Configurable defect categories and thresholds",
      "Edge inference and connectivity monitoring",
      "Operator review and exception queues",
      "Controlled reject or stop signals via approved controls",
      "Defect traceability to product or batch IDs",
      "Telemetry, anomaly alerts and maintenance workflows",
      "Shift reports, Pareto analysis and audit history",
    ],
    kpis: [
      { area: "Quality", metrics: "Defect escape rate, false rejects, precision and recall" },
      { area: "Production", metrics: "First-pass yield, scrap, rework and unplanned downtime" },
      { area: "Inspection", metrics: "Cycle time and inspection coverage" },
      { area: "Equipment", metrics: "Availability, MTBF and MTTR" },
      { area: "Integration", metrics: "Inspection events linked to traceable production records" },
      { area: "Model governance", metrics: "Drift indicators, human override rate and validation results" },
    ],
    kpiNote: "Accuracy claims always specify the dataset, operating conditions, defect classes and validation method.",
  },
  {
    slug: "financial-document-operations",
    industry: "financial-services",
    status: "blueprint",
    title: "Secure financial document operations",
    client: "Accounting and finance-outsourcing team",
    summary:
      "A controlled document workflow — intake, extraction, validation, human review and ERP sync — that cuts rekeying while keeping every material decision traceable.",
    services: ["ai-solutions", "ai-agents", "digital-transformation"],
    challenge: [
      "A finance team handles high volumes of documents from many clients.",
      "Missing information, inconsistent naming, manual rekeying and unclear approval status create delays and hide which cases need attention.",
    ],
    approachIntro: "Build a controlled document workflow rather than treating AI extraction as the whole solution.",
    layers: [
      { name: "Secure intake", body: "Authenticated uploads, file validation and client or case association." },
      { name: "Document processing", body: "OCR, classification, field extraction and confidence scoring." },
      { name: "Validation", body: "Rules check totals, dates, identifiers, required fields and record relationships." },
      { name: "Human review", body: "Low-confidence or conflicting fields routed to an authorized reviewer." },
      { name: "System integration", body: "Approved data sent to the designated accounting or ERP system." },
      { name: "Audit & reporting", body: "Document status, review decisions, exceptions and downstream updates." },
    ],
    approachNote: "Data residency, retention, encryption, permissions and third-party model handling are defined before production use.",
    features: [
      "Client-specific upload areas and categorization",
      "OCR and structured field extraction",
      "Duplicate detection and missing-document checks",
      "Reconciliation queues and exception prioritization",
      "Review, approval and correction history",
      "Client notifications and reminders",
      "Accounting-system integration via supported APIs",
      "Workload dashboards and close-readiness reports",
    ],
    kpis: [
      { area: "Processing", metrics: "Handling time per document and documents per employee" },
      { area: "Quality", metrics: "Extraction accuracy, correction rate and exception rate" },
      { area: "Close performance", metrics: "Time to complete month-end and overdue items" },
      { area: "Productivity", metrics: "Straight-through processing rate for eligible documents" },
      { area: "Governance", metrics: "Access reviews, audit-trail completeness and policy exceptions" },
      { area: "Financial operations", metrics: "Cost per processed document and rework hours" },
    ],
  },
  {
    slug: "skills-to-opportunity-platform",
    industry: "talent-compliance",
    status: "reference",
    title: "Skills-to-opportunity platform",
    client: "Talent and education platform",
    summary:
      "Structured profiles, a shared skills taxonomy and explainable matching that connect jobseekers, employers and education providers — with human review on every decision.",
    services: ["ai-solutions", "web-development", "product-design"],
    challenge: [
      "A talent platform connects jobseekers, employers and education providers, but matching people to vacancies is hard when profiles and job descriptions use inconsistent terminology.",
      "Employers need relevant candidates; jobseekers need clearer pathways to close skill gaps. Vacancy-fill rate is tracked against an ambitious target.",
    ],
    approachIntro: "Normalize the data first, then match transparently and let people make the decisions.",
    layers: [
      { name: "Profile normalization", body: "CVs, skills, experience and credentials converted into structured profiles." },
      { name: "Skills taxonomy", body: "Job and candidate terminology mapped to a common framework, such as ESCO." },
      { name: "Matching engine", body: "Explicit requirements, skills similarity, experience and transparent eligibility rules." },
      { name: "Gap analysis", body: "Missing capabilities identified, with relevant training or assessments recommended." },
      { name: "Workflow orchestration", body: "Applications, employer review, interview scheduling and notifications." },
      { name: "Analytics", body: "Recruitment funnel, match quality and vacancy outcomes." },
    ],
    approachNote: "The platform explains match factors and keeps a human in the loop. Automated matching is never an unquestionable hiring decision.",
    features: [
      "Candidate profiles and employer vacancy management",
      "Structured skill extraction and taxonomy mapping",
      "Match explanations and configurable eligibility",
      "Skills-gap reports and training recommendations",
      "Interview scheduling and status notifications",
      "Employer dashboards and funnel analytics",
      "Consent, access and data-retention controls",
      "Audit logs for matching and workflow decisions",
    ],
    kpis: [
      { area: "Recruitment", metrics: "Vacancy-fill rate, time to shortlist and time to interview" },
      { area: "Match quality", metrics: "Employer acceptance and interview-to-offer conversion" },
      { area: "Candidate experience", metrics: "Profile completion and application abandonment" },
      { area: "Skills development", metrics: "Gap-closure rate and training completion" },
      { area: "Compliance readiness", metrics: "Evidence completeness, overdue remediation, audit prep time" },
      { area: "Governance", metrics: "Match explainability, review completion and exceptions" },
    ],
  },
  {
    slug: "mentor-mentee-platform",
    industry: "education",
    status: "blueprint",
    title: "Mentor–mentee engagement platform",
    client: "Education and mentorship provider",
    summary:
      "A platform built around the complete learner journey — matching, scheduling, goals and outcomes — so mentorship scales without the administrative burden.",
    services: ["web-development", "mobile-apps", "product-design"],
    challenge: [
      "An education provider wants to expand access to mentors without creating an administrative burden.",
      "Matching, scheduling, session notes, goal tracking and feedback are spread across spreadsheets, email and separate calendars.",
    ],
    approachIntro: "Design around the complete learner journey rather than the booking function alone.",
    layers: [
      { name: "Identity & profiles", body: "Learner goals, mentor expertise, preferences and availability." },
      { name: "Matching service", body: "Rules-based recommendations using skills, subject, goals and availability." },
      { name: "Scheduling service", body: "Calendar integration, confirmations, reminders and rescheduling." },
      { name: "Programme workflow", body: "Learning goals, session records, tasks and milestones." },
      { name: "Feedback & analytics", body: "Attendance, engagement, satisfaction and progress against goals." },
    ],
    approachNote: "AI helps learners find resources and prepare for sessions; mentors keep control of guidance, assessment and sensitive decisions.",
    features: [
      "Mentor and mentee onboarding",
      "Search, filtering and matching recommendations",
      "Calendar sync and session booking",
      "Reminders, cancellations and rescheduling",
      "Goal-setting and action-plan tracking",
      "Private session notes",
      "Course and resource recommendations",
      "Programme dashboards and outcome reports",
    ],
    kpis: [
      { area: "Access", metrics: "Time to find a suitable mentor and match acceptance" },
      { area: "Engagement", metrics: "Booking completion, attendance and repeat sessions" },
      { area: "Learning", metrics: "Goal completion and assessment improvement" },
      { area: "Operations", metrics: "Admin hours per learner and scheduling conflicts" },
      { area: "Experience", metrics: "Learner and mentor satisfaction" },
      { area: "Scalability", metrics: "Active mentors, learners served, sessions per coordinator" },
    ],
  },
  {
    slug: "multi-location-restaurant-portal",
    industry: "hospitality",
    status: "blueprint",
    title: "Multi-location restaurant management portal",
    client: "Restaurant group",
    summary:
      "A central management layer with controlled local flexibility: consistent brand and menus, location-specific bookings, and group-wide performance in one view.",
    services: ["web-development", "ai-agents", "digital-transformation"],
    challenge: [
      "A restaurant group needs consistent brand presentation while each location manages its own availability, menu variations and operational requirements.",
      "Separate systems and manual updates make information hard to keep accurate and group-wide performance hard to see.",
    ],
    approachIntro: "Use a central management layer with controlled local flexibility.",
    layers: [
      { name: "Content layer", body: "Shared brand assets, menu templates, policies and promotions." },
      { name: "Location layer", body: "Opening hours, local menu availability, contact details and booking rules." },
      { name: "Guest experience", body: "Search, menus, enquiries, reservations and mobile-friendly pages." },
      { name: "Integration layer", body: "Supported POS, reservation, delivery, payment and CRM systems." },
      { name: "Analytics layer", body: "Location performance, enquiry sources, bookings and cancellations." },
    ],
    approachNote: "The AI assistant only confirms or changes a booking when the connected reservation system returns a valid result.",
    features: [
      "Multi-location restaurant directory",
      "Centralized menu and promotion management",
      "Location-specific booking and enquiry workflows",
      "Automated confirmations and reminders",
      "Staff roles and approval controls",
      "Feedback and loyalty integrations",
      "AI-assisted FAQ and menu enquiries",
      "Group and location-level reporting",
    ],
    kpis: [
      { area: "Bookings", metrics: "Enquiry-to-booking conversion and reservation completion" },
      { area: "Guest experience", metrics: "Time to respond and guest satisfaction" },
      { area: "Operations", metrics: "Missed enquiries, manual updates and booking errors" },
      { area: "Revenue", metrics: "Online-order conversion, AOV and repeat customer rate" },
      { area: "Location management", metrics: "Menu-update turnaround and data consistency" },
      { area: "Technology", metrics: "Ordering uptime and integration error rate" },
    ],
  },
  {
    slug: "patient-intake-appointments",
    industry: "healthcare",
    status: "blueprint",
    title: "Digital patient intake and appointment coordination",
    client: "Healthcare and wellness provider",
    summary:
      "Secure intake, completeness checks and appointment workflows that reduce administrative load — without letting automation make clinical decisions.",
    services: ["web-development", "ai-solutions", "product-design"],
    challenge: [
      "A provider receives patient information through forms, calls, emails and uploaded documents.",
      "Staff must collect complete information, coordinate appointments and route requests without exposing sensitive data or letting automation make clinical decisions.",
    ],
    approachIntro: "Separate patient experience, administrative processing and governance — each with its own controls.",
    layers: [
      { name: "Patient experience", body: "Secure forms, appointment requests and accessible status updates." },
      { name: "Intake service", body: "Collect required fields and validate completeness." },
      { name: "Document processing", body: "Classify and extract approved administrative information." },
      { name: "Workflow engine", body: "Route requests to the right team and track outstanding actions." },
      { name: "Integration layer", body: "Supported scheduling or clinical systems through authorized interfaces." },
      { name: "Governance layer", body: "Access controls, consent, retention, audit logging and escalation rules." },
    ],
    approachNote: "Compliance claims are tied to the actual deployment, data flows and validated safeguards — never implied by security features alone.",
    features: [
      "Digital intake forms and document uploads",
      "Appointment requests, confirmations and reminders",
      "Missing-information checks",
      "Administrative queue management",
      "Staff review and escalation workflows",
      "Secure messaging and status updates",
      "Audit logs and role-based permissions",
      "Reporting on response times and completion",
    ],
    kpis: [
      { area: "Access", metrics: "Booking completion and time to appointment" },
      { area: "Administration", metrics: "Intake processing time and manual data-entry hours" },
      { area: "Quality", metrics: "Intake completeness, duplicates and correction rate" },
      { area: "Engagement", metrics: "Reminder delivery, attendance and follow-up completion" },
      { area: "Reliability", metrics: "Portal availability and integration success rate" },
      { area: "Governance", metrics: "Access exceptions, audit completeness and privacy incidents" },
    ],
  },
  {
    slug: "enterprise-ai-usage-metering",
    industry: "saas-enterprise",
    status: "blueprint",
    title: "Enterprise AI workflow and usage-metering layer",
    client: "Multi-tenant SaaS provider",
    summary:
      "AI-assisted workflows across tenants with fair usage tracking, cost control and a clear record of what was consumed and which actions were executed.",
    services: ["ai-agents", "ai-solutions", "web-development"],
    challenge: [
      "A SaaS provider wants to introduce AI-assisted workflows across many customers or business units.",
      "The product must track usage fairly, control costs, enforce tenant boundaries and give administrators a clear record of consumption and executed actions.",
    ],
    approachIntro: "The design separates intelligence, execution and commercial controls into distinct planes.",
    layers: [
      { name: "Experience plane", body: "Tenant workspaces, administration and user-facing AI features." },
      { name: "Intelligence plane", body: "Model routing, retrieval, structured prompts and evaluation." },
      { name: "Execution plane", body: "Permissioned APIs and workflows with validation, retries and exception handling." },
      { name: "Commercial plane", body: "Usage meters, credit reservations, append-only usage records and billing exports." },
      { name: "Governance plane", body: "Tenant isolation, audit logs, rate limits, model versioning and access policies." },
    ],
    approachNote: "Usage events are reconciled with actual service execution and validated against billing records.",
    features: [
      "Multi-tenant workspace management",
      "AI agent and workflow configuration",
      "Policy-based model selection",
      "Human approval for high-impact actions",
      "API connectors and event-driven orchestration",
      "Usage by feature, tenant and service",
      "Credit reservation, consumption and reconciliation",
      "Cost dashboards, audit logs and rollback controls",
    ],
    kpis: [
      { area: "Product delivery", metrics: "Lead time for new features and release frequency" },
      { area: "Platform quality", metrics: "Availability, error rate and incident recovery time" },
      { area: "Automation", metrics: "Workflow completion, exception rate and review time" },
      { area: "Economics", metrics: "Cost per successful AI task and margin by feature" },
      { area: "Commercial operations", metrics: "Metering reconciliation, billing disputes, revenue leakage" },
      { area: "Governance", metrics: "Audit completeness and unauthorized-action rate" },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
