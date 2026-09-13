<script lang="ts" setup>
/* IMPORTS */
import { ref, computed } from 'vue'
import { useHead } from '#app'
import { useI18n } from 'vue-i18n'
import NewsCard from '~/@core/components/card/NewsCard.vue'
import moment from 'moment'

const OG_IMAGE = 'https://carta.org.kh/logo.png'

/* TYPES */
interface NewsListItem {
  id: string
  createdAt: string
  data: {
    slug: string
    thumbnail?: string | null
    title?: string
    title_km?: string
    short_content?: string
    short_content_km?: string
    content?: string
    content_km?: string
  }
}

interface NewsApiResponse {
  data: NewsListItem[]
  pagination?: {
    total?: number
    totalPages?: number
    page?: number
  }
}

/* COMPOSABLES */
const { locale } = useI18n()

/* STATES */
const currentPage = ref(1)
const limit = 12

useHead({
  title: 'CARTA Blog - Insights on AI, Robotics, and Technology',
  titleTemplate: '%s',
  link: [
    { rel: 'canonical', href: 'https://carta.org.kh/news' },
  ],
  meta: [
    { property: 'og:title', content: 'CARTA Blog - Insights on AI, Robotics, and Technology' },
    {
      property: 'og:description',
      content: 'Stay updated with the latest trends, insights, and innovations in AI, robotics, and technology transfer through the CARTA blog.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: OG_IMAGE },
    { property: 'og:image:secure_url', content: OG_IMAGE },
    { property: 'og:image:width', content: '640' },
    { property: 'og:image:height', content: '640' },
    { property: 'og:image:alt', content: 'CARTA Blog' },
    { property: 'og:url', content: 'https://carta.org.kh/news' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'CARTA Blog - Insights on AI, Robotics, and Technology' },
    {
      name: 'twitter:description',
      content: 'Stay updated with the latest trends, insights, and innovations in AI, robotics, and technology transfer through the CARTA blog.',
    },
    { name: 'twitter:image', content: OG_IMAGE },
    { name: 'telegram:title', content: 'CARTA Blog - Insights on AI, Robotics, and Technology' },
    {
      name: 'telegram:description',
      content: 'Stay updated with the latest trends, insights, and innovations in AI, robotics, and technology transfer through the CARTA blog.',
    },
    { name: 'telegram:image', content: OG_IMAGE },
  ],
})

/* HELPER FUNCTIONS */
const getFieldValue = (data: Record<string, unknown>, fieldName: string): string => {
  const suffix = locale.value === 'km' ? '_km' : ''
  const langField = `${fieldName}${suffix}`
  return (data[langField] || data[fieldName] || '') as string
}

const extractShortContent = (content: string): string => {
  if (!content) return ''
  const plainText = content.replace(/<[^>]*>/g, '')
  return plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '')
}

const formatDate = (date: string): string => {
  return moment(date).format('MM-DD-YYYY')
}

const resolveImageUrl = (thumb: string | null | undefined): string => {
  if (!thumb) return ''
  return thumb.startsWith('http') ? thumb : `https://cms-api.graphmining.dev${thumb}`
}

const { data: newsData, pending: loading } = await useFetch<NewsApiResponse>('https://web-api.carta.org.kh/api/news', {
  lazy: import.meta.client,
  query: computed(() => ({
    page: currentPage.value,
    limit,
    fields: 'thumbnail,title,title_km,short_content,short_content_km,slug,createdAt',
  })),
  watch: [currentPage, locale],
})

const gridNews = computed(() => newsData.value?.data ?? [])
const totalPages = computed(() => newsData.value?.pagination?.totalPages ?? 1)
const total = computed(() => newsData.value?.pagination?.total ?? 0)

const onPageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="fixed-width py-14">
    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="w-full md:w-2/3 lg:w-1/2 flex flex-col items-center justify-center mx-auto text-center"
    >
      <span class="eyebrow">{{ $t('news.eyebrow') }}</span>
      <AppTitle :text="$t('news.title')" centered />
      <span class="inline-block pt-4 subtitle text-center">
        {{ $t('news.subtitle') }}
      </span>
    </div>

    <!-- Loading skeletons -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9 py-14">
      <NewsCard v-for="$n in limit" :key="$n" loading title="" />
    </div>

    <!-- News grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-9 py-10">
      <AppReveal
        v-for="(newsItem, $i) in gridNews"
        :key="newsItem.data.slug"
        :delay="$i * 70"
      >
        <RouterLink
          :to="{ name: 'news-slug', params: { slug: newsItem.data.slug } }"
          class="inline-block cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
        >
          <NewsCard
            :date="formatDate(newsItem.createdAt)"
            :description="getFieldValue(newsItem.data, 'short_content') || extractShortContent(getFieldValue(newsItem.data, 'content'))"
            :thumbnail="resolveImageUrl(newsItem.data.thumbnail)"
            :title="getFieldValue(newsItem.data, 'title')"
          />
        </RouterLink>
      </AppReveal>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center pb-14">
      <UPagination
        :model-value="currentPage"
        :page-count="limit"
        :total="total"
        @update:model-value="onPageChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
