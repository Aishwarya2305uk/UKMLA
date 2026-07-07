// Build-time SEO file generator for sitemap.xml + robots.txt.
//
// Routes are discovered automatically from src/router.jsx so the sitemap can
// never drift from the app: add a route to the `routes` array and it appears
// here on the next build. Runs via the Vite plugin in vite.config.js (on every
// build) and via `npm run generate:sitemap` for a manual refresh.
//
// News posts are served client-side under /news#<slug> (URL fragments). Search
// engines do not index fragments as separate pages, so they are intentionally
// excluded — the sitemap lists only real, crawlable pathname routes.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// Canonical production origin. Override with SITE_URL=... if the domain changes.
const BASE_URL = (process.env.SITE_URL || 'https://gmcukmla.com').replace(/\/$/, '');

const ROUTER_FILE = resolve(projectRoot, 'src/router.jsx');
const SITEMAP_FILE = resolve(projectRoot, 'public/sitemap.xml');
const ROBOTS_FILE = resolve(projectRoot, 'public/robots.txt');

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

function toLoc(path) {
  // Root stays as "/"; all others are absolute paths with no trailing slash.
  return path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;
}

function buildSitemap(paths, lastmod) {
  const urls = paths
    .map((path) => {
      const { changefreq, priority } = PAGE_HINTS[path] || DEFAULT_HINTS;
      return [
        '  <url>',
        `    <loc>${toLoc(path)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
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
  const paths = discoverRoutes();
  const lastmod = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  writeFileSync(SITEMAP_FILE, buildSitemap(paths, lastmod), 'utf8');
  writeFileSync(ROBOTS_FILE, buildRobots(), 'utf8');

  return { count: paths.length, lastmod, paths };
}

// Allow running directly: `node scripts/generate-sitemap.mjs`
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1] === fileURLToPath(import.meta.url)) {
  const { count, lastmod } = generateSeoFiles();
  console.log(`[seo] Wrote sitemap.xml (${count} URLs) and robots.txt for ${BASE_URL} (lastmod ${lastmod}).`);
}
