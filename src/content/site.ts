/**
 * Global company details. Everything marked TODO is a placeholder —
 * replace it with your real information before launch.
 */
export const site = {
  name: "Zeta Consulting",
  shortName: "Zeta",
  legalName: "Zeta Consulting", // TODO: registered legal entity name (e.g. "Zeta Consulting Pvt. Ltd.")
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zetaconsulting.com", // TODO: your domain
  tagline: "Technology that moves your business forward.",
  description:
    "Zeta Consulting designs, builds, integrates and modernizes the digital systems businesses depend on — custom web and mobile platforms, AI agents, industrial IoT, enterprise integrations and AI search visibility.",
  positioning: "Build smarter systems. Connect what you already use. Turn operational complexity into measurable business value.",

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
  { label: "Industries", href: "/industries" },
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
