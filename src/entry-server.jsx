import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import './i18n/ar-bundle.js'; // static pages are rendered with Arabic and Polish loaded
import './i18n/pl-bundle.js';
import './i18n/bg-bundle.js';
import './i18n/ro-bundle.js';
import './i18n/el-bundle.js';
import './i18n/hr-bundle.js';
import './i18n/sr-bundle.js';
import './i18n/bs-bundle.js';
import './i18n/mk-bundle.js';
import './i18n/it-bundle.js';
import './i18n/es-bundle.js';
import './i18n/ms-bundle.js';
import './i18n/de-bundle.js';
import './i18n/hu-bundle.js';
import './i18n/pt-bundle.js';
import './i18n/bn-bundle.js';
import App from './App';
import { contentData } from './seo/data.js';
import { getFallbackReport, clearFallbacks } from './content/fallbacks.js';

// Used by scripts/generate-pages.mjs. `path` is the URL pathname; an unknown path renders the
// 404 page.
export function render(path) {
  return renderToString(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>
  );
}

export const data = contentData;
export { getFallbackReport, clearFallbacks };
