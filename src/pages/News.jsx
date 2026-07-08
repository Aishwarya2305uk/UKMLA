import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

// Post bodies live as standalone files under /posts-html/{slug}.html (see
// SKILL.md §0/§12) — bundled at build time as raw strings, keyed by slug.
const postHtmlModules = import.meta.glob('../../posts-html/*.html', { eager: true, query: '?raw', import: 'default' });
const postHtmlBySlug = Object.fromEntries(
  Object.entries(postHtmlModules).map(([filePath, content]) => [
    filePath.split('/').pop().replace(/\.html$/, ''),
    content,
  ])
);

const posts = [
  {
    "slug": "ukmla-preparation-for-uk-final-year-students",
    "title": "How to Prepare for the UKMLA as a UK Final-Year Student",
    "date": "03 July 2026",
    "tag": "Preparation",
    "image": "/images/ukmla-preparation-for-uk-final-year-students-featured.webp",
    "summary": "A term-by-term timeline for UK final-year students sitting the UKMLA — balancing AKT, CPSA, dissertation, electives and Foundation Programme applications.",
    "seoTitle": "Prepare for UKMLA Final Year: A Student Timeline",
    "seoDescription": "How to prepare for UKMLA final year: a term-by-term timeline for UK medical students balancing AKT, CPSA, dissertation and electives.",
    "primaryKeyword": "UKMLA final year",
    "featuredImageKeyword": "UKMLA final year revision",
    "featuredImageUrl": "/images/ukmla-preparation-for-uk-final-year-students-featured.webp",
    "featuredImageTitle": "How to prepare for the UKMLA as a UK final-year student",
    "featuredImageAltText": "UK medical student revising for UKMLA final year exams in a university library",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "best-ukmla-question-banks-compared",
    "title": "Best Question Bank for UKMLA: The 2026 Head-to-Head Comparison",
    "date": "03 July 2026",
    "tag": "Preparation",
    "image": "/images/best-ukmla-question-banks-compared-featured.webp",
    "summary": "A head-to-head comparison of every major UKMLA question bank on price, question count, realism and who each one actually suits.",
    "seoTitle": "Best Question Bank for UKMLA: 2026 Comparison",
    "seoDescription": "Find the best question bank for UKMLA prep in 2026. We compare Quesmed, UWorld, Geeky Medics, MedRevisions, MLA Prep, iatroX and more on price and fit.",
    "primaryKeyword": "best question bank for UKMLA",
    "featuredImageKeyword": "best question bank for UKMLA",
    "featuredImageUrl": "/images/best-ukmla-question-banks-compared-featured.webp",
    "featuredImageTitle": "Best question bank for UKMLA - 2026 comparison",
    "featuredImageAltText": "Medical student comparing the best question bank for UKMLA on a laptop and phone",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "cost-of-gmc-registration-2026",
    "title": "Cost of GMC Registration 2026: Full Fee Breakdown",
    "date": "03 July 2026",
    "tag": "Fees & Funding",
    "image": "/images/cost-of-gmc-registration-2026-featured.webp",
    "summary": "The full 2026 cost of GMC registration — application fee, EPIC/MyIntealth verification, English test and hidden costs — kept separate from exam and retention fees.",
    "seoTitle": "Cost of GMC Registration 2026: Full Fee Breakdown",
    "seoDescription": "The cost of GMC registration 2026 is roughly £700-£1,400 all-in. See the exact fee table for application, EPIC verification, and English tests.",
    "primaryKeyword": "cost of GMC registration",
    "featuredImageKeyword": "cost of GMC registration",
    "featuredImageUrl": "/images/cost-of-gmc-registration-2026-featured.webp",
    "featuredImageTitle": "Cost of GMC registration 2026: the full fee breakdown",
    "featuredImageAltText": "Cost of GMC registration 2026 illustrated by a doctor reviewing fee documents",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/managing-your-registration/fees-and-funding/fees-for-doctors"
  },
  {
    "slug": "gmc-epic-verification-process-explained",
    "title": "GMC EPIC/MyIntealth Verification Process Explained",
    "date": "03 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/gmc-epic-verification-process-explained-featured.webp",
    "summary": "How GMC EPIC/MyIntealth primary source verification works — the steps, documents, timelines and what actually causes delays for every IMG.",
    "seoTitle": "GMC EPIC Verification Process Explained (2026)",
    "seoDescription": "GMC EPIC verification explained: how the MyIntealth/EPIC primary source check works, documents needed, timelines and delays for every IMG in 2026.",
    "primaryKeyword": "GMC EPIC verification",
    "featuredImageKeyword": "GMC EPIC verification",
    "featuredImageUrl": "/images/gmc-epic-verification-process-explained-featured.webp",
    "featuredImageTitle": "GMC EPIC/MyIntealth verification process for international medical graduates",
    "featuredImageAltText": "International medical graduate completing GMC EPIC MyIntealth verification documents",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-after-mbbs-in-india",
    "title": "UKMLA After MBBS in India: What to Do Next",
    "date": "03 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-after-mbbs-in-india-featured.webp",
    "summary": "A next-steps plan for Indian MBBS graduates weighing the UKMLA route against NEET PG — sequencing, EPIC verification timing and the first 90 days.",
    "seoTitle": "UKMLA After MBBS in India: What to Do Next",
    "seoDescription": "UKMLA after MBBS in India: your next-steps plan for NEET PG vs the UK route, EPIC verification timing, and what to do in the first 90 days.",
    "primaryKeyword": "UKMLA after MBBS in India",
    "featuredImageKeyword": "UKMLA after MBBS in India",
    "featuredImageUrl": "/images/ukmla-after-mbbs-in-india-featured.webp",
    "featuredImageTitle": "UKMLA after MBBS in India: what to do next",
    "featuredImageAltText": "Indian medical graduate planning next steps after MBBS for the UKMLA route",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-for-ethiopian-doctors",
    "title": "UKMLA for Ethiopian Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "03 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-ethiopian-doctors-featured.webp",
    "summary": "Eligibility from an Ethiopian MD degree, AKT/CPSA fees, MyIntealth verification and the step-by-step route to GMC registration.",
    "seoTitle": "UKMLA for Ethiopian Doctors: Fees & GMC Route",
    "seoDescription": "UKMLA for Ethiopian doctors: eligibility from MD degrees, AKT/CPSA fees, EFDA verification and the step-by-step route to GMC registration.",
    "primaryKeyword": "UKMLA for Ethiopian doctors",
    "featuredImageKeyword": "UKMLA for Ethiopian doctors",
    "featuredImageUrl": "/images/ukmla-for-ethiopian-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Ethiopian doctors: the route to GMC registration",
    "featuredImageAltText": "Ethiopian MD graduate reviewing UKMLA for Ethiopian doctors registration documents",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-ghanaian-doctors",
    "title": "UKMLA for Ghanaian Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "03 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-ghanaian-doctors-featured.webp",
    "summary": "Eligibility, AKT/CPSA fees, MDC Ghana housemanship rules and the step-by-step route to GMC registration for Ghanaian MBChB graduates.",
    "seoTitle": "UKMLA for Ghanaian Doctors: Fees & GMC Route",
    "seoDescription": "UKMLA for Ghanaian doctors: eligibility, AKT/CPSA fees, MDC Ghana housemanship rules and the step-by-step route to GMC registration.",
    "primaryKeyword": "UKMLA for Ghanaian doctors",
    "featuredImageKeyword": "UKMLA for Ghanaian doctors",
    "featuredImageUrl": "/images/ukmla-for-ghanaian-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Ghanaian doctors: eligibility, fees and GMC registration",
    "featuredImageAltText": "Ghanaian doctor reviewing UKMLA and GMC registration documents for the UK route",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-for-indian-doctors",
    "title": "UKMLA for Indian Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "03 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-indian-doctors-featured.webp",
    "summary": "Eligibility, AKT and CPSA fees in GBP and INR, EPIC verification, visas and the full route to GMC registration for Indian medical graduates.",
    "seoTitle": "UKMLA for Indian Doctors: Fees & GMC Route 2026",
    "seoDescription": "UKMLA for Indian doctors explained: eligibility, AKT & CPSA fees in GBP and INR, EPIC verification, visas and the full route to GMC registration.",
    "primaryKeyword": "UKMLA for Indian doctors",
    "featuredImageKeyword": "UKMLA for Indian doctors",
    "featuredImageUrl": "/images/ukmla-for-indian-doctors-featured.webp",
    "featuredImageTitle": "Preparing for the UKMLA as an Indian doctor",
    "featuredImageAltText": "Indian doctor preparing for the UKMLA in a UK hospital corridor",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-for-malaysian-doctors",
    "title": "UKMLA for Malaysian Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "03 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-malaysian-doctors-featured.webp",
    "summary": "Eligibility, AKT/CPSA fees, MMC housemanship rules and how the UK route compares with Australia and Singapore for Malaysian MBBS graduates.",
    "seoTitle": "UKMLA for Malaysian Doctors: Fees & GMC Route",
    "seoDescription": "UKMLA for Malaysian doctors: eligibility, AKT/CPSA fees, MMC housemanship rules, EPIC verification and the full route to GMC registration.",
    "primaryKeyword": "UKMLA for Malaysian doctors",
    "featuredImageKeyword": "UKMLA for Malaysian doctors",
    "featuredImageUrl": "/images/ukmla-for-malaysian-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Malaysian doctors: eligibility, fees and GMC registration",
    "featuredImageAltText": "Malaysian MBBS doctor preparing for the UKMLA and GMC registration route to the UK",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-for-nepali-doctors",
    "title": "UKMLA for Nepali Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "03 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-nepali-doctors-featured.webp",
    "summary": "Eligibility, AKT and CPSA fees in GBP and NPR, EPIC verification and the full route to GMC registration for Nepali MBBS graduates.",
    "seoTitle": "UKMLA for Nepali Doctors: Fees & GMC Route 2026",
    "seoDescription": "UKMLA for Nepali doctors explained: eligibility, AKT & CPSA fees in GBP and NPR, EPIC verification, visas and the full route to GMC registration.",
    "primaryKeyword": "UKMLA for Nepali doctors",
    "featuredImageKeyword": "UKMLA for Nepali doctors",
    "featuredImageUrl": "/images/ukmla-for-nepali-doctors-featured.webp",
    "featuredImageTitle": "Preparing for the UKMLA as a Nepali doctor",
    "featuredImageAltText": "Nepali doctor preparing for the UKMLA in a UK hospital corridor",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-for-sudanese-doctors",
    "title": "UKMLA for Sudanese Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "03 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-sudanese-doctors-featured.webp",
    "summary": "Eligibility, AKT/CPSA fees, EPIC/MyIntealth verification and the GMC registration route for Sudanese doctors, including support for displaced doctors.",
    "seoTitle": "UKMLA for Sudanese Doctors: Fees & GMC Route",
    "seoDescription": "UKMLA for Sudanese doctors: eligibility, AKT/CPSA fees and the GMC registration route, including options for displaced doctors.",
    "primaryKeyword": "UKMLA for Sudanese doctors",
    "featuredImageKeyword": "UKMLA for Sudanese doctors",
    "featuredImageUrl": "/images/ukmla-for-sudanese-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Sudanese doctors: the route to GMC registration",
    "featuredImageAltText": "Sudanese doctor reviewing UKMLA registration documents for GMC application",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-zimbabwean-doctors",
    "title": "UKMLA for Zimbabwean Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "03 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-zimbabwean-doctors-featured.webp",
    "summary": "MDPCZ registration, AKT and CPSA fees, EPIC/MyIntealth verification and the route to GMC registration for Zimbabwean MBChB graduates.",
    "seoTitle": "UKMLA for Zimbabwean Doctors: Fees & GMC Route",
    "seoDescription": "UKMLA for Zimbabwean doctors explained: MDPCZ registration, AKT & CPSA fees, EPIC/MyIntealth verification, visas and the route to GMC registration.",
    "primaryKeyword": "UKMLA for Zimbabwean doctors",
    "featuredImageKeyword": "UKMLA for Zimbabwean doctors",
    "featuredImageUrl": "/images/ukmla-for-zimbabwean-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Zimbabwean doctors: the route to GMC registration",
    "featuredImageAltText": "Zimbabwean doctor reviewing UKMLA registration documents in a UK hospital setting",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-fees-explained",
    "title": "UKMLA Fees: The Complete 2026 Cost Breakdown",
    "date": "30 June 2026",
    "tag": "Fees & Funding",
    "image": "/images/ukmla-fees-explained-featured.webp",
    "summary": "How much does the UKMLA cost in 2026? A clear breakdown of UKMLA fees for UK students and IMGs — AKT, CPSA, registration, hidden costs, and local-currency figures.",
    "seoTitle": "UKMLA Fees: The Complete 2026 Cost Breakdown",
    "seoDescription": "UKMLA fees explained for 2026: AKT, CPSA and GMC registration costs for IMGs, what UK students pay, hidden costs, and figures in your local currency.",
    "primaryKeyword": "UKMLA fees",
    "featuredImageKeyword": "UKMLA fees exam cost desk",
    "featuredImageUrl": "/images/ukmla-fees-explained-featured.webp",
    "featuredImageTitle": "UKMLA fees and exam costs for 2026",
    "featuredImageAltText": "UKMLA fees concept - stethoscope, calculator and British pound notes showing UKMLA exam costs",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab/fees-for-plab"
  },
  {
    "slug": "what-is-ukmla-complete-guide",
    "title": "What Is the UKMLA? A Complete Beginner's Guide",
    "date": "30 June 2026",
    "tag": "Getting Started",
    "image": "/images/what-is-ukmla-complete-guide-featured.webp",
    "summary": "New to the UK Medical Licensing Assessment? This guide explains what the UKMLA is, who needs to sit it, and how it works from start to finish.",
    "seoTitle": "What Is the UKMLA? A Complete Beginner's Guide",
    "seoDescription": "Not sure what the UKMLA is? Our beginner's guide explains the UK Medical Licensing Assessment, who must sit it, and exactly how it works.",
    "primaryKeyword": "what is UKMLA",
    "featuredImageKeyword": "Getting Started",
    "featuredImageUrl": "/images/what-is-ukmla-complete-guide-featured.webp",
    "featuredImageTitle": "What Is the UKMLA? A Complete Beginner's Guide Featured Image",
    "featuredImageAltText": "what is UKMLA - A Complete Beginner's Guide to the UK Medical Licensing Assessment",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "mla-content-map-explained",
    "title": "MLA Content Map: The Blueprint Behind Every UKMLA Question",
    "date": "30 June 2026",
    "tag": "Syllabus Update",
    "image": "/images/mla-content-map-explained-featured.webp",
    "summary": "Every AKT question and CPSA station is written against the MLA Content Map. Here is what the map contains and how to use it as your primary revision guide.",
    "seoTitle": "MLA Content Map: The Blueprint Behind Every UKMLA Question",
    "seoDescription": "The MLA Content Map is the official blueprint for all UKMLA questions. Learn what it contains, how it is structured, and how to use it for revision.",
    "primaryKeyword": "MLA content map",
    "featuredImageKeyword": "Syllabus Update",
    "featuredImageUrl": "/images/mla-content-map-explained-featured.webp",
    "featuredImageTitle": "MLA Content Map: The Blueprint Behind Every UKMLA Question Featured Image",
    "featuredImageAltText": "MLA content map - The Blueprint Behind Every UKMLA Question",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "ukmla-akt-format-preparation",
    "title": "UKMLA AKT: Format, Question Types, and How to Prepare",
    "date": "30 June 2026",
    "tag": "Exam Format",
    "image": "/images/ukmla-akt-format-preparation-featured.webp",
    "summary": "A detailed look at what the Applied Knowledge Test involves — its structure, question style, timing, and the most effective strategies for preparation.",
    "seoTitle": "UKMLA AKT: Format, Question Types, and How to Prepare",
    "seoDescription": "Everything you need to know about the UKMLA AKT — format, Single Best Answer question style, timing, and the best strategies to prepare effectively.",
    "primaryKeyword": "UKMLA AKT",
    "featuredImageKeyword": "Exam Format",
    "featuredImageUrl": "/images/ukmla-akt-format-preparation-featured.webp",
    "featuredImageTitle": "UKMLA AKT: Format, Question Types, and How to Prepare Featured Image",
    "featuredImageAltText": "UKMLA AKT - Format, Question Types, and Preparation Strategies",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-cpsa-what-it-tests",
    "title": "UKMLA CPSA: What the Clinical Exam Really Tests",
    "date": "30 June 2026",
    "tag": "Exam Format",
    "image": "/images/ukmla-cpsa-what-it-tests-featured.webp",
    "summary": "The CPSA goes beyond clinical knowledge to assess how you communicate, examine, and perform under real conditions. Here is what examiners are actually looking for.",
    "seoTitle": "UKMLA CPSA: What the Clinical Exam Really Tests",
    "seoDescription": "The UKMLA CPSA tests more than clinical knowledge. Discover what examiners look for in history taking, examinations, procedures, and communication stations.",
    "primaryKeyword": "UKMLA CPSA",
    "featuredImageKeyword": "Exam Format",
    "featuredImageUrl": "/images/ukmla-cpsa-what-it-tests-featured.webp",
    "featuredImageTitle": "UKMLA CPSA: What the Clinical Exam Really Tests Featured Image",
    "featuredImageAltText": "UKMLA CPSA - What the Clinical Exam Really Tests and Assesses",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-vs-plab-difference",
    "title": "UKMLA vs PLAB: What Is the Difference?",
    "date": "30 June 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-vs-plab-difference-featured.webp",
    "summary": "Confused about UKMLA and PLAB? Both lead to GMC registration but follow different routes. This guide clarifies who sits which exam and what changed.",
    "seoTitle": "UKMLA vs PLAB: Key Differences Explained for IMGs",
    "seoDescription": "Unsure about UKMLA vs PLAB? Both share the same MLA Content Map standard. We explain who sits each route, key differences, and what changed from 2024.",
    "primaryKeyword": "UKMLA vs PLAB",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/ukmla-vs-plab-difference-featured.webp",
    "featuredImageTitle": "UKMLA vs PLAB: What Is the Difference? Featured Image",
    "featuredImageAltText": "UKMLA vs PLAB - Key Differences for International Medical Graduates",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab"
  },
  {
    "slug": "ukmla-eligibility-who-can-sit",
    "title": "UKMLA Eligibility: Who Can Sit the Exam?",
    "date": "30 June 2026",
    "tag": "Getting Started",
    "image": "/images/ukmla-eligibility-who-can-sit-featured.webp",
    "summary": "Not everyone sits the UKMLA through the same route. This guide clarifies eligibility criteria for UK medical students and international medical graduates.",
    "seoTitle": "UKMLA Eligibility: Who Can Sit the Exam and How",
    "seoDescription": "Understand UKMLA eligibility for UK students and IMGs. Find out which route applies to you, what pre-requisites you need, and how to register.",
    "primaryKeyword": "UKMLA eligibility",
    "featuredImageKeyword": "Getting Started",
    "featuredImageUrl": "/images/ukmla-eligibility-who-can-sit-featured.webp",
    "featuredImageTitle": "UKMLA Eligibility: Who Can Sit the Exam? Featured Image",
    "featuredImageAltText": "UKMLA eligibility - Who Can Sit the UKMLA and Through Which Route",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-key-dates-sitting-schedule",
    "title": "UKMLA Key Dates and Sitting Schedule: What to Know",
    "date": "30 June 2026",
    "tag": "Getting Started",
    "image": "/images/ukmla-key-dates-sitting-schedule-featured.webp",
    "summary": "Planning your UKMLA preparation begins with knowing the key dates. Here is how the sitting schedule works for UK students and IMGs.",
    "seoTitle": "UKMLA Key Dates and Sitting Schedule 2025–2026",
    "seoDescription": "Plan your UKMLA preparation around key dates and the sitting schedule. We explain how UK students and IMGs book their AKT and CPSA sittings.",
    "primaryKeyword": "UKMLA key dates",
    "featuredImageKeyword": "Getting Started",
    "featuredImageUrl": "/images/ukmla-key-dates-sitting-schedule-featured.webp",
    "featuredImageTitle": "UKMLA Key Dates and Sitting Schedule Featured Image",
    "featuredImageAltText": "UKMLA key dates - Sitting Schedule for UK Students and IMGs",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "how-to-register-plab-1",
    "title": "How to Register for PLAB 1: A Step-by-Step Guide for IMGs",
    "date": "30 June 2026",
    "tag": "IMG Pathway",
    "image": "/images/how-to-register-plab-1-featured.webp",
    "summary": "Booking your PLAB 1 sitting involves several steps before you reach the checkout. This guide walks IMGs through the registration process from start to finish.",
    "seoTitle": "How to Register for PLAB 1: Step-by-Step for IMGs",
    "seoDescription": "Ready to book PLAB 1? This step-by-step guide walks international medical graduates through the PLAB 1 registration process, documents needed, and key tips.",
    "primaryKeyword": "how to register for PLAB 1",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/how-to-register-plab-1-featured.webp",
    "featuredImageTitle": "How to Register for PLAB 1: A Step-by-Step Guide Featured Image",
    "featuredImageAltText": "how to register for PLAB 1 - Step-by-Step Guide for International Medical Graduates",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab"
  },
  {
    "slug": "plab-2-preparation-guide",
    "title": "PLAB 2 Preparation: How to Excel in the Clinical Assessment",
    "date": "30 June 2026",
    "tag": "IMG Pathway",
    "image": "/images/plab-2-preparation-guide-featured.webp",
    "summary": "PLAB 2 is the clinical assessment for IMGs. Here is a practical, evidence-based preparation guide covering station types, communication, and practice strategies.",
    "seoTitle": "PLAB 2 Preparation Guide: How to Excel in the Clinical Exam",
    "seoDescription": "Preparing for PLAB 2? Our practical guide covers what to expect in each station type, how examiners score performance, and the best preparation strategies.",
    "primaryKeyword": "PLAB 2 preparation",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/plab-2-preparation-guide-featured.webp",
    "featuredImageTitle": "PLAB 2 Preparation Guide Featured Image",
    "featuredImageAltText": "PLAB 2 preparation - How to Excel in the Clinical Assessment for IMGs",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab"
  },
  {
    "slug": "ukmla-resits-rules-limits",
    "title": "UKMLA Resits: Rules, Limits, and How to Bounce Back",
    "date": "30 June 2026",
    "tag": "Candidate Support",
    "image": "/images/ukmla-resits-rules-limits-featured.webp",
    "summary": "Failing a UKMLA component is not the end of the road. Here is what you need to know about resit rules, attempt limits, and building an effective comeback plan.",
    "seoTitle": "UKMLA Resits: Rules, Attempt Limits, and Comeback Strategies",
    "seoDescription": "Failed the UKMLA AKT or CPSA? Our guide covers resit rules, attempt limits, mitigating circumstances, and the most effective strategies for bouncing back.",
    "primaryKeyword": "UKMLA resits",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/ukmla-resits-rules-limits-featured.webp",
    "featuredImageTitle": "UKMLA Resits: Rules, Limits, and How to Bounce Back Featured Image",
    "featuredImageAltText": "UKMLA resits - Rules, Attempt Limits, and Comeback Strategies",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "how-to-read-akt-stem",
    "title": "How to Read an AKT Stem: Avoiding Common Traps",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/how-to-read-akt-stem-featured.webp",
    "summary": "The way you read an SBA question stem has a measurable impact on your score. Here are the techniques experienced candidates use to extract information quickly and accurately.",
    "seoTitle": "How to Read an AKT Stem: Avoid Common UKMLA Traps",
    "seoDescription": "Learn how to read AKT question stems efficiently. These evidence-based techniques help UKMLA candidates extract key information and avoid common SBA traps.",
    "primaryKeyword": "how to read AKT stem",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/how-to-read-akt-stem-featured.webp",
    "featuredImageTitle": "How to Read an AKT Stem: Avoiding Common Traps Featured Image",
    "featuredImageAltText": "how to read AKT stem - Techniques to Avoid Common UKMLA SBA Traps",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "nice-guidelines-akt-revision",
    "title": "NICE Guidelines and the AKT: What You Actually Need to Know",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/nice-guidelines-akt-revision-featured.webp",
    "summary": "NICE guidance drives many AKT answers. Rather than memorising every guideline, here is how to prioritise and use NICE effectively in your revision.",
    "seoTitle": "NICE Guidelines and the AKT: What to Prioritise for UKMLA",
    "seoDescription": "NICE guidelines underpin many UKMLA AKT answers. Learn which NICE pathways to prioritise, how to use them in revision, and avoid common guideline-based traps.",
    "primaryKeyword": "NICE guidelines AKT",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/nice-guidelines-akt-revision-featured.webp",
    "featuredImageTitle": "NICE Guidelines and the AKT: What You Actually Need to Know Featured Image",
    "featuredImageAltText": "NICE guidelines AKT - What to Prioritise for UKMLA Revision",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "mental-health-ukmla-revision",
    "title": "Mental Health Presentations in the UKMLA: What to Revise",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/mental-health-ukmla-revision-featured.webp",
    "summary": "Mental health is a significant domain in the MLA Content Map. Here is a focused guide to the presentations, conditions, and management principles most likely to appear.",
    "seoTitle": "Mental Health Presentations in the UKMLA: Revision Guide",
    "seoDescription": "Mental health is a core UKMLA domain. Our revision guide covers the key presentations, conditions, management principles, and legal frameworks you need to know.",
    "primaryKeyword": "mental health UKMLA",
    "featuredImageKeyword": "mental health psychiatry revision",
    "featuredImageUrl": "/images/mental-health-ukmla-revision-featured.webp",
    "featuredImageTitle": "Mental Health Presentations in the UKMLA: Revision Guide Featured Image",
    "featuredImageAltText": "mental health UKMLA - Key Presentations and Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "paediatrics-ukmla-revision",
    "title": "Paediatrics in the AKT and CPSA: A Focused Revision Guide",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/paediatrics-ukmla-revision-featured.webp",
    "summary": "Paediatric presentations appear across both UKMLA components. Here are the highest-yield conditions, red flags, and safeguarding principles to know.",
    "seoTitle": "Paediatrics in the UKMLA: AKT and CPSA Revision Guide",
    "seoDescription": "Paediatric presentations appear throughout the UKMLA. Our focused revision guide covers key conditions, red flags, developmental milestones, and safeguarding.",
    "primaryKeyword": "paediatrics UKMLA",
    "featuredImageKeyword": "paediatrics child health revision",
    "featuredImageUrl": "/images/paediatrics-ukmla-revision-featured.webp",
    "featuredImageTitle": "Paediatrics in the AKT and CPSA: Revision Guide Featured Image",
    "featuredImageAltText": "paediatrics UKMLA - Key Conditions and Safeguarding for AKT and CPSA",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "emergency-medicine-ukmla-revision",
    "title": "Emergency Medicine and Acute Presentations in the UKMLA",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/emergency-medicine-ukmla-revision-featured.webp",
    "summary": "Acute and emergency presentations are heavily represented in the UKMLA. This guide covers the highest-yield scenarios and the management frameworks that score marks.",
    "seoTitle": "Emergency Medicine in the UKMLA: High-Yield Revision Guide",
    "seoDescription": "Acute presentations are heavily tested in the UKMLA AKT and CPSA. Our guide covers ABCDE, sepsis, anaphylaxis, chest pain, and the scenarios that score most marks.",
    "primaryKeyword": "emergency medicine UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/emergency-medicine-ukmla-revision-featured.webp",
    "featuredImageTitle": "Emergency Medicine and Acute Presentations in the UKMLA Featured Image",
    "featuredImageAltText": "emergency medicine UKMLA - ABCDE and High-Yield Acute Presentations",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "radiology-imaging-akt-ukmla",
    "title": "Radiology and Imaging Interpretation in the AKT",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/radiology-imaging-akt-ukmla-featured.webp",
    "summary": "The AKT includes data interpretation questions involving X-rays, CT findings, and other imaging. Here is what Foundation-level interpretation skills you need.",
    "seoTitle": "Radiology and Imaging in the UKMLA AKT: What You Need to Know",
    "seoDescription": "Imaging interpretation appears in the UKMLA AKT. Learn which radiology skills are tested at foundation level, how to approach chest X-rays, and common findings.",
    "primaryKeyword": "radiology AKT UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/radiology-imaging-akt-ukmla-featured.webp",
    "featuredImageTitle": "Radiology and Imaging Interpretation in the AKT Featured Image",
    "featuredImageAltText": "radiology AKT UKMLA - Chest X-Ray and Imaging Interpretation Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "ecg-interpretation-ukmla",
    "title": "ECG Interpretation for the UKMLA: The Findings You Must Recognise",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/ecg-interpretation-ukmla-featured.webp",
    "summary": "ECG reading is a core UKMLA practical skill. Here is a systematic approach and the specific findings that appear most often in the AKT and CPSA.",
    "seoTitle": "ECG Interpretation for the UKMLA: Key Findings and How to Read Them",
    "seoDescription": "ECG interpretation is a core UKMLA skill. Learn the systematic approach and the specific ECG findings that appear in the AKT and CPSA stations.",
    "primaryKeyword": "ECG interpretation UKMLA",
    "featuredImageKeyword": "ECG interpretation cardiology",
    "featuredImageUrl": "/images/ecg-interpretation-ukmla-featured.webp",
    "featuredImageTitle": "ECG Interpretation for the UKMLA Featured Image",
    "featuredImageAltText": "ECG interpretation UKMLA - Key Findings and Systematic Reading Approach",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "good-medical-practice-ukmla",
    "title": "Good Medical Practice and the UKMLA: What the GMC Expects",
    "date": "30 June 2026",
    "tag": "Exam Format",
    "image": "/images/good-medical-practice-ukmla-featured.webp",
    "summary": "Good Medical Practice is the ethical and professional framework underpinning the entire UKMLA. Here is how it maps to exam questions and CPSA scenarios.",
    "seoTitle": "Good Medical Practice and the UKMLA: GMC Professional Standards",
    "seoDescription": "Good Medical Practice underpins every UKMLA question involving professionalism and ethics. Learn how the GMC framework maps to AKT questions and CPSA scenarios.",
    "primaryKeyword": "Good Medical Practice UKMLA",
    "featuredImageKeyword": "Exam Format",
    "featuredImageUrl": "/images/good-medical-practice-ukmla-featured.webp",
    "featuredImageTitle": "Good Medical Practice and the UKMLA Featured Image",
    "featuredImageAltText": "Good Medical Practice UKMLA - GMC Professional Standards and Exam Application",
    "sourceFullUrl": "https://www.gmc-uk.org/professional-standards/professional-standards-for-doctors/good-medical-practice"
  },
  {
    "slug": "safeguarding-ukmla-revision",
    "title": "Safeguarding Adults and Children: A UKMLA Revision Guide",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/safeguarding-ukmla-revision-featured.webp",
    "summary": "Safeguarding questions appear in both UKMLA components. Here is what you need to know about recognising abuse, escalation pathways, and legal duties.",
    "seoTitle": "Safeguarding Adults and Children: UKMLA Revision Guide",
    "seoDescription": "Safeguarding is a core UKMLA domain. Learn how to recognise abuse, understand escalation pathways, and apply legal duties in AKT questions and CPSA scenarios.",
    "primaryKeyword": "safeguarding UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/safeguarding-ukmla-revision-featured.webp",
    "featuredImageTitle": "Safeguarding Adults and Children: UKMLA Revision Guide Featured Image",
    "featuredImageAltText": "safeguarding UKMLA - Recognising Abuse and Escalation Pathways",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "ukmla-revision-notes-strategy",
    "title": "How to Write UKMLA Revision Notes That Actually Work",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/ukmla-revision-notes-strategy-featured.webp",
    "summary": "Not all revision notes are equally effective. Here is how to structure UKMLA notes using active recall principles and the MLA Content Map as your scaffold.",
    "seoTitle": "How to Write UKMLA Revision Notes That Actually Work",
    "seoDescription": "Effective UKMLA revision notes are built on active recall, not passive re-reading. Learn how to structure notes around the MLA Content Map for maximum retention.",
    "primaryKeyword": "UKMLA revision notes",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/ukmla-revision-notes-strategy-featured.webp",
    "featuredImageTitle": "How to Write UKMLA Revision Notes That Actually Work Featured Image",
    "featuredImageAltText": "UKMLA revision notes - Active Recall Strategy for AKT and CPSA",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "mock-exams-ukmla-preparation",
    "title": "The Role of Mock Exams in UKMLA Preparation",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/mock-exams-ukmla-preparation-featured.webp",
    "summary": "Mock exams do more than measure progress — they actively improve performance. Here is how to use mocks strategically as part of your UKMLA revision plan.",
    "seoTitle": "Mock Exams in UKMLA Preparation: How to Use Them Strategically",
    "seoDescription": "Mock exams are one of the most effective UKMLA preparation tools. Learn when to sit mocks, how to analyse results, and how to use them to close your weakest gaps.",
    "primaryKeyword": "UKMLA mock exams",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/mock-exams-ukmla-preparation-featured.webp",
    "featuredImageTitle": "The Role of Mock Exams in UKMLA Preparation Featured Image",
    "featuredImageAltText": "UKMLA mock exams - How to Use Them Strategically for AKT and CPSA",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "foundation-programme-after-ukmla",
    "title": "Understanding the Foundation Programme: What Awaits After the UKMLA",
    "date": "30 June 2026",
    "tag": "Getting Started",
    "image": "/images/foundation-programme-after-ukmla-featured.webp",
    "summary": "Passing the UKMLA opens the door to the Foundation Programme. Here is what FY1 and FY2 involve and how the UKMLA competencies connect to day-one foundation practice.",
    "seoTitle": "The Foundation Programme After UKMLA: What FY1 and FY2 Involve",
    "seoDescription": "What happens after you pass the UKMLA? Learn about the Foundation Programme, how FY1 and FY2 build on UKMLA competencies, and what to expect as a new doctor.",
    "primaryKeyword": "Foundation Programme after UKMLA",
    "featuredImageKeyword": "Getting Started",
    "featuredImageUrl": "/images/foundation-programme-after-ukmla-featured.webp",
    "featuredImageTitle": "Understanding the Foundation Programme After UKMLA Featured Image",
    "featuredImageAltText": "Foundation Programme after UKMLA - What FY1 and FY2 Involve for New Doctors",
    "sourceFullUrl": "https://www.gmc-uk.org/"
  },
  {
    "slug": "cardiology-ukmla-akt-revision",
    "title": "Cardiology High-Yield Topics for the UKMLA AKT",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/cardiology-ukmla-akt-revision-featured.webp",
    "summary": "Cardiovascular presentations dominate the AKT. Here is a focused guide to the highest-yield cardiology conditions, investigations, and management steps.",
    "seoTitle": "Cardiology High-Yield Topics for the UKMLA AKT",
    "seoDescription": "Cardiovascular conditions are heavily tested in the UKMLA AKT. Our revision guide covers ACS, heart failure, AF, hypertension, and the NICE guidelines you must know.",
    "primaryKeyword": "cardiology UKMLA AKT",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/cardiology-ukmla-akt-revision-featured.webp",
    "featuredImageTitle": "Cardiology High-Yield Topics for the UKMLA AKT Featured Image",
    "featuredImageAltText": "cardiology UKMLA AKT - High-Yield Topics and NICE Guidelines",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "respiratory-medicine-ukmla-revision",
    "title": "Respiratory Medicine for the UKMLA: What to Focus On",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/respiratory-medicine-ukmla-revision-featured.webp",
    "summary": "Respiratory presentations are a core UKMLA domain. Here is a targeted guide to asthma, COPD, pneumonia, PE, and the investigations that discriminate between them.",
    "seoTitle": "Respiratory Medicine for the UKMLA: High-Yield Revision Guide",
    "seoDescription": "Respiratory presentations are heavily tested in the UKMLA. Our revision guide covers asthma, COPD, pneumonia, pulmonary embolism, and the investigations that matter.",
    "primaryKeyword": "respiratory medicine UKMLA",
    "featuredImageKeyword": "respiratory medicine lungs revision",
    "featuredImageUrl": "/images/respiratory-medicine-ukmla-revision-featured.webp",
    "featuredImageTitle": "Respiratory Medicine for the UKMLA: Revision Guide Featured Image",
    "featuredImageAltText": "respiratory medicine UKMLA - Asthma COPD Pneumonia and PE Revision",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "gastroenterology-ukmla-akt-revision",
    "title": "Gastroenterology and Hepatology in the UKMLA AKT",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/gastroenterology-ukmla-akt-revision-featured.webp",
    "summary": "GI presentations are a core Content Map domain. Here is a focused guide to the conditions, investigations, and management decisions most likely to appear in the AKT.",
    "seoTitle": "Gastroenterology in the UKMLA AKT: High-Yield Revision Guide",
    "seoDescription": "GI presentations are a core UKMLA domain. Revise abdominal pain, GI bleeding, jaundice, IBD, and liver disease with this focused AKT revision guide.",
    "primaryKeyword": "gastroenterology UKMLA AKT",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/gastroenterology-ukmla-akt-revision-featured.webp",
    "featuredImageTitle": "Gastroenterology and Hepatology in the UKMLA AKT Featured Image",
    "featuredImageAltText": "gastroenterology UKMLA AKT - GI Presentations and High-Yield Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "neurology-ukmla-revision",
    "title": "Neurology in the UKMLA: High-Yield Topics and Revision Tips",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/neurology-ukmla-revision-featured.webp",
    "summary": "Neurological presentations are a significant UKMLA domain. This guide covers stroke, epilepsy, headache, and the key examination and investigation skills.",
    "seoTitle": "Neurology in the UKMLA: High-Yield Topics and Revision Tips",
    "seoDescription": "Neurological presentations are a core UKMLA domain. Our guide covers stroke, epilepsy, headache, dementia, and the clinical skills neurological stations require.",
    "primaryKeyword": "neurology UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/neurology-ukmla-revision-featured.webp",
    "featuredImageTitle": "Neurology in the UKMLA: High-Yield Topics and Revision Tips Featured Image",
    "featuredImageAltText": "neurology UKMLA - Stroke Epilepsy Headache and High-Yield Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "obstetrics-gynaecology-ukmla-revision",
    "title": "Obstetrics and Gynaecology in the UKMLA: Key Topics to Revise",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/obstetrics-gynaecology-ukmla-revision-featured.webp",
    "summary": "O&G presentations appear across both UKMLA components. Here are the highest-yield conditions, emergency management steps, and the sensitive communication scenarios.",
    "seoTitle": "Obstetrics and Gynaecology in the UKMLA: Key Revision Topics",
    "seoDescription": "O&G is a core UKMLA domain. Revise ectopic pregnancy, pre-eclampsia, miscarriage, cervical cancer screening, and the communication skills these scenarios demand.",
    "primaryKeyword": "obstetrics gynaecology UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/obstetrics-gynaecology-ukmla-revision-featured.webp",
    "featuredImageTitle": "Obstetrics and Gynaecology in the UKMLA: Key Topics Featured Image",
    "featuredImageAltText": "obstetrics gynaecology UKMLA - High-Yield Topics and Communication Scenarios",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "surgical-presentations-ukmla-revision",
    "title": "Surgical Presentations in the UKMLA: What a Foundation Doctor Needs to Know",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/surgical-presentations-ukmla-revision-featured.webp",
    "summary": "Surgical knowledge in the UKMLA focuses on recognition and initial management, not operative technique. Here are the most frequently tested surgical presentations.",
    "seoTitle": "Surgical Presentations in the UKMLA: Foundation-Level Revision",
    "seoDescription": "The UKMLA tests surgical presentations at foundation level — recognition and initial management, not operative technique. Learn the key conditions and referral criteria.",
    "primaryKeyword": "surgical presentations UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/surgical-presentations-ukmla-revision-featured.webp",
    "featuredImageTitle": "Surgical Presentations in the UKMLA: Foundation-Level Revision Featured Image",
    "featuredImageAltText": "surgical presentations UKMLA - Foundation Level Recognition and Management",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "dermatology-ukmla-revision",
    "title": "Dermatology in the UKMLA: Rashes, Lesions, and What to Know",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/dermatology-ukmla-revision-featured.webp",
    "summary": "Skin presentations appear across both UKMLA components. Here are the common rashes and lesions tested in the AKT, and the communication skills required for skin-related CPSA stations.",
    "seoTitle": "Dermatology in the UKMLA: Rashes and Lesions Revision Guide",
    "seoDescription": "Skin presentations are tested in the UKMLA AKT and CPSA. Our revision guide covers common rashes, skin lesion assessment, melanoma, and the ABCDE mole assessment.",
    "primaryKeyword": "dermatology UKMLA",
    "featuredImageKeyword": "dermatology skin lesions revision",
    "featuredImageUrl": "/images/dermatology-ukmla-revision-featured.webp",
    "featuredImageTitle": "Dermatology in the UKMLA: Rashes and Lesions Revision Guide Featured Image",
    "featuredImageAltText": "dermatology UKMLA - Rashes Lesions and Skin Cancer Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "endocrinology-diabetes-ukmla-revision",
    "title": "Endocrinology and Diabetes in the UKMLA: A Targeted Revision Guide",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/endocrinology-diabetes-ukmla-revision-featured.webp",
    "summary": "Endocrine and diabetic presentations are among the most tested UKMLA topics. Here is a focused guide to the conditions, investigations, and management principles.",
    "seoTitle": "Endocrinology and Diabetes in the UKMLA: Targeted Revision Guide",
    "seoDescription": "Diabetes and endocrine conditions are high-yield UKMLA topics. Our revision guide covers T1DM, T2DM, DKA, HHS, thyroid disease, and adrenal conditions.",
    "primaryKeyword": "endocrinology diabetes UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/endocrinology-diabetes-ukmla-revision-featured.webp",
    "featuredImageTitle": "Endocrinology and Diabetes in the UKMLA: Revision Guide Featured Image",
    "featuredImageAltText": "endocrinology diabetes UKMLA - DKA HHS Thyroid Disease Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "rheumatology-ukmla-revision",
    "title": "Rheumatology in the UKMLA: Joints, Inflammation, and Autoimmunity",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/rheumatology-ukmla-revision-featured.webp",
    "summary": "Rheumatological conditions appear regularly across both UKMLA components. Here are the key conditions, investigations, and the clinical examination findings you need.",
    "seoTitle": "Rheumatology in the UKMLA: Key Conditions and Revision Tips",
    "seoDescription": "Rheumatology features regularly in the UKMLA AKT and CPSA. Revise rheumatoid arthritis, gout, SLE, osteoporosis, and musculoskeletal examinations with this guide.",
    "primaryKeyword": "rheumatology UKMLA",
    "featuredImageKeyword": "rheumatology joints revision",
    "featuredImageUrl": "/images/rheumatology-ukmla-revision-featured.webp",
    "featuredImageTitle": "Rheumatology in the UKMLA: Key Conditions and Revision Tips Featured Image",
    "featuredImageAltText": "rheumatology UKMLA - RA Gout SLE Osteoporosis Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "nephrology-ukmla-revision",
    "title": "Nephrology in the UKMLA: AKI, CKD, and Electrolyte Disorders",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/nephrology-ukmla-revision-featured.webp",
    "summary": "Renal presentations feature heavily in the UKMLA AKT. Here is a focused guide to AKI, CKD staging, electrolyte disorders, and the investigations that matter.",
    "seoTitle": "Nephrology in the UKMLA: AKI, CKD, and Electrolytes Revision",
    "seoDescription": "Renal conditions are heavily tested in the UKMLA AKT. Our revision guide covers AKI, CKD, electrolyte disorders, nephrotic syndrome, and urinalysis interpretation.",
    "primaryKeyword": "nephrology UKMLA AKI CKD",
    "featuredImageKeyword": "nephrology kidney renal revision",
    "featuredImageUrl": "/images/nephrology-ukmla-revision-featured.webp",
    "featuredImageTitle": "Nephrology in the UKMLA: AKI, CKD, and Electrolyte Disorders Featured Image",
    "featuredImageAltText": "nephrology UKMLA - AKI CKD Electrolytes and Renal Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "haematology-ukmla-revision",
    "title": "Haematology in the UKMLA: Anaemia, Clotting, and Blood Cancers",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/haematology-ukmla-revision-featured.webp",
    "summary": "Blood disorders are tested across both UKMLA components. Here is a targeted guide to anaemia workup, clotting disorders, and the haematological malignancies you need to know.",
    "seoTitle": "Haematology in the UKMLA: Anaemia, Clotting, and Blood Cancer",
    "seoDescription": "Haematological presentations are high-yield in the UKMLA AKT. Our guide covers anaemia workup, DVT/PE, coagulation disorders, leukaemia, and lymphoma.",
    "primaryKeyword": "haematology UKMLA",
    "featuredImageKeyword": "haematology blood revision",
    "featuredImageUrl": "/images/haematology-ukmla-revision-featured.webp",
    "featuredImageTitle": "Haematology in the UKMLA: Anaemia, Clotting, and Blood Cancers Featured Image",
    "featuredImageAltText": "haematology UKMLA - Anaemia Clotting Disorders and Blood Cancer Revision",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "infection-microbiology-ukmla-revision",
    "title": "Infection and Microbiology in the UKMLA: Antibiotic Stewardship and More",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/infection-microbiology-ukmla-revision-featured.webp",
    "summary": "Infectious diseases are a major AKT topic. This guide covers common infections, empiric antibiotic choices, and the broader principles of antimicrobial stewardship.",
    "seoTitle": "Infection and Microbiology in the UKMLA: Antibiotics and Stewardship",
    "seoDescription": "Infection is a high-yield UKMLA domain. Our revision guide covers empiric antibiotics, sepsis, common organisms, resistance, and antimicrobial stewardship principles.",
    "primaryKeyword": "infection microbiology UKMLA",
    "featuredImageKeyword": "infection microbiology revision",
    "featuredImageUrl": "/images/infection-microbiology-ukmla-revision-featured.webp",
    "featuredImageTitle": "Infection and Microbiology in the UKMLA: Revision Guide Featured Image",
    "featuredImageAltText": "infection microbiology UKMLA - Antibiotics Sepsis and Stewardship",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "palliative-care-ukmla-revision",
    "title": "Palliative Care and End-of-Life Decisions in the UKMLA",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/palliative-care-ukmla-revision-featured.webp",
    "summary": "Palliative care is explicitly assessed in the UKMLA. Here is what to know about symptom management, advance care planning, and the ethical and legal framework.",
    "seoTitle": "Palliative Care in the UKMLA: Symptom Management and Ethics",
    "seoDescription": "Palliative care is assessed in both the UKMLA AKT and CPSA. Learn symptom management, advance care planning, DNACPR decisions, and the legal framework.",
    "primaryKeyword": "palliative care UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/palliative-care-ukmla-revision-featured.webp",
    "featuredImageTitle": "Palliative Care and End-of-Life Decisions in the UKMLA Featured Image",
    "featuredImageAltText": "palliative care UKMLA - Symptom Management DNACPR and End-of-Life Decisions",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "patient-safety-ukmla-prescribing-errors",
    "title": "Patient Safety in the UKMLA: Prescribing Errors and Near-Miss Reporting",
    "date": "30 June 2026",
    "tag": "Exam Format",
    "image": "/images/patient-safety-ukmla-prescribing-errors-featured.webp",
    "summary": "Patient safety is a core professional theme in the UKMLA. Here is what to know about prescribing errors, incident reporting, and the duty of candour.",
    "seoTitle": "Patient Safety in the UKMLA: Prescribing Errors and Reporting",
    "seoDescription": "Patient safety is a core UKMLA theme. Learn about prescribing error recognition, incident reporting, duty of candour, and the systems that improve safety in the AKT.",
    "primaryKeyword": "patient safety UKMLA",
    "featuredImageKeyword": "Exam Format",
    "featuredImageUrl": "/images/patient-safety-ukmla-prescribing-errors-featured.webp",
    "featuredImageTitle": "Patient Safety in the UKMLA: Prescribing Errors and Reporting Featured Image",
    "featuredImageAltText": "patient safety UKMLA - Prescribing Errors Incident Reporting and Duty of Candour",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "ukmla-graduate-entry-medical-students",
    "title": "UKMLA for Graduate-Entry Medical Students: What Is Different?",
    "date": "30 June 2026",
    "tag": "Getting Started",
    "image": "/images/ukmla-graduate-entry-medical-students-featured.webp",
    "summary": "Graduate-entry medicine students follow an accelerated programme but sit the same UKMLA standard. Here is what GE students should know about their pathway.",
    "seoTitle": "UKMLA for Graduate-Entry Medical Students: Key Information",
    "seoDescription": "Graduate-entry medical students follow a compressed programme but sit the same UKMLA. Learn what is different about the GE pathway, timetable, and preparation.",
    "primaryKeyword": "UKMLA graduate entry",
    "featuredImageKeyword": "Getting Started",
    "featuredImageUrl": "/images/ukmla-graduate-entry-medical-students-featured.webp",
    "featuredImageTitle": "UKMLA for Graduate-Entry Medical Students Featured Image",
    "featuredImageAltText": "UKMLA graduate entry - What Graduate-Entry Medical Students Need to Know",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-results-feedback-report",
    "title": "UKMLA Results: How to Interpret Your Feedback Report",
    "date": "30 June 2026",
    "tag": "Results & Data",
    "image": "/images/ukmla-results-feedback-report-featured.webp",
    "summary": "Getting your UKMLA result is just the first step. Here is how to read your feedback report, understand your performance profile, and use it to guide what comes next.",
    "seoTitle": "UKMLA Results: How to Interpret Your Feedback Report",
    "seoDescription": "Understanding your UKMLA feedback report helps you respond to your result effectively. Learn how to read your performance profile and plan your next steps.",
    "primaryKeyword": "UKMLA results feedback",
    "featuredImageKeyword": "Results & Data",
    "featuredImageUrl": "/images/ukmla-results-feedback-report-featured.webp",
    "featuredImageTitle": "UKMLA Results: How to Interpret Your Feedback Report Featured Image",
    "featuredImageAltText": "UKMLA results feedback - How to Interpret Your Performance Report",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "clinical-examination-cpsa-guide",
    "title": "Clinical Examination Stations in the CPSA: A Practical Guide",
    "date": "30 June 2026",
    "tag": "Exam Format",
    "image": "/images/clinical-examination-cpsa-guide-featured.webp",
    "summary": "Physical examination stations are a core CPSA component. Here is how to approach cardiovascular, respiratory, abdominal, and neurological examinations under timed conditions.",
    "seoTitle": "Clinical Examination Stations in the CPSA: A Practical Guide",
    "seoDescription": "Clinical examination stations are a core CPSA component. Learn how to approach cardiovascular, respiratory, abdominal, and neurological exams in OSCE conditions.",
    "primaryKeyword": "CPSA clinical examination stations",
    "featuredImageKeyword": "Exam Format",
    "featuredImageUrl": "/images/clinical-examination-cpsa-guide-featured.webp",
    "featuredImageTitle": "Clinical Examination Stations in the CPSA: Practical Guide Featured Image",
    "featuredImageAltText": "CPSA clinical examination stations - Cardiovascular Respiratory Abdominal Neurological Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "group-study-vs-solo-ukmla",
    "title": "Group Study vs Solo Study for the UKMLA: What Works Best?",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/group-study-vs-solo-ukmla-featured.webp",
    "summary": "Is studying with peers better than working alone? The research and the practical realities for UKMLA candidates suggest a combination approach is usually most effective.",
    "seoTitle": "Group Study vs Solo Study for the UKMLA: What Works Best?",
    "seoDescription": "Should you study alone or with peers for the UKMLA? Evidence and practical experience suggest combining both. We explain how to use each approach to maximum effect.",
    "primaryKeyword": "UKMLA group study solo",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/group-study-vs-solo-ukmla-featured.webp",
    "featuredImageTitle": "Group Study vs Solo Study for the UKMLA Featured Image",
    "featuredImageAltText": "UKMLA group study vs solo - What Works Best for AKT and CPSA Preparation",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "angoff-standard-setting-explained",
    "title": "What Is an Angoff Standard Setting and Why Does It Matter?",
    "date": "30 June 2026",
    "tag": "Results & Data",
    "image": "/images/angoff-standard-setting-explained-featured.webp",
    "summary": "The UKMLA does not use a fixed percentage pass mark. Understanding Angoff standard setting and why the pass mark varies helps candidates approach the exam more confidently.",
    "seoTitle": "Angoff Standard Setting in the UKMLA: What It Means for You",
    "seoDescription": "The UKMLA uses Angoff standard setting, not a fixed pass mark. Learn how this works, why the threshold varies between sittings, and what it means for candidates.",
    "primaryKeyword": "Angoff standard setting UKMLA",
    "featuredImageKeyword": "Results & Data",
    "featuredImageUrl": "/images/angoff-standard-setting-explained-featured.webp",
    "featuredImageTitle": "What Is Angoff Standard Setting and Why Does It Matter? Featured Image",
    "featuredImageAltText": "Angoff standard setting UKMLA - How the Pass Mark Is Set and What It Means",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "time-management-akt-ukmla",
    "title": "Time Management in the UKMLA AKT: Strategies That Work",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/time-management-akt-ukmla-featured.webp",
    "summary": "Running out of time in the AKT is one of the most common reasons candidates underperform. Here are practical, evidence-based strategies for managing the clock.",
    "seoTitle": "Time Management in the UKMLA AKT: Strategies That Work",
    "seoDescription": "Poor time management is a common UKMLA AKT pitfall. Learn practical strategies for pacing, flagging, and managing the clock across the full paper.",
    "primaryKeyword": "time management UKMLA AKT",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/time-management-akt-ukmla-featured.webp",
    "featuredImageTitle": "Time Management in the UKMLA AKT: Strategies That Work Featured Image",
    "featuredImageAltText": "time management UKMLA AKT - Pacing Strategies for the Written Paper",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-preparation-for-imgs",
    "title": "UKMLA Preparation for IMG Candidates: A Tailored Guide",
    "date": "30 June 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-preparation-for-imgs-featured.webp",
    "summary": "International medical graduates face unique challenges preparing for the UKMLA via PLAB. Here is a tailored guide addressing system differences, resources, and strategies.",
    "seoTitle": "UKMLA Preparation for IMGs: Tailored Guide for PLAB Candidates",
    "seoDescription": "Preparing for PLAB as an IMG presents unique challenges. Our tailored guide covers UK system differences, NICE guidelines, communication skills, and study strategies.",
    "primaryKeyword": "UKMLA preparation for IMGs",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/ukmla-preparation-for-imgs-featured.webp",
    "featuredImageTitle": "UKMLA Preparation for IMG Candidates: Tailored Guide Featured Image",
    "featuredImageAltText": "UKMLA preparation for IMGs - Tailored PLAB Guide for International Medical Graduates",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab"
  },
  {
    "slug": "blood-tests-data-interpretation-akt",
    "title": "Blood Tests and Investigations in the AKT: Data Interpretation Guide",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/blood-tests-data-interpretation-akt-featured.webp",
    "summary": "Data interpretation is a core AKT skill. Here is a systematic approach to interpreting FBC, U&E, LFTs, thyroid function, and other common investigation results.",
    "seoTitle": "Blood Tests and Data Interpretation in the UKMLA AKT",
    "seoDescription": "Data interpretation is a core UKMLA AKT skill. Our guide covers systematic interpretation of FBC, U&E, LFTs, ABG, and other investigations tested in the written paper.",
    "primaryKeyword": "data interpretation AKT UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/blood-tests-data-interpretation-akt-featured.webp",
    "featuredImageTitle": "Blood Tests and Data Interpretation in the AKT Featured Image",
    "featuredImageAltText": "data interpretation AKT UKMLA - Blood Tests FBC UE LFTs and ABG Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "disability-access-ukmla-guide",
    "title": "Disability, Access, and Inclusion in the UKMLA: A Candidate's Guide",
    "date": "30 June 2026",
    "tag": "Candidate Support",
    "image": "/images/disability-access-ukmla-guide-featured.webp",
    "summary": "Candidates with disabilities or health conditions have the right to access the UKMLA with appropriate support. Here is a practical guide to what is available and how to apply.",
    "seoTitle": "Disability and Access in the UKMLA: A Guide to Reasonable Adjustments",
    "seoDescription": "Candidates with disabilities have the right to reasonable adjustments in the UKMLA. Learn what support is available, how to apply, and the deadlines you must meet.",
    "primaryKeyword": "UKMLA disability access adjustments",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/disability-access-ukmla-guide-featured.webp",
    "featuredImageTitle": "Disability, Access, and Inclusion in the UKMLA Featured Image",
    "featuredImageAltText": "UKMLA disability access - Guide to Reasonable Adjustments for Candidates",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "uk-medical-schools-ukmla-implementation",
    "title": "How UK Medical Schools Implement the UKMLA: An Overview",
    "date": "30 June 2026",
    "tag": "Getting Started",
    "image": "/images/uk-medical-schools-ukmla-implementation-featured.webp",
    "summary": "Different UK medical schools implement the UKMLA in different ways. Here is what candidates should expect from the medical-school-delivered route and how to navigate variation.",
    "seoTitle": "How UK Medical Schools Implement the UKMLA",
    "seoDescription": "UK medical schools implement the UKMLA within GMC-approved frameworks but with variation in timing and format. Learn what to expect from your medical school's AKT and CPSA.",
    "primaryKeyword": "UK medical schools UKMLA implementation",
    "featuredImageKeyword": "Getting Started",
    "featuredImageUrl": "/images/uk-medical-schools-ukmla-implementation-featured.webp",
    "featuredImageTitle": "How UK Medical Schools Implement the UKMLA Featured Image",
    "featuredImageAltText": "UK medical schools UKMLA - How Schools Deliver the AKT and CPSA",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "psychiatry-communication-cpsa-stations",
    "title": "Psychiatry Communication Stations: Handling Difficult Conversations",
    "date": "30 June 2026",
    "tag": "Exam Format",
    "image": "/images/psychiatry-communication-cpsa-stations-featured.webp",
    "summary": "Psychiatric consultations in the CPSA require a specific approach — empathetic, structured, and safe. Here is how to handle the most commonly appearing mental health scenarios.",
    "seoTitle": "Psychiatry Communication Stations in the CPSA: Handling Difficult Cases",
    "seoDescription": "Psychiatric CPSA communication stations require a specific, empathetic approach. Learn how to handle suicidal ideation, psychosis, and capacity assessment scenarios.",
    "primaryKeyword": "psychiatry communication CPSA",
    "featuredImageKeyword": "Exam Format",
    "featuredImageUrl": "/images/psychiatry-communication-cpsa-stations-featured.webp",
    "featuredImageTitle": "Psychiatry Communication Stations in the CPSA Featured Image",
    "featuredImageAltText": "psychiatry communication CPSA - Handling Suicidal Ideation and Capacity Assessments",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ophthalmology-ent-ukmla-revision",
    "title": "Ophthalmology and ENT in the UKMLA: What Foundation Doctors Need to Know",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/ophthalmology-ent-ukmla-revision-featured.webp",
    "summary": "Eye and ear, nose, and throat presentations appear regularly in the UKMLA. Here is a focused guide to the conditions, red flags, and examination skills you need.",
    "seoTitle": "Ophthalmology and ENT in the UKMLA: Foundation-Level Revision",
    "seoDescription": "Eye and ENT presentations are tested in the UKMLA at foundation level. Our guide covers acute red eye, vision loss, hearing loss, epistaxis, and the red flags you must know.",
    "primaryKeyword": "ophthalmology ENT UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/ophthalmology-ent-ukmla-revision-featured.webp",
    "featuredImageTitle": "Ophthalmology and ENT in the UKMLA: Foundation-Level Revision Featured Image",
    "featuredImageAltText": "ophthalmology ENT UKMLA - Red Eye Vision Loss Hearing Loss Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "social-determinants-health-ukmla",
    "title": "Social Determinants of Health in the UKMLA: Person-Centred Care",
    "date": "30 June 2026",
    "tag": "Exam Format",
    "image": "/images/social-determinants-health-ukmla-featured.webp",
    "summary": "Person-centred care is a core UKMLA theme. Here is how social determinants of health appear in AKT questions and CPSA consultations — and how to respond appropriately.",
    "seoTitle": "Social Determinants of Health in the UKMLA: Person-Centred Care",
    "seoDescription": "Person-centred care and social determinants of health are core UKMLA themes. Learn how they appear in AKT questions and how to apply them in CPSA consultations.",
    "primaryKeyword": "social determinants health UKMLA",
    "featuredImageKeyword": "Exam Format",
    "featuredImageUrl": "/images/social-determinants-health-ukmla-featured.webp",
    "featuredImageTitle": "Social Determinants of Health in the UKMLA Featured Image",
    "featuredImageAltText": "social determinants health UKMLA - Person-Centred Care in AKT and CPSA",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "three-months-ukmla-akt-countdown",
    "title": "Three Months to the UKMLA AKT: A Final Preparation Countdown",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/three-months-ukmla-akt-countdown-featured.webp",
    "summary": "With three months to your AKT, there is still time to make significant progress. Here is a structured, week-by-week countdown that balances coverage, practice, and consolidation.",
    "seoTitle": "Three Months to the UKMLA AKT: Final Preparation Countdown",
    "seoDescription": "Three months to your UKMLA AKT? Our structured countdown covers content coverage, question practice, mock exams, and final consolidation to maximise your score.",
    "primaryKeyword": "UKMLA AKT preparation countdown",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/three-months-ukmla-akt-countdown-featured.webp",
    "featuredImageTitle": "Three Months to the UKMLA AKT: Final Preparation Countdown Featured Image",
    "featuredImageAltText": "UKMLA AKT preparation countdown - Three Month Final Study Plan",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "how-to-become-a-doctor-in-uk-from-india",
    "title": "How to Become a Doctor in the UK from India: The Complete UKMLA Route",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/how-to-become-a-doctor-in-uk-from-india-featured.webp",
    "summary": "A step-by-step guide for Indian medical graduates on how to become a doctor in the UK from India — UKMLA eligibility, exam costs in rupees, GMC registration, and the MBBS-to-NHS timeline.",
    "seoTitle": "How to Become a Doctor in UK from India: 2026 Guide",
    "seoDescription": "How to become a doctor in UK from India: UKMLA eligibility, AKT/CPSA costs in rupees, GMC registration steps, and the full MBBS-to-NHS timeline.",
    "primaryKeyword": "how to become a doctor in UK from India",
    "featuredImageKeyword": "doctor from India UK route",
    "featuredImageUrl": "/images/how-to-become-a-doctor-in-uk-from-india-featured.webp",
    "featuredImageTitle": "How to Become a Doctor in the UK from India",
    "featuredImageAltText": "How to become a doctor in UK from India - Indian medical graduate reviewing UKMLA and GMC registration documents",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/registration-applications/application-guides/full-registration-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-pakistani-doctors",
    "title": "UKMLA for Pakistani Doctors: Eligibility, Fees and the Route to Practising in the UK",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-pakistani-doctors-featured.webp",
    "summary": "Everything Pakistani medical graduates need to know about the UKMLA for Pakistani doctors — eligibility, PMDC-to-GMC recognition, AKT test centres, and fees in PKR.",
    "seoTitle": "UKMLA for Pakistani Doctors: Eligibility & Fees",
    "seoDescription": "UKMLA for Pakistani doctors: eligibility, GMC registration, AKT test centres in Pakistan, and exam fees in PKR for 2026 — the complete route guide.",
    "primaryKeyword": "UKMLA for Pakistani doctors",
    "featuredImageKeyword": "Pakistani doctor UKMLA route",
    "featuredImageUrl": "/images/ukmla-for-pakistani-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Pakistani Doctors",
    "featuredImageAltText": "UKMLA for Pakistani doctors - medical graduate from Pakistan preparing GMC registration and AKT exam documents",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/registration-applications/application-guides/provisional-registration-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-nigerian-doctors",
    "title": "UKMLA for Nigerian Doctors: Eligibility, Fees and How to Register with the GMC",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-nigerian-doctors-featured.webp",
    "summary": "A complete route guide for Nigerian medical graduates covering UKMLA eligibility, MDCN-to-GMC recognition, exam costs in naira, and GMC registration.",
    "seoTitle": "UKMLA for Nigerian Doctors: Eligibility & Fees",
    "seoDescription": "UKMLA for Nigerian doctors: eligibility, MDCN-to-GMC recognition, AKT and CPSA costs in naira, and the full GMC registration process for 2026.",
    "primaryKeyword": "UKMLA for Nigerian doctors",
    "featuredImageKeyword": "Nigerian doctor UKMLA route",
    "featuredImageUrl": "/images/ukmla-for-nigerian-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Nigerian Doctors",
    "featuredImageAltText": "UKMLA for Nigerian doctors - medical graduate from Nigeria reviewing GMC registration and UKMLA exam requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-vs-usmle-comparison",
    "title": "UKMLA vs USMLE: Which Exam Is Easier, Cheaper and Better for Your Career?",
    "date": "01 July 2026",
    "tag": "Exam Comparisons",
    "image": "/images/ukmla-vs-usmle-comparison-featured.webp",
    "summary": "A detailed, evidence-based comparison of UKMLA vs USMLE covering cost, difficulty, exam format, and career pathways for IMGs choosing between the UK and US routes.",
    "seoTitle": "UKMLA vs USMLE: Which Exam Should You Take?",
    "seoDescription": "UKMLA vs USMLE compared: cost, difficulty, format, career outcomes and which route gets IMGs into practice faster in 2026.",
    "primaryKeyword": "UKMLA vs USMLE",
    "featuredImageKeyword": "UKMLA vs USMLE comparison",
    "featuredImageUrl": "/images/ukmla-vs-usmle-comparison-featured.webp",
    "featuredImageTitle": "UKMLA vs USMLE Comparison",
    "featuredImageAltText": "UKMLA vs USMLE comparison - side-by-side exam route decision for international medical graduates",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/plab-and-the-mla"
  },
  {
    "slug": "ukmla-vs-neet-pg",
    "title": "UKMLA vs NEET PG: Which Path Should Indian Medical Graduates Choose?",
    "date": "01 July 2026",
    "tag": "Exam Comparisons",
    "image": "/images/ukmla-vs-neet-pg-featured.webp",
    "summary": "Indian medical graduates often face a choice between NEET PG and the UKMLA route to the UK. This guide compares cost, competition, timelines and long-term career outcomes.",
    "seoTitle": "UKMLA vs NEET PG: Which Path Is Right for You?",
    "seoDescription": "UKMLA vs NEET PG compared: cost, competition, timelines and career outcomes to help Indian medical graduates choose the right path in 2026.",
    "primaryKeyword": "UKMLA vs NEET PG",
    "featuredImageKeyword": "UKMLA vs NEET PG India",
    "featuredImageUrl": "/images/ukmla-vs-neet-pg-featured.webp",
    "featuredImageTitle": "UKMLA vs NEET PG",
    "featuredImageAltText": "UKMLA vs NEET PG - Indian medical graduate comparing UK and India postgraduate exam pathways",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-question-bank-and-mock-tests",
    "title": "UKMLA Question Bank and Mock Tests: The Complete Guide to Practice Resources",
    "date": "01 July 2026",
    "tag": "Preparation",
    "image": "/images/ukmla-question-bank-and-mock-tests-featured.webp",
    "summary": "How to choose a UKMLA question bank, which free UKMLA mock tests are worth using, and how to structure practice questions into an effective AKT revision routine.",
    "seoTitle": "UKMLA Question Bank: Best Practice Resources 2026",
    "seoDescription": "UKMLA question bank guide: how to choose one, free UKMLA mock tests worth trying, and how to build an effective AKT practice routine for 2026.",
    "primaryKeyword": "UKMLA question bank",
    "featuredImageKeyword": "UKMLA question bank mock test",
    "featuredImageUrl": "/images/ukmla-question-bank-and-mock-tests-featured.webp",
    "featuredImageTitle": "UKMLA Question Bank and Mock Tests",
    "featuredImageAltText": "UKMLA question bank and mock tests - medical student practising AKT questions on a laptop",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "ukmla-fees-for-img-2026",
    "title": "UKMLA Exam Fees for International Medical Graduates: 2026 Cost Guide",
    "date": "01 July 2026",
    "tag": "Fees & Funding",
    "image": "/images/ukmla-fees-for-img-2026-featured.webp",
    "summary": "A complete 2026 breakdown of UKMLA exam fees for IMGs — every charge from EPIC verification to GMC registration, plus the total cost of the pathway by country.",
    "seoTitle": "UKMLA Exam Fees for IMG: 2026 Full Cost Guide",
    "seoDescription": "UKMLA exam fees for IMG in 2026: AKT, CPSA, GMC registration, EPIC verification and total pathway cost for international medical graduates.",
    "primaryKeyword": "UKMLA exam fees for IMG",
    "featuredImageKeyword": "UKMLA fees IMG cost guide",
    "featuredImageUrl": "/images/ukmla-fees-for-img-2026-featured.webp",
    "featuredImageTitle": "UKMLA Exam Fees for International Medical Graduates",
    "featuredImageAltText": "UKMLA exam fees for IMG - international medical graduate calculating total UKMLA and GMC registration costs",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/managing-your-registration/fees-and-funding/fees-for-doctors"
  }
,
  {
    "slug": "ukmla-for-bangladeshi-doctors",
    "title": "UKMLA for Bangladeshi Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-bangladeshi-doctors-featured.webp",
    "summary": "A complete route guide for Bangladeshi medical graduates covering UKMLA eligibility, BM&DC-to-GMC recognition, exam costs in taka, and GMC registration.",
    "seoTitle": "UKMLA for Bangladeshi Doctors: Route & Fees",
    "seoDescription": "UKMLA for Bangladeshi doctors: BM&DC-to-GMC recognition, AKT and CPSA costs in taka, English testing, and the full 2026 GMC registration route.",
    "primaryKeyword": "UKMLA for Bangladeshi doctors",
    "featuredImageKeyword": "Bangladeshi doctor UKMLA route",
    "featuredImageUrl": "/images/ukmla-for-bangladeshi-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Bangladeshi Doctors",
    "featuredImageAltText": "UKMLA for Bangladeshi doctors - medical graduate from Bangladesh reviewing GMC registration and UKMLA exam requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-egyptian-doctors",
    "title": "UKMLA for Egyptian Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-egyptian-doctors-featured.webp",
    "summary": "A complete route guide for Egyptian medical graduates covering UKMLA eligibility, Ministry of Health-to-GMC recognition, exam costs in Egyptian pounds, and GMC registration.",
    "seoTitle": "UKMLA for Egyptian Doctors: Route & Fees",
    "seoDescription": "UKMLA for Egyptian doctors: degree recognition, AKT and CPSA costs in Egyptian pounds, English testing, and the full 2026 GMC registration route.",
    "primaryKeyword": "UKMLA for Egyptian doctors",
    "featuredImageKeyword": "Egyptian doctor UKMLA route",
    "featuredImageUrl": "/images/ukmla-for-egyptian-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Egyptian Doctors",
    "featuredImageAltText": "UKMLA for Egyptian doctors - medical graduate from Egypt reviewing GMC registration and UKMLA exam requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-gulf-doctors",
    "title": "UKMLA for Gulf and Saudi Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-gulf-doctors-featured.webp",
    "summary": "A route guide for doctors in the UAE, Saudi Arabia and the wider Gulf covering UKMLA eligibility, GMC recognition, exam fees, and registration steps.",
    "seoTitle": "UKMLA for Gulf & Saudi Doctors: Route & Fees",
    "seoDescription": "UKMLA for Gulf and Saudi doctors in the UAE, Saudi Arabia and GCC: GMC recognition, AKT/CPSA fees, English testing, and the 2026 registration route.",
    "primaryKeyword": "UKMLA for Gulf and Saudi doctors",
    "featuredImageKeyword": "Gulf doctor UKMLA route",
    "featuredImageUrl": "/images/ukmla-for-gulf-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Gulf and Saudi Doctors",
    "featuredImageAltText": "UKMLA for Gulf and Saudi doctors - medical graduate from the UAE or Saudi Arabia reviewing GMC registration and UKMLA requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-sri-lankan-doctors",
    "title": "UKMLA for Sri Lankan Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-sri-lankan-doctors-featured.webp",
    "summary": "A complete route guide for Sri Lankan medical graduates covering UKMLA eligibility, SLMC-to-GMC recognition, exam costs in rupees, and GMC registration.",
    "seoTitle": "UKMLA for Sri Lankan Doctors: Route & Fees",
    "seoDescription": "UKMLA for Sri Lankan doctors: SLMC-to-GMC recognition, AKT and CPSA costs in Sri Lankan rupees, English testing, and the 2026 registration route.",
    "primaryKeyword": "UKMLA for Sri Lankan doctors",
    "featuredImageKeyword": "Sri Lankan doctor UKMLA route",
    "featuredImageUrl": "/images/ukmla-for-sri-lankan-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Sri Lankan Doctors",
    "featuredImageAltText": "UKMLA for Sri Lankan doctors - medical graduate from Sri Lanka reviewing GMC registration and UKMLA exam requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-south-african-doctors",
    "title": "UKMLA for South African Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-south-african-doctors-featured.webp",
    "summary": "A complete route guide for South African medical graduates covering UKMLA eligibility, HPCSA-to-GMC recognition, exam costs in rand, and GMC registration.",
    "seoTitle": "UKMLA for South African Doctors: Route & Fees",
    "seoDescription": "UKMLA for South African doctors: HPCSA-to-GMC recognition, AKT and CPSA costs in rand, English testing, and the full 2026 GMC registration route.",
    "primaryKeyword": "UKMLA for South African doctors",
    "featuredImageKeyword": "South African doctor UKMLA route",
    "featuredImageUrl": "/images/ukmla-for-south-african-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for South African Doctors",
    "featuredImageAltText": "UKMLA for South African doctors - medical graduate from South Africa reviewing GMC registration and UKMLA exam requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "mbbs-in-uk-for-indian-students",
    "title": "MBBS in UK for Indian Students: Costs, Entry Routes and How It Differs From the IMG Path",
    "date": "01 July 2026",
    "tag": "Getting Started",
    "image": "/images/mbbs-in-uk-for-indian-students-featured.webp",
    "summary": "What it actually costs and takes for Indian students to study a UK medical degree, and how the direct-entry route compares to qualifying in India and taking the UKMLA later.",
    "seoTitle": "MBBS in UK for Indian Students: Costs & Routes",
    "seoDescription": "MBBS in UK for Indian students: entry requirements, UCAT/BMAT, tuition costs, visas, and how studying in the UK compares with the UKMLA/IMG route.",
    "primaryKeyword": "MBBS in UK for Indian students",
    "featuredImageKeyword": "Indian student UK medical school",
    "featuredImageUrl": "/images/mbbs-in-uk-for-indian-students-featured.webp",
    "featuredImageTitle": "MBBS in UK for Indian Students",
    "featuredImageAltText": "MBBS in UK for Indian students - Indian student researching UK medical school entry requirements and tuition costs",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/before-you-apply/before-medical-school"
  },
  {
    "slug": "uk-doctor-salary-guide-for-indian-doctors",
    "title": "UK Doctor Salary for Indian Doctors: NHS Pay Scales and What You'll Actually Take Home",
    "date": "01 July 2026",
    "tag": "Candidate Support",
    "image": "/images/uk-doctor-salary-guide-for-indian-doctors-featured.webp",
    "summary": "NHS pay scales for internationally trained doctors from India, converted to rupees, with realistic take-home figures after tax, pension and cost of living.",
    "seoTitle": "UK Doctor Salary for Indian Doctors: NHS Pay",
    "seoDescription": "UK doctor salary for Indian doctors: NHS pay scales by grade, rupee conversions, tax deductions, and realistic take-home pay after UKMLA registration.",
    "primaryKeyword": "UK doctor salary for Indian doctors",
    "featuredImageKeyword": "NHS doctor salary Indian",
    "featuredImageUrl": "/images/uk-doctor-salary-guide-for-indian-doctors-featured.webp",
    "featuredImageTitle": "UK Doctor Salary for Indian Doctors",
    "featuredImageAltText": "UK doctor salary for Indian doctors - NHS pay scale documents and rupee currency showing doctor salary conversion",
    "sourceFullUrl": "https://www.nhsemployers.org/pay-pensions-and-reward/medical-staff/doctors-and-dentists-pay"
  },
  {
    "slug": "ukmla-to-nhs-job-pathway",
    "title": "UKMLA to NHS Job: What Happens After You Pass and Register With the GMC",
    "date": "01 July 2026",
    "tag": "Candidate Support",
    "image": "/images/ukmla-to-nhs-job-pathway-featured.webp",
    "summary": "The practical steps from passing the UKMLA and gaining GMC registration to securing your first NHS post, including visas, job search platforms and interviews.",
    "seoTitle": "UKMLA NHS Job After Exam: What Comes Next",
    "seoDescription": "UKMLA NHS job after exam: how to find trust-grade posts, apply through NHS Jobs, secure a Certificate of Sponsorship, and start practising in the UK.",
    "primaryKeyword": "UKMLA NHS job after exam",
    "featuredImageKeyword": "NHS job after UKMLA",
    "featuredImageUrl": "/images/ukmla-to-nhs-job-pathway-featured.webp",
    "featuredImageTitle": "UKMLA to NHS Job Pathway",
    "featuredImageAltText": "UKMLA NHS job after exam - newly registered doctor starting first NHS post after passing the UKMLA",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors"
  },
  {
    "slug": "is-indian-mbbs-valid-in-uk",
    "title": "Is an Indian MBBS Valid in the UK? UKMLA Recognition and Degree Validity Explained",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/is-indian-mbbs-valid-in-uk-featured.webp",
    "summary": "Which medical degrees the GMC recognises, whether an Indian MBBS is valid in the UK, and which countries in turn recognise UK GMC registration.",
    "seoTitle": "Is Indian MBBS Valid in UK? Recognition FAQ",
    "seoDescription": "Is Indian MBBS valid in UK medical registration? How the GMC recognises overseas degrees, the WDOMS listing, and which countries accept UKMLA.",
    "primaryKeyword": "is Indian MBBS valid in UK",
    "featuredImageKeyword": "medical degree recognition UK",
    "featuredImageUrl": "/images/is-indian-mbbs-valid-in-uk-featured.webp",
    "featuredImageTitle": "UKMLA Degree Recognition and Validity",
    "featuredImageAltText": "is Indian MBBS valid in UK - medical degree certificate being checked against GMC recognition requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-akt-test-centres-guide",
    "title": "UKMLA AKT Test Centres: Where You Can Sit the Exam in India, Pakistan, the UK and Worldwide",
    "date": "01 July 2026",
    "tag": "Exam Format",
    "image": "/images/ukmla-akt-test-centres-guide-featured.webp",
    "summary": "A full list of where candidates can sit the UKMLA AKT through Pearson VUE test centres, covering India, Pakistan, the UK and other major IMG source countries.",
    "seoTitle": "UKMLA AKT Test Centres: Full Location Guide",
    "seoDescription": "UKMLA AKT test centres worldwide: Pearson VUE locations in India, Pakistan, the UK and beyond, plus why the CPSA must always be sat in Manchester.",
    "primaryKeyword": "UKMLA AKT test centres",
    "featuredImageKeyword": "UKMLA AKT test centre",
    "featuredImageUrl": "/images/ukmla-akt-test-centres-guide-featured.webp",
    "featuredImageTitle": "UKMLA AKT Test Centres Guide",
    "featuredImageAltText": "UKMLA AKT test centres - Pearson VUE test centre location used for sitting the UKMLA AKT exam",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/the-mla/the-mla-assessments"
  },
  {
    "slug": "gmc-registration-and-epic-verification-india",
    "title": "GMC Registration and EPIC Verification for Doctors From India: A Step-by-Step Guide",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/gmc-registration-and-epic-verification-india-featured.webp",
    "summary": "How EPIC primary source verification and GMC registration actually work for Indian medical graduates, with documents, timelines and common delays explained.",
    "seoTitle": "GMC Registration From India: EPIC Verification",
    "seoDescription": "GMC registration from India: how EPIC verification works, required documents, MCI/NMC certificates, processing times, and completing your GMC application.",
    "primaryKeyword": "GMC registration from India",
    "featuredImageKeyword": "GMC registration India EPIC",
    "featuredImageUrl": "/images/gmc-registration-and-epic-verification-india-featured.webp",
    "featuredImageTitle": "GMC Registration and EPIC Verification for India",
    "featuredImageAltText": "GMC registration from India - Indian doctor completing EPIC verification documents for GMC registration",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "english-language-requirement-for-ukmla-india",
    "title": "English Language Requirements for the UKMLA: IELTS and OET Scores Explained",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/english-language-requirement-for-ukmla-india-featured.webp",
    "summary": "The exact IELTS and OET scores the GMC requires for UKMLA registration, how Indian candidates can meet them, and how long certificates stay valid.",
    "seoTitle": "English Language Requirement for UKMLA India",
    "seoDescription": "English language requirement for UKMLA India: required IELTS Academic and OET Medicine scores, exemptions, certificate validity, and how to prepare.",
    "primaryKeyword": "English language requirement for UKMLA India",
    "featuredImageKeyword": "IELTS OET UKMLA requirement",
    "featuredImageUrl": "/images/english-language-requirement-for-ukmla-india-featured.webp",
    "featuredImageTitle": "English Language Requirements for the UKMLA",
    "featuredImageAltText": "English language requirement for UKMLA India - IELTS and OET test preparation materials for GMC registration",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/evidence-of-your-knowledge-of-english"
  }
,
  {
    "slug": "ukmla-exemptions-for-specialist-and-gp-doctors",
    "title": "Do Experienced Doctors Need to Take the UKMLA? Exemptions for Specialists and GPs",
    "date": "01 July 2026",
    "tag": "Candidate Support",
    "image": "/images/ukmla-exemptions-for-specialist-and-gp-doctors-featured.webp",
    "summary": "Whether GPs, specialists, MRCP holders and doctors already working in the NHS still need to sit the UKMLA, and what exemptions or alternative registration routes actually exist.",
    "seoTitle": "UKMLA Exemptions for Specialist Doctors",
    "seoDescription": "UKMLA exemptions for specialist doctors: whether GPs, MRCP holders and doctors already working in the NHS still need to sit the AKT and CPSA to register.",
    "primaryKeyword": "UKMLA exemptions for specialist doctors",
    "featuredImageKeyword": "specialist doctor UKMLA exemption",
    "featuredImageUrl": "/images/ukmla-exemptions-for-specialist-and-gp-doctors-featured.webp",
    "featuredImageTitle": "UKMLA Exemptions for Specialist and GP Doctors",
    "featuredImageAltText": "UKMLA exemptions for specialist doctors - senior NHS doctor reviewing GMC specialist registration requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/specialist-register"
  },
  {
    "slug": "gmc-registration-requirements-for-international-doctors",
    "title": "GMC Registration Requirements for International Doctors: The Complete Process",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/gmc-registration-requirements-for-international-doctors-featured.webp",
    "summary": "A nationality-agnostic breakdown of every GMC registration requirement for international medical graduates, from primary source verification to the final licence to practise.",
    "seoTitle": "GMC Registration Requirements for IMGs",
    "seoDescription": "GMC registration requirements for international doctors: EPIC verification, English testing, the UKMLA, and how to complete your application.",
    "primaryKeyword": "GMC registration requirements for international doctors",
    "featuredImageKeyword": "GMC registration requirements IMG",
    "featuredImageUrl": "/images/gmc-registration-requirements-for-international-doctors-featured.webp",
    "featuredImageTitle": "GMC Registration Requirements for International Doctors",
    "featuredImageAltText": "GMC registration requirements for international doctors - overseas doctor reviewing GMC registration checklist and documents",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors"
  },
  {
    "slug": "how-to-become-a-doctor-in-the-uk-gmc-registration-guide",
    "title": "How to Become a Doctor in the UK: The Complete GMC Registration Guide for IMGs",
    "date": "01 July 2026",
    "tag": "Getting Started",
    "image": "/images/how-to-become-a-doctor-in-the-uk-gmc-registration-guide-featured.webp",
    "summary": "The full, country-agnostic route to becoming a GMC-registered doctor in the UK as an international medical graduate, from eligibility through to your first NHS post.",
    "seoTitle": "How to Become a Doctor in UK: Full GMC Guide",
    "seoDescription": "How to become a doctor in UK as an international medical graduate: eligibility, EPIC verification, English testing, the UKMLA, and full GMC registration.",
    "primaryKeyword": "how to become a doctor in UK",
    "featuredImageKeyword": "how to become a doctor in UK GMC",
    "featuredImageUrl": "/images/how-to-become-a-doctor-in-the-uk-gmc-registration-guide-featured.webp",
    "featuredImageTitle": "How to Become a Doctor in the UK",
    "featuredImageAltText": "how to become a doctor in UK - international medical graduate completing the GMC registration process",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors"
  },
  {
    "slug": "ukmla-for-refugee-doctors",
    "title": "UKMLA for Refugee Doctors: The GMC Assistance Programme and Fee Support",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-refugee-doctors-featured.webp",
    "summary": "How refugee and asylum-seeking doctors can access GMC support, reduced fee arrangements and a realistic route to sitting the UKMLA and registering to practise in the UK.",
    "seoTitle": "UKMLA for Refugee Doctors: Support & Fees",
    "seoDescription": "UKMLA for refugee doctors: the GMC's refugee doctor support scheme, fee assistance, document alternatives, and the full route to GMC registration.",
    "primaryKeyword": "UKMLA for refugee doctors",
    "featuredImageKeyword": "refugee doctor UKMLA support",
    "featuredImageUrl": "/images/ukmla-for-refugee-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Refugee Doctors",
    "featuredImageAltText": "UKMLA for refugee doctors - refugee doctor receiving support to register with the GMC and sit the UKMLA",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/refugee-doctors"
  },
  {
    "slug": "uk-visa-guide-for-international-doctors",
    "title": "UK Visa Guide for International Doctors: Health and Care Worker Visa Explained",
    "date": "01 July 2026",
    "tag": "Candidate Support",
    "image": "/images/uk-visa-guide-for-international-doctors-featured.webp",
    "summary": "How the Health and Care Worker visa works for internationally trained doctors, from sponsorship and dependants to switching visas and the route to settlement.",
    "seoTitle": "UK Visa for International Doctors: Full Guide",
    "seoDescription": "UK visa for international doctors: the Health and Care Worker visa, sponsorship certificates, dependants, fees, and the route to indefinite leave to remain.",
    "primaryKeyword": "UK visa for international doctors",
    "featuredImageKeyword": "UK visa international doctor",
    "featuredImageUrl": "/images/uk-visa-guide-for-international-doctors-featured.webp",
    "featuredImageTitle": "UK Visa Guide for International Doctors",
    "featuredImageAltText": "UK visa for international doctors - doctor reviewing Health and Care Worker visa documents and passport",
    "sourceFullUrl": "https://www.gov.uk/health-care-worker-visa"
  },
  {
    "slug": "ukmla-for-filipino-doctors",
    "title": "UKMLA for Filipino Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-filipino-doctors-featured.webp",
    "summary": "A complete route guide for Filipino medical graduates covering UKMLA eligibility, PRC-to-GMC recognition, exam costs in pesos, and GMC registration.",
    "seoTitle": "UKMLA for Filipino Doctors: Route & Fees",
    "seoDescription": "UKMLA for Filipino doctors: PRC-to-GMC recognition, AKT and CPSA costs in Philippine pesos, English testing, and the full 2026 GMC registration route.",
    "primaryKeyword": "UKMLA for Filipino doctors",
    "featuredImageKeyword": "Filipino doctor UKMLA route",
    "featuredImageUrl": "/images/ukmla-for-filipino-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Filipino Doctors",
    "featuredImageAltText": "UKMLA for Filipino doctors - medical graduate from the Philippines reviewing GMC registration and UKMLA requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-international-medical-graduates-country-routes",
    "title": "UKMLA for International Medical Graduates: Country-by-Country Quick Reference",
    "date": "01 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-international-medical-graduates-country-routes-featured.webp",
    "summary": "A quick-reference guide to the UKMLA route for IMGs from Ghana, Nepal, Malaysia, Ethiopia, Sudan, Zimbabwe, Oman, the Caribbean and Southeast Asia more broadly.",
    "seoTitle": "UKMLA for International Medical Graduates",
    "seoDescription": "UKMLA for international medical graduates from Ghana, Nepal, Malaysia, Ethiopia, Sudan, Zimbabwe, Oman and the Caribbean: eligibility and fees.",
    "primaryKeyword": "UKMLA for international medical graduates",
    "featuredImageKeyword": "international medical graduate UKMLA",
    "featuredImageUrl": "/images/ukmla-for-international-medical-graduates-country-routes-featured.webp",
    "featuredImageTitle": "UKMLA for International Medical Graduates",
    "featuredImageAltText": "UKMLA for international medical graduates - world map with medical graduates from multiple countries reviewing GMC registration",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-vs-amc-and-mccqe-comparison",
    "title": "UKMLA vs AMC and MCCQE: Comparing the UK Route to Australia and Canada",
    "date": "01 July 2026",
    "tag": "Exam Comparisons",
    "image": "/images/ukmla-vs-amc-and-mccqe-comparison-featured.webp",
    "summary": "How the UKMLA compares with Australia's AMC exam and Canada's MCCQE on cost, difficulty, timeline and career prospects, for doctors choosing between destination countries.",
    "seoTitle": "UKMLA vs AMC Exam Comparison: UK or Australia?",
    "seoDescription": "UKMLA vs AMC exam comparison: cost, difficulty and career prospects for doctors deciding between the UK, Australia (AMC) and Canada (MCCQE) routes.",
    "primaryKeyword": "UKMLA vs AMC exam comparison",
    "featuredImageKeyword": "UKMLA vs AMC MCCQE comparison",
    "featuredImageUrl": "/images/ukmla-vs-amc-and-mccqe-comparison-featured.webp",
    "featuredImageTitle": "UKMLA vs AMC and MCCQE Comparison",
    "featuredImageAltText": "UKMLA vs AMC exam comparison - doctor comparing UK, Australian and Canadian medical licensing exam requirements",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/the-mla/the-mla-assessments"
  },
  {
    "slug": "ukmla-akt-pass-mark-and-pass-rate-explained",
    "title": "UKMLA AKT Pass Mark and Pass Rate Explained",
    "date": "01 July 2026",
    "tag": "Results & Data",
    "image": "/images/ukmla-akt-pass-mark-and-pass-rate-explained-featured.webp",
    "summary": "How the UKMLA AKT pass mark is set using the Angoff method, where to find official pass-rate data, and what factors actually influence a candidate's chance of passing.",
    "seoTitle": "UKMLA AKT Pass Mark and Pass Rate Explained",
    "seoDescription": "UKMLA AKT pass mark explained: how the Angoff-based cut score works, where to find official GMC pass-rate data, and what affects your chance of passing.",
    "primaryKeyword": "UKMLA AKT pass mark",
    "featuredImageKeyword": "UKMLA AKT pass mark",
    "featuredImageUrl": "/images/ukmla-akt-pass-mark-and-pass-rate-explained-featured.webp",
    "featuredImageTitle": "UKMLA AKT Pass Mark and Pass Rate",
    "featuredImageAltText": "UKMLA AKT pass mark - candidate reviewing exam score report and pass mark threshold documentation",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/the-mla/the-mla-assessments"
  },
  {
    "slug": "pharmacology-prescribing-safety-ukmla",
    "title": "Pharmacology and Prescribing Safety in the UKMLA: A Revision Guide",
    "date": "01 July 2026",
    "tag": "Syllabus Update",
    "image": "/images/pharmacology-prescribing-safety-ukmla-featured.webp",
    "summary": "The pharmacology and prescribing-safety content most likely to appear in the UKMLA AKT, from drug interactions to prescribing errors and the British National Formulary.",
    "seoTitle": "UKMLA Pharmacology Revision: Prescribing Guide",
    "seoDescription": "UKMLA pharmacology revision: high-yield drug classes, prescribing safety, common interactions, and how the AKT tests practical prescribing decisions.",
    "primaryKeyword": "UKMLA pharmacology revision",
    "featuredImageKeyword": "UKMLA pharmacology prescribing",
    "featuredImageUrl": "/images/pharmacology-prescribing-safety-ukmla-featured.webp",
    "featuredImageTitle": "Pharmacology and Prescribing Safety in the UKMLA",
    "featuredImageAltText": "UKMLA pharmacology revision - medical student reviewing prescribing charts and the British National Formulary",
    "sourceFullUrl": "https://www.gmc-uk.org/education/standards-guidance-and-curricula/standards-and-outcomes/outcomes-for-graduates"
  },
  {
    "slug": "managing-ukmla-exam-anxiety",
    "title": "Managing UKMLA Exam Anxiety: Practical Strategies for Candidates",
    "date": "01 July 2026",
    "tag": "Candidate Support",
    "image": "/images/managing-ukmla-exam-anxiety-featured.webp",
    "summary": "Practical, evidence-informed strategies for managing exam anxiety before and during the UKMLA AKT and CPSA, from preparation habits to on-the-day coping techniques.",
    "seoTitle": "UKMLA Exam Anxiety Tips: Practical Strategies",
    "seoDescription": "UKMLA exam anxiety tips: practical strategies for managing pre-exam stress, building confidence during AKT and CPSA preparation, and coping on exam day.",
    "primaryKeyword": "UKMLA exam anxiety tips",
    "featuredImageKeyword": "UKMLA exam anxiety",
    "featuredImageUrl": "/images/managing-ukmla-exam-anxiety-featured.webp",
    "featuredImageTitle": "Managing UKMLA Exam Anxiety",
    "featuredImageAltText": "UKMLA exam anxiety tips - medical student practising calming techniques before the UKMLA exam",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/the-mla/the-mla-assessments"
  },
  {
    "slug": "how-to-pass-ukmla-on-first-attempt",
    "title": "How to Pass the UKMLA on Your First Attempt",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/how-to-pass-ukmla-on-first-attempt-featured.webp",
    "summary": "A comprehensive, evidence-based guide to maximising your chances of passing the UKMLA first time - realistic study timelines, content-map revision strategy, common first-attempt failure causes, and self-assessment signals for both UK medical students and IMGs.",
    "seoTitle": "How to Pass UKMLA on First Attempt: Complete Guide",
    "seoDescription": "How to pass UKMLA on first attempt: realistic timelines, content-map revision plan, common failure causes, and readiness signals for UK students and IMGs.",
    "primaryKeyword": "how to pass UKMLA on first attempt",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/how-to-pass-ukmla-on-first-attempt-featured.webp",
    "featuredImageTitle": "Medical student preparing for the UKMLA exam",
    "featuredImageAltText": "Medical student studying revision notes and a textbook, illustrating how to pass UKMLA on first attempt",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-syllabus-2026-changes",
    "title": "UKMLA Syllabus 2026 Changes: What's New in the Updated MLA Content Map",
    "date": "02 July 2026",
    "tag": "Syllabus Update",
    "image": "/images/ukmla-syllabus-2026-changes-featured.webp",
    "summary": "The GMC's updated MLA content map takes effect for all UKMLA and PLAB assessments from September 2026 - here is what expanded, what changed structurally, and how to adapt your revision plan.",
    "seoTitle": "UKMLA Syllabus 2026 Changes: What's New for Candidates",
    "seoDescription": "UKMLA syllabus 2026 changes explained: 430 conditions, no more specialty grid, new topics, and what it means for UK students and IMGs from September 2026.",
    "primaryKeyword": "UKMLA syllabus 2026 changes",
    "featuredImageKeyword": "Syllabus Update",
    "featuredImageUrl": "/images/ukmla-syllabus-2026-changes-featured.webp",
    "featuredImageTitle": "Medical textbook and checklist representing the UKMLA syllabus 2026 changes",
    "featuredImageAltText": "UKMLA syllabus 2026 changes concept - open medical textbook and clipboard checklist representing the updated MLA content map",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "foundation-year-vs-specialty-training-for-imgs",
    "title": "Foundation Year vs Specialty Training for IMGs: Which Route After the UKMLA?",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/foundation-year-vs-specialty-training-for-imgs-featured.webp",
    "summary": "A structural guide for IMGs deciding, after UKMLA success and GMC registration, whether they need the Foundation Programme or can apply directly into specialty, core, or GP training.",
    "seoTitle": "Foundation Year vs Specialty Training IMG Guide",
    "seoDescription": "Foundation year vs specialty training IMG: how GMC registration type and prior experience decide whether to enter FY1/FY2 or apply direct to CT1/ST1.",
    "primaryKeyword": "foundation year vs specialty training IMG",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/foundation-year-vs-specialty-training-for-imgs-featured.webp",
    "featuredImageTitle": "Doctor at a career crossroads between Foundation Programme and specialty training",
    "featuredImageAltText": "Foundation year vs specialty training IMG decision - junior doctor at a hospital corridor crossroads holding documents",
    "sourceFullUrl": "https://foundationprogramme.nhs.uk/"
  },
  {
    "slug": "gmc-registration-refund-policy",
    "title": "GMC Registration Refund Policy: When You Can (and Can't) Get Your Fee Back",
    "date": "02 July 2026",
    "tag": "Fees & Funding",
    "image": "/images/gmc-registration-refund-policy-featured.webp",
    "summary": "A full breakdown of the GMC registration refund policy - the £110 scrutiny fee, the 5-working-day refund timeline, retention fee refunds on voluntary removal, and the scenarios where no refund is given at all.",
    "seoTitle": "GMC Registration Refund Policy: Full 2026 Guide",
    "seoDescription": "The GMC registration refund policy explained: £110 scrutiny fee, 5-working-day refunds, retention fee refunds, and what IMGs and UK doctors should know.",
    "primaryKeyword": "GMC registration refund policy",
    "featuredImageKeyword": "Fees & Funding",
    "featuredImageUrl": "/images/gmc-registration-refund-policy-featured.webp",
    "featuredImageTitle": "Calculator, pound notes and paperwork representing the GMC registration refund policy",
    "featuredImageAltText": "GMC registration refund policy concept - calculator, British pound notes and official paperwork on a desk",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/managing-your-registration/fees-and-funding/application-fee-refunds-and-fees-we-keep"
  },
  {
    "slug": "ukmla-anki-deck-and-flashcard-revision-guide",
    "title": "UKMLA Anki Deck and Flashcard Revision: The Complete Guide",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/ukmla-anki-deck-and-flashcard-revision-guide-featured.webp",
    "summary": "There is no official UKMLA Anki deck download, so this guide shows you how to build a fully content-map-aligned deck yourself and how to rigorously evaluate any pre-made deck you come across instead.",
    "seoTitle": "UKMLA Anki Deck Download: Build & Evaluate Guide",
    "seoDescription": "UKMLA Anki deck download guide: how spaced repetition works, building your own deck from the content map, and a checklist for judging any pre-made deck.",
    "primaryKeyword": "UKMLA Anki deck download",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/ukmla-anki-deck-and-flashcard-revision-guide-featured.webp",
    "featuredImageTitle": "Medical student using digital flashcard revision on a laptop",
    "featuredImageAltText": "UKMLA Anki deck download concept - medical student reviewing digital flashcard-style revision material on a laptop",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "ukmla-crash-course-for-doctors",
    "title": "UKMLA Crash Course for Doctors: How to Choose the Right Intensive Course",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/ukmla-crash-course-for-doctors-featured.webp",
    "summary": "A decision framework for evaluating any UKMLA crash course for doctors - who benefits, what a credible course should cover under the updated 2026 syllabus, and the red flags to watch for before paying.",
    "seoTitle": "UKMLA Crash Course for Doctors: Course Guide",
    "seoDescription": "Choosing a UKMLA crash course for doctors: what a credible course covers, red flags to avoid, and how cost compares to official AKT and CPSA exam fees.",
    "primaryKeyword": "UKMLA crash course for doctors",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/ukmla-crash-course-for-doctors-featured.webp",
    "featuredImageTitle": "Doctors attending an intensive UKMLA crash course workshop",
    "featuredImageAltText": "UKMLA crash course for doctors - group revision workshop with whiteboard teaching session",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "medical-training-prioritisation-act-2026-imgs",
    "title": "The Medical Training Prioritisation Act 2026: What It Means for IMGs",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/medical-training-prioritisation-act-2026-imgs-featured.webp",
    "summary": "The Medical Training Prioritisation Act 2026 reorders competition for UK foundation and specialty training posts in favour of UK graduates and defined priority groups - but it leaves UKMLA eligibility and GMC registration completely untouched. This guide explains what changed, why, and what it means practically for IMGs planning a UK career.",
    "seoTitle": "Medical Training Prioritisation Act 2026: IMG Guide",
    "seoDescription": "Medical Training Prioritisation Act 2026 explained: who it prioritises for UK training posts, why it passed, and what it does NOT change for IMGs and the UKMLA.",
    "primaryKeyword": "Medical Training Prioritisation Act 2026",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/medical-training-prioritisation-act-2026-imgs-featured.webp",
    "featuredImageTitle": "Houses of Parliament representing the Medical Training Prioritisation Act 2026",
    "featuredImageAltText": "Medical Training Prioritisation Act 2026 concept - UK Houses of Parliament, where the Act was passed into law",
    "sourceFullUrl": "https://www.gov.uk/government/publications/impact-statement-medical-training-prioritisation-bill/medical-training-prioritisation-bill-impact-statement"
  },
  {
    "slug": "medical-training-initiative-scheme-closure-2026",
    "title": "Medical Training Initiative Scheme Closure 2026: What IMGs Need to Know",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/medical-training-initiative-scheme-closure-2026-featured.webp",
    "summary": "NHS England closed the Medical Training Initiative to new applicants at noon on 31 March 2026 - here's the confirmed timeline, what it means for current MTI doctors, and why the UKMLA and GMC registration route remains fully open for IMGs.",
    "seoTitle": "Medical Training Initiative Scheme Closure 2026",
    "seoDescription": "Medical Training Initiative scheme closure 2026: key dates, why MTI closed to new applicants, and the UKMLA/GMC routes still fully open to IMGs.",
    "primaryKeyword": "Medical Training Initiative scheme closure 2026",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/medical-training-initiative-scheme-closure-2026-featured.webp",
    "featuredImageTitle": "Overseas doctor arriving for UK clinical training after the MTI scheme closure",
    "featuredImageAltText": "Doctor with suitcase and stethoscope outside an NHS hospital, representing the Medical Training Initiative scheme closure 2026 and the journey IMGs now take via the standard UKMLA route",
    "sourceFullUrl": "https://mti.aomrc.org.uk/special-update-mti-scheme-closure/"
  },
  {
    "slug": "uk-visa-salary-threshold-changes-2026-for-doctors",
    "title": "UK Visa Salary Threshold Changes 2026: What Doctors Need to Know",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/uk-visa-salary-threshold-changes-2026-for-doctors-featured.webp",
    "summary": "A focused look at what genuinely changed in the UK visa salary threshold 2026 rules for doctors - the new pay-period compliance check, the closing £31,300 transitional window, and the December 2026 Immigration Salary List withdrawal - and who actually needs to worry.",
    "seoTitle": "UK Visa Salary Threshold 2026: What Changed for Doctors",
    "seoDescription": "UK visa salary threshold 2026 explained for doctors: the £41,700 and £25,000 figures, the new pay-period rule, and who genuinely needs to check their pay.",
    "primaryKeyword": "UK visa salary threshold 2026",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/uk-visa-salary-threshold-changes-2026-for-doctors-featured.webp",
    "featuredImageTitle": "UK visa salary threshold 2026 - passport, payslip and pen on a desk",
    "featuredImageAltText": "UK visa salary threshold 2026 concept - passport and payslip representing doctor visa sponsorship pay rules",
    "sourceFullUrl": "https://www.nhsemployers.org/news/health-and-care-worker-visa-salary-threshold"
  },
  {
    "slug": "gmc-order-reform-2026-protected-medical-titles",
    "title": "GMC Order Reform 2026: The Consultation on Protected Medical Titles",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/gmc-order-reform-2026-protected-medical-titles-featured.webp",
    "summary": "A neutral guide to the live UK government consultation on reforming the General Medical Council Order, covering the proposals on protected medical titles, the BMA's campaign position, and what UK medical students and IMGs should understand before the consultation closes on 21 July 2026.",
    "seoTitle": "GMC Order Reform 2026: Protected Titles Explained",
    "seoDescription": "GMC Order reform 2026 explained: the consultation on protected medical titles, the BMA's position, the Leng Review link, and the 21 July 2026 deadline.",
    "primaryKeyword": "GMC Order reform 2026",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/gmc-order-reform-2026-protected-medical-titles-featured.webp",
    "featuredImageTitle": "Gavel and stethoscope symbolising GMC Order reform 2026 and medical title regulation",
    "featuredImageAltText": "Gavel and stethoscope on an official document representing the GMC Order reform 2026 consultation on protected medical titles",
    "sourceFullUrl": "https://www.gov.uk/government/consultations/reforming-the-general-medical-council-legislative-framework/reforming-the-general-medical-council-legislative-framework-consultation-document"
  },
  {
    "slug": "gmc-regulation-of-physician-associates-what-doctors-need-to-know",
    "title": "GMC Regulation of Physician Associates: What Doctors Need to Know",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/gmc-regulation-of-physician-associates-what-doctors-need-to-know-featured.webp",
    "summary": "A factual guide to what GMC regulation of physician associates means in practice for doctors - the registration timeline, the named-supervisor model, and the December 2026 criminal-offence deadline.",
    "seoTitle": "GMC Regulation of Physician Associates: What to Know",
    "seoDescription": "GMC regulation of physician associates explained: registration timeline, named-supervisor model, scope of practice, and the December 2026 deadline for doctors.",
    "primaryKeyword": "GMC regulation of physician associates",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/gmc-regulation-of-physician-associates-what-doctors-need-to-know-featured.webp",
    "featuredImageTitle": "Clinical multidisciplinary team meeting representing GMC regulation of physician associates",
    "featuredImageAltText": "GMC regulation of physician associates concept - clinical team reviewing patient care in an NHS ward meeting",
    "sourceFullUrl": "https://www.gmc-uk.org/about/what-we-do-and-why/regulating-physician-associates-and-anaesthesia-associates"
  },
  {
    "slug": "foundation-programme-2026-recruitment-changes",
    "title": "Foundation Programme 2026 Recruitment Changes: What's New for Applicants",
    "date": "02 July 2026",
    "tag": "Getting Started",
    "image": "/images/foundation-programme-2026-recruitment-changes-featured.webp",
    "summary": "A practical guide to the Foundation Programme 2026 recruitment changes: Foundation Priority Programmes folded into the main PIA round, new prioritisation rules, and what final-year applicants need to do differently this year.",
    "seoTitle": "Foundation Programme 2026 Recruitment Changes Guide",
    "seoDescription": "Foundation Programme 2026 recruitment changes explained: FPP folded into PIA, new prioritisation rules, no SJT/EPM, and the full UKFPO application timeline.",
    "primaryKeyword": "Foundation Programme 2026 recruitment changes",
    "featuredImageKeyword": "Getting Started",
    "featuredImageUrl": "/images/foundation-programme-2026-recruitment-changes-featured.webp",
    "featuredImageTitle": "Final-year medical student completing a Foundation Programme 2026 application",
    "featuredImageAltText": "Foundation Programme 2026 recruitment changes - medical student completing an online Foundation Programme application on a laptop",
    "sourceFullUrl": "https://foundationprogramme.nhs.uk/important-update-on-foundation-programme-2026-recruitment-foundation-priority-programmes-fpp-2026-and-f2-stand-alone-2026-recruitment/"
  },
  {
    "slug": "gmc-welcome-to-uk-practice-induction-guide",
    "title": "GMC Welcome to UK Practice: A Guide to the Free Induction Workshop",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/gmc-welcome-to-uk-practice-induction-guide-featured.webp",
    "summary": "GMC Welcome to UK Practice is a free half-day ethics workshop for newly registered IMGs - here's what it covers, how to book it, and what wider NHS induction support to ask for alongside it.",
    "seoTitle": "GMC Welcome to UK Practice: Free Induction Workshop",
    "seoDescription": "GMC Welcome to UK Practice explained: what the free half-day workshop covers, how IMGs book a place, and the wider NHS induction support to expect.",
    "primaryKeyword": "GMC Welcome to UK Practice",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/gmc-welcome-to-uk-practice-induction-guide-featured.webp",
    "featuredImageTitle": "Doctors attending a GMC Welcome to UK Practice induction workshop",
    "featuredImageAltText": "GMC Welcome to UK Practice workshop - diverse group of international doctors discussing ethical scenarios in a training session",
    "sourceFullUrl": "https://www.gmc-uk.org/about/what-we-do-and-why/learning-and-support/workshops/welcome-to-uk-practice"
  },
  {
    "slug": "oet-vs-ielts-for-gmc-registration-comparison",
    "title": "OET vs IELTS for GMC Registration: Which Should You Take?",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/oet-vs-ielts-for-gmc-registration-comparison-featured.webp",
    "summary": "A neutral, GMC-sourced head-to-head comparison of OET and IELTS for GMC registration, covering exact score thresholds, format differences, cost, and the new 2026 visa English-language wrinkle.",
    "seoTitle": "OET vs IELTS for GMC Registration: Full Comparison",
    "seoDescription": "OET vs IELTS for GMC registration compared: exact score thresholds, format differences, cost, validity, and the 2026 visa English-language rule for IMGs.",
    "primaryKeyword": "OET vs IELTS for GMC registration",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/oet-vs-ielts-for-gmc-registration-comparison-featured.webp",
    "featuredImageTitle": "Candidate taking an English language proficiency test on a computer",
    "featuredImageAltText": "OET vs IELTS for GMC registration concept - candidate sitting a computer-based English language test with headphones",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/evidence-of-your-knowledge-of-english"
  },
  {
    "slug": "is-ukmla-replacing-plab-explained",
    "title": "Is UKMLA Replacing PLAB? The Real Relationship, Explained",
    "date": "02 July 2026",
    "tag": "Exam Comparisons",
    "image": "/images/is-ukmla-replacing-plab-explained-featured.webp",
    "summary": "IMGs often ask whether the UKMLA is replacing PLAB entirely - this guide gives the direct answer (no) and explains exactly how the two routes have converged onto one shared MLA standard.",
    "seoTitle": "Is UKMLA Replacing PLAB? The Real Relationship",
    "seoDescription": "Is UKMLA replacing PLAB? No - PLAB continues as the IMG route, now aligned to the same MLA content map as the UKMLA. Here's the full, current picture.",
    "primaryKeyword": "is UKMLA replacing PLAB",
    "featuredImageKeyword": "Exam Comparisons",
    "featuredImageUrl": "/images/is-ukmla-replacing-plab-explained-featured.webp",
    "featuredImageTitle": "Is UKMLA Replacing PLAB - Two Exam Routes Converging Featured Image",
    "featuredImageAltText": "Is UKMLA replacing PLAB concept - two paths converging into one, representing PLAB and UKMLA sharing the same MLA standard",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/plab-and-the-mla"
  },
  {
    "slug": "what-happens-if-you-fail-ukmla-foundation-year-impact",
    "title": "What Happens If You Fail the UKMLA? The Impact on Your Foundation Year",
    "date": "02 July 2026",
    "tag": "Results & Data",
    "image": "/images/what-happens-if-you-fail-ukmla-foundation-year-impact-featured.webp",
    "summary": "A clear-eyed guide for UK final-year students on what happens if you fail UKMLA - how it affects your Foundation Programme allocation, your FY1 start date, and what to do first.",
    "seoTitle": "What Happens If You Fail UKMLA: Foundation Year Impact",
    "seoDescription": "What happens if you fail UKMLA as a UK final-year student: the impact on your Foundation Programme start, PIA allocation, and deferred entry options.",
    "primaryKeyword": "what happens if you fail UKMLA",
    "featuredImageKeyword": "Results & Data",
    "featuredImageUrl": "/images/what-happens-if-you-fail-ukmla-foundation-year-impact-featured.webp",
    "featuredImageTitle": "UK medical student reviewing a calendar after a UKMLA result",
    "featuredImageAltText": "Medical student looking thoughtfully at a planner, illustrating what happens if you fail UKMLA and plan a resit",
    "sourceFullUrl": "https://foundationprogramme.nhs.uk/"
  },
  {
    "slug": "ukmla-and-academic-foundation-programme",
    "title": "UKMLA and the Academic Foundation Programme: What Research-Minded Students Need to Know",
    "date": "02 July 2026",
    "tag": "Getting Started",
    "image": "/images/ukmla-and-academic-foundation-programme-featured.webp",
    "summary": "A practical guide for research-minded UK final-year students on how the Academic Foundation Programme (AFP) works alongside, never instead of, the UKMLA - covering who AFP suits, the AFP/SFP application process, and how to balance an AFP application with UKMLA revision in the same academic year.",
    "seoTitle": "UKMLA for Academic Foundation Programme: AFP Explained",
    "seoDescription": "UKMLA for academic foundation programme applicants: what AFP is, who it suits, the SFP application process, and balancing it with UKMLA revision.",
    "primaryKeyword": "UKMLA for academic foundation programme",
    "featuredImageKeyword": "Getting Started",
    "featuredImageUrl": "/images/ukmla-and-academic-foundation-programme-featured.webp",
    "featuredImageTitle": "Medical student reviewing research papers and clinical notes for the Academic Foundation Programme",
    "featuredImageAltText": "UKMLA for academic foundation programme concept - junior doctor reviewing academic research papers alongside clinical notes",
    "sourceFullUrl": "https://foundationprogramme.nhs.uk/programmes/2-year-foundation-programme/ukfp/specialised-foundation-programmes/"
  },
  {
    "slug": "gmc-recognised-primary-medical-qualifications",
    "title": "Which Medical Qualifications Does the GMC Accept? PMQ Recognition Explained",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/gmc-recognised-primary-medical-qualifications-featured.webp",
    "summary": "A generic, worldwide explainer on how the GMC checks whether a primary medical qualification (PMQ) is acceptable, covering the World Directory of Medical Schools and EPIC/primary source verification for IMGs from any country.",
    "seoTitle": "Primary Medical Qualification GMC Accepted?",
    "seoDescription": "Is your primary medical qualification GMC accepted? Learn how PMQ recognition works via WDOMS and EPIC verification, and how to check your own degree.",
    "primaryKeyword": "primary medical qualification GMC accepted",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/gmc-recognised-primary-medical-qualifications-featured.webp",
    "featuredImageTitle": "Medical degree certificate and passport being reviewed for GMC primary medical qualification recognition",
    "featuredImageAltText": "Primary medical qualification documents and passport being reviewed for GMC acceptance",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/acceptable-overseas-qualifications-for-doctors"
  },
  {
    "slug": "internship-requirement-for-gmc-registration",
    "title": "The Internship Requirement for GMC Registration, Explained",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/internship-requirement-for-gmc-registration-featured.webp",
    "summary": "A complete explanation of the internship requirement for GMC registration - why the GMC requires supervised practice evidence alongside a medical degree, what counts as qualifying practice, and how to avoid the documentation pitfalls that delay IMG applications.",
    "seoTitle": "Internship Requirement for GMC Registration Explained",
    "seoDescription": "The internship requirement for GMC registration explained: what counts as qualifying supervised practice, evidence needed, and common IMG pitfalls.",
    "primaryKeyword": "internship requirement for GMC registration",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/internship-requirement-for-gmc-registration-featured.webp",
    "featuredImageTitle": "Newly qualified doctor supervised by a senior colleague during a hospital ward round",
    "featuredImageAltText": "Internship requirement for GMC registration shown through a supervised hospital ward round for a newly qualified doctor",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/check-if-your-practical-training-internship-is-acceptable"
  },
  {
    "slug": "how-long-does-gmc-registration-take",
    "title": "How Long Does GMC Registration Take? A Realistic Timeline",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/how-long-does-gmc-registration-take-featured.webp",
    "summary": "A stage-by-stage realistic timeline for how long GMC registration takes, from UKMLA passes and EPIC verification through to the GMC's own processing decision, for both UK graduates and IMGs.",
    "seoTitle": "How Long Does GMC Registration Take? Realistic Timeline",
    "seoDescription": "How long does GMC registration take? A realistic stage-by-stage timeline covering UKMLA, EPIC verification, English tests, and GMC processing time.",
    "primaryKeyword": "how long does GMC registration take",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/how-long-does-gmc-registration-take-featured.webp",
    "featuredImageTitle": "Realistic GMC registration timeline concept with calendar and stethoscope",
    "featuredImageAltText": "How long does GMC registration take - calendar, stethoscope and documents representing the registration timeline",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/registration-applications/application-registration"
  },
  {
    "slug": "locally-employed-doctors-route-to-gmc-registration",
    "title": "Locally Employed Doctors: The Route to Full and Specialist GMC Registration",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/locally-employed-doctors-route-to-gmc-registration-featured.webp",
    "summary": "A guide for doctors already working as Locally Employed Doctors (Trust grade/SAS-track) in the NHS on how to progress from non-training posts to full specialist or GP registration via the GMC's CESR/CEGPR Portfolio Pathway.",
    "seoTitle": "Locally Employed Doctors GMC Registration: Full Route",
    "seoDescription": "Locally employed doctors GMC registration to Specialist/GP Register runs via CESR/CEGPR (the Portfolio Pathway) - how LEDs build a winning portfolio.",
    "primaryKeyword": "locally employed doctors GMC registration",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/locally-employed-doctors-route-to-gmc-registration-featured.webp",
    "featuredImageTitle": "Experienced doctor reviewing a CESR/CEGPR portfolio of certificates in a hospital office",
    "featuredImageAltText": "Locally employed doctor reviewing GMC registration portfolio documents and certificates",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/registration-applications/specialist-application-guides/specialist-registration-portfolio"
  },
  {
    "slug": "ukmla-exam-booking-process-gmc-online",
    "title": "The UKMLA Exam Booking Process: A Step-by-Step Walkthrough",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/ukmla-exam-booking-process-gmc-online-featured.webp",
    "summary": "A practical, step-by-step walkthrough of the UKMLA exam booking process - how UK students book the AKT through their medical school, and how IMGs book the AKT via Pearson VUE and the CPSA directly with the GMC.",
    "seoTitle": "UKMLA Exam Booking Process: Step-by-Step Guide",
    "seoDescription": "The UKMLA exam booking process explained: how UK students and IMGs book the AKT and CPSA, plus rescheduling, cancellation, and adjustment requests.",
    "primaryKeyword": "UKMLA exam booking process",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/ukmla-exam-booking-process-gmc-online-featured.webp",
    "featuredImageTitle": "UKMLA exam booking process on GMC Online and Pearson VUE",
    "featuredImageAltText": "UKMLA exam booking process shown as a candidate scheduling an AKT test appointment online with a calendar visible",
    "sourceFullUrl": "https://home.pearsonvue.com/gmc"
  },
  {
    "slug": "gmc-english-language-exemption-for-imgs",
    "title": "GMC English Language Exemption: Do You Need to Sit IELTS or OET?",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/gmc-english-language-exemption-for-imgs-featured.webp",
    "summary": "A GMC English language exemption is available only in narrow, evidence-specific circumstances - this guide explains the three recognised grounds, the documentary proof each requires, and when to simply prepare for OET or IELTS instead.",
    "seoTitle": "GMC English Language Exemption: Who Qualifies?",
    "seoDescription": "GMC English language exemption explained: who qualifies, what evidence the GMC accepts, and why most IMGs should still prepare for IELTS or OET.",
    "primaryKeyword": "GMC English language exemption",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/gmc-english-language-exemption-for-imgs-featured.webp",
    "featuredImageTitle": "Doctor reviewing English language certificates and documents at a desk",
    "featuredImageAltText": "Doctor reviewing documents relevant to a GMC English language exemption claim at a desk",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/evidence-of-your-knowledge-of-english"
  },
  {
    "slug": "gmc-revalidation-process-explained",
    "title": "The GMC Revalidation Process, Explained for New Doctors",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/gmc-revalidation-process-explained-featured.webp",
    "summary": "The GMC revalidation process is the ongoing, five-yearly confirmation that a licensed doctor remains fit to practise, built on annual appraisals - here is what newly registered UK graduates and IMGs should start doing from day one.",
    "seoTitle": "GMC Revalidation Process: A Guide for New Doctors",
    "seoDescription": "The GMC revalidation process explained: how the five-yearly appraisal cycle works, the Responsible Officer's role, and what to do without one.",
    "primaryKeyword": "GMC revalidation process",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/gmc-revalidation-process-explained-featured.webp",
    "featuredImageTitle": "Doctor Reflecting on Practice for the GMC Revalidation Process",
    "featuredImageAltText": "GMC revalidation process concept - doctor writing reflections in a practice portfolio at a desk",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/managing-your-registration/revalidation"
  },
  {
    "slug": "types-of-gmc-registration-explained",
    "title": "Types of GMC Registration Explained: Provisional, Full, Specialist and GP",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/types-of-gmc-registration-explained-featured.webp",
    "summary": "A clear, structural guide to the four types of GMC registration - provisional, full, Specialist Register and GP Register - explaining what each means, who holds it, and how registration differs from a licence to practise.",
    "seoTitle": "Types of GMC Registration Explained: Full Guide",
    "seoDescription": "Types of GMC registration explained: provisional, full, Specialist and GP Register, plus how registration differs from a licence to practise.",
    "primaryKeyword": "types of GMC registration",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/types-of-gmc-registration-explained-featured.webp",
    "featuredImageTitle": "Official medical registration certificate and stethoscope",
    "featuredImageAltText": "Types of GMC registration concept - official certificate, ID badge and stethoscope representing provisional, full, Specialist and GP registration",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/register-as-a-doctor"
  },
  {
    "slug": "gmc-fitness-to-practise-explained-for-new-doctors",
    "title": "GMC Fitness to Practise Explained: What New Doctors Need to Know",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/gmc-fitness-to-practise-explained-for-new-doctors-featured.webp",
    "summary": "A calm, factual explainer for newly registered doctors on what GMC fitness to practise means, how concerns are handled, and the day-one habits that reduce risk.",
    "seoTitle": "GMC Fitness to Practise: A Guide for New Doctors",
    "seoDescription": "GMC fitness to practise explained for new doctors: how concerns are assessed, likely outcomes, and simple habits from day one that reduce professional risk.",
    "primaryKeyword": "GMC fitness to practise",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/gmc-fitness-to-practise-explained-for-new-doctors-featured.webp",
    "featuredImageTitle": "GMC Fitness to Practise Explained for New Doctors",
    "featuredImageAltText": "GMC fitness to practise concept - newly registered doctor calmly reviewing professional standards guidance in a hospital office",
    "sourceFullUrl": "https://www.gmc-uk.org/concerns/information-for-doctors-under-investigation/fitness-to-practise-explained"
  },
  {
    "slug": "toxicology-and-poisoning-ukmla",
    "title": "Toxicology and Poisoning in the UKMLA: High-Yield Overdose Management",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/toxicology-and-poisoning-ukmla-featured.webp",
    "summary": "Toxicology UKMLA questions sit at the intersection of pharmacology and emergency medicine, and they are tested precisely because a foundation doctor is expected to recognise a poisoned patient, start safe initial treatment, and know when to call for expert help without hesitating.",
    "seoTitle": "Toxicology UKMLA: Overdoses & Antidotes Guide",
    "seoDescription": "This toxicology UKMLA guide covers high-yield overdose recognition, key antidotes, ECG changes and safe initial treatment thresholds for the AKT and CPSA.",
    "primaryKeyword": "toxicology UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/toxicology-and-poisoning-ukmla-featured.webp",
    "featuredImageTitle": "Toxicology and Poisoning in the UKMLA: High-Yield Overdose Management",
    "featuredImageAltText": "toxicology UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.toxbase.org"
  },
  {
    "slug": "sepsis-recognition-and-management-ukmla",
    "title": "Sepsis Recognition and Management in the UKMLA: The Essential Guide",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/sepsis-recognition-and-management-ukmla-featured.webp",
    "summary": "Sepsis UKMLA revision is one of the highest-yield investments a candidate can make, because sepsis sits at the intersection of almost every clinical domain the exam tests — acute medicine, paediatrics, obstetrics, primary care, and professional decision-making all converge on a single question: has this patient recognised, and are they being treated fast enough?",
    "seoTitle": "Sepsis UKMLA: Recognition & Management Guide",
    "seoDescription": "This sepsis UKMLA guide explains red-flag recognition, the Sepsis Six and escalation across acute medicine, paediatrics and obstetrics for AKT revision.",
    "primaryKeyword": "sepsis UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/sepsis-recognition-and-management-ukmla-featured.webp",
    "featuredImageTitle": "Sepsis Recognition and Management in the UKMLA: The Essential Guide",
    "featuredImageAltText": "sepsis UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/ng51"
  },
  {
    "slug": "anaesthesia-and-perioperative-medicine-ukmla",
    "title": "Anaesthesia and Perioperative Medicine in the UKMLA: A Foundation Doctor's Guide",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/anaesthesia-and-perioperative-medicine-ukmla-featured.webp",
    "summary": "Anaesthesia UKMLA questions do not expect candidates to think like an anaesthetist — they expect a foundation doctor's working knowledge of what happens to a patient before, during, and after an operation.",
    "seoTitle": "Anaesthesia UKMLA: Perioperative Medicine Guide",
    "seoDescription": "This anaesthesia UKMLA guide covers pre-operative assessment, fluids, analgesia and post-operative complications a foundation doctor must know for the AKT.",
    "primaryKeyword": "anaesthesia UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/anaesthesia-and-perioperative-medicine-ukmla-featured.webp",
    "featuredImageTitle": "Anaesthesia and Perioperative Medicine in the UKMLA: A Foundation Doctor's Guide",
    "featuredImageAltText": "anaesthesia UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/ng89"
  },
  {
    "slug": "urology-ukmla-revision",
    "title": "Urology in the UKMLA: High-Yield Topics for the AKT",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/urology-ukmla-revision-featured.webp",
    "summary": "Urology UKMLA questions turn up across the Applied Knowledge Test far more often than candidates expect, because urinary tract problems present in every setting from general practice to the emergency department.",
    "seoTitle": "Urology UKMLA: High-Yield AKT Revision Guide",
    "seoDescription": "This urology UKMLA guide covers UTIs, urinary retention, renal colic, BPH and catheterisation basics that recur across the Applied Knowledge Test.",
    "primaryKeyword": "urology UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/urology-ukmla-revision-featured.webp",
    "featuredImageTitle": "Urology in the UKMLA: High-Yield Topics for the AKT",
    "featuredImageAltText": "urology UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/ng12"
  },
  {
    "slug": "care-of-the-elderly-and-frailty-ukmla",
    "title": "Care of the Elderly and Frailty in the UKMLA: What to Revise",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/care-of-the-elderly-and-frailty-ukmla-featured.webp",
    "summary": "Care of the elderly UKMLA questions sit at the intersection of clinical reasoning, communication skill, and pragmatic prescribing, and they appear far more often than candidates expect.",
    "seoTitle": "Care of the Elderly UKMLA: Frailty Revision Guide",
    "seoDescription": "This care of the elderly UKMLA guide covers frailty assessment, falls, polypharmacy and delirium, high-yield topics tested across the AKT and CPSA.",
    "primaryKeyword": "care of the elderly UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/care-of-the-elderly-and-frailty-ukmla-featured.webp",
    "featuredImageTitle": "Care of the Elderly and Frailty in the UKMLA: What to Revise",
    "featuredImageAltText": "care of the elderly UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/cg161"
  },
  {
    "slug": "medical-statistics-and-evidence-based-medicine-ukmla",
    "title": "Medical Statistics and Evidence-Based Medicine in the UKMLA",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/medical-statistics-and-evidence-based-medicine-ukmla-featured.webp",
    "summary": "Medical statistics UKMLA questions rarely ask you to calculate anything from scratch — they ask you to recognise what a number means and apply it to a clinical decision in under 90 seconds.",
    "seoTitle": "Medical Statistics UKMLA: EBM Revision Guide",
    "seoDescription": "This medical statistics UKMLA guide explains sensitivity, specificity, relative risk and critical appraisal for fast, confident AKT decision-making.",
    "primaryKeyword": "medical statistics UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/medical-statistics-and-evidence-based-medicine-ukmla-featured.webp",
    "featuredImageTitle": "Medical Statistics and Evidence-Based Medicine in the UKMLA",
    "featuredImageAltText": "medical statistics UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.cochranelibrary.com/about/about-cochrane-reviews"
  },
  {
    "slug": "public-health-and-screening-ukmla",
    "title": "Public Health and Screening in the UKMLA: What You Need to Know",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/public-health-and-screening-ukmla-featured.webp",
    "summary": "Public health UKMLA questions sit at the intersection of population-level thinking and individual clinical decision-making, and they appear far more often in the Applied Knowledge Test than most candidates expect walking in.",
    "seoTitle": "Public Health UKMLA: Screening & Prevention",
    "seoDescription": "This public health UKMLA guide covers screening programmes, epidemiology and prevention, the population-level thinking tested across the AKT.",
    "primaryKeyword": "public health UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/public-health-and-screening-ukmla-featured.webp",
    "featuredImageTitle": "Public Health and Screening in the UKMLA: What You Need to Know",
    "featuredImageAltText": "public health UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.gov.uk/government/organisations/uk-national-screening-committee"
  },
  {
    "slug": "immunology-and-allergy-ukmla",
    "title": "Immunology and Allergy in the UKMLA: High-Yield Revision",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/immunology-and-allergy-ukmla-featured.webp",
    "summary": "Immunology UKMLA questions punch above their weight in the Applied Knowledge Test: the topic is a small slice of the GMC content map by condition count, but it recurs constantly because anaphylaxis, drug allergy and hypersensitivity reasoning are woven into scenarios from every other system.",
    "seoTitle": "Immunology UKMLA: Allergy & Anaphylaxis Guide",
    "seoDescription": "This immunology UKMLA guide covers anaphylaxis, drug allergy and hypersensitivity reasoning that recur across AKT scenarios in every specialty.",
    "primaryKeyword": "immunology UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/immunology-and-allergy-ukmla-featured.webp",
    "featuredImageTitle": "Immunology and Allergy in the UKMLA: High-Yield Revision",
    "featuredImageAltText": "immunology UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.resus.org.uk/library/additional-resources/anaphylaxis"
  },
  {
    "slug": "nutrition-and-metabolic-disorders-ukmla",
    "title": "Nutrition and Metabolic Disorders in the UKMLA: What to Revise",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/nutrition-and-metabolic-disorders-ukmla-featured.webp",
    "summary": "Nutrition UKMLA questions turn up far more often than most candidates expect, threading through gastroenterology, endocrinology, care of the elderly, and general internal medicine stations on the Applied Knowledge Test.",
    "seoTitle": "Nutrition UKMLA: Metabolic Disorders Revision",
    "seoDescription": "This nutrition UKMLA guide covers metabolic disorders across gastroenterology, endocrinology and care of the elderly, high-yield for the AKT.",
    "primaryKeyword": "nutrition UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/nutrition-and-metabolic-disorders-ukmla-featured.webp",
    "featuredImageTitle": "Nutrition and Metabolic Disorders in the UKMLA: What to Revise",
    "featuredImageAltText": "nutrition UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/cg32"
  },
  {
    "slug": "chronic-pain-management-ukmla",
    "title": "Chronic Pain Management in the UKMLA: What to Revise",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/chronic-pain-management-ukmla-featured.webp",
    "summary": "Chronic pain UKMLA questions catch out more candidates than almost any other prescribing topic, largely because the \"obvious\" answer — starting or escalating an opioid — is very often the wrong one.",
    "seoTitle": "Chronic Pain UKMLA: Safe Prescribing Guide",
    "seoDescription": "This chronic pain UKMLA guide explains why escalating opioids is often the wrong answer, covering safe prescribing principles tested across the AKT.",
    "primaryKeyword": "chronic pain UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/chronic-pain-management-ukmla-featured.webp",
    "featuredImageTitle": "Chronic Pain Management in the UKMLA: What to Revise",
    "featuredImageAltText": "chronic pain UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/ng193"
  },
  {
    "slug": "critical-care-and-intensive-care-basics-ukmla",
    "title": "Critical Care Basics in the UKMLA: Recognising the Deteriorating Patient",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/critical-care-and-intensive-care-basics-ukmla-featured.webp",
    "summary": "Critical care UKMLA questions sit at the heart of the AKT because the GMC's overriding concern at the point of licensure is whether a newly qualified doctor can safely recognise a patient who is deteriorating on a general ward, begin the correct initial treatment, and escalate to more senior help at the right moment.",
    "seoTitle": "Critical Care UKMLA: The Deteriorating Patient",
    "seoDescription": "This critical care UKMLA guide covers recognising and escalating the deteriorating ward patient, a core GMC licensure concern tested across the AKT.",
    "primaryKeyword": "critical care UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/critical-care-and-intensive-care-basics-ukmla-featured.webp",
    "featuredImageTitle": "Critical Care Basics in the UKMLA: Recognising the Deteriorating Patient",
    "featuredImageAltText": "critical care UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.rcp.ac.uk/improving-care/resources/national-early-warning-score-news-2/"
  },
  {
    "slug": "consent-and-mental-capacity-ukmla",
    "title": "Consent and Mental Capacity in the UKMLA: The Complete Guide",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/consent-and-mental-capacity-ukmla-featured.webp",
    "summary": "Consent and mental capacity UKMLA questions sit at the heart of both exam components, testing not just whether you can recite the Mental Capacity Act 2005 but whether you can apply its logic to a patient in front of you under time pressure.",
    "seoTitle": "Consent and Mental Capacity UKMLA Guide",
    "seoDescription": "This consent and mental capacity UKMLA guide applies the Mental Capacity Act 2005 to real exam scenarios tested across both the AKT and CPSA.",
    "primaryKeyword": "consent and mental capacity UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/consent-and-mental-capacity-ukmla-featured.webp",
    "featuredImageTitle": "Consent and Mental Capacity in the UKMLA: The Complete Guide",
    "featuredImageAltText": "consent and mental capacity UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.gmc-uk.org/ethical-guidance/ethical-guidance-for-doctors/consent"
  },
  {
    "slug": "indemnity-insurance-for-doctors-explained",
    "title": "Indemnity Insurance for Doctors, Explained",
    "date": "02 July 2026",
    "tag": "Fees & Funding",
    "image": "/images/indemnity-insurance-for-doctors-explained-featured.webp",
    "summary": "Indemnity insurance for doctors is one of the most misunderstood parts of practising medicine in the UK, largely because two genuinely different systems get bundled together in most people's minds under a single phrase.",
    "seoTitle": "Indemnity Insurance for Doctors, Explained",
    "seoDescription": "Indemnity insurance for doctors explained: NHS Clinical Negligence Scheme cover, private practice gaps, and what new UK graduates and IMGs need.",
    "primaryKeyword": "indemnity insurance for doctors",
    "featuredImageKeyword": "Fees & Funding",
    "featuredImageUrl": "/images/indemnity-insurance-for-doctors-explained-featured.webp",
    "featuredImageTitle": "Indemnity Insurance for Doctors, Explained",
    "featuredImageAltText": "indemnity insurance for doctors concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://resolution.nhs.uk/services/claims-management/clinical-schemes/clinical-negligence-scheme-for-trusts/"
  },
  {
    "slug": "multi-specialty-recruitment-assessment-msra-explained",
    "title": "The Multi-Specialty Recruitment Assessment (MSRA), Explained",
    "date": "02 July 2026",
    "tag": "Candidate Support",
    "image": "/images/multi-specialty-recruitment-assessment-msra-explained-featured.webp",
    "summary": "The Multi-Specialty Recruitment Assessment is a computer-based selection test used as part of shortlisting for a number of UK postgraduate training programmes, sat well after the UKMLA and Foundation Programme are behind you.",
    "seoTitle": "MSRA: Multi-Specialty Recruitment Assessment",
    "seoDescription": "The Multi-Specialty Recruitment Assessment explained: what it tests, which specialties use it, and how it differs from the UKMLA and Foundation Programme.",
    "primaryKeyword": "Multi-Specialty Recruitment Assessment",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/multi-specialty-recruitment-assessment-msra-explained-featured.webp",
    "featuredImageTitle": "The Multi-Specialty Recruitment Assessment (MSRA), Explained",
    "featuredImageAltText": "Multi-Specialty Recruitment Assessment concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://medical.hee.nhs.uk/medical-training-recruitment/medical-specialty-training/multi-specialty-recruitment-assessment-msra"
  },
  {
    "slug": "locum-vs-substantive-nhs-posts-explained",
    "title": "Locum vs Substantive NHS Posts: Which Is Right for You?",
    "date": "02 July 2026",
    "tag": "Candidate Support",
    "image": "/images/locum-vs-substantive-nhs-posts-explained-featured.webp",
    "summary": "Weighing up locum vs substantive NHS posts is one of the most consequential practical decisions a doctor makes once GMC registration and a licence to practise are in place — and it is a decision that applies equally to UK medical graduates finishing Foundation Programme and to international medical graduates (IMGs) arriving for their first NHS role.",
    "seoTitle": "Locum vs Substantive NHS Posts Explained",
    "seoDescription": "Locum vs substantive NHS posts explained: pay, job security, pension access and career progression differences for UK graduates and IMGs alike.",
    "primaryKeyword": "locum vs substantive NHS posts",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/locum-vs-substantive-nhs-posts-explained-featured.webp",
    "featuredImageTitle": "Locum vs Substantive NHS Posts: Which Is Right for You?",
    "featuredImageAltText": "locum vs substantive NHS posts concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/managing-your-registration/revalidation/revalidation-for-doctors-questions-and-answers"
  },
  {
    "slug": "understanding-nhs-pay-scales-and-banding-for-doctors",
    "title": "Understanding NHS Pay Scales and Banding for Doctors",
    "date": "02 July 2026",
    "tag": "Candidate Support",
    "image": "/images/understanding-nhs-pay-scales-and-banding-for-doctors-featured.webp",
    "summary": "NHS pay scales and banding are the two mechanisms that together determine what any doctor working in the NHS actually earns, and confusing the two is one of the most common sources of pay surprise for both new UK graduates and internationally trained doctors starting their first NHS post.",
    "seoTitle": "NHS Pay Scales and Banding for Doctors Guide",
    "seoDescription": "NHS pay scales and banding explained: how basic pay nodal points combine with banding supplements to determine a doctor's actual take-home pay.",
    "primaryKeyword": "NHS pay scales and banding",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/understanding-nhs-pay-scales-and-banding-for-doctors-featured.webp",
    "featuredImageTitle": "Understanding NHS Pay Scales and Banding for Doctors",
    "featuredImageAltText": "NHS pay scales and banding concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.bma.org.uk/pay-and-contracts/pay/junior-doctors-pay-scale/pay-scales-for-junior-doctors"
  },
  {
    "slug": "ewtd-working-hours-and-rest-rules-for-doctors",
    "title": "Working Hours and Rest Rules for Doctors: The EWTD Explained",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/ewtd-working-hours-and-rest-rules-for-doctors-featured.webp",
    "summary": "Understanding the working hours and rest rules for doctors in the NHS is one of the most practically important things any new resident doctor can do before their first shift — and yet it is routinely skipped over in induction sessions that focus instead on IT logins, ward layouts, and clinical handover paperwork.",
    "seoTitle": "Working Hours and Rest Rules for Doctors: EWTD",
    "seoDescription": "The working hours and rest rules for doctors explained: EWTD limits, mandatory rest breaks and how the Working Time Regulations protect new residents.",
    "primaryKeyword": "working hours and rest rules for doctors",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/ewtd-working-hours-and-rest-rules-for-doctors-featured.webp",
    "featuredImageTitle": "Working Hours and Rest Rules for Doctors: The EWTD Explained",
    "featuredImageAltText": "working hours and rest rules for doctors concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.bma.org.uk/pay-and-contracts/working-hours/european-working-time-directive-ewtd/doctors-and-the-european-working-time-directive"
  },
  {
    "slug": "gmc-annual-retention-fee-explained",
    "title": "The GMC Annual Retention Fee, Explained",
    "date": "02 July 2026",
    "tag": "Fees & Funding",
    "image": "/images/gmc-annual-retention-fee-explained-featured.webp",
    "summary": "The GMC annual retention fee is the yearly charge every doctor with a licence to practise in the UK must pay to remain on the medical register, and understanding it properly matters just as much once you are registered as passing the exams did to get there in the first place.",
    "seoTitle": "The GMC Annual Retention Fee, Explained",
    "seoDescription": "The GMC annual retention fee explained: how much it costs, when it's due, and what happens if a doctor with a licence to practise misses payment.",
    "primaryKeyword": "GMC annual retention fee",
    "featuredImageKeyword": "Fees & Funding",
    "featuredImageUrl": "/images/gmc-annual-retention-fee-explained-featured.webp",
    "featuredImageTitle": "The GMC Annual Retention Fee, Explained",
    "featuredImageAltText": "GMC annual retention fee concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/managing-your-registration/fees-and-funding/fees-for-doctors"
  },
  {
    "slug": "arcp-annual-review-of-competence-progression-explained",
    "title": "ARCP: The Annual Review of Competence Progression, Explained",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/arcp-annual-review-of-competence-progression-explained-featured.webp",
    "summary": "The Annual Review of Competence Progression — almost universally shortened to ARCP — is the formal, typically once-a-year process by which a doctor in a UK postgraduate training programme has their progress checked against the requirements of their curriculum for that stage.",
    "seoTitle": "ARCP: Annual Review of Competence Progression",
    "seoDescription": "The Annual Review of Competence Progression explained: what evidence panels expect, possible outcomes, and how ARCP affects postgraduate training.",
    "primaryKeyword": "Annual Review of Competence Progression",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/arcp-annual-review-of-competence-progression-explained-featured.webp",
    "featuredImageTitle": "ARCP: The Annual Review of Competence Progression, Explained",
    "featuredImageAltText": "Annual Review of Competence Progression concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.copmed.org.uk/gold-guide-9th-edition"
  },
  {
    "slug": "nhs-eportfolio-guide-for-doctors",
    "title": "The NHS e-Portfolio: A Practical Guide for Doctors",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/nhs-eportfolio-guide-for-doctors-featured.webp",
    "summary": "This NHS e-Portfolio guide is written for doctors who are about to encounter one of the most underestimated tools of their early career: the digital, ongoing record of training and practice that follows them from their first Foundation placement through specialty training and beyond.",
    "seoTitle": "NHS e-Portfolio Guide for Doctors",
    "seoDescription": "This NHS e-Portfolio guide explains the digital training record every doctor keeps from Foundation placement through specialty training, practically.",
    "primaryKeyword": "NHS e-Portfolio guide",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/nhs-eportfolio-guide-for-doctors-featured.webp",
    "featuredImageTitle": "The NHS e-Portfolio: A Practical Guide for Doctors",
    "featuredImageAltText": "NHS e-Portfolio guide concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/managing-your-registration/revalidation/guidance-on-supporting-information-for-revalidation/guidance-on-supporting-information-for-revalidation"
  },
  {
    "slug": "substance-misuse-and-addiction-ukmla",
    "title": "Substance Misuse and Addiction in the UKMLA: What to Revise",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/substance-misuse-and-addiction-ukmla-featured.webp",
    "summary": "Substance misuse UKMLA questions turn up far more often than candidates expect, because alcohol- and drug-related presentations cut across almost every rotation in UK medicine — the acute medical take, the emergency department, primary care, surgical wards managing unplanned withdrawal, and psychiatry liaison.",
    "seoTitle": "Substance Misuse UKMLA: Addiction Revision",
    "seoDescription": "This substance misuse UKMLA guide covers alcohol and drug-related presentations across acute medicine, A&E and primary care, high-yield for the AKT.",
    "primaryKeyword": "substance misuse UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/substance-misuse-and-addiction-ukmla-featured.webp",
    "featuredImageTitle": "Substance Misuse and Addiction in the UKMLA: What to Revise",
    "featuredImageAltText": "substance misuse UKMLA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/cg100"
  },
  {
    "slug": "returning-to-practise-in-gulf-countries-dataflow-guide",
    "title": "Returning to Practise in Gulf Countries: The DataFlow Verification Guide",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/returning-to-practise-in-gulf-countries-dataflow-guide-featured.webp",
    "summary": "Returning to practise in Gulf countries is a route a growing number of UK-qualified and GMC-registered doctors are actively exploring, whether they are Gulf-origin doctors who trained or worked in the UK and now want to move closer to family, or UK-trained doctors drawn by tax-free salaries, modern hospital infrastructure, and a genuinely international patient population across Saudi Arabia, the United Arab Emirates, and Qatar.",
    "seoTitle": "Returning to Practise in Gulf Countries Guide",
    "seoDescription": "Returning to practise in Gulf countries explained: DataFlow primary source verification, licensing exams and timelines for UK-qualified doctors.",
    "primaryKeyword": "returning to practise in Gulf countries",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/returning-to-practise-in-gulf-countries-dataflow-guide-featured.webp",
    "featuredImageTitle": "Returning to Practise in Gulf Countries: The DataFlow Verification Guide",
    "featuredImageAltText": "returning to practise in Gulf countries concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://dataflowgroup.com/verification-services/healthcare/"
  },
  {
    "slug": "breaking-bad-news-in-the-cpsa",
    "title": "Breaking Bad News in the CPSA: A Complete Guide",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/breaking-bad-news-in-the-cpsa-featured.webp",
    "summary": "Breaking bad news CPSA stations are among the most consistently examined — and most consistently misjudged — communication scenarios in the entire UK Medical Licensing Assessment.",
    "seoTitle": "Breaking Bad News in the CPSA: Complete Guide",
    "seoDescription": "Breaking bad news CPSA stations explained: structure, empathy and common pitfalls for cancer diagnoses, abnormal scans and life-limiting news.",
    "primaryKeyword": "breaking bad news CPSA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/breaking-bad-news-in-the-cpsa-featured.webp",
    "featuredImageTitle": "Breaking Bad News in the CPSA: A Complete Guide",
    "featuredImageAltText": "breaking bad news CPSA concept illustration for the UKMLA revision guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/standards-guidance-and-curricula/guidance/good-medical-practice-2024"
  },
  {
    "slug": "genetics-and-genomics-in-the-ukmla",
    "title": "Genetics and Genomics in the UKMLA: What You Need to Know",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/genetics-and-genomics-in-the-ukmla-featured.webp",
    "summary": "A clinically grounded revision guide to genetics UKMLA content, covering inheritance patterns, high-yield single-gene and chromosomal disorders, genetic counselling, and UK screening programmes newly added to the GMC's September 2026 content map.",
    "seoTitle": "Genetics UKMLA: The Complete AKT Revision Guide",
    "seoDescription": "Genetics UKMLA revision guide covering inheritance patterns, cystic fibrosis, Down syndrome, genetic counselling, and screening for the 2026 content map.",
    "primaryKeyword": "genetics UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/genetics-and-genomics-in-the-ukmla-featured.webp",
    "featuredImageTitle": "Genetic counselling consultation with DNA model and family pedigree chart",
    "featuredImageAltText": "Genetics UKMLA concept — clinician and patient reviewing a DNA double helix model during a genetic counselling consultation",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "transgender-health-in-the-ukmla",
    "title": "Transgender Health in the UKMLA: What the Content Map Covers",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/transgender-health-in-the-ukmla-featured.webp",
    "summary": "The GMC's updated MLA content map adds transgender health as an examinable topic from September 2026 - here is what UK medical students and IMGs actually need to know for the AKT and CPSA.",
    "seoTitle": "Transgender Health UKMLA: What Candidates Must Know",
    "seoDescription": "Transgender health UKMLA revision guide: respectful history-taking, hormone therapy awareness, NHS Gender Identity Clinic referral pathways, and CPSA skills.",
    "primaryKeyword": "transgender health UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/transgender-health-in-the-ukmla-featured.webp",
    "featuredImageTitle": "Doctor and patient in a respectful clinical consultation",
    "featuredImageAltText": "Transgender health UKMLA concept - doctor and patient in a respectful, professional NHS consultation room",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "trauma-and-orthopaedics-ukmla",
    "title": "Trauma and Orthopaedics in the UKMLA: High-Yield Fracture Management",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/trauma-and-orthopaedics-ukmla-featured.webp",
    "summary": "A high-yield AKT revision guide to trauma and orthopaedics UKMLA topics — the ATLS primary survey, classic fracture patterns, compartment syndrome, open fracture management, NICE-guided hip fracture care, and fracture healing complications.",
    "seoTitle": "Trauma and Orthopaedics UKMLA: High-Yield Fracture Guide",
    "seoDescription": "Trauma and orthopaedics UKMLA revision: ATLS primary survey, hip, wrist and ankle fractures, compartment syndrome, open fractures, and NICE hip fracture care.",
    "primaryKeyword": "trauma and orthopaedics UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/trauma-and-orthopaedics-ukmla-featured.webp",
    "featuredImageTitle": "Trauma and Orthopaedics UKMLA Revision — X-Ray and Clinical Notes",
    "featuredImageAltText": "trauma and orthopaedics UKMLA revision concept — limb X-ray on a viewing screen beside clinical notes",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/cg124"
  },
  {
    "slug": "menopause-management-ukmla",
    "title": "Menopause Management in the UKMLA: What You Need to Know",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/menopause-management-ukmla-featured.webp",
    "summary": "A deep-dive AKT revision guide on menopause management — why diagnosis is usually clinical without routine hormone testing after 45, HRT basics and NICE's real risk-benefit position, non-hormonal options, and premature ovarian insufficiency as a distinct diagnosis.",
    "seoTitle": "Menopause UKMLA: HRT, Diagnosis and POI Revision Guide",
    "seoDescription": "Menopause UKMLA revision guide covering NICE-based diagnosis without routine FSH testing after 45, HRT risks and benefits, non-hormonal options, and POI.",
    "primaryKeyword": "menopause UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/menopause-management-ukmla-featured.webp",
    "featuredImageTitle": "Menopause Management in the UKMLA Featured Image",
    "featuredImageAltText": "menopause UKMLA - doctor and patient discussing menopause management and HRT options",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/ng23"
  },
  {
    "slug": "contraception-counselling-ukmla",
    "title": "Contraception Counselling in the UKMLA: A Complete Revision Guide",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/contraception-counselling-ukmla-featured.webp",
    "summary": "A dedicated AKT and CPSA revision guide to contraception counselling, covering the UKMEC framework, every contraceptive method category, emergency contraception timing windows, and how to structure the CPSA counselling conversation itself.",
    "seoTitle": "Contraception UKMLA: UKMEC & CPSA Revision Guide",
    "seoDescription": "Contraception UKMLA revision guide covering UKMEC categories, method comparisons, emergency contraception timing, and CPSA counselling structure for AKT and CPSA.",
    "primaryKeyword": "contraception UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/contraception-counselling-ukmla-featured.webp",
    "featuredImageTitle": "Contraception counselling consultation for UKMLA revision",
    "featuredImageAltText": "Contraception UKMLA counselling consultation setting showing a calm, supportive family planning appointment room",
    "sourceFullUrl": "https://www.fsrh.org/Public/Public/Standards-and-Guidance/uk-medical-eligibility-criteria-for-contraceptive-use-ukmec.aspx"
  },
  {
    "slug": "early-pregnancy-complications-ukmla",
    "title": "Early Pregnancy Complications in the UKMLA: The Essential Guide",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/early-pregnancy-complications-ukmla-featured.webp",
    "summary": "A compassionate, clinically thorough AKT revision guide to first-trimester miscarriage classification and management, ectopic pregnancy red flags, hyperemesis gravidarum, and molar pregnancy basics.",
    "seoTitle": "Early Pregnancy Complications UKMLA: The Essential Guide",
    "seoDescription": "Early pregnancy complications UKMLA guide covering miscarriage types, ectopic pregnancy red flags, beta-hCG, hyperemesis gravidarum, and molar pregnancy.",
    "primaryKeyword": "early pregnancy complications UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/early-pregnancy-complications-ukmla-featured.webp",
    "featuredImageTitle": "Ultrasound review in an early pregnancy assessment unit",
    "featuredImageAltText": "Early pregnancy complications UKMLA - clinician reviewing an ultrasound scan in an early pregnancy assessment unit",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/ng126"
  },
  {
    "slug": "gynaecological-cancers-ukmla",
    "title": "Gynaecological Cancers in the UKMLA: Red Flags and Referral",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/gynaecological-cancers-ukmla-featured.webp",
    "summary": "An AKT-focused revision guide to gynaecological cancer red flags — postmenopausal bleeding in endometrial cancer, CA-125 and the Risk of Malignancy Index in ovarian cancer, HPV-driven cervical screening, and vulval cancer warning signs — mapped onto NICE NG12 referral pathways.",
    "seoTitle": "Gynaecological Cancers UKMLA: Red Flags & Referral",
    "seoDescription": "Gynaecological cancers UKMLA guide: endometrial, ovarian, cervical and vulval red flags, CA-125, RMI, HPV screening and NICE NG12 2WW referral pathways.",
    "primaryKeyword": "gynaecological cancers UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/gynaecological-cancers-ukmla-featured.webp",
    "featuredImageTitle": "Clinician reviewing a gynaecological cancer referral pathway chart",
    "featuredImageAltText": "Clinician reviewing a red-flag referral pathway chart for gynaecological cancers in a clinic setting",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/ng12"
  },
  {
    "slug": "medically-unexplained-symptoms-ukmla",
    "title": "Medically Unexplained Symptoms in the UKMLA: What to Revise",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/medically-unexplained-symptoms-ukmla-featured.webp",
    "summary": "A CPSA and AKT-focused revision guide to medically unexplained symptoms and functional disorders, covering somatisation, proportionate investigation, validating communication, chronic fatigue syndrome/ME, and multidisciplinary management.",
    "seoTitle": "Medically Unexplained Symptoms UKMLA: Revision Guide",
    "seoDescription": "Medically unexplained symptoms UKMLA revision: somatisation, functional disorders, safe investigation, CPSA communication skills, CFS/ME, and MDT management.",
    "primaryKeyword": "medically unexplained symptoms UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/medically-unexplained-symptoms-ukmla-featured.webp",
    "featuredImageTitle": "Doctor communicating a functional diagnosis with a patient during a consultation",
    "featuredImageAltText": "Medically unexplained symptoms UKMLA consultation showing a doctor validating a patient's symptoms",
    "sourceFullUrl": "https://www.nice.org.uk/guidance/ng206"
  },
  {
    "slug": "domestic-abuse-and-safeguarding-adults-ukmla",
    "title": "Domestic Abuse and Adult Safeguarding in the UKMLA",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/domestic-abuse-and-safeguarding-adults-ukmla-featured.webp",
    "summary": "A focused AKT and CPSA revision guide on domestic abuse UKMLA content — sensitive enquiry technique, recognising coercive control and indirect presentation, documentation standards, and IDVA referral pathways.",
    "seoTitle": "Domestic Abuse UKMLA: Recognition, Enquiry & Referral",
    "seoDescription": "Domestic abuse UKMLA revision guide covering sensitive enquiry, coercive control, documentation standards, IDVA referral and helplines for AKT and CPSA.",
    "primaryKeyword": "domestic abuse UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/domestic-abuse-and-safeguarding-adults-ukmla-featured.webp",
    "featuredImageTitle": "Doctor documenting a consultation sensitively at a desk",
    "featuredImageAltText": "Domestic abuse UKMLA documentation - doctor's hands writing careful, contemporaneous clinical notes at a desk",
    "sourceFullUrl": "https://www.gov.uk/guidance/domestic-abuse-how-to-get-help"
  },
  {
    "slug": "prescribing-in-renal-and-hepatic-impairment-ukmla",
    "title": "Prescribing in Renal and Hepatic Impairment: A UKMLA Revision Guide",
    "date": "02 July 2026",
    "tag": "Preparation",
    "image": "/images/prescribing-in-renal-and-hepatic-impairment-ukmla-featured.webp",
    "summary": "A focused AKT revision guide on dose adjustment for organ impairment, covering the eGFR-based renal framework, the Child-Pugh hepatic classification, and the classic drugs — metformin, NSAIDs, nitrofurantoin, digoxin, opioids — most often tested.",
    "seoTitle": "Prescribing in Renal Impairment UKMLA: AKT Dose Guide",
    "seoDescription": "Prescribing in renal impairment UKMLA guide: eGFR-based dose adjustment, Child-Pugh hepatic impairment, and classic AKT drug examples explained.",
    "primaryKeyword": "prescribing in renal impairment UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/prescribing-in-renal-and-hepatic-impairment-ukmla-featured.webp",
    "featuredImageTitle": "Pharmacist reviewing a medication chart and renal function lab results",
    "featuredImageAltText": "Prescribing in renal impairment UKMLA concept — clinician reviewing a medication chart alongside eGFR and lab result printouts",
    "sourceFullUrl": "https://bnf.nice.org.uk/guidance/prescribing-in-renal-impairment.html"
  },
  {
    "slug": "nhs-pension-scheme-for-doctors-explained",
    "title": "The NHS Pension Scheme for Doctors, Explained",
    "date": "02 July 2026",
    "tag": "Fees & Funding",
    "image": "/images/nhs-pension-scheme-for-doctors-explained-featured.webp",
    "summary": "A complete guide to how the NHS Pension Scheme works for doctors, covering contribution tiers, the employer top-up, and whether opting out early in a career is really worth it.",
    "seoTitle": "NHS Pension Scheme for Doctors: Full Guide",
    "seoDescription": "NHS Pension Scheme for doctors explained: contribution tiers, the employer top-up, automatic enrolment, and the opt-out decision for UK and IMG doctors.",
    "primaryKeyword": "NHS Pension Scheme for doctors",
    "featuredImageKeyword": "Fees & Funding",
    "featuredImageUrl": "/images/nhs-pension-scheme-for-doctors-explained-featured.webp",
    "featuredImageTitle": "NHS Pension Scheme retirement planning documents and calculator",
    "featuredImageAltText": "NHS Pension Scheme for doctors concept — pension paperwork, calculator and pen on a desk representing retirement planning",
    "sourceFullUrl": "https://www.nhsbsa.nhs.uk/member-hub/cost-being-scheme"
  },
  {
    "slug": "how-to-write-an-nhs-cv-and-application",
    "title": "How to Write an NHS CV and Application That Gets Shortlisted",
    "date": "02 July 2026",
    "tag": "Candidate Support",
    "image": "/images/how-to-write-an-nhs-cv-and-application-featured.webp",
    "summary": "A practical, step-by-step guide to writing an NHS CV and application that actually gets shortlisted — covering the NHS Jobs and Trac Jobs system, mapping your experience to the person specification, and the common mistakes IMGs make.",
    "seoTitle": "NHS CV and Application: How to Get Shortlisted",
    "seoDescription": "A complete NHS CV and application guide: NHS Jobs/Trac Jobs structure, mapping the person specification, supporting statements, and IMG mistakes to avoid.",
    "primaryKeyword": "NHS CV and application",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/how-to-write-an-nhs-cv-and-application-featured.webp",
    "featuredImageTitle": "Candidate preparing an NHS CV and application on a laptop",
    "featuredImageAltText": "Candidate typing an NHS CV and application on a laptop with a CV document visible on the desk",
    "sourceFullUrl": "https://www.jobs.nhs.uk/candidate/jobadvert"
  },
  {
    "slug": "nhs-job-interview-preparation-guide",
    "title": "NHS Job Interview Preparation: A Complete Guide for IMGs and UK Graduates",
    "date": "02 July 2026",
    "tag": "Candidate Support",
    "image": "/images/nhs-job-interview-preparation-guide-featured.webp",
    "summary": "A practical guide to NHS job interview preparation covering panel structure, the STAR technique, NHS Constitution values, clinical scenario answers, and IMG-specific and video-interview tips.",
    "seoTitle": "NHS Job Interview Preparation: A Complete Guide",
    "seoDescription": "NHS job interview preparation guide covering the STAR technique, NHS values, clinical scenario questions, and IMG-specific tips for UK interviews.",
    "primaryKeyword": "NHS job interview preparation",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/nhs-job-interview-preparation-guide-featured.webp",
    "featuredImageTitle": "NHS job interview panel with candidate in a hospital meeting room",
    "featuredImageAltText": "NHS job interview preparation concept — candidate meeting an interview panel in a bright hospital boardroom",
    "sourceFullUrl": "https://www.gov.uk/government/publications/the-nhs-constitution-for-england"
  },
  {
    "slug": "relocating-to-the-uk-a-practical-guide-for-img-doctors",
    "title": "Relocating to the UK: A Practical Guide for IMG Doctors",
    "date": "02 July 2026",
    "tag": "Candidate Support",
    "image": "/images/relocating-to-the-uk-a-practical-guide-for-img-doctors-featured.webp",
    "summary": "A practical logistics guide for IMG doctors who already have a visa or job offer, covering accommodation, UK banking, GP registration, National Insurance and driving licence rules for the first weeks after arrival.",
    "seoTitle": "Relocating to the UK for IMG Doctors: Practical Guide",
    "seoDescription": "Relocating to the UK for IMG doctors: housing, guarantors, UK banking, GP registration, National Insurance numbers and driving licence rules explained.",
    "primaryKeyword": "relocating to the UK for IMG doctors",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/relocating-to-the-uk-a-practical-guide-for-img-doctors-featured.webp",
    "featuredImageTitle": "IMG doctor relocating to the UK with luggage on arrival",
    "featuredImageAltText": "Doctor relocating to the UK arriving with luggage on a residential street, representing IMG relocation logistics",
    "sourceFullUrl": "https://www.gov.uk/apply-national-insurance-number"
  },
  {
    "slug": "bringing-family-to-uk-dependent-visa-guide",
    "title": "Bringing Your Family to the UK: A Dependant Visa Guide for Doctors",
    "date": "02 July 2026",
    "tag": "Candidate Support",
    "image": "/images/bringing-family-to-uk-dependent-visa-guide-featured.webp",
    "summary": "A practical guide to the dependent visa for doctors' families on the Health and Care Worker route, covering eligibility, documents, the financial requirement, the Immigration Health Surcharge, and timing advice for bringing a spouse, partner, or children to the UK.",
    "seoTitle": "Dependent Visa for Doctors' Families: Full UK Guide",
    "seoDescription": "A dependent visa for doctors' families explained: who qualifies, documents needed, the financial requirement, IHS exemption, right to work, and timing tips.",
    "primaryKeyword": "dependent visa for doctors' families",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/bringing-family-to-uk-dependent-visa-guide-featured.webp",
    "featuredImageTitle": "Family arriving at a UK airport with luggage, representing a dependent visa for doctors' families",
    "featuredImageAltText": "Dependent visa for doctors' families concept — a family arriving at a UK airport arrivals hall with luggage",
    "sourceFullUrl": "https://www.gov.uk/health-care-worker-visa/your-partner-and-children"
  },
  {
    "slug": "joining-a-royal-college-mrcp-mrcs-mrcgp-overview",
    "title": "Joining a Royal College After the UKMLA: MRCP, MRCS and MRCGP Explained",
    "date": "02 July 2026",
    "tag": "Candidate Support",
    "image": "/images/joining-a-royal-college-mrcp-mrcs-mrcgp-overview-featured.webp",
    "summary": "An orientation guide to joining a Royal College after UKMLA success — what MRCP(UK), MRCS and MRCGP membership actually involve, and why the choice is tied directly to specialty selection.",
    "seoTitle": "Joining a Royal College After UKMLA: MRCP, MRCS, MRCGP",
    "seoDescription": "Joining a Royal College after UKMLA success explained: what MRCP(UK), MRCS and MRCGP membership mean, typical timing, and how they link to specialty choice.",
    "primaryKeyword": "joining a Royal College after UKMLA",
    "featuredImageKeyword": "Candidate Support",
    "featuredImageUrl": "/images/joining-a-royal-college-mrcp-mrcs-mrcgp-overview-featured.webp",
    "featuredImageTitle": "Doctor reviewing Royal College membership qualification documents",
    "featuredImageAltText": "Doctor joining a Royal College after UKMLA, reviewing MRCP, MRCS and MRCGP membership certificates at a desk",
    "sourceFullUrl": "https://www.rcp.ac.uk/mrcpuk-examination"
  },
  {
    "slug": "certificate-of-completion-of-training-cct-explained",
    "title": "The Certificate of Completion of Training (CCT), Explained",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/certificate-of-completion-of-training-cct-explained-featured.webp",
    "summary": "An explainer on the Certificate of Completion of Training (CCT) — what it confirms, how it differs from the CESR/CEGPR portfolio route, ARCP's role in reaching it, and what it unlocks on the Specialist and GP Registers.",
    "seoTitle": "Certificate of Completion of Training Explained",
    "seoDescription": "Certificate of Completion of Training explained: what a CCT confirms, how it differs from CESR/CEGPR, ARCP's role, and Specialist/GP Register entry.",
    "primaryKeyword": "Certificate of Completion of Training",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/certificate-of-completion-of-training-cct-explained-featured.webp",
    "featuredImageTitle": "Doctor receiving a formal training completion certificate",
    "featuredImageAltText": "Certificate of Completion of Training concept — doctor reviewing a formal training completion certificate",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/registration-applications/specialist-application-guides/guide-to-a-certificate-of-completion-of-training"
  },
  {
    "slug": "scotland-wales-northern-ireland-registration-differences",
    "title": "Practising Medicine in Scotland, Wales and Northern Ireland: What's Different?",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/scotland-wales-northern-ireland-registration-differences-featured.webp",
    "summary": "GMC registration and licensing is identical across all four UK nations, so doctors don't need separate registration to work in Scotland, Wales, or Northern Ireland — this guide explains what genuinely differs instead: NHS employer structure, postgraduate training bodies, and devolved clinical guidance.",
    "seoTitle": "Practising Medicine in Scotland, Wales, NI Explained",
    "seoDescription": "Practising medicine in Scotland Wales Northern Ireland: GMC registration is UK-wide, but NHS employers, training bodies and guidance rules genuinely differ.",
    "primaryKeyword": "practising medicine in Scotland Wales Northern Ireland",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/scotland-wales-northern-ireland-registration-differences-featured.webp",
    "featuredImageTitle": "Doctor reviewing regional NHS practice options across the UK",
    "featuredImageAltText": "Doctor reviewing options for practising medicine in Scotland, Wales and Northern Ireland at a desk with a UK map",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/our-registers"
  },
  {
    "slug": "ukmla-for-jordanian-and-iraqi-doctors",
    "title": "UKMLA for Jordanian and Iraqi Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-jordanian-and-iraqi-doctors-featured.webp",
    "summary": "A complete guide to the UKMLA pathway for doctors trained in Jordan or Iraq, covering GMC eligibility, credential verification, realistic USD/GBP fees, regional AKT test centre access, and a step-by-step timeline to NHS registration.",
    "seoTitle": "UKMLA for Jordanian and Iraqi Doctors: Full Route Guide",
    "seoDescription": "UKMLA for Jordanian and Iraqi doctors explained: GMC eligibility, EPIC verification, AKT test centres in the region, USD/GBP fees, and the full registration timeline.",
    "primaryKeyword": "UKMLA for Jordanian and Iraqi doctors",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/ukmla-for-jordanian-and-iraqi-doctors-featured.webp",
    "featuredImageTitle": "Doctor reviewing UK medical registration documents for the UKMLA pathway",
    "featuredImageAltText": "UKMLA for Jordanian and Iraqi doctors concept — doctor reviewing UK GMC registration documents with a world map nearby",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/before-you-apply-guide-for-doctors/primary-source-verification-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-chinese-doctors",
    "title": "UKMLA for Chinese Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-chinese-doctors-featured.webp",
    "summary": "A step-by-step guide to the UKMLA for Chinese doctors, covering World Directory of Medical Schools verification, the mandatory English language requirement for standard Mandarin-medium graduates, East Asia AKT test centre access, RMB/GBP fees, and a realistic registration timeline.",
    "seoTitle": "UKMLA for Chinese Doctors: Eligibility & Fees Guide",
    "seoDescription": "UKMLA for Chinese doctors explained: eligibility, EPIC verification, IELTS/OET rules, AKT test centres in East Asia, RMB/GBP fees, and a realistic GMC registration timeline.",
    "primaryKeyword": "UKMLA for Chinese doctors",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/ukmla-for-chinese-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Chinese doctors — reviewing UK medical registration documents",
    "featuredImageAltText": "Doctor reviewing UK GMC registration documents, illustrating the UKMLA for Chinese doctors pathway",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/registration-applications/application-guides/full-registration-for-international-medical-graduates"
  },
  {
    "slug": "ukmla-for-vietnamese-and-indonesian-doctors",
    "title": "UKMLA for Vietnamese and Indonesian Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-vietnamese-and-indonesian-doctors-featured.webp",
    "summary": "A step-by-step guide to the UKMLA for Vietnamese and Indonesian doctors, covering eligibility, EPIC verification, English testing, AKT test centre access in Southeast Asia, and realistic USD/GBP fee budgeting.",
    "seoTitle": "UKMLA for Vietnamese and Indonesian Doctors: Full Guide",
    "seoDescription": "UKMLA for Vietnamese and Indonesian doctors explained: eligibility, EPIC verification, IELTS/OET, AKT test centres in Southeast Asia, and fees in USD/GBP.",
    "primaryKeyword": "UKMLA for Vietnamese and Indonesian doctors",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/ukmla-for-vietnamese-and-indonesian-doctors-featured.webp",
    "featuredImageTitle": "Doctor reviewing UK medical registration documents alongside a world map",
    "featuredImageAltText": "UKMLA for Vietnamese and Indonesian doctors concept — doctor reviewing GMC registration documents beside a world map",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab"
  },
  {
    "slug": "ukmla-for-jamaican-and-trinidadian-doctors",
    "title": "UKMLA for Jamaican and Trinidadian Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-jamaican-and-trinidadian-doctors-featured.webp",
    "summary": "A complete guide to the UKMLA for Jamaican and Trinidadian doctors, covering UWI degree recognition, the English language exemption angle, AKT test centre access across the Caribbean, realistic USD/GBP costs, and a step-by-step timeline to GMC registration.",
    "seoTitle": "UKMLA for Jamaican and Trinidadian Doctors: Full Guide",
    "seoDescription": "UKMLA for Jamaican and Trinidadian doctors explained: UWI degree recognition, English exemption route, AKT test centres, USD/GBP fees, and the GMC registration timeline.",
    "primaryKeyword": "UKMLA for Jamaican and Trinidadian doctors",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/ukmla-for-jamaican-and-trinidadian-doctors-featured.webp",
    "featuredImageTitle": "UKMLA for Jamaican and Trinidadian doctors — GMC registration route",
    "featuredImageAltText": "UKMLA for Jamaican and Trinidadian doctors concept — doctor reviewing UK registration documents with a world map nearby",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab"
  },
  {
    "slug": "gmc-registration-for-eu-and-irish-doctors",
    "title": "GMC Registration for EU and Irish Doctors: What Changed After Brexit",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/gmc-registration-for-eu-and-irish-doctors-featured.webp",
    "summary": "A clear breakdown of how Brexit ended automatic recognition for most EU/EEA-qualified doctors, why Ireland's position remains distinctly more favourable, and the current registration process for each group.",
    "seoTitle": "GMC Registration for EU and Irish Doctors: Post-Brexit Guide",
    "seoDescription": "GMC registration for EU and Irish doctors explained: what changed after Brexit, the REQ list, transitional rules, and why Ireland is treated differently.",
    "primaryKeyword": "GMC registration for EU and Irish doctors",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/gmc-registration-for-eu-and-irish-doctors-featured.webp",
    "featuredImageTitle": "GMC registration for EU and Irish doctors — document review concept",
    "featuredImageAltText": "GMC registration for EU and Irish doctors concept — doctor reviewing registration documents and a passport",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/eea-countries"
  },
  {
    "slug": "ukmla-for-kenyan-and-east-african-doctors",
    "title": "UKMLA for Kenyan and East African Doctors: Eligibility, Fees and the Route to GMC Registration",
    "date": "02 July 2026",
    "tag": "IMG Pathway",
    "image": "/images/ukmla-for-kenyan-and-east-african-doctors-featured.webp",
    "summary": "A complete guide to the UKMLA pathway for Kenyan-trained doctors, with context for Uganda and Tanzania, covering KMPDC eligibility, the English language exemption, regional AKT test centres, fees, and a realistic registration timeline.",
    "seoTitle": "UKMLA for Kenyan and East African Doctors: Full Guide",
    "seoDescription": "UKMLA for Kenyan and East African doctors: KMPDC eligibility, EPIC verification, English exemption, AKT test centres, fees in GBP/USD, and GMC registration steps.",
    "primaryKeyword": "UKMLA for Kenyan and East African doctors",
    "featuredImageKeyword": "IMG Pathway",
    "featuredImageUrl": "/images/ukmla-for-kenyan-and-east-african-doctors-featured.webp",
    "featuredImageTitle": "Doctor reviewing UK medical registration documents with a world map nearby",
    "featuredImageAltText": "UKMLA for Kenyan and East African doctors concept — doctor reviewing UK registration documents beside a world map",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/registration-applications/application-guides/full-registration-for-international-medical-graduates"
  },
  {
    "slug": "history-of-ukmla-plab-transition-explained",
    "title": "The History of the UKMLA and PLAB Transition, Explained",
    "date": "02 July 2026",
    "tag": "Exam Comparisons",
    "image": "/images/history-of-ukmla-plab-transition-explained-featured.webp",
    "summary": "Trace the real history of UKMLA and PLAB transition — from decades of separate UK medical school finals and IMG-only PLAB testing to the GMC's single MLA standard, phased in from 2024 and converging fully in September 2026.",
    "seoTitle": "History of UKMLA and PLAB Transition Explained",
    "seoDescription": "The history of UKMLA and PLAB transition: why the GMC replaced separate UK finals and PLAB with one MLA standard, phased in 2024, converging in 2026.",
    "primaryKeyword": "history of UKMLA and PLAB transition",
    "featuredImageKeyword": "Exam Comparisons",
    "featuredImageUrl": "/images/history-of-ukmla-plab-transition-explained-featured.webp",
    "featuredImageTitle": "History of the UKMLA and PLAB transition — book and exam paper concept",
    "featuredImageAltText": "History of UKMLA and PLAB transition concept — open history book beside a modern exam paper representing the shift to a single GMC licensing standard",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment"
  },
  {
    "slug": "ukmla-exam-day-what-to-expect",
    "title": "UKMLA Exam Day: What to Expect at the AKT and CPSA",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/ukmla-exam-day-what-to-expect-featured.webp",
    "summary": "A practical, reassuring walkthrough of what actually happens on UKMLA exam day — from Pearson VUE check-in and security for the AKT to the circuit of role-player stations at the GMC's CPSA centre in Manchester.",
    "seoTitle": "UKMLA Exam Day What to Expect: AKT & CPSA Guide",
    "seoDescription": "UKMLA exam day what to expect: arrival, ID checks, security, lockers, AKT proctoring, and the CPSA station circuit for UK students and IMGs alike.",
    "primaryKeyword": "UKMLA exam day what to expect",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/ukmla-exam-day-what-to-expect-featured.webp",
    "featuredImageTitle": "UKMLA Exam Day What to Expect Featured Image",
    "featuredImageAltText": "UKMLA exam day what to expect - candidate arriving calmly at a test centre reception",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab/plab-2-guide/what-can-you-expect-on-the-day"
  },
  {
    "slug": "ukmla-special-circumstances-and-accommodations",
    "title": "UKMLA Special Circumstances: Accommodations Beyond Disability Access",
    "date": "02 July 2026",
    "tag": "Registration & Eligibility",
    "image": "/images/ukmla-special-circumstances-and-accommodations-featured.webp",
    "summary": "Pregnancy and breastfeeding needs, religious observance, and bereavement all fall under UKMLA special circumstances, separate from disability access adjustments — here is how to request support from the GMC, your medical school, or Pearson VUE.",
    "seoTitle": "UKMLA Special Circumstances: Non-Disability Accommodations",
    "seoDescription": "UKMLA special circumstances explained: pregnancy, breastfeeding, religious observance, and bereavement accommodations, and how to request them from the GMC.",
    "primaryKeyword": "UKMLA special circumstances",
    "featuredImageKeyword": "Registration & Eligibility",
    "featuredImageUrl": "/images/ukmla-special-circumstances-and-accommodations-featured.webp",
    "featuredImageTitle": "UKMLA Special Circumstances and Accommodations Featured Image",
    "featuredImageAltText": "UKMLA special circumstances - candidate discussing exam accommodations with an administrator",
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab/plab-2-guide/cancelling-or-amending-your-booking-and-our-approach-to-other-disruptions"
  }
];
const topics = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))];

// Resolve the active post slug from the URL. Posts are crawlable at
// /news/<slug>; older in-content links still point at /news#<slug>, so both the
// pathname and the hash are accepted. Returns null on the plain /news index.
function getSlugFromLocation() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const prefix = '/news/';
  if (path.startsWith(prefix)) {
    const slug = decodeURIComponent(path.slice(prefix.length));
    if (posts.some((p) => p.slug === slug)) return slug;
  }
  const h = (window.location.hash || '').replace('#', '');
  return posts.some((p) => p.slug === h) ? h : null;
}

function slugify(str) {
  return (
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 60) || 'section'
  );
}

// Parse a post's HTML once to power the reading experience:
//  - add a stable id to every <h2> (for the "On this page" navigator + deep links)
//  - build the table-of-contents list
//  - derive point-wise Key Takeaways (the first sentence of each content section)
// Returns the (possibly id-augmented) HTML plus toc + takeaways arrays.
function enhancePost(html) {
  if (!html || typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return { html: html || '', toc: [], takeaways: [] };
  }
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const used = new Set();
  const toc = [];
  const takeaways = [];
  const skip = /faq|frequently asked|conclusion|next steps|final thoughts|in summary/i;

  const firstSentence = (text) => {
    const s = (text || '').trim().replace(/\s+/g, ' ');
    if (!s) return '';
    const m = s.match(/^.*?[.!?](?=\s|$)/);
    let out = m ? m[0].trim() : s;
    if (out.length > 190) out = out.slice(0, 187).trim() + '…';
    return out;
  };

  // Lead takeaway from the intro paragraph (before the first <h2>).
  const introP = doc.body.querySelector('p');
  if (introP) {
    const lead = firstSentence(introP.textContent);
    if (lead) takeaways.push(lead);
  }

  doc.querySelectorAll('h2').forEach((h2) => {
    const text = h2.textContent.trim();
    if (!text) return;
    let id = slugify(text);
    const base = id;
    let n = 2;
    while (used.has(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    used.add(id);
    h2.id = id;
    toc.push({ id, text });

    if (!skip.test(text)) {
      let el = h2.nextElementSibling;
      while (el && el.tagName !== 'P' && el.tagName !== 'H2') el = el.nextElementSibling;
      if (el && el.tagName === 'P') {
        const point = firstSentence(el.textContent);
        if (point) takeaways.push(point);
      }
    }
  });

  // Post authors write bare <table class="post-table"> elements, but a raw
  // table cannot shrink below its own min-content width. On a phone that wide
  // table pushes the whole layout wider than the viewport, so the page renders
  // zoomed-out and clipped. Wrap every table in a .table-wrap scroll container
  // (styled with overflow-x: auto) so it scrolls horizontally on its own
  // instead of breaking the page. Covers every post from one place.
  doc.querySelectorAll('table').forEach((table) => {
    if (table.parentElement && table.parentElement.classList.contains('table-wrap')) return;
    const wrap = doc.createElement('div');
    wrap.className = 'table-wrap';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  return { html: doc.body.innerHTML, toc, takeaways: takeaways.slice(0, 8) };
}

export default function News() {
  const [activeSlug, setActiveSlug] = useState(getSlugFromLocation);
  const [activeTopic, setActiveTopic] = useState('All');
  const [activeSection, setActiveSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // Brief skeleton on first load of the posts index, giving the card images a
  // moment to fetch so the grid paints in one go instead of popping in.
  const [isLoading, setIsLoading] = useState(true);

  const POSTS_PER_PAGE = 12;
  const contentRef = useRef(null);

  const activePost = posts.find((p) => p.slug === activeSlug);

  // Parse the post HTML once: id-tag the <h2>s, build the navigator and takeaways.
  const enhanced = useMemo(
    () => (activePost ? enhancePost(postHtmlBySlug[activePost.slug] || '') : { html: '', toc: [], takeaways: [] }),
    [activePost]
  );

  // Run SEO Head and Title updates on active post load
  useEffect(() => {
    const ORIGIN = 'https://www.gmcukmla.com';

    // Point the canonical + og:url at the current post (or the /news index) so
    // each crawlable /news/<slug> self-references and matches the sitemap.
    const setCanonical = (url) => {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url;

      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', url);
    };

    // Inject/replace a BlogPosting JSON-LD schema for the open post (helps
    // Google index each /news/<slug> as an article). Removed on the index view.
    const setArticleSchema = (post) => {
      const existing = document.getElementById('post-schema');
      if (existing) existing.remove();
      if (!post) return;
      const image = post.featuredImageUrl
        ? (post.featuredImageUrl.startsWith('http') ? post.featuredImageUrl : `${ORIGIN}${post.featuredImageUrl}`)
        : `${ORIGIN}/logo.png`;
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.seoTitle || post.title,
        description: post.seoDescription || post.summary,
        image,
        datePublished: post.date,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${ORIGIN}/news/${post.slug}` },
        author: { '@type': 'Organization', name: 'UKMLA Informational Website', url: ORIGIN },
        publisher: {
          '@type': 'Organization',
          name: 'UKMLA Informational Website',
          logo: { '@type': 'ImageObject', url: `${ORIGIN}/logo.png` },
        },
      };
      const script = document.createElement('script');
      script.id = 'post-schema';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    // Fire a Google Analytics (GA4) page_view. Posts open via history.pushState
    // without the router's navigation event, so GA must be told here or post
    // views would never be counted.
    const trackPageView = (title, path) => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_title: title,
          page_location: `${ORIGIN}${path}`,
          page_path: path,
        });
      }
    };

    if (activePost) {
      document.title = activePost.seoTitle || (activePost.title + ' | UKMLA');

      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.content = activePost.seoDescription || activePost.summary;
      }
      setCanonical(`${ORIGIN}/news/${activePost.slug}`);
      setArticleSchema(activePost);
      trackPageView(document.title, `/news/${activePost.slug}`);
    } else {
      // Revert to list page defaults
      document.title = 'UKMLA News & Updates: Latest Changes | UKMLA';
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.content = 'Stay updated with the latest announcements, updates, and structural adjustments for the UKMLA from the GMC and Medical Schools Council.';
      }
      setCanonical(`${ORIGIN}/news`);
      setArticleSchema(null);
      trackPageView(document.title, '/news');
    }
  }, [activePost]);

  // Keep the view in sync with the URL hash so the browser back button works
  // and individual posts are deep-linkable (e.g. /news#gmc-fee-revisions-2026).
  useEffect(() => {
    const sync = () => setActiveSlug(getSlugFromLocation());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  // Framework-level scroll reset. Whenever the active post changes — via an
  // in-content internal link, a related-post card, the browser back/forward
  // buttons, or a deep link — jump to the top AFTER the new post has rendered.
  // Running it here (keyed on the slug) rather than inside openPost means:
  //   1. it fires after React commits the new (taller) DOM, not before, so the
  //      reader always lands at the top instead of keeping the old offset;
  //   2. it covers every navigation path, so individual posts never need their
  //      own scroll handling.
  // `behavior: 'instant'` overrides the global `scroll-behavior: smooth`, which
  // would otherwise animate all the way down-to-up and look like a free scroll.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeSlug]);

  // Hold the posts index behind a skeleton for 2s on first mount.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Intercept internal links in post content to navigate via openPost
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Legacy fragment links to another post: #slug or /news#slug.
      const hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        const slug = href.substring(hashIndex + 1);
        if (posts.some((p) => p.slug === slug)) {
          e.preventDefault();
          openPost(slug);
          return;
        }
      }

      // Crawlable path links to another post: /news/slug.
      const pathMatch = href.match(/^\/news\/([^/?#]+)\/?$/);
      if (pathMatch && posts.some((p) => p.slug === pathMatch[1])) {
        e.preventDefault();
        openPost(pathMatch[1]);
      }
    };

    container.addEventListener('click', handleLinkClick);
    return () => {
      container.removeEventListener('click', handleLinkClick);
    };
  });

  // Scroll-spy: highlight the section you are currently reading. We pick the
  // last <h2> whose top has scrolled above a fixed line near the top of the
  // viewport, so a TOC item stays highlighted for the whole section.
  useEffect(() => {
    if (!activePost) return undefined;
    const OFFSET = 140; // matches the sticky header height
    let ticking = false;

    const update = () => {
      ticking = false;
      const headings = contentRef.current
        ? Array.from(contentRef.current.querySelectorAll('h2[id]'))
        : [];
      if (headings.length === 0) return;
      let current = headings[0].id;
      for (let i = 0; i < headings.length; i += 1) {
        if (headings[i].getBoundingClientRect().top - OFFSET <= 0) {
          current = headings[i].id;
        } else {
          break;
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [activePost, enhanced]);

  // Note: scroll-to-top is handled centrally by the activeSlug effect above,
  // which runs after the new view renders — so it is intentionally not called
  // here (calling it now would fire before the new post's DOM is committed).
  const openPost = useCallback((slug) => {
    // Crawlable, canonical post URL: /news/<slug>.
    window.history.pushState(null, '', `/news/${slug}`);
    setActiveSlug(slug);
    setActiveSection(null);
  }, []);

  const closePost = useCallback(() => {
    window.history.pushState(null, '', '/news');
    setActiveSlug(null);
    setActiveSection(null);
  }, []);

  const goToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // ---- Full post view ----
  if (activePost) {
    const relatedPosts = posts.filter((p) => p.slug !== activePost.slug && p.tag === activePost.tag);
    const otherPosts = posts.filter((p) => p.slug !== activePost.slug && p.tag !== activePost.tag);
    const postsToShow = [...relatedPosts, ...otherPosts].slice(0, 5);

    return (
      <Layout>
        <div className="post-layout">
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
                <img
                  src={activePost.image}
                  alt={activePost.featuredImageAltText || activePost.title}
                  title={activePost.featuredImageTitle || activePost.title}
                />
              </div>
            </figure>

            {enhanced.takeaways.length > 0 && (
              <section className="post-takeaways" aria-label="Key takeaways">
                <h2 className="post-takeaways-title">Key Takeaways</h2>
                <ul className="post-takeaways-list">
                  {enhanced.takeaways.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </section>
            )}

            <div
              className="post-html-content"
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: enhanced.html }}
            />

            <p className="last-reviewed">
              Posted on {activePost.date}. Source:{' '}
              <a
                href={activePost.sourceFullUrl || 'https://www.gmc-uk.org/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                General Medical Council (GMC)
              </a>
              .
            </p>
          </article>

          <aside className="post-rail">
            {enhanced.toc.length > 0 && (
              <nav className="post-toc" aria-label="On this page">
                <h3 className="post-rail-title">On this page</h3>
                <ul className="post-toc-list">
                  {enhanced.toc.map((item) => (
                    <li key={item.id}>
                      <button
                        className={`post-toc-link ${activeSection === item.id ? 'active' : ''}`}
                        onClick={() => goToSection(item.id)}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="post-related">
              <h3 className="post-rail-title">Related posts</h3>
              <ul className="post-related-list">
                {postsToShow.map((p) => (
                  <li key={p.slug}>
                    <button className="post-related-link" onClick={() => openPost(p.slug)}>
                      <span className="post-related-thumb">
                        <img src={p.image} alt="" loading="lazy" />
                      </span>
                      <span className="post-related-text">
                        <span className="post-related-tag">{p.tag}</span>
                        <span className="post-related-title">{p.title}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Layout>
    );
  }

  // ---- Skeleton (first load of the index) ----
  if (isLoading) {
    return (
      <Layout>
        <div className="posts-index">
          <header className="page-header">
            <h1 className="page-title">Posts</h1>
            <p className="page-summary">
              News, regulatory updates, and analysis on the UKMLA. Select a post to read it in full.
            </p>
          </header>

          <div className="post-skeleton" aria-hidden="true">
            <div className="post-featured skeleton-featured">
              <div className="skeleton-box skeleton-featured-media" />
              <div className="post-featured-body">
                <div className="skeleton-line skeleton-line-sm" />
                <div className="skeleton-line skeleton-line-lg" />
                <div className="skeleton-line" />
                <div className="skeleton-line skeleton-line-wide" />
              </div>
            </div>

            <ul className="post-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <li key={i} className="post-card skeleton-card">
                  <div className="skeleton-box skeleton-card-media" />
                  <div className="post-card-body">
                    <div className="skeleton-line skeleton-line-sm" />
                    <div className="skeleton-line skeleton-line-lg" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line skeleton-line-wide" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }

  // ---- Posts index (title + summary only) ----
  // Newest posts first, so freshly added posts surface on page 1 instead of
  // sinking to the last page in original insertion order.
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const topicFiltered = activeTopic === 'All' ? sortedPosts : sortedPosts.filter((p) => p.tag === activeTopic);

  // Apply the committed search query (set when the user submits the search
  // form) across title, summary, tag, and primary keyword.
  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;
  const visiblePosts = isSearching
    ? topicFiltered.filter((p) =>
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.tag.toLowerCase().includes(query) ||
        (p.primaryKeyword || '').toLowerCase().includes(query)
      )
    : topicFiltered;

  // While searching, every match goes into the grid (no featured treatment) so
  // the most relevant results are not visually demoted.
  const featuredPost = isSearching ? null : visiblePosts[0] || null;
  const remainingPosts = isSearching ? visiblePosts : visiblePosts.slice(1);
  const totalPages = Math.ceil(remainingPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = remainingPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const runSearch = () => { setSearchQuery(searchInput); setCurrentPage(1); };
  const clearSearch = () => { setSearchInput(''); setSearchQuery(''); setCurrentPage(1); };

  return (
    <Layout>
      <div className="posts-index">
        <header className="page-header">
          <h1 className="page-title">Posts</h1>
          <p className="page-summary">
            News, regulatory updates, and analysis on the UKMLA. Select a post to read it in full.
          </p>
        </header>

        <form
          className="post-search"
          role="search"
          onSubmit={(e) => { e.preventDefault(); runSearch(); }}
        >
          <div className="post-search-field">
            <svg
              className="post-search-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              className="post-search-input"
              placeholder="Search posts by title, topic, or keyword…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              aria-label="Search posts"
            />
            {searchInput && (
              <button
                type="button"
                className="post-search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <button type="submit" className="post-search-btn">Search</button>
        </form>

        {isSearching && (
          <p className="post-search-status" role="status">
            {visiblePosts.length === 0
              ? `No results for “${searchQuery}”`
              : `${visiblePosts.length} result${visiblePosts.length === 1 ? '' : 's'} for “${searchQuery}”`}
            {' '}
            <button type="button" className="post-search-status-clear" onClick={clearSearch}>
              Clear search
            </button>
          </p>
        )}

        <div className="post-filter" role="group" aria-label="Filter posts by topic">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`post-filter-btn ${activeTopic === topic ? 'active' : ''}`}
              aria-pressed={activeTopic === topic}
              onClick={() => { setActiveTopic(topic); setCurrentPage(1); }}
            >
              {topic}
            </button>
          ))}
        </div>

        {visiblePosts.length === 0 ? (
          <p className="post-empty">
            {isSearching ? 'No posts match your search. Try a different term.' : 'No posts in this topic yet.'}
          </p>
        ) : (
          <>
            {featuredPost && (
              <div
                className="post-featured"
                role="button"
                tabIndex={0}
                onClick={() => openPost(featuredPost.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openPost(featuredPost.slug);
                  }
                }}
              >
                <div className="post-featured-media">
                  <img src={featuredPost.image} alt={featuredPost.title} />
                  <span className="post-card-tag">{featuredPost.tag}</span>
                </div>
                <div className="post-featured-body">
                  <p className="post-featured-label">Featured Post</p>
                  <p className="post-meta">{featuredPost.date}</p>
                  <h2 className="post-featured-title">{featuredPost.title}</h2>
                  <p className="post-featured-summary">{featuredPost.summary}</p>
                  <span className="post-read-more">Read post →</span>
                </div>
              </div>
            )}

            {remainingPosts.length > 0 && (
              <>
                <h2 className="post-section-heading">{isSearching ? 'Search Results' : 'All Posts'}</h2>
                <ul className="post-grid">
              {paginatedPosts.map((post) => (
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

            {totalPages > 1 && (
              <nav className="pagination" aria-label="Posts pagination">
                <button
                  className="pagination-btn pagination-prev"
                  onClick={() => { setCurrentPage((p) => p - 1); window.scrollTo(0, 0); }}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  ← Prev
                </button>

                <ul className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page}>
                      <button
                        className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                        onClick={() => { setCurrentPage(page); window.scrollTo(0, 0); }}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  className="pagination-btn pagination-next"
                  onClick={() => { setCurrentPage((p) => p + 1); window.scrollTo(0, 0); }}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next →
                </button>
              </nav>
            )}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
