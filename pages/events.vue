<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useHead } from '#app'
import { useI18n } from 'vue-i18n'

const OG_IMAGE = 'https://carta.org.kh/og-image.png'

/* TYPES */
interface RawEventData {
  id: string
  data: {
    title: string
    title_km?: string
    description: string
    description_km?: string
    location: string
    start_date: string
    end_date: string
  }
}

interface EventsApiResponse {
  data?: RawEventData[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface FormattedEventDates {
  date: string
  fullDate: string
  month: string
}

interface EventItem extends FormattedEventDates {
  id: string
  title: string
  description: string
  location: string
  gradient: string
  gradientColors: string[]
  isUpcoming: boolean
}

interface MonthGroup {
  month: string
  events: EventItem[]
}

/* STATES */
const { locale } = useI18n()

// Red-family gradients to keep the brand color consistent and modern
const GRADIENTS = [
  { gradient: 'bg-gradient-to-r from-primary-500 to-primary-700', gradientColors: ['#dc2626', '#991b1b'] },
  { gradient: 'bg-gradient-to-r from-rose-500 to-primary-600',   gradientColors: ['#e11d48', '#dc2626'] },
  { gradient: 'bg-gradient-to-r from-primary-600 to-rose-500',   gradientColors: ['#dc2626', '#e11d48'] },
]

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function isEventUpcoming(endIso: string): boolean {
  if (!endIso) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(endIso)
  return end >= today
}

function formatEventDates(startIso: string, endIso: string): FormattedEventDates {
  const start = new Date(startIso)
  const end = new Date(endIso)

  const startDay = start.getDate()
  const endDay = end.getDate()
  const startMonth = MONTH_NAMES[start.getMonth()]
  const endMonth = MONTH_NAMES[end.getMonth()]
  const year = start.getFullYear()

  const date = String(startDay)
  const month = `${startMonth}, ${year}`

  let fullDate: string
  if (startIso === endIso) {
    fullDate = `${startMonth} ${startDay}, ${year}`
  } else if (start.getMonth() === end.getMonth()) {
    fullDate = `${startMonth} ${startDay} - ${endDay}, ${year}`
  } else {
    fullDate = `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
  }

  return { date, fullDate, month }
}

function mapEvents(rawList: RawEventData[], offset = 0): EventItem[] {
  return rawList.map((item: RawEventData, index: number) => ({
    id: item.id,
    title: locale.value === 'km' ? (item.data.title_km || item.data.title) : item.data.title,
    description: locale.value === 'km' ? (item.data.description_km || item.data.description) : item.data.description,
    location: item.data.location,
    ...formatEventDates(item.data.start_date, item.data.end_date),
    ...GRADIENTS[(offset + index) % GRADIENTS.length],
    isUpcoming: isEventUpcoming(item.data.end_date || item.data.start_date),
  }))
}

const currentPage = ref(1)
const limit = 10

const { data: eventsData, pending: loading } = await useFetch<EventsApiResponse>('https://web-api.carta.org.kh/api/events', {
  lazy: import.meta.client,
  query: computed(() => ({
    page: currentPage.value,
    limit,
    fields: 'title,title_km,description,description_km,location,start_date,end_date',
  })),
  watch: [currentPage, locale],
})

const events = computed<EventItem[]>(() => {
  const list = eventsData.value?.data ?? []
  return mapEvents(list, (currentPage.value - 1) * limit)
})

const totalPages = computed(() => eventsData.value?.pagination?.totalPages ?? 1)
const total = computed(() => eventsData.value?.pagination?.total ?? 0)

const onPageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const pageTitle = 'Event Calendar - Upcoming Robotics and Technology Events | CARTA'
const pageDescription = 'Discover the latest robotics and technology events such as ICanrob, Industrial Transformation ASIA-PACIFIC, and World Robotics Conference. Stay updated with event dates, locations, and details.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: 'Robotics Events Cambodia, AI Conferences, Technology Exhibitions, ICanrob, CARTA Events, Tech Calendar',
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: 'https://carta.org.kh/events',
  ogImage: OG_IMAGE,
  ogImageSecureUrl: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'CARTA Event Calendar - Cambodia AI Robotics and Technology Transfer Association',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: OG_IMAGE,
  twitterImageAlt: 'CARTA Event Calendar - Cambodia AI Robotics and Technology Transfer Association',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://carta.org.kh/events' },
  ],
  meta: [
    { name: 'telegram:title', content: pageTitle },
    { name: 'telegram:description', content: pageDescription },
    { name: 'telegram:image', content: OG_IMAGE },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': pageTitle,
        'description': pageDescription,
        'url': 'https://carta.org.kh/events',
        'mainEntity': {
          '@id': 'https://carta.org.kh/#organization',
        },
      }),
    },
  ],
})

const groupedEvents = computed<MonthGroup[]>(() => {
  const monthOrder = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const grouped: Record<string, EventItem[]> = {}
  events.value.forEach((event: EventItem) => {
    const [month, year] = event.month.split(', ')
    const key = `${month}, ${year}`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(event)
  })

  return Object.entries(grouped)
    .sort(([aKey], [bKey]) => {
      const [aMonth, aYear] = aKey.split(', ')
      const [bMonth, bYear] = bKey.split(', ')
      const yearDiff = Number(bYear) - Number(aYear)
      if (yearDiff !== 0) return yearDiff
      return monthOrder.indexOf(bMonth) - monthOrder.indexOf(aMonth)
    })
    .map(([month, evts]) => ({ month, events: evts }))
})
</script>

<template>
  <div>
    <!-- 👉🏼 Intro -->
    <section class="fixed-width py-14">
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="w-full md:w-2/3 flex flex-col items-center justify-center mx-auto text-center"
      >
        <span class="eyebrow">{{ $t('events.eyebrow') }}</span>
        <AppTitle :text="$t('events.events_calendar')" centered />
        <span
          v-motion
          :initial="{ opacity: 0, y: 16 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200, ease: 'easeOut' } }"
          class="inline-block pt-4 subtitle text-center"
        >
          {{ $t('events.events_calendar_des') }}
        </span>
      </div>
    </section>

    <div>
      <div class="p-6 max-w-3xl mx-auto">
        <!-- Loading skeleton -->
        <div v-if="loading" class="space-y-6">
          <USkeleton class="h-6 w-36 rounded-md mb-4" />
          <div
            v-for="$n in 4"
            :key="$n"
            class="rounded-2xl p-5 sm:p-6 flex items-start gap-4 sm:gap-5 mb-6 bg-white dark:bg-[#161f30] ring-1 ring-black/5 dark:ring-white/10 shadow-sm"
          >
            <!-- Date skeleton -->
            <USkeleton class="flex-shrink-0 w-16 h-16 rounded-xl" />

            <!-- Details skeleton -->
            <div class="flex-1 space-y-3">
              <USkeleton class="h-6 w-3/4 sm:w-1/2 rounded-md" />
              <div class="space-y-2">
                <USkeleton class="h-4 w-full rounded-md" />
                <USkeleton class="h-4 w-4/5 rounded-md" />
              </div>
              <div class="flex flex-wrap items-center gap-4 pt-1">
                <USkeleton class="h-5 w-28 rounded-full" />
                <USkeleton class="h-5 w-36 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <!-- Event list -->
        <template v-else>
          <div v-for="(monthEvents, index) in groupedEvents" :key="index">
            <h2 class="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">{{ monthEvents.month }}</h2>
            <div
              v-for="(event, eIndex) in monthEvents.events"
              :key="event.id"
              v-motion
              :initial="{ opacity: 0, y: 16 }"
              :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: eIndex * 70, ease: 'easeOut' } }"
              :class="event.gradient"
              class="relative overflow-hidden text-white rounded-2xl shadow-lg ring-1 ring-black/5 p-5 sm:p-6 flex items-start mb-6 transition-all duration-300 hover:-translate-y-1 group"
            >
              <!-- Kbach Phkar Chan Silk Grid Watermark (Crisp White Damask on Crimson) -->
              <div
                class="absolute inset-0 pointer-events-none opacity-20 bg-repeat bg-center"
                style="background-image: url('/patterns/phkar-chan-white.svg'); background-size: 34px 34px; mask-image: linear-gradient(to right, transparent 5%, black 100%); -webkit-mask-image: linear-gradient(to right, transparent 5%, black 100%);"
                aria-hidden="true"
              />

              <!-- Cyber-Khmer Phkar Chan Corner Accent -->
              <AppPhkarChan
                :filled="false"
                size="w-16 h-16 sm:w-20 sm:h-20"
                custom-class="text-white/25"
                class="absolute -top-3 -right-3 pointer-events-none"
              />

              <!-- Date -->
              <div
                class="relative z-10 flex-shrink-0 w-16 h-16 bg-white/95 flex items-center justify-center rounded-xl shadow-sm"
                :style="{ color: event.gradientColors[0] }"
              >
                <p class="text-3xl font-bold leading-none">{{ event.date }}</p>
              </div>

              <!-- Details -->
              <div class="relative z-10 ml-4 sm:ml-5 flex-1">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <h3 class="text-xl sm:text-2xl font-semibold text-white leading-snug">{{ event.title }}</h3>
                  <span
                    :class="event.isUpcoming
                      ? 'bg-emerald-500/90 text-white shadow-sm'
                      : 'bg-white/20 text-white backdrop-blur-sm'"
                    class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase flex-shrink-0"
                  >
                    <span
                      :class="event.isUpcoming ? 'bg-emerald-300 animate-pulse' : 'bg-white/70'"
                      class="w-1.5 h-1.5 rounded-full inline-block"
                    />
                    {{ event.isUpcoming ? $t('events.badge_upcoming') : $t('events.badge_completed') }}
                  </span>
                </div>
                <p class="text-base text-white/95 mt-2">{{ event.description }}</p>
                <div class="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-sm text-white/90">
                  <span class="inline-flex items-center gap-1.5">
                    <Icon class="text-base" name="material-symbols:location-on-rounded" />
                    <strong>{{ event.location }}</strong>
                  </span>
                  <span class="inline-flex items-center gap-1.5">
                    <Icon class="text-base" name="material-symbols:calendar-today-rounded" />
                    <strong>{{ event.fullDate }}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8 mb-4">
          <UPagination
            :model-value="currentPage"
            :page-count="limit"
            :total="total"
            @update:model-value="onPageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
