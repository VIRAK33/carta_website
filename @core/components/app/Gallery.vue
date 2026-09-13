<script lang="ts" setup>
/* IMPORTS */

/* PROPS */
const $props = defineProps<{
  photos: string[]
}>()

/* STATES */
const { $lightGallery } = useNuxtApp()
const galleryRef = ref<HTMLElement | null>(null)
let lgInstance: { destroy?: () => void } | null = null

function onInitialLightGallery(): void {
  if (galleryRef.value && typeof $lightGallery === 'function') {
    lgInstance = $lightGallery(galleryRef.value, {
      thumbnail: true,
      zoom: true,
      speed: 500,
    })
  }
}

onMounted(() => onInitialLightGallery())

onBeforeUnmount(() => {
  if (lgInstance && typeof lgInstance.destroy === 'function') {
    try {
      lgInstance.destroy()
    } catch {
      // ignore
    }
    lgInstance = null
  }
  if (import.meta.client) {
    document.querySelectorAll('.lg-backdrop, .lg-outer, .lg-container').forEach(el => el.remove())
  }
})
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
      <img :src="img" :alt="`CARTA Event Gallery Photo ${$i + 1}`" loading="lazy" decoding="async" class="transition-transform duration-500 group-hover:scale-105" />
    </a>
  </div>
</template>

<style lang="scss" scoped></style>
