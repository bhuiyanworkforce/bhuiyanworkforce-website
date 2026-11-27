import { useEffect } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { getPageHead } from '../seo/getPageHead.js';
import { applyHeadToDocument } from '../seo/headHtml.js';
import { contentData } from '../seo/data.js';
import { useGuidesReady } from '../data/countryGuides.jsx';

// Keeps <head> and <html lang dir> right after client-side navigation, using the same
// getPageHead() the static generator used. Renders nothing; does nothing on the server.
export default function HeadSync() {
  const { route, status, urlLang, overlay, lang } = useLang();
  const needsGuide = status === 'ok' && route.type === 'guide';
  const guidesReady = useGuidesReady(needsGuide); // only guide pages need the guide text for their <head>

  useEffect(() => {
    if (needsGuide && !guidesReady) return; // head for a guide page needs the guide text
    const head = status === 'ok'
      ? getPageHead(route, urlLang, contentData)
      : getPageHead({ type: 'notfound' }, urlLang, contentData);
    applyHeadToDocument(head);
    // Overlay (bn/it): the interface language changes, the page's SEO identity does not.
    if (overlay) document.documentElement.setAttribute('lang', lang);
  }, [route, status, urlLang, overlay, lang, needsGuide, guidesReady]);

  return null;
}
