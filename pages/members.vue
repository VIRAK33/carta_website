<script lang="ts" setup>
/* IMPORTS */
import ParticlesBanner from '~/@core/components/ParticlesBanner.vue'
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
  <!-- 👉🏼 Banner -->
  <ParticlesBanner>
    <div class="text-4xl font-bold uppercase text-white">
      {{ $t('membership.title') }}
    </div>
  </ParticlesBanner>

  <!-- Membership -->
  <div class="py-8">
    <div class="mx-auto max-w-7xl px-4">
      <!-- Membership Section -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Corporate Membership -->
        <div class="card rounded-lg text-center">
          <div class="card-content">
            <h2 class="mb-4 text-2xl font-bold text-red-700">
              {{ $t('membership.corporate_membership') }}
            </h2>
            <p class="mb-4 text-gray-600 dark:text-gray-300">
              {{ $t('membership.corporate_membership_des') }}
            </p>
            <img
              alt="Corporate Membership Icon"
              class="rounded-full mx-auto mb-4 h-24 w-24"
              src="@/assets/icons/member/associate.webp"
            />
          </div>
        </div>

        <!-- Professional Membership -->
        <div class="card rounded-lg text-center">
          <div class="card-content">
            <h2 class="mb-4 text-2xl font-bold text-red-700">
              {{ $t('membership.professional_membership') }}

            </h2>
            <p class="mb-4 text-gray-600 dark:text-gray-300">
              {{ $t('membership.professional_membership_des') }}
            </p>
            <img
              alt="Professional Membership Icon"
              class="rounded-full mx-auto mb-4 h-24 w-24"
              src="@/assets/icons/member/professional.webp"
            />
          </div>
        </div>

        <!-- Associate Membership -->
        <div class="card rounded-lg text-center">
          <div class="card-content">
            <h2 class="mb-4 text-2xl font-bold text-red-700">
              {{ $t('membership.associate_membership') }}

            </h2>
            <p class="mb-4 text-gray-600 dark:text-gray-300">
              {{ $t('membership.associate_membership_des') }}
            </p>
            <img
              alt="Associate Membership Icon"
              class="rounded-full mx-auto mb-4 h-24 w-24"
              src="@/assets/icons/member/coperation.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Our Partnership -->
  <h1 class="text-5xl font-bold text-red-700 text-center mt-8">{{$t('membership.our_partnership')}}</h1>
  <div class="card flex flex-col items-center justify-center py-12">
    <div class="mx-auto max-w-7xl px-4 text-center">
      <!-- Partnership Section -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Government Partnerships -->
        <div class="card-content">
          <div class="flex justify-center space-x-8">
            <div
              class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4"
            >
              <img
                alt="Icon 1"
                class="h-12 w-12"
                src="@/assets/icons/member/gov-partner.webp"
              />
            </div>
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-red-700">
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
          <div class="flex justify-center space-x-8">
            <div
              class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4"
            >
              <img
                alt="Icon 1"
                class="w-12 h-12"
                src="@/assets/icons/member/edu-partner.webp"
              />
            </div>
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-red-700">
            {{$t('membership.educational_partnerships')}}
          </h2>
          <p class="mb-4 text-gray-600 dark:text-gray-300">
            {{$t('membership.educational_partnerships_des')}}
          </p>
          <img alt="Education Logo" class="mx-auto h-16 w-auto" src="@/assets/icons/member/cit.png" />
        </div>

        <!-- Industry Partnerships -->
        <div class="card-content">
          <div class="flex justify-center space-x-8">
            <div
              class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4"
            >
              <img
                alt="Icon 1"
                class="h-12 w-12"
                src="@/assets/icons/member/ind-partner.webp"
              />
            </div>
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-red-700">
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
          <div class="flex justify-center space-x-8">
            <div
              class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4"
            >
              <img
                alt="Icon 1"
                class="h-12 w-12"
                src="@/assets/icons/member/int-partner.webp"
              />
            </div>
          </div>
          <h2 class="mb-4 mt-2 text-2xl font-bold text-red-700">
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
