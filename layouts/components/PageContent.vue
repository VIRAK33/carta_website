<script lang="ts" setup>
/* IMPORTS */
import { useAppConfigStore } from '~/stores/use-app-config.store'

/* STATES */
const $appStore = useAppConfigStore()
</script>

<template>
  <div
    id="page-content"
    :style="{ '--navbar-height': `${$appStore.navbarHeight}px` }"
    class="page-content"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
#page-content {
  @apply w-full pb-20;
  //padding-top: var(--navbar-height);
}
</style>
