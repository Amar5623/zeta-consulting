# Zeta Consulting — website

Marketing site for Zeta Consulting: AI agents & solutions, web and mobile, digital transformation, SEO and GEO/AEO and other IT services.

**Stack:** Next.js 16 (App Router, Cache Components, static prerendering) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lenis smooth scroll · lucide icons.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — every page is prerendered as static HTML
npm run lint
npm run check    # lint + types
npm run check:seo  # against a running build: npm run build && npm start, then in another terminal
```

## Editing content

All copy and data live in **`src/content/`**. Components read from these files, so you rarely need to touch JSX.

| File | What it holds |
| --- | --- |
| `site.ts` | Company name, canonical domain, email and phone. Every CTA goes to the `/contact` form or this email/phone |
| `services.ts` | The 10 services: copy, capabilities, deliverables, stack, FAQs, plus optional long-form `sections` (phases, offerings, principles, KPI tables, engagement models) |
| `industries.ts` | The 12 industries: headline, pain points, offerings, related services, featured case study, and the spec for each designed interface visual. Also the cross-industry delivery framework |
| `work.ts` | The 12 case studies. Each has a `status` (`blueprint`, `discovery`, `reference`) that is shown on the site. Add `cover` / `gallery` paths once real screenshots are approved |
| `insights.ts` | Answer-first articles: short answer, question-phrased sections, tables, diagrams, sources, dates |
| `dates.ts` | When each content area last changed — drives `<lastmod>` in the sitemap. Bump it when you edit |
| `company.ts` | Process steps, values, commitments, engagement models, tech stack marquee, general FAQs |

### Images

Put images in `public/` (e.g. `public/work/acme/cover.jpg`) and reference them as `/work/acme/cover.jpg`.
Case studies accept `cover` (2400×1400) and `gallery` (1600×1200) images; until then they show designed visuals.
Article covers and diagrams are SVG artwork in `src/components/visuals/insight-art.tsx`.

### Design

Light, black-and-white editorial system: near-black ink on white and soft grey, one orange accent used sparingly,
Hanken Grotesk with Instrument Serif italic accents (free stand-ins for PP Neue Montreal / Ivyora Display; swap
instructions in `src/app/fonts.ts`). Colour comes from the industry visuals (one bright accent per industry), the
article covers, and the rotating words in the home hero. Tokens are in `src/app/globals.css`.

### Logo & brand

The official faceted "Z" mark is vectorised in `src/components/ui/zeta-mark.ts` and used by the header/footer lockup
(`src/components/ui/logo.tsx`), the favicon (`src/app/icon.svg`), the Apple touch icon and the social share image.
Standalone SVGs are in `public/brand/` and a 512px PNG (used in structured data) is `public/logo-512.png`. The
wordmark is set in Montserrat, matching the logo system.
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
    seo/               JsonLd, FaqSection (native <details> + FAQPage schema)
    ui/                buttons, chips, media, cards
    visuals/           hero collage, industry scenes, article covers and diagrams
  lib/                 seo.ts (pageMetadata), schema.ts (JSON-LD graph), og.tsx
```

## SEO / GEO built in

Implements spec §3:

- Every route builds metadata with `pageMetadata()` (`src/lib/seo.ts`): self-referencing canonical and `og:url`, unique
  title/description, Twitter card. The root layout never sets a canonical.
- Open Graph images: a site-wide card plus one per service, industry, case study and article.
- One connected JSON-LD graph (`src/lib/schema.ts`): Organization + WebSite in the layout; Service, Article,
  CreativeWork, FAQPage and BreadcrumbList on the routes that need them, all pointing at the same `@id`.
- `robots.txt` allows search, answer-engine and AI crawlers; previews are disallowed. `sitemap.xml` lists only
  canonical, indexable URLs with real content dates.
- `next.config.ts`: `X-Robots-Tag: noindex` on every host except the apex, and 301s from www/vercel.app behind
  `ENABLE_CANONICAL_REDIRECTS` (turn on at DNS cutover).
- `/llms.txt` generated from the content files.
- One static h1 per page, ordered headings, labelled landmarks. `npm run check:seo` crawls the sitemap and verifies
  all of the above.

## Contact form

The `/contact` form has no backend. On submit it drafts an email to `site.email` from the visitor's own mailbox,
pre-filled with the form data, and opens their default mail app. Buttons for Gmail and Outlook on the web, plus
"Copy message", cover visitors without a mail app. Nothing is stored or sent by the site itself, and replies go
straight to the lead's real address.
