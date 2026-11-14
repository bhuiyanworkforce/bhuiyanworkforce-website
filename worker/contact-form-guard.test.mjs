// Run with: node worker/contact-form-guard.test.mjs
// Loads the guard exactly as it would be pasted into the Cloudflare worker (no exports).
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const src = fs.readFileSync(fileURLToPath(new URL('./contact-form-guard.js', import.meta.url)), 'utf8');
function load(fetchImpl = async () => { throw new Error('no network in tests'); }) {
  const ctx = { atob, FormData, fetch: fetchImpl, Date, console };
  vm.createContext(ctx);
  vm.runInContext(src + '\nthis.validateSubmission = validateSubmission;', ctx);
  return ctx.validateSubmission;
}

const ORIGIN = 'https://bhuiyanworkforce.com';
const b64 = (bytes) => Buffer.from(bytes).toString('base64');
const PDF = (n = 100) => b64(Buffer.concat([Buffer.from('%PDF-1.4\n'), Buffer.alloc(n, 65)]));
const PNG = () => b64(Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(50)]));
const EXE = () => b64(Buffer.concat([Buffer.from('MZ'), Buffer.alloc(100)]));
const good = { name: 'Rahim Uddin', email: 'rahim@example.com', company: 'Acme', service: 'Construction', message: 'Hello' };

let ip = 0;
function req(body, { origin = ORIGIN, type = 'application/json', headers = {}, raw } = {}) {
  const h = { 'CF-Connecting-IP': `10.0.0.${++ip}`, ...headers };
  if (origin) h.Origin = origin;
  if (type) h['Content-Type'] = type;
  return new Request('https://worker.example/', { method: 'POST', headers: h, body: raw ?? JSON.stringify(body) });
}

let passed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log('  ok  ', name); }
  catch (e) { console.error('  FAIL', name, '\n      ', e.message); process.exitCode = 1; }
}
const v = load();
const fail = async (r, status, msg) => {
  const out = await v(r, {});
  assert.equal(out.ok, false, 'expected rejection');
  assert.equal(out.status, status, `status ${out.status} (${out.error})`);
  if (msg) assert.match(out.error, msg);
};

await test('valid contact submission passes and is normalised', async () => {
  const out = await v(req({ ...good, formType: 'contact' }), {});
  assert.equal(out.ok, true);
  assert.equal(JSON.stringify(out.data.attachments), '[]');
  assert.equal(out.data.name, 'Rahim Uddin');
  assert.equal(out.data.formType, 'contact');
});
await test('origin: wrong, missing and look-alike origins are refused', async () => {
  await fail(req(good, { origin: 'https://evil.example' }), 403);
  await fail(req(good, { origin: null }), 403);
  await fail(req(good, { origin: 'https://bhuiyanworkforce.com.evil.example' }), 403);
});
await test('www origin is accepted', async () => {
  assert.equal((await v(req(good, { origin: 'https://www.bhuiyanworkforce.com' }), {})).ok, true);
});
await test('content type and JSON shape', async () => {
  await fail(req(good, { type: 'text/plain' }), 415);
  await fail(req(null, { raw: '{not json' }), 400);
  await fail(req(null, { raw: '[1,2]' }), 400);
  await fail(req(null, { raw: '"text"' }), 400);
});
await test('oversized body is refused by Content-Length and by actual size', async () => {
  await fail(req(good, { headers: { 'Content-Length': String(30 * 1024 * 1024) } }), 413);
  await fail(req({ ...good, message: 'x'.repeat(100) }, { raw: 'x'.repeat(19 * 1024 * 1024) }), 413);
});
await test('required fields and lengths', async () => {
  await fail(req({ ...good, name: '' }), 400, /name/i);
  await fail(req({ ...good, name: undefined }), 400);
  await fail(req({ ...good, email: 'not-an-email' }), 400, /email/i);
  await fail(req({ ...good, email: 'a b@c.d' }), 400);
  await fail(req({ ...good, message: '' }), 400, /message/i);
  await fail(req({ ...good, message: 'x'.repeat(20001) }), 400);
  await fail(req({ ...good, name: 'n'.repeat(121) }), 400);
  await fail(req({ ...good, company: 'c'.repeat(201) }), 400);
  await fail(req({ ...good, name: { a: 1 } }), 400);
});
await test('line breaks in single-line fields are removed (header injection)', async () => {
  const out = await v(req({ ...good, name: 'Rahim\r\nBcc: victim@example.com', service: 'A\nB' }), {});
  assert.equal(out.ok, true);
  assert.ok(!/[\r\n]/.test(out.data.name));
  assert.ok(!/[\r\n]/.test(out.data.service));
});
await test('message keeps its line breaks', async () => {
  const out = await v(req({ ...good, message: 'line1\nline2' }), {});
  assert.equal(out.data.message, 'line1\nline2');
});
await test('honeypot silently drops', async () => {
  const out = await v(req({ ...good, hp: 'bot' }), {});
  assert.equal(JSON.stringify(out), JSON.stringify({ ok: true, drop: true }));
  assert.equal((await v(req({ ...good, hp_phone: '123' }), {})).drop, true);
});
await test('worker application needs consent', async () => {
  await fail(req({ ...good, formType: 'worker_application' }), 400, /consent/i);
  await fail(req({ ...good, formType: 'worker_application', consent: 'yes' }), 400, /consent/i);
  await fail(req({ ...good, company: 'Worker Application - Drivers' }), 400, /consent/i);
  assert.equal((await v(req({ ...good, formType: 'worker_application', consent: true }), {})).ok, true);
});
await test('unknown formType falls back to contact', async () => {
  assert.equal((await v(req({ ...good, formType: '<script>' }), {})).data.formType, 'contact');
});
await test('valid attachments: pdf + png, names and types normalised', async () => {
  const out = await v(req({ ...good, attachments: [
    { filename: 'My CV.PDF', content: PDF(), type: 'text/html' },
    { filename: '../../passport.png', content: PNG(), type: 'x' },
  ] }), {});
  assert.equal(out.ok, true);
  assert.equal(out.data.attachments[0].type, 'application/pdf');
  assert.equal(out.data.attachments[0].filename, 'My CV.pdf');
  assert.equal(out.data.attachments[1].type, 'image/png');
  assert.ok(!out.data.attachments[1].filename.includes('/'));
});
await test('attachments: disguised and disallowed files are refused', async () => {
  await fail(req({ ...good, attachments: [{ filename: 'cv.pdf', content: EXE(), type: 'application/pdf' }] }), 400, /does not match/);
  await fail(req({ ...good, attachments: [{ filename: 'run.exe', content: EXE(), type: 'x' }] }), 400, /not allowed/);
  await fail(req({ ...good, attachments: [{ filename: 'noext', content: PDF(), type: 'x' }] }), 400);
  await fail(req({ ...good, attachments: [{ filename: 'a.pdf', content: '%%%notbase64%%%', type: 'x' }] }), 400, /encoding/);
  await fail(req({ ...good, attachments: [{ filename: 'a.pdf', content: 'AAA', type: 'x' }] }), 400);
  await fail(req({ ...good, attachments: 'nope' }), 400);
  await fail(req({ ...good, attachments: [null] }), 400);
  await fail(req({ ...good, attachments: [{ filename: 'a.pdf' }] }), 400);
});
await test('attachments: count, per-file and total limits', async () => {
  const one = { filename: 'a.pdf', content: PDF(), type: 'x' };
  await fail(req({ ...good, attachments: [one, one, one, one] }), 400, /Too many/);
  const big = { filename: 'big.pdf', content: PDF(5 * 1024 * 1024 + 10), type: 'x' };
  await fail(req({ ...good, attachments: [big] }), 400, /5 MB/);
  const mid = { filename: 'mid.pdf', content: PDF(4.1 * 1024 * 1024), type: 'x' };
  await fail(req({ ...good, attachments: [mid, mid, mid] }), 413, /12 MB/);
  const ok = { filename: 'ok.pdf', content: PDF(3.9 * 1024 * 1024), type: 'x' };
  assert.equal((await v(req({ ...good, attachments: [ok, ok, ok] }), {})).ok, true);
});
await test('fallback rate limit: 6th request from one IP is refused, others unaffected', async () => {
  const vv = load();
  const mk = (addr) => req(good, { headers: { 'CF-Connecting-IP': addr } });
  for (let i = 0; i < 5; i++) assert.equal((await vv(mk('9.9.9.9'), {})).ok, true);
  const sixth = await vv(mk('9.9.9.9'), {});
  assert.equal(sixth.status, 429);
  assert.equal((await vv(mk('8.8.8.8'), {})).ok, true);
});
await test('RATE_LIMITER binding is used when present', async () => {
  const keys = [];
  const env = { RATE_LIMITER: { limit: async ({ key }) => { keys.push(key); return { success: keys.length < 2 }; } } };
  assert.equal((await v(req(good, { headers: { 'CF-Connecting-IP': '7.7.7.7' } }), env)).ok, true);
  assert.equal((await v(req(good, { headers: { 'CF-Connecting-IP': '7.7.7.7' } }), env)).status, 429);
  assert.equal(keys.join(), '7.7.7.7,7.7.7.7');
});
await test('Turnstile: required only when a secret is configured', async () => {
  let called = 0;
  const vt = load(async () => { called++; return { json: async () => ({ success: called === 1 }) }; });
  const env = { TURNSTILE_SECRET: 's' };
  assert.equal((await vt(req(good), env)).status, 403, 'missing token');
  assert.equal((await vt(req({ ...good, turnstileToken: 'tok' }), env)).ok, true, 'verified');
  assert.equal((await vt(req({ ...good, turnstileToken: 'tok' }), env)).status, 403, 'rejected by Cloudflare');
  assert.equal((await v(req(good), {})).ok, true, 'no secret, no check');
});

console.log(`\n${passed} passed${process.exitCode ? ', with failures' : ''}`);
