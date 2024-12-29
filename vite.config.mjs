import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    assetsInlineLimit: 50,
  },
  plugins: [react()],
});
