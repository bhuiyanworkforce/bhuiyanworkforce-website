# Serbian translation notes

## 1. Files delivered and final checker output

Part A files delivered:

- `src/i18n/locales/sr.ui.js`
- `src/i18n/locales/sr.js`
- `src/content/sr/names.js`
- `src/content/sr/countries.js`
- `src/content/sr/services.js`
- `src/content/sr/posts.js`
- `src/content/sr/guides.js`
- `src/content/sr/pages.js`
- `TRANSLATION-NOTES.md`

This revision targets the newer repository structure. It adds the expanded 33-country SEO/content set, Slovenia, North Macedonia, Italy, Seychelles and Mauritius, five additional articles, new country UI keys, expanded service-country lists, and the revised About/FAQ content shape.

Final validation:

- `node scripts/check-translation.mjs sr --all`: **0 errors, 15 warnings**.
- `node --check`: passed for all 8 new Serbian JavaScript modules.
- The 15 remaining warnings are advisory SEO length recommendations for long service descriptions and long article/guide titles. No structural, number, contact, placeholder, script, banned-term, missing-country, missing-post, missing-SEO or markdown errors remain.
- `npm install` completed successfully. The repository reported existing dependency audit warnings; no dependency or existing source file was changed.

## 2. Glossary decisions

The requested glossary was followed consistently. Serbian Latin script and ekavian forms were used throughout, including `Bangladeš`, `radna snaga`, `regrutacija`, `poslodavac`, `slanje radnika`, `uža lista proverenih kandidata`, `praktični stručni test`, `lekarsko uverenje o sposobnosti`, `uverenje o nekažnjavanju`, `naknada za uspeh`, `garancija zamene`, `ugovor o radu`, `usklađenost`, and `zemlje Zaliva`.

Technical and system names such as BMET, GAMCA, WAFID, GCC, WMS, HVAC, ILO, Qiwa, MOHRE, Smart Card, NEOM, Red Sea Project and Diriyah were retained as required. The company and person names, URLs, contact details and file-facing slugs were not translated.

## 3. Source inconsistencies or legally sensitive sentences

- The English About content says that the company has “six service categories”, while the site data contains 25 services. This inconsistency was translated faithfully and not corrected.
- The English source uses regulated or legally loaded employment terminology in several articles and source descriptions. Serbian wording was kept faithful while avoiding the prohibited descriptions of the company as a regulated employment agency or mediation service.
- The source discusses licensed or registered partner organisations and immigration/work-permit procedures. These claims remain source claims and should receive local legal review before publication.
- The Privacy Policy and Terms pages are hard-coded Part B content and were not included in this Part A delivery. If translated, both require review by a lawyer and must remain governed by Bangladesh law as in English.

## 4. Non-literal translation choices

- Buttons, headings and short interface labels were shortened or recast where a direct English rendering would sound unnatural in Serbian.
- Formal plural address (`Vi`, `Vaš`, `Vaši`) was used for employer-facing copy.
- English technical and business expressions were rendered with established Serbian B2B wording where available, while retaining required certification and system names.
- Dates use lower-case Serbian month names, and the country/service/article copy uses Serbian country names and natural case agreement.

## 5. Items not translated

No Part A value was intentionally left untranslated except for required company names, person names, addresses, URLs, slugs, acronyms, certification/system names, technical codes and other allowed Latin-script items. Part B hard-coded page strings were not delivered in this round.

## 6. Part B status

Part B (`sr-extra-pages.json`) was not produced in this first delivery. It remains optional for the first round and requires extraction and translation of visible English strings from the seven hard-coded page components and the ContactForm service dropdown.
