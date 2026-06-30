import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function Fees() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">UKMLA Fees and Costs 2026</h1>
            <p className="page-summary">
              A complete breakdown of UKMLA fees, including the UKMLA exam fees for international students (IMGs) and UK medical students.
            </p>
          </header>

          <section>
            <h2>Overview of the UKMLA Cost</h2>
            <p>
              Understanding the <strong>UKMLA cost</strong> is an important part of your preparation, especially when budgeting for registration, travel, and preparation materials. The cost of the UKMLA differs significantly depending on whether you are a UK medical student or an International Medical Graduate (IMG).
            </p>
          </section>

          <section>
            <h2>UKMLA Exam Fees for International Students (IMGs)</h2>
            <p>
              For IMGs, the UKMLA is delivered via the updated PLAB framework. Therefore, the <strong>UKMLA exam fees for international students</strong> are effectively the PLAB 1 and PLAB 2 booking fees. The GMC updates these fees annually every April. 
            </p>
            <p>
              Below is the estimated <strong>cost of UKMLA exam for IMG 2026</strong> based on the current GMC fee structure:
            </p>
            <div className="table-responsive">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Exam Component</th>
                    <th>Fee (GBP)</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>UKMLA AKT (PLAB 1)</strong></td>
                    <td>£268</td>
                    <td>Computer-based test. Can be taken at various test centres globally.</td>
                  </tr>
                  <tr>
                    <td><strong>UKMLA CPSA (PLAB 2)</strong></td>
                    <td>£984</td>
                    <td>In-person OSCE. Must be taken at the GMC clinical assessment centre in Manchester, UK.</td>
                  </tr>
                  <tr>
                    <td><strong>GMC Registration Fee</strong></td>
                    <td>£175 - £466</td>
                    <td>Tiered depending on your experience and age. Paid upon successful completion of the exams.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="callout info">
              <div className="callout-title">Additional Costs for IMGs</div>
              <p>
                When calculating the total UKMLA cost, IMGs must also factor in flights to the UK for the CPSA (PLAB 2), accommodation in Manchester, visa fees, and any preparatory academy courses.
              </p>
            </div>
          </section>

          <section>
            <h2>UKMLA Exam Fees for UK Medical Students</h2>
            <p>
              If you are studying at a UK medical school, the UKMLA is integrated into your final university finals. 
            </p>
            <ul>
              <li><strong>Exam Fee:</strong> £0. There is no separate fee to sit the UKMLA for UK students. The cost is covered by your standard university tuition fees.</li>
              <li><strong>Test Centres:</strong> You will sit both the AKT and CPSA at your own medical school or its affiliated clinical sites.</li>
            </ul>
          </section>

          <section>
            <h2>Fee Reductions and Financial Support</h2>
            <p>
              The GMC occasionally offers fee reductions or income-based discounts for the annual retention fee, but this typically does <em>not</em> apply to the initial booking fees for the PLAB/UKMLA exams. Refugee doctors and those granted asylum in the UK may be eligible for financial assistance or exemptions through organizations like the BMA or specific refugee doctor charities.
            </p>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Related Pages</h3>
            <ul className="related-links-list">
              <li><Link to="/registration-guide">How to Apply for UKMLA Exam</Link></li>
              <li><Link to="/key-dates">UKMLA Exam Dates 2026</Link></li>
              <li><Link to="/ukmla-vs-plab">PLAB vs UKMLA Key Differences</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 30 June 2026. Source: General Medical Council (GMC) fee schedule.</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/what-is-ukmla" className="sidebar-link">What is UKMLA?</Link></li>
            <li><Link to="/eligibility" className="sidebar-link">Eligibility Guide</Link></li>
            <li><Link to="/exam-pattern" className="sidebar-link">Exam Pattern</Link></li>
            <li><Link to="/syllabus" className="sidebar-link">Syllabus Details</Link></li>
            <li><Link to="/ukmla-vs-plab" className="sidebar-link">UKMLA vs PLAB</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
