<script lang="ts" setup>
/* PROPS */
import { isEmpty } from 'lodash-es'

defineProps<{
  title: string
  src: string
  gallery?: string[]
}>()

/* STATES */
const isOpen = ref(false)

/* FUNCTIONS */
function onViewSource(): void {
  isOpen.value = true
}
</script>

<template>
  <div class="card">
    <div class="card--inner">
      <img :src="src" :alt="title || 'CARTA Event Media'" loading="lazy" decoding="async" />

      <!-- 👉🏼 Card Overlay -->
      <div v-if="!isEmpty(gallery)" class="card--inner__overlay" />
      <!-- 👉🏼 Card Action -->
      <div v-if="!isEmpty(gallery)" class="card--inner__action">
        <button class="btn-view" type="button" @click="onViewSource">
          <Icon class="text-xl" name="fluent:eye-12-filled" />
          <span>View Sources</span>
        </button>
      </div>
    </div>
    <div class="card--text" v-text="title" />
  </div>

  <UModal v-model="isOpen" :ui="{ width: 'w-96 sm:max-w-3xl' }">
    <div class="modal-container">
      <!-- 👉🏼 Light Gallery Photos -->
      <AppGallery :photos="gallery" />
    </div>
  </UModal>
</template>

<style lang="scss" scoped>
.card {
  @apply w-full;

  &--inner {
    @apply relative rounded-2xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10;

    img {
      @apply w-full max-h-56 object-cover;
    }

    &:hover {
      .card--inner__overlay {
        @apply opacity-100;
      }

      .card--inner__action {
        @apply scale-100;
      }
    }

    &__overlay {
      @apply absolute top-0 left-0 z-10 w-full h-full bg-black/40
      opacity-0 transform transition-all duration-500 ease-in-out;
    }

    &__action {
      @apply absolute top-0 left-0 z-20 w-full h-full grid place-items-center
      scale-0 transition-all transform duration-500 ease-in-out;

      .btn-view {
        @apply flex items-center gap-2 px-1.5 py-1 rounded-lg transition-all
        duration-300 text-gray-100 font-semibold hover:text-white;
      }
    }
  }

  &--text {
    @apply pt-4 text-base text-gray-700 dark:text-gray-300 font-medium;
  }
}

.gallery {
  @apply w-full flex gap-4;

  &--item {
    @apply w-auto h-auto rounded-xl overflow-hidden;
  }
}

.modal-container {
  @apply w-full md:w-[920px] p-7;
  //w-full md:w-[70vw] lg:w-[50vw]
}
</style>
