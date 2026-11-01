import {
  ShoppingBag,
  PlugZap,
  Truck,
  Ship,
  Building,
  Factory,
  Calculator,
  UserCheck,
  GraduationCap,
  UtensilsCrossed,
  HeartPulse,
  Boxes,
  type LucideIcon,
} from "lucide-react";

/**
 * Describes the illustrative interface drawn for an industry (see components/visuals/industry-visual.tsx).
 * Numbers here are UI decoration for a concept visual, not client results.
 */
export type VisualChart =
  | { kind: "bars"; label: string; values: number[] }
  | { kind: "line"; label: string; values: number[] }
  | { kind: "ring"; label: string; segments: { label: string; value: number }[] }
  | { kind: "grid"; label: string; tiles: string[] }
  | { kind: "map"; label: string }
  | { kind: "nodes"; label: string; steps: string[] }
  | { kind: "vision"; label: string }
  | { kind: "doc"; label: string; fields: [string, string][] }
  | { kind: "timeline"; label: string; lanes: { label: string; blocks: [number, number][] }[] };

export type IndustryVisual = {
  accent: string;
  title: string;
  badge: string;
  chart: VisualChart;
  stats: [string, string][];
  rows: { label: string; meta: string; tone: "ok" | "warn" | "info" }[];
  callout: { title: string; lines: [string, string] };
};

export type Industry = {
  slug: string;
  number: string;
  name: string;
  short: string;
  icon: LucideIcon;
  headline: string;
  valueProp: string;
  painPoints: string[];
  offerings: string[];
  services: string[];
  caseStudy: string;
  visual: IndustryVisual;
};

export const industries: Industry[] = [
  {
    slug: "ecommerce-marketplaces",
    number: "01",
    name: "E-Commerce & Retail Marketplaces",
    short: "Marketplaces",
    icon: ShoppingBag,
    headline: "Create marketplace experiences that turn discovery into transactions.",
    valueProp:
      "Launch and scale multi-vendor commerce platforms that connect customers, merchants, products, services and payments — infrastructure designed around conversion, merchant operations and scalable growth.",
    painPoints: [
      "Customers struggle to find relevant products, local services and trusted vendors.",
      "Merchants manage inconsistent catalogs, availability, pricing and order workflows.",
      "Operators juggle listings, enquiries, commissions, promotions, disputes and reviews.",
      "Fragmented communication causes missed enquiries and poor order visibility.",
      "New locations, languages and categories add operational complexity.",
      "Acquisition costs rise faster than conversion and repeat purchase.",
    ],
    offerings: [
      "Multi-vendor web platforms, storefronts and mobile apps",
      "Merchant and admin portals: onboarding, catalog, inventory, commissions, moderation",
      "Search, location-aware listings, recommendations and filters",
      "Automated enquiry routing, order notifications and follow-ups",
      "AI assistants for product questions and order status",
      "Payments, maps, messaging, inventory and accounting integrations",
      "Funnel, merchant, category and repeat-customer analytics",
    ],
    services: ["web-development", "mobile-apps", "ai-agents", "seo"],
    caseStudy: "multi-vendor-commerce-platform",
    visual: {
      accent: "#F55C1A",
      title: "Marketplace · Storefront",
      badge: "Live",
      chart: { kind: "grid", label: "Trending in your area", tiles: ["Home", "Tech", "Beauty", "Food", "Fitness", "Services"] },
      stats: [
        ["Active vendors", "248"],
        ["Listings", "12.4k"],
      ],
      rows: [
        { label: "Vendor onboarding", meta: "6 pending", tone: "warn" },
        { label: "Enquiry routed", meta: "2m ago", tone: "ok" },
        { label: "Zero-result searches", meta: "1.8%", tone: "info" },
        { label: "Payout batch", meta: "Scheduled", tone: "info" },
      ],
      callout: { title: "Enquiry routed", lines: ["Matched to the nearest vendor", "with live availability"] },
    },
  },
  {
    slug: "ev-mobility",
    number: "02",
    name: "Electric Vehicles & Sustainable Mobility",
    short: "EV & Mobility",
    icon: PlugZap,
    headline: "Connect mobility infrastructure, customer experience and intelligent energy decisions.",
    valueProp:
      "Digital products for EV ecosystems — from immersive vehicle experiences and charging-infrastructure portals to fleet intelligence and renewable-energy decision tools.",
    painPoints: [
      "Charging infrastructure is spread across sites, operators and hardware vendors.",
      "Owners need visibility into availability, energy use, downtime and utilization.",
      "Adoption decisions hinge on capital cost, tariffs and operating economics.",
      "Hardware and software expose different APIs and data formats.",
      "AR/VR showcases impress but rarely connect to product data or lead generation.",
      "Fleets must coordinate charging, availability and operating schedules.",
    ],
    offerings: [
      "EV charging and asset-management portals",
      "Charger, vehicle and energy-data integrations",
      "Fleet dashboards for utilization, charging status and service issues",
      "Solar-plus-EV and battery-storage feasibility tools",
      "Interactive 3D, AR and VR product experiences",
      "Lead capture and CRM integration for automotive experiences",
      "AI-assisted reporting, anomaly detection and recommendations",
    ],
    services: ["web-development", "immersive-experiences", "app-web-strategy", "ai-solutions"],
    caseStudy: "solar-ev-roi-simulator",
    visual: {
      accent: "#34D399",
      title: "Solar + EV · Scenario B",
      badge: "Model",
      chart: { kind: "bars", label: "Solar generation vs charging demand", values: [12, 18, 30, 46, 62, 74, 80, 76, 64, 48, 30, 16] },
      stats: [
        ["Chargers", "24"],
        ["Solar", "480 kWp"],
      ],
      rows: [
        { label: "Utilization assumption", meta: "32%", tone: "info" },
        { label: "Tariff sensitivity", meta: "±12%", tone: "warn" },
        { label: "Charger uptime", meta: "Tracked", tone: "ok" },
        { label: "Report exported", meta: "PDF", tone: "ok" },
      ],
      callout: { title: "Scenarios compared", lines: ["Solar-only vs combined", "deployment, side by side"] },
    },
  },
  {
    slug: "logistics-supply-chain",
    number: "03",
    name: "Logistics, Freight & Supply Chain",
    short: "Logistics",
    icon: Truck,
    headline: "Give every shipment, vehicle and operational exception a clearer path forward.",
    valueProp:
      "Connect fleet telemetry, ERP workflows, dispatch operations and AI-assisted reporting to improve visibility, coordinate exceptions and make better use of every asset.",
    painPoints: [
      "Fleet data is scattered across GPS providers, ERPs, spreadsheets and messaging.",
      "Dispatchers lack a reliable view of vehicle availability and maintenance.",
      "Trailer disconnection, tampering and cargo incidents need rapid investigation.",
      "Idle time is poorly classified and manual reporting delays decisions.",
      "Maintenance schedules don't reflect real usage or upcoming journeys.",
      "Regulatory reporting and vehicle integrations add constraints.",
    ],
    offerings: [
      "Fleet and shipment management applications",
      "ERP integration, including Odoo and others where APIs permit",
      "GPS and telematics integrations across supported hardware",
      "Trailer separation and tamper-event workflows",
      "Utilization, maintenance and idle-time analytics",
      "AI-assisted operational queries and report generation",
      "Driver, dispatcher and maintenance portals with escalation and audit trails",
    ],
    services: ["digital-transformation", "ai-agents", "mobile-apps", "web-development"],
    caseStudy: "fleet-visibility-trailer-security",
    visual: {
      accent: "#38BDF8",
      title: "Fleet operations",
      badge: "Live",
      chart: { kind: "map", label: "Active routes" },
      stats: [
        ["Units online", "588"],
        ["Open alerts", "3"],
      ],
      rows: [
        { label: "Trailer separation", meta: "Escalated", tone: "warn" },
        { label: "Assigned but idle", meta: "14 units", tone: "info" },
        { label: "Maintenance due", meta: "7 vehicles", tone: "info" },
        { label: "Daily report", meta: "Generated", tone: "ok" },
      ],
      callout: { title: "Separation detected", lines: ["Location shared with the", "on-call operations team"] },
    },
  },
  {
    slug: "maritime",
    number: "04",
    name: "Maritime SaaS & Digital Twin Vessels",
    short: "Maritime",
    icon: Ship,
    headline: "Bring vessel operations, maintenance and fleet intelligence into one connected system.",
    valueProp:
      "Maritime software that connects vessel data, onboard workflows, maintenance records and shore-side decision-making — even when connectivity is limited.",
    painPoints: [
      "Operations must continue through intermittent or expensive connectivity.",
      "Records, inspections and maintenance logs are scattered across tools.",
      "Shore teams lack timely visibility into onboard conditions.",
      "Offline edits by multiple users create synchronization conflicts.",
      "Equipment history, checklists and incidents need reliable traceability.",
      "Fleet analytics need consistent data across different vessel systems.",
    ],
    offerings: [
      "Offline-first native and cross-platform mobile apps",
      "Vessel and fleet operations portals",
      "Digital twin data models for supported assets and equipment",
      "Maintenance, inspection, checklist and incident workflows",
      "Telemetry and equipment-system integrations",
      "Sync services with conflict resolution, audit logs and RBAC",
      "AI-assisted document search and maintenance knowledge retrieval",
    ],
    services: ["mobile-apps", "immersive-experiences", "web-development", "ai-solutions"],
    caseStudy: "offline-first-vessel-operations",
    visual: {
      accent: "#60A5FA",
      title: "Vessel · Last synced 06:42",
      badge: "Offline",
      chart: { kind: "line", label: "Main engine load (last known)", values: [40, 44, 43, 50, 56, 54, 60, 63, 58, 64, 69, 66, 72] },
      stats: [
        ["Queued changes", "12"],
        ["Open defects", "4"],
      ],
      rows: [
        { label: "Inspection recorded", meta: "Queued", tone: "warn" },
        { label: "Sync conflict", meta: "Rule applied", tone: "ok" },
        { label: "Engine hours", meta: "12,480 h", tone: "info" },
        { label: "Defect report", meta: "Photo + sign", tone: "ok" },
      ],
      callout: { title: "Offline-ready", lines: ["Changes sync automatically", "when the vessel reconnects"] },
    },
  },
  {
    slug: "real-estate",
    number: "05",
    name: "Real Estate & Property Technology",
    short: "Real Estate",
    icon: Building,
    headline: "Turn property discovery and asset management into a connected digital experience.",
    valueProp:
      "Property platforms that move buyers, tenants, agents and asset managers from fragmented listings and manual coordination to structured discovery, digital engagement and transparent operations.",
    painPoints: [
      "Property information is scattered across portals, documents and spreadsheets.",
      "Buyers and tenants need trustworthy information before booking a visit.",
      "Visits, enquiries and follow-ups are hard to coordinate.",
      "Owners need a portfolio view of occupancy, maintenance and performance.",
      "Records and workflows vary across regions, asset classes and teams.",
      "Virtual tours generate interest but don't connect to booking workflows.",
    ],
    offerings: [
      "Residential and commercial property marketplaces",
      "Asset and portfolio management portals",
      "Interactive property tours and 3D experiences",
      "Lead capture, qualification and appointment scheduling",
      "CRM and property-management integrations",
      "Maintenance requests, tenant communication and document approvals",
      "AI-assisted property search and enquiry support",
    ],
    services: ["web-development", "immersive-experiences", "ai-solutions", "seo"],
    caseStudy: "property-discovery-asset-platform",
    visual: {
      accent: "#A78BFA",
      title: "Property portfolio",
      badge: "12 sites",
      chart: { kind: "grid", label: "Available units", tiles: ["2BR · 12B", "Studio · 4A", "3BR · 21C", "Office · L2", "Retail · G1", "1BR · 9F"] },
      stats: [
        ["Occupancy", "94%"],
        ["Viewings", "37"],
      ],
      rows: [
        { label: "Viewing booked", meta: "Unit 12B", tone: "ok" },
        { label: "Enquiry assigned", meta: "Agent", tone: "ok" },
        { label: "Maintenance request", meta: "Plumbing", tone: "warn" },
        { label: "Lease renewal", meta: "30 days", tone: "info" },
      ],
      callout: { title: "Viewing confirmed", lines: ["Reminder sent and synced", "to the agent's calendar"] },
    },
  },
  {
    slug: "robotics-industrial-iot",
    number: "06",
    name: "Automated Robotics & Industrial IoT",
    short: "Industrial IoT",
    icon: Factory,
    headline: "Connect machines, quality data and intelligent workflows — without compromising operational control.",
    valueProp:
      "Industrial software and IoT systems that help manufacturers observe equipment, catch anomalies, digitize inspection and connect operational data to quality and maintenance decisions.",
    painPoints: [
      "Manual inspection is inconsistent and hard to scale.",
      "Equipment data is spread across PLCs, sensors, vendor tools and maintenance systems.",
      "Downtime and defects surface only after production is affected.",
      "Robotics and machine vision need deterministic safety controls.",
      "Specialized environments need continuous monitoring and traceable alarms.",
      "AI models must be validated for the real environment and error tolerances.",
    ],
    offerings: [
      "Industrial IoT gateways and telemetry pipelines",
      "Machine vision and image-based inspection",
      "Robotic and gantry workflow integration",
      "Equipment health and anomaly dashboards",
      "Environmental monitoring and alarm escalation",
      "MES, QMS, ERP and maintenance-system integrations",
      "Edge AI, secure device management and AI-assisted SOP retrieval",
    ],
    services: ["ai-solutions", "digital-transformation", "immersive-experiences", "web-development"],
    caseStudy: "machine-vision-industrial-telemetry",
    visual: {
      accent: "#F5A524",
      title: "Line 3 · Inspection",
      badge: "Running",
      chart: { kind: "vision", label: "Camera 02 · Station B" },
      stats: [
        ["Inspected", "18,240"],
        ["Flagged", "0.6%"],
      ],
      rows: [
        { label: "Surface scratch", meta: "Conf 0.94", tone: "warn" },
        { label: "Reject via PLC", meta: "Approved", tone: "ok" },
        { label: "Spindle vibration", meta: "Normal", tone: "ok" },
        { label: "Humidity", meta: "41% RH", tone: "info" },
      ],
      callout: { title: "Operator review", lines: ["Low-confidence result routed", "to the exception queue"] },
    },
  },
  {
    slug: "financial-services",
    number: "07",
    name: "Financial Services & Accounting Outsourcing",
    short: "Finance",
    icon: Calculator,
    headline: "Reduce document-heavy finance work while keeping every important decision traceable.",
    valueProp:
      "Secure financial workflow platforms connecting document intake, extraction, reconciliation, review, approvals and reporting — less repetitive handling, with professionals in control.",
    painPoints: [
      "Invoices, statements and receipts arrive in every format.",
      "Manual entry and reconciliation consume skilled staff time.",
      "Exceptions and missing documents delay month-end close.",
      "Sensitive information moves through fragmented channels.",
      "Approval trails are incomplete across email and spreadsheets.",
      "Automation must respect access, retention and jurisdictional rules.",
    ],
    offerings: [
      "Secure client portals and document intake",
      "OCR and intelligent document processing",
      "Invoice, expense and statement extraction",
      "Reconciliation and exception-management workflows",
      "Accounting, ERP, CRM and practice-management integrations",
      "Approval routing and client reminders",
      "Audit logs, role-based permissions and operational dashboards",
    ],
    services: ["ai-solutions", "ai-agents", "digital-transformation", "web-development"],
    caseStudy: "financial-document-operations",
    visual: {
      accent: "#34D399",
      title: "Document intake · Client 0142",
      badge: "Secure",
      chart: {
        kind: "doc",
        label: "Invoice INV-2291",
        fields: [
          ["Supplier", "Harbor Supplies"],
          ["Invoice date", "14 Oct"],
          ["Tax", "1,240.00"],
          ["Total", "8,320.00"],
        ],
      },
      stats: [
        ["Processed today", "1,284"],
        ["Straight-through", "72%"],
      ],
      rows: [
        { label: "INV-2291", meta: "Extracted", tone: "ok" },
        { label: "Total mismatch", meta: "Review", tone: "warn" },
        { label: "Bank statement", meta: "Reconciled", tone: "ok" },
        { label: "Missing receipt", meta: "Reminded", tone: "info" },
      ],
      callout: { title: "Needs review", lines: ["Low-confidence field routed", "to an authorized reviewer"] },
    },
  },
  {
    slug: "talent-compliance",
    number: "08",
    name: "B2B Candidate Assessment & Compliance",
    short: "Talent & Compliance",
    icon: UserCheck,
    headline: "Turn skills, evidence and compliance requirements into structured decisions.",
    valueProp:
      "Assessment and compliance platforms that connect people to opportunities, identify capability gaps, coordinate evidence and manage readiness workflows consistently.",
    painPoints: [
      "CVs, skills, vacancies and training records are hard to compare.",
      "Recruiters screen candidates who don't meet role requirements.",
      "Skills taxonomies differ across organizations and regions.",
      "Compliance readiness needs evidence, ownership, review and remediation.",
      "Security questionnaires and audit requests create repetitive work.",
      "AI-supported decisions need transparency and human review.",
    ],
    offerings: [
      "Candidate and employer portals",
      "Skills taxonomies, matching engines and role assessments",
      "Learning recommendations and capability-gap analysis",
      "Recruitment workflow automation and scheduling",
      "Compliance evidence repositories and control mapping",
      "SOC 2 and ISO 27001 readiness workflows",
      "Audit logs, permissions and AI-assisted evidence search",
    ],
    services: ["ai-solutions", "web-development", "product-design", "ai-agents"],
    caseStudy: "skills-to-opportunity-platform",
    visual: {
      accent: "#A78BFA",
      title: "Matching · Backend Engineer",
      badge: "Review",
      chart: {
        kind: "ring",
        label: "Match breakdown",
        segments: [
          { label: "Skills", value: 46 },
          { label: "Experience", value: 28 },
          { label: "Eligibility", value: 16 },
          { label: "Gaps", value: 10 },
        ],
      },
      stats: [
        ["Shortlisted", "18"],
        ["Evidence ready", "86%"],
      ],
      rows: [
        { label: "Skill: Python", meta: "Strong", tone: "ok" },
        { label: "Gap: Kubernetes", meta: "Course", tone: "info" },
        { label: "Interview", meta: "Thu 10:00", tone: "ok" },
        { label: "ISO 27001 evidence", meta: "Pending", tone: "warn" },
      ],
      callout: { title: "Match explained", lines: ["Top factors shown for", "human review"] },
    },
  },
  {
    slug: "education",
    number: "09",
    name: "Education & Mentorship Ecosystems",
    short: "Education",
    icon: GraduationCap,
    headline: "Make learning more personal, mentorship more accessible and progress measurable.",
    valueProp:
      "Digital education ecosystems that connect learners, mentors, institutions and employers through structured programs, personalized pathways and transparent progress tracking.",
    painPoints: [
      "Learners struggle to find the right mentor or pathway.",
      "Mentor availability, booking and follow-ups are handled manually.",
      "Institutions lack visibility into participation and outcomes.",
      "Course catalogs get harder to navigate as they grow.",
      "Learners finish courses without demonstrating job-relevant capability.",
      "Personalized support is expensive to deliver entirely by people.",
    ],
    offerings: [
      "Learning management systems and course marketplaces",
      "Mentor and mentee profiles with matching workflows",
      "Appointment booking and calendar integration",
      "Progress tracking, assessments and completion records",
      "Learning recommendations and skill-gap analysis",
      "AI-assisted learner support and notifications",
      "Institution, mentor and learner dashboards",
    ],
    services: ["web-development", "mobile-apps", "product-design", "ai-solutions"],
    caseStudy: "mentor-mentee-platform",
    visual: {
      accent: "#FB7185",
      title: "Mentorship programme",
      badge: "Week 6",
      chart: {
        kind: "timeline",
        label: "This week's sessions",
        lanes: [
          { label: "Mon", blocks: [[1, 2], [5, 2]] },
          { label: "Tue", blocks: [[2, 3]] },
          { label: "Wed", blocks: [[0, 2], [4, 1], [7, 2]] },
          { label: "Thu", blocks: [[3, 2], [6, 2]] },
          { label: "Fri", blocks: [[1, 1], [4, 3]] },
        ],
      },
      stats: [
        ["Active mentors", "64"],
        ["Sessions", "212"],
      ],
      rows: [
        { label: "New match", meta: "Accepted", tone: "ok" },
        { label: "Session notes", meta: "Private", tone: "info" },
        { label: "Goal completed", meta: "Portfolio", tone: "ok" },
        { label: "Reschedule", meta: "Requested", tone: "warn" },
      ],
      callout: { title: "Session booked", lines: ["Invite and reminder sent", "to mentor and mentee"] },
    },
  },
  {
    slug: "hospitality",
    number: "10",
    name: "Hospitality & Restaurant Operations",
    short: "Hospitality",
    icon: UtensilsCrossed,
    headline: "Give every location a consistent digital operating experience.",
    valueProp:
      "Restaurant and hospitality platforms that connect guest discovery, ordering, bookings, location management and back-office workflows — for single sites and growing chains.",
    painPoints: [
      "Menus, pricing, hours and offers vary by location.",
      "Enquiries and booking requests are missed during busy service.",
      "Orders, reservations, loyalty and reporting live in separate systems.",
      "Managers can't easily compare performance across locations.",
      "Manual updates create inconsistencies across websites and channels.",
      "Staff answer the same menu, booking and opening-hours questions repeatedly.",
    ],
    offerings: [
      "Restaurant websites and digital ordering portals",
      "Multi-location content and menu management",
      "Reservation and enquiry workflows",
      "Central admin with location-specific permissions",
      "CRM, POS, payment and delivery integrations",
      "AI-assisted enquiries and booking reminders",
      "Offers, loyalty, feedback and group-level analytics",
    ],
    services: ["web-development", "ai-agents", "digital-transformation", "seo"],
    caseStudy: "multi-location-restaurant-portal",
    visual: {
      accent: "#F5A524",
      title: "Group overview · 6 locations",
      badge: "Today",
      chart: { kind: "bars", label: "Bookings by location", values: [58, 72, 44, 81, 63, 39] },
      stats: [
        ["Bookings", "342"],
        ["Avg response", "4 min"],
      ],
      rows: [
        { label: "Menu update", meta: "All sites", tone: "ok" },
        { label: "Table for 4", meta: "Confirmed", tone: "ok" },
        { label: "Missed enquiries", meta: "0 today", tone: "ok" },
        { label: "Weekday offer", meta: "Draft", tone: "info" },
      ],
      callout: { title: "Booking confirmed", lines: ["Only after the reservation", "system returns a valid slot"] },
    },
  },
  {
    slug: "healthcare",
    number: "11",
    name: "Healthcare & Wellness Platforms",
    short: "Healthcare",
    icon: HeartPulse,
    headline: "Make healthcare experiences more connected, accessible and operationally efficient.",
    valueProp:
      "Healthcare and wellness products that connect patient-facing experiences with scheduling, administration, communication and approved data workflows — with privacy, safety and clinical oversight first.",
    painPoints: [
      "Scheduling, reminders and follow-ups create administrative workload.",
      "Patient information sits in incompatible systems.",
      "Providers need secure access and clear audit trails.",
      "Patients need accessible experiences across devices.",
      "Repetitive enquiries burden front-desk and support teams.",
      "AI features need validation, privacy controls and clinical boundaries.",
    ],
    offerings: [
      "Patient and provider portals",
      "Appointment scheduling and reminders",
      "Clinic and wellness management applications",
      "Intake questionnaires and document workflows",
      "Approved electronic health record integrations",
      "Administrative AI assistants for non-clinical questions",
      "Consent management, role-based access and audit trails",
    ],
    services: ["web-development", "mobile-apps", "ai-solutions", "product-design"],
    caseStudy: "patient-intake-appointments",
    visual: {
      accent: "#34D399",
      title: "Front desk · Intake",
      badge: "Secure",
      chart: {
        kind: "timeline",
        label: "Appointments today",
        lanes: [
          { label: "Room 1", blocks: [[0, 2], [3, 2], [6, 2]] },
          { label: "Room 2", blocks: [[1, 3], [5, 2]] },
          { label: "Room 3", blocks: [[0, 1], [2, 2], [7, 2]] },
          { label: "Tele", blocks: [[4, 2]] },
        ],
      },
      stats: [
        ["Intake complete", "87%"],
        ["Appointments", "46"],
      ],
      rows: [
        { label: "Intake form", meta: "Missing ID", tone: "warn" },
        { label: "Appointment", meta: "Confirmed", tone: "ok" },
        { label: "Reminder", meta: "SMS sent", tone: "ok" },
        { label: "Request routed", meta: "Billing", tone: "info" },
      ],
      callout: { title: "Intake checked", lines: ["Missing fields flagged before", "the appointment, not after"] },
    },
  },
  {
    slug: "saas-enterprise",
    number: "12",
    name: "SaaS & Enterprise Software",
    short: "SaaS & Enterprise",
    icon: Boxes,
    headline: "Extend your software with intelligent workflows, stronger integrations and a scalable architecture.",
    valueProp:
      "We help SaaS businesses and enterprises build new products, modernize legacy systems, embed AI and connect fragmented workflows — without defaulting to a disruptive platform replacement.",
    painPoints: [
      "Legacy systems constrain product development and integration.",
      "Manual workflows create delays between departments and apps.",
      "SaaS needs tenant isolation, predictable costs and reliable usage tracking.",
      "AI features can bring unpredictable model costs and complexity.",
      "Teams must ship improvements without destabilizing customers.",
      "Enterprises need auditability and clear ownership of automated actions.",
    ],
    offerings: [
      "Custom SaaS development and product modernization",
      "Multi-tenant architecture and tenant-specific permissions",
      "AI feature embedding and agentic workflow orchestration",
      "APIs, integration hubs and event-driven services",
      "Usage metering, billing and credit-ledger workflows",
      "Enterprise portals and headless content platforms",
      "DevOps, observability, test automation and cloud-native refactoring",
    ],
    services: ["ai-agents", "ai-solutions", "web-development", "app-web-strategy"],
    caseStudy: "enterprise-ai-usage-metering",
    visual: {
      accent: "#38BDF8",
      title: "Tenant · acme-prod",
      badge: "Metered",
      chart: { kind: "nodes", label: "Workflow · Invoice approval", steps: ["Trigger", "Retrieve", "Draft", "Approve", "Execute"] },
      stats: [
        ["AI tasks today", "9,812"],
        ["Cost / task", "$0.004"],
      ],
      rows: [
        { label: "Credits reserved", meta: "1,200", tone: "info" },
        { label: "Human approval", meta: "Granted", tone: "ok" },
        { label: "Rate limit", meta: "80%", tone: "warn" },
        { label: "Usage reconciled", meta: "Billing", tone: "ok" },
      ],
      callout: { title: "Usage reconciled", lines: ["Metering matched against", "actual executions"] },
    },
  },
];

/** Cross-industry delivery framework. */
export const deliveryFramework = [
  { step: "01", title: "Discover & baseline", body: "Understand users, processes, existing systems, constraints and measurable KPIs. Establish the current baseline and prioritize the highest-value problem." },
  { step: "02", title: "Architect & validate", body: "Define the experience, system boundaries, integrations, security controls, data model, AI evaluation criteria and acceptance tests. Validate feasibility before committing to outcomes." },
  { step: "03", title: "Build & integrate", body: "Deliver in controlled increments, integrating with existing systems where practical, with observability, automated tests, role-based access and documented exception handling." },
  { step: "04", title: "Pilot & measure", body: "Test against agreed acceptance criteria using representative workflows and real constraints. Compare results with the baseline and document limitations." },
  { step: "05", title: "Scale & optimize", body: "Expand based on evidence, operational readiness and business value. Monitor reliability, adoption, cost, security and outcomes after launch." },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
