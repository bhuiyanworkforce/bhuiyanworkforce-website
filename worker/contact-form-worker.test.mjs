// Run with: node worker/contact-form-worker.test.mjs
// Loads worker/contact-form-worker.js exactly as it is pasted into Cloudflare (only the
// `export default` keyword is swapped so it can run here) and exercises the checks plus the
// full request handler against a pretend Resend.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const src = fs.readFileSync(fileURLToPath(new URL('./contact-form-worker.js', import.meta.url)), 'utf8');
function load(fetchImpl = async () => { throw new Error('no network in tests'); }) {
  const ctx = { atob, FormData, fetch: fetchImpl, Date, console: { error() {}, log() {} }, Response, Request };
  vm.createContext(ctx);
  vm.runInContext(src.replace('export default {', 'const worker = {') + '\nthis.validateSubmission = validateSubmission; this.worker = worker;', ctx);
  return ctx;
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
const v = load().validateSubmission;
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
await test('attachments: a PDF with stray leading bytes is accepted, an executable is not', async () => {
  const junk = b64(Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf, 0x0a]), Buffer.from('%PDF-1.7\n'), Buffer.alloc(80, 66)]));
  assert.equal((await v(req({ ...good, attachments: [{ filename: 'cv.pdf', content: junk, type: 'x' }] }), {})).ok, true);
  await fail(req({ ...good, attachments: [{ filename: 'cv.pdf', content: EXE(), type: 'x' }] }), 400);
  await fail(req({ ...good, attachments: [{ filename: 'photo.png', content: PDF(), type: 'x' }] }), 400);
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
  const vv = load().validateSubmission;
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
  const vt = load(async () => { called++; return { json: async () => ({ success: called === 1 }) }; }).validateSubmission;
  const env = { TURNSTILE_SECRET: 's' };
  assert.equal((await vt(req(good), env)).status, 403, 'missing token');
  assert.equal((await vt(req({ ...good, turnstileToken: 'tok' }), env)).ok, true, 'verified');
  assert.equal((await vt(req({ ...good, turnstileToken: 'tok' }), env)).status, 403, 'rejected by Cloudflare');
  assert.equal((await v(req(good), {})).ok, true, 'no secret, no check');
});

// ---- full handler -----------------------------------------------------------------------
function handlerWith(resend) {
  const calls = [];
  const ctx = load(async (url, init) => { calls.push({ url, init, body: JSON.parse(init.body) }); return resend(); });
  return { worker: ctx.worker, calls };
}
const ok200 = () => new Response('{"id":"abc"}', { status: 200 });
const ENV = { RESEND_API_KEY: 'key_123' };
const parse = async (r) => JSON.parse(await r.text());

await test('handler: valid submission is emailed once with the right content', async () => {
  const { worker, calls } = handlerWith(ok200);
  const att = { filename: 'CV.pdf', content: PDF(), type: 'application/pdf' };
  const res = await worker.fetch(req({ ...good, attachments: [att] }), ENV);
  assert.equal(res.status, 200);
  assert.equal(JSON.stringify(await parse(res)), '{"success":true}');
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  assert.equal(calls[0].init.headers.Authorization, 'Bearer key_123');
  const b = calls[0].body;
  assert.equal(b.from, 'Bhuiyan Workforce <info@bhuiyanworkforce.com>');
  assert.equal(b.to.join(), 'bhuiyanworkforce@gmail.com,info@bhuiyanworkforce.com');
  assert.equal(b.reply_to, 'rahim@example.com');
  assert.equal(b.subject, 'New Enquiry from Rahim Uddin');
  assert.match(b.text, /Name: Rahim Uddin[\s\S]*Message:\nHello/);
  assert.equal(b.attachments.length, 1);
  assert.equal(b.attachments[0].filename, 'CV.pdf');
});
await test('handler: worker application gets its own subject; no-reply fallback is not used as reply-to', async () => {
  const { worker, calls } = handlerWith(ok200);
  await worker.fetch(req({ ...good, email: 'no-reply@bhuiyanworkforce.com', service: 'Drivers & Transport', formType: 'worker_application', consent: true }), ENV);
  assert.equal(calls[0].body.subject, 'Worker Application: Rahim Uddin (Drivers & Transport)');
  assert.equal('reply_to' in calls[0].body, false);
});
await test('handler: Resend failure gives a failure status and leaks nothing', async () => {
  const { worker } = handlerWith(() => new Response('{"message":"secret internal detail","name":"validation_error"}', { status: 422 }));
  const res = await worker.fetch(req(good), ENV);
  assert.equal(res.status, 502);
  const text = await res.text();
  assert.ok(!text.includes('secret internal detail') && !text.includes('validation_error'));
  assert.equal(JSON.parse(text).success, false);
});
await test('handler: network error or missing key gives a generic failure', async () => {
  const w1 = load(async () => { throw new Error('connect ECONNREFUSED 10.1.2.3'); }).worker;
  const r1 = await w1.fetch(req(good), ENV);
  assert.equal(r1.status, 500);
  assert.ok(!(await r1.text()).includes('ECONNREFUSED'));
  const { worker, calls } = handlerWith(ok200);
  const r2 = await worker.fetch(req(good), {});
  assert.equal(r2.status, 500);
  assert.equal(calls.length, 0);
});
await test('handler: spam (honeypot) looks like success but sends nothing', async () => {
  const { worker, calls } = handlerWith(ok200);
  const res = await worker.fetch(req({ ...good, hp: 'bot' }), ENV);
  assert.equal(res.status, 200);
  assert.equal(calls.length, 0);
});
await test('handler: rejected request returns the status and CORS header, sends nothing', async () => {
  const { worker, calls } = handlerWith(ok200);
  const res = await worker.fetch(req({ ...good, email: 'bad' }), ENV);
  assert.equal(res.status, 400);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  assert.equal(calls.length, 0);
});
await test('handler: another website gets no CORS permission and nothing is sent', async () => {
  const { worker, calls } = handlerWith(ok200);
  const res = await worker.fetch(req(good, { origin: 'https://evil.example' }), ENV);
  assert.equal(res.status, 403);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), null);
  assert.equal(calls.length, 0);
});
await test('handler: preflight allowed for the site, refused for others; other methods refused', async () => {
  const { worker } = handlerWith(ok200);
  const pre = (origin) => new Request('https://worker.example/', { method: 'OPTIONS', headers: origin ? { Origin: origin } : {} });
  const okRes = await worker.fetch(pre(ORIGIN), ENV);
  assert.equal(okRes.status, 204);
  assert.equal(okRes.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  assert.match(okRes.headers.get('Access-Control-Allow-Headers'), /Content-Type/);
  assert.equal((await worker.fetch(pre('https://evil.example'), ENV)).status, 403);
  assert.equal((await worker.fetch(pre(null), ENV)).status, 403);
  assert.equal((await worker.fetch(new Request('https://worker.example/', { method: 'GET' }), ENV)).status, 405);
});

await test('the four website forms: payloads shaped like the real ones are accepted', async () => {
  const { worker, calls } = handlerWith(ok200);
  const send = async (body) => (await worker.fetch(req(body), ENV)).status;
  // ContactForm (company falls back to 'Not provided', optional attachment)
  assert.equal(await send({ name: 'A Buyer', email: 'a@b.com', company: 'Not provided', service: 'Other: welders', message: 'Need 20 welders', formType: 'contact',
    attachments: [{ filename: 'spec.pdf', content: PDF(), type: 'application/pdf' }] }), 200);
  // Employer guide download
  assert.equal(await send({ name: 'A Buyer', email: 'a@b.com', company: 'Acme', service: 'Employer Guide Download Request',
    message: 'Employer Guide download requested.\nCountry of interest: Poland', formType: 'employer_guide' }), 200);
  // Country guide (company may be an empty string)
  assert.equal(await send({ name: 'A Buyer', email: 'a@b.com', company: '', service: 'Country Guide Request \u2014 Romania',
    message: 'Requested the employer guide for Romania.', formType: 'country_guide' }), 200);
  // Worker application: 3 files, no email given (site substitutes no-reply@), consent recorded
  assert.equal(await send({ name: 'Rahim Uddin', email: 'no-reply@bhuiyanworkforce.com', company: 'Worker Application \u2014 Drivers & Transport',
    service: 'Drivers & Transport', message: '=== WORKER APPLICATION ===\n\nName: Rahim\n\nCONSENT\nAccepted on 2026-11-14T10:00:00.000Z.',
    attachments: [{ filename: 'cv.docx', content: b64(Buffer.concat([Buffer.from([0x50, 0x4b, 0x03, 0x04]), Buffer.alloc(200)])), type: 'x' },
      { filename: 'passport.jpg', content: b64(Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(200)])), type: 'image/jpeg' },
      { filename: 'cert.pdf', content: PDF(), type: 'application/pdf' }],
    formType: 'worker_application', consent: true, consentAt: '2026-11-14T10:00:00.000Z' }), 200);
  assert.equal(calls.length, 4);
  assert.equal(calls[3].body.attachments.length, 3);
});

console.log(`\n${passed} passed${process.exitCode ? ', with failures' : ''}`);
