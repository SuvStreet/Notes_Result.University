import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, type ManifestOptions } from 'vite-plugin-pwa'

const manifest: Partial<ManifestOptions> | false = {
  theme_color: '#5e5e5e',
  background_color: '#ffffff',
  icons: [
    {
      purpose: 'maskable',
      sizes: '512x512',
      src: 'icon512_maskable.png',
      type: 'image/png',
    },
    {
      purpose: 'any',
      sizes: '512x512',
      src: 'icon512_rounded.png',
      type: 'image/png',
    },
  ],
  screenshots:[
    {
      src: '/screenshot/desktop_1.png',
      sizes: '1919x906',
      type: 'image/png',
      form_factor: 'wide',
    },
    {
      src: '/screenshot/desktop_2.png',
      sizes: '1919x910',
      type: 'image/png',
      form_factor: 'wide',
    },
    {
      src: '/screenshot/desktop_3.png',
      sizes: '1900x900',
      type: 'image/png',
      form_factor: 'wide',
    },
    {
      src: '/screenshot/mobile_1.png',
      sizes: '302x545',
      type: 'image/png',
      form_factor: 'narrow',
    },
    {
      src: '/screenshot/mobile_2.png',
      sizes: '304x539',
      type: 'image/png',
      form_factor: 'narrow',
    },
    {
      src: '/screenshot/mobile_3.png',
      sizes: '306x542',
      type: 'image/png',
      form_factor: 'narrow',
    },
    {
      src: '/screenshot/mobile_4.png',
      sizes: '302x539',
      type: 'image/png',
      form_factor: 'narrow',
    },
  ],
  orientation: 'any',
  display: 'standalone',
  lang: 'ru-RU',
  name: 'Мои Заметки',
  short_name: 'My notes',
  start_url: '/',
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: manifest,
    }),
  ],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@features': '/src/features',
      '@widgets': '/src/widgets',
      '@entities': '/src/entities',
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  server: {
    open: true,
  },
})
