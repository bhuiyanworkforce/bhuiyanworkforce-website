#!/usr/bin/env node
// Builds the Manus translation prompt for one language from scripts/prompt-template.md and the
// language's profile in scripts/translation-profiles.mjs.
//
//   node scripts/make-prompt.mjs sr            prints the prompt
//   node scripts/make-prompt.mjs sr --write    writes prompts/sr.md
//   node scripts/make-prompt.mjs --all --write writes prompts/<code>.md for every language that has a glossary
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROFILES } from './translation-profiles.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const template = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), 'prompt-template.md'), 'utf8');

function languageRules(p) {
  const L = [];
  if (p.script === 'latin') L.push('- **Write in the Latin script only.** No Cyrillic, Greek or Arabic letters anywhere (the checker flags them).');
  if (p.script === 'cyrillic') L.push('- **Write in Cyrillic.** Never mix alphabets inside one word: Latin look-alike letters (a, e, o, p, c, x, y, k, b, m, t, h …) inside Cyrillic words are a common machine-translation fault and the checker flags them. Latin appears only in the items under "Keep unchanged".');
  if (p.script === 'greek') L.push('- **Write in Greek.** Never mix alphabets inside one word (Latin look-alike letters inside Greek words are a common machine-translation fault). Latin appears only in the items under "Keep unchanged".');
  if (p.forbiddenNote) L.push(`- ${p.forbiddenNote}.`);
  for (const [, msg] of p.wrongDiacritics || []) L.push(`- ${msg}.`);
  const checks = new Set(p.checks || []);
  if (checks.has('greek-polytonic')) L.push('- **Modern monotonic Greek only**: one accent mark on the stressed vowel, no polytonic characters (ᾳ, ᾶ, ἡ, ῶ …). Correct final sigma ς.');
  if (checks.has('greek-question')) L.push('- The Greek question mark is the semicolon ";" (not "?").');
  if (checks.has('spanish-inverted')) L.push('- Use the opening marks ¿ and ¡ wherever Spanish requires them (every question and exclamation).');
  if (checks.has('french-spacing')) L.push('- French typography: a non-breaking space before : ; ? ! and inside « » (the checker warns when it is missing).');
  L.push(`- Quotation marks: ${p.quotes}.`);
  L.push(`- Numbers: ${p.numbers}. The digits themselves must never change.`);
  L.push(`- Dates: ${p.dates}.`);
  L.push('- Acronyms keep Latin script and are not declined or transliterated.');
  L.push('- Grammar must be correct (cases, gender, number, articles, agreement). Read the result as a native reader would.');
  for (const n of p.notes || []) L.push(`- ${n}`);
  return L.join('\n');
}

function banned(p) {
  if (!p.banned?.length) return '_No profile-level banned terms for this language: still avoid any term that names a licensed or regulated activity in the target country._';
  const L = p.banned.map((r) => `- ${r.term}: ${r.why}`);
  if (p.warn?.length) { L.push('', 'The checker also **warns** on (avoid them unless the English source clearly needs them):'); for (const r of p.warn) L.push(`- ${r.term}: ${r.why}`); }
  return L.join('\n');
}

export function buildPrompt(code) {
  const p = PROFILES[code];
  if (!p || !p.glossary?.length) throw new Error(`no full profile for "${code}"`);
  const map = {
    CODE: code, NAME: p.name, VARIANT: p.variant, QUOTES: p.quotes, NUMBERS: p.numbers, DATES: p.dates,
    REGISTER: p.register, BANGLADESH: p.bangladesh, KEYWORDS: p.keywords,
    LANGUAGE_RULES: languageRules(p),
    BANNED_INTRO: 'In the target country, private employment agencies, temporary/agency work, labour intermediation and the posting of workers are licensed or regulated activities. The company must never describe itself or its service with these terms. The checker fails the translation if it finds them. (This starting list is not legal advice: it will be confirmed by a local lawyer.)',
    BANNED: banned(p),
    GLOSSARY: p.glossary.map(([en, tr]) => `| ${en} | ${tr} |`).join('\n'),
  };
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => { if (!(k in map)) throw new Error(`template placeholder ${k} has no value`); return map[k]; });
}

const args = process.argv.slice(2);
const write = args.includes('--write');
const codes = args.includes('--all') ? Object.keys(PROFILES).filter((c) => PROFILES[c].glossary?.length) : args.filter((a) => !a.startsWith('--'));
if (!codes.length) { console.error('usage: node scripts/make-prompt.mjs <code> [--write]   |   --all --write'); process.exitCode = 2; }
for (const code of codes) {
  const text = buildPrompt(code);
  if (write) { const dir = path.join(ROOT, 'prompts'); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, `${code}.md`), text); console.log(`wrote prompts/${code}.md (${text.split(/\s+/).length} words)`); }
  else process.stdout.write(text + '\n');
}
