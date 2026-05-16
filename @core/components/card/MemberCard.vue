<script lang="ts" setup>
/* PROPS */
defineProps<{
  title: string
  subtitle?: string
  email?: string
  img: string
}>()
</script>

<template>
  <div class="card">
    <!-- 👉🏼Card Image -->
    <div class="card-img">
      <img :src="img" alt="" />
    </div>
    <!-- 👉🏼Card Content -->
    <div :class="`card-content`">
      <div class="title" v-text="title" />
        <span class="subtitle" v-text="subtitle" />
        <br>
        <span class="email" v-text="email" />

      <div v-if="false" class="actions">
        <a class="block rounded-full cursor-pointer">
          <Icon class="text-gray-800" name="bi:twitter-x" />
        </a>
        <a class="block rounded-full cursor-pointer">
          <Icon class="text-gray-800" name="simple-icons:instagram" />
        </a>
        <a class="block rounded-full cursor-pointer">
          <Icon class="text-gray-800" name="cib:facebook" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply relative w-full p-4 mt-12;

  &-img {
    @apply absolute -top-12 left-1/2 transform -translate-x-1/2 p-1 bg-white rounded-full;

    img {
      @apply w-24 aspect-square rounded-full object-cover;
    }
  }

  &-content {
    @apply w-full rounded-lg pt-12 pb-7 px-4 text-center bg-gray-100 dark:bg-gray-900;

    .title {
      @apply text-base tracking-wide font-semibold dark:text-gray-300;
    }

    .subtitle {
      @apply text-sm font-medium leading-7 text-gray-500 dark:text-gray-400;
    }

    .actions {
      @apply flex items-center justify-center gap-3 pt-5;
    }
  }
}
</style>
