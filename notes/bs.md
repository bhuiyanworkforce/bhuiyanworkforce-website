# TRANSLATION-NOTES.md

## 1. Files delivered and final checker output

The ZIP contains the eight requested Bosnian ES modules, this report, and `bs-extra-pages.json`:

- `src/i18n/locales/bs.ui.js`
- `src/i18n/locales/bs.js`
- `src/content/bs/names.js`
- `src/content/bs/countries.js`
- `src/content/bs/services.js`
- `src/content/bs/posts.js`
- `src/content/bs/guides.js`
- `src/content/bs/pages.js`
- `TRANSLATION-NOTES.md`
- `bs-extra-pages.json`

`node --check` passed for all eight JavaScript modules. The required final run, `node scripts/check-translation.mjs bs --all`, reported **0 errors and 0 warnings**. SEO descriptions were additionally checked against the written 120–160-character target, and titles were checked for uniqueness and length. No existing English, Arabic, application-code, or other source files were modified.

## 2. Glossary decisions

The principal glossary choices are `regrutacija radnika` for recruitment, `slanje radnika` for deployment, `usklađenost` for compliance, `uža lista provjerenih kandidata` for shortlist, and `praktični stručni test` for trade test. No deliberate glossary departure is intended.

## 3. Source inconsistencies and legal sensitivities

- The supplied brief describes 28 country records and a 24-name `areaServed` list, but the updated English archive and its checker use 33 countries. The Bosnian metadata follows the updated English order and 33-country checker requirement.
- The About-page source says “six service categories” while the site contains 25 service entries.
- The company description in the supplied role text characterizes the company as BMET-registered, while the About-page source says, “Our BMET recruitment licence is in process — expected October 2026.” Confirm the intended status before publication.
- The About page describes partner agencies as licensed or registered. This is a legally sensitive representation and should be reviewed by local counsel.
- Privacy and Terms retain Bangladesh governing-law references. Both legal texts require review by a lawyer before publication; they have not been adapted to Bosnian, EU, or GDPR law.

## 4. Non-literal translation choices

Wording was adjusted where necessary for natural, formal Bosnian rather than mirroring English word order. `Deployment` is consistently rendered as `slanje radnika`; SEO country descriptions use a country-name lead-in to avoid awkward case-dependent constructions. The company name and technical acronyms remain in Latin script as required.

## 5. Anything not translated and review limits

Part A is complete against the updated archive’s structural checker. `CountriesPage.jsx` was not added to Part B: the component refers to `cn.*` translation keys for which no English values were found in the English UI locale, so the source text cannot be copied faithfully without an engineer supplying the intended labels. No independent qualified Bosnian legal or copyeditor review has been obtained; the clean checker result verifies structure and configured rules, not native-language quality or legal accuracy.

## 6. Part B status

`bs-extra-pages.json` contains 436 manually translated text-fragment entries drawn from BlogPage, EmployerGuidePage, CapabilitiesPage, WorkerApplicationPage, PrivacyPage, TermsPage, and ContactForm. CountriesPage remains the source-data gap described above. Privacy and Terms are included but require lawyer review before use.
