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
    name: 'First Banner',
    image: slide1,
  },
  {
    name: 'Second Banner',
    image: slide2,
  },
  {
    name: 'Third Banner',
    image: slide3,
  },
  {
    name: 'A JOURNEY OF GROWTH THROUGH EDUCATION AND EXCHANGE',
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

// Process slides data
const slides = computed(() => {
  try {
    // Check if API returned valid data
    if (slideResponse.value?.data && Array.isArray(slideResponse.value.data) && slideResponse.value.data.length > 0) {
      const processedSlides = slideResponse.value.data.map((item: any, index: number) => ({
        name: item.data?.name || `Slide ${index + 1}`,
        image: item.data?.image || '',
      })).filter((slide: any) => slide.image)

      console.log('Using API slides:', processedSlides)
      return processedSlides
    } else {
      console.log('No valid data from API, using default slides')
    }
  } catch (e) {
    console.error('Error processing slides:', e)
  }

  // Fallback to default slides if API fails or returns invalid data
  return defaultSlides
})

</script>

<template>
  <Swiper
    :autoplay="{
      delay: 3000,
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
  >
    <SwiperSlide v-for="({ name, image }, $i) in slides" :key="$i">
      <div class="swiper--item">
        <img :alt="name" :src="image" />
      </div>
    </SwiperSlide>

    <!-- Custom Arrows -->
    <div class="swiper--navigation">
      <button
        v-motion="{
          initial: {
            y: 100,
            opacity: 0,
          },
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              ease: 'easeInOut',
            },
          },
        }"
        class="swiper--prev"
        title="Previous"
        type="button"
      >
        <Icon class="icon" name="tabler:arrow-left-circle" />
      </button>
      <button
        v-motion="{
          initial: {
            y: 100,
            opacity: 0,
          },
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              ease: 'easeInOut',
            },
          },
        }"
        class="swiper--next"
        title="Next"
        type="button"
      >
        <Icon class="icon" name="tabler:arrow-move-right" />
      </button>
    </div>
  </Swiper>
</template>

<style lang="scss" scoped>
.swiper--navigation {
  @apply w-full flex items-start gap-4 justify-end absolute bottom-7 z-10 px-10;

  .swiper--prev,
  .swiper--next {
    @apply w-10 h-10 rounded-full grid place-items-center border-2
    bg-primary-700/80 border-gray-300 transition-all duration-300;

    &:hover {
      @apply bg-primary-700 -translate-y-2;
    }

    .icon {
      @apply text-xl text-gray-300;
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
