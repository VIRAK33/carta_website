<script lang="ts" setup>
import { useAPI } from '~/@core/composables/useAPI'
import { usePathImageUrl } from '~/@core/composables/useFile'
import NewsCard from '~/@core/components/card/NewsCard.vue'

const news = ref<{
  title: string
  short_description: string
  thumbnail: string
  created_date: string
}>()

const { data, pending, error } = useAPI({
  method: 'GET',
  url: '/v1/public/news/news',
  // params: { limit: 10 } // Optional query parameters
})

news.value = data.value?.results
</script>

<template>
  <div class="fixed-width py-14">
    <div
      class="w-full md:w-1/3 flex flex-col items-center justify-center mx-auto"
    >
      <AppTitle text="Our Latest News" />

      <span class="inline-block pt-4 subtitle text-center">
        Effective teams communication openly, leverage strength, and embrace
        diversity for success.
      </span>
    </div>

    <div
      v-if="!pending"
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-9 py-14"
    >
      <RouterLink
        v-for="(
          { title, short_description, thumbnail, created_date, slug }, $i
        ) in news"
        :key="$i"
        :to="{ name: 'news-slug', params: { slug } }"
        class="inline-block cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
      >
        <NewsCard
          :date="$moment(created_date).format('MM-DD-YYYY')"
          :description="short_description"
          :loading="pending"
          :thumbnail="usePathImageUrl(thumbnail)"
          :title="title"
        />
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
