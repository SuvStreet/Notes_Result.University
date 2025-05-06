import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@features': '/src/features',
    },
  },
  server: {
    open: true,
  },
})
