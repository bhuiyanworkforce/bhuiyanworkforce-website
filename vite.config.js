import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// The page list now lives in src/routes.js (used by scripts/generate-pages.mjs).
// Vendor chunking only applies to the browser build, not the --ssr build.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // Browser build: the 436 kB guide text is not part of the main bundle; it is fetched on demand
  // (see ensureGuides in src/data/countryGuides.jsx). The server build keeps the real data.
  resolve: isSsrBuild ? {} : {
    alias: [{ find: /^\.\/guidesSource\.js$/, replacement: fileURLToPath(new URL('./src/data/guidesStub.js', import.meta.url)) }],
  },
  build: {
    outDir: 'dist',
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              map: ['react-simple-maps'],
            },
          },
        },
  },
}));
