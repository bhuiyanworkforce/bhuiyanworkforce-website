import React from 'react';
import { Link } from '../i18n/router';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

export default function NotFoundPage() {
  const { lang } = useLang();
  return (
    <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
      <div>
        <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>404</div>
        <h1 style={{ margin: '1rem 0 0.5rem' }}>{t('nf.title', lang)}</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>{t('nf.text', lang)}</p>
        <Link to="/" className="btn btn-primary">{t('nf.back', lang)}</Link>
      </div>
    </section>
  );
}
