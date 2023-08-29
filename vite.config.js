import {fileURLToPath, URL} from 'node:url'
import {resolve} from 'path'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8888,
    open: false,
    proxy: {
      // 避免刷新404
      '/mobile/': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => '/mobile.html'
      },
      '/pc/': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => '/pc.html'
      },
    }
  },
  build: {
    rollupOptions: {
      input: {
        pc: resolve(__dirname, 'pc.html'),
        mobile: resolve(__dirname, 'mobile.html'),
      },
    },
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
