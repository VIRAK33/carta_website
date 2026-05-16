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
      class="rounded-xl overflow-hidden"
    >
      <img :src="img" alt="" />
    </a>
  </div>
</template>

<style lang="scss" scoped></style>
