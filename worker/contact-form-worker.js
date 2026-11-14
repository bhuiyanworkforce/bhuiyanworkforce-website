// =====================================================================================
// Bhuiyan Workforce - contact-form worker (complete, ready to paste)
// =====================================================================================
// Receives every form on the website (contact, employer guide, country guide, worker
// application) and emails it through Resend.
//
// HOW TO INSTALL: Cloudflare dashboard > Workers & Pages > contact-form > Edit code.
// Select everything in the editor, delete it, paste this whole file, then Deploy.
// The RESEND_API_KEY secret you already have stays as it is.
//
// What changed compared with the previous worker
//   - Only your own website can use it (before: any website could).
//   - Every submission is checked on the server before an email is sent: required fields,
//     email shape, sizes (5 MB per file, 12 MB in total, 3 files), allowed file types
//     (PDF, JPG, PNG, DOC, DOCX) whose contents must match their extension, and a limit
//     of 5 submissions per visitor per 10 minutes.
//   - Worker applications must carry the consent tick from the application form.
//   - Resend's reply and internal error messages are no longer sent to the visitor. If a
//     message cannot be sent the visitor now gets a failure status, so the form shows its
//     error banner instead of a false "success". Details go to the Cloudflare logs
//     (Worker > Logs).
//   - The old single-attachment fields (attachment_base64 / attachment_name) are gone;
//     the website has not used them for a long time.
//   - Replying to an application that has no email address no longer targets no-reply@.
//   - Worker applications get their own email subject so they are easy to spot.
//
// Settings you can add later (Worker > Settings), all optional
//   - Variable  TURNSTILE_SECRET   turns on the Cloudflare Turnstile bot check (the website
//                                  needs a matching Turnstile widget, ask before enabling).
//   - Binding   RATE_LIMITER       a Workers Rate Limiting binding; used instead of the
//                                  built-in counter, which is per worker instance.
//
// To allow another website address (for example a test copy of the site), add it to
// allowedOrigins below.
//
// The checks are tested by worker/contact-form-worker.test.mjs in the website repository.
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
    head = atob(content.slice(0, 1368)); // first ~1 KB
  } catch {
    return { error: 'Invalid file encoding' };
  }
  // PDF files may start with a few stray bytes, so the marker may appear within the first KB.
  const matches = ext === 'pdf'
    ? head.includes('%PDF')
    : rule.magic.some((sig) => sig.every((b, i) => head.charCodeAt(i) === b));
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

// ---- Worker entry point -------------------------------------------------------------

const MAIL_FROM = 'Bhuiyan Workforce <info@bhuiyanworkforce.com>';
const MAIL_TO = ['bhuiyanworkforce@gmail.com', 'info@bhuiyanworkforce.com'];
const NO_REPLY_ADDRESS = 'no-reply@bhuiyanworkforce.com'; // the site uses this when an applicant gave no email

function corsHeaders(origin) {
  const headers = { Vary: 'Origin' };
  if (origin && GUARD_CONFIG.allowedOrigins.includes(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      if (!origin || !GUARD_CONFIG.allowedOrigins.includes(origin)) return new Response(null, { status: 403 });
      return new Response(null, {
        status: 204,
        headers: {
          ...corsHeaders(origin),
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    try {
      const check = await validateSubmission(request, env);
      if (!check.ok) return jsonResponse({ success: false, error: check.error }, check.status, origin);
      if (check.drop) return jsonResponse({ success: true }, 200, origin); // spam: pretend it worked

      if (!env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return jsonResponse({ success: false, error: 'Service unavailable' }, 500, origin);
      }

      const { name, email, company, service, message, formType, attachments } = check.data;

      const text = `
New enquiry from Bhuiyan Workforce website

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Service: ${service || 'Not specified'}

Message:
${message}
      `.trim();

      const subject = formType === 'worker_application'
        ? `Worker Application: ${name}${service ? ` (${service})` : ''}`
        : `New Enquiry from ${name}`;

      const payload = { from: MAIL_FROM, to: MAIL_TO, subject, text };
      if (email.toLowerCase() !== NO_REPLY_ADDRESS) payload.reply_to = email;
      if (attachments.length > 0) payload.attachments = attachments;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error('Resend rejected the email', res.status, await res.text());
        return jsonResponse({ success: false, error: 'Could not send your message' }, 502, origin);
      }

      return jsonResponse({ success: true }, 200, origin);
    } catch (err) {
      console.error('Form worker error', err && err.message);
      return jsonResponse({ success: false, error: 'Something went wrong' }, 500, origin);
    }
  },
};
