<script lang="ts" setup>
/* IMPORTS */
import { ref, watch, computed } from 'vue'
import { useHead } from '#app'
import { useI18n } from 'vue-i18n'
import NewsCard from '~/@core/components/card/NewsCard.vue'
import { isArray } from 'lodash-es'
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
  }
}

interface NewsApiResponse {
  data: NewsListItem[]
  pagination?: {
    total?: number
    totalPages?: number
  }
}

/* COMPOSABLES */
const { locale } = useI18n()

/* STATES */
const news = ref<NewsListItem[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const total = ref(0)
const limit = 12
const loading = ref(false)

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

// All news items render with the same card layout (no separate featured hero).
const gridNews = computed(() => news.value)

/* METHODS */
const fetchNews = async (page: number) => {
  loading.value = true
  try {
    const data = await $fetch<NewsApiResponse>('https://web-api.carta.org.kh/api/news', {
      method: 'GET',
      params: {
        page,
        limit,
        fields: 'thumbnail,title,title_km,short_content,short_content_km,slug,createdAt',
      },
    })

    if (isArray(data?.data)) {
      news.value = data.data
      const pagination = data.pagination
      totalPages.value = pagination.totalPages
      total.value = pagination.total
      currentPage.value = pagination.page
    }
  } catch (error) {
    console.error('Error loading news:', error)
  } finally {
    loading.value = false
  }
}

const onPageChange = async (page: number) => {
  currentPage.value = page
  await fetchNews(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* LIFECYCLE */
await fetchNews(1)

watch(() => locale.value, () => {
  fetchNews(currentPage.value)
})
</script>

<template>
  <div class="fixed-width py-14">
    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="w-full md:w-1/3 flex flex-col items-center justify-center mx-auto"
    >
      <AppTitle text="Our Latest News" />
      <span class="inline-block pt-4 subtitle text-center">
        Effective teams communication openly, leverage strength, and embrace
        diversity for success.
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
