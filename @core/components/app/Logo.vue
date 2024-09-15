<script lang="ts" setup>
/* IMPORTS */
const $config = useRuntimeConfig()
</script>

<template>
  <RouterLink class="app-logo" to="/">
    <!-- Logo Image -->
    <img alt="Carta" src="/logo.png" />
    <div class="text" v-text="$config.public.APP_NAME_EN" />
  </RouterLink>
</template>

<style lang="scss" scoped>
@import '@core/scss/_mixins.scss';

.app-logo {
  @apply flex flex-col items-center text-xl font-semibold;

  img {
    @apply max-w-20 max-h-20 aspect-square object-cover rounded-full;
  }

  .text {
    @apply max-w-md text-base dark:text-primary-500 font-semibold;
  }
}
</style>
