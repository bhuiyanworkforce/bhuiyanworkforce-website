import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import './i18n/ar-bundle.js'; // static pages are rendered with Arabic loaded
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
