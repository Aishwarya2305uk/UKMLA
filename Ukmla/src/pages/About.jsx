import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function About() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">About This Resource</h1>
            <p className="page-summary">
              An independent, brand-neutral educational platform dedicated to providing factual, up-to-date information about the UK Medical Licensing Assessment.
            </p>
          </header>

          <section>
            <h2>Our Mission</h2>
            <p>
              The entry process to medical practice in the United Kingdom can be challenging to navigate. Navigating between varying university timelines and the transitioning International Medical Graduate pathways often leads to candidate confusion.
            </p>
            <p>
              This website was established as a <strong>pure knowledge platform</strong>. Our mission is to gather and organize information regarding the UK Medical Licensing Assessment (UKMLA / MLA) into clear, plain-English reference guides, helping students and international graduates plan their licensing journey.
            </p>
          </section>

          <section>
            <h2>Brand Neutrality and Factual Integrity</h2>
            <p>
              Unlike many online medical resources, we maintain a strict policy of neutrality:
            </p>
            <ul>
              <li><strong>No Consultancy Branding:</strong> We are not associated with any consultancy, coaching academy, recruitment firm, or training provider.</li>
              <li><strong>No Social Media Links:</strong> We do not host social media accounts or run advertising forums.</li>
              <li><strong>No Promotional Content:</strong> You will find no paid course promotions, study material sponsorships, or affiliate booking packages on this platform.</li>
              <li><strong>Verification Focus:</strong> We actively advise candidates to verify critical fee scales, exam bookings, and syllabus criteria on the official General Medical Council (GMC) portals, as these update periodically.</li>
            </ul>
          </section>

          <section>
            <h2>Where Our Data Comes From</h2>
            <p>
              Every guide, checklist, and comparison on this platform is structured using primary sources, including:
            </p>
            <ul>
              <li>The General Medical Council (GMC) regulations and official compliance frameworks.</li>
              <li>The Medical Schools Council (MSC) student information bulletins and AKT guides.</li>
              <li>Official UK clinical health portals (NICE guidelines).</li>
            </ul>
          </section>

          <div className="related-links" style={{ marginTop: '40px' }}>
            <h3 className="related-links-title">Navigate Guide</h3>
            <ul className="related-links-list">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/contact">Submit corrections or query feedback</Link></li>
              <li><Link to="/privacy">Read our Privacy Policy</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/about" className="sidebar-link active">About Us</Link></li>
            <li><Link to="/contact" className="sidebar-link">Contact Us</Link></li>
            <li><Link to="/privacy" className="sidebar-link">Privacy Policy</Link></li>
            <li><Link to="/official-resources" className="sidebar-link">Official Resources</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
