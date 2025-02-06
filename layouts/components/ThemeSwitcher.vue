<script lang="ts" setup>
import sun from '~/assets/icons/sun.png'
import moon from '~/assets/icons/half-moon.png'

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
  @apply h-7 aspect-square grid place-items-center;
}
</style>
