import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function Syllabus() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">UKMLA Syllabus & Content Map</h1>
            <p className="page-summary">
              Explore the official General Medical Council (GMC) MLA Content Map, detailing patient presentations, clinical conditions, professional behaviors, and mandatory procedures.
            </p>
          </header>

          <section>
            <h2>The MLA Content Map Framework</h2>
            <p>
              The UKMLA does not use a list of textbooks or university courses. Instead, all questions in the AKT and all stations in the CPSA are written directly from the <strong>GMC MLA Content Map</strong>.
            </p>
            <p>
              The Content Map is a unified framework divided into four core areas:
              <strong> Patient Presentations</strong>,
              <strong> Clinical Conditions</strong>,
              <strong> Professional Behaviours</strong>, and
              <strong> Practical Skills and Procedures</strong>. The updated Content Map that applies to
              MLA assessments from September 2026 expands the A–Z conditions index from 311 to 430
              conditions and adds a Clinical Imaging area.
            </p>

            <figure className="content-figure">
              <div className="figure-media">
                <img src="/images/study-materials.webp" alt="Open anatomy notes, colour-coded revision notes and study materials on a desk" loading="lazy" />
              </div>
              <figcaption>
                <strong>Map your revision.</strong> Every AKT question and CPSA station traces back to the four areas of the Content Map — organise your notes around them rather than around textbooks.
              </figcaption>
            </figure>
          </section>

          <section>
            <h2>1. Patient Presentations</h2>
            <p>
              This section lists the symptoms, signs, or clinical findings that a candidate must know how to evaluate. The GMC lists over 300 presentations. Examples include:
            </p>
            <ul>
              <li><strong>Acute presentations:</strong> Chest pain, shortness of breath, acute confusion, abdominal pain, fever, anaphylaxis, collapse.</li>
              <li><strong>Chronic presentations:</strong> Fatigue, chronic cough, memory loss, joint pain, unintended weight loss, chronic headache.</li>
              <li><strong>Mental health presentations:</strong> Low mood, anxiety, self-harm, hallucinations, alcohol withdrawal.</li>
            </ul>
          </section>

          <section>
            <h2>2. Clinical Conditions</h2>
            <p>
              This is the index of specific diseases, injuries, and health states that candidates must be able to diagnose, manage, or differentiate. Key conditions categorized by system include:
            </p>
            <ul>
              <li><strong>Cardiovascular:</strong> Acute coronary syndromes (STEMI, NSTEMI), heart failure, atrial fibrillation, hypertension, deep vein thrombosis (DVT), pulmonary embolism.</li>
              <li><strong>Respiratory:</strong> Asthma, chronic obstructive pulmonary disease (COPD), pneumonia, pneumothorax, lung cancer, pleural effusion.</li>
              <li><strong>Gastrointestinal:</strong> Appendicitis, bowel obstruction, inflammatory bowel disease (Crohn\'s and Ulcerative Colitis), peptic ulcer disease, cirrhosis, cholecystitis.</li>
              <li><strong>Endocrine & Renal:</strong> Type 1 and Type 2 diabetes (including DKA, HHS), thyroid disorders, acute kidney injury (AKI), chronic kidney disease (CKD), urinary tract infections (UTI).</li>
              <li><strong>Neurology:</strong> Stroke, transient ischemic attack (TIA), meningitis, epilepsy, Parkinson\'s disease, multiple sclerosis.</li>
            </ul>
          </section>

          <section>
            <h2>3. Professional Behaviours</h2>
            <p>
              This covers the ethical framework, communication standards, and legal requirements expected of UK doctors as outlined in the GMC’s <em>Good Medical Practice</em>:
            </p>
            <ul>
              <li><strong>Consent:</strong> Obtaining valid, informed consent for physical examinations, investigations, and surgical procedures.</li>
              <li><strong>Confidentiality:</strong> Managing patient records, disclosure of risk, and patient privacy.</li>
              <li><strong>Prescribing Safety:</strong> Writing clear, accurate prescriptions, verifying drug doses, and avoiding contraindications.</li>
              <li><strong>Safeguarding:</strong> Identifying signs of abuse, domestic violence, or neglect in children and vulnerable adults.</li>
            </ul>
          </section>

          <section>
            <h2>4. Practical Skills and Procedures</h2>
            <p>
              The GMC lists <strong>mandatory practical procedures</strong> that every medical graduate must be able to perform competently and safely. These are directly tested in the CPSA/OSCE:
            </p>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Procedure Category</th>
                    <th>Required Practical Skills</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Vascular & Cardiac</strong></td>
                    <td>Venepuncture (blood draws), intravenous cannulation, recording/placement of 12-lead ECG, measuring blood pressure.</td>
                  </tr>
                  <tr>
                    <td><strong>Injections & Infusions</strong></td>
                    <td>Subcutaneous, intramuscular, and intradermal injections. Setting up an IV infusion pump.</td>
                  </tr>
                  <tr>
                    <td><strong>Respiratory</strong></td>
                    <td>Administering oxygen therapy safely, peak flow measurement, using inhaler devices with spacers.</td>
                  </tr>
                  <tr>
                    <td><strong>Gastrointestinal & Urinary</strong></td>
                    <td>Male and female urethral catheterisation, checking blood glucose levels, performing urinalysis.</td>
                  </tr>
                  <tr>
                    <td><strong>Hygiene & Safety</strong></td>
                    <td>Surgical handwashing, aseptic non-touch technique (ANTT), correct disposal of clinical waste/sharps, using Personal Protective Equipment (PPE).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>UKMLA Syllabus PDF Download</h2>
            <p>
              We highly recommend downloading the official syllabus to track your revision. The GMC provides the full content map as a PDF document.
            </p>
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <a href="https://www.gmc-uk.org/cdn/documents/251015---mla-content-map--english-_pdf-112647970.pdf" target="_blank" rel="noopener noreferrer" className="post-cta" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#005ea5', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
                UKMLA Syllabus PDF Download
              </a>
            </div>
          </section>

          <div className="callout info">
            <div className="callout-title">The Content Map is a Live Document</div>
            <p>
              The General Medical Council periodically updates the MLA Content Map to align with modern clinical guidelines. The original 2019 map is the reference up to and including August 2026; the updated Content Map (published October 2025) applies to all MLA exams and assessments taken from September 2026 onwards. Always review the latest version on the official GMC website.
            </p>
          </div>

          <div className="related-links">
            <h3 className="related-links-title">Related Pages</h3>
            <ul className="related-links-list">
              <li><Link to="/official-resources">Download PDF copies of the GMC Content Map</Link></li>
              <li><Link to="/preparation">Study guides tailored to the Content Map</Link></li>
              <li><Link to="/exam-pattern">How the content map is divided between AKT and CPSA</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 2 July 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/what-is-ukmla" className="sidebar-link">What is UKMLA?</Link></li>
            <li><Link to="/syllabus" className="sidebar-link active">Syllabus Details</Link></li>
            <li><Link to="/exam-pattern" className="sidebar-link">Exam Pattern</Link></li>
            <li><Link to="/official-resources" className="sidebar-link">Official Resources</Link></li>
            <li><Link to="/glossary" className="sidebar-link">Glossary of Terms</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
