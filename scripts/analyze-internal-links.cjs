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
  [/^ukmla-fees|^ukmla-eligibility|^ukmla-key-dates|^how-to-register|^ukmla-resits|^disability-access|^ukmla-exemptions-for-specialist|^gmc-registration-refund-policy|^gmc-order-reform|^gmc-welcome-to-uk-practice|^oet-vs-ielts|^gmc-recognised-primary-medical-qualifications|^internship-requirement-for-gmc|^how-long-does-gmc-registration-take|^locally-employed-doctors|^ukmla-exam-booking-process|^gmc-english-language-exemption|^types-of-gmc-registration|^nhs-pension-scheme|^indemnity-insurance-for-doctors|^gmc-annual-retention-fee|^certificate-of-completion-of-training|^arcp-annual-review|^ewtd-working-hours|^nhs-eportfolio-guide|^scotland-wales-northern-ireland|^ukmla-exam-day-what-to-expect|^ukmla-special-circumstances|^cost-of-gmc-registration|^gmc-epic-verification/, 'Registration & Eligibility'],
  [/^what-is-ukmla|^mla-content-map|^ukmla-vs-plab|^plab-2-preparation|^ukmla-preparation-for-imgs|^uk-medical-schools|^graduate-entry|^ukmla-graduate-entry|^ukmla-syllabus-2026-changes|^is-ukmla-replacing-plab|^foundation-programme-2026-recruitment-changes|^ukmla-and-academic-foundation-programme|^joining-a-royal-college|^multi-specialty-recruitment-assessment|^history-of-ukmla-plab-transition/, 'Core UKMLA Overview'],
  [/^ukmla-akt-format|^ukmla-cpsa|^how-to-read-akt-stem|^angoff-standard-setting|^clinical-examination-cpsa|^psychiatry-communication-cpsa|^breaking-bad-news-in-the-cpsa/, 'Exam Format'],
  [/^ukmla-results-feedback|^angoff|^ukmla-akt-pass-mark|^what-happens-if-you-fail-ukmla/, 'Results & Scoring'],
  [/^good-medical-practice|^safeguarding|^patient-safety|^gmc-regulation-of-physician-associates|^gmc-revalidation-process|^gmc-fitness-to-practise/, 'Professional Practice & Safety'],
  [/^ukmla-revision-notes|^mock-exams|^time-management|^group-study|^three-months|^managing-ukmla-exam-anxiety|^how-to-pass-ukmla-on-first-attempt|^ukmla-anki-deck|^ukmla-preparation-for-uk-final-year-students|^best-ukmla-question-banks/, 'Exam Preparation'],
  [/(cardiology|respiratory|gastroenterology|neurology|dermatology|haematology|nephrology|rheumatology|endocrinology|palliative-care|ophthalmology|obstetrics|surgical|infection-microbiology|emergency-medicine|mental-health|paediatrics|nice-guidelines|ecg-interpretation|radiology|blood-tests|social-determinants|pharmacology|prescribing|genetics-and-genomics|sepsis-recognition|transgender-health|toxicology-and-poisoning|anaesthesia-and-perioperative|trauma-and-orthopaedics|^urology-ukmla|care-of-the-elderly|public-health-and-screening|medical-statistics|consent-and-mental-capacity|immunology-and-allergy|nutrition-and-metabolic|chronic-pain-management|critical-care-and-intensive-care|substance-misuse-and-addiction|menopause-management|contraception-counselling|early-pregnancy-complications|gynaecological-cancers|medically-unexplained-symptoms|domestic-abuse-and-safeguarding)/, 'Clinical Systems Revision'],
  [/^how-to-become-a-doctor-in-uk-from|^ukmla-for-.*-doctors|^ukmla-vs-usmle|^ukmla-vs-neet-pg|^ukmla-question-bank|^ukmla-fees-for-img|^mbbs-in-uk-for|^uk-doctor-salary-guide|^ukmla-to-nhs-job|^is-indian-mbbs-valid-in-uk|^ukmla-akt-test-centres|^gmc-registration-and-epic|^english-language-requirement-for-ukmla|^gmc-registration-requirements-for-international|^how-to-become-a-doctor-in-the-uk-gmc|^uk-visa-guide-for-international|^ukmla-for-international-medical-graduates-country-routes|^ukmla-vs-amc|^foundation-year-vs-specialty-training-for-imgs|^ukmla-crash-course-for-doctors|^medical-training-prioritisation-act|^medical-training-initiative-scheme-closure|^uk-visa-salary-threshold-changes|^gmc-registration-for-eu-and-irish|^returning-to-practise-in-gulf-countries|^how-to-write-an-nhs-cv|^nhs-job-interview-preparation|^relocating-to-the-uk|^bringing-family-to-uk|^locum-vs-substantive|^understanding-nhs-pay-scales|^ukmla-after-mbbs-in-india/, 'IMG Country Routes & Global Comparisons'],
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
  [/^how-to-become-a-doctor-in-uk-from|^ukmla-for-.*-doctors|^mbbs-in-uk-for|^uk-doctor-salary-guide|^ukmla-to-nhs-job|^is-indian-mbbs-valid-in-uk|^english-language-requirement-for-ukmla|^how-to-become-a-doctor-in-the-uk-gmc|^uk-visa-guide-for-international|^ukmla-for-international-medical-graduates-country-routes|^ukmla-exemptions-for-specialist/, '/eligibility'],
  [/^ukmla-vs-usmle|^ukmla-vs-neet-pg|^ukmla-vs-amc/, '/ukmla-vs-plab'],
  [/^ukmla-question-bank|^best-ukmla-question-banks|^ukmla-preparation-for-uk-final-year-students/, '/preparation'],
  [/^ukmla-after-mbbs-in-india/, '/eligibility'],
  [/^cost-of-gmc-registration/, '/fees'],
  [/^gmc-epic-verification/, '/registration-guide'],
  [/^ukmla-fees-for-img/, '/fees'],
  [/^ukmla-akt-test-centres/, '/exam-pattern/akt'],
  [/^gmc-registration-and-epic|^gmc-registration-requirements-for-international/, '/registration-guide'],
  [/^ukmla-akt-pass-mark/, '/results-and-scoring'],
  [/^pharmacology-prescribing-safety-ukmla/, '/syllabus'],
  [/^managing-ukmla-exam-anxiety/, '/preparation'],
  [/^how-to-pass-ukmla-on-first-attempt|^ukmla-anki-deck|^ukmla-crash-course-for-doctors/, '/preparation'],
  [/^ukmla-syllabus-2026-changes/, '/syllabus'],
  [/^foundation-year-vs-specialty-training-for-imgs/, '/eligibility'],
  [/^gmc-registration-refund-policy/, '/fees'],
  [/^medical-training-prioritisation-act|^medical-training-initiative-scheme-closure|^uk-visa-salary-threshold-changes|^gmc-recognised-primary-medical-qualifications|^internship-requirement-for-gmc|^gmc-english-language-exemption|^foundation-programme-2026-recruitment-changes|^ukmla-and-academic-foundation-programme/, '/eligibility'],
  [/^gmc-order-reform|^gmc-regulation-of-physician-associates|^gmc-welcome-to-uk-practice|^how-long-does-gmc-registration-take|^locally-employed-doctors|^ukmla-exam-booking-process|^gmc-revalidation-process|^types-of-gmc-registration|^gmc-fitness-to-practise/, '/registration-guide'],
  [/^oet-vs-ielts/, '/eligibility'],
  [/^is-ukmla-replacing-plab/, '/ukmla-vs-plab'],
  [/^what-happens-if-you-fail-ukmla/, '/appeals-and-resits'],
  [/genetics-and-genomics|sepsis-recognition|transgender-health|toxicology-and-poisoning|anaesthesia-and-perioperative|trauma-and-orthopaedics|^urology-ukmla|care-of-the-elderly|public-health-and-screening|medical-statistics|consent-and-mental-capacity|immunology-and-allergy|nutrition-and-metabolic|chronic-pain-management|critical-care-and-intensive-care|substance-misuse-and-addiction|menopause-management|contraception-counselling|early-pregnancy-complications|gynaecological-cancers|medically-unexplained-symptoms|domestic-abuse-and-safeguarding|prescribing-in-renal-and-hepatic/, '/syllabus'],
  [/^nhs-pension-scheme|^indemnity-insurance-for-doctors|^gmc-annual-retention-fee|^understanding-nhs-pay-scales/, '/fees'],
  [/^how-to-write-an-nhs-cv|^nhs-job-interview-preparation|^relocating-to-the-uk|^bringing-family-to-uk|^locum-vs-substantive/, '/eligibility'],
  [/^joining-a-royal-college|^certificate-of-completion-of-training|^multi-specialty-recruitment-assessment|^arcp-annual-review|^ewtd-working-hours|^nhs-eportfolio-guide|^scotland-wales-northern-ireland|^ukmla-exam-day-what-to-expect|^ukmla-special-circumstances/, '/registration-guide'],
  [/^gmc-registration-for-eu-and-irish|^returning-to-practise-in-gulf-countries/, '/eligibility'],
  [/^history-of-ukmla-plab-transition/, '/what-is-ukmla'],
  [/^breaking-bad-news-in-the-cpsa/, '/exam-pattern/cpsa'],
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
