import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function News() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">News & Updates</h1>
            <p className="page-summary">
              Stay informed on regulatory amendments, curriculum reviews, fee scale updates, and calendar bookings for the UKMLA.
            </p>
          </header>

          <section>
            <div className="card" style={{ marginBottom: '32px', padding: '24px', hover: 'none' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--brand-secondary)', textTransform: 'uppercase' }}>
                June 2026 Update
              </span>
              <h3 style={{ fontSize: '22px', margin: '6px 0 12px', color: 'var(--text-primary)' }}>
                Revised GMC MLA Content Map to Take Effect in September 2026
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                The General Medical Council (GMC) has published a revised version of the MLA Content Map, which will be used as the blueprint for all AKT (PLAB 1) and CPSA (PLAB 2) sittings from September 2026 onwards. Key changes include adjustments to patient presentations and standard-setting updates. Candidates sitting tests in autumn 2026 or later are urged to update their study plans accordingly.
              </p>
              <Link to="/syllabus" style={{ fontWeight: '600' }}>
                Review updated syllabus criteria →
              </Link>
            </div>

            <div className="card" style={{ marginBottom: '32px', padding: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--brand-secondary)', textTransform: 'uppercase' }}>
                April 2026 Update
              </span>
              <h3 style={{ fontSize: '22px', margin: '6px 0 12px', color: 'var(--text-primary)' }}>
                April 2026 GMC Administration Fee Revisions
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Following the annual review of practitioner fees, the General Medical Council has adjusted the administration costs for international medical graduate licensing tests (PLAB 1 and PLAB 2). The revised fees apply to any bookings made after April 1, 2026. Because fee scales are subject to constant regulatory adjustments, candidates should verify current pricing directly via the GMC portal.
              </p>
              <a href="https://www.gmc-uk.org/registration-and-licensing/join-the-register/plab/fees-for-plab" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600' }}>
                Verify current fees on GMC portal →
              </a>
            </div>

            <div className="card" style={{ marginBottom: '32px', padding: '24px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--brand-secondary)', textTransform: 'uppercase' }}>
                August 2025 Review
              </span>
              <h3 style={{ fontSize: '22px', margin: '6px 0 12px', color: 'var(--text-primary)' }}>
                Analysis of Year 1 UKMLA Pass Rates Released
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
                Independent clinical training providers have published review sheets for the initial year of the UKMLA rollout (academic year 2024–25). Passing numbers closely matched initial expectations, with overall written component pass margins settling between 60% and 65% depending on the specific cohort sitting.
              </p>
            </div>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Additional Reference Channels</h3>
            <ul className="related-links-list">
              <li><Link to="/key-dates">View the full implementation timeline</Link></li>
              <li><Link to="/official-resources">GMC & MSC official documents</Link></li>
              <li><Link to="/faqs">Read candidate FAQs</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/news" className="sidebar-link active">News & Updates</Link></li>
            <li><Link to="/key-dates" className="sidebar-link">Key Dates</Link></li>
            <li><Link to="/what-is-ukmla" className="sidebar-link">What is UKMLA?</Link></li>
            <li><Link to="/official-resources" className="sidebar-link">Official Resources</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
