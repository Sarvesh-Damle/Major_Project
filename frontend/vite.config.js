import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  build: {
    // Enable source maps for production debugging
    sourcemap: true,
    // Set chunk size warning limit
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom'],
          // Routing
          'vendor-router': ['react-router-dom'],
          // Data fetching
          'vendor-query': ['@tanstack/react-query', 'axios'],
          // Firebase (large dependency)
          'vendor-firebase': ['firebase/app', 'firebase/auth'],
          // Charts (only loaded on admin dashboard)
          'vendor-charts': ['recharts'],
          // Grid (only loaded on admin tables)
          'vendor-grid': ['ag-grid-community', 'ag-grid-react'],
          // Maps (only loaded on property pages)
          'vendor-maps': ['leaflet', 'react-leaflet'],
          // UI utilities
          'vendor-ui': ['framer-motion', 'react-icons', 'swiper'],
        },
      },
    },
    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
  },
});
