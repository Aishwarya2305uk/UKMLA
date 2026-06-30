import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function KeyDates() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">UKMLA Exam Dates 2026 & Implementation Timeline</h1>
            <p className="page-summary">
              A comprehensive roadmap detailing the phases of the Medical Licensing Assessment (MLA) rollout, key historical milestones, and upcoming syllabus updates.
            </p>
          </header>

          <section>
            <h2>The UKMLA Timeline Roadmap</h2>
            <p>
              The transition from individual university standards and the historical PLAB blueprint to a unified UKMLA standard has been structured across several years. This timeline outlines the milestones for UK graduates, international graduates, and regulatory adjustments.
            </p>
          </section>

          <section>
            <h2>UKMLA Exam Dates 2026 & Milestone Timeline</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date / Period</th>
                    <th>Milestone Event</th>
                    <th>Impacted Candidate Group</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>May 17, 2024</strong></td>
                    <td><strong>CPSA / PLAB 2 Alignment:</strong> The practical PLAB 2 exam clinical stations transition to testing standard criteria listed in the GMC MLA Content Map.</td>
                    <td>International Medical Graduates (IMGs)</td>
                  </tr>
                  <tr>
                    <td><strong>August 8, 2024</strong></td>
                    <td><strong>AKT / PLAB 1 Alignment:</strong> The computer-based PLAB 1 exam transitions to questions mapped directly to the MLA Content Map blueprint.</td>
                    <td>International Medical Graduates (IMGs)</td>
                  </tr>
                  <tr>
                    <td><strong>Academic Year 2024–2025</strong></td>
                    <td><strong>UK Student Launch:</strong> Passing the UKMLA (MS AKT and CPSA) becomes a graduation prerequisite for students at all UK medical schools.</td>
                    <td>UK Medical Graduates</td>
                  </tr>
                  <tr>
                    <td><strong>April 2026</strong></td>
                    <td><strong>GMC Fee Adjustments:</strong> Periodic review of sitting costs for PLAB 1 and PLAB 2. Candidates must check the GMC Online portal for exact prices.</td>
                    <td>International Medical Graduates (IMGs)</td>
                  </tr>
                  <tr>
                    <td><strong>September 2026</strong></td>
                    <td><strong>GMC Content Map Update:</strong> A revised, updated edition of the GMC MLA Content Map goes live, adjusting the diagnostic conditions and presentations tested.</td>
                    <td>UK Graduates & IMGs (PLAB)</td>
                  </tr>
                  <tr>
                    <td><strong>Future Horizon</strong></td>
                    <td><strong>Formal Legislative Renaming:</strong> The GMC plans to officially retire the "PLAB" brand name, officially calling the IMG pathway the "UKMLA / MLA".</td>
                    <td>International Medical Graduates (IMGs)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>How Dates Impact Exam Validity</h2>
            <p>
              Candidates must monitor critical timeline windows to prevent their exam milestones from expiring:
            </p>
            <ul>
              <li>
                <strong>The Two-Year AKT-to-CPSA Window:</strong> You must sit and pass the CPSA (PLAB 2) within exactly <strong>2 years</strong> of passing the AKT (PLAB 1). If you exceed this window, your written result expires, and you must sit PLAB 1 again.
              </li>
              <li>
                <strong>The Two-Year Registration Window:</strong> Once you have passed the CPSA (PLAB 2), you have exactly <strong>2 years</strong> to submit your formal application for GMC registration with a licence to practice. Missing this date means you will have to retake the clinical assessment.
              </li>
            </ul>
            <div className="callout warning">
              <div className="callout-title">When to Book UKMLA Exam Slots</div>
              <p>
                PLAB 2 slots are in high demand and often book out 6 to 9 months in advance. Candidates should monitor the GMC Online booking portal immediately after receiving their PLAB 1 results to secure a test date that fits within their validity window.
              </p>
            </div>
          </section>

          <section>
            <h2>UKMLA Exam Test Centres in UK</h2>
            <p>
              While the AKT (PLAB 1) can be taken at various test centres globally, the CPSA (PLAB 2) must be taken at the official GMC clinical assessment centre in Manchester, UK. It is crucial to plan your travel and accommodation around your booked UKMLA exam dates 2026 to ensure you are well-rested for the clinical assessment.
            </p>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Timeline Resources</h3>
            <ul className="related-links-list">
              <li><Link to="/registration-guide">Step-by-step registration roadmap</Link></li>
              <li><Link to="/ukmla-vs-plab">Compare the UKMLA and PLAB differences</Link></li>
              <li><Link to="/news">Read the latest regulatory news & updates</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/key-dates" className="sidebar-link active">Key Dates</Link></li>
            <li><Link to="/ukmla-vs-plab" className="sidebar-link">UKMLA vs PLAB</Link></li>
            <li><Link to="/news" className="sidebar-link">News & Updates</Link></li>
            <li><Link to="/registration-guide" className="sidebar-link">Registration Guide</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
