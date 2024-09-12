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

const about = ref<string[]>([
  {id: 1, text: 'The Cambodia AI Robotics and Technology Transfer Association (CARTA) is committed to driving technological advancement in Cambodia. We collaborate with the government to promote education and training in high technology, facilitating the exchange of expertise that is essential for the nation’s growth.'},
  {id: 2, text: 'Our goal is to foster strong cooperation between industry and government, ensuring the seamless implementation of artificial intelligence (AI), robotics, smart cities, and technology transfer. These initiatives are designed to stimulate economic and social development, positioning Cambodia as a key player in the regional tech landscape.'},
  {id: 3, text: 'CARTA also works to organize and support agents and traders across the country, helping them fulfill business obligations effectively. By promoting a culture of participation and innovation, we aim to accelerate the growth of the national economy, making it more resilient and dynamic.'},
  {id: 4, text: 'We are dedicated to driving technological advancement and economic growth by fostering Knowledge, building a strong Network, creating vibrant Marketplace opportunities, and exemplifying Leadership in all our initiatives.'},
  {id: 5, text: 'Through our efforts, CARTA is building a future where technology and collaboration are at the heart of Cambodia’s progress, driving sustainable development for the benefit of all.rk, creating vibrant Marketplace opportunities, and exemplifying Leadership in all our initiatives.'}
])

const mission = ref<string[]>([
  {id: 1, text:"Government Collaboration: Partner with government bodies to enhance education and training in high technology sectors."},
  {id: 2, text:"Promote Technological Implementation: Facilitate the adoption of Al, robotics, and smart cities through effective business practices and technology transfer."},
  {id: 3, text:"International and Domestic Partnerships: Work with institutions both locally and globally to share knowledge and conduct advanced technology training"},
  {id: 4, text:"Human Resource Development: Assist in the mobilization and development of skilled professionals in Al, robotics, and smart cities to support Cambodia's technological advancement. Economic Growth: Contribute to the rapid growth of the national economy by promoting innovative practices and fostering a collaborative environment."}
  ])

</script>

<template>
  <!-- 👉🏼 Banner About -->
  <div class="relative w-full h-[400px]">
<!--    <div :style="{ background: `url(${image})` }" class="w-full h-full bg-cover bg-center bg-no-repeat" />-->
    <div
      class="absolute inset-0 m-auto w-full md:w-4/5 h-full text-center flex flex-col justify-center">
      <h2 class="text-3xl mb-4 font-extrabold text-gray-800">About The Association</h2>
      <div v-for="item in about" :key="item.id" class="mt-4">
        <div class="flex items-center space-x-4">
          <div class="flex-none">
            <div class="arrow"></div>
          </div>
          <div>
            <p class="text-left">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 👉🏼 Our Mission -->
  <section class="fixed-width w-full my-14">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-14">
      <div class="w-full flex flex-col justify-center gap-7">
        <BaseTitle text="Our Mission" />
        <div v-for="item in about" :key="item.id" class="">
          <div class="flex items-center space-x-4">
            <div class="arrow"></div>
            <div>
              <p class="text-base text-gray-700 dark:text-gray-400 font-medium">{{ item.text }}</p>
            </div>
          </div>
        </div>

      </div>
      <div>
        <BaseTitle text="Our Vision" />
        <p class="text-base mt-4 text-gray-700 dark:text-gray-400 font-medium">To advance Cambodia's technological landscape by collaborating with the government to enhance education and training in high technology, promoting the effective integration of Al, robotics, and smart cities, and fostering a culture of participation that drives economic and social development.</p>

      </div>
      <div class="gallery" v-if="false">
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
