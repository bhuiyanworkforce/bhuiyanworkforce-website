import React from 'react';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import HeadSync from './components/HeadSync';
import ScrollReveal from './components/ScrollReveal';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BengaliHomePage from './pages/BengaliHomePage';
import BengaliAboutPage from './pages/BengaliAboutPage';
import { BengaliCountryPage, BengaliServicePage } from './pages/BengaliTopicPages';
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
import WorkerGuidePage from './pages/WorkerGuidePage';
import FounderPage from './pages/FounderPage';
import CountryGuidePage from './pages/CountryGuidePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Which component renders which route. The route itself (page, country, service, ...)
// comes from the shared route module, so URLs in every language resolve the same way.
// /bn is a Bengali worker landing page and /bn/about a short worker-focused About page;
// every other language shows the main pages.
function HomeRoute() {
  const { urlLang } = useLang();
  return urlLang === 'bn' ? <BengaliHomePage /> : <HomePage />;
}

function AboutRoute() {
  const { urlLang } = useLang();
  return urlLang === 'bn' ? <BengaliAboutPage /> : <AboutPage />;
}

const PAGE_COMPONENTS = {
  home: HomeRoute,
  about: AboutRoute,
  faq: FAQPage,
  blog: BlogPage,
  countries: CountriesPage,
  capabilities: CapabilitiesPage,
  'employer-guide': EmployerGuidePage,
  privacy: PrivacyPage,
  terms: TermsPage,
  apply: WorkerApplicationPage,
  'worker-guide': WorkerGuidePage,
  founder: FounderPage,
};

function CountryRoute() {
  const { urlLang } = useLang();
  return urlLang === 'bn' ? <BengaliCountryPage /> : <CountryPage />;
}
function ServiceRoute() {
  const { urlLang } = useLang();
  return urlLang === 'bn' ? <BengaliServicePage /> : <ServicePage />;
}

const ENTITY_COMPONENTS = {
  country: CountryRoute,
  service: ServiceRoute,
  post: BlogPostPage,
  guide: CountryGuidePage,
};

function Routed() {
  const { route, status } = useLang();
  if (status !== 'ok') return <NotFoundPage />;
  const Component = route.type === 'page' ? PAGE_COMPONENTS[route.id] : ENTITY_COMPONENTS[route.type];
  return Component ? <Component /> : <NotFoundPage />;
}

// The router (BrowserRouter on the client, StaticRouter on the server) wraps <App />
// in main.jsx / entry-server.jsx.
export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <HeadSync />
      <ScrollReveal />
      <Header />
      <main>
        <Routed />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
