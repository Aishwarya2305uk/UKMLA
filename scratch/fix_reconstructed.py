# -*- coding: utf-8 -*-
import json, re

overrides = {
    "toxicology-and-poisoning-ukmla": {
        "seoTitle": "Toxicology UKMLA: Overdoses & Antidotes Guide",
        "seoDescription": "This toxicology UKMLA guide covers high-yield overdose recognition, key antidotes, ECG changes and safe initial treatment thresholds for the AKT and CPSA.",
    },
    "sepsis-recognition-and-management-ukmla": {
        "seoTitle": "Sepsis UKMLA: Recognition & Management Guide",
        "seoDescription": "This sepsis UKMLA guide explains red-flag recognition, the Sepsis Six and escalation across acute medicine, paediatrics and obstetrics for AKT revision.",
    },
    "anaesthesia-and-perioperative-medicine-ukmla": {
        "seoTitle": "Anaesthesia UKMLA: Perioperative Medicine Guide",
        "seoDescription": "This anaesthesia UKMLA guide covers pre-operative assessment, fluids, analgesia and post-operative complications a foundation doctor must know for the AKT.",
    },
    "urology-ukmla-revision": {
        "seoTitle": "Urology UKMLA: High-Yield AKT Revision Guide",
        "seoDescription": "This urology UKMLA guide covers UTIs, urinary retention, renal colic, BPH and catheterisation basics that recur across the Applied Knowledge Test.",
    },
    "care-of-the-elderly-and-frailty-ukmla": {
        "seoTitle": "Care of the Elderly UKMLA: Frailty Revision Guide",
        "seoDescription": "This care of the elderly UKMLA guide covers frailty assessment, falls, polypharmacy and delirium, high-yield topics tested across the AKT and CPSA.",
    },
    "medical-statistics-and-evidence-based-medicine-ukmla": {
        "seoTitle": "Medical Statistics UKMLA: EBM Revision Guide",
        "seoDescription": "This medical statistics UKMLA guide explains sensitivity, specificity, relative risk and critical appraisal for fast, confident AKT decision-making.",
    },
    "public-health-and-screening-ukmla": {
        "seoTitle": "Public Health UKMLA: Screening & Prevention",
        "seoDescription": "This public health UKMLA guide covers screening programmes, epidemiology and prevention, the population-level thinking tested across the AKT.",
    },
    "immunology-and-allergy-ukmla": {
        "seoTitle": "Immunology UKMLA: Allergy & Anaphylaxis Guide",
        "seoDescription": "This immunology UKMLA guide covers anaphylaxis, drug allergy and hypersensitivity reasoning that recur across AKT scenarios in every specialty.",
    },
    "nutrition-and-metabolic-disorders-ukmla": {
        "seoTitle": "Nutrition UKMLA: Metabolic Disorders Revision",
        "seoDescription": "This nutrition UKMLA guide covers metabolic disorders across gastroenterology, endocrinology and care of the elderly, high-yield for the AKT.",
    },
    "chronic-pain-management-ukmla": {
        "seoTitle": "Chronic Pain UKMLA: Safe Prescribing Guide",
        "seoDescription": "This chronic pain UKMLA guide explains why escalating opioids is often the wrong answer, covering safe prescribing principles tested across the AKT.",
    },
    "critical-care-and-intensive-care-basics-ukmla": {
        "seoTitle": "Critical Care UKMLA: The Deteriorating Patient",
        "seoDescription": "This critical care UKMLA guide covers recognising and escalating the deteriorating ward patient, a core GMC licensure concern tested across the AKT.",
    },
    "consent-and-mental-capacity-ukmla": {
        "seoTitle": "Consent and Mental Capacity UKMLA Guide",
        "seoDescription": "This consent and mental capacity UKMLA guide applies the Mental Capacity Act 2005 to real exam scenarios tested across both the AKT and CPSA.",
    },
    "indemnity-insurance-for-doctors-explained": {
        "seoTitle": "Indemnity Insurance for Doctors, Explained",
        "seoDescription": "Indemnity insurance for doctors explained: NHS Clinical Negligence Scheme cover, private practice gaps, and what new UK graduates and IMGs need.",
    },
    "multi-specialty-recruitment-assessment-msra-explained": {
        "seoTitle": "MSRA: Multi-Specialty Recruitment Assessment",
        "seoDescription": "The Multi-Specialty Recruitment Assessment explained: what it tests, which specialties use it, and how it differs from the UKMLA and Foundation Programme.",
    },
    "locum-vs-substantive-nhs-posts-explained": {
        "seoTitle": "Locum vs Substantive NHS Posts Explained",
        "seoDescription": "Locum vs substantive NHS posts explained: pay, job security, pension access and career progression differences for UK graduates and IMGs alike.",
    },
    "understanding-nhs-pay-scales-and-banding-for-doctors": {
        "seoTitle": "NHS Pay Scales and Banding for Doctors Guide",
        "seoDescription": "NHS pay scales and banding explained: how basic pay nodal points combine with banding supplements to determine a doctor's actual take-home pay.",
    },
    "ewtd-working-hours-and-rest-rules-for-doctors": {
        "seoTitle": "Working Hours and Rest Rules for Doctors: EWTD",
        "seoDescription": "The working hours and rest rules for doctors explained: EWTD limits, mandatory rest breaks and how the Working Time Regulations protect new residents.",
    },
    "gmc-annual-retention-fee-explained": {
        "seoTitle": "The GMC Annual Retention Fee, Explained",
        "seoDescription": "The GMC annual retention fee explained: how much it costs, when it's due, and what happens if a doctor with a licence to practise misses payment.",
    },
    "arcp-annual-review-of-competence-progression-explained": {
        "seoTitle": "ARCP: Annual Review of Competence Progression",
        "seoDescription": "The Annual Review of Competence Progression explained: what evidence panels expect, possible outcomes, and how ARCP affects postgraduate training.",
    },
    "nhs-eportfolio-guide-for-doctors": {
        "seoTitle": "NHS e-Portfolio Guide for Doctors",
        "seoDescription": "This NHS e-Portfolio guide explains the digital training record every doctor keeps from Foundation placement through specialty training, practically.",
    },
    "substance-misuse-and-addiction-ukmla": {
        "seoTitle": "Substance Misuse UKMLA: Addiction Revision",
        "seoDescription": "This substance misuse UKMLA guide covers alcohol and drug-related presentations across acute medicine, A&E and primary care, high-yield for the AKT.",
    },
    "returning-to-practise-in-gulf-countries-dataflow-guide": {
        "seoTitle": "Returning to Practise in Gulf Countries Guide",
        "seoDescription": "Returning to practise in Gulf countries explained: DataFlow primary source verification, licensing exams and timelines for UK-qualified doctors.",
    },
    "breaking-bad-news-in-the-cpsa": {
        "seoTitle": "Breaking Bad News in the CPSA: Complete Guide",
        "seoDescription": "Breaking bad news CPSA stations explained: structure, empathy and common pitfalls for cancer diagnoses, abnormal scans and life-limiting news.",
    },
}

r = json.load(open('scratch/reconstructed_posts.json', encoding='utf-8'))

def clean_summary(slug):
    html = open(f'posts-html/{slug}.html', encoding='utf-8').read()
    paras = re.findall(r'<p>(.*?)</p>', html, re.S)
    paras = [re.sub('<[^>]+>', '', x).strip() for x in paras]
    paras = [re.sub(r'\s+', ' ', x) for x in paras if len(x) > 80]
    first = paras[0]
    # find sentence boundary near 250-320 chars
    sentences = re.split(r'(?<=[.!?])\s+', first)
    out = ""
    for s in sentences:
        if len(out) + len(s) > 320 and out:
            break
        out = (out + " " + s).strip()
        if len(out) >= 150:
            # allow one more sentence up to 320 then stop
            pass
    return out

errors = []
for p in r:
    slug = p["slug"]
    if slug not in overrides:
        errors.append(f"NO OVERRIDE: {slug}")
        continue
    ov = overrides[slug]
    p["seoTitle"] = ov["seoTitle"]
    p["seoDescription"] = ov["seoDescription"]
    p["summary"] = clean_summary(slug)

    kw = p["primaryKeyword"].lower()
    if kw not in p["seoDescription"].lower():
        errors.append(f"{slug}: keyphrase '{p['primaryKeyword']}' missing from seoDescription")
    if not (140 <= len(p["seoDescription"]) <= 156):
        errors.append(f"{slug}: seoDescription len {len(p['seoDescription'])}")
    if len(p["seoTitle"]) > 60:
        errors.append(f"{slug}: seoTitle len {len(p['seoTitle'])}")
    if len(p["summary"]) < 100:
        errors.append(f"{slug}: summary too short ({len(p['summary'])})")

for e in errors:
    print("ERROR:", e)

if not errors:
    print("All 23 overrides validated OK")

json.dump(r, open('scratch/reconstructed_posts.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print("saved")
