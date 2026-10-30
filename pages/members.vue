<script lang="ts" setup>
const OG_IMAGE = 'https://carta.org.kh/og-image.png'
const pageTitle = 'Membership & Partnerships - Corporate, Professional, and Associate | CARTA'
const pageDescription = 'Explore CARTA’s Membership options: Corporate, Professional, and Associate. Join Cambodia’s premier AI, robotics, and technology transfer ecosystem.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: 'CARTA Membership, Tech Association Cambodia, Corporate Membership, Professional Membership, Associate Membership, Robotics Partners',
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: 'https://carta.org.kh/members',
  ogImage: OG_IMAGE,
  ogImageSecureUrl: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'CARTA Membership - Cambodia AI Robotics and Technology Transfer Association',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: OG_IMAGE,
  twitterImageAlt: 'CARTA Membership - Cambodia AI Robotics and Technology Transfer Association',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://carta.org.kh/members' },
  ],
  meta: [
    { name: 'telegram:title', content: pageTitle },
    { name: 'telegram:description', content: pageDescription },
    { name: 'telegram:image', content: OG_IMAGE },
  ],
})
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- 👉🏼 Intro -->
    <section class="fixed-width py-14">
    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="w-full md:w-2/3 flex flex-col items-center justify-center mx-auto text-center"
    >
      <span class="eyebrow">{{ $t('membership.eyebrow') }}</span>
      <AppTitle :text="$t('membership.title')" centered />
      <span
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200, ease: 'easeOut' } }"
        class="inline-block pt-4 subtitle text-center"
      >
        {{ $t('membership.title_des') }}
      </span>
    </div>
  </section>

  <!-- Membership -->
  <div class="py-8">
    <div class="mx-auto max-w-7xl px-4">
      <!-- Membership Section -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Corporate Membership -->
        <AppReveal :delay="0">
          <div class="card-modern group p-8 text-center h-full flex flex-col justify-between relative overflow-hidden">
            <!-- Cyber-Khmer Phkar Chan (ផ្កាច័ន្ទ) Corner Accent -->
            <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0" />
            <div class="relative z-10">
              <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105 ring-1 ring-white/20">
                <Icon class="w-8 h-8 text-white" name="material-symbols:business-center-rounded" />
              </div>
              <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                {{ $t('membership.corporate_membership') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm">
                {{ $t('membership.corporate_membership_des') }}
              </p>
            </div>
            <div class="relative z-10">
              <a href="mailto:info@carta.org.kh" class="btn-outline">{{ $t('membership.join_now') }}</a>
            </div>
          </div>
        </AppReveal>

        <!-- Professional Membership -->
        <AppReveal :delay="70">
          <div class="card-modern group p-8 text-center h-full flex flex-col justify-between relative overflow-hidden">
            <!-- Cyber-Khmer Phkar Chan (ផ្កាច័ន្ទ) Corner Accent -->
            <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0" />
            <div class="relative z-10">
              <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105 ring-1 ring-white/20">
                <Icon class="w-8 h-8 text-white" name="material-symbols:workspace-premium-rounded" />
              </div>
              <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                {{ $t('membership.professional_membership') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm">
                {{ $t('membership.professional_membership_des') }}
              </p>
            </div>
            <div class="relative z-10">
              <a href="mailto:info@carta.org.kh" class="btn-outline">{{ $t('membership.join_now') }}</a>
            </div>
          </div>
        </AppReveal>

        <!-- Associate Membership -->
        <AppReveal :delay="140">
          <div class="card-modern group p-8 text-center h-full flex flex-col justify-between relative overflow-hidden">
            <!-- Cyber-Khmer Phkar Chan (ផ្កាច័ន្ទ) Corner Accent -->
            <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0" />
            <div class="relative z-10">
              <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105 ring-1 ring-white/20">
                <Icon class="w-8 h-8 text-white" name="material-symbols:handshake-rounded" />
              </div>
              <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                {{ $t('membership.associate_membership') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm">
                {{ $t('membership.associate_membership_des') }}
              </p>
            </div>
            <div class="relative z-10">
              <a href="mailto:info@carta.org.kh" class="btn-outline">{{ $t('membership.join_now') }}</a>
            </div>
          </div>
        </AppReveal>
      </div>
    </div>
  </div>

  <!-- Our Partnership -->
  <div class="flex flex-col items-center text-center mt-12 mb-2">
    <span class="eyebrow">{{ $t('membership.eyebrow') }}</span>
    <AppTitle :text="$t('membership.our_partnership')" centered />
  </div>
  <div class="card flex flex-col items-center justify-center py-12">
    <div class="mx-auto max-w-7xl px-4 text-center">
      <!-- Partnership Section -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 400, delay: 120, ease: 'easeOut' } }"
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
      >
        <!-- Government Partnerships -->
        <div class="card-content card-modern group">
          <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0" />
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
            <Icon class="w-8 h-8 text-white" name="material-symbols:account-balance-rounded" />
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-primary-700 dark:text-primary-400">
            {{$t('membership.government_partnerships')}}
          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{$t('membership.government_partnerships_des')}}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <a
              href="https://misti.gov.kh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Ministry of Industry, Science, Technology & Innovation website"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img
                alt="Ministry of Industry, Science, Technology & Innovation (MISTI) Logo"
                class="h-16 w-16 object-contain"
                src="@/assets/icons/member/misti-logo.webp"
                loading="lazy"
              />
            </a>
            <a
              href="https://www.interior.gov.kh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Ministry of Interior website"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img
                alt="Ministry of Interior (MOI) Logo"
                class="h-16 w-16 object-contain"
                src="@/assets/icons/member/moi-logo.webp"
                loading="lazy"
              />
            </a>
            <a
              href="https://moj.gov.kh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Ministry of Justice website"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img
                alt="Ministry of Justice (MOJ) Logo"
                class="h-16 w-16 object-contain"
                src="@/assets/icons/member/moj-logo.webp"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        <!-- Educational Partnerships -->
        <div class="card-content card-modern group">
          <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0" />
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
            <Icon class="w-8 h-8 text-white" name="material-symbols:school-rounded" />
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-primary-700 dark:text-primary-400">
            {{$t('membership.educational_partnerships')}}
          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{$t('membership.educational_partnerships_des')}}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4">
            <img alt="Cambodia Institute of Technology (CIT) Logo" class="h-16 w-auto object-contain" src="@/assets/icons/member/cit.png" loading="lazy" />
            <a
              href="https://www.ggas.edu.kh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Golden Gate American School website"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img alt="Golden Gate American School (GGAS) Logo" class="h-16 w-auto object-contain" src="@/assets/icons/member/ggas-logo.webp" loading="lazy" />
            </a>
          </div>
        </div>

        <!-- Industry Partnerships -->
        <div class="card-content card-modern group">
          <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0" />
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
            <Icon class="w-8 h-8 text-white" name="material-symbols:precision-manufacturing-rounded" />
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-primary-700 dark:text-primary-400">
            {{$t('membership.industry_partnerships')}}

          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{$t('membership.industry_partnerships_des')}}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            <a
              href="https://www.cogniserkh.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Cogniser Technology Cambodia website"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img alt="Cogniser Technology Cambodia Logo" class="h-12 w-auto max-w-[150px] object-contain" src="@/assets/icons/member/cogniser-cambodia.webp" loading="lazy" />
            </a>
            <a
              href="https://kh.linkedin.com/company/arm-robotics-cambodia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit ARM Robotics Cambodia on LinkedIn"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img alt="ARM Robotics Cambodia Logo" class="h-12 w-auto object-contain" src="@/assets/icons/member/arm-robotics.webp" loading="lazy" />
            </a>
          </div>
        </div>

        <!-- International Organizations -->
        <div class="card-content card-modern group">
          <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0" />
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
            <Icon class="w-8 h-8 text-white" name="material-symbols:public-rounded" />
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-primary-700 dark:text-primary-400">
            {{$t('membership.international_organization')}}
          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{$t('membership.international_organization_des')}}
          </p>
          <div class="card-img flex justify-center space-x-2">
            <a
              href="https://www.korearobot.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Korea Association of Robot Industry website"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img
                alt="Korea Association of Robotics (KAR) Logo"
                src="@/assets/icons/member/kar.webp"
                loading="lazy"
              />
            </a>
            <a
              href="https://www.myras.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Malaysia Robotics, AI & Automation Association website"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img
                alt="Malaysia Robotics, AI & Automation Association (MyRAS) Logo"
                src="@/assets/icons/member/myras.webp"
                loading="lazy"
              />
            </a>
            <a
              href="https://www.facebook.com/MRSP.2006"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Mechatronics and Robotics Society of the Philippines Facebook page"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img
                alt="Mechatronics and Robotics Society of the Philippines (MRSP) Logo"
                src="@/assets/icons/member/mrsp.webp"
                loading="lazy"
              />
            </a>
          </div>
          <div class="card-img flex justify-center space-x-2">
            <a
              href="https://www.apara.asia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the Asia Pacific Assistive Robotics Association website"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img
                alt="Asia Pacific Assistive Robotics Association (APARA) Logo"
                src="@/assets/icons/member/apara.webp"
                loading="lazy"
              />
            </a>
            <a
              href="https://www.automationsg.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the AutomationSG website"
              class="inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              <img
                alt="AutomationSG Logo"
                src="@/assets/icons/member/automationsg.webp"
                loading="lazy"
              />
            </a>
          </div>
          <div class="card-img flex justify-center space-x-2">
            <img
              alt="China-ASEAN Robotics Association Logo"
              src="@/assets/icons/member/china-asean.webp"
              loading="lazy"
            />
            <img
              alt="Asian Robotics Innovation Network (ARAIN) Logo"
              src="@/assets/icons/member/arain.png"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style lang="scss" scoped>
.card {

  &-content {
    @apply w-full rounded-2xl pt-8 pb-5 px-3 text-center;

    .title {
      @apply text-base tracking-wide font-semibold dark:text-gray-200;
    }

    img {
      @apply dark:bg-white/95 dark:p-1.5 dark:rounded-xl transition-all duration-200;
    }
  }

  &-img {
    @apply transform;

    img {
      @apply h-12 w-auto object-cover;
    }
  }
}
</style>
