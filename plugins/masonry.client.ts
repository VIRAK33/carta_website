import type { NuxtApp } from '#app'
import { defineNuxtPlugin } from '#app'
import Masonry from 'masonry-layout'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  nuxtApp.provide('masonry', Masonry)
})
