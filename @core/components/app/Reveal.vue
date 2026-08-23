<script lang="ts" setup>
/* PROPS */
defineProps<{
  delay?: number
  y?: number
}>()
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: y ?? 16 }"
    :visible="{
      opacity: 1,
      y: 0,
      transition: { duration: 400, delay: delay ?? 0, ease: 'easeOut' },
    }"
  >
    <slot />
  </div>
</template>
