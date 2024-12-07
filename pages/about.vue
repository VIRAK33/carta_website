<script lang="ts" setup>
import banner from '@/assets/images/about/AI_Microsoft_Research_Header.webp'
import ogImage from '~/assets/images/logo/logo.png'


/* STATES */

const about = ref<string[]>([
  {
    id: 1,
    text: 'about.about_1',
  },
  {
    id: 2,
    text: 'about.about_2',
  },
  {
    id: 3,
    text: 'about.about_3',
  },
  {
    id: 4,
    text: 'about.about_4',
  },
  {
    id: 5,
    text: 'about.about_5',
  },
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

const mission = ref<string[]>([
  {
    id: 1,
    title: 'about.our_mission_1',
    text: 'about.our_mission_1_des',
  },
  {
    id: 2,
    title: 'about.our_mission_2',
    text: 'about.our_mission_2_des',
  },
  {
    id: 3,
    title: 'about.our_mission_3',
    text: 'about.our_mission_3_des',
  },
  {
    id: 4,
    title: 'about.our_mission_4',
    text: 'about.our_mission_4_des',
  },
  {
    id: 5,
    title: 'about.our_mission_5',
    text: 'about.our_mission_5_des',
  },
])

const columns = computed(() => {
  const mid = Math.ceil(about.value.length / 2);
  return [about.value.slice(0, mid), about.value.slice(mid)];
});
</script>

<template>
  <!-- 👉🏼 Banner About -->
  <div class="relative w-full h-[220px]">
    <div
      :style="{ backgroundImage: `url(${banner})` }"
      class="w-full h-full bg-cover bg-center bg-no-repeat grid place-items-center"
    >
      <div class="text-4xl font-bold uppercase text-white">
        {{$t('about.about_the_association')}}
      </div>
    </div>
  </div>

  <div class="fixed-width my-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-7 w-full lg:w-2/3 mx-auto">
      <ul v-for="(column, colIndex) in columns" :key="colIndex" class="list-disc list-outside">
        <li v-for="(item, index) in column" :key="index" class="mb-4">
          <span>
            {{ $t(item.text) }}
          </span>
        </li>
      </ul>
    </div>
  </div>


  <section class="fixed-width my-14">
    <div class="grid grid-cols-1 md:grid-cols-2 divide-x-0 md:divide-x-2">
      <div class="w-full pr-0 md:pr-7 pt-8">
        <img
          alt="Mission"
          class="w-24 h-24 object-cover mx-auto"
          src="@/assets/icons/mission.png"
        />
        <h4
          class="text-xl text-gray-800 dark:text-gray-300 font-semibold text-center"
        >
          {{$t('about.our_mission')}}
        </h4>
        <ul class="flex flex-col gap-7 mt-7"
            v-for="({ title, text }, $key) in mission"
            :key="$key">
          <li class="flex items-center gap-4">
            <Icon
              class="flex-none self-start text-2xl text-primary-500 mt-1"
              name="material-symbols:line-end-arrow-notch-rounded"
            />
            <span>
              <strong>{{$t(title)}}:</strong> {{$t(text)}}
            </span>
          </li>
        </ul>
      </div>
      <div class="w-full pl-0 md:pl-7 mt-16">
        <img
          alt="Mission"
          class="w-24 h-24 object-cover mx-auto"
          src="@/assets/icons/vision.png"
        />
        <h4
          class="text-xl text-gray-800 dark:text-gray-300 font-semibold text-center"
        >
          {{$t('about.our_vision')}}
        </h4>
        <ul class="flex flex-col gap-7 mt-7">
          <li class="flex items-center gap-4">
            <Icon
              class="flex-none self-start text-2xl text-primary-500 mt-1"
              name="material-symbols:line-end-arrow-notch-rounded"
            />
            <span>
              {{$t('about.our_vision_1')}}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.gallery {
  display: grid;
  grid-template-areas:
    'img1 img1 img2 img2'
    'img1 img1 img2 img2'
    'img3 img3 img3 img3'
    'img3 img3 img3 img3';
  gap: 14px;
  width: 100%;
  height: 400px;

  .item-left {
    grid-area: img1;
  }

  .item-right {
    grid-area: img2;
  }

  .item-bottom {
    max-height: 200px;
    grid-area: img3;
  }
}

.arrow {
  height: 0;
  width: 0;
  transform: rotate(-90deg);
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 20px solid red;
}

.content-block {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
</style>
