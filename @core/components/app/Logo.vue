<script lang="ts" setup>
/* IMPORTS */
const $config = useRuntimeConfig()
</script>

<template>
  <RouterLink class="app-logo" to="/">
    <!-- Logo Image -->
    <img alt="Carta" src="/logo.webp" />
    <div class="text" v-text="$t('app_name')" />
  </RouterLink>
</template>

<style lang="scss" scoped>
@import '@core/scss/_mixins.scss';

.app-logo {
  @apply flex flex-row items-center gap-4 text-xl font-semibold;

  img {
    @apply w-auto h-14 md:h-14 aspect-square object-cover rounded-full;
  }

  .text {
    @apply max-w-sm text-base font-semibold;
    @include truncated-text(100%, 1);
  }
}
</style>
