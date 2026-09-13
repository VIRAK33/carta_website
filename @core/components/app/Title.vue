<script lang="ts" setup>
withDefaults(
  defineProps<{
    text: string
    centered?: boolean
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }>(),
  {
    tag: 'h2',
  }
)
</script>

<template>
  <div class="base-title" :class="{ centered }">
    <component :is="tag" class="title-heading">{{ text }}</component>
  </div>
</template>

<style lang="scss" scoped>
.base-title {
  @apply relative text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold tracking-tight pb-3.5 sm:pb-4 mb-2;

  .title-heading {
    @apply leading-normal font-bold;
  }

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
