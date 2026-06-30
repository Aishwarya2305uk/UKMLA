import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function UKMLAvsPLAB() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">UKMLA vs PLAB</h1>
            <p className="page-summary">
              Clarifying the relationship, transition timeline, and operational differences between the UKMLA framework and the PLAB examinations for international doctors.
            </p>
          </header>

          <section>
            <h2>The Biggest Confusion Explained</h2>
            <p>
              The most common question international medical graduates ask is: <strong>"Do IMGs take the UKMLA or the PLAB?"</strong>
            </p>
            <p>
              The answer is: <strong>IMGs take the PLAB exam, which is now fully aligned with the UKMLA Content Map.</strong>
            </p>
            <p>
              The UKMLA is a <strong>framework of standards</strong>, not a standalone exam. UK graduates sit the MLA via their medical school's exams (MS AKT and CPSA), while international graduates sit the MLA by taking the GMC-administered PLAB 1 and PLAB 2. In 2024, the GMC updated the PLAB blueprint to match the MLA Content Map, ensuring both groups of doctors are assessed against the exact same yardstick.
            </p>
          </section>

          <section>
            <h2>Comparative Overview</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>UK Medical Graduates (MLA Route)</th>
                    <th>International Medical Graduates (PLAB Route)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Exam Name</strong></td>
                    <td>Medical School AKT & School CPSA</td>
                    <td>PLAB Part 1 & PLAB Part 2</td>
                  </tr>
                  <tr>
                    <td><strong>Assessed Content</strong></td>
                    <td colSpan="2" style={{ textAlign: 'center', backgroundColor: 'var(--brand-secondary-light)', color: 'var(--text-primary)', fontWeight: '600' }}>
                      GMC MLA Content Map (Identical Standard)
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Written Format</strong></td>
                    <td>MS AKT: 200 SBAs, delivered over 2 days.</td>
                    <td>PLAB 1: 180 SBAs, 3-hour single paper.</td>
                  </tr>
                  <tr>
                    <td><strong>Practical Format</strong></td>
                    <td>Local OSCE/OSLER checklist.</td>
                    <td>PLAB 2: 16 stations at the GMC Manchester centre.</td>
                  </tr>
                  <tr>
                    <td><strong>Administering Body</strong></td>
                    <td>Individual medical schools & MSC.</td>
                    <td>General Medical Council (GMC).</td>
                  </tr>
                  <tr>
                    <td><strong>Booking System</strong></td>
                    <td>Automatic registration by your university.</td>
                    <td>Manual booking via the GMC Online portal.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>The Transition Timeline</h2>
            <p>
              The integration of the PLAB into the UKMLA framework happened in phases:
            </p>
            <ul>
              <li>
                <strong>May 2024:</strong> PLAB Part 2 exams sat after May 17, 2024, began testing skills mapped to the MLA blueprint.
              </li>
              <li>
                <strong>August 2024:</strong> PLAB Part 1 exams sat from August 8, 2024, transitioned to questions mapped to the MLA Content Map.
              </li>
              <li>
                <strong>Academic Year 2024–25:</strong> The UKMLA became mandatory for graduating UK medical students.
              </li>
              <li>
                <strong>September 2026:</strong> A further revised edition of the GMC Content Map goes live, updating the clinical scenarios tested in both the PLAB and MS AKT sittings.
              </li>
            </ul>
            <div className="callout info">
              <div className="callout-title">Name Change Signals</div>
              <p>
                The GMC has indicated that they intend to eventually rename the "PLAB" test to "the MLA" or "the UKMLA for international graduates" once legislative updates are finalised. For now, the booking pages and exam cards keep the name **PLAB**, but the underlying test is the UKMLA.
              </p>
            </div>
          </section>

          <section>
            <h2>Which Exam Applies to Whom?</h2>
            <p>
              You do not have a choice between these exams. Your path is defined by where you graduated:
            </p>
            <ul>
              <li>
                <strong>If you graduate from a UK Medical School:</strong> You must sit your university's MS AKT and CPSA. You cannot take the PLAB.
              </li>
              <li>
                <strong>If you graduated outside the UK/EU (IMG):</strong> You must take the GMC's PLAB 1 and PLAB 2.
              </li>
              <li>
                <strong>If you hold a Relevant European Qualification (REQ):</strong> You do not sit either exam under existing post-Brexit transitional rules and can apply directly for GMC registration.
              </li>
            </ul>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Transition Pathways</h3>
            <ul className="related-links-list">
              <li><Link to="/registration-guide">IMG GMC Registration Checklist</Link></li>
              <li><Link to="/eligibility">Eligibility details for EU/EEA and IMG doctors</Link></li>
              <li><Link to="/key-dates">View the detailed implementation timeline</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/what-is-ukmla" className="sidebar-link">What is UKMLA?</Link></li>
            <li><Link to="/ukmla-vs-plab" className="sidebar-link active">UKMLA vs PLAB</Link></li>
            <li><Link to="/eligibility" className="sidebar-link">Eligibility Guide</Link></li>
            <li><Link to="/registration-guide" className="sidebar-link">Registration Guide</Link></li>
            <li><Link to="/key-dates" className="sidebar-link">Key Dates</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
