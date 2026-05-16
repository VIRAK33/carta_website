<script lang="ts" setup>
/* IMPORTS */
import NewsCard from '~/@core/components/card/NewsCard.vue'
import type { IInfiniteLoadingState } from '~/types/IComponent'
import { isArray, isEmpty } from 'lodash-es'
import { onBeforeRouteLeave } from 'vue-router'
import moment from 'moment'
import { useRuntimeConfig } from '#app'

const ogImage = '/og-image.png'

/* COMPOSABLES */
const { locale } = useI18n()

/* STATES */
const news = ref<any[]>([])
const query = reactive<{ page: number; limit: number }>({
  page: 1,
  limit: 10,
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

/* HELPER FUNCTIONS */
const getFieldValue = (data: Record<string, any>, fieldName: string): any => {
  const suffix = locale.value === 'km' ? '_km' : ''
  const langField = `${fieldName}${suffix}`
  return data[langField] || data[fieldName]
}

const extractShortContent = (content: string): string => {
  if (!content) return ''
  const plainText = content.replace(/<[^>]*>/g, '')
  return plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '')
}

const formatDate = (date: string): string => {
  return moment(date).format('MM-DD-YYYY')
}

/* STATES */
const isLeaving = ref(false)
const enableInfiniteScroll = ref(false)

/* LIFECYCLE HOOKS */
onBeforeRouteLeave(() => {
  isLeaving.value = true
  enableInfiniteScroll.value = false
})

onMounted(() => {
  setTimeout(() => {
    enableInfiniteScroll.value = true
  }, 500)
})

// Reset news list when language changes
watch(() => locale.value, async () => {
  news.value = []
  query.page = 1
  enableInfiniteScroll.value = false

  // Load first page of news in new language
  setTimeout(async () => {
    try {
      const data = await $fetch<any>(`https://web-api.carta.org.kh/api/news`, {
        method: 'GET',
        params: {
          page: 1,
          limit: 10,
          fields: 'thumbnail,title,title_km,short_content,short_content_km,content,content_km,slug,createdAt',
        },
      })

      if (isArray(data?.data) && !isEmpty(data.data)) {
        news.value = [...data.data]
        query.page = 2
        enableInfiniteScroll.value = true
      }
    } catch (error) {
      console.error('Error loading news:', error)
      enableInfiniteScroll.value = true
    }
  }, 300)
})

/* METHODS */
const infiniteHandler = async ($state: IInfiniteLoadingState): Promise<void> => {
  try {
    const data = await $fetch<any>(`https://web-api.carta.org.kh/api/news`, {
      method: 'GET',
      params: {
        page: query.page,
        limit: query.limit,
        fields: 'thumbnail,title,title_km,short_content,short_content_km,content,content_km,slug,createdAt',
      },
    })

    if (isArray(data?.data) && !isEmpty(data.data)) {
      news.value.push(...data.data)

      const pagination = data.pagination
      if (query.page < pagination.totalPages) {
        query.page++
        $state.loaded()
      } else {
        $state.complete()
      }
    } else {
      $state.complete()
    }
  } catch (error) {
    console.error('Error loading news:', error)
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

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9 py-14">
      <RouterLink
        v-for="(newsItem, $i) in news"
        :key="$i"
        :to="{ name: 'news-slug', params: { slug: newsItem.data.slug } }"
        class="inline-block cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
      >
        <NewsCard
          :date="formatDate(newsItem.createdAt)"
          :description="getFieldValue(newsItem.data, 'short_content') || extractShortContent(getFieldValue(newsItem.data, 'content'))"
          :thumbnail="newsItem.data.thumbnail"
          :title="getFieldValue(newsItem.data, 'title')"
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
