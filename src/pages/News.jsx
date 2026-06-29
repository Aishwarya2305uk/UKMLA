import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

const posts = [
  {
    slug: 'revised-mla-content-map-2026',
    title: 'Revised GMC MLA Content Map to Take Effect in September 2026',
    date: '12 June 2026',
    tag: 'Syllabus Update',
    image: '/images/study-materials.webp',
    summary:
      'The GMC has published a revised MLA Content Map that becomes the blueprint for every AKT and CPSA sitting from September 2026. Here is what is changing — and how to adapt your revision.',
    body: [
      'The General Medical Council (GMC) has published a revised version of the MLA Content Map, which will be used as the blueprint for all Applied Knowledge Test (AKT / PLAB 1) and Clinical & Professional Skills Assessment (CPSA / PLAB 2) sittings from September 2026 onwards.',
      'The headline changes include adjustments to the list of patient presentations, the addition of several conditions reflecting current clinical priorities, and refinements to the standard-setting guidance used by examiners. None of the four pillars of the map — Patient Presentations, Clinical Conditions, Professional Behaviours, and Practical Skills — have been removed, so candidates already revising against the existing framework will not need to start from scratch.',
      'Candidates sitting tests in autumn 2026 or later are strongly urged to download the updated map and re-map their revision notes against it. If you are preparing now for an earlier sitting, the current version of the map still applies to you.',
      'As always, the Content Map is a living regulatory document. We recommend verifying the exact version that applies to your sitting directly with the GMC before finalising your study plan.'
    ],
    link: { to: '/syllabus', label: 'Review the updated syllabus criteria →' }
  },
  {
    slug: 'ukmla-mandatory-all-graduates',
    title: 'UKMLA Becomes a Mandatory Requirement for All UK Medical Graduates',
    date: '28 May 2026',
    tag: 'Milestone',
    image: '/images/hero-doctors.webp',
    summary:
      'Passing the UKMLA is now a non-negotiable step toward GMC registration for every UK medical graduate. We recap what the full rollout means in practice.',
    body: [
      'With the 2024–25 academic year, the UK Medical Licensing Assessment (UKMLA) became a mandatory milestone for graduates of UK medical schools. Every student must now demonstrate they have met the GMC’s common threshold before they can be granted registration with a licence to practise.',
      'In practice, this means UK medical schools deliver the Applied Knowledge Test (AKT) and a Clinical and Professional Skills Assessment (CPSA) mapped to the GMC’s MLA framework. Passing both is required to graduate and progress into Foundation Year 1 (FY1).',
      'For international medical graduates (IMGs), the equivalent standard is met through the MLA-aligned PLAB route rather than a separately branded "UKMLA" exam. The underlying competency standard, however, is now the same for both groups.',
      'The shift is the culmination of years of phased implementation, and it formally ends the era in which different UK medical schools set their own final assessments with no shared national benchmark.'
    ],
    link: { to: '/what-is-ukmla', label: 'What is the UKMLA? →' }
  },
  {
    slug: 'akt-scoring-angoff-standard-setting',
    title: 'How the AKT is Scored: Angoff and Standard Setting Explained',
    date: '15 May 2026',
    tag: 'Results & Data',
    image: '/images/study-materials.webp',
    summary:
      'The AKT does not use a fixed percentage pass mark. We break down the Angoff method and why the threshold can shift between sittings.',
    body: [
      'A common source of anxiety for candidates is the absence of a simple "you need X%" pass mark on the Applied Knowledge Test (AKT). Instead, the pass mark is determined through a process called standard setting, most commonly using a variant of the Angoff method.',
      'In the Angoff approach, panels of experienced clinicians review each question and estimate the proportion of "just about competent" candidates who would answer it correctly. These judgements are aggregated to define the minimum standard a safe candidate should reach. Because question difficulty varies between papers, the raw pass mark can differ slightly from one sitting to the next while the standard of competence stays constant.',
      'The practical implication is reassuring: you are not competing against other candidates for a limited number of passes, and a marginally harder paper does not unfairly penalise you. Focus your energy on demonstrating sound, guideline-based clinical reasoning rather than chasing a specific score.'
    ],
    link: { to: '/results-and-scoring', label: 'Read the full results & scoring guide →' }
  },
  {
    slug: 'gmc-fee-revisions-2026',
    title: 'April 2026 GMC Administration Fee Revisions',
    date: '3 April 2026',
    tag: 'Fees & Registration',
    image: '/images/doctor-portrait.webp',
    summary:
      'Following its annual review, the GMC has adjusted the administration costs for international medical graduate licensing tests. The revised fees apply to bookings made after 1 April 2026.',
    body: [
      'Following the annual review of practitioner fees, the General Medical Council has adjusted the administration costs for international medical graduate (IMG) licensing tests, including PLAB 1 and PLAB 2.',
      'The revised fees apply to any bookings made after 1 April 2026. Candidates who booked before that date are charged at the previous rate. The changes affect test fees only; separate costs such as English-language testing (IELTS/OET) and EPIC verification are set by their respective providers and are unaffected by this revision.',
      'Because fee scales are subject to constant regulatory adjustment, we deliberately do not publish specific figures here — they can change between the time of writing and your booking. Always verify current pricing directly via the official GMC portal before you pay.'
    ],
    link: {
      href: 'https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab/fees-for-plab',
      label: 'Verify current fees on the GMC portal →'
    }
  },
  {
    slug: 'reasonable-adjustments-mitigating-circumstances',
    title: 'Reasonable Adjustments and Mitigating Circumstances: What Candidates Should Know',
    date: '20 March 2026',
    tag: 'Candidate Support',
    image: '/images/doctor-portrait.webp',
    summary:
      'Candidates with disabilities or facing unexpected difficulties may be entitled to support. Here is an overview of adjustments and mitigation, and how to request them.',
    body: [
      'Candidates with a disability, long-term health condition, or specific learning difference may be eligible for reasonable adjustments to the way they sit the UKMLA. Examples can include additional time, rest breaks, or modified test arrangements, depending on individual needs and supporting evidence.',
      'Separately, mitigating circumstances refer to unexpected events — such as acute illness or bereavement around the time of an exam — that may have affected performance. Processes exist to flag these, and outcomes are considered on a case-by-case basis.',
      'The key practical point is timing: requests for adjustments usually need to be made well in advance of a sitting, with appropriate documentation. Candidates should check the specific deadlines and evidence requirements with their medical school (for UK students) or the GMC (for IMGs sitting PLAB) as early as possible.'
    ],
    link: { to: '/appeals-and-resits', label: 'Appeals, resits & adjustments →' }
  },
  {
    slug: 'cpsa-station-formats',
    title: 'CPSA Station Formats: What to Expect in the Clinical Exam',
    date: '18 February 2026',
    tag: 'Exam Format',
    image: '/gallery/images.jpg',
    summary:
      'The Clinical and Professional Skills Assessment tests practical competence through structured stations. We outline the common formats and what examiners look for.',
    body: [
      'The Clinical and Professional Skills Assessment (CPSA) evaluates whether a candidate can apply knowledge safely in realistic clinical scenarios. It is delivered through a series of structured stations, most commonly in an Objective Structured Clinical Examination (OSCE) format.',
      'Across the circuit, stations may assess history taking, focused physical examination, practical procedures, data interpretation, and communication skills such as explaining a diagnosis or sharing difficult news. Simulated patients and trained examiners are used to keep the experience consistent and fair between candidates.',
      'Examiners assess process as much as outcome: structured, safe, and patient-centred practice scores well even when a scenario is challenging. Rehearsing under timed conditions and seeking structured feedback on your consultations is among the most effective forms of CPSA preparation.'
    ],
    link: { to: '/exam-pattern/cpsa', label: 'Full CPSA guide →' }
  },
  {
    slug: 'mastering-sba-questions-akt',
    title: 'Mastering Single Best Answer (SBA) Questions for the AKT',
    date: '22 January 2026',
    tag: 'Preparation',
    image: '/images/study-materials.webp',
    summary:
      'The AKT is built around Single Best Answer questions. We share a practical approach to reading stems, ruling out distractors, and avoiding common traps.',
    body: [
      'The Applied Knowledge Test (AKT) is delivered as Single Best Answer (SBA) questions: a clinical vignette followed by several plausible options, only one of which is the single best response. Unlike older "true/false" formats, several options may be partially correct — your task is to identify the most appropriate.',
      'A reliable approach is to read the final sentence (the lead-in) first, so you know exactly what is being asked, then work through the stem identifying the key discriminating features. Resist the urge to pattern-match on a single buzzword; UK guideline nuances (for example NICE or SIGN recommendations) are frequently the deciding factor.',
      'Above all, practise with high-quality question banks and review the reasoning for both correct and incorrect options. Understanding why a distractor is wrong builds the clinical judgement the AKT is designed to test far more effectively than memorising answers.'
    ],
    link: { to: '/exam-pattern/akt', label: 'Full AKT guide →' }
  },
  {
    slug: 'plab-aligned-mla-content-map',
    title: 'PLAB Fully Aligned to the MLA Content Map: What It Means for IMGs',
    date: '10 November 2025',
    tag: 'IMG Pathway',
    image: '/gallery/images.jpg',
    summary:
      'International medical graduates still sit PLAB 1 and 2 — but the exams are now built around the same MLA blueprint as UK students. Here is what changed.',
    body: [
      'International medical graduates (IMGs) seeking GMC registration continue to sit the PLAB 1 and PLAB 2 examinations. The important change under the UKMLA is not the name of the exam but its blueprint: PLAB is now constructed around the same GMC MLA Content Map used for UK medical students.',
      'This means an IMG and a UK graduate are assessed against the same core standard of safe practice, even though the assessment is delivered through different routes. PLAB 1 mirrors the Applied Knowledge Test, while PLAB 2 functions as the clinical skills (CPSA-equivalent) component.',
      'For candidates preparing now, the practical takeaway is that MLA-aligned resources and the Content Map itself are directly relevant to PLAB revision. The wider registration journey — including English-language requirements and EPIC verification — remains unchanged by this alignment.'
    ],
    link: { to: '/ukmla-vs-plab', label: 'UKMLA vs PLAB explained →' }
  },
  {
    slug: 'ukmla-pass-rates-year-one',
    title: 'Analysis of Year 1 UKMLA Pass Rates Released',
    date: '20 August 2025',
    tag: 'Results & Data',
    image: '/images/student-studying.webp',
    summary:
      'Independent training providers have published review sheets for the first year of the UKMLA rollout. Early pass margins closely matched expectations across cohorts.',
    body: [
      'Independent clinical training providers have published review sheets for the initial year of the UKMLA rollout, covering the 2024–25 academic year — the first cohort for whom passing the assessment was a graduation requirement.',
      'Passing numbers closely matched initial expectations. Overall written-component (AKT) pass margins settled between roughly 60% and 65% depending on the specific cohort sitting, in line with the standard-setting models the GMC uses to define a safe threshold rather than a fixed quota.',
      'The data suggests the transition has been smoother than some predicted, with no evidence of a sudden drop in attainment compared with the pre-UKMLA era. Analysts caution that a single year is not enough to draw firm conclusions, and that year-on-year comparisons will be more meaningful once several cohorts have completed the assessment.',
      'For current candidates, the practical takeaway is unchanged: consistent, blueprint-led preparation remains the strongest predictor of success.'
    ],
    link: { to: '/results-and-scoring', label: 'How UKMLA results are scored →' }
  },
  {
    slug: 'building-revision-toolkit-question-banks',
    title: 'Free and Paid Question Banks: Building Your UKMLA Revision Toolkit',
    date: '5 July 2025',
    tag: 'Preparation',
    image: '/images/student-studying.webp',
    summary:
      'Question banks are central to effective UKMLA prep. We look at how to combine free and paid resources without overspending or scattering your focus.',
    body: [
      'Active recall through question practice is consistently one of the most effective ways to prepare for the AKT. A good revision toolkit usually combines a primary question bank with a small number of supporting resources, rather than juggling many at once.',
      'Free and official resources — including the GMC and Medical Schools Council sample materials — are a sensible starting point, and they reflect the expected style and standard. Many candidates supplement these with a paid bank that aligns to the MLA Content Map for the volume of practice questions needed to build confidence.',
      'Whatever you choose, prioritise depth of review over breadth of resources. Working carefully through one bank, understanding every rationale, and revisiting weak areas will serve you better than skimming several. We do not endorse any specific commercial provider — choose based on alignment to the Content Map and the quality of explanations.'
    ],
    link: { to: '/preparation', label: 'Full preparation guide →' }
  },
  {
    slug: 'exam-day-checklist',
    title: 'Exam-Day Checklist: What to Expect and How to Stay Calm',
    date: '18 June 2025',
    tag: 'Preparation',
    image: '/images/hero-doctors.webp',
    summary:
      'Knowing the logistics of test day removes a layer of avoidable stress. Here is a practical checklist for the AKT and CPSA.',
    body: [
      'Much of exam-day anxiety comes from uncertainty about logistics rather than the questions themselves. Confirm your test centre, arrival time, and the identification you need well in advance — the requirements are set out in your booking confirmation and should be checked carefully.',
      'For the computer-based AKT, plan to arrive early, bring acceptable photo ID, and familiarise yourself with the on-screen interface beforehand so navigation does not eat into your time. For the CPSA, dress as you would for a clinical placement and be ready to perform hand hygiene and follow infection-control steps as part of the assessment.',
      'On the day, a short routine — a light meal, water, and a few minutes of slow breathing before you start — does more for performance than last-minute cramming. Trust the preparation you have already done.'
    ],
    link: { to: '/preparation', label: 'Full preparation guide →' }
  },
  {
    slug: 'prescribing-safely-pharmacology-akt',
    title: 'Prescribing Safely: Pharmacology Focus for the AKT',
    date: '2 June 2025',
    tag: 'Preparation',
    image: '/images/study-materials.webp',
    summary:
      'Safe prescribing is a recurring theme across the MLA. We highlight the high-yield areas and the UK resources that matter most.',
    body: [
      'Safe and effective prescribing is woven throughout the MLA Content Map, and pharmacology questions frequently test whether you can apply guidance rather than simply recall a drug name. Expect scenarios involving dose adjustment, contraindications, interactions, and monitoring.',
      'Anchor your revision in UK references — the BNF (British National Formulary) is the standard source for doses and cautions, and NICE guidance frames first-line choices. Pay particular attention to high-risk areas such as anticoagulation, insulin, opioids, and antibiotics, where errors carry real patient harm.',
      'A useful habit is to ask, for every drug you revise: why this drug, what dose and route, what to monitor, and what would make it unsafe. That four-part framing mirrors the clinical reasoning the AKT rewards.'
    ],
    link: { to: '/exam-pattern/akt', label: 'Full AKT guide →' }
  },
  {
    slug: 'ethics-law-mla',
    title: 'Ethics and Law in the MLA: Consent, Capacity and Confidentiality',
    date: '15 May 2025',
    tag: 'Exam Format',
    image: '/images/doctor-portrait.webp',
    summary:
      'Professional behaviours are assessed across both components. We outline the core ethical and legal principles candidates are expected to apply.',
    body: [
      'Professional behaviours — including medical ethics and the law — are explicitly part of the MLA Content Map and appear in both the AKT and the CPSA. Questions tend to test application: recognising the right course of action in a realistic scenario rather than reciting a definition.',
      'Core areas include consent and mental capacity, confidentiality and its limits, safeguarding, duty of candour, and the principles that underpin GMC guidance such as Good Medical Practice. You should be comfortable reasoning through situations where principles appear to conflict — for example, confidentiality versus a duty to protect others.',
      'The safest approach in both written and clinical stations is to keep the patient’s best interests and safety central, communicate honestly, and escalate appropriately. Examiners are looking for sound judgement and professionalism, not memorised legal citations.'
    ],
    link: { to: '/syllabus', label: 'Explore the Content Map →' }
  },
  {
    slug: 'communication-stations-cpsa',
    title: 'Communication Stations: Breaking Bad News and Shared Decisions',
    date: '28 April 2025',
    tag: 'Exam Format',
    image: '/gallery/images.jpg',
    summary:
      'Communication is one of the most heavily weighted skills in the CPSA. We look at what good looks like in the consultation stations.',
    body: [
      'A significant proportion of CPSA marks reward communication: how you take a history, explain a diagnosis, share difficult news, or agree a plan with a patient. These stations use trained simulated patients and assess the process closely.',
      'Structured frameworks help under pressure. For sharing difficult news, candidates often draw on staged approaches that set the scene, check understanding, deliver information clearly, and respond to emotion. For management discussions, shared decision-making — presenting options, checking preferences, and agreeing next steps — scores well.',
      'The most common pitfalls are using jargon, talking over the patient, and failing to check understanding. Practising consultations aloud with a partner, and seeking honest feedback, is far more effective preparation than reading about communication alone.'
    ],
    link: { to: '/exam-pattern/cpsa', label: 'Full CPSA guide →' }
  },
  {
    slug: 'ukmla-to-fy1',
    title: 'From UKMLA to FY1: What Comes After You Pass',
    date: '10 April 2025',
    tag: 'Milestone',
    image: '/images/hero-doctors.webp',
    summary:
      'Passing the UKMLA is a gateway, not a finish line. Here is how it connects to registration and the Foundation Programme.',
    body: [
      'For UK graduates, passing the UKMLA is one of the requirements for being granted registration with a licence to practise and progressing into the Foundation Programme as a Foundation Year 1 (FY1) doctor. It confirms readiness for safe practice at the point of entry, not the end of learning.',
      'FY1 is a supervised, structured year in which new doctors consolidate the competencies the MLA assesses, working within clinical teams and continuing to develop through workplace-based assessment. For international graduates, the equivalent route runs through PLAB and GMC registration before taking up training posts.',
      'In other words, the assessment is best understood as a shared national threshold for safe day-one practice. The habits that get you through it — structured reasoning, safe prescribing, clear communication — are exactly the ones FY1 will build on.'
    ],
    link: { to: '/what-is-ukmla', label: 'What is the UKMLA? →' }
  },
  {
    slug: 'managing-exam-stress-wellbeing',
    title: 'Managing Exam Stress: A Wellbeing Guide for Candidates',
    date: '20 March 2025',
    tag: 'Candidate Support',
    image: '/images/student-studying.webp',
    summary:
      'High-stakes exams take a toll. A sustainable revision routine and good support protect both your wellbeing and your performance.',
    body: [
      'Preparing for a high-stakes licensing assessment is demanding, and looking after your wellbeing is part of preparing well — not a distraction from it. Sustained, moderate study with regular breaks consistently outperforms long, exhausting sessions.',
      'Practical steps make a measurable difference: a realistic timetable with rest days, protected sleep, physical activity, and staying connected with peers who understand the pressure. Active-recall study in shorter focused blocks also reduces the fatigue that comes from passive re-reading.',
      'If stress becomes overwhelming, reach out early — to your medical school’s support services, your GP, or trusted colleagues. Seeking help is a sign of professionalism, and processes such as reasonable adjustments and mitigating circumstances exist precisely because candidates are human.'
    ],
    link: { to: '/appeals-and-resits', label: 'Support, adjustments & resits →' }
  },
  {
    slug: 'img-pathway-epic-english-requirements',
    title: 'The IMG Pathway: EPIC Verification and English Requirements',
    date: '5 March 2025',
    tag: 'IMG Pathway',
    image: '/images/doctor-portrait.webp',
    summary:
      'Before sitting PLAB, international graduates must verify their qualification and meet English-language standards. Here is how those steps fit together.',
    body: [
      'For international medical graduates (IMGs), registration with the GMC involves more than passing an exam. Two foundational steps usually come first: verifying your primary medical qualification, and demonstrating the required standard of English.',
      'Primary-source verification is commonly handled through ECFMG’s EPIC service, which confirms your medical degree directly with the issuing institution. Starting this early is wise, as verification can take time and is needed for your GMC application.',
      'English-language competence is typically evidenced through an approved test such as IELTS (Academic) or OET at the scores the GMC specifies, or via other accepted routes. Because exact requirements and accepted evidence are periodically updated, always confirm the current criteria on the GMC website before booking anything.'
    ],
    link: { to: '/registration-guide', label: 'Full GMC registration guide →' }
  },
  {
    slug: 'gmc-registration-step-by-step',
    title: 'GMC Registration for IMGs: A Step-by-Step Overview',
    date: '18 February 2025',
    tag: 'Fees & Registration',
    image: '/gallery/images.jpg',
    summary:
      'From qualification verification to your licence to practise, the IMG registration journey has several stages. We map them out at a high level.',
    body: [
      'The route to GMC registration for international medical graduates runs through a sequence of stages rather than a single application. While individual circumstances vary, the typical journey includes credential verification, evidence of English proficiency, the PLAB 1 and PLAB 2 assessments, and finally the application for registration with a licence to practise.',
      'PLAB is now built around the MLA Content Map, so it assesses the same core standard of safe practice expected of UK graduates. Passing both parts is a central milestone, but it sits within the wider registration process rather than completing it on its own.',
      'Because timelines, fees, and document requirements are set by the GMC and can change, the most reliable approach is to build your plan around the official guidance and give each stage — particularly verification — plenty of lead time.'
    ],
    link: { to: '/registration-guide', label: 'Step-by-step registration guide →' }
  },
  {
    slug: 'practical-procedures-content-map',
    title: 'Practical Procedures in the MLA Content Map: What You Must Be Able to Do',
    date: '30 January 2025',
    tag: 'Syllabus Update',
    image: '/images/study-materials.webp',
    summary:
      'Alongside knowledge and behaviours, the Content Map lists practical procedures every new doctor should be able to perform safely.',
    body: [
      'One of the four pillars of the GMC MLA Content Map is Practical Skills and Procedures — the hands-on competencies a doctor is expected to perform safely at the point of registration. These range from venepuncture and cannulation to performing and interpreting an ECG.',
      'In the CPSA, procedural stations assess not just technical execution but the safety steps around it: consent, hand hygiene, correct equipment, patient comfort, and appropriate disposal of sharps. A technically adequate procedure performed unsafely will not score well.',
      'The practical implication for revision is to rehearse procedures end to end, including the communication and safety framing, rather than treating them as isolated technical tasks. The Content Map is the definitive list of what may be assessed.'
    ],
    link: { to: '/syllabus', label: 'Explore the Content Map →' }
  },
  {
    slug: 'cpsa-borderline-regression-scoring',
    title: 'How the CPSA is Scored: Borderline Regression Explained',
    date: '12 December 2024',
    tag: 'Results & Data',
    image: '/images/study-materials.webp',
    summary:
      'Like the AKT, the clinical exam is not scored on a fixed percentage. We explain borderline regression and what it means for candidates.',
    body: [
      'The Clinical and Professional Skills Assessment (CPSA) is standard-set rather than marked against a fixed percentage. A widely used method for OSCE-style exams is borderline regression, which combines a detailed checklist score with an examiner’s global judgement of performance at each station.',
      'In borderline regression, the relationship between checklist scores and global ratings across all candidates is used to derive the passing standard for each station. This rewards genuinely competent performance and reduces the impact of any single unusually easy or hard station.',
      'For candidates, the takeaway mirrors the AKT: focus on demonstrating safe, structured, patient-centred practice at every station rather than chasing a particular number. Consistency across the circuit matters more than a single standout station.'
    ],
    link: { to: '/results-and-scoring', label: 'How UKMLA results are scored →' }
  },
  {
    slug: 'akt-structure-timing',
    title: 'Inside the AKT: Question Numbers, Timing and On-Screen Tools',
    date: '20 November 2024',
    tag: 'Exam Format',
    image: '/images/study-materials.webp',
    summary:
      'How many questions, how long, and what tools are on screen? A practical look at the mechanics of the written paper.',
    body: [
      'The Applied Knowledge Test (AKT) is a computer-based exam of Single Best Answer questions delivered over timed sessions. Candidates work through clinical vignettes on screen, with navigation tools that allow you to flag items for review and move between questions.',
      'Time management is a skill in itself: with a fixed number of questions per session, a steady pace that leaves a margin for flagged items at the end tends to work better than lingering on early questions. Familiarising yourself with the on-screen interface in advance avoids losing time to unfamiliar controls.',
      'Exact question counts and session timings are published by the GMC, and by your medical school for the MS AKT route, so confirm the current figures for your sitting. Practising under realistic timed conditions is the best way to build the pacing the AKT demands.'
    ],
    link: { to: '/exam-pattern/akt', label: 'Full AKT guide →' }
  },
  {
    slug: 'six-month-study-plan',
    title: 'A Six-Month UKMLA Study Plan You Can Actually Follow',
    date: '8 October 2024',
    tag: 'Preparation',
    image: '/images/student-studying.webp',
    summary:
      'A realistic phased plan — foundations, focused practice, and consolidation — that balances the AKT and CPSA without burnout.',
    body: [
      'A six-month runway is a common and realistic window for UKMLA preparation. A phased structure helps: spend the early months building broad coverage against the Content Map, the middle months on intensive question practice and clinical skills rehearsal, and the final weeks on consolidation and timed mocks.',
      'Throughout, treat the AKT and CPSA as complementary rather than separate. The knowledge you build for the written paper underpins your clinical stations, and practising consultations reinforces the reasoning the AKT tests. Weekly review of weak areas keeps the plan honest.',
      'Build in rest days and keep the plan flexible — placements, life, and energy levels fluctuate. A plan you can sustain for six months beats an ambitious schedule you abandon in week three.'
    ],
    link: { to: '/preparation', label: 'Full preparation guide →' }
  },
  {
    slug: 'ukmla-rollout-history',
    title: 'How the UKMLA Came to Be: A Short History of the Rollout',
    date: '15 September 2024',
    tag: 'Milestone',
    image: '/images/hero-doctors.webp',
    summary:
      'The UKMLA did not appear overnight. We trace the path from proposal to a shared national licensing standard.',
    body: [
      'The idea of a single, shared licensing assessment for UK medical practice developed over several years, driven by a desire for a consistent national standard across the many UK medical schools and for parity with international graduates sitting PLAB.',
      'Following consultation and a phased development of the MLA Content Map, the assessment moved through pilot and preparation stages before becoming a requirement for graduating cohorts from the 2024–25 academic year. PLAB was realigned to the same blueprint so both routes share one standard.',
      'Understanding this history is more than trivia: it explains why the Content Map — rather than any single textbook — is the definitive reference, and why "safe day-one practice" is the consistent theme running through every part of the assessment.'
    ],
    link: { to: '/key-dates', label: 'Key dates & timeline →' }
  }
];

// Unique topics for the filter bar (in first-appearance order), with "All" first.
const topics = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))];

function getSlugFromHash() {
  const h = (window.location.hash || '').replace('#', '');
  return posts.some((p) => p.slug === h) ? h : null;
}

export default function News() {
  const [activeSlug, setActiveSlug] = useState(getSlugFromHash);
  const [activeTopic, setActiveTopic] = useState('All');

  // Keep the view in sync with the URL hash so the browser back button works
  // and individual posts are deep-linkable (e.g. /news#gmc-fee-revisions-2026).
  useEffect(() => {
    const sync = () => setActiveSlug(getSlugFromHash());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const openPost = useCallback((slug) => {
    window.history.pushState(null, '', `#${slug}`);
    setActiveSlug(slug);
    window.scrollTo(0, 0);
  }, []);

  const closePost = useCallback(() => {
    window.history.pushState(null, '', window.location.pathname);
    setActiveSlug(null);
    window.scrollTo(0, 0);
  }, []);

  const activePost = posts.find((p) => p.slug === activeSlug);

  // ---- Full post view ----
  if (activePost) {
    return (
      <Layout>
        <article className="article-container post-full">
          <button className="post-back" onClick={closePost}>
            ← All posts
          </button>

          <p className="post-meta">
            {activePost.tag} · Posted on {activePost.date}
          </p>
          <h1 className="page-title post-full-title">{activePost.title}</h1>

          <figure className="content-figure post-hero">
            <div className="figure-media">
              <img src={activePost.image} alt={activePost.title} />
            </div>
          </figure>

          {activePost.body.map((para, i) => (
            <p key={i} className="post-body-para">
              {para}
            </p>
          ))}

          {activePost.link &&
            (activePost.link.to ? (
              <Link to={activePost.link.to} className="post-cta">
                {activePost.link.label}
              </Link>
            ) : (
              <a href={activePost.link.href} target="_blank" rel="noopener noreferrer" className="post-cta">
                {activePost.link.label}
              </a>
            ))}

          <p className="last-reviewed">Posted on {activePost.date}. Source: General Medical Council (GMC).</p>

          <div className="post-more">
            <h2 className="post-more-title">More posts</h2>
            <ul className="post-more-list">
              {posts
                .filter((p) => p.slug !== activePost.slug)
                .map((p) => (
                  <li key={p.slug}>
                    <button className="post-more-link" onClick={() => openPost(p.slug)}>
                      {p.title}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </article>
      </Layout>
    );
  }

  // ---- Posts index (title + summary only) ----
  const visiblePosts = activeTopic === 'All' ? posts : posts.filter((p) => p.tag === activeTopic);

  return (
    <Layout>
      <div className="posts-index">
        <header className="page-header">
          <h1 className="page-title">Posts</h1>
          <p className="page-summary">
            News, regulatory updates, and analysis on the UKMLA. Select a post to read it in full.
          </p>
        </header>

        <div className="post-filter" role="group" aria-label="Filter posts by topic">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`post-filter-btn ${activeTopic === topic ? 'active' : ''}`}
              aria-pressed={activeTopic === topic}
              onClick={() => setActiveTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>

        {visiblePosts.length === 0 ? (
          <p className="post-empty">No posts in this topic yet.</p>
        ) : (
          <ul className="post-grid">
            {visiblePosts.map((post) => (
              <li
                key={post.slug}
                className="post-card"
                role="button"
                tabIndex={0}
                onClick={() => openPost(post.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openPost(post.slug);
                  }
                }}
              >
                <div className="post-card-media">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span className="post-card-tag">{post.tag}</span>
                </div>
                <div className="post-card-body">
                  <p className="post-meta">{post.date}</p>
                  <h2 className="post-card-title">{post.title}</h2>
                  <p className="post-card-summary">{post.summary}</p>
                  <span className="post-read-more">Read post →</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
