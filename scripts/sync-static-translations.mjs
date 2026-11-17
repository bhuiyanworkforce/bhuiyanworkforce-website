// Generates src/i18n/<lang>-static-page-translations.js from <lang>-extra-pages.json
// for every language that ships hard-coded page strings as a JSON file (Part B of the translation delivery).
//
//   node scripts/sync-static-translations.mjs            (all of them)
//   node scripts/sync-static-translations.mjs el hr      (only these)
//
// Run it after editing any <lang>-extra-pages.json, then commit both files.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const ALL = ['bg', 'el', 'hr', 'sr', 'bs', 'mk', 'it', 'ro', 'es', 'ms'];
const langs = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

for (const lang of langs) {
  const source = resolve(root, `${lang}-extra-pages.json`);
  const target = resolve(root, `src/i18n/${lang}-static-page-translations.js`);
  if (!existsSync(source)) { console.error(`skip ${lang}: ${source} not found`); process.exitCode = 1; continue; }
  const rows = JSON.parse(readFileSync(source, 'utf8'));
  const bad = rows.filter((r) => typeof r?.file !== 'string' || typeof r?.en !== 'string' || typeof r?.[lang] !== 'string');
  if (bad.length) { console.error(`${lang}: ${bad.length} malformed rows (need file, en, ${lang})`); process.exitCode = 1; continue; }
  writeFileSync(
    target,
    `// Generated from ${lang}-extra-pages.json by scripts/sync-static-translations.mjs.\nexport default ${JSON.stringify(rows, null, 2)};\n`,
    'utf8',
  );
  console.log(`Wrote ${rows.length} ${lang} static-page text mappings to ${target}`);
}
