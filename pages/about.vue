<script lang="ts" setup>
import ParticleNetwork from '~/@core/components/ParticleNetwork.vue'

/* STATES */

interface IMissionItem {
  id: number
  title: string
  text: string
  icon: string
}

const stats = ref([
  { label: 'about.stat_founded', value: 2024, icon: 'material-symbols:calendar-today-rounded' },
  { label: 'about.stat_pillars', value: 5, icon: 'material-symbols:layers-rounded' },
  { label: 'about.stat_units', value: 6, icon: 'material-symbols:groups-rounded' },
  { label: 'about.stat_tiers', value: 3, icon: 'material-symbols:workspace-premium-rounded' },
])

const pillars = ref([
  { title: 'home.features.knowledge', des: 'home.features.knowledge_des', icon: 'material-symbols:psychology-rounded', gradient: 'from-primary-400 to-primary-600' },
  { title: 'home.features.network', des: 'home.features.network_des', icon: 'material-symbols:hub-rounded', gradient: 'from-primary-500 to-primary-700' },
  { title: 'home.features.marketplace', des: 'home.features.marketplace_des', icon: 'material-symbols:storefront-rounded', gradient: 'from-rose-400 to-primary-600' },
  { title: 'home.features.leadership', des: 'home.features.leadership_des', icon: 'material-symbols:groups-rounded', gradient: 'from-red-600 to-primary-800' },
])

const OG_IMAGE = 'https://carta.org.kh/og-image.png'
const pageTitle = 'About CARTA - Driving Technology Transfer in Cambodia'
const pageDescription = 'Learn about CARTA’s mission, vision, and efforts in advancing AI, robotics, and technology transfer to enhance Cambodia’s technological landscape.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: 'About CARTA, Technology Transfer Cambodia, AI Cambodia, Robotics Cambodia, CARTA Mission, CARTA Vision',
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: 'https://carta.org.kh/about',
  ogImage: OG_IMAGE,
  ogImageSecureUrl: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'About CARTA - Cambodia AI Robotics and Technology Transfer Association',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: OG_IMAGE,
  twitterImageAlt: 'About CARTA - Cambodia AI Robotics and Technology Transfer Association',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://carta.org.kh/about' },
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
        '@type': 'AboutPage',
        'name': pageTitle,
        'description': pageDescription,
        'url': 'https://carta.org.kh/about',
        'mainEntity': {
          '@id': 'https://carta.org.kh/#organization',
        },
      }),
    },
  ],
})

const mission = ref<IMissionItem[]>([
  { id: 1, title: 'about.our_mission_1', text: 'about.our_mission_1_des', icon: 'material-symbols:account-balance-rounded' },
  { id: 2, title: 'about.our_mission_2', text: 'about.our_mission_2_des', icon: 'material-symbols:memory-rounded' },
  { id: 3, title: 'about.our_mission_3', text: 'about.our_mission_3_des', icon: 'material-symbols:public-rounded' },
  { id: 4, title: 'about.our_mission_4', text: 'about.our_mission_4_des', icon: 'material-symbols:school-rounded' },
  { id: 5, title: 'about.our_mission_5', text: 'about.our_mission_5_des', icon: 'material-symbols:trending-up-rounded' },
])

const visions = ref<string[]>(['about.our_vision_1', 'about.our_vision_2', 'about.our_vision_3'])
</script>

<template>
  <div>
    <!-- 👉🏼 Hero -->
    <section class="fixed-width py-14 mb-12 lg:mb-0">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- Text -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      >
        <span class="eyebrow">{{ $t('about.intro_eyebrow') }}</span>
        <AppTitle :text="$t('about.about_the_association')" />
        <p class="subtitle mt-5 leading-relaxed max-w-xl">
          {{ $t('about.intro_des') }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink :to="{ name: 'members' }" class="btn-primary">
            <Icon name="material-symbols:group-add-rounded" class="text-base" />
            <span>{{ $t('about.cta_btn_membership') }}</span>
          </NuxtLink>
          <NuxtLink :to="{ name: 'events' }" class="btn-outline">
            <Icon name="material-symbols:event-rounded" class="text-base" />
            <span>{{ $t('about.cta_btn_events') }}</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Image -->
      <div
        v-motion
        :initial="{ opacity: 0, x: 24 }"
        :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 150 } }"
        class="relative mt-4 lg:mt-0"
      >
        <div class="aspect-[4/3]">
          <ClientOnly>
            <ParticleNetwork />
            <template #fallback>
              <div class="h-full w-full" />
            </template>
          </ClientOnly>
        </div>
        <div class="absolute -bottom-8 md:-bottom-10 -left-4 md:-left-6 card-modern p-4 flex items-center gap-3 z-30">
          <span class="flex-none w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center">
            <Icon name="material-symbols:handshake-rounded" class="text-white text-xl" />
          </span>
          <span>
            <strong class="block text-sm text-gray-800 dark:text-gray-100">{{ $t('about.hero_badge_title') }}</strong>
            <span class="text-xs text-gray-600 dark:text-gray-300">{{ $t('about.hero_badge_des') }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- 👉🏼 Stats -->
  <section class="fixed-width py-10">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <AppReveal v-for="(stat, $i) in stats" :key="stat.label" :delay="$i * 70">
        <div class="card-modern p-6 text-center h-full">
          <Icon :name="stat.icon" class="w-8 h-8 mx-auto text-primary-500 mb-3" />
          <strong v-animate-number="{ value: stat.value }" class="block text-3xl md:text-4xl font-bold gradient-text">
            {{ stat.value }}
          </strong>
          <span class="mt-1.5 block text-sm text-gray-600 dark:text-gray-300">{{ $t(stat.label) }}</span>
        </div>
      </AppReveal>
    </div>
  </section>

  <!-- 👉🏼 Our Story -->
  <section class="fixed-width py-14">
    <div class="flex flex-col items-center text-center mb-12">
      <span class="eyebrow">{{ $t('about.story_eyebrow') }}</span>
      <AppTitle :text="$t('about.story_title')" centered />
    </div>
    <!-- Bento Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
      <!-- Left Column: Manifesto / Foundation Card -->
      <div class="lg:col-span-5 flex flex-col">
        <AppReveal :delay="0" class="h-full">
          <div class="card-modern p-6 sm:p-8 h-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#FCFAF7] via-white to-primary-50/25 dark:from-[#182234] dark:via-[#151d2d] dark:to-[#182234]">
            <!-- Cyber-Khmer Phkar Chan Corner Accent -->
            <AppPhkarChan size="w-12 h-12" class="absolute top-0 right-0" />

            <div class="relative z-10">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200/60 dark:border-primary-800/40 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Icon name="material-symbols:verified-rounded" class="text-sm text-primary-600 dark:text-primary-400" />
                <span>{{ $t('about.story_manifesto_badge') }}</span>
              </div>

              <h3 class="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-gray-50 mb-4 leading-snug">
                {{ $t('about.story_manifesto_title') }}
              </h3>

              <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] mb-6">
                {{ $t('about.about_1') }}
              </p>
            </div>

            <!-- Vision Callout Quote -->
            <div class="relative z-10 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800/80">
              <div class="flex items-start gap-3 p-4 rounded-xl bg-primary-50/60 dark:bg-primary-950/40 border border-primary-100/80 dark:border-primary-900/40">
                <Icon name="material-symbols:format-quote-rounded" class="flex-none text-2xl text-primary-500 mt-0.5" />
                <p class="text-xs sm:text-sm text-gray-700 dark:text-gray-200 leading-relaxed italic">
                  {{ $t('about.about_5') }}
                </p>
              </div>
            </div>
          </div>
        </AppReveal>
      </div>

      <!-- Right Column: 3 Thematic Focus Cards -->
      <div class="lg:col-span-7 flex flex-col gap-4 sm:gap-5 justify-between">
        <!-- Card 1: Public-Private Synergy -->
        <AppReveal :delay="100">
          <div class="card-modern p-5 sm:p-6 group hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300">
            <div class="flex items-start gap-4">
              <span class="flex-none w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center shadow-md shadow-primary-500/20 text-white transition-transform duration-300 group-hover:scale-105">
                <Icon name="material-symbols:handshake-rounded" class="text-xl" />
              </span>
              <div class="flex-1">
                <h4 class="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 mb-1.5">
                  {{ $t('about.story_card_synergy_title') }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ $t('about.about_2') }}
                </p>
              </div>
            </div>
          </div>
        </AppReveal>

        <!-- Card 2: Empowering Local Enterprise & Commerce -->
        <AppReveal :delay="180">
          <div class="card-modern p-5 sm:p-6 group hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300">
            <div class="flex items-start gap-4">
              <span class="flex-none w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-primary-600 grid place-items-center shadow-md shadow-rose-500/20 text-white transition-transform duration-300 group-hover:scale-105">
                <Icon name="material-symbols:storefront-rounded" class="text-xl" />
              </span>
              <div class="flex-1">
                <h4 class="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 mb-1.5">
                  {{ $t('about.story_card_ecosystem_title') }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {{ $t('about.about_3') }}
                </p>
              </div>
            </div>
          </div>
        </AppReveal>

        <!-- Card 3: Anchored by Four Strategic Pillars -->
        <AppReveal :delay="260">
          <div class="card-modern p-5 sm:p-6 group hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300">
            <div class="flex items-start gap-4">
              <span class="flex-none w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-primary-600 grid place-items-center shadow-md shadow-amber-500/20 text-white transition-transform duration-300 group-hover:scale-105">
                <Icon name="material-symbols:layers-rounded" class="text-xl" />
              </span>
              <div class="flex-1">
                <h4 class="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 mb-1.5">
                  {{ $t('about.story_card_pillars_title') }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                  {{ $t('about.about_4') }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40">
                    <Icon name="material-symbols:psychology-rounded" class="text-sm text-primary-500" />
                    {{ $t('home.features.knowledge') }}
                  </span>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40">
                    <Icon name="material-symbols:hub-rounded" class="text-sm text-primary-500" />
                    {{ $t('home.features.network') }}
                  </span>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40">
                    <Icon name="material-symbols:storefront-rounded" class="text-sm text-primary-500" />
                    {{ $t('home.features.marketplace') }}
                  </span>
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-800/40">
                    <Icon name="material-symbols:groups-rounded" class="text-sm text-primary-500" />
                    {{ $t('home.features.leadership') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AppReveal>
      </div>
    </div>
  </section>

  <!-- 👉🏼 Pillars -->
  <section class="bg-section py-16">
    <div class="fixed-width">
      <div class="flex flex-col items-center text-center mb-12">
        <span class="eyebrow">{{ $t('about.pillars_eyebrow') }}</span>
        <AppTitle :text="$t('about.pillars_title')" centered />
        <p class="subtitle mt-4 max-w-2xl">{{ $t('about.pillars_des') }}</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AppReveal v-for="({ title, des, icon, gradient }, $key) in pillars" :key="$key" :delay="$key * 70">
          <div class="card-modern p-6 h-full group">
            <div
              :class="`bg-gradient-to-br ${gradient}`"
              class="w-14 h-14 rounded-2xl grid place-items-center shadow-lg shadow-primary-500/20 transition-transform duration-300 group-hover:scale-105 mb-5"
            >
              <Icon :name="icon" class="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{{ $t(title) }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{{ $t(des) }}</p>
          </div>
        </AppReveal>
      </div>
    </div>
  </section>

  <!-- 👉🏼 Mission & Vision -->
  <section class="fixed-width py-16">
    <div class="flex flex-col items-center text-center mb-12">
      <span class="eyebrow">{{ $t('about.purpose_eyebrow') }}</span>
      <AppTitle :text="$t('about.purpose_title')" centered />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Mission -->
      <AppReveal :delay="0">
        <div class="card-modern p-8 md:p-10 h-full relative overflow-hidden">
          <!-- Cyber-Khmer Phkar Chan Corner Accent -->
          <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0" />

          <div class="flex items-center gap-4 mb-8 relative z-10">
            <span class="flex-none w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20">
              <Icon class="w-6 h-6 text-white" name="material-symbols:flag-rounded" />
            </span>
            <h4 class="text-xl text-gray-800 dark:text-gray-200 font-bold">{{ $t('about.our_mission') }}</h4>
          </div>
          <ul class="space-y-6 relative z-10">
            <li v-for="({ title, text, icon }, $key) in mission" :key="$key" class="flex items-start gap-4">
              <span class="flex-none w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/40 grid place-items-center">
                <Icon class="text-lg text-primary-600 dark:text-primary-400" :name="icon" />
              </span>
              <span class="text-gray-600 dark:text-gray-300">
                <strong class="block text-gray-800 dark:text-gray-200 mb-0.5">{{ $t(title) }}</strong>
                {{ $t(text) }}
              </span>
            </li>
          </ul>
        </div>
      </AppReveal>

      <!-- Vision -->
      <AppReveal :delay="100">
        <div
          class="relative overflow-hidden h-full rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white p-8 md:p-10 shadow-xl shadow-primary-500/20"
        >
          <!-- Kbach Phkar Chan Silk Grid Watermark (Crisp White Damask on Crimson) -->
          <div
            class="absolute inset-0 pointer-events-none opacity-20 bg-repeat bg-center"
            style="background-image: url('/patterns/phkar-chan-white.svg'); background-size: 34px 34px; mask-image: linear-gradient(135deg, transparent 15%, black 100%); -webkit-mask-image: linear-gradient(135deg, transparent 15%, black 100%);"
            aria-hidden="true"
          />

          <!-- Corner Kbach Phkar Chan Watermark Accent -->
          <AppPhkarChan
            :filled="false"
            size="w-20 h-20 sm:w-24 sm:h-24"
            custom-class="text-white/25"
            class="absolute -top-3 -right-3 pointer-events-none"
          />

          <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10" />
          <div class="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10" />
          <div class="relative z-10 flex items-center gap-4 mb-8">
            <span class="flex-none w-12 h-12 rounded-2xl bg-white/15 grid place-items-center">
              <Icon class="w-6 h-6 text-white" name="material-symbols:visibility-rounded" />
            </span>
            <h4 class="text-xl font-bold">{{ $t('about.our_vision') }}</h4>
          </div>
          <ul class="relative z-10 space-y-6">
            <li v-for="(vision, $key) in visions" :key="$key" class="flex items-start gap-4">
              <Icon class="flex-none self-start text-2xl text-white/90 mt-0.5" name="material-symbols:check-circle-rounded" />
              <span class="text-white/90 leading-relaxed">{{ $t(vision) }}</span>
            </li>
          </ul>
        </div>
      </AppReveal>
    </div>
  </section>

  <!-- 👉🏼 CTA -->
  <section class="fixed-width pb-16">
    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white px-8 md:px-16 py-14 text-center shadow-xl shadow-primary-500/20"
    >
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

      <div class="relative z-10">
        <span class="inline-block text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-primary-100 mb-2">
          {{ $t('about.cta_eyebrow') }}
        </span>
        <h2 class="text-2xl md:text-4xl font-bold mb-4">{{ $t('about.cta_title') }}</h2>
        <p class="text-white/80 max-w-2xl mx-auto mb-8">{{ $t('about.cta_des') }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink
            :to="{ name: 'members' }"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-white text-primary-700 shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <Icon name="material-symbols:group-add-rounded" class="text-xl" />
            {{ $t('about.cta_btn_membership') }}
          </NuxtLink>
          <NuxtLink
            :to="{ name: 'events' }"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white ring-1 ring-white/40 hover:bg-white/10 transition-all duration-200"
          >
            <Icon name="material-symbols:event-rounded" class="text-xl" />
            {{ $t('about.cta_btn_events') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<style lang="scss" scoped></style>
