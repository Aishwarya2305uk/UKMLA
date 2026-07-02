import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function RegistrationGuide() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">IMG GMC Registration Guide</h1>
            <p className="page-summary">
              A comprehensive, step-by-step roadmap for International Medical Graduates (IMGs) seeking GMC registration in the UK via the UKMLA-aligned PLAB pathway.
            </p>
          </header>

          <section>
            <h2>The Standard Registration Pipeline</h2>
            <p>
              To work as a doctor in the UK, you must obtain a licence to practice from the General Medical Council (GMC). For most international medical graduates (IMGs) whose qualifications are not automatically recognized, the process involves a specific sequence of actions:
            </p>
          </section>

          <section>
            <h2>Step 1: Check your PMQ eligibility</h2>
            <p>
              Ensure your Primary Medical Qualification (PMQ) is from a university listed in the World Directory of Medical Schools (WDOMS) and meets the GMC\'s criteria. Some courses (such as fully online degrees or those lacking adequate clinical rotations) are not accepted.
            </p>
          </section>

          <section>
            <h2>Step 2: English Language Proficiency</h2>
            <p>
              Before you can book the PLAB 1 exam, you must prove your English communication capacity. The GMC accepts two standardized exams:
            </p>
            <ul>
              <li>
                <strong>IELTS (Academic Version):</strong> You must score at least <strong>7.5 overall</strong>, with a minimum of <strong>7.0 in each</strong> of the four sections (Listening, Reading, Writing, and Speaking).
              </li>
              <li>
                <strong>OET (Medicine Version):</strong> You must achieve at least <strong>Grade B</strong> in each of the four components (Listening, Reading, Writing, and Speaking).
              </li>
            </ul>
            <p>
              English exam results are only valid for <strong>two years</strong> from the date of the test. They must be active at the point you book your PLAB 1 sitting.
            </p>
          </section>

          <section>
            <h2>Step 3: EPIC Credentials Verification</h2>
            <p>
              Your medical degree must be verified for authenticity. You must create an account on the **Electronic Portfolio of International Credentials (EPIC)** portal, which is administered by the ECFMG in the United States.
            </p>
            <ol>
              <li>Upload scan copies of your medical diploma and transcripts.</li>
              <li>Complete a identity verification video call.</li>
              <li>EPIC will contact your medical school directly to verify your graduation.</li>
              <li>Once verified, EPIC sends a report directly to the GMC.</li>
            </ol>
          </section>

          <section>
            <h2>Step 4: Book and Pass PLAB 1 (MLA Written)</h2>
            <p>
              Create an account on the GMC Online portal. Once your EPIC verification and English test details are linked, you can book a slot for PLAB 1.
            </p>
            <ul>
              <li><strong>Cost:</strong> £283 (as of the 1 April 2026 GMC fee review; the GMC updates fees each April).</li>
              <li><strong>Centers:</strong> Delivered globally in countries like India, Pakistan, Nigeria, Egypt, and Saudi Arabia, as well as multiple UK locations.</li>
            </ul>
          </section>

          <section>
            <h2>Step 5: Book and Pass PLAB 2 (MLA Clinical)</h2>
            <p>
              After passing PLAB 1, you have a <strong>two-year window</strong> to book and clear PLAB 2.
            </p>
            <ul>
              <li><strong>Location:</strong> PLAB 2 can only be sat at the GMC Clinical Assessment Centre in Manchester, UK. You will likely need to apply for a Standard Visitor Visa to travel to the UK.</li>
              <li><strong>Preparation:</strong> Many candidates attend clinical practice academies or form study groups in the UK to get familiar with OSCE equipment and clinical role-play.</li>
            </ul>
          </section>

          <section>
            <h2>Step 6: Submit the GMC Application</h2>
            <p>
              Once PLAB 2 results are published, you have a <strong>two-year window</strong> to submit your application for registration with a licence to practice. The application requires:
            </p>
            <ul>
              <li>A Certificate of Good Standing (CGS) from the medical council in every country where you have practiced in the last five years.</li>
              <li>Detailed employment history logs for the last five years.</li>
              <li>Character references and health declarations.</li>
            </ul>
            <div className="callout success">
              <div className="callout-title">Final Step: Identity Check</div>
              <p>
                After the GMC approves your online application, you must attend an in-person Identity Check at a GMC office (in London or Manchester) to present your physical passport and medical diploma before your name is added to the medical register.
              </p>
            </div>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Registration Resources</h3>
            <ul className="related-links-list">
              <li><Link to="/eligibility">Detailed check on PMQ requirements</Link></li>
              <li><Link to="/ukmla-vs-plab">Understand why PLAB maps to the UKMLA</Link></li>
              <li><Link to="/official-resources">GMC portal registration pages</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 2 July 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/registration-guide" className="sidebar-link active">Registration Guide</Link></li>
            <li><Link to="/eligibility" className="sidebar-link">Eligibility Guide</Link></li>
            <li><Link to="/ukmla-vs-plab" className="sidebar-link">UKMLA vs PLAB</Link></li>
            <li><Link to="/results-and-scoring" className="sidebar-link">Results & Scoring</Link></li>
            <li><Link to="/key-dates" className="sidebar-link">Key Dates</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
