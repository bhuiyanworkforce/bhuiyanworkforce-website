import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import App from './App';

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

if (container.hasChildNodes() && renderedFor === here) {
  ReactDOM.hydrateRoot(container, tree);
} else {
  container.textContent = '';
  ReactDOM.createRoot(container).render(tree);
}
