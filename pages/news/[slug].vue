<script lang="ts" setup>
/* IMPORTS */
import { isEmpty } from 'lodash-es'
import { useRoute } from 'vue-router'
import moment from 'moment'

/* COMPOSABLES */
const { locale } = useI18n()

/* STATES */
const $route = useRoute()
const slug = computed(() => $route.params.slug as string)

// Fetch news detail from worker proxy - only when slug is defined
const { data: newsResponse, pending, error } = await useFetch<any>(
  () => slug.value ? `https://web-api.carta.org.kh/api/news?limit=100&fields=thumbnail,title,title_km,short_content,short_content_km,content,content_km,slug,gallery,createdAt,updatedAt` : null,
  {
    method: 'GET',
    watch: [() => slug.value, () => locale.value],
  }
)

// Get field value based on current language
const getFieldValue = (baseData: Record<string, any>, fieldName: string): any => {
  const suffix = locale.value === 'km' ? '_km' : ''
  const langField = `${fieldName}${suffix}`
  // Try language-specific field first, then fallback to base field
  return baseData[langField] || baseData[fieldName]
}

// Extract the news data from response
const news = computed(() => {
  if (!slug.value) {
    console.log('⚠️ No slug available');
    return null;
  }

  if (pending.value) {
    console.log('⏳ Data is loading...');
    return null;
  }

  if (error.value) {
    console.error('❌ API Error:', error.value);
    return null;
  }

  if (!newsResponse.value?.data || !Array.isArray(newsResponse.value.data)) {
    console.warn('⚠️ Invalid response format:', newsResponse.value);
    return null;
  }

  console.log(`🔍 Searching for slug: "${slug.value}"`);
  console.log(`📰 Available articles:`, newsResponse.value.data.map((item: any) => item.data?.slug));

  const newsItem = newsResponse.value.data.find((item: any) => item.data?.slug === slug.value);

  if (newsItem) {
    const baseData = newsItem.data;
    console.log('✅ Found article:', baseData.slug);

    return {
      title: getFieldValue(baseData, 'title'),
      content: getFieldValue(baseData, 'content'),
      short_content: getFieldValue(baseData, 'short_content'),
      thumbnail: baseData.thumbnail,
      slug: baseData.slug,
      gallery: baseData.gallery,
      createdAt: newsItem.createdAt,
      updatedAt: newsItem.updatedAt,
      id: newsItem.id,
    };
  }

  console.warn(`❌ Article not found for slug: "${slug.value}"`);
  return null;
})

// Helper function to extract excerpt from content
const getExcerpt = (content: string): string => {
  if (!content) return ''
  const plainText = content.replace(/<[^>]*>/g, '')
  return plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '')
}

// SEO Head
useHead(() => ({
  title: news.value ? `${news.value.title} | CARTA Blog` : 'CARTA Blog - News',
  meta: [
    {
      name: 'description',
      content: news.value ? getExcerpt(news.value.content) : 'Read the latest insights and updates from CARTA - Cambodia AI Robotics and Technology Transfer Association',
    },
    {
      name: 'og:title',
      property: 'og:title',
      content: news.value?.title || 'CARTA Blog',
    },
    {
      name: 'og:description',
      property: 'og:description',
      content: news.value ? getExcerpt(news.value.content) : 'Read the latest insights and updates from CARTA',
    },
    {
      name: 'og:image',
      property: 'og:image',
      content: news.value && news.value.thumbnail
        ? (news.value.thumbnail.startsWith('http') ? news.value.thumbnail : `https://cms-api.graphmining.dev${news.value.thumbnail}`)
        : 'https://carta.org.kh/og-image.png',
    },
    {
      name: 'og:image:width',
      property: 'og:image:width',
      content: '1200',
    },
    {
      name: 'og:image:height',
      property: 'og:image:height',
      content: '630',
    },
    {
      name: 'og:url',
      property: 'og:url',
      content: news.value ? `https://carta.org.kh/news/${news.value.slug}` : 'https://carta.org.kh/news',
    },
    {
      name: 'og:type',
      property: 'og:type',
      content: 'article',
    },
    {
      name: 'article:published_time',
      property: 'article:published_time',
      content: news.value?.createdAt || '',
    },
    {
      name: 'article:modified_time',
      property: 'article:modified_time',
      content: news.value?.updatedAt || '',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: news.value?.title || 'CARTA Blog',
    },
    {
      name: 'twitter:description',
      content: news.value ? getExcerpt(news.value.content) : 'Read the latest insights and updates from CARTA',
    },
    {
      name: 'twitter:image',
      content: news.value ? news.value.thumbnail : 'https://carta.org.kh/og-image.png',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: news.value ? `https://carta.org.kh/news/${news.value.id}` : 'https://carta.org.kh/news',
    },
  ],
}))
</script>

<template>
  <!-- Loading Skeleton -->
  <div v-if="pending" class="mx-auto max-w-7xl px-4">
    <!-- Hero Image Skeleton -->
    <div class="w-full rounded-lg overflow-hidden mb-8">
      <USkeleton class="w-full h-80" />
    </div>

    <!-- Title Skeleton -->
    <div class="mb-8 space-y-4">
      <USkeleton class="h-10 w-3/4" />
      <USkeleton class="h-6 w-1/4" />
    </div>

    <!-- Content Skeleton -->
    <div class="mb-8 space-y-3">
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-3/4" />
    </div>

    <!-- Gallery Skeleton -->
    <div class="mb-8">
      <USkeleton class="h-6 w-32 mb-4" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <USkeleton v-for="n in 3" :key="n" class="aspect-video" />
      </div>
    </div>
  </div>

  <!-- Content -->
  <div v-if="!isEmpty(news) && !pending" class="mx-auto max-w-7xl px-4">
    <!-- Hero Image -->
    <div class="w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8">
      <div class="relative w-full pt-[56.25%]">
        <img
          :src="news.thumbnail"
          alt=""
          class="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          @error="e => (e.target as HTMLImageElement).src = '/placeholder.png'"
        />
      </div>
    </div>

    <!-- Header Section -->
    <div class="mb-8">
      <h1 class="text-3xl md:text-2xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold mb-4">
        {{ news.title }}
      </h1>
      <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span class="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
          {{ moment(news.createdAt).format('MMM DD, YYYY') }}
        </span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mb-8 prose dark:prose-invert max-w-none">
      <div class="text-gray-700 text-xl md:text-lg dark:text-gray-300 leading-relaxed" v-html="news.content" />
    </div>

    <!-- Gallery -->
    <div v-if="news.gallery && news.gallery.length > 0" class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Gallery</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(image, index) in news.gallery"
          :key="index"
          class="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
        >
          <div class="relative w-full pt-[75%] overflow-hidden group cursor-pointer">
            <img
              :src="image"
              :alt="`Gallery image ${index + 1}`"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              @error="e => (e.target as HTMLImageElement).src = '/placeholder.png'"
            />
            <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- No data state -->
  <div v-else class="fixed-width py-14 text-center">
    <div v-if="pending" class="text-gray-500 dark:text-gray-400">
      <div class="inline-block">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Loading article...</p>
      </div>
    </div>
    <div v-else-if="error" class="text-red-500">
      <p class="font-semibold mb-2">Failed to load article</p>
      <p class="text-sm">{{ error.message || 'An error occurred while fetching the article' }}</p>
    </div>
    <div v-else class="text-gray-500 dark:text-gray-400">
      <p>No article found</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(img) {
  max-width: 100%;
  height: auto;
}

:deep(a) {
  color: #3b82f6;
  text-decoration: underline;
  
  &:hover {
    color: #1d4ed8;
  }
}

:deep(p) {
  margin-bottom: 1rem;
}

:deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

:deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
}

:deep(ul), :deep(ol) {
  margin-left: 2rem;
  margin-bottom: 1rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
}

:deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
}

:deep(code) {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

:deep(pre) {
  background-color: #1f2937;
  color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}
</style>