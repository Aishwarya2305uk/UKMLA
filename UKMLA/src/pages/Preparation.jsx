import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function Preparation() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">UKMLA Preparation Guide</h1>
            <p className="page-summary">
              An action-oriented study guide for passing the AKT and CPSA, featuring revision timelines, study plans, useful resources, and common pitfalls.
            </p>
          </header>

          <section>
            <h2>How to Approach the UKMLA</h2>
            <p>
              Preparing for the UKMLA requires a balanced study plan that treats the written (AKT) and practical (CPSA) components with equal importance. Since the exam is based on the <strong>GMC MLA Content Map</strong>, your revision should always map back to these core symptoms, conditions, and procedures.
            </p>

            <figure className="content-figure">
              <div className="figure-media">
                <img src="/images/student-studying.webp" alt="A medical student revising with textbooks, notes and a laptop" loading="lazy" />
              </div>
              <figcaption>
                <strong>Plan before you cram.</strong> A steady three-to-six month schedule that loops back to the Content Map — paired with active question practice — beats last-minute revision for both the AKT and CPSA.
              </figcaption>
            </figure>
          </section>

          <section>
            <h2>AKT Revision Strategy</h2>
            <p>
              The Applied Knowledge Test checks how you apply clinical guidelines to single best answer questions. A standard preparation timeline is <strong>3 to 6 months</strong> depending on your clinical background.
            </p>
            <ul>
              <li>
                <strong>Master UK Guidelines:</strong> The AKT is strictly benchmarked against current UK guidelines, primarily <strong>NICE (National Institute for Health and Care Excellence)</strong> and <strong>SIGN (Scottish Intercollegiate Guidelines Network)</strong>. Avoid relying on US-centric resources (e.g., USMLE materials) as treatment lines often differ (e.g., in hypertension or asthma management).
              </li>
              <li>
                <strong>Use Question Banks:</strong> Clinical reasoning is best honed by doing questions. Utilize high-yield question banks that align to the MLA map (such as Plabable, Medibuddy, Passmedicine, or the MSC student portal). Focus on understanding the rationales for correct and incorrect answers rather than memorizing the stems.
              </li>
              <li>
                <strong>Simulate Under Exam Conditions:</strong> Practice with 3-hour mocks of 180 questions (for PLAB 1) or 100-question blocks (for MS AKT) to build stamina and time-management skills.
              </li>
            </ul>
          </section>

          <section>
            <h2>Free UKMLA Mock Test</h2>
            <p>
              Taking a <strong>free UKMLA mock test</strong> is one of the best ways to gauge your readiness before paying for a subscription to a question bank. Many platforms offer a free trial or a mini mock test.
            </p>
            <ul>
              <li><strong>Medical Schools Council (MSC):</strong> Provides official practice questions and mock exams that perfectly reflect the style and difficulty of the MS AKT.</li>
              <li><strong>Commercial Question Banks:</strong> Platforms like Plabable and Passmedicine often provide a free UKMLA mock test or a limited set of free questions to help you get started with your preparation.</li>
            </ul>
          </section>

          <section>
            <h2>CPSA / OSCE Revision Strategy</h2>
            <p>
              The Clinical and Professional Skills Assessment is a performance-based test. You cannot pass it simply by reading books; you must practice with colleagues, simulated patients, or task trainers.
            </p>
            <ul>
              <li>
                <strong>Practice Communication Routinely:</strong> Many candidates fail due to poor communication rather than clinical gaps. Practice explaining complex diagnoses in plain English, checking understanding, showing empathy, and structuring history-taking.
              </li>
              <li>
                <strong>Master Practical Procedures:</strong> Regularly practice the mandatory procedures (cannulation, urinary catheterisation, injections, BLS) on manikins until they become second nature. Memorize the safety checks (e.g., sharps disposal, patient identity checks, handwashing).
              </li>
              <li>
                <strong>Leverage Geeky Medics:</strong> A highly recommended platform for step-by-step practical guides, OSCE checklists, and videos demonstrating examinations and procedures.
              </li>
            </ul>
          </section>

          <section>
            <h2>Sample 16-Week Study Plan</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Timeline</th>
                    <th>AKT Focus Area</th>
                    <th>CPSA Focus Area</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Weeks 1–4</strong></td>
                    <td>Cardiology, Respiratory, Endocrinology. Complete 300+ SBA questions.</td>
                    <td>Practice system examinations (Cardio, Resp, Abdominal) with peer reviews.</td>
                  </tr>
                  <tr>
                    <td><strong>Weeks 5–8</strong></td>
                    <td>Gastroenterology, Renal, Neurology, Surgery. Complete 400+ SBA questions.</td>
                    <td>Master procedural skills (cannulation, catheter, venepuncture, BLS).</td>
                  </tr>
                  <tr>
                    <td><strong>Weeks 9–12</strong></td>
                    <td>Paediatrics, Gynaecology, Psychiatry, Geriatrics. Review wrong questions.</td>
                    <td>Conduct mock history taking and communication scenarios (e.g., consent).</td>
                  </tr>
                  <tr>
                    <td><strong>Weeks 13–16</strong></td>
                    <td>Take full-length mocks under timed constraints. Review NICE guidelines.</td>
                    <td>Run timed OSCE circuits of 8-minute stations with examiners grading you.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Common Preparation Mistakes to Avoid</h2>
            <div className="callout warning">
              <div className="callout-title">Top 4 Preparation Pitfalls</div>
              <ol style={{ paddingLeft: '20px', marginTop: '6px' }}>
                <li style={{ marginBottom: '6px' }}>
                  <strong>Studying Outdated Guidelines:</strong> UK guidelines change regularly. Ensure your study materials are updated for the 2026 guidelines. Do not rely on old PDF files or recall lists passed around on social forums.
                </li>
                <li style={{ marginBottom: '6px' }}>
                  <strong>Conflating AKT and PLAB 1 Formats:</strong> Ensure you study the exact question counts and timings for your specific route (e.g. 180 SBAs in 3 hours for PLAB 1 versus 200 SBAs for MS AKT).
                </li>
                <li style={{ marginBottom: '6px' }}>
                  <strong>Underestimating Communication Stations:</strong> Interpersonal skills account for a third of your score in OSCE stations. Empathy, active listening, and addressing patient concerns cannot be fake-practiced on the day of the exam.
                </li>
                <li>
                  <strong>Neglecting Prescribing Safety:</strong> Medication errors are heavily penalized. Practice calculating drug dosages, writing fluid charts, and checking contraindications.
                </li>
              </ol>
            </div>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Preparation Resources</h3>
            <ul className="related-links-list">
              <li><Link to="/official-resources">Access official practice mock links</Link></li>
              <li><Link to="/exam-pattern">Verify exam pattern layouts</Link></li>
              <li><Link to="/results-and-scoring">Understand passing marks and scoring metrics</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC) & Medical Schools Council (MSC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/what-is-ukmla" className="sidebar-link">What is UKMLA?</Link></li>
            <li><Link to="/preparation" className="sidebar-link active">Preparation Guide</Link></li>
            <li><Link to="/exam-pattern" className="sidebar-link">Exam Pattern</Link></li>
            <li><Link to="/official-resources" className="sidebar-link">Official Resources</Link></li>
            <li><Link to="/faqs" className="sidebar-link">Preparation FAQs</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
