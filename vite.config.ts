import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || (process.env.GITHUB_ACTIONS ? '/serck-david-portfolio/' : '/'),
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});

