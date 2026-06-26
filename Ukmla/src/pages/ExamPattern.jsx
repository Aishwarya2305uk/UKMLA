import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function ExamPattern() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">UKMLA Exam Pattern & Format</h1>
            <p className="page-summary">
              A comprehensive breakdown of the UKMLA's two parts: the Applied Knowledge Test (AKT) and the Clinical and Professional Skills Assessment (CPSA).
            </p>
          </header>

          <section>
            <h2>The Core Structure</h2>
            <p>
              The UKMLA is not a single exam. To satisfy the licensing standard, candidates must pass two distinct components. Each component tests different dimensions of a candidate’s competence, from scientific/clinical understanding to clinical practice and ethics:
            </p>
            <ol>
              <li>
                <strong>Applied Knowledge Test (AKT):</strong> A computer-based, written assessment of theoretical clinical knowledge.
              </li>
              <li>
                <strong>Clinical and Professional Skills Assessment (CPSA):</strong> A practical, clinical skills OSCE-style assessment.
              </li>
            </ol>
          </section>

          <section>
            <h2>Exam Pattern Comparison</h2>
            <p>
              Depending on whether you are a UK medical student or an International Medical Graduate (IMG), the way you sit these components differs:
            </p>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Exam Component</th>
                    <th>UK Medical Students</th>
                    <th>International Medical Graduates (IMGs)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Applied Knowledge Test (AKT)</strong></td>
                    <td>
                      <strong>MS AKT:</strong> Delivered locally by your medical school.
                      <ul style={{ paddingLeft: '16px', marginTop: '6px', fontSize: '13px' }}>
                        <li>Around 200 SBA questions</li>
                        <li>Delivered across two papers over two days</li>
                      </ul>
                    </td>
                    <td>
                      <strong>PLAB 1:</strong> Delivered by the GMC at UK and global test centres.
                      <ul style={{ paddingLeft: '16px', marginTop: '6px', fontSize: '13px' }}>
                        <li>180 SBA questions</li>
                        <li>Single 3-hour paper</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Clinical & Professional Skills Assessment (CPSA)</strong></td>
                    <td>
                      <strong>School CPSA:</strong> Delivered locally as an OSCE or OSLER.
                      <ul style={{ paddingLeft: '16px', marginTop: '6px', fontSize: '13px' }}>
                        <li>Stations set by individual schools</li>
                        <li>Must meet strict GMC quality assurance</li>
                      </ul>
                    </td>
                    <td>
                      <strong>PLAB 2:</strong> Delivered at the GMC clinical assessment centre in Manchester.
                      <ul style={{ paddingLeft: '16px', marginTop: '6px', fontSize: '13px' }}>
                        <li>16 clinical stations</li>
                        <li>8 minutes per station</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>Applied Knowledge Test (AKT) Details</h2>
            <p>
              The AKT is a theoretical assessment using <strong>Single Best Answer (SBA)</strong> multiple-choice questions. In an SBA question:
            </p>
            <ul>
              <li>You are given a clinical scenario (vignette).</li>
              <li>You must select the most appropriate response from five options.</li>
              <li>All options may be plausible, but only one is the "single best" response under clinical guidelines.</li>
              <li>There is no negative marking; it is always in your interest to answer every question.</li>
            </ul>
            <p>
              For more detail, read our dedicated <Link to="/exam-pattern/akt">AKT Guide</Link>.
            </p>
          </section>

          <section>
            <h2>Clinical & Professional Skills Assessment (CPSA) Details</h2>
            <p>
              The CPSA evaluates your physical diagnostic skills, communication skills, history-taking, and professional ethics. It is delivered in the form of an <strong>OSCE (Objective Structured Clinical Examination)</strong>:
            </p>
            <ul>
              <li>Candidates move through a series of "stations."</li>
              <li>At each station, you interact with a role-player (simulated patient) or clinical manikin under the observation of a clinical examiner.</li>
              <li>You are graded on clinical capabilities, safety protocols, diagnostic accuracy, and communication.</li>
            </ul>
            <p>
              For more detail, read our dedicated <Link to="/exam-pattern/cpsa">CPSA Guide</Link>.
            </p>
          </section>

          <div className="callout info">
            <div className="callout-title">Standard Setting Methodology</div>
            <p>
              The passing scores for these components are calculated using rigorous psychometric methods rather than arbitrary fixed percentages. The AKT uses the <strong>Angoff method</strong>, while the CPSA uses <strong>Borderline Regression</strong>. Read about standard setting on our <Link to="/results-and-scoring">Results & Scoring Page</Link>.
            </p>
          </div>

          <div className="related-links">
            <h3 className="related-links-title">Detail Pages</h3>
            <ul className="related-links-list">
              <li><Link to="/exam-pattern/akt">Deep-dive Applied Knowledge Test (AKT) pattern</Link></li>
              <li><Link to="/exam-pattern/cpsa">Deep-dive Clinical Skills Assessment (CPSA) pattern</Link></li>
              <li><Link to="/syllabus">Detailed GMC Syllabus & Content Map</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC) & Medical Schools Council (MSC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/exam-pattern" className="sidebar-link active">Pattern Overview</Link></li>
            <li><Link to="/exam-pattern/akt" className="sidebar-link">Applied Knowledge Test (AKT)</Link></li>
            <li><Link to="/exam-pattern/cpsa" className="sidebar-link">Clinical Skills (CPSA)</Link></li>
            <li><Link to="/syllabus" className="sidebar-link">Syllabus Details</Link></li>
            <li><Link to="/results-and-scoring" className="sidebar-link">Scoring & Marks</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
