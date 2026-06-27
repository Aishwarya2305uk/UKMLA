import React, { useState, useEffect, useRef } from 'react';
import { Link, useRouter, routes, navigate } from '../router';

const searchIndex = [
  { path: '/', title: 'Home', text: 'An independent educational resource providing detailed, up-to-date guides, eligibility details, and exam format breakdowns for the UKMLA.' },
  { path: '/what-is-ukmla', title: 'What is the UKMLA?', text: 'Learn what the UK Medical Licensing Assessment is, who needs to take it, and the core GMC Content Map framework.' },
  { path: '/eligibility', title: 'UKMLA Eligibility', text: 'Eligibility requirements for UK medical students, international medical graduates (IMGs), and common FAQs.' },
  { path: '/exam-pattern', title: 'UKMLA Exam Pattern', text: 'Structure of the UKMLA, comprising the Applied Knowledge Test (AKT) and Clinical & Professional Skills Assessment (CPSA).' },
  { path: '/exam-pattern/akt', title: 'Applied Knowledge Test (AKT)', text: 'Format of the written component. Multi-choice Single Best Answer (SBA) questions. MS AKT vs PLAB 1 differences.' },
  { path: '/exam-pattern/cpsa', title: 'Clinical & Professional Skills Assessment (CPSA)', text: 'Format of the clinical skills exam. OSCE structured test. OSLER and PLAB 2 stations in Manchester.' },
  { path: '/syllabus', title: 'UKMLA Syllabus & Content Map', text: 'The official GMC MLA Content Map listing core patient presentations, conditions, and practical procedures.' },
  { path: '/preparation', title: 'Preparation Guide & Study Plan', text: 'Best practices, free practice tests, learning resources, and mistakes to avoid for passing the AKT and CPSA.' },
  { path: '/ukmla-vs-plab', title: 'UKMLA vs PLAB Comparison', text: 'Differences between UKMLA and PLAB. Detailed explanation of how PLAB is now fully aligned to the MLA content map.' },
  { path: '/registration-guide', title: 'IMG GMC Registration Guide', text: 'Step-by-step pathway for international medical graduates, including EPIC credentials, English testing, and PLAB.' },
  { path: '/results-and-scoring', title: 'Results, Scoring & Standard Setting', text: 'Understanding the Angoff method and Borderline Regression standard setting models used to score the MLA.' },
  { path: '/key-dates', title: 'Key Dates & Implementation Timeline', text: 'Important milestones for the rollout of the UKMLA from 2024 through the upcoming 2026 revisions.' },
  { path: '/appeals-and-resits', title: 'Appeals, Resits & Adjustments', text: 'Attempt limits, mitigating circumstances, reasonable adjustments, and how to appeal a licensing decision.' },
  { path: '/official-resources', title: 'Official Downloads & Links', text: 'Direct links to official GMC, MSC, and primary resources, blueprints, guides, and compliance reports.' },
  { path: '/glossary', title: 'Glossary of UKMLA Terms', text: 'Definitions for acronyms and terms like SBA, OSCE, OSLER, Angoff, borderline regression, and GMC.' },
  { path: '/news', title: 'News & Updates', text: 'Latest announcements, content map changes, and licensing regulation updates from UK medical councils.' },
  { path: '/faqs', title: 'Frequently Asked Questions (FAQs)', text: 'More than 75 comprehensive answers regarding UKMLA, PLAB transition, eligibility, and formatting.' },
  { path: '/about', title: 'About This Resource', text: 'Information about this independent, brand-neutral educational platform for UKMLA candidates.' },
  { path: '/contact', title: 'Contact Us', text: 'Simple contact form to reach out with licensing questions, corrections, or candidate feedback.' },
  { path: '/privacy', title: 'Privacy Policy', text: 'Data handling, cookie compliance, and GDPR parameters regarding contact submissions.' }
];

// Primary masthead navigation — kept deliberately minimal.
const primaryNav = [
  { path: '/', label: 'Home' },
  { path: '/syllabus', label: 'Syllabus' },
  { path: '/faqs', label: 'FAQ' },
  { path: '/news', label: 'Posts' }
];

// Everything else lives in the expandable sidebar drawer, grouped into sections.
const drawerSections = [
  {
    heading: 'Understand',
    links: [
      { path: '/what-is-ukmla', label: 'What is UKMLA?' },
      { path: '/eligibility', label: 'Eligibility' },
      { path: '/ukmla-vs-plab', label: 'UKMLA vs PLAB' },
      { path: '/glossary', label: 'Glossary of Terms' }
    ]
  },
  {
    heading: 'The Exam',
    links: [
      { path: '/exam-pattern', label: 'Exam Pattern' },
      { path: '/exam-pattern/akt', label: 'Applied Knowledge Test (AKT)' },
      { path: '/exam-pattern/cpsa', label: 'Clinical Skills (CPSA)' },
      { path: '/results-and-scoring', label: 'Results & Scoring' }
    ]
  },
  {
    heading: 'Prepare',
    links: [
      { path: '/preparation', label: 'Preparation Guide' },
      { path: '/registration-guide', label: 'GMC Registration Guide' },
      { path: '/key-dates', label: 'Key Dates & Timeline' },
      { path: '/appeals-and-resits', label: 'Appeals & Resits' },
      { path: '/official-resources', label: 'Official Resources' }
    ]
  },
  {
    heading: 'Resource',
    links: [
      { path: '/news', label: 'News & Updates' },
      { path: '/about', label: 'About this Site' },
      { path: '/contact', label: 'Contact Support' },
      { path: '/privacy', label: 'Privacy Policy' }
    ]
  }
];

export default function Layout({ children }) {
  const { currentPath } = useRouter() || { currentPath: window.location.pathname };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Close drawer and search results on path change
  useEffect(() => {
    setSidebarOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  }, [currentPath]);

  // Lock body scroll while the drawer is open, and close it on Escape.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [sidebarOpen]);

  // Click outside search listener
  useEffect(() => {
    const clickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  // Scroll-reveal: fade + move-up elements as they enter the viewport.
  // Re-runs per page so freshly rendered content animates in. Respects
  // the user's reduced-motion preference (no hiding, no observer).
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.querySelector('.main-content');
    if (!root) return;

    const selector = [
      '.section-title',
      '.grid-cards .card',
      '.callout',
      '.related-links',
      '.faq-item',
      '.glossary-term-card',
      '.table-container',
      '.contact-form-container',
      '.content-figure',
      '.page-header'
    ].join(', ');

    const frame = requestAnimationFrame(() => {
      const els = Array.from(root.querySelectorAll(selector));
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
      );

      els.forEach((el, i) => {
        el.classList.add('reveal');
        // Light stagger within groups for a flowing entrance.
        el.style.setProperty('--rd', `${(i % 5) * 70}ms`);
        io.observe(el);
      });

      // Stash so the cleanup can disconnect.
      root._revealObserver = io;
    });

    return () => {
      cancelAnimationFrame(frame);
      const r = document.querySelector('.main-content');
      if (r && r._revealObserver) {
        r._revealObserver.disconnect();
        delete r._revealObserver;
      }
    };
  }, [currentPath]);

  // Dynamic Table of Contents generation with Scroll Spy to utilize sidebar space
  useEffect(() => {
    // Wait for the page content to finish mounting/painting
    const timer = setTimeout(() => {
      const article = document.querySelector('.article-container');
      const sidebar = document.querySelector('.sidebar-container');
      if (!article || !sidebar) return;

      // Avoid rendering TOC on index/home page or layout lists
      const existingToc = sidebar.querySelector('.sidebar-toc-section');
      if (existingToc) existingToc.remove();

      // Find all H2 headings inside standard article
      const headings = Array.from(article.querySelectorAll('h2')).filter(h => {
        // Exclude headings inside widgets
        return !h.closest('.faq-accordion') && !h.closest('.glossary-terms') && !h.closest('.related-links');
      });
      if (headings.length === 0) return;

      // Create TOC container
      const tocSection = document.createElement('div');
      tocSection.className = 'sidebar-toc-section';
      tocSection.style.marginTop = '28px';
      tocSection.style.paddingTop = '20px';
      tocSection.style.borderTop = '1px solid var(--border-color)';

      const tocTitle = document.createElement('h3');
      tocTitle.className = 'sidebar-title';
      tocTitle.innerText = 'On This Page';
      tocSection.appendChild(tocTitle);

      const tocLinks = document.createElement('ul');
      tocLinks.className = 'sidebar-links';
      tocLinks.style.display = 'flex';
      tocLinks.style.flexDirection = 'column';
      tocLinks.style.gap = '8px';

      headings.forEach((heading, idx) => {
        // Set unique ID for scrolling anchors
        if (!heading.id) {
          heading.id = 'section-heading-' + idx;
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.className = 'sidebar-link';
        a.innerText = heading.innerText;
        a.style.fontSize = '14px';
        a.style.fontWeight = '500';
        a.style.color = 'var(--text-muted)';
        a.style.cursor = 'pointer';
        a.style.display = 'block';

        a.onclick = (e) => {
          e.preventDefault();
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, '', '#' + heading.id);
        };

        li.appendChild(a);
        tocLinks.appendChild(li);
      });

      tocSection.appendChild(tocLinks);
      sidebar.appendChild(tocSection);

      // Scroll Spy to highlight the currently active section in the sidebar
      const handleScrollSpy = () => {
        const scrollPosition = window.scrollY + 160;
        let activeIdx = 0;

        headings.forEach((heading, idx) => {
          if (scrollPosition >= heading.offsetTop) {
            activeIdx = idx;
          }
        });

        const links = tocLinks.querySelectorAll('.sidebar-link');
        links.forEach((link, idx) => {
          if (idx === activeIdx) {
            link.style.color = 'var(--brand-secondary)';
            link.style.fontWeight = '600';
            link.style.fontStyle = 'italic';
          } else {
            link.style.color = 'var(--text-muted)';
            link.style.fontWeight = '500';
            link.style.fontStyle = 'normal';
          }
        });
      };

      window.addEventListener('scroll', handleScrollSpy);
      handleScrollSpy(); // Trigger immediately to highlight first item

      // Stash callback for cleanup
      article._scrollSpyHandler = handleScrollSpy;
    }, 120);

    return () => {
      clearTimeout(timer);
      const article = document.querySelector('.article-container');
      if (article && article._scrollSpyHandler) {
        window.removeEventListener('scroll', article._scrollSpyHandler);
        delete article._scrollSpyHandler;
      }
    };
  }, [currentPath]);

  // Handle Search Input Change
  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const matched = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q.toLowerCase()) ||
        item.text.toLowerCase().includes(q.toLowerCase())
    );
    setSearchResults(matched);
  };

  // Build Breadcrumbs
  const getBreadcrumbs = () => {
    const route = routes.find((r) => r.path === currentPath);
    if (!route || currentPath === '/') return null;
    return route.breadcrumbs || [];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="app-container">
      {/* Abstract decorative background (kept behind every page) */}
      <div className="bg-abstract" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <span className="blob blob-4" />
        <span className="blob blob-5" />
      </div>

      {/* Editorial notice ribbon */}
      <div className="gmc-alert-banner" role="alert">
        <strong>Important notice:</strong> Core exam dates, fees, and requirements shift. Verify details on the{' '}
        <a href="https://www.gmc-uk.org/education/standards-guidance-and-curricula/projects/medical-licensing-assessment" target="_blank" rel="noopener noreferrer">
          Official GMC MLA Page
        </a>{' '}
        before registration.
      </div>

      {/* Sticky Masthead */}
      <header className="site-header">
        <div className="header-container">
          {/* Sidebar (sections) toggle */}
          <button
            className="sidebar-toggle"
            aria-label="Open all sections"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="sidebar-toggle-label">Sections</span>
          </button>

          <Link to="/" className="logo-link">
            <img src="/logo.png" alt="UKMLA logo" className="logo-img" />
            <span>UKMLA</span>
          </Link>

          {/* Primary masthead navigation */}
          <nav className="nav-menu" aria-label="Primary">
            {primaryNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${currentPath === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Component */}
          <div className="search-container" ref={searchRef}>
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search…"
              className="search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((item) => (
                  <div
                    key={item.path}
                    className="search-result-item"
                    onClick={() => {
                      navigate(item.path);
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                  >
                    <div className="search-result-title">{item.title}</div>
                    <div className="search-result-snippet">{item.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Expandable Sidebar Drawer (all sections) */}
      <div
        className={`drawer-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />
      <aside className={`drawer ${sidebarOpen ? 'open' : ''}`} aria-label="All sections" aria-hidden={!sidebarOpen}>
        <div className="drawer-header">
          <span className="drawer-kicker">The Index</span>
          <button className="drawer-close" aria-label="Close sections" onClick={() => setSidebarOpen(false)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="drawer-nav">
          <div className="drawer-section">
            <h2 className="drawer-section-title">Main</h2>
            <ul className="drawer-links">
              {primaryNav.map((item) => (
                <li key={'drawer-' + item.path}>
                  <Link
                    to={item.path}
                    className={`drawer-link ${currentPath === item.path ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {drawerSections.map((section) => (
            <div className="drawer-section" key={section.heading}>
              <h2 className="drawer-section-title">{section.heading}</h2>
              <ul className="drawer-links">
                {section.links.map((link) => (
                  <li key={link.path + link.label}>
                    <Link
                      to={link.path}
                      className={`drawer-link ${currentPath === link.path ? 'active' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Breadcrumb path */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={bc.path}>
                <span className="breadcrumb-separator">/</span>
                {idx === breadcrumbs.length - 1 ? (
                  <span>{bc.name}</span>
                ) : (
                  <Link to={bc.path}>{bc.name}</Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {children}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <h3 className="footer-column-title">Understand</h3>
            <ul className="footer-links">
              <li><Link to="/what-is-ukmla">What is UKMLA?</Link></li>
              <li><Link to="/eligibility">Eligibility</Link></li>
              <li><Link to="/ukmla-vs-plab">UKMLA vs PLAB</Link></li>
              <li><Link to="/glossary">Glossary</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-column-title">The Exam</h3>
            <ul className="footer-links">
              <li><Link to="/exam-pattern">Exam Pattern</Link></li>
              <li><Link to="/exam-pattern/akt">AKT Details</Link></li>
              <li><Link to="/exam-pattern/cpsa">CPSA Details</Link></li>
              <li><Link to="/syllabus">Content & Syllabus</Link></li>
              <li><Link to="/results-and-scoring">Results & Scoring</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-column-title">Prepare</h3>
            <ul className="footer-links">
              <li><Link to="/preparation">Preparation Guide</Link></li>
              <li><Link to="/key-dates">Key Dates</Link></li>
              <li><Link to="/official-resources">Official Resources</Link></li>
              <li><Link to="/faqs">FAQs Hub</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-column-title">Resource</h3>
            <ul className="footer-links">
              <li><Link to="/about">About this Site</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/news">News Updates</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <p style={{ marginBottom: '8px', lineHeight: '1.4' }}>
              <strong>Disclaimer:</strong> This is a neutral, independent educational platform. We are not official representatives of the GMC or MSC. All official criteria, syllabus content maps, and regulatory actions are managed by the General Medical Council.
            </p>
            <p>© {new Date().getFullYear()} UKMLA Informational Guide. Licensed under brand-neutral terms.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
