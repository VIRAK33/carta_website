<script lang="ts" setup>
import ogImage from '~/assets/images/logo/logo.webp'
import ParticleNetwork from '~/@core/components/ParticleNetwork.vue'

/* STATES */

interface IStoryItem {
  id: number
  text: string
}

interface IMissionItem {
  id: number
  title: string
  text: string
  icon: string
}

const about = ref<IStoryItem[]>([
  { id: 1, text: 'about.about_1' },
  { id: 2, text: 'about.about_2' },
  { id: 3, text: 'about.about_3' },
  { id: 4, text: 'about.about_4' },
  { id: 5, text: 'about.about_5' },
])

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

useHead({
  title: 'About CARTA - Driving Technology Transfer in Cambodia',
  meta: [
    { property: 'og:title', content: 'About CARTA - Driving Technology Transfer in Cambodia' },
    {
      property: 'og:description',
      content: 'Learn about CARTA’s mission, vision, and efforts in advancing AI, robotics, and technology transfer to enhance Cambodia\'s technological landscape.'
    },
    { property: 'og:image', content: ogImage },
    { property: 'og:url', content: 'https://carta.org.kh/about' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'About CARTA - Driving Technology Transfer in Cambodia' },
    { name: 'twitter:description', content: 'Learn about CARTA’s mission and its role in Cambodia’s tech growth.' },
    { name: 'twitter:image', content: ogImage },
    { name: 'telegram:title', content: 'About CARTA - Driving Technology Transfer in Cambodia' },
    { name: 'telegram:description', content: 'Discover CARTA’s role in shaping Cambodia’s tech future.' },
    { name: 'telegram:image', content: ogImage }
  ]
})

const mission = ref<IMissionItem[]>([
  { id: 1, title: 'about.our_mission_1', text: 'about.our_mission_1_des', icon: 'material-symbols:account-balance-rounded' },
  { id: 2, title: 'about.our_mission_2', text: 'about.our_mission_2_des', icon: 'material-symbols:memory-rounded' },
  { id: 3, title: 'about.our_mission_3', text: 'about.our_mission_3_des', icon: 'material-symbols:public-rounded' },
  { id: 4, title: 'about.our_mission_4', text: 'about.our_mission_4_des', icon: 'material-symbols:school-rounded' },
  { id: 5, title: 'about.our_mission_5', text: 'about.our_mission_5_des', icon: 'material-symbols:trending-up-rounded' },
])

const visions = ref<string[]>(['about.our_vision_1', 'about.our_vision_2', 'about.our_vision_3'])

const columns = computed(() => {
  const mid = Math.ceil(about.value.length / 2)
  return [about.value.slice(0, mid), about.value.slice(mid)]
})
</script>

<template>
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
        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink :to="{ name: 'members' }" class="btn-primary">
            <Icon name="material-symbols:group-add-rounded" class="text-xl" />
            {{ $t('about.cta_btn_membership') }}
          </NuxtLink>
          <NuxtLink :to="{ name: 'events' }" class="btn-outline">
            <Icon name="material-symbols:event-rounded" class="text-xl" />
            {{ $t('about.cta_btn_events') }}
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
        <div class="absolute -bottom-22 -left-4 md:-left-6 card-modern p-4 flex items-center gap-3">
          <span class="flex-none w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center">
            <Icon name="material-symbols:handshake-rounded" class="text-white text-xl" />
          </span>
          <span>
            <strong class="block text-sm text-gray-800 dark:text-gray-100">{{ $t('about.hero_badge_title') }}</strong>
            <span class="text-xs text-gray-500 dark:text-gray-400">{{ $t('about.hero_badge_des') }}</span>
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
          <span class="mt-1.5 block text-sm text-gray-500 dark:text-gray-400">{{ $t(stat.label) }}</span>
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full lg:w-4/5 mx-auto">
      <AppReveal v-for="(column, colIndex) in columns" :key="colIndex" :delay="colIndex * 80">
        <div class="space-y-6">
          <p
            v-for="(item, index) in column"
            :key="index"
            class="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]"
          >
            {{ $t(item.text) }}
          </p>
        </div>
      </AppReveal>
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
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ $t(des) }}</p>
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
        <div class="card-modern p-8 md:p-10 h-full">
          <div class="flex items-center gap-4 mb-8">
            <span class="flex-none w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20">
              <Icon class="w-6 h-6 text-white" name="material-symbols:flag-rounded" />
            </span>
            <h4 class="text-xl text-gray-800 dark:text-gray-200 font-bold">{{ $t('about.our_mission') }}</h4>
          </div>
          <ul class="space-y-6">
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
          <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10" />
          <div class="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10" />
          <div class="relative flex items-center gap-4 mb-8">
            <span class="flex-none w-12 h-12 rounded-2xl bg-white/15 grid place-items-center">
              <Icon class="w-6 h-6 text-white" name="material-symbols:visibility-rounded" />
            </span>
            <h4 class="text-xl font-bold">{{ $t('about.our_vision') }}</h4>
          </div>
          <ul class="relative space-y-6">
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
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0, transparent 25%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.6) 0, transparent 25%);" />
      <div class="relative">
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
</template>

<style lang="scss" scoped></style>
