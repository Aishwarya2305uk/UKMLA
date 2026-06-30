import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function CPSA() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">The Clinical & Professional Skills Assessment (CPSA)</h1>
            <p className="page-summary">
              A comprehensive breakdown of the practical, OSCE-style component of the UKMLA, explaining station structure, clinical scenarios, and evaluation pathways.
            </p>
          </header>

          <section>
            <h2>What is the UKMLA CPSA?</h2>
            <p>
              The <strong>Clinical and Professional Skills Assessment (CPSA)</strong> is the practical component of the UK Medical Licensing Assessment. It evaluates your performance in clinical environments: your physical diagnosis technique, history-taking ability, communication skills, empathy, procedural competencies, and adherence to patient safety codes.
            </p>
            <p>
              Rather than written answers, you are tested on your actions, verbal interaction, and manual skills under direct examination.
            </p>

            <figure className="content-figure">
              <div className="figure-media">
                <img src="/gallery/images.jpg" alt="A clinical team conducting a bedside ward round with a patient" loading="lazy" />
              </div>
              <figcaption>
                <strong>Bedside clinical practice.</strong> The CPSA recreates real ward and consultation scenarios — history taking, focused examination, and clear communication with simulated patients are each marked independently.
              </figcaption>
            </figure>
          </section>

          <section>
            <h2>CPSA Formats: UK Students vs. IMGs</h2>
            <p>
              The CPSA structure adapts depending on your route to registration:
            </p>
            <ul>
              <li>
                <strong>UK Medical Graduates (School CPSA):</strong> Delivered locally by individual UK medical schools. It takes the form of an <strong>OSCE (Objective Structured Clinical Examination)</strong> or <strong>OSLER (Objective Structured Long Examination Record)</strong>. The exact station counts, duration, and setup are managed by the university but must align with GMC regulations.
              </li>
              <li>
                <strong>International Medical Graduates (PLAB 2):</strong> Delivered directly by the GMC. It is a single practical exam held at the <strong>GMC Clinical Assessment Centre in Manchester, UK</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h2>PLAB 2 (IMG CPSA) Exam Pattern</h2>
            <p>
              For international candidates, the PLAB 2 exam follows a standardized, highly regulated structure:
            </p>
            <ul>
              <li><strong>Station Count:</strong> The exam comprises <strong>16 active stations</strong>, plus two rest stations.</li>
              <li><strong>Timing:</strong> Candidates have <strong>1.5 minutes</strong> of reading time outside each station, followed by <strong>8 minutes</strong> inside the station.</li>
              <li><strong>Scoring Domains:</strong> In each station, you are marked across three separate domains:
                <ul>
                  <li><strong>Data Gathering, Technical & Assessment Skills:</strong> History taking, physical examination, performing procedural skills, and ordering tests.</li>
                  <li><strong>Clinical Management Skills:</strong> Devising a correct management plan, prescribing safely, and communicating decisions.</li>
                  <li><strong>Interpersonal Skills:</strong> Empathy, building rapport, obtaining consent, active listening, and addressing patient concerns.</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2>What is Assessed in a CPSA?</h2>
            <p>
              The GMC Content Map details three core clinical capability groups assessed during the CPSA:
            </p>
            <h3>1. Communication Skills & History Taking</h3>
            <p>
              You must consult with simulated patients (role-players). Scenarios include taking a targeted cardiovascular history, counseling a patient on a newly diagnosed condition (e.g., type 2 diabetes), explaining risks of a surgical procedure, or handling a difficult scenario (such as breaking bad news or addressing a relative’s complaint).
            </p>
            <h3>2. Physical Clinical Examination</h3>
            <p>
              Demonstrating standard physical exam techniques on a simulated patient or manikin. Key examinations include Cardiovascular, Respiratory, Abdominal, Neurological (cranial nerves, upper/lower limb), and Musculoskeletal (GALS screen, specific joints).
            </p>
            <h3>3. Practical Procedural Skills</h3>
            <p>
              Performing physical tasks on task trainers or manikins under safe clinical guidelines:
            </p>
            <ul>
              <li>Intravenous cannulation</li>
              <li>Venepuncture (drawing blood)</li>
              <li>Measuring vital signs (blood pressure, pulse, oxygen sat)</li>
              <li>Male or female urinary catheterisation</li>
              <li>Administering subcutaneous/intramuscular injections</li>
              <li>Performing an electrocardiogram (ECG) placement</li>
              <li>Basic life support (BLS) and automated external defibrillator (AED) operation</li>
            </ul>
          </section>

          <section>
            <h2>Anatomy of a Clinical Station</h2>
            <p>
              A standard station begins with a brief instructions sheet placed outside the door:
            </p>
            <div className="callout info">
              <div className="callout-title">Sample Station Instructions</div>
              <p>
                <strong>Scenario:</strong> "You are an FY1 doctor working in the General Practice clinic. Mrs. Sarah Jenkins, a 45-year-old schoolteacher, has scheduled an appointment to discuss her thyroid function blood test results, which show elevated TSH and low Free T4."
              </p>
              <p>
                <strong>Your Task:</strong>
              </p>
              <ul style={{ paddingLeft: '16px', margin: '4px 0 10px' }}>
                <li>Take a focused history from Mrs. Jenkins.</li>
                <li>Explain the blood test findings in plain English.</li>
                <li>Discuss the proposed management and address her concerns.</li>
              </ul>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                <em>Examiner Focus: Can you explain hypothyroidism without medical jargon? Do you screen for red flags (e.g., compression symptoms)? Do you explain the daily dosing rules of levothyroxine?</em>
              </p>
            </div>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Related Pages</h3>
            <ul className="related-links-list">
              <li><Link to="/preparation">How to prepare for OSCEs and PLAB 2</Link></li>
              <li><Link to="/exam-pattern/akt">Learn about the computer-based written AKT component</Link></li>
              <li><Link to="/results-and-scoring">Borderline regression scoring for clinical exams</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/exam-pattern" className="sidebar-link">Pattern Overview</Link></li>
            <li><Link to="/exam-pattern/akt" className="sidebar-link">Applied Knowledge Test (AKT)</Link></li>
            <li><Link to="/exam-pattern/cpsa" className="sidebar-link active">Clinical Skills (CPSA)</Link></li>
            <li><Link to="/syllabus" className="sidebar-link">Syllabus Details</Link></li>
            <li><Link to="/results-and-scoring" className="sidebar-link">Scoring & Marks</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
