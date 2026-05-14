/**
 * Prerender script for Bhuiyan Workforce Ltd.
 *
 * Run AFTER `vite build`:
 *   node prerender.mjs
 *
 * This script visits every route using a headless browser (via Puppeteer),
 * waits for the React app to render, then saves the full HTML to dist/.
 * Google and other crawlers then get real HTML — no JavaScript required.
 *
 * Renders up to CONCURRENCY routes in parallel to stay within
 * Cloudflare Pages' 20-minute build limit.
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { PRERENDER_ROUTES } from './vite.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');

// Number of routes rendered simultaneously.
// 5 is safe for Cloudflare's build VMs. Raise to 8 if builds are still slow.
const CONCURRENCY = 5;

async function startServer() {
  const { default: serveStatic } = await import('serve-static');
  const serve = serveStatic(DIST, { index: ['index.html'] });

  const server = http.createServer((req, res) => {
    serve(req, res, () => {
      // SPA fallback — serve index.html for unknown routes
      const indexPath = path.join(DIST, 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    });
  });

  await new Promise((resolve) => server.listen(5173, resolve));
  console.log('📡 Static server running on http://localhost:5173\n');
  return server;
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    const url = `http://localhost:5173${route}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});

    const html = await page.content();

    const routePath = route === '/' ? '/index.html' : `${route}/index.html`;
    const filePath = path.join(DIST, routePath);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, html, 'utf-8');

    console.log(`  ✅ ${route}`);
    return { route, ok: true };
  } catch (err) {
    console.log(`  ❌ ${route} — ${err.message}`);
    return { route, ok: false };
  } finally {
    await page.close();
  }
}

async function runWithConcurrency(tasks, concurrency) {
  const results = [];
  const queue = [...tasks];

  async function worker() {
    while (queue.length > 0) {
      const task = queue.shift();
      results.push(await task());
    }
  }

  await Promise.all(
    Array.from({ length: concurrency }, () => worker())
  );

  return results;
}

async function prerender() {
  console.log(`🚀 Starting prerender (concurrency: ${CONCURRENCY})...\n`);

  const server = await startServer();
  const browser = await puppeteer.launch({ headless: 'new' });

  const tasks = PRERENDER_ROUTES.map(
    (route) => () => renderRoute(browser, route)
  );

  const results = await runWithConcurrency(tasks, CONCURRENCY);

  await browser.close();
  server.close();

  const success = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;

  console.log(`\n✨ Prerender complete: ${success} succeeded, ${failed} failed`);
  console.log('📁 Output saved to /dist\n');

  if (failed > 0) process.exit(1);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
