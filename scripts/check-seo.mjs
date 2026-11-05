// Crawls a running build (default http://localhost:3000) via its sitemap and fails on SEO regressions (spec §3.1, §3.6):
// missing / cross-route canonical or og:url, duplicate titles or descriptions, not exactly one h1, skipped heading levels,
// noindex pages in the sitemap. Usage: npm run build && npm start, then BASE=http://localhost:3000 npm run check:seo
const BASE = process.env.BASE ?? "http://localhost:3000";
const errors = [];
const seen = { title: new Map(), description: new Map() };

const attr = (html, re) => html.match(re)?.[1]?.replace(/&amp;/g, "&");
const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) throw new Error("sitemap.xml has no URLs");
const origin = new URL(urls[0]).origin;

for (const url of urls) {
  const path = new URL(url).pathname;
  const res = await fetch(`${BASE}${path}`);
  if (res.status !== 200) {
    errors.push(`${path}: status ${res.status}`);
    continue;
  }
  const html = await res.text();
  const head = html.slice(0, html.indexOf("</head>"));
  const canonical = attr(head, /<link rel="canonical" href="([^"]+)"/);
  const ogUrl = attr(head, /<meta property="og:url" content="([^"]+)"/);
  const title = attr(head, /<title>([^<]+)<\/title>/);
  const description = attr(head, /<meta name="description" content="([^"]+)"/);
  const robots = attr(head, /<meta name="robots" content="([^"]+)"/) ?? "";
  const expected = `${origin}${path === "/" ? "" : path}`;

  if (canonical !== expected && canonical !== `${expected}/`) errors.push(`${path}: canonical is ${canonical ?? "missing"}, expected ${expected}`);
  if (ogUrl !== expected && ogUrl !== `${expected}/`) errors.push(`${path}: og:url is ${ogUrl ?? "missing"}, expected ${expected}`);
  if (!head.includes('property="og:image"')) errors.push(`${path}: og:image missing`);
  if (robots.includes("noindex")) errors.push(`${path}: noindex page is listed in the sitemap`);
  for (const [key, value] of [["title", title], ["description", description]]) {
    if (!value) errors.push(`${path}: ${key} missing`);
    else if (seen[key].has(value)) errors.push(`${path}: duplicate ${key} (also on ${seen[key].get(value)})`);
    else seen[key].set(value, path);
  }

  const body = html.slice(html.indexOf("<body"));
  const h1s = [...body.matchAll(/<h1[\s>]/g)].length;
  if (h1s !== 1) errors.push(`${path}: ${h1s} h1 elements`);
  let prev = 1;
  for (const m of body.matchAll(/<h([1-6])[\s>][\s\S]*?<\/h\1>/g)) {
    const level = Number(m[1]);
    if (level > prev + 1) errors.push(`${path}: heading jumps h${prev} → h${level} ("${strip(m[0]).slice(0, 50)}")`);
    prev = level;
  }
  if (!/<main[^>]*id="main"/.test(body)) errors.push(`${path}: <main id="main"> missing`);
}

if (errors.length) {
  console.error(`check:seo — ${errors.length} problem(s) across ${urls.length} URLs:\n${errors.join("\n")}`);
  process.exit(1);
}
console.log(`check:seo — ${urls.length} URLs: unique titles/descriptions, self-canonical, og:url and og:image, one h1, ordered headings`);
