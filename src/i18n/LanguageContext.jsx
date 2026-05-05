import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { LANGUAGES } from './translations';

const LanguageContext = createContext({ lang: 'en', setLang: () => {} });

function getInitialLang() {
  const stored = localStorage.getItem('bw_lang');
  if (stored && LANGUAGES.some(l => l.code === stored)) return stored;
  const browser = navigator.language?.slice(0, 2);
  if (browser === 'bn') return 'bn';
  if (browser === 'ar') return 'ar';
  if (browser === 'it') return 'it';
  if (browser === 'pl') return 'pl';
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((code) => {
    setLangState(code);
    localStorage.setItem('bw_lang', code);
  }, []);

  useEffect(() => {
    const dir = LANGUAGES.find(l => l.code === lang)?.dir || 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useLang() {
  return useContext(LanguageContext);
}
