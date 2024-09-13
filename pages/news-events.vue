<script lang="ts" setup>
import NewsCard from '~/@core/components/cards/NewsCard.vue'

const news = ref<{
  title: string
  short_description: string
  thumbnail: string
  created_date: string
}>([
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/be0a538c-8b5b-4c66-bf30-5baa19ad719e',
    title: 'New Tech Innovations in 2024',
    short_description:
      'The latest advancements in AI, VR, and blockchain technology are transforming industries worldwide.',
    created_date: '2024-09-01',
  },
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/afa6851b-1371-4374-ad1b-ef7c2aeb9219',
    title: 'Global Warming Threatens Coastal Cities',
    short_description:
      'Scientists warn that rising sea levels could displace millions by 2050.',
    created_date: '2024-08-30',
  },
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/71fa6c05-8c25-4da1-831a-d8cb0f3bc4fc',
    title: 'SpaceX Successfully Launches Mars Mission',
    short_description:
      "SpaceX's latest mission to Mars marks a historic step in space exploration.",
    created_date: '2024-09-10',
  },
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/8a8e6957-a379-4595-9fe6-ff93db939222',
    title: 'Breakthrough in Cancer Research',
    short_description:
      'A new treatment shows promise in reducing tumor growth in cancer patients.',
    created_date: '2024-08-25',
  },
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/1d1f89b7-3e0c-4938-8d38-e0352fc0a2ff',
    title: 'Economic Growth in Southeast Asia',
    short_description:
      'Countries in Southeast Asia are experiencing rapid economic growth fueled by tech and manufacturing sectors.',
    created_date: '2024-09-05',
  },
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/c5c2ffe1-8b26-496d-8315-c7dc54a9b897',
    title: 'New Electric Vehicles Unveiled at Auto Expo',
    short_description:
      'Major automakers reveal their latest electric vehicles, promising longer range and faster charging.',
    created_date: '2024-09-08',
  },
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/be0a538c-8b5b-4c66-bf30-5baa19ad719e',
    title: 'Tech Giants Face New Regulations',
    short_description:
      'Governments worldwide are imposing stricter regulations on tech giants to protect user privacy.',
    created_date: '2024-08-22',
  },
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/6cedc971-4aed-4f9b-a446-eeae918db2be',
    title: 'Olympics 2024: Record-Breaking Performances',
    short_description:
      'The 2024 Summer Olympics saw several world records shattered in track and field events.',
    created_date: '2024-09-07',
  },
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/02550fad-003b-402e-b6b0-0df8a01b4b73',
    title: 'Renewable Energy Projects Surge',
    short_description:
      'Investment in renewable energy projects is at an all-time high, aiming to reduce global carbon emissions.',
    created_date: '2024-08-29',
  },
  {
    thumbnail:
      'https://tech-cambodia.com/cms/assets/f4fa1678-8e02-4e43-9d33-390633d16148',
    title: 'AI and Education: A New Era of Learning',
    short_description:
      'Artificial intelligence is revolutionizing the education sector, enhancing personalized learning experiences.',
    created_date: '2024-09-03',
  },
])
</script>

<template>
  <div class="fixed-width py-14">
    <div
      class="w-full md:w-1/3 flex flex-col items-center justify-center mx-auto"
    >
      <AppTitle text="Our Latest News" />

      <span class="inline-block pt-4 subtitle text-center">
        Effective teams communication openly, leverage strength, and embrace
        diversity for success.
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-9 py-14">
      <a
        v-for="(
          { title, short_description, thumbnail, created_date }, $i
        ) in news"
        :key="$i"
        class="inline-block cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
      >
        <NewsCard
          :date="created_date"
          :description="short_description"
          :thumbnail="thumbnail"
          :title="title"
        />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
