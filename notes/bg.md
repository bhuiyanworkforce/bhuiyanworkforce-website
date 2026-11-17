# Bulgarian translation notes

## Delivered localization

Bulgarian is integrated at `/bg` using the existing English URL slugs. The locale includes the current 33 country records and 18 articles, with Bulgarian SEO metadata, route availability, and static-page localization for added or changed copy. The 470-row static-page map is stored canonically in `bg-extra-pages.json`; `scripts/sync-bg-static-translations.mjs` generates the SSR-compatible module at `src/i18n/bg-static-page-translations.js`.

The static localizer is applied within each affected page’s rendered JSX so Bulgarian server-rendered HTML contains translated strings. Worker Application destination labels are translated while their form values remain the canonical English country names. Protected company, personal, and contact names, figures, placeholders, URLs, and acronyms remain unchanged.

## Validation

- `npm run build:static`: passed; generated and verified all 429 routes (en=89, ar=82, pl=82, bg=89, ro=87), with no failed routes.
- `npm run test:seo`: passed, 27 checks, including Bulgarian, Romanian, and Polish routes and hreflang alternates.
- Static translation fallback report: no Bulgarian fallbacks; Romanian retains four existing missing-string fallbacks (Deployment, Office, Partnerships, Website).
- `node scripts/check-translation.mjs bg --all`: one known false positive, zero warnings. The flagged field is the protected founder name `MD Rezaul Kabir Bhuiyan`, which must remain in Latin script; no other checker findings remain.
- The glossary’s restricted terminology does not occur in the localized content.

## Glossary and source fidelity

Use standard Bulgarian (Bulgaria), native B2B phrasing, Cyrillic, and polite plural Вие/Ваш. The glossary is consistent: worker deployment is rendered as “изпращане на работници”; recruitment, shortlist, trade test, work permit, and compliance use the selected Bulgarian equivalents.

The About page says the team covers “all six service categories,” while the site data lists 25 services. The translation preserves the source’s “six” rather than silently correcting it. Partner licensing and registration claims, as well as country-specific visa, work-permit, wage, fee, and immigration assertions in the pages and articles, are translated rather than independently verified; review claims with appropriate local counsel before publication.

## Legal review

The Bulgarian Privacy Policy and Terms of Service translations preserve the source’s Bangladesh-law framing. The Terms retain the competent courts of Dhaka, Bangladesh. Neither page has been adapted to Bulgarian or EU law, and both require review by qualified counsel familiar with Bangladesh law and Bulgarian-language legal drafting before publication. See [LEGAL-TRANSLATION-REVIEW.md](LEGAL-TRANSLATION-REVIEW.md).
