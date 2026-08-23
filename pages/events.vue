<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useHead } from '#app'
import { useI18n } from 'vue-i18n'
import ogImage from '~/assets/images/logo/logo.webp'

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

function formatEventDates(startIso: string, endIso: string) {
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

function mapEvents(rawList: any[], offset = 0) {
  return rawList.map((item: any, index: number) => ({
    id: item.id,
    title: locale.value === 'km' ? (item.data.title_km || item.data.title) : item.data.title,
    description: locale.value === 'km' ? (item.data.description_km || item.data.description) : item.data.description,
    location: item.data.location,
    ...formatEventDates(item.data.start_date, item.data.end_date),
    ...GRADIENTS[(offset + index) % GRADIENTS.length],
  }))
}

const events = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(1)
const total = ref(0)
const limit = 10
const loading = ref(false)

async function fetchEvents(page: number) {
  loading.value = true
  try {
    const data = await $fetch<any>('https://web-api.carta.org.kh/api/events', {
      method: 'GET',
      params: {
        page,
        limit,
        fields: 'title,title_km,description,description_km,location,start_date,end_date',
      },
    })
    events.value = mapEvents(data?.data ?? [], (page - 1) * limit)
    const pagination = data?.pagination
    if (pagination) {
      totalPages.value = pagination.totalPages
      total.value = pagination.total
      currentPage.value = pagination.page
    }
  } catch (e) {
    console.error('Error fetching events:', e)
  } finally {
    loading.value = false
  }
}

const onPageChange = async (page: number) => {
  currentPage.value = page
  await fetchEvents(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

await fetchEvents(1)

watch(() => locale.value, () => {
  fetchEvents(currentPage.value)
})

useHead({
  title: 'Event Calendar - Upcoming Robotics and Technology Events',
  meta: [
    { property: 'og:title', content: 'Event Calendar - Upcoming Robotics and Technology Events' },
    {
      property: 'og:description',
      content: 'Discover the latest robotics and technology events such as ICanrob, Industrial Transformation ASIA-PACIFIC, and World Robotics Conference. Stay updated with event dates, locations, and details.'
    },
    { property: 'og:image', content: ogImage },
    { property: 'og:url', content: 'https://carta.org.kh/events' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Event Calendar - Upcoming Robotics and Technology Events' },
    {
      name: 'twitter:description',
      content: 'Discover the latest robotics and technology events such as ICanrob, Industrial Transformation ASIA-PACIFIC, and World Robotics Conference. Stay updated with event dates, locations, and details.'
    },
    { name: 'twitter:image', content: ogImage },
    { name: 'telegram:title', content: 'Event Calendar - Upcoming Robotics and Technology Events' },
    {
      name: 'telegram:description',
      content: 'Discover the latest robotics and technology events such as ICanrob, Industrial Transformation ASIA-PACIFIC, and World Robotics Conference. Stay updated with event dates, locations, and details.'
    },
    { name: 'telegram:image', content: ogImage }
  ]
})

const groupedEvents = computed(() => {
  const monthOrder = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const grouped: Record<string, any[]> = {}
  events.value.forEach((event: any) => {
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
        <div v-for="$n in 4" :key="$n" class="animate-pulse bg-gray-200 rounded-lg h-24" />
      </div>

      <!-- Event list -->
      <template v-else>
        <div v-for="(monthEvents, index) in groupedEvents" :key="index">
          <h2 class="text-lg font-semibold text-gray-600 mb-4">{{ monthEvents.month }}</h2>
          <div
            v-for="(event, eIndex) in monthEvents.events"
            :key="event.id"
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: eIndex * 70, ease: 'easeOut' } }"
            :class="event.gradient"
            class="text-white rounded-2xl shadow-lg ring-1 ring-black/5 p-5 sm:p-6 flex items-start mb-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <!-- Date -->
            <div
              class="flex-shrink-0 w-16 h-16 bg-white/95 flex items-center justify-center rounded-xl shadow-sm"
              :style="{ color: event.gradientColors[0] }"
            >
              <p class="text-3xl font-bold leading-none">{{ event.date }}</p>
            </div>

            <!-- Details -->
            <div class="ml-4 sm:ml-5 flex-1">
              <h3 class="text-xl sm:text-2xl font-semibold text-white leading-snug">{{ event.title }}</h3>
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
</template>

<style lang="scss" scoped></style>
