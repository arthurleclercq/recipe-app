import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['pg']
  },
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      process: "process/browser"
    }
  }
});