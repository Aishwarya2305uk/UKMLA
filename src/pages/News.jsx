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
  }
];

function getSlugFromHash() {
  const h = (window.location.hash || '').replace('#', '');
  return posts.some((p) => p.slug === h) ? h : null;
}

export default function News() {
  const [activeSlug, setActiveSlug] = useState(getSlugFromHash);

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
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">Posts</h1>
            <p className="page-summary">
              News, regulatory updates, and analysis on the UKMLA. Select a post to read it in full.
            </p>
          </header>

          <ul className="post-list">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="post-list-item"
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
                <p className="post-meta">
                  {post.tag} · {post.date}
                </p>
                <h2 className="post-list-title">{post.title}</h2>
                <p className="post-list-summary">{post.summary}</p>
                <span className="post-read-more">Read post →</span>
              </li>
            ))}
          </ul>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/news" className="sidebar-link active">Posts</Link></li>
            <li><Link to="/key-dates" className="sidebar-link">Key Dates</Link></li>
            <li><Link to="/what-is-ukmla" className="sidebar-link">What is UKMLA?</Link></li>
            <li><Link to="/official-resources" className="sidebar-link">Official Resources</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
