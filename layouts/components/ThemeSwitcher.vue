<script lang="ts" setup>
import sun from '~/assets/icons/sun.png'
import moon from '~/assets/icons/moon_icon.png'

/* STATES */
const $colorMode = useColorMode()

/* METHODS */
const onToggleTheme = (): void => {
  $colorMode.preference = $colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="btn-switcher" type="button" @click="onToggleTheme">
    <span v-if="$colorMode.value === 'light'" class="btn-switcher--icon">
      <Icon v-if="false"
        class="text-3xl text-yellow-600"
        name="material-symbols:sunny-rounded"
      />
      <img :src="moon" alt="moon icon" />
    </span>
    <span v-else-if="$colorMode.value === 'dark'" class="btn-switcher--icon">
      <Icon v-if="false" class="text-3xl text-gray-500" name="material-symbols:dark-mode" />
      <img :src="sun" alt="sun icon" />
    </span>
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
