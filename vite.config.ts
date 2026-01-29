// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),

      // ✅ Add these if you want to import pages & styles via aliases
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
    },
  },
});