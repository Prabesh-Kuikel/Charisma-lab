import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Project Pages are served from /<repo>/, so asset URLs need that prefix.
  // Set BASE_PATH=/charisma-lab/ when building for GitHub Pages.
  base: process.env.BASE_PATH || '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: true,
    proxy: {
      '/api': { target: 'http://127.0.0.1:3000', changeOrigin: true },
    },
  },
  build: { outDir: 'dist', emptyOutDir: true },
});
