<script lang="ts" setup>
import banner from '@/assets/images/about/AI_Microsoft_Research_Header.webp'
import ogImage from '~/assets/images/logo/logo.webp'
import { computed } from 'vue';


/* STATES */

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


const events = [
  {
    id: 1,
    title: "ICanrob",
    location: "Philippines",
    date: "26",
    fullDate: "September 26 - 28, 2024",
    month: "September, 2024",
    description:
      "A regional robotics event focused on fostering collaboration, showcasing new technologies, and discussing the future of robotics in the industry.",
    gradient: "bg-gradient-to-r from-pink-500 to-purple-500",
    gradientColors: ["#ec4899", "#a855f7"], // For dynamic text colors
  },
  {
    id: 2,
    title: "Industrial Transformation ASIA-PACIFIC",
    location: "Singapore",
    date: "14",
    fullDate: "October 14 - 16, 2024",
    month: "October, 2024",
    description:
      "A premier event showcasing the latest in industrial transformation, including innovations in automation, IoT, and smart manufacturing.",
    gradient: "bg-gradient-to-r from-green-400 to-blue-400",
    gradientColors: ["#4ade80", "#3b82f6"],
  },
  {
    id: 3,
    title: "World Robotics Conference",
    location: "Korea",
    date: "23",
    fullDate: "October 23 - 26, 2024",
    month: "October, 2024",
    description:
      "An international conference dedicated to robotics research, technology advancements, and industry trends, featuring leading experts and cutting-edge developments.",
    gradient: "bg-gradient-to-r from-blue-400 to-indigo-600",
    gradientColors: ["#3b82f6", "#6366f1"],
  },

];

// const groupedEvents = computed(() => {
//   // Group events by month
//   const grouped = {};
//   events.forEach((event) => {
//     if (!grouped[event.month]) {
//       grouped[event.month] = [];
//     }
//     grouped[event.month].push(event);
//   });
//
//   return Object.entries(grouped).map(([month, events]) => ({
//     month,
//     events,
//   }));
// });
const groupedEvents = computed(() => {
  // Predefined order of months
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Parse events and group by "Month, Year"
  const grouped = {};
  events.forEach((event) => {
    const [month, year] = event.month.split(", "); // Split the month and year
    const key = `${month}, ${year}`;
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
      // If the same year, sort by month order (ascending)
      return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
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
  <div class="relative w-full h-[220px]">
    <div
      :style="{ backgroundImage: `url(${banner})` }"
      class="w-full h-full bg-cover bg-center bg-no-repeat grid place-items-center"
    >
      <div class="text-4xl font-bold uppercase text-white">
        {{$t('events.our_events')}}
      </div>
    </div>
  </div>

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
