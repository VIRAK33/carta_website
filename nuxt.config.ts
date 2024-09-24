// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  // Exp
  experimental: {
    localLayerAliases: true,
  },

  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  alias: {
    '@core': '/@core',
  },

  typescript: {
    strict: true,
    shim: false,
  },

  css: [resolve('./@core/scss/_index.scss')],

  modules: [
    '@nuxt/ui', // Styling & UI
    '@nuxt/eslint',
    'nuxt-headlessui', // Animation
    '@vueuse/motion/nuxt', // State Management
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
  ],

  router: {
    middleware: ['loader'],
  },

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

  imports: {
    dirs: [
      'composables',
      resolve('./stores'),
      '~/stores', // Auto-import Pinia Store
      resolve('./@core/composables'), // Auto-import composables from this directory
    ],
  },

  tailwindcss: {},

  googleFonts: {
    families: {
      Quicksand: [300, 400, 500, 600, 700],
      'Kantumruy+Pro': [100, 200, 300, 400, 500, 600, 700],
    },
  },

  headlessui: {
    prefix: 'Headless',
  },

  /* 👉🏼Pinia Module */
  pinia: {
    storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**'],
  },

  /* 👉🏼Color Mode Module */
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  build: {
    transpile: [],
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-09-10',

  runtimeConfig: {
    public: {
      APP_NAME: process.env.NUXT_APP_NAME ?? '',
      APP_NAME_KH: process.env.NUXT_APP_NAME_KH ?? '',
      APP_NAME_EN: process.env.NUXT_APP_NAME_EN ?? '',
      API_URL: process.env.NUXT_APP_API_URL ?? '',
    },
  },
})
