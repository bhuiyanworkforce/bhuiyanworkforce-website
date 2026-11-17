# Greek translation notes — Part A

## 1. Files delivered and final checker output

Delivered the nine Part A files: `src/i18n/locales/el.ui.js`, `src/i18n/locales/el.js`, `src/content/el/names.js`, `src/content/el/countries.js`, `src/content/el/services.js`, `src/content/el/posts.js`, `src/content/el/guides.js`, `src/content/el/pages.js`, and this report (`TRANSLATION-NOTES.md`).

Final result of `node scripts/check-translation.mjs el --all`:

```text
check-translation (el): 0 error(s), 0 warning(s)
```

All newly created `.js` files also passed `node --check`.

## 2. Glossary decisions

No substantive glossary deviations. “Deployment / deploy” is consistently rendered as «αποστολή / αποστέλλουμε»; recruitment is rendered as «στρατολόγηση προσωπικού» or, where the sentence calls for it, «πρόσληψη». The name “Bhuiyan Workforce Ltd.”, personal names, acronyms, URLs, and technical certification names remain in Latin script. In the About-page team entry, the founder’s name remains unchanged and is followed by the Greek role clarification «ιδρυτής».

## 3. Source inconsistencies and legally sensitive statements

- About page, `src/content/pages.js`: “Our team combines recruitment expertise, immigration knowledge, and deep sector understanding across all six service categories.” This says six categories, while the site’s service dataset contains 25 service categories. The inconsistency was translated faithfully, not silently corrected.
- About page, `src/content/pages.js`, regional-partners section: “Our partners hold valid government licences in their respective countries” and the related claims that partners are licensed/authorised recruitment or employment companies are legally sensitive. They were translated faithfully with neutral Greek wording; request legal review before publication.
- Privacy and Terms pages are legal texts governed by Bangladesh law in the English source. They are not included in Part A; any Part B translation must preserve that governing-law language and should be reviewed by a lawyer. No Greek/EU legal adaptation has been made.

## 4. Non-literal translation choices

English recruitment-industry expressions were recast in idiomatic Greek rather than translated word-for-word. In particular, “deploy workers” is expressed as «αποστέλλουμε εργαζομένους»; “worker welfare follow-up” is expressed as «παρακολούθηση της ευημερίας των εργαζομένων»; and “shortlist” is described as a short list of screened candidates. The intent was to preserve the source meaning while avoiding wording that could imply a regulated Greek employment-placement service.

## 5. Untranslated content

No Part A data string was intentionally left untranslated, except for protected company and person names, acronyms, URLs, technical product/certification names, and other source terms required to remain in Latin script.

## 6. Part B status

`el-extra-pages.json` was not produced. Part B is optional for this first delivery and was not included in the requested Part A ZIP. It covers the hard-coded page-component strings (including the Privacy and Terms legal texts) and service dropdown labels.
