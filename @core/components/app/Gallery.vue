<script lang="ts" setup>
/* IMPORTS */
import { useImageOrientation } from '~/@core/composables/useImageOrientation'

/* PROPS */
const $props = defineProps<{
  photos: string[]
}>()

/* STATES */
const { $lightGallery } = useNuxtApp()
const galleryRef = ref<HTMLElement | null>(null)
const imageOrientations = ref<string[]>([])

// This function will resolve the orientation and update the array
const getImageDimensions = async (index: number, img: string) => {
  imageOrientations.value[index] = await useImageOrientation(img)
}

function onInitialLightGallery(): void {
  $lightGallery(galleryRef.value, {
    // Custom lightGallery options
    thumbnail: true,
    zoom: true,
    speed: 500,
  })
}

onMounted(() => {
  $props.photos.forEach((img, index) => {
    // Initialize the orientations array with placeholders
    imageOrientations.value.push('square') // default while loading
    getImageDimensions(index, img) // Get the actual orientation
  })

  onInitialLightGallery() // Initialize the light gallery
})
</script>

<template>
  <div ref="galleryRef" class="gallery-wrapper">
    <a
      v-for="(img, $i) in photos"
      :key="$i"
      :class="`gallery-item ${imageOrientations[$i]}`"
      :href="img"
    >
      <img :src="img" alt="" class="gallery-item--img" />
    </a>
  </div>
</template>

<style lang="scss" scoped>
.gallery-wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
  grid-auto-flow: dense;
}

.gallery-wrapper > .gallery-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gallery-wrapper > .gallery-item > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.gallery-wrapper .horizontal {
  grid-column: span 2;
}

.gallery-wrapper .vertical {
  grid-row: span 2;
}

.gallery-wrapper .big {
  grid-column: span 2;
  grid-row: span 2;
}
</style>
