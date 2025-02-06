<script lang="ts" setup>
/* STATES */
const $config = useRuntimeConfig()
const $appConfigStore = useAppConfigStore()

useHead({
  title: $config.public.APP_NAME,
  titleTemplate: `%s - Home`,
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CARTA",
        "url": "https://carta.org.kh",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+855 (61) 809 888",
          "email": "info@carta.org.kh",
          "contactType": "Customer Service",
          "areaServed": "KH",
          "availableLanguage": ["English", "Khmer"]
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Phnom Penh",
          "addressCountry": "Cambodia"
        }
      })
    }
  ]
})
</script>

<template>
  <Body
    class="antialiased duration-300 transition-colors text-gray-800 bg-white dark:bg-cool-800 dark:text-gray-200"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<style lang="scss" scoped></style>
