<script lang="ts" setup>
/* IMPORTS */

/* PROPS */
const $props = defineProps<{
  photos: string[]
}>()

/* STATES */
const { $lightGallery } = useNuxtApp()
const galleryRef = ref<HTMLElement | null>(null)

function onInitialLightGallery(): void {
  $lightGallery(galleryRef.value, {
    // Custom lightGallery options
    thumbnail: true,
    zoom: true,
    speed: 500,
  })
}

onMounted(() => onInitialLightGallery())
</script>

<template>
  <div
    ref="galleryRef"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
  >
    <a
      v-for="(img, $i) in photos"
      :key="$i"
      :href="img"
      class="group rounded-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden"
    >
      <img :src="img" alt="" class="transition-transform duration-500 group-hover:scale-105" />
    </a>
  </div>
</template>

<style lang="scss" scoped></style>
