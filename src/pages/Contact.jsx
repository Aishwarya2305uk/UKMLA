import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.message.trim()) tempErrors.message = 'Please enter your message.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate form submission
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Layout>
      <div className="page-layout-grid">
        <article className="article-container">
          <header className="page-header" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px' }}>
            <h1 className="page-title">Contact Us</h1>
            <p className="page-summary">
              Have a question about the UKMLA, or noticed a discrepancy with latest guidelines? Get in touch with our independent editorial support.
            </p>
          </header>

          {isSubmitted ? (
            <div className="form-success-alert" role="alert">
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Message Received Successfully</h3>
              <p style={{ fontSize: '15px' }}>
                Thank you for reaching out. Your query has been logged. Our editorial team will review and respond to you at the email provided.
              </p>
              <button 
                className="btn btn-secondary" 
                style={{ marginTop: '16px', padding: '6px 16px', fontSize: '13px' }}
                onClick={() => setIsSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Full Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Dr. Jane Doe"
                  />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane.doe@example.com"
                  />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Your Question or Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your query here. If reporting an outdated guideline, please include the official GMC page link."
                  />
                  {errors.message && <div className="form-error">{errors.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Inquiry
                </button>
              </form>
            </div>
          )}

          <p className="last-reviewed" style={{ textAlign: 'center', marginTop: '48px' }}>
            Last reviewed: 25 June 2026. Source: General Medical Council (GMC).
          </p>
        </article>

        <aside className="sidebar-container">
          <h3 className="sidebar-title">Quick Links</h3>
          <ul className="sidebar-links">
            <li><Link to="/contact" className="sidebar-link active">Contact Us</Link></li>
            <li><Link to="/about" className="sidebar-link">About Us</Link></li>
            <li><Link to="/privacy" className="sidebar-link">Privacy Policy</Link></li>
            <li><Link to="/faqs" className="sidebar-link">FAQs Hub</Link></li>
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
