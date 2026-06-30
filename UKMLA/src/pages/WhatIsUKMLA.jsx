import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function WhatIsUKMLA() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">What is the UKMLA?</h1>
            <p className="page-summary">
              A comprehensive overview of the UK Medical Licensing Assessment (MLA), its regulator, purposes, and how it standardizes safety criteria for UK practitioners.
            </p>
          </header>

          <section>
            <h2>Overview & Objective</h2>
            <p>
              The <strong>Medical Licensing Assessment (MLA)</strong>, commonly referred to as the <strong>UKMLA</strong>, is an assessment framework introduced by the General Medical Council (GMC). It ensures that all doctors who obtain a licence to practice medicine in the United Kingdom meet a consistent, high-standard baseline of safe clinical practice.
            </p>
            <p>
              Before the UKMLA, there was no centralized standard for graduates of UK medical schools; individual universities ran their own exams, leading to minor variations in core expectations. The UKMLA creates a common threshold that every entering doctor must clear, regardless of where they studied.
            </p>

            <figure className="content-figure">
              <div className="figure-media">
                <img src="/images/doctor-portrait.webp" alt="A confident doctor in a white coat with a stethoscope and clipboard" loading="lazy" />
              </div>
              <figcaption>
                <strong>One common standard.</strong> Whether you graduate from a UK medical school or qualify overseas, the UKMLA confirms every new doctor meets the same baseline of safe, person-centred practice.
              </figcaption>
            </figure>
          </section>

          <section>
            <h2>The Three Pillars of UKMLA</h2>
            <p>
              The UKMLA is structured around three foundational pillars set by the GMC to govern medical care:
            </p>
            <ul>
              <li>
                <strong>Readiness for Safe Practice:</strong> Ensuring candidates demonstrate the required level of knowledge, diagnostic capability, and procedural skill to function safely in Foundation Year 1 (FY1) roles.
              </li>
              <li>
                <strong>Managing Uncertainty:</strong> Assessing how a practitioner responds to incomplete data, evolving patient profiles, and medical ambiguity without compromising safety.
              </li>
              <li>
                <strong>Delivering Person-Centred Care:</strong> Promoting empathy, clear communication, shared decision-making, and adherence to GMC ethical codes.
              </li>
            </ul>
          </section>

          <section>
            <h2>Who Does the UKMLA Apply To?</h2>
            <p>
              The assessment applies to two distinct groups of candidates entering practice in the UK:
            </p>
            <ol>
              <li>
                <strong>UK Medical Students:</strong> Students graduating from UK medical schools. Passing the UKMLA is a graduation requirement starting from the 2024–25 academic year.
              </li>
              <li>
                <strong>International Medical Graduates (IMGs):</strong> Doctors who graduated outside the UK, EU, or Switzerland. Rather than taking a separate test named "UKMLA", IMGs take the updated, MLA-compliant **PLAB (Professional and Linguistic Assessments Board)** exam.
              </li>
            </ol>
            <div className="callout info">
              <div className="callout-title">Clarification for IMGs</div>
              <p>
                If you are an international graduate, you will still book and sit the **PLAB 1** and **PLAB 2** exams. However, the blueprint of the PLAB exams has been entirely rebuilt around the MLA Content Map, ensuring you meet the exact same standard as UK graduates.
              </p>
            </div>
          </section>

          <section>
            <h2>Structure of the Assessment</h2>
            <p>
              The UKMLA is divided into two parts, assessing theory and practical capability respectively:
            </p>
            <ul>
              <li>
                <strong>Applied Knowledge Test (AKT):</strong> A computer-based written exam testing clinical reasoning through Single Best Answer (SBA) questions. Learn more in the detailed <Link to="/exam-pattern/akt">AKT Guide</Link>.
              </li>
              <li>
                <strong>Clinical and Professional Skills Assessment (CPSA):</strong> A practical exam testing clinical procedures, consulting skills, and professional behaviors using simulated patients (OSCE/OSLER model). Learn more in the <Link to="/exam-pattern/cpsa">CPSA Guide</Link>.
              </li>
            </ul>
          </section>

          <section>
            <h2>The MLA Content Map</h2>
            <p>
              Rather than standard textbooks, the UKMLA is based on the official <strong>GMC MLA Content Map</strong>. This is a dynamic, live regulatory document that details:
            </p>
            <ul>
              <li><strong>Patient Presentations:</strong> The symptoms or complaints a doctor must know how to investigate (e.g., chest pain, breathlessness, confusion).</li>
              <li><strong>Clinical Conditions:</strong> The underlying diseases that must be diagnosed and managed (e.g., asthma, myocardial infarction, sepsis).</li>
              <li><strong>Professional Behaviours:</strong> Adherence to safety protocols, consent, confidentiality, and teamwork guidelines.</li>
              <li><strong>Practical Procedures:</strong> Physical clinical skills (e.g., drawing blood, performing an ECG, inserting a cannula).</li>
            </ul>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Related Pages</h3>
            <ul className="related-links-list">
              <li><Link to="/eligibility">Who needs to take the UKMLA? Eligibility Pathways</Link></li>
              <li><Link to="/exam-pattern">AKT and CPSA Exam Pattern Breakdown</Link></li>
              <li><Link to="/ukmla-vs-plab">The IMG transition: UKMLA vs PLAB detailed differences</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/what-is-ukmla" className="sidebar-link active">What is UKMLA?</Link></li>
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
