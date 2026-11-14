// =====================================================================================
// Bhuiyan Workforce - contact-form worker guard
// =====================================================================================
// This file is NOT part of the website build. It is code for the Cloudflare Worker that
// receives every form on the site (contact, employer guide, country guide, worker
// application). Paste the whole file into that worker (above or below its existing code),
// then add the three lines shown under "HOW TO USE" to its POST handler.
//
// Why it exists: the worker URL is public (it is in the site's JavaScript), so anything
// the browser checks (file size, the hidden honeypot field, required fields) can be
// skipped by calling the worker directly. This repeats those checks on the server, where
// they cannot be skipped, before any email is sent.
//
// What it does
//   1. Origin check: only requests from your own site are accepted.
//   2. Size limits: body, each file, all files together, number of files.
//   3. Field checks: required fields, lengths, email shape, no line breaks in
//      single-line fields (blocks email header injection).
//   4. File checks: only pdf / jpg / png / doc / docx, base64 is valid, and the first
//      bytes of the file match its extension (so an .exe renamed to .pdf is refused).
//   5. Rate limit per visitor IP (see below).
//   6. Worker applications must carry consent === true.
//   7. Optional Cloudflare Turnstile check, switched on by adding a TURNSTILE_SECRET.
//
// What it cannot do: the Origin header can be faked by a script outside a browser, so
// this stops casual abuse and other websites posting to your worker, not a determined
// attacker. For that, turn on Turnstile (needs a site key on the website too) and use
// the rate limiter binding below.
//
// HOW TO USE (inside your existing fetch handler, after your own OPTIONS/CORS handling):
//
//   const check = await validateSubmission(request, env);
//   if (!check.ok) return <your JSON response>({ success: false, error: check.error }, check.status);
//   if (check.drop) return <your JSON response>({ success: true });   // spam: pretend it worked
//   const body = check.data;   // use this instead of await request.json()
//
// check.data is { name, email, company, service, message, formType, attachments }
// where every attachment is { filename, content (base64), type } with a safe filename
// and the correct content type.
//
// Optional setup in the Cloudflare dashboard (Worker > Settings):
//   - Variable  TURNSTILE_SECRET   (secret)   turns on the Turnstile check
//   - Binding   RATE_LIMITER       (Workers Rate Limiting binding), e.g. 5 requests / 60 s.
//     Without it the guard falls back to a per-instance counter, which is weaker because
//     Cloudflare may run several instances of your worker.
// =====================================================================================

const GUARD_CONFIG = {
  // Add a preview address here if you test from one, e.g. 'https://your-project.pages.dev'.
  allowedOrigins: [
    'https://bhuiyanworkforce.com',
    'https://www.bhuiyanworkforce.com',
  ],
  maxBodyChars: 18 * 1024 * 1024, // whole JSON body, including base64 files
  maxFiles: 3,
  maxFileBytes: 5 * 1024 * 1024, // per file, after decoding
  maxTotalFileBytes: 12 * 1024 * 1024, // all files together, after decoding
  maxMessageChars: 20000,
  // Fallback limiter only (used when there is no RATE_LIMITER binding).
  fallbackRateLimit: { max: 5, windowMs: 10 * 60 * 1000 },
  formTypes: ['contact', 'worker_application', 'employer_guide', 'country_guide'],
};

// extension -> content type and the byte signature the file must start with
const GUARD_FILE_TYPES = {
  pdf: { type: 'application/pdf', magic: [[0x25, 0x50, 0x44, 0x46]] },
  jpg: { type: 'image/jpeg', magic: [[0xff, 0xd8, 0xff]] },
  jpeg: { type: 'image/jpeg', magic: [[0xff, 0xd8, 0xff]] },
  png: { type: 'image/png', magic: [[0x89, 0x50, 0x4e, 0x47]] },
  docx: { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', magic: [[0x50, 0x4b, 0x03, 0x04]] },
  doc: { type: 'application/msword', magic: [[0xd0, 0xcf, 0x11, 0xe0]] },
};

const guardHits = new Map(); // ip -> [timestamps], used only by the fallback limiter

function guardFail(status, error) {
  return { ok: false, status, error };
}

// One-line text: control characters and line breaks become spaces, then trimmed.
function guardLine(value, max) {
  if (typeof value !== 'string') return null;
  const out = value.replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, ' ').trim();
  return out.length > max ? null : out;
}

// Multi-line text: keeps newlines and tabs, drops other control characters.
function guardText(value, max) {
  if (typeof value !== 'string') return null;
  const out = value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim();
  return out.length > max ? null : out;
}

async function guardRateLimited(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env && env.RATE_LIMITER && typeof env.RATE_LIMITER.limit === 'function') {
    const { success } = await env.RATE_LIMITER.limit({ key: ip });
    return !success;
  }
  const { max, windowMs } = GUARD_CONFIG.fallbackRateLimit;
  const now = Date.now();
  const recent = (guardHits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  guardHits.set(ip, recent);
  if (guardHits.size > 5000) {
    for (const [key, times] of guardHits) {
      if (!times.some((t) => now - t < windowMs)) guardHits.delete(key);
    }
  }
  return recent.length > max;
}

async function guardTurnstileOk(token, request, env) {
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const json = await res.json();
    return json.success === true;
  } catch {
    return false;
  }
}

// Returns { error } or { attachment, bytes }.
function guardCheckFile(file) {
  if (!file || typeof file !== 'object') return { error: 'Invalid attachment' };
  const rawName = guardLine(file.filename, 200);
  if (!rawName) return { error: 'Invalid file name' };
  const dot = rawName.lastIndexOf('.');
  const ext = dot > 0 ? rawName.slice(dot + 1).toLowerCase() : '';
  const rule = GUARD_FILE_TYPES[ext];
  if (!rule) return { error: 'File type not allowed. Use PDF, JPG, PNG, DOC or DOCX.' };

  const content = file.content;
  if (typeof content !== 'string' || content.length < 8) return { error: 'Invalid file content' };
  if (content.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(content)) return { error: 'Invalid file encoding' };
  const padding = content.endsWith('==') ? 2 : content.endsWith('=') ? 1 : 0;
  const bytes = (content.length / 4) * 3 - padding;
  if (bytes > GUARD_CONFIG.maxFileBytes) return { error: 'A file is larger than 5 MB' };

  let head;
  try {
    head = atob(content.slice(0, 16));
  } catch {
    return { error: 'Invalid file encoding' };
  }
  const matches = rule.magic.some((sig) => sig.every((b, i) => head.charCodeAt(i) === b));
  if (!matches) return { error: 'File content does not match its type' };

  const base = rawName.slice(0, dot).replace(/[\\/:*?"<>|]+/g, '_').replace(/^\.+/, '').slice(0, 80) || 'file';
  return { attachment: { filename: `${base}.${ext}`, content, type: rule.type }, bytes };
}

async function validateSubmission(request, env) {
  // 1. Origin
  const origin = request.headers.get('Origin');
  if (!origin || !GUARD_CONFIG.allowedOrigins.includes(origin)) return guardFail(403, 'Origin not allowed');

  // 2. Basic request shape
  const contentType = request.headers.get('Content-Type') || '';
  if (!contentType.toLowerCase().includes('application/json')) return guardFail(415, 'Unsupported content type');
  const declared = Number(request.headers.get('Content-Length'));
  if (Number.isFinite(declared) && declared > GUARD_CONFIG.maxBodyChars) return guardFail(413, 'Request too large');

  // 3. Rate limit (before reading the body)
  if (await guardRateLimited(request, env)) return guardFail(429, 'Too many submissions. Please try again later.');

  // 4. Body
  let text;
  try {
    text = await request.text();
  } catch {
    return guardFail(400, 'Could not read request');
  }
  if (text.length > GUARD_CONFIG.maxBodyChars) return guardFail(413, 'Request too large');
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return guardFail(400, 'Invalid JSON');
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return guardFail(400, 'Invalid request');

  // 5. Honeypot: a real visitor never fills these. Pretend it worked, send nothing.
  if ((typeof body.hp === 'string' && body.hp) || (typeof body.hp_phone === 'string' && body.hp_phone)) {
    return { ok: true, drop: true };
  }

  // 6. Turnstile (only when a secret is configured)
  if (env && env.TURNSTILE_SECRET) {
    if (!(await guardTurnstileOk(body.turnstileToken, request, env))) return guardFail(403, 'Verification failed');
  }

  // 7. Fields
  const name = guardLine(body.name, 120);
  const email = guardLine(body.email, 254);
  const company = body.company === undefined ? '' : guardLine(body.company, 200);
  const service = body.service === undefined ? '' : guardLine(body.service, 200);
  const message = guardText(body.message, GUARD_CONFIG.maxMessageChars);
  if (!name) return guardFail(400, 'Please enter your name');
  if (!email || !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)) return guardFail(400, 'Please enter a valid email address');
  if (company === null || service === null) return guardFail(400, 'A field is too long');
  if (!message) return guardFail(400, 'Please enter a message');

  const formType = GUARD_CONFIG.formTypes.includes(body.formType) ? body.formType : 'contact';
  const looksLikeApplication = formType === 'worker_application' || company.startsWith('Worker Application');
  if (looksLikeApplication && body.consent !== true) return guardFail(400, 'Consent is required to submit an application');

  // 8. Attachments
  const attachments = [];
  if (body.attachments !== undefined) {
    if (!Array.isArray(body.attachments)) return guardFail(400, 'Invalid attachments');
    if (body.attachments.length > GUARD_CONFIG.maxFiles) return guardFail(400, 'Too many files');
    let total = 0;
    for (const file of body.attachments) {
      const result = guardCheckFile(file);
      if (result.error) return guardFail(400, result.error);
      total += result.bytes;
      if (total > GUARD_CONFIG.maxTotalFileBytes) return guardFail(413, 'Files are too large together (12 MB maximum)');
      attachments.push(result.attachment);
    }
  }

  return { ok: true, data: { name, email, company, service, message, formType, attachments } };
}
