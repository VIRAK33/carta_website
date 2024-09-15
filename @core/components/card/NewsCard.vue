<script lang="ts" setup>
/* PROPS */
defineProps<{
  thumbnail?: string
  title: string
  description?: string
  date?: string
}>()
</script>

<template>
  <div class="card">
    <div class="card-inner">
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
}
</style>
