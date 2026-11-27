import React, { useEffect, useSyncExternalStore } from 'react';

// Pages that most visitors never open are not part of the main bundle. Each one is its own chunk, fetched
// on demand. To keep server-rendered HTML hydratable, the browser loads the chunk for the page it is on
// BEFORE hydrating (main.jsx), and the static build registers every page up front (entry-server.jsx).
const LOADERS = {
  'page:apply': () => import('./pages/WorkerApplicationPage'),
  'page:capabilities': () => import('./pages/CapabilitiesPage'),
  'page:worker-guide': () => import('./pages/WorkerGuidePage'),
  'page:employer-guide': () => import('./pages/EmployerGuidePage'),
  'page:privacy': () => import('./pages/PrivacyPage'),
  'page:terms': () => import('./pages/TermsPage'),
  guide: () => import('./pages/CountryGuidePage'),
  'bn-home': () => import('./pages/BengaliHomePage'),
  'bn-about': () => import('./pages/BengaliAboutPage'),
  'bn-country': () => import('./pages/BengaliTopicPages').then((m) => ({ default: m.BengaliCountryPage })),
  'bn-service': () => import('./pages/BengaliTopicPages').then((m) => ({ default: m.BengaliServicePage })),
};

const PAGE_IDS = ['apply', 'capabilities', 'worker-guide', 'employer-guide', 'privacy', 'terms'];

// Which on-demand chunk (if any) renders this route. null = the page is in the main bundle.
export function pageKeyFor(route, urlLang) {
  if (!route) return null;
  const bn = urlLang === 'bn';
  if (route.type === 'page') {
    if (route.id === 'home') return bn ? 'bn-home' : null;
    if (route.id === 'about') return bn ? 'bn-about' : null;
    return PAGE_IDS.includes(route.id) ? `page:${route.id}` : null;
  }
  if (route.type === 'guide') return 'guide';
  if (route.type === 'country') return bn ? 'bn-country' : null;
  if (route.type === 'service') return bn ? 'bn-service' : null;
  return null;
}

const cache = new Map();
const pending = new Map();
const listeners = new Set();

export function registerPage(key, Component) {
  cache.set(key, Component);
}

export function preloadPage(key) {
  if (!key || cache.has(key)) return Promise.resolve();
  if (!pending.has(key)) {
    pending.set(key, LOADERS[key]().then((m) => {
      cache.set(key, m.default);
      listeners.forEach((fn) => fn());
    }).catch(() => { pending.delete(key); })); // a failed fetch can be retried on the next visit
  }
  return pending.get(key);
}

const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };

export function LazyPage({ pageKey }) {
  const Component = useSyncExternalStore(subscribe, () => cache.get(pageKey), () => cache.get(pageKey));
  useEffect(() => { if (!Component) preloadPage(pageKey); }, [Component, pageKey]);
  return Component ? <Component /> : null;
}
