import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function OfficialResources() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">Official GMC & MSC Resources</h1>
            <p className="page-summary">
              A curated directory of direct links to official General Medical Council (GMC) and Medical Schools Council (MSC) files, blueprints, and regulatory guides.
            </p>
          </header>

          <section>
            <h2>Official Regulator Portals</h2>
            <p>
              Candidates are strongly encouraged to refer to official materials rather than commercial blogs. Below are the key links to primary sources of information:
            </p>
            <ul>
              <li style={{ marginBottom: '12px' }}>
                <strong>GMC Medical Licensing Assessment (MLA) Hub:</strong> The master resource portal detailing the framework structure and safety regulations.<br />
                <a href="https://www.gmc-uk.org/education/medical-licensing-assessment" target="_blank" rel="noopener noreferrer">
                  Visit the GMC MLA Hub →
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>GMC MLA Content Map Document:</strong> The official, downloadable PDF blueprint containing the patient presentations and clinical conditions index.<br />
                <a href="https://www.gmc-uk.org/cdn/documents/251015---mla-content-map--english-_pdf-112647970.pdf" target="_blank" rel="noopener noreferrer">
                  Download the MLA Content Map PDF →
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>MSC Medical Schools Council Guide:</strong> Specific updates and support documentation for UK medical students taking the MS AKT.<br />
                <a href="https://www.medschools.ac.uk/studying-medicine/medical-licensing-assessment-mla" target="_blank" rel="noopener noreferrer">
                  Visit the MSC MLA Student Portal →
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>GMC PLAB Fees Page:</strong> The single source of truth for updated registration and booking costs for PLAB 1 and PLAB 2.<br />
                <a href="https://www.gmc-uk.org/registration-and-licensing/managing-your-registration/fees-and-funding/fees-for-doctors" target="_blank" rel="noopener noreferrer">
                  Check Current GMC Exam Fees →
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2>Official Mock Exams & Sample Questions</h2>
            <p>
              Practice with resources created by the exam writers themselves to gauge the exact question format, vignettes, and lead-in phrasing:
            </p>
            <ul>
              <li style={{ marginBottom: '12px' }}>
                <strong>MSC AKT Practice Platform:</strong> Sample questions and mock modules reflecting the MS AKT environment.<br />
                <a href="https://www.medschools.ac.uk/studying-medicine/medical-licensing-assessment-mla/applied-knowledge-test-akt" target="_blank" rel="noopener noreferrer">
                  Access MSC Practice Questions →
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>GMC PLAB 1 Practice Test:</strong> A mock paper of SBA questions created directly by the GMC to test candidate knowledge.<br />
                <a href="https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab/plab-1-guide" target="_blank" rel="noopener noreferrer">
                  Practice GMC PLAB 1 Mock →
                </a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong>GMC PLAB 2 OSCE Blueprint:</strong> Explanatory resources outlining how Manchester clinical stations are run and graded.<br />
                <a href="https://www.gmc-uk.org/registration-and-licensing/join-our-registers/plab/plab-2-guide" target="_blank" rel="noopener noreferrer">
                  Read the PLAB 2 Blueprint →
                </a>
              </li>
            </ul>
          </section>

          <div className="callout info">
            <div className="callout-title">Source Credibility Notice</div>
            <p>
              Please note that external preparation services (commercial question banks, academy websites, revision courses) are not managed or verified by the GMC or MSC. While useful, third-party content should always be cross-referenced against the official materials linked above.
            </p>
          </div>

          <div className="related-links">
            <h3 className="related-links-title">Related Guides</h3>
            <ul className="related-links-list">
              <li><Link to="/preparation">Revise using the study plan guide</Link></li>
              <li><Link to="/syllabus">Detailed condition list based on the content map</Link></li>
              <li><Link to="/results-and-scoring">Learn how standard setting works</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 2 July 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/official-resources" className="sidebar-link active">Official Resources</Link></li>
            <li><Link to="/syllabus" className="sidebar-link">Syllabus Details</Link></li>
            <li><Link to="/preparation" className="sidebar-link">Preparation Guide</Link></li>
            <li><Link to="/glossary" className="sidebar-link">Glossary of Terms</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
