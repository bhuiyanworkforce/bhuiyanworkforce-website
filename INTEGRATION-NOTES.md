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

## Spanish and Malay added (Nov 17 update 6)
- **Spanish (`/es`)**: full language, 89 pages (same as English). Part A (incl. all 18 articles) plus Part B (`es-extra-pages.json`, 477 rows) wired like Macedonian: own bundle, English slugs, hreflang `es`, sitemap, tests. `node scripts/check-translation.mjs es --all`: 0 errors, 0 warnings.
- Fixes to the delivered Spanish: added the 3 `apply.*` upload-error strings; removed the "BMET licence in process — expected October 2026" sentence from the Capabilities row of `es-extra-pages.json` (the claim was already removed from English and every other language).
- **Malay (`/ms`)**: 66 pages: home, about, FAQ, countries index, capabilities, apply, privacy, terms, 33 country pages, 25 service pages. Part B for those pages is in `ms-extra-pages.json` (399 rows: apply 151, capabilities 68, privacy 100, terms 55, contact-form service names 25); no fallbacks to English in the build report. Not published yet (stay English-only; links to them go to the English page): blog index and 18 articles (skipped on request), employer guide and its 3 country guides (to be added later).
  - `check-translation ms --all` still reports 39 errors, all the missing blog content (18 articles, 18 SEO overrides, blog index entry).
  - To finish Malay: translate `posts.js` and the BlogPage and EmployerGuidePage rows of Part B, append the rows to `ms-extra-pages.json`, run `node scripts/sync-static-translations.mjs ms`, then add `page:blog`, `page:employer-guide`, `guide:*` and `post:*` to `MS_TRANSLATED` and `post: msPosts` in `ms-bundle.js`.
  - Malay Part B (including Privacy and Terms) is machine-translated and not lawyer-proofed. The Terms page keeps the source's "Last updated: May 2026".
- Capabilities PDFs for es and ms: `public/capabilities-{es,ms}.pdf` exist and are registered in `SHEET_LANGS`.
- Result: `npm run build:static` 1116/1116 pages, `verify-pages` OK, `test:seo` all pass. Spanish and Malay are machine-translated and not native-reviewed; Privacy/Terms (Spanish) are not lawyer-proofed.

## German, Hungarian and Portuguese (Portugal) added (Nov 17 update 7)
- **`/de`, `/hu`, `/pt`**: real languages (hreflang `de`, `hu`, `pt`; og:locale `de_DE`, `hu_HU`, `pt_PT`), English slugs like bg/es/ms, own lazy bundles (`src/i18n/{de,hu,pt}-bundle.js`), registered in `config.js`, `slugs.js`, `lazyLangs.js`, `locales/index.js`, `main.jsx`, `entry-server.jsx` and the three scripts that import bundles.
- **69 pages each**: home, About, FAQ, countries index, Capabilities, Apply, Privacy, Terms, 33 countries, 25 services, 3 country employer guides (Saudi Arabia, UAE, Poland). Route lists: `src/i18n/locales/{de,hu,pt}.translated.js`.
- **Not published yet (links fall back to the English page):** blog index and 18 articles, employer-guide index (blog excluded on request; the guide index needs its Part B rows from `es-extra-pages.json`). When delivered: append the rows to `<lang>-extra-pages.json`, run `node scripts/sync-static-translations.mjs <lang>`, add the route keys to the `*_TRANSLATED` list and update the page count in `scripts/test-seo.mjs`.
- No capabilities PDF for de, hu, pt: they link to the English `/capabilities.pdf` (listed in `NO_SHEET_YET` in test-seo).
- Fix to delivered Portuguese: removed unneeded bidi isolate marks (LRI/PDI) around the phone number and email in the FAQ.
- Checks run here: `npm run test:seo` 30/30. `check-translation <lang> --all`: de 36 errors, hu 36, pt 18, all of them the missing blog posts and blog SEO entries; the rest are SEO length warnings. **`npm run build:static` was not run** (no network in this environment, so vite and react-router-dom could not be installed). Run `npm install && npm run build:static` before deploying.
- Machine-translated, not native-reviewed. Have a native reader check legal-sensitive wording: the About page's "licensed/registered" partner claims (all three), "unregulated intermediaries" (hu), visa/permit names and fees. The About page's "six service categories" vs 25 services is still unfixed in the source and was translated faithfully.

## Update 8: six-categories fix and Part B for de, hu, pt
- **About page "six service categories"**: the English source said "all six service categories" while the site lists 25. Changed to **25** in English (`src/content/pages.js`) and in all 15 translations (ar, bg, bs, el, es, hr, it, mk, ms, pl, ro, sr, de, hu, pt). `scripts/prompt-template.md` still mentions the example as a known issue; update it if you reuse the template.
- **Capabilities, Apply, Privacy, Terms and the contact-form service names** are now translated in de, hu, pt: `de-extra-pages.json`, `hu-extra-pages.json`, `pt-extra-pages.json` (399 rows each, same English rows as `es-extra-pages.json` minus Blog and Employer Guide), generated into `src/i18n/<lang>-static-page-translations.js` and registered in each bundle like Spanish. Country names in the Apply form come from each language's `names.js`.
- Wording follows each language's glossary; `translation-profiles` banned/warn term scan of the new rows is clean (no «Arbeitnehmerüberlassung», «munkaközvetítés», «agência de emprego» and similar). The English "acts as a recruitment intermediary" in Terms §5 is rendered as «supports employers and candidates in recruitment» in all three languages, to avoid a regulated term; a lawyer should confirm.
- Capabilities PDFs: `public/capabilities-{de,hu,pt}.pdf` exist and are registered in `SHEET_LANGS`.
- **Still unreviewed:** Privacy and Terms in de/hu/pt are machine-translated and not lawyer-proofed; Bangladeshi statute names (Contract Act 1872, ICT Act 2006, Digital Security Act 2018) keep the English name with a local rendering in brackets in pt/hu and are unchanged in de.
- **Source issue found:** the Terms page says "Last updated: May 2026" although Terms §11 (anti-fraud) was added later in Nov 2026; the Privacy page says November 2026. Translations follow the source. Decide whether Terms should say November 2026 and change English first.
- Checks: `npm run test:seo` 30/30; `check-translation` for de/hu/pt: only the missing-blog errors remain. `npm run build:static` still has to be run on a machine with network access.
