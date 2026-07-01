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
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab/fees-for-plab"
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
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab"
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
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab"
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
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab"
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
    "image": "/images/how-to-read-akt-stem-featured.webp",
    "summary": "Mental health is a significant domain in the MLA Content Map. Here is a focused guide to the presentations, conditions, and management principles most likely to appear.",
    "seoTitle": "Mental Health Presentations in the UKMLA: Revision Guide",
    "seoDescription": "Mental health is a core UKMLA domain. Our revision guide covers the key presentations, conditions, management principles, and legal frameworks you need to know.",
    "primaryKeyword": "mental health UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/how-to-read-akt-stem-featured.webp",
    "featuredImageTitle": "Mental Health Presentations in the UKMLA: Revision Guide Featured Image",
    "featuredImageAltText": "mental health UKMLA - Key Presentations and Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "paediatrics-ukmla-revision",
    "title": "Paediatrics in the AKT and CPSA: A Focused Revision Guide",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/nice-guidelines-akt-revision-featured.webp",
    "summary": "Paediatric presentations appear across both UKMLA components. Here are the highest-yield conditions, red flags, and safeguarding principles to know.",
    "seoTitle": "Paediatrics in the UKMLA: AKT and CPSA Revision Guide",
    "seoDescription": "Paediatric presentations appear throughout the UKMLA. Our focused revision guide covers key conditions, red flags, developmental milestones, and safeguarding.",
    "primaryKeyword": "paediatrics UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/nice-guidelines-akt-revision-featured.webp",
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
    "image": "/images/emergency-medicine-ukmla-revision-featured.webp",
    "summary": "ECG reading is a core UKMLA practical skill. Here is a systematic approach and the specific findings that appear most often in the AKT and CPSA.",
    "seoTitle": "ECG Interpretation for the UKMLA: Key Findings and How to Read Them",
    "seoDescription": "ECG interpretation is a core UKMLA skill. Learn the systematic approach and the specific ECG findings that appear in the AKT and CPSA stations.",
    "primaryKeyword": "ECG interpretation UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/emergency-medicine-ukmla-revision-featured.webp",
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
    "image": "/images/radiology-imaging-akt-ukmla-featured.webp",
    "summary": "Respiratory presentations are a core UKMLA domain. Here is a targeted guide to asthma, COPD, pneumonia, PE, and the investigations that discriminate between them.",
    "seoTitle": "Respiratory Medicine for the UKMLA: High-Yield Revision Guide",
    "seoDescription": "Respiratory presentations are heavily tested in the UKMLA. Our revision guide covers asthma, COPD, pneumonia, pulmonary embolism, and the investigations that matter.",
    "primaryKeyword": "respiratory medicine UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/radiology-imaging-akt-ukmla-featured.webp",
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
    "image": "/images/safeguarding-ukmla-revision-featured.webp",
    "summary": "Skin presentations appear across both UKMLA components. Here are the common rashes and lesions tested in the AKT, and the communication skills required for skin-related CPSA stations.",
    "seoTitle": "Dermatology in the UKMLA: Rashes and Lesions Revision Guide",
    "seoDescription": "Skin presentations are tested in the UKMLA AKT and CPSA. Our revision guide covers common rashes, skin lesion assessment, melanoma, and the ABCDE mole assessment.",
    "primaryKeyword": "dermatology UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/safeguarding-ukmla-revision-featured.webp",
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
    "image": "/images/ukmla-revision-notes-strategy-featured.webp",
    "summary": "Rheumatological conditions appear regularly across both UKMLA components. Here are the key conditions, investigations, and the clinical examination findings you need.",
    "seoTitle": "Rheumatology in the UKMLA: Key Conditions and Revision Tips",
    "seoDescription": "Rheumatology features regularly in the UKMLA AKT and CPSA. Revise rheumatoid arthritis, gout, SLE, osteoporosis, and musculoskeletal examinations with this guide.",
    "primaryKeyword": "rheumatology UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/ukmla-revision-notes-strategy-featured.webp",
    "featuredImageTitle": "Rheumatology in the UKMLA: Key Conditions and Revision Tips Featured Image",
    "featuredImageAltText": "rheumatology UKMLA - RA Gout SLE Osteoporosis Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "nephrology-ukmla-revision",
    "title": "Nephrology in the UKMLA: AKI, CKD, and Electrolyte Disorders",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/mock-exams-ukmla-preparation-featured.webp",
    "summary": "Renal presentations feature heavily in the UKMLA AKT. Here is a focused guide to AKI, CKD staging, electrolyte disorders, and the investigations that matter.",
    "seoTitle": "Nephrology in the UKMLA: AKI, CKD, and Electrolytes Revision",
    "seoDescription": "Renal conditions are heavily tested in the UKMLA AKT. Our revision guide covers AKI, CKD, electrolyte disorders, nephrotic syndrome, and urinalysis interpretation.",
    "primaryKeyword": "nephrology UKMLA AKI CKD",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/mock-exams-ukmla-preparation-featured.webp",
    "featuredImageTitle": "Nephrology in the UKMLA: AKI, CKD, and Electrolyte Disorders Featured Image",
    "featuredImageAltText": "nephrology UKMLA - AKI CKD Electrolytes and Renal Revision Guide",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "haematology-ukmla-revision",
    "title": "Haematology in the UKMLA: Anaemia, Clotting, and Blood Cancers",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/cardiology-ukmla-akt-revision-featured.webp",
    "summary": "Blood disorders are tested across both UKMLA components. Here is a targeted guide to anaemia workup, clotting disorders, and the haematological malignancies you need to know.",
    "seoTitle": "Haematology in the UKMLA: Anaemia, Clotting, and Blood Cancer",
    "seoDescription": "Haematological presentations are high-yield in the UKMLA AKT. Our guide covers anaemia workup, DVT/PE, coagulation disorders, leukaemia, and lymphoma.",
    "primaryKeyword": "haematology UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/cardiology-ukmla-akt-revision-featured.webp",
    "featuredImageTitle": "Haematology in the UKMLA: Anaemia, Clotting, and Blood Cancers Featured Image",
    "featuredImageAltText": "haematology UKMLA - Anaemia Clotting Disorders and Blood Cancer Revision",
    "sourceFullUrl": "https://www.gmc-uk.org/education/medical-licensing-assessment/mla-content-map"
  },
  {
    "slug": "infection-microbiology-ukmla-revision",
    "title": "Infection and Microbiology in the UKMLA: Antibiotic Stewardship and More",
    "date": "30 June 2026",
    "tag": "Preparation",
    "image": "/images/gastroenterology-ukmla-akt-revision-featured.webp",
    "summary": "Infectious diseases are a major AKT topic. This guide covers common infections, empiric antibiotic choices, and the broader principles of antimicrobial stewardship.",
    "seoTitle": "Infection and Microbiology in the UKMLA: Antibiotics and Stewardship",
    "seoDescription": "Infection is a high-yield UKMLA domain. Our revision guide covers empiric antibiotics, sepsis, common organisms, resistance, and antimicrobial stewardship principles.",
    "primaryKeyword": "infection microbiology UKMLA",
    "featuredImageKeyword": "Preparation",
    "featuredImageUrl": "/images/gastroenterology-ukmla-akt-revision-featured.webp",
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
    "sourceFullUrl": "https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab"
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
  }
];
const topics = ['All', ...Array.from(new Set(posts.map((p) => p.tag)))];

function getSlugFromHash() {
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

  return { html: doc.body.innerHTML, toc, takeaways: takeaways.slice(0, 8) };
}

export default function News() {
  const [activeSlug, setActiveSlug] = useState(getSlugFromHash);
  const [activeTopic, setActiveTopic] = useState('All');
  const [activeSection, setActiveSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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
    if (activePost) {
      document.title = activePost.seoTitle || (activePost.title + ' | UKMLA');

      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.content = activePost.seoDescription || activePost.summary;
      }
    } else {
      // Revert to list page defaults
      document.title = 'UKMLA News & Updates: Latest Changes | UKMLA';
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.content = 'Stay updated with the latest announcements, updates, and structural adjustments for the UKMLA from the GMC and Medical Schools Council.';
      }
    }
  }, [activePost]);

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

  const openPost = useCallback((slug) => {
    window.history.pushState(null, '', `#${slug}`);
    setActiveSlug(slug);
    setActiveSection(null);
    window.scrollTo(0, 0);
  }, []);

  const closePost = useCallback(() => {
    window.history.pushState(null, '', window.location.pathname);
    setActiveSlug(null);
    setActiveSection(null);
    window.scrollTo(0, 0);
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

  // ---- Posts index (title + summary only) ----
  // Newest posts first, so freshly added posts surface on page 1 instead of
  // sinking to the last page in original insertion order.
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const visiblePosts = activeTopic === 'All' ? sortedPosts : sortedPosts.filter((p) => p.tag === activeTopic);
  const featuredPost = visiblePosts[0] || null;
  const remainingPosts = visiblePosts.slice(1);
  const totalPages = Math.ceil(remainingPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = remainingPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

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
              onClick={() => { setActiveTopic(topic); setCurrentPage(1); }}
            >
              {topic}
            </button>
          ))}
        </div>

        {visiblePosts.length === 0 ? (
          <p className="post-empty">No posts in this topic yet.</p>
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
                <h2 className="post-section-heading">All Posts</h2>
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
