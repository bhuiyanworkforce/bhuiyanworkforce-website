import React, { useState } from 'react';
import ContactForm from './ContactForm';
import EmployerRequestForm from './EmployerRequestForm';
import { useLang } from '../i18n/LanguageContext';
import { t } from '../i18n/translations';

// The homepage contact section: the general enquiry form and the structured employer request.
export default function ContactTabs() {
  const { lang } = useLang();
  const [mode, setMode] = useState('general');

  const tab = (id, label) => {
    const active = mode === id;
    return (
      <button
        type="button" role="tab" id={`ct-tab-${id}`} aria-selected={active} aria-controls="ct-panel"
        onClick={() => setMode(id)}
        style={{
          flex: 1, padding: '10px 14px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem',
          fontWeight: active ? 700 : 500, background: active ? 'var(--gold, #c9a84c)' : 'transparent',
          color: active ? '#0f2347' : 'inherit', border: '1px solid var(--gold, #c9a84c)', borderRadius: 8,
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      <div role="tablist" style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {tab('general', t('er.tab_general', lang))}
        {tab('workers', t('er.tab_workers', lang))}
      </div>
      <div role="tabpanel" id="ct-panel" aria-labelledby={`ct-tab-${mode}`}>
        {mode === 'general' ? <ContactForm /> : <EmployerRequestForm />}
      </div>
    </div>
  );
}
