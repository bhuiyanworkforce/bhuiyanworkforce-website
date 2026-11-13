import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The page list now lives in src/routes.js (used by scripts/generate-pages.mjs).
// Vendor chunking only applies to the browser build, not the --ssr build.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
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
