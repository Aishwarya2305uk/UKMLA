import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from '../router';

// Full ISO country list with international dialling codes (alphabetical).
const COUNTRY_DATA = [
  { name: 'Afghanistan', code: '+93' },
  { name: 'Albania', code: '+355' },
  { name: 'Algeria', code: '+213' },
  { name: 'Andorra', code: '+376' },
  { name: 'Angola', code: '+244' },
  { name: 'Antigua and Barbuda', code: '+1' },
  { name: 'Argentina', code: '+54' },
  { name: 'Armenia', code: '+374' },
  { name: 'Australia', code: '+61' },
  { name: 'Austria', code: '+43' },
  { name: 'Azerbaijan', code: '+994' },
  { name: 'Bahamas', code: '+1' },
  { name: 'Bahrain', code: '+973' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'Barbados', code: '+1' },
  { name: 'Belarus', code: '+375' },
  { name: 'Belgium', code: '+32' },
  { name: 'Belize', code: '+501' },
  { name: 'Benin', code: '+229' },
  { name: 'Bhutan', code: '+975' },
  { name: 'Bolivia', code: '+591' },
  { name: 'Bosnia and Herzegovina', code: '+387' },
  { name: 'Botswana', code: '+267' },
  { name: 'Brazil', code: '+55' },
  { name: 'Brunei', code: '+673' },
  { name: 'Bulgaria', code: '+359' },
  { name: 'Burkina Faso', code: '+226' },
  { name: 'Burundi', code: '+257' },
  { name: 'Cambodia', code: '+855' },
  { name: 'Cameroon', code: '+237' },
  { name: 'Canada', code: '+1' },
  { name: 'Cape Verde', code: '+238' },
  { name: 'Central African Republic', code: '+236' },
  { name: 'Chad', code: '+235' },
  { name: 'Chile', code: '+56' },
  { name: 'China', code: '+86' },
  { name: 'Colombia', code: '+57' },
  { name: 'Comoros', code: '+269' },
  { name: 'Congo (Brazzaville)', code: '+242' },
  { name: 'Congo (Kinshasa)', code: '+243' },
  { name: 'Costa Rica', code: '+506' },
  { name: "Côte d'Ivoire", code: '+225' },
  { name: 'Croatia', code: '+385' },
  { name: 'Cuba', code: '+53' },
  { name: 'Cyprus', code: '+357' },
  { name: 'Czech Republic', code: '+420' },
  { name: 'Denmark', code: '+45' },
  { name: 'Djibouti', code: '+253' },
  { name: 'Dominica', code: '+1' },
  { name: 'Dominican Republic', code: '+1' },
  { name: 'Ecuador', code: '+593' },
  { name: 'Egypt', code: '+20' },
  { name: 'El Salvador', code: '+503' },
  { name: 'Equatorial Guinea', code: '+240' },
  { name: 'Eritrea', code: '+291' },
  { name: 'Estonia', code: '+372' },
  { name: 'Eswatini', code: '+268' },
  { name: 'Ethiopia', code: '+251' },
  { name: 'Fiji', code: '+679' },
  { name: 'Finland', code: '+358' },
  { name: 'France', code: '+33' },
  { name: 'Gabon', code: '+241' },
  { name: 'Gambia', code: '+220' },
  { name: 'Georgia', code: '+995' },
  { name: 'Germany', code: '+49' },
  { name: 'Ghana', code: '+233' },
  { name: 'Greece', code: '+30' },
  { name: 'Grenada', code: '+1' },
  { name: 'Guatemala', code: '+502' },
  { name: 'Guinea', code: '+224' },
  { name: 'Guinea-Bissau', code: '+245' },
  { name: 'Guyana', code: '+592' },
  { name: 'Haiti', code: '+509' },
  { name: 'Honduras', code: '+504' },
  { name: 'Hong Kong', code: '+852' },
  { name: 'Hungary', code: '+36' },
  { name: 'Iceland', code: '+354' },
  { name: 'India', code: '+91' },
  { name: 'Indonesia', code: '+62' },
  { name: 'Iran', code: '+98' },
  { name: 'Iraq', code: '+964' },
  { name: 'Ireland', code: '+353' },
  { name: 'Israel', code: '+972' },
  { name: 'Italy', code: '+39' },
  { name: 'Jamaica', code: '+1' },
  { name: 'Japan', code: '+81' },
  { name: 'Jordan', code: '+962' },
  { name: 'Kazakhstan', code: '+7' },
  { name: 'Kenya', code: '+254' },
  { name: 'Kiribati', code: '+686' },
  { name: 'Kosovo', code: '+383' },
  { name: 'Kuwait', code: '+965' },
  { name: 'Kyrgyzstan', code: '+996' },
  { name: 'Laos', code: '+856' },
  { name: 'Latvia', code: '+371' },
  { name: 'Lebanon', code: '+961' },
  { name: 'Lesotho', code: '+266' },
  { name: 'Liberia', code: '+231' },
  { name: 'Libya', code: '+218' },
  { name: 'Liechtenstein', code: '+423' },
  { name: 'Lithuania', code: '+370' },
  { name: 'Luxembourg', code: '+352' },
  { name: 'Macau', code: '+853' },
  { name: 'Madagascar', code: '+261' },
  { name: 'Malawi', code: '+265' },
  { name: 'Malaysia', code: '+60' },
  { name: 'Maldives', code: '+960' },
  { name: 'Mali', code: '+223' },
  { name: 'Malta', code: '+356' },
  { name: 'Marshall Islands', code: '+692' },
  { name: 'Mauritania', code: '+222' },
  { name: 'Mauritius', code: '+230' },
  { name: 'Mexico', code: '+52' },
  { name: 'Micronesia', code: '+691' },
  { name: 'Moldova', code: '+373' },
  { name: 'Monaco', code: '+377' },
  { name: 'Mongolia', code: '+976' },
  { name: 'Montenegro', code: '+382' },
  { name: 'Morocco', code: '+212' },
  { name: 'Mozambique', code: '+258' },
  { name: 'Myanmar', code: '+95' },
  { name: 'Namibia', code: '+264' },
  { name: 'Nauru', code: '+674' },
  { name: 'Nepal', code: '+977' },
  { name: 'Netherlands', code: '+31' },
  { name: 'New Zealand', code: '+64' },
  { name: 'Nicaragua', code: '+505' },
  { name: 'Niger', code: '+227' },
  { name: 'Nigeria', code: '+234' },
  { name: 'North Korea', code: '+850' },
  { name: 'North Macedonia', code: '+389' },
  { name: 'Norway', code: '+47' },
  { name: 'Oman', code: '+968' },
  { name: 'Pakistan', code: '+92' },
  { name: 'Palau', code: '+680' },
  { name: 'Palestine', code: '+970' },
  { name: 'Panama', code: '+507' },
  { name: 'Papua New Guinea', code: '+675' },
  { name: 'Paraguay', code: '+595' },
  { name: 'Peru', code: '+51' },
  { name: 'Philippines', code: '+63' },
  { name: 'Poland', code: '+48' },
  { name: 'Portugal', code: '+351' },
  { name: 'Qatar', code: '+974' },
  { name: 'Romania', code: '+40' },
  { name: 'Russia', code: '+7' },
  { name: 'Rwanda', code: '+250' },
  { name: 'Saint Kitts and Nevis', code: '+1' },
  { name: 'Saint Lucia', code: '+1' },
  { name: 'Saint Vincent and the Grenadines', code: '+1' },
  { name: 'Samoa', code: '+685' },
  { name: 'San Marino', code: '+378' },
  { name: 'São Tomé and Príncipe', code: '+239' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Senegal', code: '+221' },
  { name: 'Serbia', code: '+381' },
  { name: 'Seychelles', code: '+248' },
  { name: 'Sierra Leone', code: '+232' },
  { name: 'Singapore', code: '+65' },
  { name: 'Slovakia', code: '+421' },
  { name: 'Slovenia', code: '+386' },
  { name: 'Solomon Islands', code: '+677' },
  { name: 'Somalia', code: '+252' },
  { name: 'South Africa', code: '+27' },
  { name: 'South Korea', code: '+82' },
  { name: 'South Sudan', code: '+211' },
  { name: 'Spain', code: '+34' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Sudan', code: '+249' },
  { name: 'Suriname', code: '+597' },
  { name: 'Sweden', code: '+46' },
  { name: 'Switzerland', code: '+41' },
  { name: 'Syria', code: '+963' },
  { name: 'Taiwan', code: '+886' },
  { name: 'Tajikistan', code: '+992' },
  { name: 'Tanzania', code: '+255' },
  { name: 'Thailand', code: '+66' },
  { name: 'Timor-Leste', code: '+670' },
  { name: 'Togo', code: '+228' },
  { name: 'Tonga', code: '+676' },
  { name: 'Trinidad and Tobago', code: '+1' },
  { name: 'Tunisia', code: '+216' },
  { name: 'Turkey', code: '+90' },
  { name: 'Turkmenistan', code: '+993' },
  { name: 'Tuvalu', code: '+688' },
  { name: 'Uganda', code: '+256' },
  { name: 'Ukraine', code: '+380' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'Uruguay', code: '+598' },
  { name: 'Uzbekistan', code: '+998' },
  { name: 'Vanuatu', code: '+678' },
  { name: 'Vatican City', code: '+379' },
  { name: 'Venezuela', code: '+58' },
  { name: 'Vietnam', code: '+84' },
  { name: 'Yemen', code: '+967' },
  { name: 'Zambia', code: '+260' },
  { name: 'Zimbabwe', code: '+263' },
];

// Dial-code options: every country with its code, alphabetical by country name.
const DIAL_CODES = COUNTRY_DATA.map((c) => ({ code: c.code, name: c.name }));

const COUNTRIES = COUNTRY_DATA.map((c) => c.name);

function SearchableSelect({ id, options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const selected = options.find((o) => o.value === value);

  return (
    <div className="searchable-select" ref={containerRef}>
      <button
        type="button"
        id={id}
        className="form-select searchable-select-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? '' : 'searchable-select-placeholder'}>
          {selected ? selected.label : placeholder}
        </span>
      </button>
      {open && (
        <div className="searchable-select-panel">
          <input
            type="text"
            className="searchable-select-search"
            placeholder="Search country…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <ul className="searchable-select-list" role="listbox">
            {filtered.length ? (
              filtered.map((o) => (
                <li key={o.value}>
                  <button
                    type="button"
                    className={`searchable-select-option${o.value === value ? ' selected' : ''}`}
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                      setQuery('');
                    }}
                  >
                    {o.label}
                  </button>
                </li>
              ))
            ) : (
              <li className="searchable-select-empty">No matches found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dialCode: '',
    whatsapp: '',
    country: '',
    message: '',
  });
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

    if (!formData.dialCode) tempErrors.dialCode = 'Please select a country code.';

    if (!formData.whatsapp.trim()) {
      tempErrors.whatsapp = 'WhatsApp number is required.';
    } else if (!/^\d{6,15}$/.test(formData.whatsapp.trim())) {
      tempErrors.whatsapp = 'Please enter a valid number (digits only).';
    }

    if (!formData.country) tempErrors.country = 'Please select your country.';

    if (!formData.message.trim()) tempErrors.message = 'Please enter your message.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate form submission
      setIsSubmitted(true);
      setFormData({ name: '', email: '', dialCode: '', whatsapp: '', country: '', message: '' });
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
                  <label className="form-label">WhatsApp Number</label>
                  <div className="form-phone-row">
                    <div>
                      <select
                        id="contact-dial-code"
                        name="dialCode"
                        className="form-select"
                        value={formData.dialCode}
                        onChange={handleChange}
                        aria-label="Country code"
                      >
                        <option value="">Code</option>
                        {DIAL_CODES.map((d) => (
                          <option key={d.name} value={d.code}>{`${d.name} (${d.code})`}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        type="tel"
                        id="contact-whatsapp"
                        name="whatsapp"
                        className="form-input"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="7123456789"
                      />
                    </div>
                  </div>
                  {errors.dialCode && <div className="form-error">{errors.dialCode}</div>}
                  {errors.whatsapp && <div className="form-error">{errors.whatsapp}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-country">Country</label>
                  <SearchableSelect
                    id="contact-country"
                    options={COUNTRIES.map((c) => ({ value: c, label: c }))}
                    value={formData.country}
                    onChange={(val) => setFormData((prev) => ({ ...prev, country: val }))}
                    placeholder="Select your country"
                  />
                  {errors.country && <div className="form-error">{errors.country}</div>}
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
