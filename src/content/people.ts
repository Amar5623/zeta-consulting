/**
 * Testimonials, team and clients — ALL PLACEHOLDERS.
 * Add `photo` (e.g. "/team/jane.jpg") and `logo` (e.g. "/clients/acme.svg") paths when you have them.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: string;
  metric: { value: string; label: string };
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Placeholder testimonial. Replace with a short, specific quote from a client about working with Zeta and the result you delivered together.",
    name: "Client Name",
    role: "Founder & CEO",
    company: "Company",
    metric: { value: "00%", label: "Result metric" },
  },
  {
    quote:
      "Placeholder testimonial. The best quotes mention a concrete outcome — time saved, revenue gained, a launch date hit — and how the team made it happen.",
    name: "Client Name",
    role: "Head of Product",
    company: "Company",
    metric: { value: "0.0×", label: "Result metric" },
  },
  {
    quote:
      "Placeholder testimonial. Ask clients for one or two sentences and permission to use their name, role, company and photo.",
    name: "Client Name",
    role: "CTO",
    company: "Company",
    metric: { value: "00k", label: "Result metric" },
  },
];

export type TeamMember = { name: string; role: string; photo?: string; linkedin?: string };

export const team: TeamMember[] = [
  { name: "Founder Name", role: "Founder & CEO" },
  { name: "Team Member", role: "Head of Engineering" },
  { name: "Team Member", role: "Design Lead" },
  { name: "Team Member", role: "AI & Data Lead" },
  { name: "Team Member", role: "Growth & SEO Lead" },
  { name: "Team Member", role: "Delivery Manager" },
];

export type Client = { name: string; logo?: string };

export const clients: Client[] = Array.from({ length: 8 }, (_, i) => ({
  name: `Client ${String(i + 1).padStart(2, "0")}`,
}));
