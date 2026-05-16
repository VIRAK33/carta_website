<script lang="ts" setup>
/* IMPORTS */
import { ILocale } from '~/types/IComponent'

/* STATES */
const { locale, setLocale } = useI18n()
const i18nRedirected = useCookie('i18n_redirected')

/* FUNCTIONS */
function onToggleSwitch(): void {
  const newLocale = locale.value === 'en' ? 'km' : 'en'
  setLocale(newLocale)
  i18nRedirected.value = newLocale
}
</script>

<template>
  <button class="ls-btn" type="button" @click="onToggleSwitch">
    <img
      v-if="locale === 'km'"
      alt="English"
      src="@/assets/icons/uk.png"
    />
    <img v-else alt="Khmer" src="@/assets/icons/khmer.png" />
  </button>
</template>

<style lang="scss" scoped>
.ls-btn {
  @apply w-7 h-7 aspect-square rounded-full p-0.5 hover:outline-2
  outline-gray-300 hover:outline-primary-500 dark:outline-gray-700
  hover:dark:outline-primary-500;
}
</style>
