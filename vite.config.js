import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  server: {
    proxy: {
      '/blog-api': {
        target: 'https://blog.wled.top/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blog-api/, ''),
      }
    }
  }
})