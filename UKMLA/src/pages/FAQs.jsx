import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

const faqsList = [
  // --- GENERAL ---
  {
    category: 'General',
    q: 'What does UKMLA stand for?',
    a: 'UKMLA stands for United Kingdom Medical Licensing Assessment. It is often referred to simply as the MLA (Medical Licensing Assessment).'
  },
  {
    category: 'General',
    q: 'Who introduced the UKMLA?',
    a: 'The UKMLA was introduced and is regulated by the General Medical Council (GMC), the statutory body regulating doctors in the United Kingdom.'
  },
  {
    category: 'General',
    q: 'Is the UKMLA currently active?',
    a: 'Yes, the UKMLA is fully active. It became a mandatory graduation requirement for UK medical graduates starting in the 2024–25 academic year.'
  },
  {
    category: 'General',
    q: 'Why was the UKMLA introduced?',
    a: 'The GMC introduced the UKMLA to establish a common, consistent threshold of safety and clinical knowledge for every doctor entering clinical practice in the UK.'
  },
  {
    category: 'General',
    q: 'Is this website an official regulator portal?',
    a: 'No. This is an independent educational platform. All official standards, bookings, and fee scales are managed solely by the General Medical Council (GMC).'
  },
  {
    category: 'General',
    q: 'What are the two parts of the UKMLA?',
    a: 'The assessment has two parts: the Applied Knowledge Test (AKT), which is a written theory exam, and the Clinical and Professional Skills Assessment (CPSA), which is a practical OSCE.'
  },
  {
    category: 'General',
    q: 'Does the UKMLA test non-clinical skills?',
    a: 'Yes. It tests professional behaviors, communication skills, patient empathy, ethics, and safeguarding protocols alongside clinical diagnostic knowledge.'
  },
  {
    category: 'General',
    q: 'Is the UKMLA a postgraduate qualification?',
    a: 'No. It is a licensing assessment. Passing it does not award an academic degree or postgraduate diploma; it simply qualifies you to join the GMC register.'
  },
  {
    category: 'General',
    q: 'Are GMC medical guidelines tested in the UKMLA?',
    a: 'Yes. Questions and clinical scenarios are heavily based on GMC guidelines (such as Good Medical Practice) and UK clinical standard protocols (like NICE guidelines).'
  },
  {
    category: 'General',
    q: 'Where can I find the official syllabus document?',
    a: 'The official syllabus is called the GMC MLA Content Map. You can download the latest version from the official GMC website or view highlights on our Syllabus page.'
  },
  {
    category: 'General',
    q: 'Does the UKMLA apply to dentists?',
    a: 'No. The UKMLA is exclusively for medical practitioners. Dentists follow separate registration pipelines governed by the General Dental Council (GDC).'
  },
  {
    category: 'General',
    q: 'Can I practice medicine in the UK without passing the UKMLA?',
    a: 'No. Unless you qualify for a rare exemption (such as holding a Relevant European Qualification), you must pass the UKMLA/PLAB to obtain a licence to practice.'
  },
  {
    category: 'General',
    q: 'Is the UKMLA standard the same as Foundation Year 1?',
    a: 'Yes. The GMC explicitly benchmarks the passing threshold of the UKMLA at the level of a doctor beginning their Foundation Year 1 (FY1) placement.'
  },
  {
    category: 'General',
    q: 'Does passing the UKMLA guarantee me a clinical job?',
    a: 'No. Passing the assessment allows you to register with the GMC. Finding employment within the NHS or private sectors involves a separate job application process.'
  },
  {
    category: 'General',
    q: 'What is the GMC content map updated frequency?',
    a: 'The GMC periodically updates the MLA Content Map to reflect changes in medical practice. The next major update is set to take effect in September 2026.'
  },

  // --- ELIGIBILITY ---
  {
    category: 'Eligibility',
    q: 'Who is eligible to take the UKMLA?',
    a: 'UK medical students in their graduating years and International Medical Graduates (IMGs) holding an acceptable Primary Medical Qualification (PMQ).'
  },
  {
    category: 'Eligibility',
    q: 'Do UK medical students pay direct fees for the UKMLA?',
    a: 'No. UK students do not pay direct GMC registration fees for the test; the administrative costs are covered under standard medical university tuition.'
  },
  {
    category: 'Eligibility',
    q: 'Can final-year medical students sit the PLAB exam?',
    a: 'No. Under GMC rules, you must have graduated and hold a physical or verified Primary Medical Qualification (PMQ) degree before booking PLAB sittings.'
  },
  {
    category: 'Eligibility',
    q: 'What is an acceptable Primary Medical Qualification (PMQ)?',
    a: 'A medical degree (like MBBS or MD) awarded by an institution listed in the World Directory of Medical Schools that meets the GMC\'s duration and rotation hours criteria.'
  },
  {
    category: 'Eligibility',
    q: 'What English exams are accepted for UKMLA eligibility?',
    a: 'The GMC accepts the Academic IELTS and the OET (Medicine) exams. General training versions are not accepted.'
  },
  {
    category: 'Eligibility',
    q: 'What is the minimum IELTS score required?',
    a: 'You must achieve a minimum overall score of 7.5, with at least 7.0 in each sub-test (Listening, Reading, Writing, and Speaking).'
  },
  {
    category: 'Eligibility',
    q: 'What is the minimum OET score required?',
    a: 'You must achieve a Grade B or higher in each of the four modules (Listening, Reading, Writing, and Speaking).'
  },
  {
    category: 'Eligibility',
    q: 'How long are OET/IELTS scores valid for the GMC?',
    a: 'English test scores are valid for exactly two years. They must be active on the date you book and sit the PLAB 1 exam.'
  },
  {
    category: 'Eligibility',
    q: 'Can I get an English language requirement waiver?',
    a: 'Waivers are extremely rare and generally only granted to doctors who have practiced extensively or completed medical school in an English-speaking country.'
  },
  {
    category: 'Eligibility',
    q: 'What is EPIC verification?',
    a: 'EPIC is an online credentials check run by the ECFMG. It verifies that your medical degree is authentic. GMC requires EPIC checks before booking exams.'
  },
  {
    category: 'Eligibility',
    q: 'Do EU medical graduates need to sit the UKMLA?',
    a: 'EU graduates who hold a "Relevant European Qualification" recognized under post-Brexit transition rules do not sit the exam. Unrecognized degrees require PLAB.'
  },
  {
    category: 'Eligibility',
    q: 'Can I sit the UKMLA if my medical school is not in the World Directory?',
    a: 'No. If your university is not listed in the World Directory of Medical Schools (WDOMS), your qualification is not recognized, and you cannot sit the exam.'
  },
  {
    category: 'Eligibility',
    q: 'Is there an age limit to sit the UKMLA?',
    a: 'No. There is no age limit for taking the UKMLA or registering as a doctor with the GMC, provided all other qualification criteria are satisfied.'
  },
  {
    category: 'Eligibility',
    q: 'Can I register with the GMC via clinical sponsorship?',
    a: 'Yes. Clinical sponsorship by a GMC-approved institution is an alternative pathway to registration, bypassing the PLAB exam entirely for qualified specialists.'
  },
  {
    category: 'Eligibility',
    q: 'Do I need clinical experience in my home country before PLAB?',
    a: 'While not mandatory to book the exam, completing an internship (acceptable FY1 equivalent) is highly recommended before applying for full GMC registration.'
  },

  // --- EXAM PATTERN ---
  {
    category: 'Pattern',
    q: 'How many questions are on the PLAB 1 exam?',
    a: 'PLAB 1 consists of 180 Single Best Answer (SBA) questions.'
  },
  {
    category: 'Pattern',
    q: 'What is the duration of the PLAB 1 exam?',
    a: 'PLAB 1 is a single, continuous written exam lasting exactly 3 hours.'
  },
  {
    category: 'Pattern',
    q: 'How many questions are on the MS AKT for UK students?',
    a: 'The UK-student MS AKT typically consists of 200 questions split into two papers of 100 questions, taken on consecutive days.'
  },
  {
    category: 'Pattern',
    q: 'What is the format of the written AKT questions?',
    a: 'They are Single Best Answer (SBA) questions: a clinical description (vignette), a specific question, and five plausible options with one correct answer.'
  },
  {
    category: 'Pattern',
    q: 'Is there negative marking in the AKT or PLAB 1?',
    a: 'No. There is no negative marking. You receive 1 mark for a correct answer and 0 marks for an incorrect or blank response. You should answer every question.'
  },
  {
    category: 'Pattern',
    q: 'How many stations are in the PLAB 2 exam?',
    a: 'PLAB 2 consists of 16 active assessed clinical stations and two rest stations.'
  },
  {
    category: 'Pattern',
    q: 'How long is each station in the PLAB 2 exam?',
    a: 'You have 1.5 minutes to read instructions outside the station door, and exactly 8 minutes to complete the tasks inside the station.'
  },
  {
    category: 'Pattern',
    q: 'Where is the PLAB 2 clinical assessment held?',
    a: 'PLAB 2 is exclusively held at the GMC Clinical Assessment Centre in Manchester, United Kingdom.'
  },
  {
    category: 'Pattern',
    q: 'What equipment is used in practical clinical stations?',
    a: 'Stations use simulated patient role-players, anatomical task-trainers, clinical equipment (syringes, BP cuffs, catheters), and documentation charts.'
  },
  {
    category: 'Pattern',
    q: 'Is the CPSA standard identical for all UK universities?',
    a: 'Yes. While individual schools structure their local CPSAs (OSCEs) slightly differently, they must satisfy the same core standards mapped to the GMC blueprint.'
  },
  {
    category: 'Pattern',
    q: 'What clinical areas are tested in the CPSA?',
    a: 'History taking, physical clinical examination (Cardio, Resp, Neuro), communication/consent, and practical procedures (cannulation, injections, BLS).'
  },
  {
    category: 'Pattern',
    q: 'Can I bring my own stethoscope to the PLAB 2 exam?',
    a: 'Yes. Candidates are encouraged to bring their own stethoscopes. All other medical equipment, manikins, and pens are provided by the GMC.'
  },

  // --- PREPARATION ---
  {
    category: 'Preparation',
    q: 'How long does it take to prepare for the AKT / PLAB 1?',
    a: 'Most candidates study for 3 to 6 months. This involves reviewing guidelines, studying the Content Map, and completing practicing question blocks.'
  },
  {
    category: 'Preparation',
    q: 'Which guidelines are primary for UKMLA revision?',
    a: 'You must focus on UK clinical guidelines: NICE (National Institute for Health and Care Excellence) and SIGN (Scottish Intercollegiate Guidelines Network).'
  },
  {
    category: 'Preparation',
    q: 'Are USMLE revision materials useful for UKMLA?',
    a: 'While basic medical science is similar, US clinical guidelines and medications differ from UK practice. Relying solely on USMLE tools is not recommended.'
  },
  {
    category: 'Preparation',
    q: 'What are the best question banks for PLAB 1?',
    a: 'Popular candidate question banks include Plabable, Medibuddy, Passmedicine, and the practice mocks published officially by the GMC.'
  },
  {
    category: 'Preparation',
    q: 'How should I study for the clinical skills CPSA?',
    a: 'Practice OSCE stations with study partners under timed constraints, review procedural skills checklists, and record your consultations to verify empathy.'
  },
  {
    category: 'Preparation',
    q: 'Is Geeky Medics useful for UKMLA preparation?',
    a: 'Yes. Geeky Medics is highly recommended for visual learners preparing for practical exams, offering video guides and clinical skill checklists.'
  },
  {
    category: 'Preparation',
    q: 'How many mock exams should I practice before AKT?',
    a: 'It is recommended to sit at least 4 to 6 full-length, timed mocks (180 questions in 3 hours) to build focus and manage your pace.'
  },
  {
    category: 'Preparation',
    q: 'Can I study for PLAB 2 without traveling to the UK?',
    a: 'You can study communication and histories anywhere. However, practicing procedures and getting familiar with UK clinical layouts is best done in a lab environment.'
  },
  {
    category: 'Preparation',
    q: 'What is the most common reason candidates fail PLAB 2?',
    a: 'Poor interpersonal and communication skills. Using rigid medical jargon, speaking over patients, or failing to address patient concerns are major failure causes.'
  },
  {
    category: 'Preparation',
    q: 'Do I need to attend a commercial prep academy?',
    a: 'No. Academies are popular for PLAB 2 practice, but many candidates pass through self-directed study, peer practice groups, and free online guides.'
  },
  {
    category: 'Preparation',
    q: 'How do I practice Male Catheterisation for the OSCE?',
    a: 'You must practice on standard clinical pelvic task-trainers at university labs or skills courses, focusing on sterile technique and patient comfort.'
  },
  {
    category: 'Preparation',
    q: 'Should I review past papers or recalls?',
    a: 'Relying on recalls is risky as guidelines change. Focus on understanding the core clinical principles and NICE rules rather than memorizing stems.'
  },

  // --- RESULTS & SCORING ---
  {
    category: 'Scoring',
    q: 'How is the AKT pass mark set?',
    a: 'The pass mark is set for each paper using the Angoff method, where panel experts determine the difficulty level of questions.'
  },
  {
    category: 'Scoring',
    q: 'How is the CPSA / PLAB 2 pass mark calculated?',
    a: 'The pass mark is calculated using the Borderline Regression method, combining domain grades with global examiner ratings.'
  },
  {
    category: 'Scoring',
    q: 'What is the average pass mark for PLAB 1?',
    a: 'The pass mark varies by sitting, but historically averages between 60% and 65% (approx. 110–120 correct answers out of 180).'
  },
  {
    category: 'Scoring',
    q: 'Do I get a score report after my exam?',
    a: 'Yes. GMC online portal results show your overall mark, the required pass mark, and a breakdown of correct answers by category.'
  },
  {
    category: 'Scoring',
    q: 'What is the dual pass criteria for PLAB 2?',
    a: 'You must meet the overall daily passing score AND pass a minimum number of individual stations (typically 10 out of 16 active stations).'
  },
  {
    category: 'Scoring',
    q: 'Can I see the examiner comments for my PLAB 2 stations?',
    a: 'Yes. Your results dashboard includes feedback comments highlighting key areas of performance in each station.'
  },
  {
    category: 'Scoring',
    q: 'Are exam scores rounded?',
    a: 'Yes, scores and cutoffs are calculated to decimal points and rounded under standard GMC psychometric protocols.'
  },
  {
    category: 'Scoring',
    q: 'What is the pass rate for PLAB 1?',
    a: 'Pass rates vary by sitting, typically landing around 60% to 65% for PLAB 1.'
  },
  {
    category: 'Scoring',
    q: 'What is the pass rate for PLAB 2?',
    a: 'Pass rates for PLAB 2 typically settle around 60% to 65% depending on the cohort.'
  },
  {
    category: 'Scoring',
    q: 'How long do I have to wait to receive my PLAB 1 results?',
    a: 'Results are published on the GMC Online portal approximately 6 weeks after your exam date.'
  },
  {
    category: 'Scoring',
    q: 'How long do I have to wait to receive my PLAB 2 results?',
    a: 'PLAB 2 results are typically published online 4 weeks after your clinical test date.'
  },
  {
    category: 'Scoring',
    q: 'What happens if I fail the AKT by 1 mark?',
    a: 'Unfortunately, there is no grading curve. A fail is a fail, and you must book a resit. Re-marking requests are rarely approved.'
  },

  // --- TRANSITION & IMGS ---
  {
    category: 'Transition',
    q: 'What is the difference between PLAB and UKMLA?',
    a: 'PLAB is the exam sat by IMGs. UKMLA is the licensing standard. Since 2024, the PLAB exam has been updated to follow the UKMLA Content Map.'
  },
  {
    category: 'Transition',
    q: 'Is the PLAB name changing to UKMLA?',
    a: 'The GMC has announced plans to change the name formally in the future, but the test currently retains the name PLAB.'
  },
  {
    category: 'Transition',
    q: 'If I passed PLAB before 2024, is it still valid?',
    a: 'Yes. Passing PLAB before the MLA transition remains fully valid for GMC registration, provided you apply within your 2-year window.'
  },
  {
    category: 'Transition',
    q: 'How long after passing PLAB 1 must I pass PLAB 2?',
    a: 'You must pass PLAB 2 within exactly two years of passing PLAB 1.'
  },
  {
    category: 'Transition',
    q: 'How long after passing PLAB 2 must I apply for registration?',
    a: 'You must submit your GMC registration application within two years of passing PLAB 2.'
  },
  {
    category: 'Transition',
    q: 'Do PLAB attempt limits carry over if the name changes?',
    a: 'Yes. Your attempt count is linked to your GMC account. Changing the exam name will not reset your attempt limits.'
  },
  {
    category: 'Transition',
    q: 'How many times can I fail PLAB 1?',
    a: 'You can take PLAB 1 a maximum of four times. A fifth attempt requires special permission based on clinical training evidence.'
  },
  {
    category: 'Transition',
    q: 'What is the visa required to sit PLAB 2 in the UK?',
    a: 'Most international graduates apply for a Standard Visitor Visa to travel to Manchester, UK for the PLAB 2 sitting.'
  },
  {
    category: 'Transition',
    q: 'Are test dates for PLAB 1 easy to book?',
    a: 'Slots are highly competitive. You should monitor the GMC Online booking page and release dates closely to secure a slot.'
  },
  {
    category: 'Transition',
    q: 'Can I work in the UK if I have failed the PLAB / UKMLA?',
    a: 'No. You cannot obtain a license to practice medicine in the UK without passing the required licensing examinations.'
  },
  {
    category: 'Transition',
    q: 'Do alternative IMG pathways (postgrad qualifications) require PLAB?',
    a: 'No. If you hold a GMC-recognized postgraduate qualification (such as MRCP, MRCS, or FRCA), you can bypass the PLAB exam.'
  },
  {
    category: 'Transition',
    q: 'Is the clinical skills center in Manchester accessible?',
    a: 'Yes. The GMC Assessment Centre in Manchester is fully accessible and accommodates candidates with disability requirements.'
  }
];

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'General', 'Eligibility', 'Pattern', 'Preparation', 'Scoring', 'Transition'];

  const filteredFaqs = faqsList.filter(faq => {
    const matchesCategory = activeCategory === 'ALL' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">Frequently Asked Questions (FAQs)</h1>
            <p className="page-summary">
              An exhaustive database of 75+ categorized questions and answers about UKMLA eligibility, patterns, results, and the PLAB transition.
            </p>
          </header>

          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Search FAQs (e.g. OET, pass mark, attempts)..."
              className="form-input"
              style={{ padding: '12px 16px', fontSize: '16px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Tabs */}
          <div className="glossary-index" style={{ marginBottom: '32px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`glossary-letter-btn ${activeCategory === cat ? 'active' : ''}`}
                style={{ padding: '8px 16px', borderRadius: '20px' }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'ALL' ? 'Show All' : cat}
              </button>
            ))}
          </div>

          <section className="faq-accordion">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary className="faq-question">
                    <span>{faq.q}</span>
                  </summary>
                  <div className="faq-answer">
                    <p style={{ margin: 0, fontSize: '15px' }}>{faq.a}</p>
                  </div>
                </details>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '40px 0' }}>
                No FAQs match your search query. Try typing another keyword.
              </p>
            )}
          </section>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/faqs" className="sidebar-link active">FAQs Hub</Link></li>
            <li><Link to="/what-is-ukmla" className="sidebar-link">What is UKMLA?</Link></li>
            <li><Link to="/ukmla-vs-plab" className="sidebar-link">UKMLA vs PLAB</Link></li>
            <li><Link to="/official-resources" className="sidebar-link">Official Resources</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
