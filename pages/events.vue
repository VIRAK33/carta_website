<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useHead } from '#app'
import { useI18n } from 'vue-i18n'
import ParticlesBanner from '~/@core/components/ParticlesBanner.vue'
import ogImage from '~/assets/images/logo/logo.webp'

/* STATES */
const { locale } = useI18n()

const GRADIENTS = [
  { gradient: 'bg-gradient-to-r from-pink-500 to-purple-500', gradientColors: ['#ec4899', '#a855f7'] },
  { gradient: 'bg-gradient-to-r from-green-400 to-blue-400',  gradientColors: ['#4ade80', '#3b82f6'] },
  { gradient: 'bg-gradient-to-r from-blue-400 to-indigo-600', gradientColors: ['#3b82f6', '#6366f1'] },
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
  <!-- Banner -->
  <ParticlesBanner>
    <div class="text-4xl font-bold uppercase text-white">
      {{ $t('events.our_events') }}
    </div>
  </ParticlesBanner>

  <div>
    <div class="p-6 max-w-3xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('events.events_calendar') }}</h1>

      <!-- Loading skeleton -->
      <div v-if="loading" class="space-y-6">
        <div v-for="$n in 4" :key="$n" class="animate-pulse bg-gray-200 rounded-lg h-24" />
      </div>

      <!-- Event list -->
      <template v-else>
        <div v-for="(monthEvents, index) in groupedEvents" :key="index">
          <h2 class="text-lg font-semibold text-gray-600 mb-4">{{ monthEvents.month }}</h2>
          <div
            v-for="event in monthEvents.events"
            :key="event.id"
            :class="event.gradient"
            class="text-white rounded-lg shadow-lg p-4 flex items-start mb-6"
          >
            <!-- Date -->
            <div
              class="flex-shrink-0 w-16 h-16 bg-white flex items-center justify-center rounded-md"
              :style="{ color: event.gradientColors[0] }"
            >
              <p class="text-3xl font-bold">{{ event.date }}</p>
            </div>

            <!-- Details -->
            <div class="ml-4 flex-1">
              <h3 class="text-2xl font-semibold text-white"><strong>{{ event.title }}</strong></h3>
              <p class="text-base text-white mt-2">{{ event.description }}</p>
              <p class="text-sm text-white mt-2">Location: <strong>{{ event.location }}</strong></p>
              <p class="text-sm text-white"><strong>{{ event.fullDate }}</strong></p>
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
