import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: '/', // Ensures correct asset paths in production
  server: {
    port: 5173,
    historyApiFallback: true 
  },
  build: {
    outDir: 'dist', // Ensure build output goes to dist
    assetsDir: 'assets',
  },
});
