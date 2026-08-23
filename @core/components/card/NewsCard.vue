<script lang="ts" setup>
import { ref, onMounted } from 'vue'

/* PROPS */
defineProps<{
  thumbnail?: string
  title: string
  description?: string
  date?: string
  loading?: boolean
}>()

/* STATE */
const imageError = ref(false)
const imageLoaded = ref(false)
const imgRef = ref<HTMLImageElement>()

onMounted(() => {
  if (imgRef.value?.complete) {
    if (imgRef.value.naturalWidth > 0) imageLoaded.value = true
    else imageError.value = true
  }
})
</script>

<template>
  <div :class="{ loading }" class="card">
    <!-- 👉🏼Loading -->
    <div v-if="loading" class="card-inner animate-pulse">
      <div class="card-img"></div>
      <div class="card-block">
        <div class="title" />
        <div class="subtitle" />
      </div>
    </div>
    <div v-else class="card-inner">
      <!-- 👉🏼 Card Image -->
      <div class="card-img-wrapper group">
        <img
          ref="imgRef"
          v-show="!imageError && imageLoaded"
          :src="thumbnail"
          alt=""
          class="card-img"
          @load="imageLoaded = true"
          @error="imageError = true"
        />
        <div 
          v-if="!imageLoaded" 
          class="card-img card-img-placeholder"
        >
          <div class="flex items-center justify-center h-full text-gray-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
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
@import '@core/scss/_mixins.scss';

.card {
  @apply w-full;

  &-inner {
    @apply p-0;

    .card-img-wrapper {
      @apply w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10;
      aspect-ratio: 4 / 3;
      position: relative;

      .card-img {
        @apply w-full h-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110;
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
      @apply text-lg text-gray-700 dark:text-gray-300 font-semibold tracking-wide;
      @include truncated-text(100%, 2);
    }

    .subtitle {
      @apply text-base text-gray-500 dark:text-gray-400;
      @include truncated-text(100%, 2);
    }

    .date-text {
      @apply inline-flex items-center mt-4 px-3 py-1 rounded-full text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800;
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
