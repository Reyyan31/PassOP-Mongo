import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Listen on all interfaces
    port: 5173,
    hmr: {
      host: '840d-103-174-4-155.ngrok-free.app', // keep the ngrok host for hmr
      protocol: 'ws',
    },
    watch: {
      usePolling: true,
    },
  },
});