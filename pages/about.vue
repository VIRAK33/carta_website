<script lang="ts" setup>
/* STATES */
import BaseTitle from '~/@core/components/BaseTitle.vue'

const image = ref<string>('https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
const members = ref<string[]>([
  'https://images.pexels.com/photos/8517921/pexels-photo-8517921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/6508422/pexels-photo-6508422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3988621/pexels-photo-3988621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5393611/pexels-photo-5393611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2780196/pexels-photo-2780196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
])
</script>

<template>
  <!-- 👉🏼 Banner About -->
  <div class="relative w-full h-[500px]">
    <div :style="{ background: `url(${image})` }" class="w-full h-full bg-cover bg-center bg-no-repeat" />
    <div
      class="absolute inset-0 m-auto w-full md:w-1/2 lg:w-1/3 h-full text-center flex flex-col justify-center">
      <h2 class="text-5xl font-extrabold text-gray-800">About Us</h2>
      <p class="mt-4 text-gray-700 text-base font-semibold leading-6">
        Lorem ipsum odor amet, consectetuer adipiscing elit. Facilisi justo ac
        luctus, viverra erat accumsan fringilla erat. Conubia vel condimentum
        dignissim eu, ipsum taciti id interdum proin. Nam mi cras cubilia duis
        tincidunt netus. Nec curae posuere duis; leo dolor ut. Aliquet facilisi
        pulvinar primis sollicitudin nullam.
      </p>
    </div>
  </div>

  <!-- 👉🏼 Our Mission -->
  <section class="fixed-width w-full my-14">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-14">
      <div class="w-full flex flex-col justify-center gap-7">
        <BaseTitle text="Our Mission" />
        <p class="text-base text-gray-700 dark:text-gray-400 font-medium">
          Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent sapien
          integer risus parturient, nec cubilia dictum consectetur. Pharetra
          velit netus nulla rhoncus placerat primis arcu diam. Pellentesque
          quisque felis fusce orci natoque dui eros. Vivamus pulvinar integer
          habitant dui accumsan, morbi dignissim. Pulvinar mollis in nam venenatis
          porttitor eget id.
        </p>
      </div>
      <div class="gallery">
        <div class="item-left">
          <img
            alt=""
            class="w-fll h-full object-cover rounded-xl"
            src="https://images.pexels.com/photos/1184580/pexels-photo-1184580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
        <div class="item-right">
          <img
            alt=""
            class="w-fll h-full object-cover rounded-xl"
            src="https://images.pexels.com/photos/5227311/pexels-photo-5227311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
        <div class="item-bottom">
          <img
            alt=""
            class="w-full h-full object-cover rounded-xl"
            src="https://images.pexels.com/photos/6147276/pexels-photo-6147276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- 👉🏼 Our Teams -->
  <section class="fixed-width w-full my-14">
    <div class="w-full flex items-center justify-center">
      <BaseTitle text="Our Teams" />
    </div>
    <p class="text-base text-gray-700 dark:text-gray-400 font-medium my-7 w-full md:w-2/3 lg:w-1/2 mx-auto">
      Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent sapien
      integer risus parturient, nec cubilia dictum consectetur. Pharetra
      velit netus nulla rhoncus placerat primis arcu diam. Pellentesque
      quisque felis fusce orci natoque dui eros. Vivamus pulvinar integer
      habitant dui accumsan, morbi dignissim. Pulvinar mollis in nam venenatis
      porttitor eget id.
    </p>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7 mt-7">
      <div v-for="($item, $i) in members" :key="$i" class="flex flex-col items-center space-y-1 ">
        <div class="bg-gradient-to-tr from-primary-400 to-purple-600 p-1 rounded-full">
          <a class="block bg-white dark:bg-gray-950 p-1 rounded-full transform transition hover:-rotate-6" href="#">
            <img
              :src="$item"
              alt="cute kitty"
              class="w-full aspect-square rounded-full object-cover"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.gallery {
  display: grid;
  grid-template-areas:
    "img1 img1 img2 img2"
    "img1 img1 img2 img2"
    "img3 img3 img3 img3"
    "img3 img3 img3 img3";
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
</style>
