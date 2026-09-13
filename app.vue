<script lang="ts" setup>
/* STATES */
const $config = useRuntimeConfig()

const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: () => locale.value || 'km',
  },
  title: $config.public.APP_NAME || 'CARTA',
  titleTemplate: (titleChunk?: string) => {
    if (!titleChunk || titleChunk === 'Carta' || titleChunk === 'CARTA') {
      return 'CARTA - Cambodia AI Robotics and Technology Transfer Association'
    }
    return titleChunk.includes('CARTA') ? titleChunk : `${titleChunk} | CARTA`
  },
  meta: [
    { name: 'color-scheme', content: 'light dark' },
    { name: 'darkreader-lock', content: 'true' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': 'https://carta.org.kh/#organization',
            'name': 'Cambodia AI Robotics and Technology Transfer Association',
            'alternateName': ['CARTA', 'សមាគម CARTA'],
            'url': 'https://carta.org.kh',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://carta.org.kh/logo.png',
              'width': 640,
              'height': 640,
            },
            'image': 'https://carta.org.kh/og-image.png',
            'description': 'National platform fostering innovation in Cambodia through AI, robotics, and technology transfer.',
            'contactPoint': {
              '@type': 'ContactPoint',
              'telephone': '+855 (61) 809 888',
              'email': 'info@carta.org.kh',
              'contactType': 'Customer Service',
              'areaServed': 'KH',
              'availableLanguage': ['English', 'Khmer'],
            },
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Phnom Penh',
              'addressCountry': 'Cambodia',
            },
          },
          {
            '@type': 'WebSite',
            '@id': 'https://carta.org.kh/#website',
            'url': 'https://carta.org.kh',
            'name': 'CARTA',
            'publisher': {
              '@id': 'https://carta.org.kh/#organization',
            },
            'inLanguage': ['km', 'en'],
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <Body
    class="antialiased duration-300 transition-colors text-gray-800 bg-white dark:bg-[#0d1527] dark:text-gray-100"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<style lang="scss" scoped></style>
