<script lang="ts" setup>
import MemberCard from '~/@core/components/card/MemberCard.vue'
import Dr_Pheng_Sokliep from '@/assets/images/committees/Dr_Pheng_Sokliep.jpg'
import Heng_Sokunthy from '@/assets/images/committees/Heng_Sokunthy.png'
import Ly_Diamand from '@/assets/images/committees/Dimand.webp'
import Voeurn_Yong_Ann from '@/assets/images/committees/Voeurn_Yong_Ann.jpeg'
import Thinh_Raksmey from '@/assets/images/committees/Thinh_Raksmey.webp'

interface ICommitteeMember {
  img: string
  role: string
  title: string
  email: string
}

const members = ref<ICommitteeMember[]>([
  {
    img: Dr_Pheng_Sokliep,
    role: 'committee.role_president',
    title: 'Pheng Sokliep',
    email: 'p.sokliep@carta.org.kh',
  },
  {
    img: Heng_Sokunthy,
    role: 'committee.role_vice_president',
    title: 'Heng Sokunthy',
    email: 'sokunthy@carta.org.kh',
  },
  {
    img: Ly_Diamand,
    role: 'committee.role_vice_president',
    title: 'Ly Diamand',
    email: 'diamandly@carta.org.kh',
  },
  {
    img: '',
    role: 'committee.role_administration',
    title: 'Heng Thylavann',
    email: 'thylavann@carta.org.kh',
  },
  {
    img: Voeurn_Yong_Ann,
    role: 'committee.role_head_ai_robotics',
    title: 'Voeurn Yong Ann',
    email: 'yongann@carta.org.kh',
  },
  {
    img: Thinh_Raksmey,
    role: 'committee.role_head_tech_transfer',
    title: 'Thinh Raksmey',
    email: 'raksmey@carta.org.kh',
  },
])

const OG_IMAGE = 'https://carta.org.kh/og-image.png'
const pageTitle = 'Our Committees - Leadership & Governance | CARTA'
const pageDescription = 'Meet the leadership team and committee members of the Cambodia AI Robotics and Technology Transfer Association (CARTA).'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  keywords: 'CARTA Leadership, CARTA Committees, Robotics Association Board, Tech Transfer Committee, AI Leadership Cambodia',
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: 'https://carta.org.kh/our-committees',
  ogImage: OG_IMAGE,
  ogImageSecureUrl: OG_IMAGE,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  ogImageAlt: 'CARTA Committees - Cambodia AI Robotics and Technology Transfer Association',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: OG_IMAGE,
  twitterImageAlt: 'CARTA Committees - Cambodia AI Robotics and Technology Transfer Association',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://carta.org.kh/our-committees' },
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
        'url': 'https://carta.org.kh/our-committees',
        'mainEntity': {
          '@id': 'https://carta.org.kh/#organization',
        },
      }),
    },
  ],
})
</script>

<template>
  <section class="fixed-width py-14">
    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="w-full md:w-2/3 flex flex-col items-center justify-center mx-auto text-center"
    >
      <span class="eyebrow">{{ $t('committee.eyebrow') }}</span>
      <AppTitle :text="$t('committee.our_organization_structure')" centered />

      <span
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200, ease: 'easeOut' } }"
        class="inline-block pt-4 subtitle text-center"
      >
        {{ $t('committee.our_organization_structure_des') }}
      </span>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, y: 24 }"
      :visible="{ opacity: 1, y: 0, transition: { duration: 500 } }"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
    >
      <AppReveal v-for="(member, $i) in members" :key="member.title" :delay="$i * 70">
        <MemberCard
          :img="member.img"
          :subtitle="$t(member.role)"
          :title="member.title"
          :email="member.email"
        />
      </AppReveal>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
