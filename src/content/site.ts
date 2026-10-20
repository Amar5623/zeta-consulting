/**
 * Global company details. Everything marked TODO is a placeholder —
 * replace it with your real information before launch.
 */
export const site = {
  name: "Zeta Consulting",
  shortName: "Zeta",
  legalName: "Zeta Consulting", // TODO: registered legal entity name (e.g. "Zeta Consulting Pvt. Ltd.")
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zetaconsulting.com", // TODO: your domain
  tagline: "AI, software & growth — one senior team.",
  description:
    "Zeta Consulting is a full-service technology partner. We build AI agents, web platforms and mobile apps, modernize operations, and grow your visibility on Google and in AI answers.",

  // Contact
  email: "hello@zetaconsulting.com", // TODO
  phone: "+00 00000 00000", // TODO: E.164 format recommended, e.g. "+91 98765 43210"
  whatsapp: "", // TODO: digits only incl. country code, e.g. "919876543210" — leave empty to hide
  bookingUrl: "", // TODO: Cal.com / Calendly link — leave empty to route "Book a call" to /contact

  address: {
    street: "Office address line 1", // TODO
    locality: "City", // TODO
    region: "State / Region", // TODO
    postalCode: "000000", // TODO
    country: "Country", // TODO
    mapUrl: "", // TODO: Google Maps share link
  },
  hours: "Mon – Fri, 9:00 – 18:00",
  responseTime: "We reply within one business day.",

  socials: [
    { label: "LinkedIn", href: "#" }, // TODO
    { label: "X / Twitter", href: "#" }, // TODO
    { label: "Instagram", href: "#" }, // TODO
    { label: "Clutch", href: "#" }, // TODO
  ],

  /** Optional hero showreel. Put a file in /public/media and set e.g. "/media/showreel.mp4". */
  showreel: "",
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
] as const;

export function bookingHref() {
  return site.bookingUrl || "/contact";
}

export function whatsappHref() {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}` : "";
}
