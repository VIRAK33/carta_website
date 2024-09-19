import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const instance = axios.create({
    baseURL: `${config.public.API_URL}/api`, // Set up from runtime config
  })

  return {
    provide: {
      axios: instance,
    },
  }
})
