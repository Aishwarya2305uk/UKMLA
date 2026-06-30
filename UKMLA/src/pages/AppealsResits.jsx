import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function AppealsResits() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">Appeals, Resits & Reasonable Adjustments</h1>
            <p className="page-summary">
              Official guidelines on attempt limits, resitting procedures, claiming mitigating circumstances, requesting reasonable adjustments, and candidate appeal pathways.
            </p>
          </header>

          <section>
            <h2>Attempt Limits and Retake Rules</h2>
            <p>
              Candidates who fail a component of the licensing assessment must adhere to rules governing retakes, which differ based on their pathway:
            </p>
            <h3>For International Medical Graduates (PLAB Route)</h3>
            <ul>
              <li><strong>PLAB 1:</strong> Candidates are permitted a maximum of <strong>four attempts</strong>.</li>
              <li><strong>PLAB 2:</strong> Candidates are permitted a maximum of <strong>four attempts</strong>.</li>
              <li>
                <strong>Applying for a Fifth Attempt:</strong> If you fail either exam four times, you must submit a formal application for a fifth attempt. The GMC will only grant this if you present physical proof of continuous clinical practice or supervised clinical education (minimum 12 months) conducted within the last two years.
              </li>
            </ul>
            
            <h3>For UK Medical Graduates (Medical School Route)</h3>
            <ul>
              <li>The maximum number of attempts allowed for the MS AKT and CPSA components is governed directly by your university's internal academic regulations, not a single GMC limit.</li>
              <li>Most medical schools permit a maximum of two or three sittings (first sitting followed by one or two resits) within the graduation year. Failing to pass within the university's limits results in exit from the medical program.</li>
            </ul>
          </section>

          <section>
            <h2>Mitigating Circumstances</h2>
            <p>
              If your performance during an exam is severely affected by sudden illness, bereavement, or acute personal crises, you can claim mitigating circumstances:
            </p>
            <div className="callout warning">
              <div className="callout-title">The "Fit to Sit" Policy</div>
              <p>
                The GMC and UK medical schools operate on a strict **"Fit to Sit"** principle. If you enter the exam hall, sign the register, and begin the assessment, you are declaring yourself clinically fit to sit the exam. You cannot later ask for your score to be adjusted or for a fail to be wiped from your record because of a pre-existing medical issue.
              </p>
            </div>
            <ul>
              <li>
                <strong>IMGs (PLAB):</strong> If sudden circumstances arise before the exam, you must withdraw from the sitting via the GMC Online portal. If you fall severely ill during the exam, you must report it immediately to the invigilator before leaving.
              </li>
              <li>
                <strong>UK Students:</strong> You must follow your university's specific Mitigating Circumstances or Extenuating Circumstances Policy, submitting medical notes or documentation to the academic registrar within the required deadline (often 24–48 hours post-exam).
              </li>
            </ul>
          </section>

          <section>
            <h2>Reasonable Adjustments</h2>
            <p>
              Candidates with recognized disabilities, chronic health conditions, or neurodivergence (e.g., dyslexia, ADHD) are entitled to request reasonable adjustments:
            </p>
            <ul>
              <li><strong>Types of Adjustments:</strong> Extra writing time (typically 25%), rest breaks, separate quiet rooms, ergonomic chairs, specialized screen readers, or permission to carry medications/glucose monitors.</li>
              <li>
                <strong>UK Students:</strong> Requests must be managed through your university's disability support service well in advance of the MS AKT/CPSA dates.
              </li>
              <li>
                <strong>IMGs (PLAB):</strong> You must submit a formal request via the GMC Online portal at least <strong>8 weeks before</strong> your booked exam date. You must provide official, translation-verified medical or educational psychologist documentation confirming your diagnosis and recommendation.
              </li>
            </ul>
          </section>

          <section>
            <h2>The Appeals Process</h2>
            <p>
              If a candidate believes that the exam was conducted unfairly or that procedural errors occurred, they can submit an appeal:
            </p>
            <ul>
              <li><strong>Appealing a PLAB Result:</strong> You cannot appeal simply because you are unhappy with your score or close to the pass mark. An appeal can only be lodged if you have evidence of a procedural irregularity (e.g., an examiner failing to follow grading criteria or a station equipment failure). You must submit the appeal in writing within 10 days of result publication.</li>
              <li><strong>Appealing a Medical School Result:</strong> UK students must utilize their university\'s internal academic appeals procedure. The GMC will not intervene in disputes between a student and their medical school.</li>
            </ul>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Related Pages</h3>
            <ul className="related-links-list">
              <li><Link to="/results-and-scoring">Learn how pass marks are calculated</Link></li>
              <li><Link to="/registration-guide">Step-by-step GMC registration guidelines</Link></li>
              <li><Link to="/official-resources">GMC and MSC regulatory contact forms</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/appeals-and-resits" className="sidebar-link active">Appeals & Resits</Link></li>
            <li><Link to="/eligibility" className="sidebar-link">Eligibility Guide</Link></li>
            <li><Link to="/results-and-scoring" className="sidebar-link">Results & Scoring</Link></li>
            <li><Link to="/key-dates" className="sidebar-link">Key Dates</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
