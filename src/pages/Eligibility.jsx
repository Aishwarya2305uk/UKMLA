import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function Eligibility() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">UKMLA Eligibility Pathways</h1>
            <p className="page-summary">
              A comprehensive guide to UKMLA eligibility requirements for UK students, international medical graduates (IMGs), European qualifications, and alternative entry pathways.
            </p>
          </header>

          <section>
            <h2>Eligibility for UK Medical Students</h2>
            <p>
              Students currently enrolled in a GMC-recognized UK medical school sit the UKMLA as part of their standard degree program.
            </p>
            <ul>
              <li><strong>Timing:</strong> The test is usually sat in the final or penultimate year of medical school.</li>
              <li><strong>Requirement:</strong> From the 2024–25 academic year onwards, passing both components (AKT and CPSA) is a mandatory requirement to obtain a medical degree and qualify for provisional registration with the GMC.</li>
              <li><strong>Fees:</strong> UK medical students do not pay direct fees to the GMC for the UKMLA; the administration cost is integrated into medical school tuition fees.</li>
            </ul>
          </section>

          <section>
            <h2>Eligibility for International Medical Graduates (IMGs)</h2>
            <p>
              Doctors who graduated from medical schools outside the UK, EU, and Switzerland must satisfy the GMC’s criteria to sit the licensing exam (PLAB 1 & PLAB 2, which are the IMG equivalent of the UKMLA):
            </p>
            <ul>
              <li>
                <strong>Primary Medical Qualification (PMQ):</strong> Candidates must hold an acceptable medical degree from an institution listed in the World Directory of Medical Schools. The qualification must meet GMC standards regarding clinical rotation hours and course duration.
              </li>
              <li>
                <strong>English Language Proficiency:</strong> Candidates must demonstrate high-level English skills before they can book PLAB 1. This requires scoring:
                <ul>
                  <li><strong>IELTS Academic:</strong> Minimum 7.5 overall, with at least 7.0 in reading, writing, listening, and speaking.</li>
                  <li><strong>OET (Medicine):</strong> Minimum Grade B in reading, writing, listening, and speaking.</li>
                </ul>
              </li>
              <li>
                <strong>EPIC Verification:</strong> The PMQ must be verified by the Educational Commission for Foreign Medical Graduates (ECFMG) via the EPIC system before booking exams.
              </li>
            </ul>
          </section>

          <section>
            <h2>Rules for EU and EEA Candidates</h2>
            <p>
              The UK’s exit from the European Union modified the registration pathway for European medical graduates:
            </p>
            <ul>
              <li>
                <strong>Relevant European Qualification (REQ):</strong> Candidates who hold a "Relevant European Qualification" (which is automatically recognized under transition rules) are generally not required to take the PLAB/UKMLA to register.
              </li>
              <li>
                <strong>Unrecognized EU Qualifications:</strong> EU graduates whose qualifications do not fall under current automatic recognition guidelines must follow the standard IMG route, taking IELTS/OET followed by the PLAB/UKMLA.
              </li>
            </ul>
          </section>

          <section>
            <h2>Eligibility Checklist Matrix</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Candidate Group</th>
                    <th>Required Exam</th>
                    <th>Prerequisites</th>
                    <th>GMC Admin Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>UK Medical Students</strong></td>
                    <td>MS AKT & School CPSA</td>
                    <td>Enrollment in final/penultimate year of recognized course</td>
                    <td>None (Included in tuition)</td>
                  </tr>
                  <tr>
                    <td><strong>International Graduates (IMGs)</strong></td>
                    <td>PLAB 1 & PLAB 2 (MLA-aligned)</td>
                    <td>Verified PMQ + IELTS 7.5 / OET Grade B</td>
                    <td>Yes (Refer to GMC fees)</td>
                  </tr>
                  <tr>
                    <td><strong>EU Graduates with REQ</strong></td>
                    <td>None (Direct registration)</td>
                    <td>Directly recognized European medical degree</td>
                    <td>None (Direct registration fee only)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="callout warning">
              <span className="callout-title">Check GMC Registration Guidelines</span>
              Note that GMC fees are updated every year in April. Always check the live GMC fees portal for the current sitting costs of PLAB 1 and PLAB 2.
            </p>
          </section>

          <section>
            <h2>Attempt Limits and Validity</h2>
            <p>
              Candidates sitting the IMG route (PLAB) must adhere to strict timing and attempt parameters:
            </p>
            <ul>
              <li>
                <strong>PLAB 1 Attempt Limits:</strong> Candidates are allowed a maximum of <strong>four attempts</strong>. After a fourth failed attempt you may apply for <strong>one further (fifth and final) attempt</strong>; if you fail that fifth attempt, you are no longer eligible to sit the exam. The same rule applies to PLAB 2.
              </li>
              <li>
                <strong>PLAB 2 Timing Window:</strong> After passing PLAB 1 (equivalent to the AKT), candidates must pass PLAB 2 (CPSA equivalent) within <strong>two years</strong>. Failing to do so invalidates the PLAB 1 result, requiring a resit of PLAB 1.
              </li>
              <li>
                <strong>GMC Registration Window:</strong> Once PLAB 2 is passed, candidates must have their application for GMC registration <strong>approved within two years</strong> of the pass date. If this window is missed, the exam results expire.
              </li>
            </ul>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Next Steps</h3>
            <ul className="related-links-list">
              <li><Link to="/exam-pattern">Explore the AKT & CPSA exam format</Link></li>
              <li><Link to="/registration-guide">Step-by-step IMG guide to GMC registration</Link></li>
              <li><Link to="/appeals-and-resits">Detailed guidelines on resits & mitigating circumstances</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 2 July 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/what-is-ukmla" className="sidebar-link">What is UKMLA?</Link></li>
            <li><Link to="/eligibility" className="sidebar-link active">Eligibility Guide</Link></li>
            <li><Link to="/exam-pattern" className="sidebar-link">Exam Pattern</Link></li>
            <li><Link to="/ukmla-vs-plab" className="sidebar-link">UKMLA vs PLAB</Link></li>
            <li><Link to="/registration-guide" className="sidebar-link">Registration Guide</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
