#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '../src/pages/News.jsx');
const src = fs.readFileSync(FILE, 'utf-8');

// ── Extract posts array ───────────────────────────────────────────────────────
const START_STR = 'const posts = [';
const END_STR = '\nconst topics';
const startIdx = src.indexOf(START_STR);
const endIdx   = src.indexOf(END_STR);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate posts array boundaries');
  process.exit(1);
}

const arrText = src.slice(startIdx + 'const posts = '.length, endIdx).replace(/;\s*$/, '').trim();

let posts;
try {
  posts = JSON.parse(arrText);
} catch (e) {
  console.error('JSON parse failed:', e.message);
  process.exit(1);
}
console.log(`Loaded ${posts.length} posts\n`);

// ── Helper: inject one link ───────────────────────────────────────────────────
// Splits the html on existing <a>…</a> and heading blocks, then wraps the FIRST
// occurrence of `phrase` in a non-link, non-heading segment.
function addLink(html, phrase, href) {
  if (!html.includes(phrase)) return html;
  if (html.includes(`href="${href}"`)) return html; // already linked to this dest

  // Split on blocks we must not modify: <a>...</a> and <h1-4>...</h1-4>
  const RE_SKIP = /(<a[\s>][\s\S]*?<\/a>|<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>)/gi;
  const parts = html.split(RE_SKIP);

  let done = false;
  const out = parts.map((chunk, i) => {
    if (done || i % 2 === 1) return chunk; // skip protected blocks
    const pos = chunk.indexOf(phrase);
    if (pos === -1) return chunk;
    done = true;
    return (
      chunk.slice(0, pos) +
      `<a href="${href}">${phrase}</a>` +
      chunk.slice(pos + phrase.length)
    );
  });

  return done ? out.join('') : html;
}

// ── Link rules ────────────────────────────────────────────────────────────────
// [phrase, href]  — longer/more specific first so they match before shorter substrings.
// Each href is added at most once per post; self-links are excluded.
const RULES = [
  // ── Main site pages ──────────────────────────────────────────────────────────
  ['Applied Knowledge Test (AKT)',                '/exam-pattern/akt'],
  ['Applied Knowledge Test',                      '/exam-pattern/akt'],
  ['Clinical and Professional Skills Assessment (CPSA)', '/exam-pattern/cpsa'],
  ['Clinical and Professional Skills Assessment', '/exam-pattern/cpsa'],
  ['MLA Content Map',                             '/syllabus'],
  ['MLA content map',                             '/syllabus'],
  ['content map',                                 '/syllabus'],
  ['GMC registration',                            '/registration-guide'],
  ['register with the GMC',                       '/registration-guide'],
  ['initial registration',                        '/registration-guide'],
  ['International Medical Graduates',             '/eligibility'],
  ['international medical graduates',             '/eligibility'],
  ['UKMLA eligibility',                           '/eligibility'],
  ['eligibility requirements',                    '/eligibility'],
  ['eligibility criteria',                        '/eligibility'],
  ['UKMLA fees',                                  '/fees'],
  ['exam fees',                                   '/fees'],
  ['annual retention fee',                        '/fees'],
  ['registration fee',                            '/fees'],
  ['fee schedule',                                '/fees'],
  ['key dates',                                   '/key-dates'],
  ['exam dates',                                  '/key-dates'],
  ['sitting schedule',                            '/key-dates'],
  ['test centre dates',                           '/key-dates'],
  ['booking window',                              '/key-dates'],
  ['re-sit',                                      '/appeals-and-resits'],
  ['resit',                                       '/appeals-and-resits'],
  ['appeals process',                             '/appeals-and-resits'],
  ['reasonable adjustments',                      '/appeals-and-resits'],
  ['mitigating circumstances',                    '/appeals-and-resits'],
  ['pass mark',                                   '/results-and-scoring'],
  ['standard setting',                            '/results-and-scoring'],
  ['Angoff method',                               '/results-and-scoring'],
  ['Angoff standard',                             '/results-and-scoring'],
  ['borderline regression',                       '/results-and-scoring'],
  ['pass rate',                                   '/results-and-scoring'],
  ['PLAB 1',                                      '/ukmla-vs-plab'],
  ['PLAB 2',                                      '/ukmla-vs-plab'],
  ['Foundation Year 1',                           '/what-is-ukmla'],
  ['FY1 doctor',                                  '/what-is-ukmla'],
  ['newly qualified doctor',                      '/what-is-ukmla'],
  ['preparation guide',                           '/preparation'],
  ['study plan',                                  '/preparation'],
  ['revision strategy',                           '/preparation'],
  ['how to prepare',                              '/preparation'],
  ['question bank',                               '/preparation'],
  ['GMC website',                                 '/official-resources'],
  ['official GMC',                                '/official-resources'],
  ['Medical Schools Council',                     '/official-resources'],
  // ── Blog post cross-links ─────────────────────────────────────────────────
  ['NICE guidelines',                             '/news#nice-guidelines-akt-revision'],
  ['NICE guideline',                              '/news#nice-guidelines-akt-revision'],
  ['Foundation Programme',                        '/news#foundation-programme-after-ukmla'],
  ['time management',                             '/news#time-management-akt-ukmla'],
  ['mock exam',                                   '/news#mock-exams-ukmla-preparation'],
  ['mock test',                                   '/news#mock-exams-ukmla-preparation'],
  ['practice paper',                              '/news#mock-exams-ukmla-preparation'],
  ['timed practice',                              '/news#mock-exams-ukmla-preparation'],
  ['safeguarding',                                '/news#safeguarding-ukmla-revision'],
  ['Good Medical Practice',                       '/news#good-medical-practice-ukmla'],
  ['ECG interpretation',                          '/news#ecg-interpretation-ukmla'],
  ['electrocardiogram',                           '/news#ecg-interpretation-ukmla'],
  ['ECG',                                         '/news#ecg-interpretation-ukmla'],
  ['radiology',                                   '/news#radiology-imaging-akt-ukmla'],
  ['chest X-ray',                                 '/news#radiology-imaging-akt-ukmla'],
  ['imaging',                                     '/news#radiology-imaging-akt-ukmla'],
  ['emergency medicine',                          '/news#emergency-medicine-ukmla-revision'],
  ['mental health',                               '/news#mental-health-ukmla-revision'],
  ['psychiatric',                                 '/news#mental-health-ukmla-revision'],
  ['paediatrics',                                 '/news#paediatrics-ukmla-revision'],
  ['paediatric',                                  '/news#paediatrics-ukmla-revision'],
  ['children',                                    '/news#paediatrics-ukmla-revision'],
  ['cardiology',                                  '/news#cardiology-ukmla-akt-revision'],
  ['cardiovascular medicine',                     '/news#cardiology-ukmla-akt-revision'],
  ['cardiovascular',                              '/news#cardiology-ukmla-akt-revision'],
  ['respiratory medicine',                        '/news#respiratory-medicine-ukmla-revision'],
  ['respiratory',                                 '/news#respiratory-medicine-ukmla-revision'],
  ['gastroenterology',                            '/news#gastroenterology-ukmla-akt-revision'],
  ['gastrointestinal',                            '/news#gastroenterology-ukmla-akt-revision'],
  ['neurology',                                   '/news#neurology-ukmla-revision'],
  ['neurological',                                '/news#neurology-ukmla-revision'],
  ['dermatology',                                 '/news#dermatology-ukmla-revision'],
  ['haematology',                                 '/news#haematology-ukmla-revision'],
  ['haematological',                              '/news#haematology-ukmla-revision'],
  ['nephrology',                                  '/news#nephrology-ukmla-revision'],
  ['renal medicine',                              '/news#nephrology-ukmla-revision'],
  ['rheumatology',                                '/news#rheumatology-ukmla-revision'],
  ['musculoskeletal',                             '/news#rheumatology-ukmla-revision'],
  ['endocrinology',                               '/news#endocrinology-diabetes-ukmla-revision'],
  ['diabetes',                                    '/news#endocrinology-diabetes-ukmla-revision'],
  ['palliative care',                             '/news#palliative-care-ukmla-revision'],
  ['end-of-life',                                 '/news#palliative-care-ukmla-revision'],
  ['ophthalmology',                               '/news#ophthalmology-ent-ukmla-revision'],
  ['ENT',                                         '/news#ophthalmology-ent-ukmla-revision'],
  ['ear, nose',                                   '/news#ophthalmology-ent-ukmla-revision'],
  ['psychiatry',                                  '/news#psychiatry-communication-cpsa-stations'],
  ['communication station',                       '/news#psychiatry-communication-cpsa-stations'],
  ['blood tests',                                 '/news#blood-tests-data-interpretation-akt'],
  ['blood test',                                  '/news#blood-tests-data-interpretation-akt'],
  ['data interpretation',                         '/news#blood-tests-data-interpretation-akt'],
  ['laboratory result',                           '/news#blood-tests-data-interpretation-akt'],
  ['social determinants',                         '/news#social-determinants-health-ukmla'],
  ['health inequalities',                         '/news#social-determinants-health-ukmla'],
  ['social factors',                              '/news#social-determinants-health-ukmla'],
  ['prescribing errors',                          '/news#patient-safety-ukmla-prescribing-errors'],
  ['prescribing safety',                          '/news#patient-safety-ukmla-prescribing-errors'],
  ['patient safety',                              '/news#patient-safety-ukmla-prescribing-errors'],
  ['safe prescribing',                            '/news#patient-safety-ukmla-prescribing-errors'],
  ['prescribing',                                 '/news#patient-safety-ukmla-prescribing-errors'],
  ['group study',                                 '/news#group-study-vs-solo-ukmla'],
  ['study group',                                 '/news#group-study-vs-solo-ukmla'],
  ['collaborative revision',                      '/news#group-study-vs-solo-ukmla'],
  ['disability access',                           '/news#disability-access-ukmla-guide'],
  ['disability',                                  '/news#disability-access-ukmla-guide'],
  ['graduate entry',                              '/news#ukmla-graduate-entry-medical-students'],
  ['graduate-entry',                              '/news#ukmla-graduate-entry-medical-students'],
  ['results and feedback',                        '/news#ukmla-results-feedback-report'],
  ['feedback report',                             '/news#ukmla-results-feedback-report'],
  ['clinical examination',                        '/news#clinical-examination-cpsa-guide'],
  ['OSCE station',                                '/news#clinical-examination-cpsa-guide'],
  ['obstetrics and gynaecology',                  '/news#obstetrics-gynaecology-ukmla-revision'],
  ['gynaecology',                                 '/news#obstetrics-gynaecology-ukmla-revision'],
  ['obstetric',                                   '/news#obstetrics-gynaecology-ukmla-revision'],
  ['surgical',                                    '/news#surgical-presentations-ukmla-revision'],
  ['surgery',                                     '/news#surgical-presentations-ukmla-revision'],
  ['infection',                                   '/news#infection-microbiology-ukmla-revision'],
  ['microbiology',                                '/news#infection-microbiology-ukmla-revision'],
  ['three-month',                                 '/news#three-months-ukmla-akt-countdown'],
  ['90-day',                                      '/news#three-months-ukmla-akt-countdown'],
  ['revision notes',                              '/news#ukmla-revision-notes-strategy'],
  ['note-taking',                                 '/news#ukmla-revision-notes-strategy'],
  ['SBA questions',                               '/news#how-to-read-akt-stem'],
  ['SBA stems',                                   '/news#how-to-read-akt-stem'],
  ['single best answer',                          '/news#how-to-read-akt-stem'],
  ['AKT stem',                                    '/news#how-to-read-akt-stem'],
  ['question stem',                               '/news#how-to-read-akt-stem'],
  ['IMG preparation',                             '/news#ukmla-preparation-for-imgs'],
  ['IMGs preparing',                              '/news#ukmla-preparation-for-imgs'],
  ['IMGs who',                                    '/news#ukmla-preparation-for-imgs'],
  ['PLAB pathway',                                '/news#ukmla-preparation-for-imgs'],
  ['UK medical school',                           '/news#uk-medical-schools-ukmla-implementation'],
  ['medical school',                              '/news#uk-medical-schools-ukmla-implementation'],
  // ── Orphan-post rescue rules ───────────────────────────────────────────────
  // These 12 posts mirror a pillar page (same topic, different slug) so every
  // generic mention of the topic above was already claimed by the pillar-page
  // rule, leaving the post itself with 0 in-content incoming links. These use
  // distinct, verified-present phrasing so the post version also gets linked
  // to from elsewhere, closing the crawl gap.
  ['AKT format',                                  '/news#ukmla-akt-format-preparation'],
  ['vs PLAB',                                     '/news#ukmla-vs-plab-difference'],
  ['PLAB 2 preparation',                          '/news#plab-2-preparation-guide'],
  ['register for PLAB 1',                         '/news#how-to-register-plab-1'],
  ['CPSA tests',                                  '/news#ukmla-cpsa-what-it-tests'],
  ['who can sit',                                 '/news#ukmla-eligibility-who-can-sit'],
  ['eligibility rules',                           '/news#ukmla-eligibility-who-can-sit'],
  ['financial planning',                          '/news#ukmla-fees-explained'],
  ['sitting dates',                               '/news#ukmla-key-dates-sitting-schedule'],
  ['timetable',                                   '/news#ukmla-key-dates-sitting-schedule'],
  ['resit rules',                                 '/news#ukmla-resits-rules-limits'],
  ['MLA blueprint',                               '/news#mla-content-map-explained'],
  ['official blueprint',                          '/news#mla-content-map-explained'],
  ['What Is the UKMLA',                           '/news#what-is-ukmla-complete-guide'],
  ["beginner's guide",                            '/news#what-is-ukmla-complete-guide'],
  ['note-making',                                 '/news#ukmla-revision-notes-strategy'],
];

// ── Self-href exclusions ──────────────────────────────────────────────────────
// Map from slug → array of hrefs that would be self-referential
const SELF_HREFS = {
  'ukmla-fees-explained':               ['/fees'],
  'what-is-ukmla-complete-guide':       ['/what-is-ukmla'],
  'mla-content-map-explained':          ['/syllabus'],
  'ukmla-akt-format-preparation':       ['/exam-pattern/akt'],
  'ukmla-cpsa-what-it-tests':           ['/exam-pattern/cpsa'],
  'ukmla-vs-plab-difference':           ['/ukmla-vs-plab'],
  'ukmla-eligibility-who-can-sit':      ['/eligibility'],
  'ukmla-key-dates-sitting-schedule':   ['/key-dates'],
  'how-to-register-plab-1':             ['/registration-guide'],
  'plab-2-preparation-guide':           ['/exam-pattern/cpsa', '/ukmla-vs-plab'],
  'ukmla-resits-rules-limits':          ['/appeals-and-resits'],
  'how-to-read-akt-stem':               ['/news#how-to-read-akt-stem', '/exam-pattern/akt'],
  'nice-guidelines-akt-revision':       ['/news#nice-guidelines-akt-revision'],
  'mental-health-ukmla-revision':       ['/news#mental-health-ukmla-revision'],
  'paediatrics-ukmla-revision':         ['/news#paediatrics-ukmla-revision'],
  'emergency-medicine-ukmla-revision':  ['/news#emergency-medicine-ukmla-revision'],
  'radiology-imaging-akt-ukmla':        ['/news#radiology-imaging-akt-ukmla'],
  'ecg-interpretation-ukmla':           ['/news#ecg-interpretation-ukmla'],
  'good-medical-practice-ukmla':        ['/news#good-medical-practice-ukmla'],
  'safeguarding-ukmla-revision':        ['/news#safeguarding-ukmla-revision'],
  'ukmla-revision-notes-strategy':      ['/preparation', '/news#ukmla-revision-notes-strategy'],
  'mock-exams-ukmla-preparation':       ['/preparation', '/news#mock-exams-ukmla-preparation'],
  'foundation-programme-after-ukmla':   ['/what-is-ukmla', '/news#foundation-programme-after-ukmla'],
  'cardiology-ukmla-akt-revision':      ['/news#cardiology-ukmla-akt-revision'],
  'respiratory-medicine-ukmla-revision':['/news#respiratory-medicine-ukmla-revision'],
  'gastroenterology-ukmla-akt-revision':['/news#gastroenterology-ukmla-akt-revision'],
  'neurology-ukmla-revision':           ['/news#neurology-ukmla-revision'],
  'obstetrics-gynaecology-ukmla-revision':['/news#obstetrics-gynaecology-ukmla-revision'],
  'surgical-presentations-ukmla-revision':['/news#surgical-presentations-ukmla-revision'],
  'dermatology-ukmla-revision':         ['/news#dermatology-ukmla-revision'],
  'endocrinology-diabetes-ukmla-revision':['/news#endocrinology-diabetes-ukmla-revision'],
  'rheumatology-ukmla-revision':        ['/news#rheumatology-ukmla-revision'],
  'nephrology-ukmla-revision':          ['/news#nephrology-ukmla-revision'],
  'haematology-ukmla-revision':         ['/news#haematology-ukmla-revision'],
  'infection-microbiology-ukmla-revision':['/news#infection-microbiology-ukmla-revision'],
  'palliative-care-ukmla-revision':     ['/news#palliative-care-ukmla-revision'],
  'patient-safety-ukmla-prescribing-errors':['/news#patient-safety-ukmla-prescribing-errors'],
  'ukmla-graduate-entry-medical-students':['/news#ukmla-graduate-entry-medical-students', '/eligibility'],
  'ukmla-results-feedback-report':      ['/news#ukmla-results-feedback-report', '/results-and-scoring'],
  'clinical-examination-cpsa-guide':    ['/news#clinical-examination-cpsa-guide', '/exam-pattern/cpsa'],
  'group-study-vs-solo-ukmla':          ['/news#group-study-vs-solo-ukmla'],
  'angoff-standard-setting-explained':  ['/results-and-scoring'],
  'time-management-akt-ukmla':          ['/news#time-management-akt-ukmla'],
  'ukmla-preparation-for-imgs':         ['/news#ukmla-preparation-for-imgs', '/preparation', '/eligibility'],
  'blood-tests-data-interpretation-akt':['/news#blood-tests-data-interpretation-akt'],
  'disability-access-ukmla-guide':      ['/news#disability-access-ukmla-guide', '/appeals-and-resits'],
  'uk-medical-schools-ukmla-implementation':['/news#uk-medical-schools-ukmla-implementation'],
  'psychiatry-communication-cpsa-stations':['/news#psychiatry-communication-cpsa-stations', '/exam-pattern/cpsa'],
  'ophthalmology-ent-ukmla-revision':   ['/news#ophthalmology-ent-ukmla-revision'],
  'social-determinants-health-ukmla':   ['/news#social-determinants-health-ukmla'],
  'three-months-ukmla-akt-countdown':   ['/news#three-months-ukmla-akt-countdown'],
};

// ── Process all posts ─────────────────────────────────────────────────────────
let totalAdded = 0;
const summary = [];

for (const post of posts) {
  let html = post.htmlContent;
  const before = (html.match(/<a[\s>]/gi) || []).length;

  const selfHrefs = new Set(SELF_HREFS[post.slug] || []);
  selfHrefs.add(`/news#${post.slug}`); // always skip self

  for (const [phrase, href] of RULES) {
    if (selfHrefs.has(href)) continue;
    html = addLink(html, phrase, href);
  }

  const after = (html.match(/<a[\s>]/gi) || []).length;
  const added = after - before;
  totalAdded += added;
  summary.push({ slug: post.slug, before, after, added });

  if (added > 0) post.htmlContent = html;
  console.log(`[${added >= 0 ? '+' + added : added}] ${post.slug} (${before} → ${after})`);
}

// ── Write back ────────────────────────────────────────────────────────────────
const newArr = JSON.stringify(posts, null, 2);
const newSrc =
  src.slice(0, startIdx) +
  'const posts = ' +
  newArr +
  ';' +
  src.slice(endIdx);  // '\nconst topics = [...]...'

fs.writeFileSync(FILE, newSrc, 'utf-8');

console.log(`\n✅ Done. Added ${totalAdded} links across ${posts.length} posts.\n`);

// Posts with fewer than 8 total links
const low = summary.filter(p => p.after < 8);
if (low.length) {
  console.log('Posts with fewer than 8 total links:');
  low.forEach(p => console.log(`  ${p.slug}: ${p.after}`));
}
