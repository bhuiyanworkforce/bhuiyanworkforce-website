import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { LANGUAGES } from './translations';

const LanguageContext = createContext({ lang: 'en', setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const stored = localStorage.getItem('bw_lang');
    if (stored && LANGUAGES.some(l => l.code === stored)) return stored;
    const browser = navigator.language?.slice(0, 2);
    if (browser === 'bn') return 'bn';
    if (browser === 'ar') return 'ar';
    if (browser === 'it') return 'it';
    if (browser === 'pl') return 'pl';
    return 'en';
  });

  const setLang = (code) => {
    setLangState(code);
    localStorage.setItem('bw_lang', code);
  };

  // Set document direction for Arabic
  useEffect(() => {
    const dir = LANGUAGES.find(l => l.code === lang)?.dir || 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
