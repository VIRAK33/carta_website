<script lang="ts" setup>
/* IMPORTS */
import SwiperBanner from '~/@core/components/pages/SwiperBanner.vue'
import ogImage from '~/assets/images/logo/logo.webp'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n();

// // Function to change the language dynamically
// const changeLanguage = (lang: string) => {
//   locale.value = lang;
// };

/* STATES */
const data = ref([
  {
    title: 'home.features.knowledge',
    description: 'home.features.knowledge_des',
    icon: 'material-symbols:psychology-rounded',
    gradient: 'from-primary-400 to-primary-600',
  },
  {
    title: 'home.features.network',
    description: 'home.features.network_des',
    icon: 'material-symbols:hub-rounded',
    gradient: 'from-primary-500 to-primary-700',
  },
  {
    title: 'home.features.marketplace',
    description: 'home.features.marketplace_des',
    icon: 'material-symbols:storefront-rounded',
    gradient: 'from-rose-400 to-primary-600',
  },
  {
    title: 'home.features.leadership',
    description: 'home.features.leadership_des',
    icon: 'material-symbols:groups-rounded',
    gradient: 'from-red-600 to-primary-800',
  },
])

const initiatives = [
  {
    title: 'home.init_and_act.consultancy_and_training',
    desc: 'home.init_and_act.consultancy_and_training_des',
    icon: 'material-symbols:support-agent-rounded',
  },
  {
    title: 'home.init_and_act.ecosystem_development',
    desc: 'home.init_and_act.ecosystem_development_des',
    icon: 'material-symbols:eco-rounded',
  },
  {
    title: 'home.init_and_act.talent_development',
    desc: 'home.init_and_act.talent_development_des',
    icon: 'material-symbols:school-rounded',
  },
]

const activities = [
  {
    title: 'home.init_and_act.workshops_and_training',
    desc: 'home.init_and_act.workshops_and_training_des',
    icon: 'material-symbols:co-present-rounded',
  },
  {
    title: 'home.init_and_act.networking_events',
    desc: 'home.init_and_act.networking_events_des',
    icon: 'material-symbols:group-rounded',
  },
  {
    title: 'home.init_and_act.conferences_and_seminars',
    desc: 'home.init_and_act.conferences_and_seminars_des',
    icon: 'material-symbols:forum-rounded',
  },
  {
    title: 'home.init_and_act.exhibitions_and_showcases',
    desc: 'home.init_and_act.exhibitions_and_showcases_des',
    icon: 'material-symbols:storefront-rounded',
  },
  {
    title: 'home.init_and_act.collaborative_projects',
    desc: 'home.init_and_act.collaborative_projects_des',
    icon: 'material-symbols:handshake-rounded',
  },
]

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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- 👉🏼Card -->
      <AppReveal
        v-for="({ title, description, icon, gradient }, $key) in data"
        :key="$key"
        :delay="$key * 70"
      >
        <div class="card-modern p-6 group h-full">
          <div
            :class="`bg-gradient-to-br ${gradient}`"
            class="w-14 h-14 rounded-2xl grid place-items-center shadow-lg shadow-primary-500/20 transition-transform duration-300 group-hover:scale-105 mb-5"
          >
            <Icon :name="icon" class="w-7 h-7 text-white" aria-hidden="true" />
          </div>
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{{ $t(title) }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ $t(description) }}</p>
        </div>
      </AppReveal>
    </div>
  </div>
  <!-- 👉🏼Initiatives & Activities -->
  <div class="my-4 fixed-width">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="flex flex-col items-center text-center mb-12"
      >
        <span class="eyebrow">{{ $t('home.init_and_act.eyebrow') }}</span>
        <AppTitle :text="$t('home.init_and_act.title')" centered />
      </div>

      <!-- Content Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Initiatives -->
        <AppReveal :delay="100">
          <div class="card-modern group p-8">
            <p class="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-6">
              {{ $t('home.init_and_act.at_carta') }}
            </p>
            <ul class="space-y-5">
              <li v-for="item in initiatives" :key="item.title" class="flex items-start gap-4">
                <span class="flex-none w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 grid place-items-center transition-transform duration-300 group-hover:scale-110">
                  <Icon :name="item.icon" class="text-xl text-primary-600 dark:text-primary-400" />
                </span>
                <span>
                  <strong class="block text-gray-800 dark:text-gray-200">{{ $t(item.title) }}</strong>
                  <span class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ $t(item.desc) }}</span>
                </span>
              </li>
            </ul>
          </div>
        </AppReveal>

        <!-- Activities -->
        <AppReveal :delay="180">
          <div class="card-modern group p-8">
            <p class="text-lg font-semibold text-primary-700 dark:text-primary-400 mb-6">
              {{ $t('home.init_and_act.we_host') }}
            </p>
            <ul class="space-y-5">
              <li v-for="item in activities" :key="item.title" class="flex items-start gap-4">
                <span class="flex-none w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 grid place-items-center transition-transform duration-300 group-hover:scale-110">
                  <Icon :name="item.icon" class="text-xl text-primary-600 dark:text-primary-400" />
                </span>
                <span>
                  <strong class="block text-gray-800 dark:text-gray-200">{{ $t(item.title) }}</strong>
                  <span class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ $t(item.desc) }}</span>
                </span>
              </li>
            </ul>
          </div>
        </AppReveal>
      </div>

      <!-- Footer Section -->
      <div class="mt-12 text-center">
        <p class="text-lg font-semibold text-primary-700 dark:text-primary-400">
          {{ $t('home.our_activities') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
