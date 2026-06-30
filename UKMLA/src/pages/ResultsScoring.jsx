import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function ResultsScoring() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">Results, Scoring & Standard Setting</h1>
            <p className="page-summary">
              A comprehensive explanation of how UKMLA components are scored, including standard-setting psychometrics: the Angoff method and Borderline Regression.
            </p>
          </header>

          <section>
            <h2>No Fixed Pass Mark</h2>
            <p>
              Unlike school exams that set a fixed passing score (e.g., 50% or 60%), the UKMLA (and PLAB) uses psychometric standard-setting methodologies. This ensures that the pass mark adjusts for the difficulty of each individual test paper, keeping the licensing standard consistent across different sittings.
            </p>
            <p>
              A candidate sitting a highly difficult paper will require a lower absolute percentage to pass than a candidate sitting a relatively easy paper.
            </p>
          </section>

          <section>
            <h2>AKT Standard Setting: The Angoff Method</h2>
            <p>
              The written Applied Knowledge Test (AKT) has its pass mark determined using the <strong>Angoff Method</strong>:
            </p>
            <ol>
              <li>A panel of clinical experts (medical educators and practicing doctors) reviews every question on a specific exam paper.</li>
              <li>For each question, every panelist estimates: <em>"What is the probability that a minimally competent, safe Foundation Year 1 (FY1) doctor would answer this question correctly?"</em></li>
              <li>The panelists\' individual percentages are averaged for each question to create a question score.</li>
              <li>The sum of these average scores across all questions on the paper determines the baseline pass mark.</li>
              <li>A statistical margin of error (standard error of measurement) is then subtracted or added to finalize the safe passing threshold.</li>
            </ol>
          </section>

          <section>
            <h2>CPSA / OSCE Standard Setting: Borderline Regression</h2>
            <p>
              For the practical Clinical and Professional Skills Assessment (PLAB 2/CPSA), the pass mark is calculated using the <strong>Borderline Regression Method</strong>:
            </p>
            <ul>
              <li>Inside each station, the examiner awards you two independent scores:
                <ul>
                  <li><strong>Domain Scores:</strong> Numerical marks for Data Gathering, Clinical Management, and Interpersonal Skills.</li>
                  <li><strong>Global Rating:</strong> A single judgment rating your performance as: <em>Excellent, Good, Satisfactory, Borderline, or Unsatisfactory</em>.</li>
                </ul>
              </li>
              <li>At the end of the exam, a statistician plots the numerical domain scores of all candidates against their global ratings for each station.</li>
              <li>Using linear regression, the line of best fit determines the numerical score that corresponds to a "borderline" candidate.</li>
              <li>The passing score for that station is calculated from this borderline threshold. The sum of these values across all stations plus a measurement error margin forms the overall passing score.</li>
            </ul>
          </section>

          <section>
            <h2>PLAB 2 Dual Pass Requirement</h2>
            <p>
              To clear PLAB 2 (the IMG clinical component), candidates must clear a double threshold in a single sitting:
            </p>
            <div className="callout warning">
              <div className="callout-title">The Dual Criteria</div>
              <ol style={{ paddingLeft: '20px', marginTop: '6px' }}>
                <li style={{ marginBottom: '6px' }}>
                  <strong>Pass the Overall Score:</strong> Your combined score across all 16 stations must meet or exceed the overall exam pass mark calculated for that day.
                </li>
                <li>
                  <strong>Pass the Minimum Station Count:</strong> You must individually pass a minimum number of stations (typically <strong>10 out of 16 active stations</strong>). Passing 9 stations with a massive overall score is still a fail.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2>When Are Results Released?</h2>
            <p>
              Results timelines vary based on the exam component:
            </p>
            <ul>
              <li><strong>PLAB 1 (Written):</strong> Results are typically published online on the GMC portal <strong>6 weeks</strong> after the sitting date.</li>
              <li><strong>PLAB 2 (Clinical):</strong> Results are published online <strong>4 weeks</strong> after the clinical exam.</li>
              <li><strong>UK Medical Students (MS AKT & CPSA):</strong> Pass/fail notifications and score breakdowns are released locally by individual medical schools according to their internal academic calendars.</li>
            </ul>
          </section>

          <div className="related-links">
            <h3 className="related-links-title">Next Steps</h3>
            <ul className="related-links-list">
              <li><Link to="/appeals-and-resits">What happens if you fail? Appeals & Resits Guide</Link></li>
              <li><Link to="/exam-pattern">Explore the detailed exam structure of AKT & CPSA</Link></li>
              <li><Link to="/preparation">OSCE preparation strategies</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/results-and-scoring" className="sidebar-link active">Results & Scoring</Link></li>
            <li><Link to="/exam-pattern" className="sidebar-link">Exam Pattern</Link></li>
            <li><Link to="/appeals-and-resits" className="sidebar-link">Appeals & Resits</Link></li>
            <li><Link to="/registration-guide" className="sidebar-link">Registration Guide</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
