<script lang="ts" setup>
/* IMPORTS */
import { ref, onMounted, onUnmounted } from 'vue'
const $config = useRuntimeConfig()

/* STATES */
const isSmallScreen = ref(true)

/* LIFECYCLE */
onMounted(() => {
  const checkScreenSize = () => {
    isSmallScreen.value = window.innerWidth < 768
  }
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  onUnmounted(() => window.removeEventListener('resize', checkScreenSize))
})
</script>

<template>
  <RouterLink class="app-logo" to="/">
    <!-- Logo Image -->
    <img alt="CARTA - Cambodia AI Robotics and Technology Transfer Association" src="/logo.webp" />
    <!-- Desktop: Full title -->
    <div v-if="!isSmallScreen" class="text" v-text="$t('app_name')" />
    <!-- Mobile: Abbreviated title -->
    <div v-if="isSmallScreen" class="text" v-text="'CARTA'" />
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
