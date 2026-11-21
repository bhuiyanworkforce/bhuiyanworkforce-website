// Keeps worker/contact-form-guard.js identical to the guard section of worker/contact-form-worker.js.
// The worker file is the source of truth (it is what gets pasted into Cloudflare).
//   node scripts/sync-worker-guard.mjs          rewrite the guard file
//   node scripts/sync-worker-guard.mjs --check  fail if the two have drifted apart (used by CI)
import fs from 'node:fs';
const workerPath = new URL('../worker/contact-form-worker.js', import.meta.url);
const guardPath = new URL('../worker/contact-form-guard.js', import.meta.url);
const START = 'const GUARD_CONFIG';
const END = '// ---- Worker entry point';
const worker = fs.readFileSync(workerPath, 'utf8');
const guard = fs.readFileSync(guardPath, 'utf8');
const section = worker.slice(worker.indexOf(START), worker.indexOf(END)).trimEnd() + '\n';
const next = guard.slice(0, guard.indexOf(START)) + section;
if (process.argv.includes('--check')) {
  if (next !== guard) {
    console.error('worker/contact-form-guard.js is out of date. Run: node scripts/sync-worker-guard.mjs');
    process.exit(1);
  }
  console.log('Worker guard copy is in sync.');
} else {
  fs.writeFileSync(guardPath, next);
  console.log('Wrote worker/contact-form-guard.js');
}
