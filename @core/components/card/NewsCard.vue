<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'

/* PROPS */
const props = defineProps<{
  thumbnail?: string
  title: string
  description?: string
  date?: string
  loading?: boolean
}>()

/* STATE */
const imageError = ref(false)
const imageLoaded = ref(false)
const imgRef = ref<HTMLImageElement | null>(null)

// If the image is already complete when mounted (SSR HTML + cache /
// fast network), the `load` event has already fired and will never fire
// again — without this check the card stays at opacity-0 forever.
onMounted(() => {
  const img = imgRef.value
  if (!img || !img.src) return
  if (img.complete) {
    if (img.naturalWidth > 0) imageLoaded.value = true
    else imageError.value = true
  }
})

// Reset state when the thumbnail URL changes (e.g. locale switch)
watch(
  () => props.thumbnail,
  () => {
    imageLoaded.value = false
    imageError.value = false
  },
)
</script>

<template>
  <div :class="{ loading }" class="card">
    <!-- 👉🏼Loading -->
    <div v-if="loading" class="card-inner">
      <div class="card-img-wrapper">
        <USkeleton class="w-full h-full rounded-2xl" />
      </div>
      <div class="card-block space-y-2.5">
        <USkeleton class="h-5 w-3/4 rounded-md" />
        <USkeleton class="h-4 w-full rounded-md" />
        <USkeleton class="h-4 w-2/3 rounded-md" />
        <div class="pt-2">
          <USkeleton class="h-6 w-24 rounded-full" />
        </div>
      </div>
    </div>
    <div v-else class="card-inner">
      <!-- 👉🏼 Card Image -->
      <div class="card-img-wrapper group">
        <img
          v-if="thumbnail && !imageError"
          ref="imgRef"
          :class="{ 'opacity-0': !imageLoaded }"
          :src="thumbnail"
          :alt="title || 'CARTA News'"
          decoding="async"
          class="card-img"
          @load="imageLoaded = true"
          @error="imageError = true"
        >
        <!-- Placeholder shown while loading, when there is no thumbnail, or on error -->
        <div
          v-if="!imageLoaded || imageError || !thumbnail"
          class="card-img card-img-placeholder"
        >
          <div class="flex items-center justify-center h-full text-gray-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- 👉🏼 Card Info -->
      <div class="card-block">
        <h4 class="title" v-text="title" />
        <span class="subtitle" v-text="description" />
        <span class="date-text" v-text="date" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply w-full;

  &-inner {
    @apply p-0;

    .card-img-wrapper {
      @apply w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10;
      aspect-ratio: 4 / 3;
      position: relative;

      .card-img {
        @apply w-full h-full rounded-xl object-cover transition-all duration-300 group-hover:scale-110;
        display: block;
      }

      .card-img-placeholder {
        @apply absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700;
      }
    }
  }

  &-block {
    @apply pt-7 pb-4;

    .title {
      @apply text-lg text-gray-800 dark:text-gray-100 font-semibold tracking-wide line-clamp-2;
    }

    .subtitle {
      @apply text-base text-gray-600 dark:text-gray-300 line-clamp-2;
    }

    .date-text {
      @apply inline-flex items-center mt-4 px-3 py-1 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/80 ring-1 ring-black/5 dark:ring-white/10;
    }
  }

  &.loading {
    .card-inner .card-img-wrapper {
      @apply w-full bg-gray-200 dark:bg-gray-700;
    }

    .card-block .title {
      @apply w-1/2 h-4 bg-gray-200 dark:bg-gray-800 rounded-md;
    }

    .card-block .subtitle {
      @apply w-full h-6 bg-gray-200 dark:bg-gray-800 rounded-md mt-4;
    }
  }
}
</style>
