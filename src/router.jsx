import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';

// Pages Import
import Home from './pages/Home';
import WhatIsUKMLA from './pages/WhatIsUKMLA';
import Eligibility from './pages/Eligibility';
import ExamPattern from './pages/ExamPattern';
import AKT from './pages/AKT';
import CPSA from './pages/CPSA';
import Syllabus from './pages/Syllabus';
import Preparation from './pages/Preparation';
import UKMLAvsPLAB from './pages/UKMLAvsPLAB';
import RegistrationGuide from './pages/RegistrationGuide';
import ResultsScoring from './pages/ResultsScoring';
import KeyDates from './pages/KeyDates';
import AppealsResits from './pages/AppealsResits';
import OfficialResources from './pages/OfficialResources';
import Glossary from './pages/Glossary';
import News from './pages/News';
import FAQs from './pages/FAQs';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// Context for Router
const NavigationContext = createContext(null);

// Custom Navigation Event Name
const NAV_EVENT = 'ukmla_navigation';

export function navigate(url) {
  window.history.pushState({}, '', url);
  const navEvent = new CustomEvent(NAV_EVENT, { detail: url });
  window.dispatchEvent(navEvent);
}

export function Link({ to, children, className, onClick, ...props }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    
    // Check if open in new tab, external link, or default prevent
    if (
      !e.defaultPrevented &&
      e.button === 0 && // left click
      (!props.target || props.target === '_self') && // normal target
      !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) // no modifier keys
    ) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export function useRouter() {
  return useContext(NavigationContext);
}

// Router config containing metadata for SEO and components
export const routes = [
  {
    path: '/',
    component: Home,
    title: 'UKMLA - UK Medical Licensing Assessment Guide',
    description: 'An independent educational resource providing detailed, up-to-date guides, eligibility details, and exam format breakdowns for the UK Medical Licensing Assessment (UKMLA / MLA).',
    keywords: ['ukmla', 'uk medical licensing assessment', 'gmc exam', 'medical students', 'international medical graduates'],
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "UKMLA Informational Website",
      "url": "https://ukmla-info.org.uk/"
    }
  },
  {
    path: '/what-is-ukmla',
    component: WhatIsUKMLA,
    title: 'What is the UKMLA? Overview & Purpose | UKMLA',
    description: 'Learn what the UK Medical Licensing Assessment (UKMLA) is, who it applies to, the core competency blueprint set by the GMC, and how it ensures clinical safety.',
    keywords: ['what is ukmla', 'ukmla guide', 'gmc licensing', 'mla content map'],
    breadcrumbs: [{ name: 'What is UKMLA', path: '/what-is-ukmla' }]
  },
  {
    path: '/eligibility',
    component: Eligibility,
    title: 'UKMLA Eligibility: UK Students & IMGs Explained | UKMLA',
    description: 'Detailed UKMLA eligibility checklist for UK medical students, EU graduates, and International Medical Graduates (IMGs). Find answers to common doubts.',
    keywords: ['ukmla eligibility', 'who takes ukmla', 'img registration uk', 'medical student exam eligibility'],
    breadcrumbs: [{ name: 'Eligibility', path: '/eligibility' }]
  },
  {
    path: '/exam-pattern',
    component: ExamPattern,
    title: 'UKMLA Exam Pattern: AKT & CPSA Format | UKMLA',
    description: 'Detailed analysis of the two components of the UKMLA: the Applied Knowledge Test (AKT) and the Clinical and Professional Skills Assessment (CPSA).',
    keywords: ['ukmla exam pattern', 'akt', 'cpsa', 'osce', 'sba questions'],
    breadcrumbs: [{ name: 'Exam Pattern', path: '/exam-pattern' }]
  },
  {
    path: '/exam-pattern/akt',
    component: AKT,
    title: 'Applied Knowledge Test (AKT) Structure & Marking | UKMLA',
    description: 'A deep-dive review of the UKMLA Applied Knowledge Test (AKT) format: MS AKT for UK medical students vs PLAB 1 format for IMGs.',
    keywords: ['ukmla akt', 'applied knowledge test', 'plab 1', 'ms akt', 'sba format'],
    breadcrumbs: [
      { name: 'Exam Pattern', path: '/exam-pattern' },
      { name: 'AKT', path: '/exam-pattern/akt' }
    ]
  },
  {
    path: '/exam-pattern/cpsa',
    component: CPSA,
    title: 'Clinical & Professional Skills Assessment (CPSA) Guide | UKMLA',
    description: 'Understand the Clinical and Professional Skills Assessment (CPSA) component of the UKMLA: OSCE structure, UK school criteria, and PLAB 2.',
    keywords: ['ukmla cpsa', 'clinical professional skills assessment', 'osce', 'plab 2', 'gmc Manchester'],
    breadcrumbs: [
      { name: 'Exam Pattern', path: '/exam-pattern' },
      { name: 'CPSA', path: '/exam-pattern/cpsa' }
    ]
  },
  {
    path: '/syllabus',
    component: Syllabus,
    title: 'UKMLA Syllabus: Content Map & Core Presentations | UKMLA',
    description: 'Explore the General Medical Council (GMC) MLA Content Map. List of clinical conditions, presentations, professional behaviours, and skills assessed.',
    keywords: ['ukmla syllabus', 'mla content map', 'gmc syllabus', 'clinical conditions'],
    breadcrumbs: [{ name: 'Syllabus', path: '/syllabus' }]
  },
  {
    path: '/preparation',
    component: Preparation,
    title: 'UKMLA Preparation Guide: Study Plans & Best Resources | UKMLA',
    description: 'A comprehensive study plan for the UKMLA. Learn how to prepare for AKT and CPSA, the best free study resources, and major mistakes to avoid.',
    keywords: ['ukmla preparation', 'how to pass ukmla', 'study plan', 'preparation resources'],
    breadcrumbs: [{ name: 'Preparation', path: '/preparation' }]
  },
  {
    path: '/ukmla-vs-plab',
    component: UKMLAvsPLAB,
    title: 'UKMLA vs PLAB: Transition Roadmap & Differences | UKMLA',
    description: 'Understand how the PLAB test transitions into the UKMLA framework for International Medical Graduates. Detailed comparative guide.',
    keywords: ['ukmla vs plab', 'plab transition', 'does ukmla replace plab', 'img guide'],
    breadcrumbs: [{ name: 'UKMLA vs PLAB', path: '/ukmla-vs-plab' }]
  },
  {
    path: '/registration-guide',
    component: RegistrationGuide,
    title: 'GMC Registration Guide for IMGs: Step-by-Step | UKMLA',
    description: 'Step-by-step pathway for international medical graduates to achieve UK GMC registration via PLAB (UKMLA-aligned path), EPIC, and English criteria.',
    keywords: ['gmc registration guide', 'epic verification', 'plab pathway', 'ielts oet requirements'],
    breadcrumbs: [{ name: 'Registration Guide', path: '/registration-guide' }]
  },
  {
    path: '/results-and-scoring',
    component: ResultsScoring,
    title: 'UKMLA Results, Scoring & Standard Setting | UKMLA',
    description: 'Demystifying the UKMLA scoring system. Learn about the Angoff method for AKT, Borderline Regression for CPSA, and pass marks.',
    keywords: ['ukmla results', 'ukmla pass mark', 'angoff method', 'borderline regression'],
    breadcrumbs: [{ name: 'Results & Scoring', path: '/results-and-scoring' }]
  },
  {
    path: '/key-dates',
    component: KeyDates,
    title: 'Key Dates & Timeline: Transition to UKMLA | UKMLA',
    description: 'Detailed timeline of the UKMLA rollout, including initial implementation, standard compliance dates, and future updates for all candidates.',
    keywords: ['ukmla dates', 'ukmla transition timeline', 'plab exam dates'],
    breadcrumbs: [{ name: 'Key Dates', path: '/key-dates' }]
  },
  {
    path: '/appeals-and-resits',
    component: AppealsResits,
    title: 'UKMLA Appeals, Resits & Reasonable Adjustments | UKMLA',
    description: 'Practical guidance on UKMLA attempt limits, resitting procedures, reasonable adjustments, and mitigating circumstances for candidates.',
    keywords: ['ukmla resit limit', 'plab attempt limits', 'reasonable adjustments gmc', 'appeals'],
    breadcrumbs: [{ name: 'Appeals & Resits', path: '/appeals-and-resits' }]
  },
  {
    path: '/official-resources',
    component: OfficialResources,
    title: 'Official GMC & MSC Resources & Downloads | UKMLA',
    description: 'A curated list of official General Medical Council (GMC) and Medical Schools Council (MSC) files, content map downloads, and practice resources.',
    keywords: ['official ukmla resources', 'gmc content map pdf', 'msc practice questions'],
    breadcrumbs: [{ name: 'Official Resources', path: '/official-resources' }]
  },
  {
    path: '/glossary',
    component: Glossary,
    title: 'Glossary of UKMLA, GMC & Medical Exam Terms | UKMLA',
    description: 'Definitions of key medical licensing terms including OSCE, OSLER, SBA, AKT, CPSA, GMC, and MSC.',
    keywords: ['ukmla glossary', 'medical acronyms', 'osce meaning', 'angoff definition'],
    breadcrumbs: [{ name: 'Glossary', path: '/glossary' }]
  },
  {
    path: '/news',
    component: News,
    title: 'UKMLA News & Updates: Latest Changes | UKMLA',
    description: 'Stay updated with the latest announcements, updates, and structural adjustments for the UKMLA from the GMC and Medical Schools Council.',
    keywords: ['ukmla news', 'gmc updates', 'exam syllabus changes'],
    breadcrumbs: [{ name: 'News & Updates', path: '/news' }]
  },
  {
    path: '/faqs',
    component: FAQs,
    title: 'UKMLA FAQs: Answers to 75+ Common Questions | UKMLA',
    description: 'Comprehensive FAQ directory addressing common candidate queries regarding UKMLA, PLAB transition, scoring, eligibility, and preparation.',
    keywords: ['ukmla faqs', 'plab questions', 'gmc licensing query', 'medical exam faq'],
    breadcrumbs: [{ name: 'FAQs', path: '/faqs' }]
  },
  {
    path: '/about',
    component: About,
    title: 'About This Resource: Independent UKMLA Platform | UKMLA',
    description: 'Learn about the mission of this independent informational resource for UKMLA candidates and our commitment to factual accuracy.',
    keywords: ['about ukmla guide', 'independent medical guide', 'ukmla research source'],
    breadcrumbs: [{ name: 'About Us', path: '/about' }]
  },
  {
    path: '/contact',
    component: Contact,
    title: 'Contact Us - Questions & Feedback | UKMLA',
    description: 'Get in touch with us for questions, corrections, or suggestions regarding the UKMLA informational resource. Brand-neutral support.',
    keywords: ['contact ukmla guide', 'medical exam feedback', 'queries contact'],
    breadcrumbs: [{ name: 'Contact', path: '/contact' }]
  },
  {
    path: '/privacy',
    component: Privacy,
    title: 'Privacy Policy & Data Security | UKMLA',
    description: 'Our privacy commitments, user data policies, and GDPR compliance parameters regarding contact queries and browsing.',
    keywords: ['privacy policy', 'cookie compliance', 'data protection'],
    breadcrumbs: [{ name: 'Privacy Policy', path: '/privacy' }]
  }
];

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleCustomNav = (e) => {
      setCurrentPath(e.detail);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener(NAV_EVENT, handleCustomNav);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener(NAV_EVENT, handleCustomNav);
    };
  }, []);

  // Normalize path by stripping trailing slash unless it is root '/'
  const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

  // Match the route
  const currentRoute = useMemo(() => {
    return routes.find(r => r.path === normalizedPath) || {
      component: NotFound,
      title: 'Page Not Found (404) | UKMLA',
      description: 'The page you are looking for does not exist. Return to the homepage for the full UKMLA guide.',
      breadcrumbs: [{ name: '404 Not Found', path: '/404' }]
    };
  }, [normalizedPath]);

  // Run SEO Head and Schema updates on route change
  useEffect(() => {
    // 1. Update document title
    document.title = currentRoute.title;

    // 2. Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = currentRoute.description;

    // 3. Inject Structured Schema JSON-LD
    let schemaScript = document.getElementById('seo-schema');
    if (schemaScript) {
      schemaScript.remove();
    }

    const breadcrumbListSchema = currentRoute.breadcrumbs ? {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://ukmla-info.org.uk/"
        },
        ...currentRoute.breadcrumbs.map((bc, idx) => ({
          "@type": "ListItem",
          "position": idx + 2,
          "name": bc.name,
          "item": `https://ukmla-info.org.uk${bc.path}`
        }))
      ]
    } : null;

    const pageSchema = currentRoute.schema || breadcrumbListSchema;

    if (pageSchema) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-schema';
      schemaScript.type = 'application/ld+json';
      schemaScript.innerHTML = JSON.stringify(pageSchema);
      document.head.appendChild(schemaScript);
    }

    // 4. Scroll to top
    window.scrollTo(0, 0);

  }, [normalizedPath, currentRoute]);

  const PageComponent = currentRoute.component;

  return (
    <NavigationContext.Provider value={{ currentPath, setCurrentPath }}>
      <PageComponent />
    </NavigationContext.Provider>
  );
}
export default Router;
