<script lang="ts" setup>
/* IMPORTS */
import { useAppConfigStore } from '~/stores/use-app-config.store'
import PageSkeleton from '~/@core/components/PageSkeleton.vue'

/* STATES */
const nuxtApp = useNuxtApp()
const $appConfigStore = useAppConfigStore()

nuxtApp.hook('page:finish', () => $appConfigStore.onUpdateLoading(false))
</script>

<template>
  <main id="main" class="main">
    <LayoutNavbar />
    <LayoutPageContent>
      <PageSkeleton />
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
