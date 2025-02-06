<script lang="ts" setup>
/* IMPORTS */
import SwiperBanner from '~/@core/components/pages/SwiperBanner.vue'
import { useAPI } from '~/@core/composables/useAPI'
import type { INews } from '~/types/INews'
import { usePathImageUrl } from '~/@core/composables/useFile'
import ogImage from '~/assets/images/logo/logo.png'

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

// // Function to change the language dynamically
// const changeLanguage = (lang: string) => {
//   locale.value = lang;
// };

/* STATES */
const data = ref([
  {
    title: 'home.features.knowledge',
    description: `home.features.knowledge_des`,
    img: 'https://cdn-icons-png.flaticon.com/512/2660/2660985.png',
  },
  {
    title: 'home.features.network',
    description: `home.features.network_des`,
    img: 'https://cdn-icons-png.flaticon.com/512/4207/4207230.png',
  },
  {
    title: 'home.features.marketplace',
    description: `home.features.marketplace_des`,
    img: 'https://cdn-icons-png.flaticon.com/512/9541/9541658.png',
  },
  {
    title: 'home.features.leadership',
    description: `home.features.leadership_des`,
    img: 'https://cdn-icons-png.flaticon.com/512/860/860380.png',
  },
])
const news = ref<INews[]>([])

/* FETCHING */
const {
  data: resp,
  pending,
  error,
} = useAPI({
  method: 'GET',
  url: '/v1/public/news/news',
  params: { page: 1, size: 3 }, // Optional query parameters
})
news.value = resp.value?.results

useHead({
  title: 'CARTA - Empowering Cambodia with AI and Robotics',
  meta: [
    { property: 'og:title', content: 'CARTA - Empowering Cambodia with AI and Robotics' },
    {
      property: 'og:description',
      content: 'Discover how CARTA fosters innovation in Cambodia through AI, robotics, and technology transfer, creating opportunities for education, industry, and research collaboration.'
    },
    { property: 'og:image', content: ogImage },
    { property: 'og:url', content: 'https://carta.org.kh/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'CARTA - Empowering Cambodia with AI and Robotics' },
    { name: 'twitter:description', content: 'Discover how CARTA fosters innovation in Cambodia through AI and robotics.' },
    { name: 'twitter:image', content: ogImage },
    { name: 'telegram:title', content: 'CARTA - Empowering Cambodia with AI and Robotics' },
    { name: 'telegram:description', content: 'Explore how CARTA supports Cambodia’s digital transformation.' },
    { name: 'telegram:image', content: ogImage },
    { name: 'contact:email', content: 'info@carta.org.kh' }, // Replace with your email
    { name: 'contact:phone', content: '+855 (61) 809 888' }, // Replace with your phone
    { name: 'contact:address', content: 'Phnom Penh, Cambodia' }
  ]
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <!-- 👉🏼Swiper Images -->
  <SwiperBanner />

  <!-- 👉🏼Core Value -->
  <div class="fixed-width py-14">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-7 py-7">
      <!-- 👉🏼Card -->
      <div
        v-for="({ title, description, img }, $key) in data"
        :key="$key"
        class="w-full"
      >
        <div
          :class="{
            'from-primary-500 to-pink-500': $key === 0,
            'from-blue-500 to-green-500': $key === 1,
            'from-yellow-500 to-lime-500': $key === 2,
            'from-green-500 to-teal-500': $key === 3,
          }"
          class="w-24 h-24 p-4 mx-auto rounded-full bg-gradient-to-r"
        >
          <img :src="img" alt="Knowledge" />
        </div>
        <div class="text-xl text-center font-semibold tracking-wide leading-10">
          {{ $t(title) }}
        </div>
        <p class="text-base text-center text-gray-600 dark:text-gray-300">
          {{ $t(description) }}
        </p>
      </div>
    </div>
  </div>
  <div v-if="false" class="py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-red-700">Our Core Values</h1>
        <p class="text-lg text-gray-700 mt-2">
          Knowledge, Network, Marketplace, Leadership
        </p>
      </div>

      <!-- Card Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Knowledge Card -->
        <div
          class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
        >
          <img
            alt="Knowledge Icon"
            class="w-16 h-16 mb-4"
            src="@/assets/icons/home/knowledge.png"
          />
          <h2 class="text-xl font-semibold text-blue-700">Knowledge</h2>
          <p class="text-gray-600 mt-2">
            We are committed to advancing technological expertise and industry
            insights, providing our members with valuable information and
            resources to stay ahead in their fields.
          </p>
        </div>

        <!-- Network Card -->
        <div
          class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
        >
          <img
            alt="Network Icon"
            class="w-16 h-16 mb-4"
            src="@/assets/icons/home/networking.png"
          />
          <h2 class="text-xl font-semibold text-blue-700">Network</h2>
          <p class="text-gray-600 mt-2">
            We build and sustain strong connections within Cambodia and across
            the region, facilitating access to a broad network of local and
            international partners and opportunities.
          </p>
        </div>

        <!-- Marketplace Card -->
        <div
          class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
        >
          <img
            alt="Marketplace Icon"
            class="w-16 h-16 mb-4"
            src="@/assets/icons/home/cart.png"
          />
          <h2 class="text-xl font-semibold text-blue-700">Marketplace</h2>
          <p class="text-gray-600 mt-2">
            We create and support dynamic platforms for engagement, offering our
            members a space to showcase their innovations, explore new markets,
            and connect with potential clients and collaborators.
          </p>
        </div>

        <!-- Leadership Card -->
        <div
          class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
        >
          <img
            alt="Leadership Icon"
            class="w-16 h-16 mb-4"
            src="@/assets/icons/home/leadership-development.png"
          />
          <h2 class="text-xl font-semibold text-blue-700">Leadership</h2>
          <p class="text-gray-600 mt-2">
            We lead with vision and integrity, guiding our members through
            strategic initiatives and fostering a culture of excellence that
            drives progress and development in technology and business.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 👉🏼Initiatives & Activities -->
  <div class="my-4 fixed-width">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-red-700">
          {{ $t('home.init_and_act.title') }}
        </h1>
      </div>

      <!-- Content Section -->
      <div class="flex flex-col md:flex-row md:space-x-8">
        <!-- Left Column -->
        <div class="flex-1 space-y-6">
          <p class="text-lg font-semibold text-red-700">
            {{ $t('home.init_and_act.at_carta') }}
          </p>
          <ul class="list-disc pl-6 space-y-4">
            <li>
              <strong>{{ $t('home.init_and_act.consultancy_and_training') }}:</strong>
              {{ $t('home.init_and_act.consultancy_and_training_des') }}
            </li>
            <li>
              <strong>{{ $t('home.init_and_act.ecosystem_development') }}:</strong>
              {{ $t('home.init_and_act.ecosystem_development_des') }}
            </li>
            <li>
              <strong>{{ $t('home.init_and_act.talent_development') }}:</strong>
              {{ $t('home.init_and_act.talent_development_des') }}
            </li>
          </ul>
        </div>

        <!-- Middle Column (Image as Background) -->
        <div
          class="hidden md:flex justify-center w-64 h-64 bg-center bg-no-repeat bg-cover"
          style="
            background-image: url('https://media-public.canva.com/NJusY/MAEl1yNJusY/1/s3.jpg');
          "
        ></div>

        <!-- Right Column -->
        <div class="flex-1 space-y-6">
          <p class="text-lg font-semibold text-red-700">
            {{ $t('home.init_and_act.we_host') }}
          </p>
          <ul class="list-disc pl-6 space-y-4">
            <li>
              <strong>{{ $t('home.init_and_act.workshops_and_training') }}:</strong>
              {{ $t('home.init_and_act.workshops_and_training_des') }}
            </li>
            <li>
              <strong>{{ $t('home.init_and_act.networking_events') }}:</strong>
              {{ $t('home.init_and_act.networking_events_des') }}
            </li>
            <li>
              <strong>{{ $t('home.init_and_act.conferences_and_seminars') }}:</strong>
              {{ $t('home.init_and_act.conferences_and_seminars_des') }}
            </li>
            <li>
              <strong>{{ $t('home.init_and_act.exhibitions_and_showcases') }}:</strong>
              {{ $t('home.init_and_act.exhibitions_and_showcases_des') }}
            </li>
            <li>
              <strong>{{ $t('home.init_and_act.collaborative_projects') }}:</strong>
              {{ $t('home.init_and_act.collaborative_projects_des') }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Section -->
      <div class="mt-12 text-center">
        <p class="text-lg font-semibold text-red-700">
          {{ $t('home.our_activities') }}
        </p>
      </div>
    </div>
  </div>

  <!-- 👉🏼Grid News -->
  <div class="fixed-width py-14" v-if="false">
    <AppTitle text="News" />
    <div
      class="grid grid-rows-3 grid-flow-row md:grid-flow-col grid-cols-1 md:grid-cols-2 gap-8 mt-7"
    >
      <div
        v-for="({ title, short_description, thumbnail }, $i) in news"
        :key="$i"
        class="row-span-3 w-full h-full"
      >
        <div class="relative rounded-xl overflow-hidden">
          <img :src="usePathImageUrl(thumbnail)" alt="" />
          <div
            class="absolute top-0 left-0 w-full h-full flex flex-col justify-end"
          >
            <div class="p-4 bg-gray-700/70">
              <div class="text-3xl text-white font-semibold" v-text="title" />
              <span
                class="text-base text-gray-200 font-medium leading-4"
                v-text="short_description"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 w-full h-full">
        <div class="w-full flex items-center gap-7">
          <img
            alt=""
            class="flex-none w-auto h-24 aspect-square rounded-xl"
            src="https://business-cambodia.com/cms/assets/240ba2e4-4087-4c65-b470-0aa1d462c992"
          />
          <div class="flex-grow">
            <h4 class="text-lg text-gray-700 font-semibold">
              ចង់ធ្វើការនៅធនាគារខ្មែរទេ? ធនាគារអេស៊ីលីដា
              ប្រកាសរើសបុគ្គ.លិកជាង១០០នាក់ឱ្យបម្រើការផ្នែកទាំងនេះ
            </h4>
            <span class="text-sm text-gray-500">
              ទើបបើកការដ្ឋានសង់រោងចក្រថ្មីថ្ងៃមុន ពេលនេះក្រុមហ៊ុនជប៉ុន
              ប្រកាសជ្រើសរើសបុគ្គលិកជិត ១០០ នាក់
            </span>
          </div>
        </div>
      </div>
      <div class="col-span-2 w-full h-full">
        <div class="w-full flex items-center gap-7">
          <img
            alt=""
            class="flex-none w-auto h-24 aspect-square rounded-xl"
            src="https://business-cambodia.com/cms/assets/2bb676cd-1d94-4fb4-9c14-b795e9b79f03"
          />
          <div class="flex-grow">
            <h4 class="text-lg text-gray-700 font-semibold">
              ខេត្ដសំណាង! ក្រុមហ៊ុនយក្សរបស់ជប៉ុន
              បើកការដ្ឋានសាងសង់រោងចក្រថ្មីមួយ​នៅខេត្តពោធិ៍​សាត់
            </h4>
            <span class="text-sm text-gray-500">
              ទើបបើកការដ្ឋានសង់រោងចក្រថ្មីថ្ងៃមុន ពេលនេះក្រុមហ៊ុនជប៉ុន
              ប្រកាសជ្រើសរើសបុគ្គលិកជិត ១០០ នាក់
            </span>
          </div>
        </div>
      </div>
      <div class="col-span-2 w-full h-full">
        <div class="w-full flex items-center gap-7">
          <img
            alt=""
            class="flex-none w-auto h-24 aspect-square rounded-xl"
            src="https://business-cambodia.com/cms/assets/bc29c53c-d5e3-43c3-ab14-6e989b152572"
          />
          <div class="flex-grow">
            <h4 class="text-lg text-gray-700 font-semibold">
              នរណាខ្លះកំពុងប្រើ? វេទិកា Telegram អាចប្រឈមបញ្ហាធំៗ៣នេះ
              ក្រោយស្ថាបនិកត្រូវបានចា.ប់ខ្លួន
            </h4>
            <span class="text-sm text-gray-500">
              ទើបបើកការដ្ឋានសង់រោងចក្រថ្មីថ្ងៃមុន ពេលនេះក្រុមហ៊ុនជប៉ុន
              ប្រកាសជ្រើសរើសបុគ្គលិកជិត ១០០ នាក់
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
