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
  <button
    class="ls-btn"
    type="button"
    aria-label="Switch language"
    title="Switch language"
    @click="onToggleSwitch"
  >
    <ClientOnly>
      <img
        v-if="locale === 'km'"
        alt="English language"
        src="@/assets/icons/uk.png"
        width="24"
        height="24"
      />
      <img
        v-else
        alt="Khmer language"
        src="@/assets/icons/khmer.png"
        width="24"
        height="24"
      />
      <template #fallback>
        <span class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 inline-block" />
      </template>
    </ClientOnly>
  </button>
</template>

<style lang="scss" scoped>
.ls-btn {
  @apply w-9 h-9 rounded-xl grid place-items-center ring-1 ring-black/5 dark:ring-white/10
  hover:ring-primary-200 dark:hover:ring-primary-700 hover:bg-primary-50 dark:hover:bg-gray-800
  transition-all duration-200 overflow-hidden;

  img {
    @apply w-6 h-6 rounded-full object-cover;
  }
}
</style>
