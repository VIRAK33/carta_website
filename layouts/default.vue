<script lang="ts" setup>
/* IMPORTS */
import { useAppConfigStore } from '~/stores/use-app-config.store'

/* STATES */
const nuxtApp = useNuxtApp()
const $appConfigStore = useAppConfigStore()
const route = useRoute()

nuxtApp.hook('page:finish', () => $appConfigStore.onUpdateLoading(false))

// Safety: Always ensure drawer overlay is closed on route navigation
watch(
  () => route.fullPath,
  () => {
    $appConfigStore.onUpdateActiveDrawer(false)
  },
  { immediate: true },
)
</script>

<template>
  <main id="main" class="main">
    <LayoutNavbar />
    <LayoutPageContent>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </LayoutPageContent>
    <LayoutFooter />
  </main>
</template>

<style lang="scss" scoped></style>
