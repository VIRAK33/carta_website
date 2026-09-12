<script lang="ts" setup>
/* STATES */
const $config = useRuntimeConfig()

useHead({
  title: $config.public.APP_NAME || 'CARTA',
  titleTemplate: (titleChunk?: string) => {
    if (!titleChunk || titleChunk === 'Carta' || titleChunk === 'CARTA') {
      return 'CARTA - Cambodia AI Robotics and Technology Transfer Association'
    }
    return titleChunk.includes('CARTA') ? titleChunk : `${titleChunk} | CARTA`
  },
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
