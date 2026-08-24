<script lang="ts" setup>
/* IMPORTS */
import { isEmpty } from 'lodash-es'
import { useRoute } from 'vue-router'
import moment from 'moment'
import { useEventListener } from '@vueuse/core'
import NewsCard from '~/@core/components/card/NewsCard.vue'
import fallbackOgImage from '~/assets/images/logo/logo.webp'

/* TYPES */
interface NewsDetailItem {
  id: string
  createdAt: string
  updatedAt: string
  data: {
    slug: string
    thumbnail?: string | null
    title?: string
    title_km?: string
    content?: string
    content_km?: string
    short_content?: string
    short_content_km?: string
    gallery?: string[]
  }
}

interface NewsListEntry {
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

/* COMPOSABLES */
const { locale } = useI18n()

/* STATES */
const $route = useRoute()
const slug = computed(() => $route.params.slug as string)
const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

// Fetch news detail from worker proxy - query by slug for single article
const {
  data: newsResponse,
  pending,
  error,
} = await useFetch<{ data: NewsDetailItem[] }>(
  () =>
    slug.value
      ? `https://web-api.carta.org.kh/api/news?slug=${slug.value}&fields=thumbnail,title,title_km,short_content,short_content_km,content,content_km,slug,gallery,createdAt,updatedAt`
      : null,
  {
    method: 'GET',
    key: () => `news-detail-${slug.value}`,
    watch: [() => slug.value, () => locale.value],
    // Lazy on the client so the loading skeleton is shown while fetching;
    // blocking on the server so SSR/prerendered HTML still has the full article.
    lazy: import.meta.client,
  }
)

// Related articles — small batch, current slug excluded
const { data: relatedResponse } = await useFetch<{ data: NewsListEntry[] }>(
  () =>
    slug.value
      ? `https://web-api.carta.org.kh/api/news?limit=8&fields=thumbnail,title,title_km,short_content,short_content_km,slug,createdAt`
      : null,
  {
    method: 'GET',
    key: () => `news-related-${slug.value}`,
    watch: [() => slug.value, () => locale.value],
    lazy: import.meta.client,
  }
)

/* FIELD HELPERS */
// Get field value based on current language
const getFieldValue = (
  baseData: Record<string, any>,
  fieldName: string
): any => {
  const suffix = locale.value === 'km' ? '_km' : ''
  const langField = `${fieldName}${suffix}`
  // Try language-specific field first, then fallback to base field
  return baseData[langField] || baseData[fieldName]
}

const resolveImageUrl = (thumb: string | null | undefined): string => {
  if (!thumb) return fallbackOgImage
  return thumb.startsWith('http')
    ? thumb
    : `https://cms-api.graphmining.dev${thumb}`
}

/* COMPUTED */
// Extract the news data from response
const news = computed(() => {
  if (!slug.value || pending.value || error.value) {
    return null
  }

  // Check if response has data array with at least one article
  if (
    !newsResponse.value?.data ||
    !Array.isArray(newsResponse.value.data) ||
    newsResponse.value.data.length === 0
  ) {
    return null
  }

  // Get the first (and only) article from the response
  const newsItem = newsResponse.value.data[0]
  if (!newsItem) {
    return null
  }

  const baseData = newsItem.data

  return {
    title: getFieldValue(baseData, 'title'),
    content: getFieldValue(baseData, 'content'),
    short_content: getFieldValue(baseData, 'short_content'),
    thumbnail: resolveImageUrl(baseData.thumbnail),
    slug: baseData.slug,
    gallery: (baseData.gallery || [])
      .map((g: string) => resolveImageUrl(g))
      .filter(Boolean),
    createdAt: newsItem.createdAt,
    updatedAt: newsItem.updatedAt,
    id: newsItem.id,
  }
})

const relatedNews = computed(() => {
  const list = relatedResponse.value?.data
  if (!Array.isArray(list)) return []
  return list
    .filter((item) => item?.data?.slug && item.data.slug !== slug.value)
    .slice(0, 3)
    .map((item) => ({
      title: getFieldValue(item.data, 'title'),
      short_content: getFieldValue(item.data, 'short_content'),
      thumbnail: resolveImageUrl(item.data.thumbnail),
      slug: item.data.slug,
      createdAt: item.createdAt,
    }))
})

// Estimated reading time (words for latin, characters for Khmer)
const readingTime = computed(() => {
  const text = news.value?.content
    ? news.value.content.replace(/<[^>]*>/g, '').trim()
    : ''
  if (!text) return 1
  if (locale.value === 'km') return Math.max(1, Math.round(text.length / 400))
  return Math.max(1, Math.round(text.split(/\s+/).length / 200))
})

// Helper function to extract excerpt from content
const getExcerpt = (content: string): string => {
  if (!content) return ''
  const plainText = content.replace(/<[^>]*>/g, '')
  return plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '')
}

const pageUrl = `https://carta.org.kh/news/${slug.value}`
const fallbackDescription =
  'Read the latest insights and updates from CARTA - Cambodia AI Robotics and Technology Transfer Association'

/* SHARE */
const shareLinks = computed(() => {
  const url = encodeURIComponent(pageUrl)
  const title = encodeURIComponent(news.value?.title ?? '')
  return [
    {
      name: 'facebook',
      label: 'Facebook',
      icon: 'mdi:facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      name: 'telegram',
      label: 'Telegram',
      icon: 'mdi:telegram',
      href: `https://t.me/share/url?url=${url}&text=${title}`,
    },
    {
      name: 'twitter',
      label: 'X',
      icon: 'mdi:twitter',
      href: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    },
  ]
})

const openShare = (href: string): void => {
  window.open(href, '_blank', 'noopener,noreferrer,width=600,height=500')
}

const copyLink = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(pageUrl)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Clipboard unavailable — ignore
  }
}

/* READING PROGRESS */
const scrollProgress = ref(0)
const updateScrollProgress = (): void => {
  const el = document.documentElement
  const max = el.scrollHeight - window.innerHeight
  scrollProgress.value =
    max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}
onMounted(() => {
  updateScrollProgress()
  useEventListener(window, 'scroll', updateScrollProgress, { passive: true })
  useEventListener(window, 'resize', updateScrollProgress, { passive: true })
})

/* SEO */
// Reactive SEO meta — updates once the article data resolves (lazy fetch on client).
useSeoMeta({
  title: () =>
    news.value ? `${news.value.title} | CARTA` : 'CARTA Blog - News',
  ogTitle: () => news.value?.title ?? 'CARTA Blog',
  description: () =>
    news.value
      ? getExcerpt(news.value.short_content || news.value.content)
      : fallbackDescription,
  ogDescription: () =>
    news.value
      ? getExcerpt(news.value.short_content || news.value.content)
      : fallbackDescription,
  ogImage: () => (news.value ? news.value.thumbnail : fallbackOgImage),
  ogUrl: pageUrl,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => news.value?.title ?? 'CARTA Blog',
  twitterDescription: () =>
    news.value
      ? getExcerpt(news.value.short_content || news.value.content)
      : fallbackDescription,
  twitterImage: () => (news.value ? news.value.thumbnail : fallbackOgImage),
})
</script>

<template>
  <div>
    <!-- Reading progress bar -->
    <div
      class="fixed top-0 left-0 right-0 z-[60] h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-rose-500 origin-left"
      :style="{ transform: `scaleX(${scrollProgress})` }"
      aria-hidden="true"
    />

    <!-- Loading Skeleton -->
    <div v-if="pending" class="mx-auto max-w-6xl px-4">
      <!-- Back link skeleton -->
      <USkeleton class="h-8 w-28 rounded-full mt-8 mb-6" />

      <!-- Hero skeleton: image + overlapping title card -->
      <div class="relative">
        <div class="w-full rounded-3xl overflow-hidden">
          <USkeleton class="w-full aspect-video md:aspect-[21/9]" />
        </div>

        <!-- Overlapping card -->
        <div
          class="relative -mt-20 md:-mt-28 mx-4 md:mx-10 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10 shadow-xl p-6 md:p-10 space-y-4"
        >
          <USkeleton class="h-3 w-24" />
          <USkeleton class="h-8 w-3/4" />
          <USkeleton class="h-8 w-1/2" />
          <div class="flex flex-wrap gap-3 pt-2">
            <USkeleton class="h-6 w-28 rounded-full" />
            <USkeleton class="h-6 w-32 rounded-full" />
          </div>
        </div>
      </div>

      <!-- Share (mobile) skeleton -->
      <div class="flex lg:hidden items-center gap-2 mt-8">
        <USkeleton class="h-4 w-12" />
        <USkeleton
          v-for="n in 4"
          :key="`s-${n}`"
          class="w-9 h-9 rounded-full"
        />
      </div>

      <!-- Body skeleton: article column -->
      <div class="lg:grid lg:grid-cols-[56px_minmax(0,1fr)] lg:gap-10 mt-10">
        <aside class="hidden lg:flex flex-col items-center gap-2">
          <USkeleton
            v-for="n in 4"
            :key="`r-${n}`"
            class="w-10 h-10 rounded-full"
          />
        </aside>
        <div class="mx-auto max-w-3xl w-full">
          <USkeleton class="h-1 w-24 rounded-full mb-10" />
          <div class="space-y-3">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-11/12" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-4/5" />
            <USkeleton class="h-4 w-full" />
          </div>
        </div>
      </div>

      <!-- Gallery skeleton -->
      <div class="mt-16">
        <USkeleton class="h-6 w-32 mb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <USkeleton v-for="n in 3" :key="`g-${n}`" class="aspect-video" />
        </div>
      </div>

      <!-- Related skeleton -->
      <div class="mt-16">
        <USkeleton class="h-6 w-40 mb-4" />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
          <USkeleton v-for="n in 3" :key="`rel-${n}`" class="aspect-[4/3]" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="!isEmpty(news)" class="mx-auto max-w-6xl px-4">
      <!-- Back link -->
      <NuxtLink
        :to="{ name: 'news' }"
        class="group inline-flex items-center gap-1.5 mt-8 mb-6 rounded-full px-3.5 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 ring-1 ring-gray-200 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
      >
        <Icon
          class="text-base transition-transform duration-300 group-hover:-translate-x-1"
          name="material-symbols:arrow-back-rounded"
        />
        {{ $t('news.back_to_news') }}
      </NuxtLink>

      <!-- Hero: image + overlapping glassy title card -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="relative"
      >
        <div
          class="w-full rounded-3xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
        >
          <div class="relative w-full aspect-video md:aspect-[21/9]">
            <img
              :src="news.thumbnail"
              alt=""
              class="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              @error="
                (e) => ((e.target as HTMLImageElement).src = '/placeholder.png')
              "
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            />
          </div>
        </div>

        <!-- Overlapping header card -->
        <div
          class="relative -mt-20 md:-mt-28 mx-4 md:mx-10 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10 shadow-xl p-6 md:p-10"
        >
          <span class="eyebrow">{{ $t('news.eyebrow') }}</span>
          <h1
            class="text-xl sm:text-2xl lg:text-2xl text-gray-800 dark:text-gray-100 font-bold leading-snug mb-5"
          >
            {{ news.title }}
          </h1>
          <div
            class="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
          >
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              <Icon
                class="text-base"
                name="material-symbols:calendar-today-rounded"
              />
              {{ moment(news.createdAt).format('MMM DD, YYYY') }}
            </span>
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              <Icon
                class="text-base"
                name="material-symbols:schedule-rounded"
              />
              {{ $t('news.min_read', { count: readingTime }) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Share (mobile) -->
      <div class="flex lg:hidden items-center gap-2 mt-8">
        <span
          class="text-sm font-semibold text-gray-500 dark:text-gray-400 mr-1"
          >{{ $t('news.share') }}</span
        >
        <button
          v-for="s in shareLinks"
          :key="s.name"
          type="button"
          class="grid place-items-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-white hover:bg-primary-500 transition-colors"
          :aria-label="s.label"
          @click="openShare(s.href)"
        >
          <Icon class="text-lg" :name="s.icon" />
        </button>
        <button
          type="button"
          class="grid place-items-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-white hover:bg-primary-500 transition-colors"
          :aria-label="$t('news.copy_link')"
          @click="copyLink"
        >
          <Icon
            class="text-lg"
            :name="copied ? 'mdi:check' : 'mdi:link-variant'"
          />
        </button>
      </div>

      <!-- Body: sticky share rail (desktop) + article -->
      <div class="lg:grid lg:grid-cols-[56px_minmax(0,1fr)] lg:gap-10 mt-10">
        <!-- Sticky share rail -->
        <aside
          class="hidden lg:flex flex-col items-center gap-2 sticky top-28 self-start"
        >
          <span
            class="text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1 vertical-text"
            >{{ $t('news.share') }}</span
          >
          <button
            v-for="s in shareLinks"
            :key="s.name"
            type="button"
            class="grid place-items-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-white hover:bg-primary-500 hover:-translate-y-0.5 transition-all"
            :aria-label="s.label"
            @click="openShare(s.href)"
          >
            <Icon class="text-xl" :name="s.icon" />
          </button>
          <button
            type="button"
            class="grid place-items-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-white hover:bg-primary-500 hover:-translate-y-0.5 transition-all"
            :aria-label="$t('news.copy_link')"
            @click="copyLink"
          >
            <Icon
              class="text-xl"
              :name="copied ? 'mdi:check' : 'mdi:link-variant'"
            />
          </button>
        </aside>

        <!-- Article -->
        <article class="mx-auto max-w-3xl w-full">
          <AppReveal>
            <div
              class="mb-10 h-1 w-24 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
            />
            <div class="prose prose-lg dark:prose-invert max-w-none">
              <div
                class="text-gray-700 text-lg dark:text-gray-300 leading-relaxed"
                v-html="news.content"
              />
            </div>
          </AppReveal>
        </article>
      </div>

      <!-- Gallery -->
      <AppReveal v-if="news.gallery.length > 0" class="mt-16">
        <div class="flex flex-col items-start mb-4">
          <span class="eyebrow">{{ $t('news.gallery_eyebrow') }}</span>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {{ $t('news.gallery') }}
          </h2>
        </div>
        <AppGallery :photos="news.gallery" />
      </AppReveal>

      <!-- Related articles -->
      <AppReveal v-if="relatedNews.length > 0" class="mt-16">
        <div class="flex flex-col items-start mb-4">
          <span class="eyebrow">{{ $t('news.related_eyebrow') }}</span>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {{ $t('news.related') }}
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
          <AppReveal
            v-for="(item, $i) in relatedNews"
            :key="item.slug"
            :delay="$i * 70"
          >
            <RouterLink
              :to="{ name: 'news-slug', params: { slug: item.slug } }"
              class="inline-block cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            >
              <NewsCard
                :date="moment(item.createdAt).format('MMM DD, YYYY')"
                :description="item.short_content"
                :thumbnail="item.thumbnail"
                :title="item.title"
              />
            </RouterLink>
          </AppReveal>
        </div>
      </AppReveal>
    </div>

    <!-- No data state -->
    <div v-else class="fixed-width py-14 text-center">
      <div v-if="pending" class="text-gray-500 dark:text-gray-400">
        <div class="inline-block">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"
          ></div>
          <p>Loading article...</p>
        </div>
      </div>
      <div v-else-if="error" class="text-red-500">
        <p class="font-semibold mb-2">Failed to load article</p>
        <p class="text-sm">
          {{ error.message || 'An error occurred while fetching the article' }}
        </p>
      </div>
      <div v-else class="text-gray-500 dark:text-gray-400">
        <p>No article found</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

:deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
}

:deep(a) {
  color: #3b82f6;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #1d4ed8;
  }
}

:deep(p) {
  margin-bottom: 1.25rem;
}

:deep(h2) {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
}

:deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
}

:deep(ul),
:deep(ol) {
  margin-left: 1.5rem;
  padding-left: 0.5rem;
  margin-bottom: 1.25rem;
}

:deep(li) {
  margin-bottom: 0.5rem;
}

:deep(blockquote) {
  border-left: 4px solid #ef4444;
  background: linear-gradient(to right, rgba(239, 68, 68, 0.07), transparent);
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 0.75rem 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
}

:deep(code) {
  background-color: #f3f4f6;
  padding: 0.2em 0.45em;
  border-radius: 0.375rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.875em;
}

:deep(pre) {
  background-color: #1f2937;
  color: #f3f4f6;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;

  code {
    background: none;
    padding: 0;
  }
}

:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;

  th,
  td {
    border: 1px solid #e5e7eb;
    padding: 0.6rem 0.9rem;
    text-align: left;
  }

  th {
    background-color: #f9fafb;
    font-weight: 600;
  }
}

:deep(hr) {
  border: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #e5e7eb, transparent);
  margin: 2rem 0;
}
</style>
