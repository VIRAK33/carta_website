<script lang="ts" setup>
defineProps<{
  text: string
  centered?: boolean
}>()
</script>

<template>
  <div class="base-title" :class="{ centered }">
    <h6>{{ text }}</h6>
  </div>
</template>

<style lang="scss" scoped>
.base-title {
  @apply relative text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight;

  &:before {
    content: '';
    @apply absolute bottom-0 left-0 w-16 md:w-24 h-1.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-400;
  }

  &.centered {
    @apply flex flex-col items-center text-center;

    &:before {
      @apply left-1/2 -translate-x-1/2;
    }
  }
}
</style>
