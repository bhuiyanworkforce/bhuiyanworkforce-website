import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ServicePage from './pages/ServicePage';
import CountriesPage from './pages/CountriesPage';
import CountryPage from './pages/CountryPage';
import EmployerGuidePage from './pages/EmployerGuidePage';
import WorkerApplicationPage from './pages/WorkerApplicationPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import CountryGuidePage from './pages/CountryGuidePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

const PAGE_META = {
  '/':          { title: 'Bhuiyan Workforce Ltd. — Ethical Global Recruitment from Bangladesh', description: 'Connecting skilled Bangladeshi workers with employers across 25+ countries. BMET-compliant, transparent, and fast. Gulf, Europe & Southeast Asia.' },
  '/countries': { title: 'Countries We Deploy To — Bhuiyan Workforce Ltd.', description: 'Full details on deploying Bangladeshi workers to 25+ countries including Gulf, Europe, and Southeast Asia.' },
  '/about':     { title: 'About Us — Bhuiyan Workforce Ltd.', description: 'Learn about Bhuiyan Workforce Ltd., our story, team, and commitment to ethical recruitment and worker welfare.' },
  '/faq':       { title: 'FAQ — Bhuiyan Workforce Ltd.', description: 'Answers to common questions from employers and workers about our manpower recruitment process, fees, and compliance.' },
  '/blog':      { title: 'Blog — Bhuiyan Workforce Ltd.', description: 'Industry insights on overseas employment, ethical recruitment, Gulf labour markets, and European workforce trends.' },
  '/apply':     { title: 'Apply for Work Abroad — Bhuiyan Workforce Ltd.', description: 'Register your interest in overseas employment with Bhuiyan Workforce Ltd.' },
  '/capabilities': { title: 'Capabilities — Bhuiyan Workforce Ltd.', description: 'Our full capabilities, worker categories, and deployment destinations.' },
  '/privacy':   { title: 'Privacy Policy — Bhuiyan Workforce Ltd.', description: 'How Bhuiyan Workforce Ltd. handles your personal data.' },
  '/terms':     { title: 'Terms of Service — Bhuiyan Workforce Ltd.', description: 'Terms and conditions for use of the Bhuiyan Workforce website and services.' },
};

function MetaUpdater() {
  const location = useLocation();
  useEffect(() => {
    const meta = PAGE_META[location.pathname] || PAGE_META['/'];
    document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', 'https://bhuiyanworkforce.com' + location.pathname);
  }, [location]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <MetaUpdater />
        <Header />
        <main>
          <Routes>
            <Route path="/"                     element={<HomePage />} />
            <Route path="/about"                element={<AboutPage />} />
            <Route path="/faq"                  element={<FAQPage />} />
            <Route path="/blog"                 element={<BlogPage />} />
            <Route path="/blog/:slug"           element={<BlogPostPage />} />
            <Route path="/services/:slug"       element={<ServicePage />} />
            <Route path="/countries"            element={<CountriesPage />} />
            <Route path="/countries/:slug"      element={<CountryPage />} />
            <Route path="/employer-guide"       element={<EmployerGuidePage />} />
            <Route path="/employer-guide/:slug" element={<CountryGuidePage />} />
            <Route path="/apply"                element={<WorkerApplicationPage />} />
            <Route path="/capabilities"         element={<CapabilitiesPage />} />
            <Route path="/privacy"              element={<PrivacyPage />} />
            <Route path="/terms"               element={<TermsPage />} />
            <Route path="*"                    element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </LanguageProvider>
  );
}
