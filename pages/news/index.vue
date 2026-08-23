<script lang="ts" setup>
/* IMPORTS */
import { ref, watch, computed } from 'vue'
import { useHead } from '#app'
import { useI18n } from 'vue-i18n'
import NewsCard from '~/@core/components/card/NewsCard.vue'
import { isArray } from 'lodash-es'
import moment from 'moment'

const ogImage = '/og-image.png'

/* COMPOSABLES */
const { locale } = useI18n()

/* STATES */
const news = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const total = ref(0)
const limit = 12
const loading = ref(false)

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

const resolveImageUrl = (thumb: string | null | undefined): string => {
  if (!thumb) return ''
  return thumb.startsWith('http') ? thumb : `https://cms-api.graphmining.dev${thumb}`
}

// Featured article = the latest one, shown as a hero card on page 1
const featured = computed(() => (currentPage.value === 1 ? news.value[0] ?? null : null))
const gridNews = computed(() => (currentPage.value === 1 ? news.value.slice(1) : news.value))

/* METHODS */
const fetchNews = async (page: number) => {
  loading.value = true
  try {
    const data = await $fetch<any>('https://web-api.carta.org.kh/api/news', {
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

    <!-- Featured article -->
    <RouterLink
      v-if="!loading && featured"
      :to="{ name: 'news-slug', params: { slug: featured.data.slug } }"
      class="card-modern group grid grid-cols-1 lg:grid-cols-2 overflow-hidden my-14"
    >
      <div class="relative overflow-hidden aspect-video lg:aspect-auto bg-gray-100 dark:bg-gray-800">
        <img
          :src="resolveImageUrl(featured.data.thumbnail)"
          :alt="getFieldValue(featured.data, 'title')"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div class="p-8 md:p-10 flex flex-col justify-center">
        <span class="eyebrow">{{ $t('news.latest') }}</span>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 leading-snug">
          {{ getFieldValue(featured.data, 'title') }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          {{ getFieldValue(featured.data, 'short_content') || extractShortContent(getFieldValue(featured.data, 'content')) }}
        </p>
        <div class="flex items-center justify-between gap-4">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <Icon class="text-base" name="material-symbols:calendar-today-rounded" />
            {{ formatDate(featured.createdAt) }}
          </span>
          <span class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400">
            {{ $t('news.read_more') }}
            <Icon class="transition-transform duration-300 group-hover:translate-x-1" name="material-symbols:arrow-forward-rounded" />
          </span>
        </div>
      </div>
    </RouterLink>

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
