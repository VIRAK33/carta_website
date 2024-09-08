<script lang="ts" setup>
/* IMPORTS */
import { useAppConfigStore } from '~/stores/use-app-config.store'

/* STATES */
const $appStore = useAppConfigStore()
</script>

<template>
  <main
    id="main"
    :style="{ '--navbar-height': $appStore.navbarHeight }"
    class="main"
  >
    <slot />
  </main>
</template>

<style lang="scss" scoped>
#main {
  //padding-top: var(--navbar-height);
  @apply w-full pt-[72px] grid place-items-center;
  height: calc(100vh - 300px);
}
</style>
