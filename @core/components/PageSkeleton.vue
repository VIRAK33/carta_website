<script lang="ts" setup>
/* IMPORTS */
import { useAppConfigStore } from '~/stores/use-app-config.store'

/* STATES */
const $appConfigStore = useAppConfigStore()
</script>

<template>
  <Transition name="skeleton-fade" appear>
    <div v-if="$appConfigStore.loading" aria-hidden="true" class="skeleton-page">
      <div class="fixed-width">
        <!-- 👉🏼 Hero banner -->
        <USkeleton class="w-full h-48 md:h-72 rounded-3xl mb-10" />

        <!-- 👉🏼 Heading -->
        <div class="max-w-2xl space-y-4 mb-10">
          <USkeleton class="h-3 w-24" />
          <USkeleton class="h-8 md:h-10 w-3/4" />
          <USkeleton class="h-4 w-1/2" />
        </div>

        <!-- 👉🏼 Paragraphs -->
        <div class="max-w-3xl space-y-3">
          <USkeleton class="h-3.5 w-full" />
          <USkeleton class="h-3.5 w-full" />
          <USkeleton class="h-3.5 w-2/3" />
          <USkeleton class="h-3.5 w-5/6" />
        </div>

        <!-- 👉🏼 Section heading -->
        <USkeleton class="h-6 w-44 mt-16 mb-8" />

        <!-- 👉🏼 Card grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 3" :key="n" class="space-y-4">
            <USkeleton class="w-full aspect-[4/3] rounded-2xl" />
            <USkeleton class="h-4 w-3/4" />
            <USkeleton class="h-3 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.skeleton-page {
  @apply min-h-[calc(100vh-var(--navbar-height))] w-full bg-white dark:bg-cool-800 py-10 md:py-14;
}

/* Fade transition */
.skeleton-fade-enter-active,
.skeleton-fade-leave-active {
  transition: opacity 0.3s ease;
}

.skeleton-fade-enter-from,
.skeleton-fade-leave-to {
  opacity: 0;
}
</style>
