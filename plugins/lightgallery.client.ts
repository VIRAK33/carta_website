import { defineNuxtPlugin, type NuxtApp } from '#app'
import lightGallery from 'lightgallery'

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgFullscreen from 'lightgallery/plugins/fullscreen'
import lgZoom from 'lightgallery/plugins/zoom'

// CSS
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-fullscreen.css'

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  nuxtApp.provide('lightGallery', ($el: HTMLElement, options = {}) => {
    return lightGallery($el, {
      licenseKey: 'GPLv3',
      plugins: [lgThumbnail, lgFullscreen, lgZoom],
      ...options,
    })
  })
})
