import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './App';
import { parsePath } from './i18n/slugs.js';
import { LAZY_LANGS } from './i18n/lazyLangs.js';

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

// Arabic content is large, so it is not in the main bundle. A visitor on an /ar URL loads it
// first (the pre-rendered page is already on screen), so hydration sees the same strings the
// server used. Everyone else never downloads it.
async function start() {
  const { lang } = parsePath(globalThis.location.pathname);
  if (LAZY_LANGS.includes(lang)) await import('./i18n/ar-bundle.js');

  if (container.hasChildNodes() && renderedFor === here) {
    ReactDOM.hydrateRoot(container, tree);
  } else {
    container.textContent = '';
    ReactDOM.createRoot(container).render(tree);
  }
}

start();
