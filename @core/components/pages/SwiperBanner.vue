<script lang="ts" setup>
/* IMPORTS */
import { A11y, Autoplay, EffectFade, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { useAppConfigStore } from '~/stores/use-app-config.store'
import slide1 from "@/assets/images/slide/slide1.webp"
import slide2 from "@/assets/images/slide/slide2.webp"
import slide3 from "@/assets/images/slide/slide3.webp"
import slide4 from "@/assets/images/slide/slide4.webp"

/* STATES */
const $appStore = useAppConfigStore()
const swiperModules = computed(() => [
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
])

// Default slides as fallback
const defaultSlides = [
  {
    name: 'CARTA - Empowering Cambodia with AI and Robotics',
    image: slide1,
  },
  {
    name: 'CARTA - Promoting Innovation and Technology Transfer',
    image: slide2,
  },
  {
    name: 'CARTA - Fostering Public-Private Technology Collaboration',
    image: slide3,
  },
  {
    name: 'CARTA - A Journey of Growth Through Education and Exchange',
    image: slide4,
  },
]

// Fetch slides from worker proxy
const { data: slideResponse } = useFetch<any>(
  `https://web-api.carta.org.kh/api/slider`,
  {
    params: { fields: 'image' },
    key: 'slider-data',
  }
)

const localSlideMap: Record<string, string> = {
  slide1,
  slide2,
  slide3,
  slide4,
}

function resolveSlideImage(rawUrl: string, index: number): string {
  if (!rawUrl) return defaultSlides[index % defaultSlides.length]?.image || ''
  for (const key of ['slide1', 'slide2', 'slide3', 'slide4']) {
    if (rawUrl.toLowerCase().includes(key)) {
      return localSlideMap[key]
    }
  }
  return rawUrl
}

// Process slides data
const slides = computed(() => {
  try {
    // Check if API returned valid data
    if (slideResponse.value?.data && Array.isArray(slideResponse.value.data) && slideResponse.value.data.length > 0) {
      const processedSlides = slideResponse.value.data.map((item: any, index: number) => ({
        name: item.data?.name || `Slide ${index + 1}`,
        image: resolveSlideImage(item.data?.image, index),
      })).filter((slide: any) => slide.image)

      return processedSlides
    }
  } catch (e) {
    console.error('Error processing slides:', e)
  }

  // Fallback to default slides if API fails or returns invalid data
  return defaultSlides
})

const swiperInstance = ref<any>(null)
const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
}
const slidePrev = () => {
  swiperInstance.value?.slidePrev()
}
const slideNext = () => {
  swiperInstance.value?.slideNext()
}
</script>

<template>
  <Swiper
    :autoplay="{
      delay: 3500,
      disableOnInteraction: false,
    }"
    :loop="true"
    :modules="swiperModules"
    :navigation="{ prevEl: '.swiper--prev', nextEl: '.swiper--next' }"
    :pagination="{
      clickable: true,
    }"
    :slides-per-view="1"
    :style="{ '--navbar-height': $appStore.navbarHeight }"
    class="swiper-banner"
    direction="vertical"
    effect="fade"
    @swiper="onSwiper"
  >
    <SwiperSlide v-for="({ name, image }, $i) in slides" :key="$i">
      <div class="swiper--item">
        <img
          :alt="name || 'CARTA Banner'"
          :src="image"
          :loading="$i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="$i === 0 ? 'high' : undefined"
          decoding="async"
          width="1920"
          height="520"
        />
      </div>
    </SwiperSlide>

    <!-- Custom Navigation Arrows -->
    <div class="swiper--navigation">
      <button
        class="swiper--prev"
        title="Previous Slide"
        aria-label="Previous Slide"
        type="button"
        @click="slidePrev"
      >
        <Icon class="icon" name="heroicons:chevron-left-20-solid" />
      </button>
      <button
        class="swiper--next"
        title="Next Slide"
        aria-label="Next Slide"
        type="button"
        @click="slideNext"
      >
        <Icon class="icon" name="heroicons:chevron-right-20-solid" />
      </button>
    </div>
  </Swiper>
</template>

<style lang="scss" scoped>
.swiper--navigation {
  @apply w-full flex items-center gap-3 justify-end absolute bottom-6 z-30 px-6 sm:px-10 pointer-events-none;

  .swiper--prev,
  .swiper--next {
    @apply pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center
    bg-white/80 dark:bg-gray-900/80 hover:bg-primary-600 dark:hover:bg-primary-600
    text-gray-800 dark:text-gray-100 hover:text-white dark:hover:text-white
    border border-white/40 dark:border-white/20 shadow-lg backdrop-blur-md
    transition-all duration-200 active:scale-95 cursor-pointer;

    .icon {
      @apply text-2xl transition-colors;
    }
  }
}
</style>

<style lang="scss">
.swiper-banner {
  @apply w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[460px] xl:h-[520px] relative overflow-hidden;
  //@apply w-full h-[160px] md:h-[300px] lg:h-[380px] xl:h-[460px] 2xl:h-[460px] relative overflow-hidden;
    //@apply md:h-[480px];
  //@apply sm:h-[200px] md:h-[320px] lg:h-[400px] xl:h-[400px] 2xl:h-[400px];
  //height: calc(100vh - var(--navbar-height));

  .swiper--item {
    @apply w-full h-full;

    img {
      @apply w-full h-full object-center object-cover;
    }
  }


  .swiper-pagination {
    .swiper-pagination-bullet {
      @apply w-2 h-7 bg-primary-700 rounded;
    }

    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      @apply bg-primary-700;
    }
  }
}
</style>
