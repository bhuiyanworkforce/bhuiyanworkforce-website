import React, { useState, useRef, useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { LANGUAGES } from '../i18n/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.06)',
          color: 'var(--white)', fontSize: '0.8rem', fontWeight: 600,
          cursor: 'pointer', transition: 'all 0.2s',
          fontFamily: 'inherit',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{ opacity: 0.6, fontSize: '0.65rem', marginLeft: 2 }}>▾</span>
      </button>

      {open && (
        <ul
          role="menu"
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
            background: 'var(--navy-deep, #081e3f)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, padding: '6px 0',
            minWidth: 140, listStyle: 'none', margin: 0,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            zIndex: 999,
          }}
        >
          {LANGUAGES.map(l => (
            <li key={l.code}>
              <button
                role="menuitem"
                aria-checked={l.code === lang}
                onClick={() => { setLang(l.code); setOpen(false); }}
                style={{
                  width: '100%', textAlign: 'left', padding: '9px 16px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: l.code === lang ? 'rgba(201,168,76,0.12)' : 'transparent',
                  border: 'none', color: l.code === lang ? 'var(--gold)' : 'rgba(255,255,255,0.8)',
                  fontSize: '0.85rem', cursor: 'pointer', fontWeight: l.code === lang ? 700 : 400,
                  fontFamily: 'inherit', transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (l.code !== lang) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { if (l.code !== lang) e.currentTarget.style.background = 'transparent'; }}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
                {l.code === lang && <span style={{ marginLeft: 'auto', fontSize: '0.7rem' }}>✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
