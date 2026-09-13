<script lang="ts" setup>
/* STATES */
const $colorMode = useColorMode()

/* METHODS */
const onToggleTheme = (): void => {
  $colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    class="btn-switcher"
    type="button"
    aria-label="Toggle color theme"
    title="Toggle color theme"
    @click="onToggleTheme"
  >
    <ClientOnly>
      <span v-if="$colorMode.value === 'dark'" class="btn-switcher--icon">
        <Icon class="text-xl text-amber-400" name="heroicons:sun-20-solid" />
      </span>
      <span v-else class="btn-switcher--icon">
        <Icon class="text-xl text-gray-700 dark:text-gray-300" name="heroicons:moon-20-solid" />
      </span>
      <template #fallback>
        <span class="w-5 h-5" />
      </template>
    </ClientOnly>
  </button>
</template>

<style lang="scss" scoped>
.btn-switcher {
  @apply w-9 h-9 rounded-xl grid place-items-center ring-1 ring-black/5 dark:ring-white/10
  hover:ring-primary-200 dark:hover:ring-primary-700 hover:bg-primary-50 dark:hover:bg-gray-800
  transition-all duration-200;

  img {
    @apply w-6 h-6;
  }
}
</style>
