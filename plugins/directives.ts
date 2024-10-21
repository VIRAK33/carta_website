import { defineNuxtPlugin } from '#app'
import vAnimateNumber from '~/@core/directives/v-animate-number'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animate-number', vAnimateNumber)
})
