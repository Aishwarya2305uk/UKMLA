import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

const glossaryTerms = [
  {
    letter: 'A',
    name: 'Applied Knowledge Test',
    abbr: 'AKT',
    desc: 'The computer-based, written theory component of the UKMLA, comprising multiple-choice Single Best Answer (SBA) questions testing clinical application.'
  },
  {
    letter: 'A',
    name: 'Angoff Method',
    abbr: 'Angoff',
    desc: 'A psychometric standard-setting procedure used to establish the pass mark for the AKT. Panelists assess the difficulty of individual questions to calculate a fair passing threshold.'
  },
  {
    letter: 'B',
    name: 'Borderline Regression Method',
    abbr: 'BRM',
    desc: 'A statistical linear regression model used to calculate the passing standard for practical OSCE clinical assessments like the CPSA and PLAB 2.'
  },
  {
    letter: 'C',
    name: 'Clinical and Professional Skills Assessment',
    abbr: 'CPSA',
    desc: 'The practical, OSCE-style clinical skills component of the UKMLA, testing communication, diagnostic, and procedural tasks.'
  },
  {
    letter: 'C',
    name: 'Content Map',
    abbr: 'MLA Content Map',
    desc: 'The blueprint document maintained by the GMC that details all symptoms, conditions, procedures, and behaviors subject to assessment in the UKMLA.'
  },
  {
    letter: 'E',
    name: 'Educational Commission for Foreign Medical Graduates',
    abbr: 'ECFMG',
    desc: 'A US-based credentials evaluation organization. Through its EPIC system, it verifies international medical qualifications for the GMC.'
  },
  {
    letter: 'F',
    name: 'Foundation Year 1',
    abbr: 'FY1 / F1',
    desc: 'The first year of the UK postgraduate foundation training programme. The UKMLA standard is set exactly at the level of a graduating student ready for FY1.'
  },
  {
    letter: 'F',
    name: 'Foundation Year 2',
    abbr: 'FY2 / F2',
    desc: 'The second year of the UK postgraduate foundation training programme. Successful completion permits entering specialty residency pathways.'
  },
  {
    letter: 'G',
    name: 'General Medical Council',
    abbr: 'GMC',
    desc: 'The regulatory body that maintains the register of medical practitioners in the UK, sets medical education standards, and administers the licensing process.'
  },
  {
    letter: 'I',
    name: 'International Medical Graduate',
    abbr: 'IMG',
    desc: 'A doctor who obtained their medical degree outside the United Kingdom, European Union, or Switzerland, usually requiring licensing exams to register.'
  },
  {
    letter: 'M',
    name: 'Medical Schools Council',
    abbr: 'MSC',
    desc: 'The representative body for UK medical schools, which collaborates with the GMC to design and centrally deliver the MS AKT.'
  },
  {
    letter: 'O',
    name: 'Objective Structured Clinical Examination',
    abbr: 'OSCE',
    desc: 'A practical clinical assessment format where candidates cycle through standardized stations to perform histories, physical exams, and procedural tasks.'
  },
  {
    letter: 'O',
    name: 'Objective Structured Long Examination Record',
    abbr: 'OSLER',
    desc: 'A clinical exam format involving extended patient interaction, focusing on history taking, examination, and presentation under examiner supervision.'
  },
  {
    letter: 'P',
    name: 'Professional and Linguistic Assessments Board',
    abbr: 'PLAB',
    desc: 'The GMC assessment pathway for IMGs. PLAB 1 (written) and PLAB 2 (clinical) are now rebuilt to be fully compliant with the UKMLA Content Map.'
  },
  {
    letter: 'P',
    name: 'Primary Medical Qualification',
    abbr: 'PMQ',
    desc: 'A first medical degree (e.g., MBBS, MBChB, MD) that qualifies a doctor to apply for registration or sit licensing examinations.'
  },
  {
    letter: 'S',
    name: 'Single Best Answer',
    abbr: 'SBA',
    desc: 'A multiple-choice question format where candidates choose the single most appropriate option out of five plausible choices based on clinical guidelines.'
  }
];

export default function Glossary() {
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const letters = ['ALL', ...Array.from(new Set(glossaryTerms.map(t => t.letter))).sort()];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesLetter = selectedLetter === 'ALL' || term.letter === selectedLetter;
    const matchesSearch = term.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          term.abbr.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          term.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">Glossary of UKMLA Terms</h1>
            <p className="page-summary">
              A comprehensive index of acronyms, psychometric terminologies, and regulatory bodies associated with the UK Medical Licensing Assessment.
            </p>
          </header>

          <div className="glossary-search">
            <input
              type="text"
              placeholder="Search glossary terms..."
              className="form-input"
              style={{ padding: '12px 16px', fontSize: '16px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="glossary-index">
            {letters.map(letter => (
              <button
                key={letter}
                className={`glossary-letter-btn ${selectedLetter === letter ? 'active' : ''}`}
                onClick={() => setSelectedLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>

          <section className="glossary-terms">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term, index) => (
                <div key={index} className="glossary-term-card">
                  <h3 className="glossary-term-name">
                    {term.name}
                    <span className="glossary-term-abbr">{term.abbr}</span>
                  </h3>
                  <p className="glossary-term-desc">{term.desc}</p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '40px 0' }}>
                No glossary terms match your criteria. Try adjusting your search query or letter selection.
              </p>
            )}
          </section>

          <div className="related-links" style={{ marginTop: '40px' }}>
            <h3 className="related-links-title">Additional Reference Channels</h3>
            <ul className="related-links-list">
              <li><Link to="/what-is-ukmla">What is the UKMLA? Framework details</Link></li>
              <li><Link to="/official-resources">GMC & MSC official documents</Link></li>
              <li><Link to="/faqs">Read candidate FAQs</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/glossary" className="sidebar-link active">Glossary of Terms</Link></li>
            <li><Link to="/what-is-ukmla" className="sidebar-link">What is UKMLA?</Link></li>
            <li><Link to="/official-resources" className="sidebar-link">Official Resources</Link></li>
            <li><Link to="/faqs" className="sidebar-link">FAQs</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
