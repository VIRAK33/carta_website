<script lang="ts" setup>
/* IMPORTS */
import ogImage from '~/assets/icons/member/associate.webp'


/* STATES */

useHead({
  title: 'Membership - Corporate, Professional, and Associate Options | CARTA',
  meta: [
    { property: 'og:title', content: 'Membership - Corporate, Professional, and Associate Options | CARTA' },
    {
      property: 'og:description',
      content: 'Explore CARTA’s Membership options: Corporate, Professional, and Associate. Join to access industry insights, exclusive events, and networking opportunities tailored to your needs.'
    },
    { property: 'og:image', content: ogImage },
    { property: 'og:url', content: 'https://carta.org.kh/membership' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Membership - Corporate, Professional, and Associate Options | CARTA' },
    { name: 'twitter:description', content: 'Discover CARTA Membership benefits and find the best option for you.' },
    { name: 'twitter:image', content: ogImage },
    { name: 'telegram:title', content: 'Membership - Corporate, Professional, and Associate Options | CARTA' },
    { name: 'telegram:description', content: 'Join CARTA and access tailored opportunities for businesses and individuals in the technology sector.' },
    { name: 'telegram:image', content: ogImage }
  ]
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
          <div class="card-modern group p-8 text-center">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
              <Icon class="w-8 h-8 text-white" name="material-symbols:business-center-rounded" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              {{ $t('membership.corporate_membership') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              {{ $t('membership.corporate_membership_des') }}
            </p>
            <a href="mailto:info@carta.org.kh" class="btn-outline">{{ $t('membership.join_now') }}</a>
          </div>
        </AppReveal>

        <!-- Professional Membership -->
        <AppReveal :delay="70">
          <div class="card-modern group p-8 text-center">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
              <Icon class="w-8 h-8 text-white" name="material-symbols:workspace-premium-rounded" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              {{ $t('membership.professional_membership') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              {{ $t('membership.professional_membership_des') }}
            </p>
            <a href="mailto:info@carta.org.kh" class="btn-outline">{{ $t('membership.join_now') }}</a>
          </div>
        </AppReveal>

        <!-- Associate Membership -->
        <AppReveal :delay="140">
          <div class="card-modern group p-8 text-center">
            <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
              <Icon class="w-8 h-8 text-white" name="material-symbols:handshake-rounded" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
              {{ $t('membership.associate_membership') }}
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              {{ $t('membership.associate_membership_des') }}
            </p>
            <a href="mailto:info@carta.org.kh" class="btn-outline">{{ $t('membership.join_now') }}</a>
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
        <div class="card-content">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
            <Icon class="w-8 h-8 text-white" name="material-symbols:account-balance-rounded" />
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-primary-700">
            {{$t('membership.government_partnerships')}}
          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{$t('membership.government_partnerships_des')}}
          </p>
          <div class="flex justify-center space-x-4">
            <img
              alt="Gov Logo 1"
              class="h-16 w-16"
              src="@/assets/icons/member/misti-logo.webp"
              />
            <img
              alt="Gov Logo 2"
              class="h-16 w-16"
              src="@/assets/icons/member/moi-logo.webp"
            />
          </div>
        </div>

        <!-- Educational Partnerships -->
        <div class="card-content">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
            <Icon class="w-8 h-8 text-white" name="material-symbols:school-rounded" />
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-primary-700">
            {{$t('membership.educational_partnerships')}}
          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{$t('membership.educational_partnerships_des')}}
          </p>
          <img alt="Education Logo" class="mx-auto h-16 w-auto" src="@/assets/icons/member/cit.png" />
        </div>

        <!-- Industry Partnerships -->
        <div class="card-content">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
            <Icon class="w-8 h-8 text-white" name="material-symbols:precision-manufacturing-rounded" />
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-primary-700">
            {{$t('membership.industry_partnerships')}}

          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{$t('membership.industry_partnerships_des')}}
          </p>
          <div class="flex justify-center space-x-4">
            <img alt="Industry Logo 1" class="h-16 w-auto" src="@/assets/icons/member/cognizer-cambodia.png" />
            <img alt="Industry Logo 2" class="h-16 w-auto" src="@/assets/icons/member/arm-robotics.png" />
          </div>
        </div>

        <!-- International Organizations -->
        <div class="card-content">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-primary-700 grid place-items-center shadow-lg shadow-primary-500/20 mb-5 transition-transform duration-300 group-hover:scale-105">
            <Icon class="w-8 h-8 text-white" name="material-symbols:public-rounded" />
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-primary-700">
            {{$t('membership.international_organization')}}
          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{$t('membership.international_organization_des')}}
          </p>
          <div class="card-img flex justify-center space-x-2">
            <img
              alt="International Logo 1"
              src="../assets/icons/member/kar.webp"
            />
            <img
              alt="International Logo 2"
              src="@/assets/icons/member/myras.webp"
            />
            <img
              alt="International Logo 3"
              src="../assets/icons/member/mrsp.webp"
            />
          </div>
          <div class="card-img flex justify-center space-x-2">
            <img
              alt="International Logo 3"
              src="../assets/icons/member/apara.webp"
            />
            <img
              alt="International Logo 3"
              src="@/assets/icons/member/automationsg.webp"
            />
          </div>
          <div class="card-img flex justify-center space-x-2">
            <img
              alt="International Logo 3"
              src="@/assets/icons/member/china-asean.webp"
            />
            <img
              alt="International Logo 3"
              src="@/assets/icons/member/arain.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {

  &-content {
    @apply w-full rounded-lg pt-8 pb-4 px-2 text-center bg-gray-100 dark:bg-gray-900;

    .title {
      @apply text-base tracking-wide font-semibold dark:text-gray-300;
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
