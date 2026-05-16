import type { NuxtApp } from '#app'
import { defineNuxtPlugin } from '#app'
import moment from 'moment'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  nuxtApp.provide('moment', moment)
})
