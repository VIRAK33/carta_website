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
  
  // App Config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  
  css: [resolve('./@core/scss/_index.scss')],
  
  modules: [
    // Chore
    '@nuxt/eslint',
    // Styling & UI
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icon',
    // Animation
    '@vueuse/motion/nuxt',
    '@nuxtjs/color-mode',
    // State Management
    '@pinia/nuxt',
    '@vueuse/nuxt',
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
  ],
  
  imports: {
    dirs: [
      resolve('./stores'),
      '~/stores', // Auto-import Pinia Store
      resolve('./@core/composables'), // Auto-import composables from this directory
    ],
  },
  
  tailwindcss: {},
  
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
})
