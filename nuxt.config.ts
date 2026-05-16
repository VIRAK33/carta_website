// nuxt.config.ts
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  // Enable SSR for pre-rendering with data fetching at build time
  ssr: true,

  // Experimental features
  experimental: {
    localLayerAliases: true,
  },

  // Configure Nitro for pre-rendering
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  hooks: {
    async 'build:before'(nuxt) {
      try {
        console.log('🔄 Fetching news slugs for pre-rendering...');

        const response = await fetch(
          'https://web-api.carta.org.kh/api/news?limit=100&fields=slug'
        );

        if (!response.ok) {
          console.warn(`⚠️ Failed to fetch news: ${response.status}`);
          return;
        }

        const data = await response.json();

        if (!data?.data || !Array.isArray(data.data)) {
          console.warn('⚠️ No news data found');
          return;
        }

        const routes = data.data
          .filter((item: any) => item.data?.slug)
          .map((item: any) => `/news/${item.data.slug}`);

        console.log(`✅ Found ${routes.length} news articles to pre-render`);

        // Store in nuxt hook context for later use
        if (!nuxt.options.nitro.prerender) {
          nuxt.options.nitro.prerender = {};
        }
        if (!nuxt.options.nitro.prerender.routes) {
          nuxt.options.nitro.prerender.routes = [];
        }
        nuxt.options.nitro.prerender.routes.push(...routes);
      } catch (error) {
        console.warn('⚠️ Error fetching news slugs:', error);
      }
    },
  },

  // App-wide transitions and head metadata
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
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

  // --- MODULES ---
  // All modules go here. `buildModules` is for Nuxt 2.
  modules: [
    // Styling & UI
    '@nuxt/ui',
    '@nuxt/icon',
    'nuxt-headlessui',

    // State Management
    '@pinia/nuxt',
    // 'pinia-plugin-persistedstate/nuxt', // This is often problematic. Use a custom plugin instead. See explanation.

    // Utilities & Animations
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/google-fonts',

    // Other
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
  ],

  // --- BUILD CONFIGURATION ---
  // The build key should only be defined ONCE.
  build: {
    transpile: ['axios'],
  },

  // --- VITE CONFIGURATION ---
  vite: {
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
      Quicksand: [300, 400, 500, 600, 700],
      'Kantumruy Pro': [100, 200, 300, 400, 500, 600, 700], // Note: Removed '+' from family name
    },
  },

  headlessui: {
    prefix: 'Headless',
  },

  pinia: {
    storesDirs: ['~/stores/**'],
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.yml' },
      { code: 'km', name: 'ភាសាខ្មែរ', iso: 'km-KH', file: 'km.yml' },
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

  unhead: {
    legacy: false
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

  devtools: { enabled: true },
  compatibilityDate: '2024-09-10',
})
