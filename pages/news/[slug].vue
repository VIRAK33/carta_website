<script lang="ts" setup>
/* IMPORTS */
import type { INews } from '~/types/INews'
import { isEmpty } from 'lodash-es'
import { usePathImageUrl } from '~/@core/composables/useFile'

/* STATES */
const $route = useRoute()
const news = ref<INews | null>(null)

/* FETCHING */
const { data } = useAPI({
  method: 'GET',
  url: `/v1/public/news/news/${$route.params?.slug ?? ''}`,
})
news.value = data.value?.data
</script>

<template>
  <div v-if="!isEmpty(news)" class="fixed-width py-14">
    <!-- 👉🏼 News Detail Image -->
    <img :src="usePathImageUrl(news.thumbnail)" alt="" class="mb-7" />
    <div class="relative">
      <div
        class="text-lg md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 font-semibold text-center"
      >
        {{ news.title }}
      </div>
      <div class="absolute top-0 right-0">
        <span
          class="inline-block px-2 py-0.5 text-sm text-gray-500 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl"
        >
          {{ $moment(news.created_date).format('ddd MM YYYY') }}
        </span>
      </div>
      <div
        class="mt-7 text-md md:text-lg text-gray-500 dark:text-gray-400"
        v-html="news.content"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
