# Language integration — Greek, Croatian, Serbian, Bosnian, Italian (+ Bulgarian base)

Built on top of `bhuiyanworkforce-website-main (23)` + the Bulgarian delta. Result of `npm run build:static`:
965/965 pages, `verify-pages` OK, `npm run test:seo` 29/29.
Pages per language: en 89 · ar 82 · pl 82 · bg 89 · ro 89 · el 89 · hr 89 · sr 89 · bs 89 · mk 89 · it 89.

## What changed in shared code
- `src/i18n/config.js`: el, hr, sr (hreflang `sr-Latn`), bs, it added as real languages; Italian is no longer an overlay.
- `src/i18n/slugs.js`: el/hr/sr/bs use English slugs (like bg/ar); Italian has its own translated slugs.
- `src/i18n/lazyLangs.js`, `locales/index.js`, `main.jsx`, `entry-server.jsx`, `scripts/*`: new bundles registered.
- `src/i18n/staticPageText.js`: now reads the column named after the language (was hard-wired to `bg`); new `hasStaticPageTranslations()`.
- `src/components/ContactForm.jsx`: service dropdown uses `hasStaticPageTranslations(lang)` instead of `lang === 'bg'`.
- `scripts/sync-static-translations.mjs` replaces `sync-bg-static-translations.mjs` (handles bg, el, hr, sr, bs). Run it after editing any `<lang>-extra-pages.json`.
- New bundles: `src/i18n/{el,hr,sr,bs}-bundle.js`; Italian bundle from the Italian wiring package.

## Fixes made to the delivered translations
- Greek and Croatian were translated from an older English version. Corrected:
  - Service pages listed Libya, Brunei, Japan and South Korea (not on the current English site). Lists now match English.
  - FAQ said a shortlist in "5–10 working days"; English says 7. Fixed.
  - Added missing Countries-page UI labels (`cn.*`), country names for the 5 newer countries, full `areaServed` list.
- Added the three `apply.*` upload-error strings to el, hr, sr, bs, it.
- Added small `<Tx>` supplements (blog labels, region labels, footer) for el, sr, bs, it so no English leaks on those pages.

## Legal pages (Nov 16 update 3)
- Privacy and Terms are published in bg, ro, el, hr, sr, bs, it. Greek, Croatian, Bosnian and Italian had paragraphs that were still English or lagged the current English (new upload/Cloudflare paragraph, "Last updated: November 2026", governing-law and company-description wording, Terms intro, section 11 anti-fraud paragraph). Those were translated in this update and added to `<lang>-extra-pages.json`. **They are not lawyer-proofed yet: proof before relying on them.**
- The Terms section 11 (anti-fraud / "only communicates through official channels") paragraph was English in every language, including bg, sr and ro. Fixed for all seven.
- Italian and Romanian now also use the static page localizer (their JSON covers raw JSX text that the older Tx tables missed), and gaps in their Tx tables are filled from the JSON.
- Bangladeshi statute names (Contract Act 1872, ICT Act 2006, Digital Security Act 2018) stay in English in hr, it, ro, as delivered; the lawyer may want local-language renderings.

## Greek and Croatian completed (Nov 16 update 4)
- Greek: translated Slovenia, North Macedonia, Italy, Seychelles, Mauritius and the 5 articles (Poland work permits, Saudi quotas, UAE wages/Emiratisation, Malaysia reopening, Czech employee card), plus names and SEO head entries.
- Croatian: translated the 5 countries. Its 5 articles already existed but were not listed; I corrected them (the opening paragraph that duplicated the excerpt was removed, one stray bold removed) and added their SEO head entries.
- All of the new text is machine-translated by Claude and not reviewed by a native speaker; checker passes with 0 errors. Have a native reader skim the legal-sensitive wording (visa fees, permit names, penalties) before relying on it.
- Both languages now have 89 pages, same as English.

## Macedonian added (Nov 17 update 5)
- The first-pass pack was not usable (checker: 797 errors; `countries.js` was entirely Arabic, services had Arabic leftovers, every article was cut short). I rewrote it: all 33 country pages, all 18 articles in full, the Arabic leftovers in services, all SEO head entries, the 3 `apply.*` upload messages and one missing form label. Part B (`mk-extra-pages.json`, 477 rows) was kept as delivered, with the BMET licence claim removed.
- Wired like the other languages: `/mk`, hreflang `mk`, English slugs, own bundle, sitemap, tests. 89 pages, same as English; Privacy and Terms are published (their text matches the current English, but is **not lawyer-proofed**).
- Checker: 1 remaining message, `pages.about.team[0].name` (the founder's name stays in Latin script; same known false positive as Bulgarian).
- All Macedonian text I wrote is unreviewed by a native speaker. Terminology follows the mk glossary in `scripts/translation-profiles.mjs`. Get a native reader to check it before launch, especially visa terms, fees and penalty figures.

## Removed
The BMET licence claim ("licence in process — expected October 2026") and the dependent "In the meantime…" wording, in English and all languages. The translation prompt template no longer calls the company "BMET-registered".

## Open items for you
- About page says "six service categories" while the site lists 25 (flagged by every translator).
- Partner "licensed / government-registered" claims need verification before launch.
- Run `npm install && npm run build:static` locally before deploying.
