import { useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { getPageHead } from '../seo/getPageHead.js';
import { applyHeadToDocument } from '../seo/headHtml.js';
import { contentData } from '../seo/data.js';

// Keeps <head> and <html lang dir> right after client-side navigation, using the same
// getPageHead() the static generator used. Renders nothing; does nothing on the server.
export default function HeadSync() {
  const { route, status, urlLang, overlay, lang } = useLang();

  useEffect(() => {
    const head = status === 'ok'
      ? getPageHead(route, urlLang, contentData)
      : getPageHead({ type: 'notfound' }, urlLang, contentData);
    applyHeadToDocument(head);
    // Overlay (bn/it): the interface language changes, the page's SEO identity does not.
    if (overlay) document.documentElement.setAttribute('lang', lang);
  }, [route, status, urlLang, overlay, lang]);

  return null;
}
