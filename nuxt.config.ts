// nuxt.config.ts
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  ssr: true,

  experimental: {
    appManifest: false,
  },

  app: {
    head: {
      meta: [
        { name: 'color-scheme', content: 'light dark' },
        { name: 'darkreader-lock', content: 'true' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    },
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ['/news', '/events'],
    },
  },

  hooks: {
    async 'nitro:config'(nitroConfig: import('nitropack').NitroConfig) {
      if (nitroConfig.dev) return
      try {
        const res = await fetch('https://web-api.carta.org.kh/api/news?fields=slug&limit=500')
        const json = await res.json()
        const slugRoutes = (json?.data ?? []).map((item: { data?: { slug?: string } }) => item.data?.slug ? `/news/${item.data.slug}` : '').filter(Boolean)
        nitroConfig.prerender = nitroConfig.prerender ?? {}
        nitroConfig.prerender.routes = [...(nitroConfig.prerender.routes ?? []), ...slugRoutes]
      } catch (e) {
        console.warn('Could not prefetch news slugs for prerender:', e)
      }
    },
  },

  // Path aliases
  alias: {
    '@core': '/@core',
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    shim: false,
  },

  // Global CSS/SCSS
  css: [resolve('./@core/scss/_index.scss')],

  // --- BUILD MODULES ---
  buildModules: [
    'nuxt-icon',
  ],

  // --- MODULES ---
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-headlessui',
    '@vueuse/motion/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
  ],

  // --- BUILD CONFIGURATION ---
  build: {
    transpile: ['axios'],
  },

  // --- VITE CONFIGURATION ---
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['import', 'legacy-js-api'],
        },
      },
    },
    optimizeDeps: {
      include: ['axios'],
    },
  },

  // --- COMPONENT SCANNING ---
  components: [
    {
      prefix: '',
      path: resolve('~/@core/components'),
      global: true,
    },
    {
      prefix: 'Layout',
      path: resolve('./layouts/components'),
      global: true,
    },
    {
      prefix: 'App',
      path: resolve('./@core/components/app'),
      global: true,
    },
  ],

  // --- AUTO IMPORTS ---
  imports: {
    dirs: [
      'composables',
      resolve('./stores'),
      '~/stores',
      resolve('./@core/composables'),
    ],
  },

  // --- MODULE CONFIGURATIONS ---

  googleFonts: {
    families: {
      Quicksand: [400, 500, 600, 700],
      'Kantumruy Pro': [400, 500, 600, 700],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
    download: false,
  },

  headlessui: {
    prefix: 'Headless',
  },

  pinia: {
    storesDirs: ['~/stores/**'],
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en.yml' },
      { code: 'km', name: 'ភាសាខ្មែរ', language: 'km-KH', file: 'km.yml' },
    ],
    lazy: false,
    langDir: 'locales/',
    defaultLocale: 'km',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // --- RUNTIME CONFIG ---
  runtimeConfig: {
    public: {
      APP_NAME: process.env.NUXT_APP_NAME ?? '',
      APP_NAME_KH: process.env.NUXT_APP_NAME_KH ?? '',
      APP_NAME_EN: process.env.NUXT_APP_NAME_EN ?? '',
      API_URL: process.env.NUXT_APP_API_URL ?? '',
      WORKER_URL: process.env.NUXT_PUBLIC_WORKER_URL ?? 'https://web-api.carta.org.kh',
      CMS_API_KEY: process.env.NUXT_PUBLIC_CMS_API_KEY ?? '',
    },
  },

  devtools: { enabled: false },
  compatibilityDate: '2024-09-10',
})
