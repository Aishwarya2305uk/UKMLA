#!/usr/bin/env node
'use strict';
/**
 * Extracts every internal link relationship on the site (blog posts in
 * src/pages/News.jsx + the static pillar pages) and writes a JSON dataset
 * that scripts/build-linkage-sheet can turn into an Excel workbook.
 *
 * Run this after any News.jsx edit that adds/removes posts or links so the
 * linkage sheet stays in sync.
 */
const fs = require('fs');
const path = require('path');

const NEWS_PATH = path.resolve(__dirname, '../src/pages/News.jsx');
const OUT_PATH = path.resolve(__dirname, '../scripts/linkage-data.json');
const POSTS_HTML_DIR = path.resolve(__dirname, '../posts-html');

function loadHtmlContent(slug) {
  const htmlPath = path.join(POSTS_HTML_DIR, `${slug}.html`);
  return fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf-8') : '';
}

// ── Static pillar pages (non-blog routes that posts link to / from) ────────
const PILLAR_PAGES = {
  '/what-is-ukmla':        { title: 'What Is the UKMLA?', cluster: 'Core UKMLA Overview' },
  '/syllabus':             { title: 'MLA Content Map / Syllabus', cluster: 'Core UKMLA Overview' },
  '/exam-pattern/akt':     { title: 'AKT Exam Pattern', cluster: 'Exam Format' },
  '/exam-pattern/cpsa':    { title: 'CPSA Exam Pattern', cluster: 'Exam Format' },
  '/eligibility':          { title: 'Eligibility', cluster: 'Registration & Eligibility' },
  '/registration-guide':   { title: 'Registration Guide', cluster: 'Registration & Eligibility' },
  '/key-dates':            { title: 'Key Dates', cluster: 'Registration & Eligibility' },
  '/fees':                 { title: 'Fees', cluster: 'Registration & Eligibility' },
  '/appeals-and-resits':   { title: 'Appeals and Resits', cluster: 'Results & Scoring' },
  '/results-and-scoring':  { title: 'Results and Scoring', cluster: 'Results & Scoring' },
  '/preparation':          { title: 'Preparation', cluster: 'Exam Preparation' },
  '/ukmla-vs-plab':        { title: 'UKMLA vs PLAB', cluster: 'Core UKMLA Overview' },
  '/official-resources':   { title: 'Official Resources', cluster: 'Core UKMLA Overview' },
};

// ── Cluster assignment for blog posts, by slug keyword ──────────────────────
const CLUSTER_RULES = [
  [/^ukmla-fees|^ukmla-eligibility|^ukmla-key-dates|^how-to-register|^ukmla-resits|^disability-access/, 'Registration & Eligibility'],
  [/^what-is-ukmla|^mla-content-map|^ukmla-vs-plab|^plab-2-preparation|^ukmla-preparation-for-imgs|^uk-medical-schools|^graduate-entry|^ukmla-graduate-entry/, 'Core UKMLA Overview'],
  [/^ukmla-akt-format|^ukmla-cpsa|^how-to-read-akt-stem|^angoff-standard-setting|^clinical-examination-cpsa|^psychiatry-communication-cpsa/, 'Exam Format'],
  [/^ukmla-results-feedback|^angoff/, 'Results & Scoring'],
  [/^good-medical-practice|^safeguarding|^patient-safety/, 'Professional Practice & Safety'],
  [/^ukmla-revision-notes|^mock-exams|^time-management|^group-study|^three-months/, 'Exam Preparation'],
  [/(cardiology|respiratory|gastroenterology|neurology|dermatology|haematology|nephrology|rheumatology|endocrinology|palliative-care|ophthalmology|obstetrics|surgical|infection-microbiology|emergency-medicine|mental-health|paediatrics|nice-guidelines|ecg-interpretation|radiology|blood-tests|social-determinants)/, 'Clinical Systems Revision'],
  [/^how-to-become-a-doctor-in-uk-from|^ukmla-for-.*-doctors|^ukmla-vs-usmle|^ukmla-vs-neet-pg|^ukmla-question-bank|^ukmla-fees-for-img/, 'IMG Country Routes & Global Comparisons'],
];

function clusterFor(slug) {
  for (const [re, cluster] of CLUSTER_RULES) {
    if (re.test(slug)) return cluster;
  }
  return 'Uncategorised';
}

// Nearest pillar page for a blog post (used for the "Pillar Page" column)
const PILLAR_RULES = [
  [/^ukmla-fees/, '/fees'],
  [/^ukmla-eligibility|^ukmla-graduate-entry|^graduate-entry/, '/eligibility'],
  [/^ukmla-key-dates/, '/key-dates'],
  [/^how-to-register/, '/registration-guide'],
  [/^ukmla-resits|^disability-access/, '/appeals-and-resits'],
  [/^what-is-ukmla|^uk-medical-schools/, '/what-is-ukmla'],
  [/^mla-content-map/, '/syllabus'],
  [/^ukmla-vs-plab|^plab-2-preparation|^ukmla-preparation-for-imgs/, '/ukmla-vs-plab'],
  [/^ukmla-akt-format|^how-to-read-akt-stem/, '/exam-pattern/akt'],
  [/^ukmla-cpsa|^clinical-examination-cpsa|^psychiatry-communication-cpsa/, '/exam-pattern/cpsa'],
  [/^ukmla-results-feedback|^angoff/, '/results-and-scoring'],
  [/^ukmla-revision-notes|^mock-exams|^time-management|^group-study|^three-months/, '/preparation'],
  [/(cardiology|respiratory|gastroenterology|neurology|dermatology|haematology|nephrology|rheumatology|endocrinology|palliative-care|ophthalmology|obstetrics|surgical|infection-microbiology|emergency-medicine|mental-health|paediatrics|nice-guidelines|ecg-interpretation|radiology|blood-tests|social-determinants)/, '/syllabus'],
  [/^how-to-become-a-doctor-in-uk-from|^ukmla-for-.*-doctors/, '/eligibility'],
  [/^ukmla-vs-usmle|^ukmla-vs-neet-pg/, '/ukmla-vs-plab'],
  [/^ukmla-question-bank/, '/preparation'],
  [/^ukmla-fees-for-img/, '/fees'],
];

function pillarFor(slug) {
  for (const [re, pillar] of PILLAR_RULES) {
    if (re.test(slug)) return pillar;
  }
  return '';
}

// ── Load posts ───────────────────────────────────────────────────────────
const src = fs.readFileSync(NEWS_PATH, 'utf-8');
const START_STR = 'const posts = [';
const END_STR = '\nconst topics';
const startIdx = src.indexOf(START_STR);
const endIdx = src.indexOf(END_STR);
if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate posts array boundaries');
  process.exit(1);
}
const arrText = src.slice(startIdx + 'const posts = '.length, endIdx).replace(/;\s*$/, '').trim();
const posts = JSON.parse(arrText);

const slugSet = new Set(posts.map((p) => p.slug));

// ── Build nodes ──────────────────────────────────────────────────────────
// node key = post slug, or pillar path (e.g. "/fees")
const nodes = new Map();

for (const p of posts) {
  nodes.set(p.slug, {
    key: p.slug,
    type: 'post',
    title: p.title,
    url: `/news#${p.slug}`,
    cluster: clusterFor(p.slug),
    pillar: pillarFor(p.slug),
    outgoing: new Set(),
    incoming: new Set(),
  });
}
for (const [route, meta] of Object.entries(PILLAR_PAGES)) {
  nodes.set(route, {
    key: route,
    type: 'pillar',
    title: meta.title,
    url: route,
    cluster: meta.cluster,
    pillar: '',
    outgoing: new Set(),
    incoming: new Set(),
  });
}

function resolveHref(href) {
  // '/news#slug-xyz' -> slug node, if it exists
  const hashIdx = href.indexOf('#');
  if (href.startsWith('/news') && hashIdx !== -1) {
    const slug = href.slice(hashIdx + 1);
    return slugSet.has(slug) ? slug : null;
  }
  // Static pillar route (strip any trailing hash/query just in case)
  const base = href.split('#')[0].split('?')[0];
  return PILLAR_PAGES[base] ? base : null;
}

// ── Extract links from every post's htmlContent ─────────────────────────
const HREF_RE = /<a\s+[^>]*href="([^"]+)"[^>]*>/gi;
for (const p of posts) {
  const from = nodes.get(p.slug);
  let m;
  HREF_RE.lastIndex = 0;
  const html = loadHtmlContent(p.slug);
  while ((m = HREF_RE.exec(html))) {
    const target = resolveHref(m[1]);
    if (!target || target === p.slug) continue; // ignore unresolved / self links
    from.outgoing.add(target);
    const to = nodes.get(target);
    if (to) to.incoming.add(p.slug);
  }
}

// ── Serialize ────────────────────────────────────────────────────────────
const rows = [...nodes.values()].map((n) => ({
  key: n.key,
  type: n.type,
  title: n.title,
  url: n.url,
  cluster: n.cluster,
  pillarPage: n.pillar,
  incomingCount: n.incoming.size,
  outgoingCount: n.outgoing.size,
  linkedFrom: [...n.incoming].sort(),
  linksTo: [...n.outgoing].sort(),
}));

rows.sort((a, b) => (a.type === b.type ? a.key.localeCompare(b.key) : a.type.localeCompare(b.type)));

fs.writeFileSync(OUT_PATH, JSON.stringify(rows, null, 2), 'utf-8');

const postRows = rows.filter((r) => r.type === 'post');
const totalOut = postRows.reduce((s, r) => s + r.outgoingCount, 0);
console.log(`Posts analysed: ${postRows.length}`);
console.log(`Pillar pages: ${rows.length - postRows.length}`);
console.log(`Total outgoing links from posts: ${totalOut}`);
console.log(`Posts with 0 incoming links: ${postRows.filter((r) => r.incomingCount === 0).map((r) => r.key).join(', ') || 'none'}`);
console.log(`Wrote ${OUT_PATH}`);
