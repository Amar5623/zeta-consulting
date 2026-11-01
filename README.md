# Zeta Consulting — website

Marketing site for Zeta Consulting: AI agents & solutions, web and mobile, digital transformation, SEO and GEO/AEO.

**Stack:** Next.js 16 (App Router, Cache Components, static prerendering) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lenis smooth scroll · lucide icons.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — every page is prerendered as static HTML
npm run lint
```

## Editing content

All copy and data live in **`src/content/`**. Components read from these files, so you rarely need to touch JSX.

| File | What it holds |
| --- | --- |
| `site.ts` | Company name, domain, email, phone, WhatsApp, booking link, address, socials, showreel |
| `services.ts` | The 10 services: copy, capabilities, deliverables, stack, FAQs, plus optional long-form `sections` (phases, offerings, principles, KPI tables, engagement models) |
| `industries.ts` | The 12 industries: headline, pain points, offerings, related services, featured case study, and the spec for each designed interface visual. Also the cross-industry delivery framework |
| `work.ts` | The 12 case studies. Each has a `status` (`blueprint`, `discovery`, `reference`) that is shown on the site. Add `cover` / `gallery` paths once real screenshots are approved |
| `people.ts` | Testimonials, team, client logos (**placeholders**) |
| `insights.ts` | Blog posts (**placeholders**) |
| `company.ts` | Process steps, values, commitments, engagement models, tech stack marquee, general FAQs |

Search the codebase for `TODO` and `Placeholder` to find everything that still needs real content.

Placeholder case studies and posts are rendered but marked `noindex` and left out of the sitemap until `placeholder` is `false`.

### Images

Put images in `public/` (e.g. `public/work/acme/cover.jpg`) and reference them as `/work/acme/cover.jpg`.
Every image slot renders a designed placeholder until a `src` is provided.

| Slot | Suggested size |
| --- | --- |
| Case study cover | 2400×1400 (hero), also used in cards |
| Case study gallery | 1600×1200 |
| Team portraits | 1200×1500 (4:5) |
| Article covers | 1600×900 |
| Client logos | SVG, monochrome |

### Fonts

`design.md` specifies **PP Neue Montreal** + **Ivyora Display** (commercial). The site ships with free stand-ins
(Hanken Grotesk + Instrument Serif). Swap instructions are in `src/app/fonts.ts`.

### Logo & brand

The official faceted "Z" mark is vectorised in `src/components/ui/zeta-mark.ts` and used by the header/footer lockup
(`src/components/ui/logo.tsx`), the favicon (`src/app/icon.svg`), the Apple touch icon and the social share image.
Standalone SVGs are in `public/brand/`. The wordmark is set in Montserrat, matching the logo system.
If the designer supplies an original vector file, replace the path in `zeta-mark.ts` with it.

### Case study and industry visuals

Until real screenshots exist, each industry and case study shows a designed, illustrative interface scene
(`src/components/visuals/industry-visual.tsx`, configured per industry in `industries.ts`). Set `cover` on a case study
to replace it with a real image.

## Structure

```
src/
  app/                 routes (home, services, work, about, contact, insights, legal), sitemap, robots, OG image, llms.txt
  content/             all editable copy & data
  components/
    layout/            header + mega menu, mobile menu, footer, page transition
    sections/          page sections (hero, services list, sticky work stack, horizontal process, FAQ, …)
    motion/            animation primitives (reveal, mask lines, scroll highlight, marquee, magnetic, counter, parallax)
    ui/                buttons, chips, media placeholder, cards, accordion
    visuals/           hero product collage
```

## SEO / GEO built in

- Static HTML for every page, per-page metadata and canonical URLs
- JSON-LD: `ProfessionalService` organization, `Service`, `FAQPage`, `BreadcrumbList`, `BlogPosting`, `CreativeWork`
- `sitemap.xml`, `robots.txt` (AI crawlers explicitly allowed), generated Open Graph image
- `/llms.txt` generated from the content files for AI assistants

## Contact form

Set `NEXT_PUBLIC_CONTACT_ENDPOINT` (see `.env.example`) to a Formspree/Basin/webhook URL. Without it, the form opens the
visitor's email client with the enquiry pre-filled.
