import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function Privacy() {
  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header">
            <h1 className="page-title">Privacy Policy</h1>
            <p className="page-summary">
              Understanding how we manage user data, cookies, and contact inquiry submissions.
            </p>
          </header>

          <section>
            <h2>GDPR and Data Protection Compliance</h2>
            <p>
              This platform is designed to prioritize candidate privacy. Because we are a brand-neutral informational guide, we do not monetize user profiles, run commercial tracker systems, or share datasets with marketing agencies.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <p>
              We only collect data that you explicitly provide to us:
            </p>
            <ul>
              <li><strong>Contact Forms:</strong> When you submit an inquiry through our Contact page, we collect your Name, Email Address, and Message content. This information is used strictly to answer your question or process content corrections. We delete these logs after 6 months.</li>
              <li><strong>Server Logs:</strong> Standard web host metrics (IP address, browser type, referral URLs, access timestamps) are collected for security and traffic monitoring. They contain no personally identifiable details.</li>
            </ul>
          </section>

          <section>
            <h2>Cookies and Tracking</h2>
            <p>
              This website uses minor cookie files:
            </p>
            <ul>
              <li><strong>Functional Cookies:</strong> Essential temporary files to coordinate routing, dark mode preferences, or form validation states.</li>
              <li><strong>No Marketing Trackers:</strong> We do not deploy third-party advertising cookie scripts (such as DoubleClick or retargeting cookies).</li>
            </ul>
          </section>

          <section>
            <h2>Your Rights</h2>
            <p>
              Under GDPR rules, you are entitled to:
            </p>
            <ul>
              <li>Request copies of any contact form queries you sent to us.</li>
              <li>Request immediate deletion of your name and email logs from our systems.</li>
              <li>File queries regarding our privacy policy by emailing us at <a href="mailto:contact@ukmla-info.org.uk"><strong>contact@ukmla-info.org.uk</strong></a>.</li>
            </ul>
          </section>

          <div className="related-links" style={{ marginTop: '40px' }}>
            <h3 className="related-links-title">Additional Reference Channels</h3>
            <ul className="related-links-list">
              <li><Link to="/about">About this Resource</Link></li>
              <li><Link to="/contact">Get in touch with Support</Link></li>
            </ul>
          </div>

          <p className="last-reviewed">Last reviewed: 25 June 2026. Source: General Medical Council (GMC).</p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/privacy" className="sidebar-link active">Privacy Policy</Link></li>
            <li><Link to="/about" className="sidebar-link">About Us</Link></li>
            <li><Link to="/contact" className="sidebar-link">Contact Us</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
