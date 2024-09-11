<script lang="ts" setup>
/* IMPORTS */
import { useAppConfigStore } from '~/stores/use-app-config.store'

/* STATES */
const $appStore = useAppConfigStore()
</script>

<template>
  <div
    id="page-content"
    :style="{ '--navbar-height': $appStore.navbarHeight }"
    class="content"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
#content {
  //padding-top: var(--navbar-height);
  @apply w-full pb-20 grid place-items-center;
}
</style>
