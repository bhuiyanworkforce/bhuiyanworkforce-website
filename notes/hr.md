# Croatian Translation Notes — Part A and Part B

## 1. Files delivered and quality checks

Delivered the eight requested Croatian JavaScript modules plus this notes file:

- `src/i18n/locales/hr.ui.js`
- `src/i18n/locales/hr.js`
- `src/content/hr/names.js`
- `src/content/hr/countries.js` — 28 countries
- `src/content/hr/services.js` — 25 services
- `src/content/hr/posts.js` — 18 content records, matching the Arabic content reference
- `src/content/hr/guides.js` — 3 guides
- `src/content/hr/pages.js` — About and FAQ
- `TRANSLATION-NOTES.md`
- `hr-extra-pages.json` — Part B array of 478 visible-text entries across the seven specified pages and the 26 requested ContactForm dropdown service names.

Part A final checker output: `check-translation (hr): 0 error(s), 0 warning(s)`. All eight Part A JavaScript files passed `node --check`. For Part B, the combined JSON array was validated for JSON syntax, record shape, component paths/order, entry counts, placeholder/markup exclusion, and contact-detail preservation. No Part B JavaScript files were created.

## 2. Glossary decisions

No glossary deviations. The requested wording `naknada za uspjeh (success fee)` is retained. Protected names and acronyms are not declined; surrounding phrases were adjusted where needed for Croatian grammar. For example, the copy uses constructions such as `u sustavu BMET` and `pregled u okviru postupka GAMCA` rather than adding Croatian case endings to those names.

## 3. Source inconsistencies and legally sensitive claims

- The English About-page source says: “Our team combines recruitment expertise, immigration knowledge, and deep sector understanding across all six service categories.” The repository contains 25 distinct service records. The source statement was translated without changing its count.
- The English article data in `src/data/posts.jsx` contains 13 records, while the Arabic content reference contains 18. The following five Arabic-reference records have no corresponding English article text: `poland-new-work-permit-system-2026`, `saudi-arabia-visa-quotas-compliance-2026`, `uae-wage-emiratisation-rules-2026`, `malaysia-bangladesh-recruitment-reopens-2026`, and `czech-republic-employee-card-rules-2026`. These five were translated from the Arabic content reference and could not be checked against English. No SEO overrides were added for them because the Arabic SEO object has only 13 entries.
- The About-page source makes legal-status claims about partner firms: “Bhuiyan Workforce Ltd. works with a network of licensed recruitment and employment agencies across the Gulf and Europe. Our partners hold valid government-issued licenses in their respective countries…” It also labels the Poland and Romania partners “Government-registered” / “Authorized” and the UAE partner “Licensed.” These claims were translated faithfully with neutral wording, not extended to Bhuiyan Workforce Ltd. itself. A Croatian legal reviewer should confirm that the partner descriptions are appropriate for launch.

- `PrivacyPage.jsx` describes the company as “an international recruitment agency” when explaining cross-border personal-data transfers. This status wording is legally sensitive and was rendered neutrally; a lawyer should confirm it.
- `TermsPage.jsx` says the company “acts as a recruitment intermediary and is not itself the employer.” This is legally sensitive. The Croatian renders the relationship as the company acting as a link between candidates and employers, without changing the Bangladesh governing-law clause; a lawyer should review it.
- The Privacy source expressly includes GDPR/EU/EEA rights language. It was translated as source text, not introduced as an adaptation to Croatian/EU law; legal review is required.

## 4. Non-literal translation choices

- “Deployment” / sending workers abroad is rendered as `slanje radnika`, following the glossary and avoiding a regulated posting-of-workers formulation.
- “Shortlist” is rendered as `uža lista provjerenih kandidata`.
- Acronym and system-name phrases were recast where necessary to preserve their exact spelling without Croatian inflection.
- Country and occupational wording was adapted to standard Croatian usage while preserving the supplied claims, numbers, fees and dates.
- “Emigration clearance” in the Employer Guide is rendered as `ishođenje odobrenja za odlazak u inozemstvo`; the Terms-page “recruitment intermediary” claim is expressed neutrally as `djeluje kao poveznica između kandidata za rad i poslodavaca`.

## 5. Anything not translatable or independently verifiable

The five additional Arabic-reference article records listed in section 3 could not be verified against English because the English source records are absent. Their Croatian text follows the Arabic content reference; the source owner should provide English originals for a fidelity review. No other requested Part A content was intentionally omitted. In Part B, URLs and email addresses were omitted per instruction; visible phone numbers, names, dates, amounts and other identifiers were retained. Data-driven post/country values and ContactForm labels already covered by Part A localization keys were not duplicated in the extra-page array.

## 6. Part B status

Part B is complete. `hr-extra-pages.json` contains 478 entries in the requested page order: Blog, Countries, Employer Guide, Capabilities, Worker Application, Privacy, Terms, and ContactForm dropdown service names. The Blog page includes the two dynamic filter words “for” and “in”; the ContactForm contribution is limited to its 26 service-option names because its labels and validation copy are existing localization keys already covered in Part A. Visible phone-number text is retained unchanged; URLs and email addresses are omitted as instructed.

PrivacyPage.jsx and TermsPage.jsx are legal texts and must be reviewed by a lawyer before publication. Their Bangladesh governing-law clauses and the Bangladesh statutes named in Terms have been preserved without adapting them to Croatian or EU law. GDPR-related statements were translated only where they appear explicitly in the English Privacy source. No local/EU legal claims were added.
