<script lang="ts" setup>
/* IMPORTS */
const $config = useRuntimeConfig()
</script>

<template>
  <RouterLink class="app-logo" to="/">
    <!-- Logo Image -->
    <img alt="Carta" src="/logo.png" />
    <div class="text" v-text="$t('app_name')" />
  </RouterLink>
</template>

<style lang="scss" scoped>
@import '@core/scss/_mixins.scss';

.app-logo {
  @apply flex items-center gap-4 text-xl font-semibold;

  img {
    @apply max-w-20 max-h-20 aspect-square object-cover rounded-full;
  }

  .text {
    @apply max-w-sm text-base dark:text-primary-500 font-semibold;
  }
}
</style>
