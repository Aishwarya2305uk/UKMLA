import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function AKT() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">The Applied Knowledge Test (AKT)</h1>
            <p className="page-summary">
              A detailed guide to the written, computer-based component of the UKMLA, comparing the MS AKT for UK graduates and PLAB 1 for international graduates.
            </p>
          </header>

          <section>
            <h2>What is the UKMLA AKT?</h2>
            <p>
              The <strong>Applied Knowledge Test (AKT)</strong> is the theoretical, written part of the UK Medical Licensing Assessment. It is designed to test your ability to apply clinical science, guidelines, and diagnostic knowledge to real-world medical scenarios. The exam is computer-based, using a <strong>Single Best Answer (SBA)</strong> format.
            </p>
          </section>

          <section>
            <h2>MS AKT vs. PLAB 1: Key Differences</h2>
            <p>
              While both tests are based on the same underlying <strong>GMC MLA Content Map</strong>, they are constructed, delivered, and structured differently depending on your candidate group:
            </p>
            
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>UK Students: MS AKT</th>
                    <th>International Doctors: PLAB 1</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Total Questions</strong></td>
                    <td>200 SBA questions</td>
                    <td>180 SBA questions</td>
                  </tr>
                  <tr>
                    <td><strong>Structure</strong></td>
                    <td>Two papers of 100 questions each, usually delivered on consecutive days.</td>
                    <td>A single, continuous paper.</td>
                  </tr>
                  <tr>
                    <td><strong>Duration</strong></td>
                    <td>Typically 2 hours per paper (4 hours total).</td>
                    <td>3 hours total.</td>
                  </tr>
                  <tr>
                    <td><strong>Delivery Agency</strong></td>
                    <td>Constructed centrally by the Medical Schools Council (MSC) and delivered locally by universities.</td>
                    <td>Set, administered, and delivered directly by the General Medical Council (GMC).</td>
                  </tr>
                  <tr>
                    <td><strong>Test Locations</strong></td>
                    <td>At your own university computer labs.</td>
                    <td>At designated GMC test centers in the UK and internationally.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Anatomy of an SBA Question</h2>
            <p>
              UKMLA AKT questions are not simple recall questions (e.g., "What is the normal level of potassium?"). Instead, they test clinical application. Each question consists of three elements:
            </p>
            <ol>
              <li>
                <strong>The Clinical Vignette:</strong> A description of a patient, including age, gender, presenting symptoms, duration, medical history, clinical findings (vitals, exams), and initial lab/imaging results.
              </li>
              <li>
                <strong>The Lead-In Question:</strong> A specific question indicating what action to take (e.g., "What is the most appropriate next step in management?", "What is the most likely diagnosis?", or "Which investigation is most likely to confirm the diagnosis?").
              </li>
              <li>
                <strong>Five Options:</strong> Five plausible options (labeled A to E). Only one option represents the "single best" clinically accepted practice in line with UK guidelines (NICE, SIGN, etc.).
              </li>
            </ol>
            
            <div className="callout info">
              <div className="callout-title">SBA Sample Question Outline</div>
              <p style={{ fontStyle: 'italic', marginBottom: '8px' }}>
                "A 62-year-old man presents to the Emergency Department with sudden-onset, severe crushing central chest pain radiating to his left jaw, accompanied by sweating and nausea. He has a history of type 2 diabetes and hypertension. On examination, blood pressure is 140/90 mmHg, heart rate is 98 bpm, and oxygen saturation is 96% on room air. An ECG shows ST-segment elevation in leads II, III, and aVF."
              </p>
              <p style={{ fontWeight: '600', marginBottom: '6px' }}>What is the most appropriate immediate management option?</p>
              <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' }}>
                <li>A. Administer high-flow oxygen</li>
                <li>B. Transfer immediately for primary percutaneous coronary intervention (PCI)</li>
                <li>C. Arrange urgent outpatient echocardiogram</li>
                <li>D. Start long-term anticoagulation with warfarin</li>
                <li>E. Administer intramuscular morphine</li>
              </ul>
              <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <em>Answer: B. Given the presentation of acute inferior ST-elevation myocardial infarction (STEMI), immediate primary PCI is the standard of care under NICE guidelines.</em>
              </p>
            </div>
          </section>

          <section>
            <h2>Content Distribution & Blueprint</h2>
            <p>
              The AKT questions are mapped carefully to the GMC Content Map clinical areas:
            </p>
            <ul>
              <li><strong>Acute and Emergency Care:</strong> Managing sepsis, cardiac arrest, respiratory failure.</li>
              <li><strong>General Medicine:</strong> Cardiology, Respiratory, Gastroenterology, Endocrinology, Renal, Neurology.</li>
              <li><strong>Mental Health:</strong> Diagnosis and initial treatment of depression, psychosis, delirium.</li>
              <li><strong>Surgery:</strong> Acute abdomen, pre-operative checks, post-operative complications.</li>
              <li><strong>Child Health, Women\'s Health & Care of the Elderly:</strong> Age-specific presentations and safe prescribing.</li>
            </ul>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Preparation & Practice</h3>
            <ul className="related-links-list">
              <li><Link to="/preparation">Study plans, resources, and question banks for the AKT</Link></li>
              <li><Link to="/exam-pattern/cpsa">Learn about the practical CPSA (Part 2) format</Link></li>
              <li><Link to="/results-and-scoring">Standard setting: How is the AKT pass mark calculated?</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC) & Medical Schools Council (MSC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/exam-pattern" className="sidebar-link">Pattern Overview</Link></li>
            <li><Link to="/exam-pattern/akt" className="sidebar-link active">Applied Knowledge Test (AKT)</Link></li>
            <li><Link to="/exam-pattern/cpsa" className="sidebar-link">Clinical Skills (CPSA)</Link></li>
            <li><Link to="/syllabus" className="sidebar-link">Syllabus Details</Link></li>
            <li><Link to="/results-and-scoring" className="sidebar-link">Scoring & Marks</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
