<script setup lang="ts">
// Modern gradient banner — no particles.
</script>

<template>
  <div class="banner">
    <!-- Decorative blurred blobs for depth -->
    <div class="banner__blob banner__blob--1" />
    <div class="banner__blob banner__blob--2" />
    <div class="banner__blob banner__blob--3" />

    <!-- Subtle grid overlay -->
    <div class="banner__grid" />

    <!-- Fade to page background so the banner blends in -->
    <div class="banner__fade" />

    <!-- Content -->
    <div class="banner__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  @apply relative w-full overflow-hidden;
  height: 220px;
  background:
    radial-gradient(ellipse at 50% -20%, rgba(248, 113, 113, 0.5) 0%, rgba(248, 113, 113, 0) 55%),
    linear-gradient(135deg, #b91c1c 0%, #7f1d1d 55%, #450a0a 100%);

  /* Soft color blobs */
  &__blob {
    @apply absolute rounded-full pointer-events-none;
    filter: blur(60px);

    &--1 {
      @apply w-72 h-72 -top-24 -left-16;
      background: rgba(254, 202, 202, 0.18);
    }

    &--2 {
      @apply w-80 h-80 -bottom-28 -right-20;
      background: rgba(248, 113, 113, 0.16);
    }

    &--3 {
      @apply w-56 h-56 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
      background: rgba(255, 255, 255, 0.06);
    }
  }

  /* Faint grid */
  &__grid {
    @apply absolute inset-0 pointer-events-none opacity-[0.05];
    background-image:
      linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }

  /* Fade to page background */
  &__fade {
    @apply absolute inset-x-0 bottom-0 pointer-events-none bg-gradient-to-t from-white dark:from-gray-950 to-transparent;
    height: 70px;
  }

  &__content {
    @apply absolute inset-0 flex items-center justify-center pointer-events-none;
  }
}
</style>
