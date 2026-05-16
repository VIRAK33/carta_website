<script lang="ts" setup>
/* IMPORTS */
import { useAppConfigStore } from '~/stores/use-app-config.store'

/* STATES */
const nuxtApp = useNuxtApp()
const $appConfigStore = useAppConfigStore()

nuxtApp.hook('page:finish', () => $appConfigStore.onUpdateLoading(false))
</script>

<template>
  <main id="main" class="main">
    <LayoutNavbar />
    <LayoutPageContent>
      <RouterView />
    </LayoutPageContent>
    <LayoutFooter />
  </main>
</template>

<style lang="scss" scoped></style>
