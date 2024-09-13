<script lang="ts" setup>
/* STATES */
const $config = useRuntimeConfig()
const $appConfigStore = useAppConfigStore()

useHead({
  title: $config.public.APP_NAME,
  titleTemplate: `%s - Home`,
})
</script>

<template>
  <Body
    class="antialiased duration-300 transition-colors text-gray-800 bg-white dark:bg-gray-950 dark:text-gray-200"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<style lang="scss" scoped></style>
