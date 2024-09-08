<script lang="ts" setup>
/* IMPORTS */
import { useAppConfigStore } from '~/stores/use-app-config.store'

/* STATES */
const nuxtApp = useNuxtApp()
const $appConfigStore = useAppConfigStore()

nuxtApp.hook('page:finish', () => $appConfigStore.onUpdateLoading(false))
</script>

<template>
  <LayoutNavbar />
  <LayoutMain>
    <slot />
  </LayoutMain>
  <LayoutFooter />
</template>

<style lang="scss" scoped></style>
