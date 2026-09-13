<script lang="ts" setup>
/* IMPORTS */
import { computed } from 'vue'
import { useHead } from '#app'
import { useI18n } from 'vue-i18n'
import SwiperBanner from '~/@core/components/pages/SwiperBanner.vue'
import NewsCard from '~/@core/components/card/NewsCard.vue'

const OG_IMAGE = 'https://carta.org.kh/og-image.png'

/* TYPES */
interface NewsListItem {
  id: string
  createdAt: string
  data: {
    slug: string
    thumbnail?: string | null
    title?: string
    title_km?: string
    short_content?: string
    short_content_km?: string
    content?: string
    content_km?: string
  }
}

interface NewsApiResponse {
  data: NewsListItem[]
  pagination?: {
    total?: number
    totalPages?: number
  }
}

/* COMPOSABLES */
const { locale } = useI18n()

/* STATES & CONSTANTS */
const techDomains = computed<string[]>(() => {
  if (locale.value === 'km') {
    return [
      'បញ្ញាសិប្បនិម្មិត (AI)',
      'មនុស្សយន្ត (Robotics)',
      'ទីក្រុងឆ្លាតវៃ (Smart Cities)',
      'ការផ្ទេរបច្ចេកវិទ្យា',
      'ស្វ័យប្រវត្តិកម្ម & IoT',
      'ការស្រាវជ្រាវបច្ចេកវិទ្យាជាន់ខ្ពស់',
      'ការបណ្តុះបណ្តាលយុវជន & ទេពកោសល្យ',
      'ភាពជាដៃគូអន្តរជាតិ',
    ]
  }
  return [
    'Artificial Intelligence',
    'Humanoid Robotics',
    'Smart Cities & Urban Tech',
    'Technology Transfer',
    'Automation & Industrial IoT',
    'Deep Tech Research',
    'Talent Incubation',
    'Cross-Border Partnerships',
  ]
})

const stats = [
  { label: 'home.impact.founded', value: 2024, icon: 'material-symbols:calendar-today-rounded' },
  { label: 'home.impact.pillars', value: 4, icon: 'material-symbols:layers-rounded' },
  { label: 'home.impact.units', value: 6, icon: 'material-symbols:groups-rounded' },
  { label: 'home.impact.tiers', value: 3, icon: 'material-symbols:workspace-premium-rounded' },
]

const pillars = [
  {
    khmerNum: '១',
    title: 'home.features.knowledge',
    description: 'home.features.knowledge_des',
    icon: 'material-symbols:psychology-rounded',
    gradient: 'from-primary-500 to-primary-700',
  },
  {
    khmerNum: '២',
    title: 'home.features.network',
    description: 'home.features.network_des',
    icon: 'material-symbols:hub-rounded',
    gradient: 'from-primary-600 to-rose-600',
  },
  {
    khmerNum: '៣',
    title: 'home.features.marketplace',
    description: 'home.features.marketplace_des',
    icon: 'material-symbols:storefront-rounded',
    gradient: 'from-rose-500 to-primary-600',
  },
  {
    khmerNum: '៤',
    title: 'home.features.leadership',
    description: 'home.features.leadership_des',
    icon: 'material-symbols:groups-rounded',
    gradient: 'from-red-600 to-primary-800',
  },
]

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

const membershipTiers = [
  {
    title: 'membership.corporate_membership',
    desc: 'membership.corporate_membership_des',
    icon: 'material-symbols:business-center-rounded',
    gradient: 'from-primary-500 to-primary-700',
  },
  {
    title: 'membership.professional_membership',
    desc: 'membership.professional_membership_des',
    icon: 'material-symbols:workspace-premium-rounded',
    gradient: 'from-primary-600 to-primary-800',
  },
  {
    title: 'membership.associate_membership',
    desc: 'membership.associate_membership_des',
    icon: 'material-symbols:handshake-rounded',
    gradient: 'from-rose-500 to-primary-700',
  },
]

/* NEWS HELPERS */
const getFieldValue = (data: Record<string, unknown>, fieldName: string): string => {
  const suffix = locale.value === 'km' ? '_km' : ''
  const langField = `${fieldName}${suffix}`
  return (data[langField] || data[fieldName] || '') as string
}

const extractShortContent = (content: string): string => {
  if (!content) return ''
  const plainText = content.replace(/<[^>]*>/g, '')
  return plainText.substring(0, 150) + (plainText.length > 150 ? '...' : '')
}

const formatDate = (date: string): string => {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${d.getFullYear()}`
}

const resolveImageUrl = (thumb: string | null | undefined): string => {
  if (!thumb) return ''
  return thumb.startsWith('http') ? thumb : `https://cms-api.graphmining.dev${thumb}`
}

/* LIVE API FETCHING */
const { data: newsResponse, pending: newsLoading } = await useFetch<NewsApiResponse>('https://web-api.carta.org.kh/api/news', {
  lazy: import.meta.client,
  query: {
    page: 1,
    limit: 3,
    fields: 'thumbnail,title,title_km,short_content,short_content_km,slug,createdAt',
  },
  watch: [locale],
})

const latestNews = computed(() => newsResponse.value?.data ?? [])

/* SEO */
const pageTitle = 'CARTA - Empowering Cambodia with AI and Robotics'
const pageDescription = 'Discover how CARTA fosters innovation in Cambodia through AI, robotics, and technology transfer, creating opportunities for education, industry, and research collaboration.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: 'AI Cambodia, Robotics Cambodia, Technology Transfer, CARTA, Smart Cities, Artificial Intelligence, Innovation Cambodia',
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: 'https://carta.org.kh/',
  ogImage: OG_IMAGE,
  ogImageSecureUrl: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'CARTA - Cambodia AI Robotics and Technology Transfer Association',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: OG_IMAGE,
  twitterImageAlt: 'CARTA - Cambodia AI Robotics and Technology Transfer Association',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://carta.org.kh/' },
  ],
  meta: [
    { name: 'telegram:title', content: pageTitle },
    { name: 'telegram:description', content: pageDescription },
    { name: 'telegram:image', content: OG_IMAGE },
    { name: 'contact:email', content: 'info@carta.org.kh' },
    { name: 'contact:phone', content: '+855 (61) 809 888' },
    { name: 'contact:address', content: 'Phnom Penh, Cambodia' },
  ],
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- 1. Hero Carousel -->
    <SwiperBanner />

    <!-- 2. Infinite Tech Ecosystem Marquee -->
    <div class="border-y border-gray-200/80 dark:border-gray-800/80 bg-gray-50/80 dark:bg-gray-900/60 backdrop-blur-md overflow-hidden h-11 flex items-center">
      <div class="animate-marquee items-center gap-6 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 h-full">
        <template v-for="cycle in 2" :key="cycle">
          <div
            v-for="(item, idx) in techDomains"
            :key="`${cycle}-${idx}`"
            class="flex items-center gap-3 whitespace-nowrap px-3"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
            <span class="tracking-wider uppercase text-[11px] sm:text-xs font-semibold font-mono">{{ item }}</span>
          </div>
        </template>
      </div>
    </div>

    <!-- 3. Iconic Bento Grid: Mission, Telemetry Stats & Core Pillars -->
    <section class="section">
      <div class="fixed-width">
        <!-- Section Header -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 450 } }"
          class="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200/60 dark:border-primary-800/40 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wider mb-2.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{{ $t('home.hero.badge') }}</span>
          </div>
          <AppTitle :text="$t('home.pillars_section.title')" centered />
          <p class="subtitle text-sm sm:text-base mt-2">
            {{ $t('home.pillars_section.subtitle') }}
          </p>
        </div>

        <!-- Bento Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          <!-- Bento Box 1: Welcome & Mission Statement (Large Spotlight) -->
          <div class="md:col-span-12 lg:col-span-8 card-modern p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group bg-gradient-to-br from-[#FCFAF7] via-white to-primary-50/25 dark:from-[#182234] dark:via-[#151d2d] dark:to-[#182234]">
            <!-- Cyber-Khmer Phkar Chan (ផ្កាច័ន្ទ) Corner Accent -->
            <AppPhkarChan size="w-12 h-12" class="absolute top-0 right-0" />


            <div class="relative z-10">
              <div class="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#C22B27] dark:text-[#C5A059] mb-3">
                <span>NATIONAL INNOVATION PLATFORM</span>
              </div>
              <h1 class="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight">
                {{ $t('home.hero.title') }}
              </h1>
              <p class="subtitle text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
                {{ $t('home.hero.subtitle') }}
              </p>
            </div>

            <div class="relative z-10 pt-5 flex flex-wrap items-center gap-2.5">
              <NuxtLink :to="{ name: 'about' }" class="btn-primary" aria-label="Learn more about CARTA">
                <Icon name="heroicons:information-circle-20-solid" class="text-base" />
                <span>{{ $t('home.hero.cta') }}</span>
              </NuxtLink>
              <NuxtLink :to="{ name: 'members' }" class="btn-outline">
                <Icon name="heroicons:user-group-20-solid" class="text-base" />
                <span>{{ $t('home.hero.explore_membership') }}</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Bento Box 2: Telemetry Metrics 2x2 Grid -->
          <div class="md:col-span-12 lg:col-span-4 grid grid-cols-2 gap-3 sm:gap-4">
            <AppReveal
              v-for="(stat, $i) in stats"
              :key="stat.label"
              :delay="$i * 60"
            >
              <div class="card-modern p-4 sm:p-5 text-center h-full flex flex-col items-center justify-center relative overflow-hidden group">
                <!-- Subtle corner dot -->
                <span class="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C22B27]/25 dark:bg-[#C5A059]/30" />
                <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400 grid place-items-center mb-2 border border-primary-100 dark:border-primary-800/40">
                  <Icon :name="stat.icon" class="w-5 h-5" />
                </div>
                <strong v-animate-number="{ value: stat.value }" class="block text-2xl sm:text-3xl font-extrabold gradient-text">
                  {{ stat.value }}
                </strong>
                <span class="mt-0.5 text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {{ $t(stat.label) }}
                </span>
              </div>
            </AppReveal>
          </div>

          <!-- Bento Box 3..6: Four Strategic Pillars (Compact Row) -->
          <div
            v-for="(pillar, $key) in pillars"
            :key="$key"
            class="md:col-span-6 lg:col-span-3 card-modern p-5 sm:p-6 group h-full flex flex-col justify-between relative overflow-hidden"
          >
            <!-- Cyber-Khmer Phkar Chan (ផ្កាច័ន្ទ) Corner Accent -->
            <AppPhkarChan size="w-9 h-9 sm:w-10 sm:h-10" class="absolute top-0 right-0" />


            <!-- Large Khmer Numeral Background Watermark -->
            <span
              class="absolute top-2 right-3.5 font-serif font-black text-6xl sm:text-7xl text-[#C22B27]/15 dark:text-[#C5A059]/20 select-none pointer-events-none leading-none z-0"
              aria-hidden="true"
            >
              {{ pillar.khmerNum }}
            </span>

            <!-- Card Content -->
            <div class="relative z-10">
              <div class="mb-4">
                <div
                  :class="`bg-gradient-to-br ${pillar.gradient}`"
                  class="w-12 h-12 rounded-xl grid place-items-center shadow-md shadow-primary-500/15 transition-transform duration-300 group-hover:scale-105 ring-1 ring-white/20"
                >
                  <Icon :name="pillar.icon" class="w-6 h-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                {{ $t(pillar.title) }}
              </h3>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ $t(pillar.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Streamlined Initiatives & Activities Showcase -->
    <section class="section bg-section border-y border-gray-200/70 dark:border-gray-800/60">
      <div class="fixed-width">
        <!-- Section Header -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 450 } }"
          class="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          <span class="eyebrow">{{ $t('home.init_and_act.eyebrow') }}</span>
          <AppTitle :text="$t('home.init_and_act.title')" centered />
          <p class="subtitle text-sm sm:text-base mt-2">
            {{ $t('home.init_and_act.subtitle') }}
          </p>
        </div>

        <!-- 2-Column Balanced Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          <!-- Column 1: Core Initiatives -->
          <AppReveal :delay="80">
            <div class="card-modern p-5 sm:p-6 h-full flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-2.5 mb-4">
                  <span class="px-2.5 py-0.5 text-xs font-bold font-mono rounded-md bg-primary-100 dark:bg-primary-900/60 text-primary-700 dark:text-primary-300">
                    {{ $t('home.init_and_act.tag_initiative') }}
                  </span>
                  <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                    {{ $t('home.init_and_act.at_carta') }}
                  </h3>
                </div>

                <div class="space-y-3">
                  <div
                    v-for="item in initiatives"
                    :key="item.title"
                    class="group flex items-start gap-3 p-2.5 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <span class="flex-none w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center text-white shadow-sm shadow-primary-500/15 transition-transform duration-300 group-hover:scale-105">
                      <Icon :name="item.icon" class="text-lg" />
                    </span>
                    <div>
                      <strong class="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-0.5">
                        {{ $t(item.title) }}
                      </strong>
                      <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed block">
                        {{ $t(item.desc) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Callout feature inside column -->
              <div class="mt-4 p-3.5 rounded-xl bg-primary-50/70 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900/40 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <Icon name="heroicons:rocket-launch-20-solid" class="text-xl text-primary-600 dark:text-primary-400 flex-shrink-0" />
                  <span class="text-xs font-medium text-primary-900 dark:text-primary-200">
                    {{ $t('home.init_and_act.innovation_callout') }}
                  </span>
                </div>
                <NuxtLink :to="{ name: 'about' }" class="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline flex-shrink-0" aria-label="Learn more about CARTA initiatives">
                  {{ $t('home.hero.cta') }} &rarr;
                </NuxtLink>
              </div>
            </div>
          </AppReveal>

          <!-- Column 2: Flagship Activities -->
          <AppReveal :delay="140">
            <div class="card-modern p-5 sm:p-6 h-full flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-2.5 mb-4">
                  <span class="px-2.5 py-0.5 text-xs font-bold font-mono rounded-md bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                    {{ $t('home.init_and_act.tag_activity') }}
                  </span>
                  <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                    {{ $t('home.init_and_act.we_host') }}
                  </h3>
                </div>

                <div class="space-y-2.5">
                  <div
                    v-for="item in activities"
                    :key="item.title"
                    class="group flex items-start gap-3 p-2 rounded-xl transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <span class="flex-none w-8 h-8 rounded-lg bg-rose-50 dark:rose-950/50 text-rose-600 dark:text-rose-400 grid place-items-center ring-1 ring-rose-200 dark:ring-rose-800/40 transition-transform duration-300 group-hover:scale-105">
                      <Icon :name="item.icon" class="text-base" />
                    </span>
                    <div>
                      <strong class="block text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 mb-0.5">
                        {{ $t(item.title) }}
                      </strong>
                      <span class="text-xs text-gray-600 dark:text-gray-300 leading-relaxed block line-clamp-2">
                        {{ $t(item.desc) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action button for activities -->
              <div class="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span class="text-xs text-gray-600 dark:text-gray-300">
                  {{ $t('home.init_and_act.join_sessions') }}
                </span>
                <NuxtLink :to="{ name: 'events' }" class="btn-outline text-xs py-1.5 px-3">
                  {{ $t('home.explore_events') }} &rarr;
                </NuxtLink>
              </div>
            </div>
          </AppReveal>
        </div>

        <!-- Integrated Mission Statement Banner -->
        <div class="mt-6 card-modern p-5 sm:p-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-[#182234] dark:via-[#151d2d] dark:to-[#182234] text-center">
          <p class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {{ $t('home.our_activities') }}
          </p>
        </div>
      </div>
    </section>

    <!-- 5. Join Cambodia's Technology Ecosystem (Membership) -->
    <section class="section bg-section border-y border-gray-200/70 dark:border-gray-800/60">
      <div class="fixed-width">
        <!-- Section Header -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 450 } }"
          class="flex flex-col items-center text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          <span class="eyebrow">{{ $t('membership.eyebrow') }}</span>
          <AppTitle :text="$t('home.membership_section.title')" centered />
          <p class="subtitle text-xs sm:text-sm mt-1">
            {{ $t('home.membership_section.subtitle') }}
          </p>
        </div>

        <!-- 3 Tiers Grid (Matching /members) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <AppReveal
            v-for="(tier, $idx) in membershipTiers"
            :key="tier.title"
            :delay="$idx * 70"
          >
            <div class="card-modern group p-8 text-center h-full flex flex-col justify-between relative overflow-hidden">
              <!-- Cyber-Khmer Phkar Chan (ផ្កាច័ន្ទ) Corner Accent -->
              <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0" />


              <div class="relative z-10">
                <div
                  :class="`bg-gradient-to-br ${tier.gradient}`"
                  class="w-16 h-16 mx-auto rounded-2xl grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105 ring-1 ring-white/20"
                >
                  <Icon class="w-8 h-8 text-white" :name="tier.icon" />
                </div>
                <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                  {{ $t(tier.title) }}
                </h2>
                <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm">
                  {{ $t(tier.desc) }}
                </p>
              </div>

              <div class="relative z-10">
                <a href="mailto:info@carta.org.kh" class="btn-outline">
                  {{ $t('membership.join_now') }}
                </a>
              </div>
            </div>
          </AppReveal>
        </div>
      </div>
    </section>

    <!-- 6. Latest News & Insights (Dynamic) -->
    <section class="section">
      <div class="fixed-width">
        <!-- Section Header with View All Link -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <span class="eyebrow">{{ $t('home.news_section.eyebrow') }}</span>
            <AppTitle :text="$t('home.news_section.title')" />
            <p class="subtitle text-xs sm:text-sm mt-1 max-w-xl">
              {{ $t('home.news_section.subtitle') }}
            </p>
          </div>
          <NuxtLink :to="{ name: 'news' }" class="btn-outline text-xs py-2 px-3.5 self-start sm:self-auto flex items-center gap-1.5">
            <span>{{ $t('home.news_section.view_all') }}</span>
            <Icon name="heroicons:arrow-right-20-solid" class="text-base" />
          </NuxtLink>
        </div>

        <!-- Skeletons when loading -->
        <div v-if="newsLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NewsCard v-for="$n in 3" :key="$n" loading title="" />
        </div>

        <!-- Live News Grid -->
        <div v-else-if="latestNews.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AppReveal
            v-for="(item, $i) in latestNews"
            :key="item.data.slug"
            :delay="$i * 70"
          >
            <NuxtLink
              :to="{ name: 'news-slug', params: { slug: item.data.slug } }"
              class="block transition-transform duration-300 hover:-translate-y-1 h-full"
            >
              <NewsCard
                :date="formatDate(item.createdAt)"
                :description="getFieldValue(item.data, 'short_content') || extractShortContent(getFieldValue(item.data, 'content'))"
                :thumbnail="resolveImageUrl(item.data.thumbnail)"
                :title="getFieldValue(item.data, 'title')"
              />
            </NuxtLink>
          </AppReveal>
        </div>
      </div>
    </section>

    <!-- 7. High-Impact Call to Action Banner -->
    <section class="fixed-width py-10">
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 via-primary-600 to-rose-600 p-6 sm:p-10 text-center text-white shadow-xl shadow-primary-500/20"
      >
        <!-- Background decorative ambient circles -->
        <div class="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div class="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-rose-400/20 blur-3xl pointer-events-none" />

        <!-- Kbach Phkar Chan Silk Grid Watermark (Crisp White Damask on Crimson) -->
        <div
          class="absolute inset-0 pointer-events-none opacity-20 bg-repeat bg-center"
          style="background-image: url('/patterns/phkar-chan-white.svg'); background-size: 34px 34px; mask-image: linear-gradient(to right, black 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 70%, black 100%); -webkit-mask-image: linear-gradient(to right, black 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 70%, black 100%);"
          aria-hidden="true"
        />

        <!-- Corner Kbach Phkar Chan Watermark Accents -->
        <AppPhkarChan
          :filled="false"
          size="w-24 h-24 sm:w-32 sm:h-32"
          custom-class="text-white/25"
          class="absolute -top-4 -right-4 pointer-events-none"
        />
        <AppPhkarChan
          :filled="false"
          size="w-20 h-20 sm:w-28 sm:h-28"
          custom-class="text-white/20"
          class="absolute -bottom-4 -left-4 pointer-events-none"
        />

        <div class="relative z-10 max-w-2xl mx-auto space-y-3">
          <span class="inline-block px-3 py-0.5 rounded-full bg-white/15 text-white text-[11px] font-mono font-bold uppercase tracking-widest backdrop-blur-sm">
            {{ $t('home.cta.eyebrow') }}
          </span>
          <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {{ $t('home.cta.title') }}
          </h2>
          <p class="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl mx-auto">
            {{ $t('home.cta.subtitle') }}
          </p>
          <div class="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <NuxtLink
              :to="{ name: 'members' }"
              class="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-primary-700 bg-white shadow-sm hover:bg-gray-100 transition-all duration-200 active:scale-95"
            >
              <Icon name="heroicons:user-plus-20-solid" class="text-base" />
              <span>{{ $t('home.cta.btn_join') }}</span>
            </NuxtLink>
            <a
              href="mailto:info@carta.org.kh"
              class="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white ring-1 ring-white/60 hover:bg-white/15 transition-all duration-200 active:scale-95"
            >
              <Icon name="heroicons:envelope-20-solid" class="text-base" />
              <span>{{ $t('home.cta.btn_contact') }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
