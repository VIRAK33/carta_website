<script lang="ts" setup>
import { computed, watch, onMounted } from 'vue'
import { useState } from '#app'
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

function mapEvents(rawList: any[]) {
  return rawList.map((item: any, index: number) => ({
    id: item.id,
    title: locale.value === 'km' ? (item.data.title_km || item.data.title) : item.data.title,
    description: locale.value === 'km' ? (item.data.description_km || item.data.description) : item.data.description,
    location: item.data.location,
    ...formatEventDates(item.data.start_date, item.data.end_date),
    ...GRADIENTS[index % GRADIENTS.length],
  }))
}

const events = useState<any[]>('events-list', () => [])

async function fetchEvents() {
  try {
    const data = await $fetch<any>('https://web-api.carta.org.kh/api/events', {
      method: 'GET',
      params: {
        fields: 'title,title_km,description,description_km,location,start_date,end_date',
      },
    })
    events.value = mapEvents(data?.data ?? [])
  } catch (e) {
    console.error('Error fetching events:', e)
  }
}

onMounted(() => {
  fetchEvents()
})

watch(() => locale.value, () => {
  fetchEvents()
})

useHead({
  title: 'Event Calendar - Upcoming Robotics and Technology Events',
  meta: [
    {
      property: 'og:title',
      content: 'Event Calendar - Upcoming Robotics and Technology Events'
    },
    {
      property: 'og:description',
      content: 'Discover the latest robotics and technology events such as ICanrob, Industrial Transformation ASIA-PACIFIC, and World Robotics Conference. Stay updated with event dates, locations, and details.'
    },
    {
      property: 'og:image',
      content: ogImage
    },
    {
      property: 'og:url',
      content: 'https://carta.org.kh/events'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Event Calendar - Upcoming Robotics and Technology Events'
    },
    {
      name: 'twitter:description',
      content: 'Discover the latest robotics and technology events such as ICanrob, Industrial Transformation ASIA-PACIFIC, and World Robotics Conference. Stay updated with event dates, locations, and details.'
    },
    {
      name: 'twitter:image',
      content: ogImage
    },
    {
      name: 'telegram:title',
      content: 'Event Calendar - Upcoming Robotics and Technology Events'
    },
    {
      name: 'telegram:description',
      content: 'Discover the latest robotics and technology events such as ICanrob, Industrial Transformation ASIA-PACIFIC, and World Robotics Conference. Stay updated with event dates, locations, and details.'
    },
    {
      name: 'telegram:image',
      content: ogImage
    }
  ]
});


const groupedEvents = computed(() => {
  const monthOrder = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const grouped: Record<string, any[]> = {}
  events.value.forEach((event: any) => {
    const [month, year] = event.month.split(', ')
    const key = `${month}, ${year}`
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(event);
  });

  // Sort groups by year (descending) and month order (ascending)
  const sortedGroups = Object.entries(grouped)
    .sort(([aKey], [bKey]) => {
      const [aMonth, aYear] = aKey.split(", ");
      const [bMonth, bYear] = bKey.split(", ");
      const yearDiff = Number(bYear) - Number(aYear); // Sort by year (descending)
      if (yearDiff !== 0) return yearDiff;
      // If the same year, sort by month order (descending — latest month first)
      return monthOrder.indexOf(bMonth) - monthOrder.indexOf(aMonth);
    })
    .map(([key, events]) => ({
      month: key,
      events,
    }));

  return sortedGroups;
});

</script>

<template>
  <!-- 👉🏼 Banner About -->
  <ParticlesBanner>
    <div class="text-4xl font-bold uppercase text-white">
      {{$t('events.our_events')}}
    </div>
  </ParticlesBanner>

  <div>
    <div class="p-6 max-w-3xl mx-auto">
      <!-- Event Calendar Header -->
      <h1 class="text-2xl font-bold text-gray-800 mb-6">{{$t('events.events_calendar')}}</h1>

      <!-- Dynamic Event Loop -->
      <div v-for="(monthEvents, index) in groupedEvents" :key="index">
        <h2 class="text-lg font-semibold text-gray-600 mb-4">{{ monthEvents.month }}</h2>
        <div
          v-for="event in monthEvents.events"
          :key="event.id"
          :class="event.gradient"
          class="text-white rounded-lg shadow-lg p-4 flex items-start mb-6"
        >
          <!-- Date Section -->
          <div
            class="flex-shrink-0 w-16 h-16 bg-white flex items-center justify-center rounded-md"
            :style="{ color: event.gradientColors[0] }"
          >
            <p class="text-3xl font-bold">{{ event.date }}</p>
          </div>

          <!-- Event Details -->
          <div class="ml-4 flex-1">
            <h3 class="text-2xl font-semibold text-white"><strong>{{ event.title }}</strong></h3>
            <p class="text-base text-white mt-2">{{ event.description }}</p>
            <p class="text-sm text-white mt-2">Location: <strong>{{ event.location }}</strong></p>
            <p class="text-sm text-white"><strong>{{ event.fullDate }}</strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

</style>
