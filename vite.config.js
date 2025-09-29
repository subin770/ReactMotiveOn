import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8081/', // ✅ Tomcat 직접 연결
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/motiveOn/api'),
      },
    },
  },
  build: {
    target: "es2015", // ✅ iOS Safari 호환성 (모달/JS 깨짐 방지)
  },
})
