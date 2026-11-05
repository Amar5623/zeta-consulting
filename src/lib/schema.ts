import { site } from "@/content/site";
import { services } from "@/content/services";

/** One connected schema.org graph with stable @id values (spec §3.4). */
const abs = (p = "/") => new URL(p, site.url).toString();

export const ids = { org: `${site.url}/#organization`, site: `${site.url}/#website` };

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Organization rather than ProfessionalService: no public street address is published,
        // and LocalBusiness types expect one.
        "@type": "Organization",
        "@id": ids.org,
        name: site.name,
        legalName: site.legalName,
        url: abs("/"),
        logo: { "@type": "ImageObject", url: abs("/logo-512.png"), width: 512, height: 512 },
        image: abs("/opengraph-image"),
        description: site.description,
        slogan: site.tagline,
        email: site.email,
        telephone: site.phone,
        areaServed: "Worldwide",
        knowsAbout: ["AI agents", "Software engineering", "Systems integration", "Digital transformation", ...services.map((s) => s.title)],
        contactPoint: [
          { "@type": "ContactPoint", contactType: "sales", email: site.email, telephone: site.phone, availableLanguage: ["en"], areaServed: "Worldwide" },
        ],
      },
      { "@type": "WebSite", "@id": ids.site, url: abs("/"), name: site.name, inLanguage: "en", publisher: { "@id": ids.org } },
    ],
  };
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

/** A standalone BreadcrumbList for nested routes that have no richer graph. */
export function breadcrumbGraph(items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", ...breadcrumb([{ name: "Home", path: "/" }, ...items]) };
}

export function serviceGraph(s: { slug: string; name: string; serviceType: string; description: string; offers?: string[] }) {
  const url = abs(`/services/${s.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: s.name,
        serviceType: s.serviceType,
        description: s.description,
        url,
        provider: { "@id": ids.org },
        areaServed: "Worldwide",
        audience: { "@type": "BusinessAudience", audienceType: "Startups, mid-market and enterprise teams" },
        ...(s.offers?.length
          ? {
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `${s.name} capabilities`,
                itemListElement: s.offers.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
              },
            }
          : {}),
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: s.name, path: `/services/${s.slug}` },
      ]),
    ],
  };
}

export function industryGraph(i: { slug: string; name: string; description: string }) {
  const url = abs(`/industries/${i.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${i.name} solutions`,
        serviceType: "Software engineering and systems integration",
        description: i.description,
        url,
        provider: { "@id": ids.org },
        areaServed: "Worldwide",
        audience: { "@type": "BusinessAudience", audienceType: i.name },
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Industries", path: "/industries" },
        { name: i.name, path: `/industries/${i.slug}` },
      ]),
    ],
  };
}

export function caseStudyGraph(c: { slug: string; title: string; description: string; about?: string; genre: string }) {
  const url = abs(`/work/${c.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#casestudy`,
        name: c.title,
        abstract: c.description,
        url,
        creator: { "@id": ids.org },
        publisher: { "@id": ids.org },
        genre: c.genre,
        ...(c.about ? { about: c.about } : {}),
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Work", path: "/work" },
        { name: c.title, path: `/work/${c.slug}` },
      ]),
    ],
  };
}

export function articleGraph(a: { slug: string; title: string; description: string; datePublished: string; dateModified: string; author: string; authorDescription: string }) {
  const url = abs(`/insights/${a.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: a.title,
        description: a.description,
        datePublished: a.datePublished,
        dateModified: a.dateModified,
        mainEntityOfPage: url,
        inLanguage: "en",
        author: { "@type": "Organization", name: a.author, description: a.authorDescription, url: abs("/about") },
        publisher: { "@id": ids.org },
        image: abs(`/insights/${a.slug}/opengraph-image`),
      },
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Insights", path: "/insights" },
        { name: a.title, path: `/insights/${a.slug}` },
      ]),
    ],
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}
