# Prompt for Manus: translate the Bhuiyan Workforce website into {{NAME}}

Paste everything below the line into Manus, and attach the repository as a ZIP
(the current GitHub state, including `scripts/check-translation.mjs` and `scripts/translation-profiles.mjs`).

---

## ROLE AND GOAL

You are a senior professional translator and localisation engineer (English → {{NAME}}) working on the
corporate website of **Bhuiyan Workforce Ltd.**, a Bangladesh-based, BMET-registered international
manpower recruitment company that places skilled Bangladeshi workers with employers in the Gulf,
Europe and Southeast Asia.

Your job: produce the **{{NAME}} language files** for the website, in the exact file formats the code
already uses for Arabic. {{NAME}} will become a real language of the site (own URLs under `/{{CODE}}`),
so the text must read as if written by a native {{NAME}} B2B copywriter, not as machine translation.
Target variety: **{{VARIANT}}**.

You only **create new files**. You do not change any existing file, any code, any English text, or any
Arabic/Polish/other-language file. Another engineer will wire the files into the site afterwards.

## HOW THE SITE IS BUILT (so you understand the files)

React + Vite. Text lives in plain JavaScript data files, one set per language. Arabic is finished and is
your **reference for structure**: for every file below, open the Arabic twin, mirror its structure
exactly (same keys, same order, same nesting, same list lengths), and change only the language.
English is the **source of truth for meaning**.

## DELIVERABLES (create exactly these files, same paths)

| # | New file | Mirrors (structure) | English source of the meaning |
|---|----------|--------------------|-------------------------------|
| 1 | `src/i18n/locales/{{CODE}}.ui.js` | `src/i18n/locales/ar.ui.js` | `src/i18n/locales/en.ui.js` for keys that exist there; for the ~59 older keys (names without a dot, e.g. `nav_services`) the English is the `en:` value in `src/i18n/translations.jsx` |
| 2 | `src/i18n/locales/{{CODE}}.js` | `src/i18n/locales/ar.js` | `src/i18n/locales/en.js` + the English data files |
| 3 | `src/content/{{CODE}}/names.js` | `src/content/ar/names.js` | English country names in `src/data/countries.jsx` |
| 4 | `src/content/{{CODE}}/countries.js` | `src/content/ar/countries.js` | `src/data/countries.jsx` (all 28 countries) |
| 5 | `src/content/{{CODE}}/services.js` | `src/content/ar/services.js` | `src/data/services.jsx` (all 25 services) |
| 6 | `src/content/{{CODE}}/posts.js` | `src/content/ar/posts.js` | `src/data/posts.jsx` (all 13 articles) |
| 7 | `src/content/{{CODE}}/guides.js` | `src/content/ar/guides.js` | `src/data/countryGuides.jsx` (3 guides) |
| 8 | `src/content/{{CODE}}/pages.js` | the `ar` block inside `src/content/pages.js` | the `en` block inside `src/content/pages.js` (About page and FAQ) |
| 9 | `TRANSLATION-NOTES.md` | – | your report (see "Final report") |
| 10 (Part B, second delivery) | `{{CODE}}-extra-pages.json` | – | see "PART B" |

`src/content/{{CODE}}/pages.js` must be an ES module with `export default { about: {...}, faq: {...} }`
(the same objects that live under `PAGE_CONTENT.ar` in `src/content/pages.js`).

`src/i18n/locales/{{CODE}}.js` must contain `translated: []` exactly like that (empty list, with a comment
"filled in by the developer"). Do not invent URL slugs anywhere: URLs are handled by the developer.

## FILE FORMAT RULES (a syntax error breaks the whole website build)

1. Every file is a valid ES module (`export default ...`). It must pass `node --check <file>`.
2. Delimit strings with **double quotes**, or with backticks where the Arabic twin uses backticks
   (multi-line article text). Inside text use {{QUOTES}} for quotation marks; never leave a bare `"`
   inside a double-quoted string. Use the typographic apostrophe ’ if one is ever needed.
3. Keep every key name, key order, list length and nesting identical to the Arabic twin. Do not add,
   remove, rename or reorder keys. Do not add comments inside data except the file header comment.
4. Keep placeholders exactly as written: `{n}`, `{name}`, `{country}` etc. They are replaced by code. Do
   not translate, reorder inside braces, or add spaces in them. Where a placeholder is a country or
   service name, phrase the sentence so that the name can stay in its dictionary form.
5. Keep line structure: `\n\n` paragraph breaks in `overview` fields, and the markdown syntax inside
   article and guide text exactly as in English (`## ` headings, `### `, `- ` bullets, `1. ` lists, `**bold**`,
   links `[text](url)` with the URL unchanged, tables). The checker counts them.
6. Keep emoji, icons, flags and arrows (→ ← ✓) as in English. Keep "→" as is. Strings that start or
   end with an arrow keep it in the same position.
7. Encoding UTF-8, LF line endings, no BOM.

## {{NAME}} LANGUAGE RULES (checked by the script)

{{LANGUAGE_RULES}}

## WHAT TO TRANSLATE, AND WHAT TO KEEP EXACTLY

**Keep unchanged, in Latin script, never translated or transliterated:**
- The company name **Bhuiyan Workforce Ltd.** / **Bhuiyan Workforce** (and "Bhuiyan" alone), person names
  (MD Rezaul Kabir Bhuiyan, Asraful Kabir Bhuiyan, Kishor Kumar, Akhi Begum), the office address.
- E-mail addresses, phone and WhatsApp numbers, URLs, file names.
- Acronyms and system names: BMET, GAMCA, WAFID, GCC, WMS, CNC, SMAW, MIG, TIG, OPITO, BOSIET, H2S, HSE,
  LOTO, CISRS, COSHH, ASME, POS, CCTV, SAR/AED/BDT/USD/EUR and similar codes, Iqama, Smart Card,
  NEOM, Red Sea Project, Diriyah. First mention of an acronym may add the {{NAME}} expansion in
  brackets **only if the English source also expands it**.
- ILO → use the usual {{NAME}} name of the International Labour Organization followed by (ILO).

**Numbers are sacred.** Every figure, fee, salary range, percentage, number of days/weeks/months/years
and count must stay identical; only the formatting may follow {{NAME}} conventions ({{NUMBERS}}).
Ranges keep the en dash. Month names are translated ({{DATES}}).

**Do not add, remove, soften, strengthen or "improve" any claim.** No new promises, statistics, legal
statements, guarantees or examples. If the English looks wrong or inconsistent, translate it faithfully
and list it in the notes (do not fix it silently). Example known to you: the About page says "six service
categories" while the site lists 25.

**Do not add content about local or EU immigration/labour law** unless it is in the English source.
This is a translation, not a legal adaptation.

## TONE AND STYLE

- Professional, clear, confident B2B {{NAME}}. Warm but not salesy. Short sentences where the English is
  short. No literal calques, no unnecessary anglicisms where a natural {{NAME}} word exists.
- Address the reader with {{REGISTER}}
- Consistent terminology across ALL files (use the glossary below). Headings in sentence case.
- Length: aim for the English length ±30 %. Buttons and menu items must stay short.
- Write Bangladesh as «{{BANGLADESH}}» (and derived forms accordingly).

## LEGALLY LOADED TERMS: DO NOT USE

{{BANNED_INTRO}}

{{BANNED}}

When the English says a **partner** agency is "licensed" or "registered" (About page partners), translate
the claim faithfully with neutral wording and mention it in the notes for legal review.

## GLOSSARY (use consistently; if you choose a different term, use that one everywhere)

| English | {{NAME}} |
|---|---|
{{GLOSSARY}}

Country names: translate all 28 country names and the extra ones used in services (Libya, Brunei,
Seychelles, Mauritius, Japan, South Korea) and Italy (used in `areaServed`) with the standard
{{NAME}} names (as used by the national foreign ministry and the main encyclopaedias). English list:
Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Oman, Bahrain, Jordan, Malaysia, Singapore, Maldives,
Serbia, Portugal, Greece, Romania, Poland, Hungary, Croatia, Czech Republic, Lithuania, Latvia, Estonia,
Bulgaria, Cyprus, Slovakia, Bosnia and Herzegovina, Armenia, Montenegro, Georgia. Currency names get
the usual {{NAME}} name with the code in brackets (SAR, AED …), codes unchanged.

Trade and job names: use the standard {{NAME}} job names (welders, steel fixers, carpenters, scaffolders,
masons, forklift and crane operators, plumbers, HVAC technicians, electricians, cleaners, housekeepers,
cooks, waiters, security guards …). Keep technical certification names as in English.

## SEO RULES FOR `src/i18n/locales/{{CODE}}.js` (the `head` object)

- Mirror `ar.js` exactly: `siteName`, `ogImageAlt`, `orgDescription`, `siteDescription`, `breadcrumb`,
  `pages` (home, about, faq, blog, capabilities, employer-guide, privacy, terms, apply, and `countries`
  if the English file has it), `notFound`, `countries[slug]`, `services[slug]`, `posts[slug]`,
  `guides[slug]`, `areaServed` (24 names, same order as in `en.js`, {{NAME}} country names).
- `siteName` must be exactly `Bhuiyan Workforce Ltd.`
- Every `title` contains `Bhuiyan Workforce Ltd.`, ideally as the suffix after " | ", total ≤ 60 characters
  where possible (long article headlines may run longer; never more than needed).
- Every `description`: natural {{NAME}}, 120–160 characters, unique per page, no keyword stuffing,
  faithful to the English meaning (no new claims). All titles must be unique.
- Home `keywords`: a natural comma-separated list built from real {{NAME}} phrasing, for example
  «{{KEYWORDS}}». These are editorial assumptions, not measured search volumes. Do **not** use the banned
  terms above.
- Post override objects keep all their keys (`title`, `description`, `name`, `headline`, `date`) as in `ar.js`.

## PART A vs PART B

**PART A (everything in the table, files 1–9) is the first delivery.** Do it completely before Part B.

**PART B (`{{CODE}}-extra-pages.json`, second delivery).** Seven pages are still English-only in every
language because their text is hard-coded in the page components, not in data files:
`src/pages/BlogPage.jsx`, `CountriesPage.jsx`, `EmployerGuidePage.jsx`, `CapabilitiesPage.jsx`,
`WorkerApplicationPage.jsx`, `PrivacyPage.jsx`, `TermsPage.jsx`, plus the service names in the dropdown of
`src/components/ContactForm.jsx`. Read each file and extract **every visible English string** (headings,
paragraphs, list items, button labels, placeholders, form labels, validation messages, table cells, aria
labels, `alt` text). Output one JSON array, in page order:
`[{ "file": "src/pages/PrivacyPage.jsx", "en": "<English text copied verbatim, entities decoded, one string per item>", "{{CODE}}": "<{{NAME}}>" }, ...]`.
Rules: copy `en` character-for-character so it can be matched in the code; one entry per text node; skip
code, class names, CSS, URLs, e-mail addresses. Keep placeholders and inline markup out of `en`/`{{CODE}}`
(split around them). **Privacy and Terms are legal texts:** translate faithfully and completely, keep them
governed by the laws of Bangladesh as the English says, do not adapt them to local or EU law (e.g. GDPR),
and flag both pages in the notes as requiring review by a lawyer. Part B is optional for the first round.

## QUALITY CONTROL (mandatory, in this order)

1. Install dependencies (`npm install`) so that `esbuild` is available, then run
   `node scripts/check-translation.mjs {{CODE}} --all` and fix every **ERROR** until the result is
   `0 error(s)`. Re-run after every fix. Read every WARNING and fix those that are reasonable.
2. Run `node --check` on every new `.js` file.
3. Self-review by reading, not only by tool: (a) all numbers and contact details unchanged; (b) no banned
   term; (c) the right form of address everywhere; (d) one consistent term per glossary row; (e) no English
   left in any value except the allowed Latin items; (f) titles/descriptions unique and natural; (g) the
   markdown syntax of articles and guides intact; (h) placeholders intact; (i) grammar, cases and
   agreement correct.
4. Read three whole articles, one country page, one service and the FAQ as a native reader and rewrite
   anything that sounds translated or grammatically off.
5. Do not run, and do not modify, any other script or the build.

The checker verifies structure, numbers, contact details, company name, list lengths, markdown counts,
placeholders, SEO fields, script/alphabet rules and the banned terms. It cannot judge quality or grammar:
that is your job.

## FINAL REPORT: `TRANSLATION-NOTES.md`

Short and factual, with these sections: (1) files delivered and the final checker output; (2) glossary
decisions that deviate from the table above and why; (3) sentences where the English source looks
wrong, inconsistent or legally sensitive (quote the English, say where); (4) places where you chose a
non-literal translation; (5) anything you could not translate and why; (6) Part B status.

## HARD DON'TS

- Don't modify, rename or delete any existing file. Don't create files outside the list above.
- Don't invent URL slugs, keys, claims, numbers, partners, certificates or statistics.
- Don't translate or transliterate the company name, person names, e-mails, phone numbers, URLs.
- Don't use the banned legal terms. Don't use the wrong form of address. Don't leave English in values.
- Don't mix alphabets inside a word and don't use characters that do not belong to {{NAME}}.
- Don't "fix" the English source. Report it.
- Return **one ZIP** that preserves the folder paths, containing only the new files.
