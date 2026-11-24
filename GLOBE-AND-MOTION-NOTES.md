# Hero globe + scroll reveal

## What was added
- `src/components/globe/engine.js` - dependency-free canvas globe (about 15 KB, loaded as its own chunk).
- `src/components/HeroGlobe.jsx` - decides after hydration whether to show it; renders nothing on the server.
- `src/data/geo.js` - country coordinates, now shared by `WorldMap.jsx` and the globe.
- `src/data/globeLand.js` - GENERATED land dots. Edit outlines in `scripts/generate-globe-land.mjs`, then run `node scripts/generate-globe-land.mjs`.
- `src/components/ScrollReveal.jsx` + CSS at the end of `src/styles.css` - reveal-on-scroll for headings and cards.
- `src/pages/HomePage.jsx` - mounts `<HeroGlobe />`; the hero photo shrinks into an inset once the globe has faded in.
- Deleted the stray 1-byte `public/images/services/A`.

## Visitor safeguards
- Server HTML is unchanged (the photo stays in the pre-rendered page, so SEO and LCP are unaffected).
- No globe below 901px wide, on Data Saver, or on 2G: those visitors keep the photo and download nothing extra.
- Loads only when the browser is idle. Pauses when off-screen or in a background tab.
- Reduced motion or <=2 cores / <=2 GB RAM: one still frame, no animation.
- If frames get slow it lowers its resolution, then settles on a still frame.
- Scroll reveal skips anything visible on load, skips reduced-motion visitors, and is disabled for print.

## Not done (needs network access, which was unavailable)
1. Self-host the map data: `curl -o public/countries-110m.json https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`, set `GEO_URL = '/countries-110m.json'` in `src/components/WorldMap.jsx`, then drop `https://cdn.jsdelivr.net` from `connect-src` in `public/_headers`.
2. Self-host fonts: `npm i @fontsource-variable/dm-sans @fontsource/playfair-display`, import them in `src/main.jsx`, remove the Google Fonts `<link>`s from `index.html`, and remove `fonts.googleapis.com` / `fonts.gstatic.com` from the CSP in `public/_headers`.
3. Run `npm install && npm run build:static && npm run test:seo` once before deploying.
