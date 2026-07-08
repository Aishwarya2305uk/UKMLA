// Build-time SEO file generator for sitemap.xml + robots.txt.
//
// Routes are discovered automatically from src/router.jsx and every news post
// from src/pages/News.jsx, so the sitemap can never drift from the app: add a
// route or a post and it appears here on the next build. Runs via the Vite
// plugin in vite.config.js (on every build) and via `npm run generate:sitemap`
// for a manual refresh.
//
// Posts are crawlable at /news/<slug> (the News page resolves that path and the
// Vercel rewrite serves index.html), so each post is listed individually with
// its own publish date as <lastmod>.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// Canonical production origin. Override with SITE_URL=... if the domain changes.
const BASE_URL = (process.env.SITE_URL || 'https://www.gmcukmla.com').replace(/\/$/, '');

const ROUTER_FILE = resolve(projectRoot, 'src/router.jsx');
const NEWS_FILE = resolve(projectRoot, 'src/pages/News.jsx');
const SITEMAP_FILE = resolve(projectRoot, 'public/sitemap.xml');
const ROBOTS_FILE = resolve(projectRoot, 'public/robots.txt');

// Crawl hints applied to every individual news post.
const POST_HINTS = { changefreq: 'monthly', priority: '0.7' };

const MONTHS = {
  january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
  july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
};

// Turn a post's human date ("03 July 2026") into an ISO date ("2026-07-03").
// Returns null when the format is unrecognised so the caller can fall back.
function toIsoDate(human) {
  const m = String(human).trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTHS[m[2].toLowerCase()];
  if (!month) return null;
  return `${m[3]}-${month}-${m[1].padStart(2, '0')}`;
}

// Paths that must never be advertised to crawlers even if they become routes
// (admin panels, previews, test/dev routes, etc.). Extend as the app grows.
const EXCLUDED_PATHS = new Set([
  '/404',
]);

// Per-page crawl hints. Anything not listed falls back to DEFAULT_HINTS.
const DEFAULT_HINTS = { changefreq: 'monthly', priority: '0.7' };
const PAGE_HINTS = {
  '/': { changefreq: 'weekly', priority: '1.0' },
  '/news': { changefreq: 'daily', priority: '0.9' },
  '/what-is-ukmla': { changefreq: 'monthly', priority: '0.8' },
  '/eligibility': { changefreq: 'monthly', priority: '0.8' },
  '/exam-pattern': { changefreq: 'monthly', priority: '0.8' },
  '/syllabus': { changefreq: 'monthly', priority: '0.8' },
  '/preparation': { changefreq: 'monthly', priority: '0.8' },
  '/ukmla-vs-plab': { changefreq: 'monthly', priority: '0.8' },
  '/fees': { changefreq: 'monthly', priority: '0.8' },
  '/faqs': { changefreq: 'monthly', priority: '0.8' },
  '/exam-pattern/akt': { changefreq: 'monthly', priority: '0.7' },
  '/exam-pattern/cpsa': { changefreq: 'monthly', priority: '0.7' },
  '/registration-guide': { changefreq: 'monthly', priority: '0.7' },
  '/results-and-scoring': { changefreq: 'monthly', priority: '0.7' },
  '/key-dates': { changefreq: 'monthly', priority: '0.7' },
  '/appeals-and-resits': { changefreq: 'monthly', priority: '0.6' },
  '/official-resources': { changefreq: 'monthly', priority: '0.6' },
  '/glossary': { changefreq: 'monthly', priority: '0.6' },
  '/about': { changefreq: 'yearly', priority: '0.5' },
  '/contact': { changefreq: 'yearly', priority: '0.5' },
  '/privacy': { changefreq: 'yearly', priority: '0.3' },
};

// Extract public route paths from the router. Each real route is written as
// `path: '/x', <newline> component: X` — matching a `path:` that is immediately
// followed by a `component:` key uniquely selects top-level routes while
// ignoring breadcrumb entries (which pair `path` with `name`, never component).
function discoverRoutes() {
  const source = readFileSync(ROUTER_FILE, 'utf8');
  const routeRegex = /path:\s*['"]([^'"]+)['"]\s*,\s*component:/g;

  const seen = new Set();
  const paths = [];
  let match;
  while ((match = routeRegex.exec(source)) !== null) {
    const path = match[1];
    if (seen.has(path) || EXCLUDED_PATHS.has(path)) continue;
    seen.add(path);
    paths.push(path);
  }

  if (paths.length === 0) {
    throw new Error(
      `No routes discovered in ${ROUTER_FILE}. The router format may have changed — update the regex in scripts/generate-sitemap.mjs.`
    );
  }
  return paths;
}

// Discover every news post (slug + publish date) from News.jsx. Each post
// object lists "slug" before "date", so pairing the nearest date after each
// slug reliably keeps them matched within the same object.
function discoverPosts(fallbackDate) {
  const source = readFileSync(NEWS_FILE, 'utf8');
  const postRegex = /"slug":\s*"([^"]+)"[\s\S]*?"date":\s*"([^"]+)"/g;

  const seen = new Set();
  const posts = [];
  let match;
  while ((match = postRegex.exec(source)) !== null) {
    const slug = match[1];
    if (seen.has(slug)) continue;
    seen.add(slug);
    posts.push({ slug, lastmod: toIsoDate(match[2]) || fallbackDate });
  }
  return posts;
}

function toLoc(path) {
  // Root stays as "/"; all others are absolute paths with no trailing slash.
  return path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;
}

function urlEntry(loc, lastmod, changefreq, priority) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

function buildSitemap(paths, posts, lastmod) {
  const pageUrls = paths.map((path) => {
    const { changefreq, priority } = PAGE_HINTS[path] || DEFAULT_HINTS;
    return urlEntry(toLoc(path), lastmod, changefreq, priority);
  });

  const postUrls = posts.map((post) =>
    urlEntry(`${BASE_URL}/news/${post.slug}`, post.lastmod, POST_HINTS.changefreq, POST_HINTS.priority)
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...pageUrls, ...postUrls].join('\n')}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

export function generateSeoFiles() {
  const lastmod = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const paths = discoverRoutes();
  const posts = discoverPosts(lastmod);

  writeFileSync(SITEMAP_FILE, buildSitemap(paths, posts, lastmod), 'utf8');
  writeFileSync(ROBOTS_FILE, buildRobots(), 'utf8');

  return { pageCount: paths.length, postCount: posts.length, total: paths.length + posts.length, lastmod, paths, posts };
}

// Allow running directly: `node scripts/generate-sitemap.mjs`
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1] === fileURLToPath(import.meta.url)) {
  const { pageCount, postCount, total, lastmod } = generateSeoFiles();
  console.log(
    `[seo] Wrote sitemap.xml (${total} URLs: ${pageCount} pages + ${postCount} posts) and robots.txt for ${BASE_URL} (lastmod ${lastmod}).`
  );
}
