# Performance update — 27 Nov 2026

Source: Cloudflare Web Analytics for the last 7 days (LCP 86% good, INP only 37% good, CLS shifts on the
countries grid and hero). `npm run build:static` → 1436/1436 pages, `verify-pages` OK, `npm run test:seo` 34/34.
Hydration was also checked in a real Chromium on 20 pages plus three client-side navigations: no errors.

## What changed, and why
| Change | Files | Targets |
|---|---|---|
| Fixed a hydration failure on the home pages (/, /bg, /ar, ...). Inline `<style>` text was escaped by the server, so React threw the server HTML away and re-rendered the whole page in the browser. | `src/pages/HomePage.jsx`, `src/pages/CapabilitiesPage.jsx` | render delay, INP |
| English employer-guide text (about 350 kB) loads only on country and guide pages | `src/data/countryGuides.jsx`, `guidesSource.js`, `guidesStub.js`, `vite.config.js`, `src/main.jsx`, `src/components/HeadSync.jsx`, `src/pages/CountryPage.jsx`, `src/pages/CountryGuidePage.jsx` | INP, LCP |
| Rarely opened pages (apply, capabilities, worker guide, employer guide, privacy, terms, guide pages, Bengali pages) are separate chunks, loaded before hydration | `src/pageLoaders.jsx`, `src/App.jsx`, `src/entry-server.jsx`, `src/main.jsx` | INP, LCP |
| Fonts self-hosted (variable WOFF2), metric-matched fallback fonts, preload of the two main files | `public/fonts/*`, `src/styles.css`, `index.html`, `public/_headers` | CLS (hero), LCP |
| Pages written as `about.html` instead of `about/index.html`, so Cloudflare Pages serves the canonical `/about` without a 308 redirect | `scripts/generate-pages.mjs`, `scripts/verify-pages.mjs` | TTFB |
| Map placeholder sized to the map's 900x500 ratio | `src/pages/HomePage.jsx` | CLS (countries grid) |
| Language switcher in the mobile menu mounts only when the menu is open | `src/components/Header.jsx` | INP |

Main JavaScript file: 887 kB (299 kB gzipped) → 412 kB (115 kB gzipped).

## After deploying: check these
1. `curl -sI https://bhuiyanworkforce.com/about` should return `200`, not `308`. If it returns 308, revert the two
   `scripts/*.mjs` changes (the rest is independent of it).
2. Open the home page, a country page, a guide page, /apply and /bn on a phone.
3. Watch INP, LCP, CLS and TTFB in Cloudflare Web Analytics for a few days. Traffic is low, so the numbers are noisy.

## Not changed
- Arabic and Bengali pages still load their own fonts from Google (the CSP still allows it).
- English posts/countries/services data remain in the main bundle (needed on the home page and for page titles).
