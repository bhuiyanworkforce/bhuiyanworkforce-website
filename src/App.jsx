import React from 'react';
import { LanguageProvider, useLang } from './i18n/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import HeadSync from './components/HeadSync';
import ScrollReveal from './components/ScrollReveal';
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
import FounderPage from './pages/FounderPage';
import NotFoundPage from './pages/NotFoundPage';
import { pageKeyFor, LazyPage } from './pageLoaders';

// Which component renders which route. The route itself (page, country, service, ...)
// comes from the shared route module, so URLs in every language resolve the same way.
// /bn is a Bengali worker landing page and /bn/about a short worker-focused About page;
// every other language shows the main pages. Pages that few visitors open (application form,
// capabilities, guides, legal, Bengali pages) live in their own chunks: see src/pageLoaders.jsx.
const PAGE_COMPONENTS = {
  home: HomePage,
  about: AboutPage,
  faq: FAQPage,
  blog: BlogPage,
  countries: CountriesPage,
  founder: FounderPage,
};

const ENTITY_COMPONENTS = {
  country: CountryPage,
  service: ServicePage,
  post: BlogPostPage,
};

function Routed() {
  const { route, status, urlLang } = useLang();
  if (status !== 'ok') return <NotFoundPage />;
  const key = pageKeyFor(route, urlLang);
  if (key) return <LazyPage pageKey={key} />;
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
