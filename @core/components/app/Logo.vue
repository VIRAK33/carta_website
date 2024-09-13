<script lang="ts" setup>
/* IMPORTS */
const $config = useRuntimeConfig()
</script>

<template>
  <RouterLink class="app-logo" to="/">
    <!-- Logo Image -->
    <img alt="Carta" src="/logo.png" />
    <div class="text" v-html="$config.public.APP_NAME_KH" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.app-logo {
  @apply flex items-center gap-4 text-xl font-semibold;

  img {
    @apply max-w-full max-h-20 aspect-square object-cover rounded-full;
  }

  .text {
    @apply text-xl dark:text-primary-500 font-semibold;
  }
}
</style>
