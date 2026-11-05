/**
 * Global company details — the single source of truth for name, URL and contact channels.
 * Contact is deliberately simple: the project form on /contact, plus direct email and phone.
 */
export const site = {
  name: "Zeta Consulting",
  shortName: "Zeta",
  legalName: "Zeta Consulting",
  /** Canonical origin. Set NEXT_PUBLIC_SITE_URL in every environment so canonicals never point at staging. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://zetaconsulting.in").replace(/\/$/, ""),
  locale: "en_US",
  tagline: "Technology that moves your business forward.",
  description:
    "Zeta Consulting is a remote-first engineering consultancy that designs, builds and integrates AI agents, web and mobile platforms and digital transformation programs — senior-led, integration-first and measured against your baseline.",
  positioning: "Build smarter systems. Connect what you already use. Turn operational complexity into measurable business value.",

  email: "rahul@zetaconsulting.in",
  /** E.164 for tel: links and structured data; `phoneDisplay` for people. */
  phone: "+919158775732",
  phoneDisplay: "+91 91587 75732",
  responseTime: "We reply within one business day.",
  workingModel: "Remote-first. We work with teams worldwide.",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

/** Where every "start a project" CTA points. */
export const contactHref = "/contact";

export const mailtoHref = `mailto:${site.email}`;
export const telHref = `tel:${site.phone}`;
