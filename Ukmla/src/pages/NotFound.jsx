import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function NotFound() {
  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '80px 24px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '72px', color: 'var(--brand-accent)', fontWeight: '800', marginBottom: '16px' }}>404</h1>
        <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '32px', lineHeight: '1.5' }}>
          The page you are looking for does not exist, has been moved, or has an outdated link. Try using our search bar or return to the main pages.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            Return Home
          </Link>
          <Link to="/faqs" className="btn btn-secondary">
            View FAQs
          </Link>
          <Link to="/glossary" className="btn btn-secondary">
            Glossary of Terms
          </Link>
        </div>
      </div>
    </Layout>
  );
}
