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
 * Install once:
 *   npm install --save-dev puppeteer
 */

import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PRERENDER_ROUTES } from './vite.config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');

async function prerender() {
  console.log('🚀 Starting prerender...\n');

  // Serve the built dist folder
  const server = await createServer({
    root: __dirname,
    server: { port: 5173 },
    preview: true,
  });

  // Use a simple static file server on the dist folder instead
  const { default: serveStatic } = await import('serve-static');
  const { createServer: createHttpServer } = await import('http');
  const serve = serveStatic(DIST, { index: ['index.html'] });

  const httpServer = createHttpServer((req, res) => {
    serve(req, res, () => {
      // SPA fallback — serve index.html for all routes
      const indexPath = path.join(DIST, 'index.html');
      const content = fs.readFileSync(indexPath, 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    });
  });

  await new Promise((resolve) => httpServer.listen(5173, resolve));
  console.log('📡 Static server running on http://localhost:5173\n');

  // Launch headless browser
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  let success = 0;
  let failed = 0;

  for (const route of PRERENDER_ROUTES) {
    try {
      const url = `http://localhost:5173${route}`;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

      // Wait for React to render (look for content that only exists post-render)
      await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});

      const html = await page.content();

      // Determine output path
      const routePath = route === '/' ? '/index.html' : `${route}/index.html`;
      const filePath = path.join(DIST, routePath);

      // Ensure directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, html, 'utf-8');

      console.log(`  ✅ ${route}`);
      success++;
    } catch (err) {
      console.log(`  ❌ ${route} — ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  httpServer.close();

  console.log(`\n✨ Prerender complete: ${success} succeeded, ${failed} failed`);
  console.log('📁 Output saved to /dist\n');

  if (failed > 0) process.exit(1);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
