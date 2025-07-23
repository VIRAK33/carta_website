<script lang="ts" setup>
/* IMPORTS */
import { useAPI } from '~/@core/composables/useAPI'
import { usePathImageUrl } from '~/@core/composables/useFile'
import NewsCard from '~/@core/components/card/NewsCard.vue'
import type { INews } from '~/types/INews'
import type { IInfiniteLoadingState } from '~/types/IComponent'
import { isArray, isEmpty, isNull } from 'lodash-es'
import ogImage from '~/assets/images/logo/logo.webp'

/* STATES */
const news = ref<INews[]>([])
const query = reactive<{ page: number; size: number }>({
  page: 1,
  size: 20,
})

useHead({
  title: 'CARTA Blog - Insights on AI, Robotics, and Technology',
  meta: [
    { property: 'og:title', content: 'CARTA Blog - Insights on AI, Robotics, and Technology' },
    {
      property: 'og:description',
      content: 'Stay updated with the latest trends, insights, and innovations in AI, robotics, and technology transfer through the CARTA blog.'
    },
    { property: 'og:image', content: ogImage },
    { property: 'og:url', content: 'https://carta.org.kh/news' }
  ]
})

/* METHODS */
const infiniteHandler = async (
  $state: IInfiniteLoadingState
): Promise<void> => {
  try {
    const { data } = await useAPI({
      method: 'GET',
      url: '/v1/public/news/news',
      params: {
        page: query.page,
        size: query.size,
      },
    })

    if (isArray(data.value?.results) && !isEmpty(data.value?.results)) {
      news.value.push(...data.value?.results)
      query.page++

      isNull(data.value?.next) ? $state.complete() : $state.loaded()
    }
  } catch (error) {
    $state.complete()
  }
}
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

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-9 py-14">
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
          :thumbnail="usePathImageUrl(thumbnail)"
          :title="title"
        />
      </RouterLink>
    </div>
    <InfiniteLoading :distance="10" class="mb-14" @infinite="infiniteHandler">
      <template #complete>
        <span />
      </template>
      <template #spinner>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-9">
          <NewsCard v-for="$n in 5" :key="$n" loading title="" />
        </div>
      </template>
    </InfiniteLoading>
  </div>
</template>

<style lang="scss" scoped></style>
