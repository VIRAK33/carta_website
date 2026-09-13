<script lang="ts" setup>
/* Logo component */
</script>

<template>
  <RouterLink class="app-logo" to="/" aria-label="CARTA Home">
    <!-- Logo Image -->
    <img
      alt="CARTA - Cambodia AI Robotics and Technology Transfer Association"
      src="/logo.webp"
      width="56"
      height="56"
      fetchpriority="high"
    />
    <!-- Desktop: Full title -->
    <div class="text hidden md:block" v-text="$t('app_name')" />
    <!-- Mobile: Abbreviated title -->
    <div class="text block md:hidden" v-text="'CARTA'" />
  </RouterLink>
</template>

<style lang="scss" scoped>
.app-logo {
  @apply flex flex-row items-center gap-4 text-xl font-semibold;

  img {
    @apply w-auto h-14 md:h-14 aspect-square object-cover rounded-full;
  }

  .text {
    @apply max-w-sm text-base font-semibold line-clamp-1;
  }
}
</style>
