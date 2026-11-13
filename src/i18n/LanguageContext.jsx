import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { resolvePath } from '../routes.js';
import { LOCALES } from './config.js';

// The language comes from the URL. There is no localStorage and no browser-language
// detection. Bengali and Italian are an in-place overlay on English URLs only: it lives in
// memory and resets on reload.

const HOME = { type: 'page', id: 'home' };

const LanguageContext = createContext({
  lang: 'en', urlLang: 'en', dir: 'ltr', arrow: '→', route: HOME, status: 'ok',
  params: {}, overlay: null, setOverlay: () => {},
});

export function LanguageProvider({ children }) {
  const { pathname } = useLocation();
  const [overlay, setOverlay] = useState(null);

  const value = useMemo(() => {
    const { lang: urlLang, route, status } = resolvePath(pathname);
    const activeOverlay = urlLang === 'en' ? overlay : null;
    const lang = activeOverlay || urlLang;
    const dir = LOCALES[lang]?.dir || 'ltr';
    const params = route && route.id !== 'home' ? { slug: route.id } : {};
    return {
      lang,            // language of the UI strings (overlay or URL language)
      urlLang,         // language of the URL, used for links and <head>
      dir,
      arrow: dir === 'rtl' ? '←' : '→', // "forward" arrow for the current reading direction
      route: route || HOME,
      status,
      params,
      overlay: activeOverlay,
      setOverlay,
    };
  }, [pathname, overlay]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useLang() {
  return useContext(LanguageContext);
}
