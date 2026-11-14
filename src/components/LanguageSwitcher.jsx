import React, { useState, useRef, useEffect } from 'react';
import { Link as RRLink, useNavigate as useRRNavigate } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import { OVERLAY_LANGUAGES, t } from '../i18n/translations';
import { LOCALES } from '../i18n/config';
import { getLanguageLinks } from '../routes.js';
import { buildPath } from '../i18n/slugs.js';
import { isLangLoaded } from '../i18n/lazyLangs.js';

// Real languages are plain <a href> links to the same page in that language (present in the
// static HTML, so crawlers and no-JS visitors can follow them). Bengali and Italian are a
// separate, labelled group: an in-place interface overlay on the English URL.
export default function LanguageSwitcher() {
  const { lang, urlLang, route, status, overlay, setOverlay } = useLang();
  const navigate = useRRNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const links = getLanguageLinks(status === 'ok' ? route : null, urlLang);
  const currentCode = overlay || urlLang;
  const current = LOCALES[currentCode];

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const itemStyle = (active) => ({
    width: '100%', textAlign: 'start', padding: '9px 16px',
    display: 'flex', alignItems: 'center', gap: 10, boxSizing: 'border-box',
    background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
    border: 'none', color: active ? 'var(--gold)' : 'rgba(255,255,255,0.8)',
    fontSize: '0.85rem', cursor: 'pointer', fontWeight: active ? 700 : 400,
    fontFamily: 'inherit', textDecoration: 'none',
  });

  const groupLabel = {
    padding: '8px 16px 4px', fontSize: '0.68rem', letterSpacing: '0.08em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
  };

  const pickOverlay = (code) => {
    // From /ar or /pl the overlay applies to the English version of the same page.
    if (urlLang !== 'en') navigate(status === 'ok' ? buildPath('en', route) : '/');
    setOverlay(code);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t('lang.change', lang)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.06)',
          color: 'var(--white)', fontSize: '0.8rem', fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
        }}
      >
        <span aria-hidden="true">{current.flag}</span>
        <span className="lang-label">{current.label}</span>
        <span aria-hidden="true" style={{ opacity: 0.6, fontSize: '0.65rem', marginInlineStart: 2 }}>▾</span>
      </button>

      {/* Always in the DOM (hidden when closed) so the links exist in the generated HTML. */}
      <div
        hidden={!open}
        aria-label={t('lang.select', lang)}
        style={{
          position: 'absolute', top: 'calc(100% + 8px)', insetInlineEnd: 0,
          background: 'var(--navy-deep, #081e3f)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, padding: '6px 0', minWidth: 190,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 999,
        }}
      >
        <div style={groupLabel}>{t('lang.site', lang)}</div>
        {links.map((l) => (
          <RRLink
            key={l.code}
            to={l.href}
            lang={l.hreflang}
            hrefLang={l.hreflang}
            // A language whose content is not loaded yet needs a full page load (the pre-rendered
            // page for that URL is served, and main.jsx loads the content before hydrating).
            reloadDocument={!isLangLoaded(l.code)}
            dir={l.dir}
            title={l.fallback && !l.current ? t('lang.fallback', lang) : undefined}
            aria-current={l.current && !overlay ? 'true' : undefined}
            onClick={() => { setOpen(false); if (l.code === 'en') setOverlay(null); }}
            style={itemStyle(l.current && !overlay)}
          >
            <span aria-hidden="true">{LOCALES[l.code].flag}</span>
            <span>{l.label}</span>
            {l.current && !overlay && <span aria-hidden="true" style={{ marginInlineStart: 'auto', fontSize: '0.7rem' }}>✓</span>}
          </RRLink>
        ))}

        <div style={{ ...groupLabel, marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
          {t('lang.overlay', lang)}
        </div>
        {OVERLAY_LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => pickOverlay(l.code)}
            aria-pressed={overlay === l.code}
            style={itemStyle(overlay === l.code)}
          >
            <span aria-hidden="true">{LOCALES[l.code].flag}</span>
            <span>{l.label}</span>
            {overlay === l.code && <span aria-hidden="true" style={{ marginInlineStart: 'auto', fontSize: '0.7rem' }}>✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
