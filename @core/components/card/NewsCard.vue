<script lang="ts" setup>
/* PROPS */
defineProps<{
  thumbnail?: string
  title: string
  description?: string
  date?: string
  loading?: boolean
}>()
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
      <img :src="thumbnail" alt="" class="card-img" />

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

    .card-img {
      @apply w-full rounded-xl object-cover;
    }
  }

  &-block {
    @apply pt-7 pb-4;

    .title {
      @apply text-lg text-gray-700 dark:text-gray-300 font-semibold tracking-wide;
      @include truncated-text(100%, 1);
    }

    .subtitle {
      @apply text-base text-gray-500;
      @include truncated-text(100%, 2);
    }

    .date-text {
      @apply inline-block mt-4 text-sm text-gray-400 font-medium;
    }
  }

  &.loading {
    .card-inner .card-img {
      @apply w-full h-32 bg-gray-200 dark:bg-gray-700;
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
