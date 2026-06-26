import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function Home() {
  return (
    <Layout>
      <div className="hero-section">
        <h1 className="hero-title">Master the UK Medical Licensing Assessment</h1>
        <p className="hero-subtitle">
          Comprehensive, up-to-date, and independent information about the UKMLA (MLA). Learn about the exam pattern, eligibility pathways, syllabus content map, and how to register.
        </p>
        <div className="hero-buttons">
          <Link to="/what-is-ukmla" className="btn btn-primary">
            What is the UKMLA?
          </Link>
          <Link to="/ukmla-vs-plab" className="btn btn-secondary">
            UKMLA vs PLAB Guide
          </Link>
        </div>
      </div>

      <div className="callout info">
        <div className="callout-title">GMC Transition Alert</div>
        <p>
          The Medical Licensing Assessment (MLA) is now fully active. Since the 2024–25 academic year, passing the UKMLA is a mandatory step for UK medical students to obtain registration. International Medical Graduates (IMGs) also sit an MLA-aligned PLAB exam.
        </p>
      </div>

      <section style={{ margin: '48px 0' }}>
        <h2 className="section-title">Core Sections & Resources</h2>
        <div className="grid-cards">
          
          <div className="card">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <h3 className="card-title">Eligibility Pathways</h3>
            <p className="card-desc">
              Understand who needs to sit the UKMLA, requirements for UK students, and the rules governing International Medical Graduates (IMGs) and EU candidates.
            </p>
            <Link to="/eligibility" className="card-link">
              Read Eligibility Rules →
            </Link>
          </div>

          <div className="card">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
            </svg>
            <h3 className="card-title">Exam Pattern</h3>
            <p className="card-desc">
              Get familiar with the double-pronged structure of the exam: the Applied Knowledge Test (AKT) and the Clinical and Professional Skills Assessment (CPSA).
            </p>
            <Link to="/exam-pattern" className="card-link">
              Explore the Structure →
            </Link>
          </div>

          <div className="card">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <h3 className="card-title">Syllabus & Content Map</h3>
            <p className="card-desc">
              Explore the topics, professional behaviours, conditions, and core procedures outlined in the official General Medical Council content blueprint.
            </p>
            <Link to="/syllabus" className="card-link">
              View Syllabus Map →
            </Link>
          </div>

          <div className="card">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h3 className="card-title">Preparation Guide</h3>
            <p className="card-desc">
              Actionable advice, key study resources, prep techniques, sample mock tests, and the common preparation mistakes you should avoid.
            </p>
            <Link to="/preparation" className="card-link">
              Get Preparation Advice →
            </Link>
          </div>

          <div className="card">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h3 className="card-title">FAQs Hub</h3>
            <p className="card-desc">
              Quick answers to 75+ candidate questions about passing scores, attempt limits, English criteria, test centers, and transition phases.
            </p>
            <Link to="/faqs" className="card-link">
              Read 75+ FAQs →
            </Link>
          </div>

          <div className="card">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <h3 className="card-title">IMG Registration</h3>
            <p className="card-desc">
              A comprehensive checklist of EPIC credentials, OET/IELTS requirements, and the path to GMC certification for international doctors.
            </p>
            <Link to="/registration-guide" className="card-link">
              Read Registration Guide →
            </Link>
          </div>

        </div>
      </section>

      <section style={{ margin: '48px 0', borderTop: '1px solid var(--border-color)', paddingTop: '40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Objective of the UKMLA</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            The Medical Licensing Assessment (MLA) is designed to create a common standard for doctors practice entry in the United Kingdom. Prior to the UKMLA, graduates from different medical schools faced highly variable assessment formats, and international medical graduates sat PLAB, leading to debates over standard consistency.
          </p>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>
            The UKMLA provides a unified quality guarantee, ensuring that any doctor entering clinical environments in the UK has demonstrated safe, up-to-date core medical skills, professional behaviors, and clinical capability.
          </p>
        </div>
      </section>
    </Layout>
  );
}
