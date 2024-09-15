import Masonry from 'masonry-layout'
import type { NuxtApp } from '#app'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  nuxtApp.provide('masonry', Masonry)
})
