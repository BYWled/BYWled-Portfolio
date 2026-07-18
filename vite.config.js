import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
