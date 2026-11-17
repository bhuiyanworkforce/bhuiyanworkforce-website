import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './App';
import { parsePath } from './i18n/slugs.js';

const container = document.getElementById('root');

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Pages produced by scripts/generate-pages.mjs carry the path they were rendered for.
// Hydrate only when that matches the URL we are on; anything else (404.html served at an
// arbitrary URL, `vite dev`, a stale file) is rendered fresh instead of hydrating mismatched HTML.
const here = globalThis.location.pathname.replace(/\/+$/, '') || '/';
const renderedFor = container.getAttribute('data-ssr-path');

// Arabic and Polish content is large, so it is not in the main bundle. A visitor on an /ar or /pl URL loads it
// first (the pre-rendered page is already on screen), so hydration sees the same strings the
// server used. Everyone else never downloads it.
async function start() {
  const { lang } = parsePath(globalThis.location.pathname);
  if (lang === 'ar') await import('./i18n/ar-bundle.js');
  else if (lang === 'pl') await import('./i18n/pl-bundle.js');
  else if (lang === 'bg') await import('./i18n/bg-bundle.js');
  else if (lang === 'ro') await import('./i18n/ro-bundle.js');
  else if (lang === 'el') await import('./i18n/el-bundle.js');
  else if (lang === 'hr') await import('./i18n/hr-bundle.js');
  else if (lang === 'sr') await import('./i18n/sr-bundle.js');
  else if (lang === 'bs') await import('./i18n/bs-bundle.js');
  else if (lang === 'mk') await import('./i18n/mk-bundle.js');
  else if (lang === 'it') await import('./i18n/it-bundle.js');

  if (container.hasChildNodes() && renderedFor === here) {
    ReactDOM.hydrateRoot(container, tree);
  } else {
    container.textContent = '';
    ReactDOM.createRoot(container).render(tree);
  }
}

start();
