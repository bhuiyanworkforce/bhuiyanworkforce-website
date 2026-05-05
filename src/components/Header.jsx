import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoSVG } from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                  = useLocation();
  const isHome                    = location.pathname === '/';
  const { lang }                  = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(globalThis.scrollY > 50);
    globalThis.addEventListener('scroll', onScroll, { passive: true });
    return () => globalThis.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      globalThis.location.href = '/#' + id;
    }
  };

  return (
    <>
      <header className={`header${scrolled || !isHome ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="header-logo" aria-label="Bhuiyan Workforce Ltd. — Home">
              <LogoSVG variant="light" width={180} />
            </Link>

            <nav className="header-nav" aria-label="Main navigation">
              <button onClick={() => scrollTo('services')}>{t('nav_services', lang)}</button>
              <Link to="/countries">{t('nav_countries', lang)}</Link>
              <Link to="/capabilities">{t('nav_capabilities', lang)}</Link>
              <Link to="/about">{t('nav_about', lang)}</Link>
              <button onClick={() => scrollTo('why-us')}>{t('nav_why_us', lang)}</button>
              <Link to="/faq">{t('nav_faq', lang)}</Link>
              <Link to="/blog">{t('nav_blog', lang)}</Link>
            </nav>

            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <LanguageSwitcher />
              <button className="btn btn-primary" onClick={() => scrollTo('contact')}>
                {t('nav_get_started', lang)}
              </button>
            </div>

            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 16px' }}>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close">×</button>
          <LanguageSwitcher />
        </div>
        <button onClick={() => scrollTo('services')}>{t('nav_services', lang)}</button>
        <Link to="/countries">{t('nav_countries', lang)}</Link>
        <Link to="/capabilities">{t('nav_capabilities', lang)}</Link>
        <Link to="/apply">{t('nav_apply', lang)}</Link>
        <Link to="/about">{t('nav_about', lang)}</Link>
        <button onClick={() => scrollTo('why-us')}>{t('nav_why_us', lang)}</button>
        <Link to="/faq">{t('nav_faq', lang)}</Link>
        <Link to="/blog">{t('nav_blog', lang)}</Link>
        <button className="btn btn-primary" onClick={() => scrollTo('contact')} style={{ fontSize: '1rem', padding: '16px 40px' }}>
          {t('nav_get_started', lang)}
        </button>
      </nav>
    </>
  );
}
