import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Use Cloudflare Worker proxy (avoids CORS issues)
  // The worker handles API key injection securely on the server side
  const workerURL = process.env.NUXT_PUBLIC_WORKER_URL || 'https://cms-proxy.seamvirak55.workers.dev'

  const instance = axios.create({
    baseURL: `${workerURL}/api`,
  })

  return {
    provide: {
      axios: instance,
    },
  }
})
