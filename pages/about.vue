<script lang="ts" setup>
import banner from '@/assets/images/about/AI_Microsoft_Research_Header.webp'

/* STATES */

const about = ref<string[]>([
  {
    id: 1,
    text: 'The Cambodia AI Robotics and Technology Transfer Association (CARTA) is committed to driving technological advancement in Cambodia. We collaborate with the government to promote education and training in high technology, facilitating the exchange of expertise that is essential for the nation’s growth.',
  },
  {
    id: 2,
    text: 'Our goal is to foster strong cooperation between industry and government, ensuring the seamless implementation of artificial intelligence (AI), robotics, smart cities, and technology transfer. These initiatives are designed to stimulate economic and social development, positioning Cambodia as a key player in the regional tech landscape.',
  },
  {
    id: 3,
    text: 'CARTA also works to organize and support agents and traders across the country, helping them fulfill business obligations effectively. By promoting a culture of participation and innovation, we aim to accelerate the growth of the national economy, making it more resilient and dynamic.',
  },
  {
    id: 4,
    text: 'We are dedicated to driving technological advancement and economic growth by fostering Knowledge, building a strong Network, creating vibrant Marketplace opportunities, and exemplifying Leadership in all our initiatives.',
  },
  {
    id: 5,
    text: 'Through our efforts, CARTA is building a future where technology and collaboration are at the heart of Cambodia’s progress, driving sustainable development for the benefit of all.rk, creating vibrant Marketplace opportunities, and exemplifying Leadership in all our initiatives.',
  },
])

const mission = ref<string[]>([
  {
    id: 1,
    text: 'Government Collaboration: Partner with government bodies to enhance education and training in high technology sectors.',
  },
  {
    id: 2,
    text: 'Promote Technological Implementation: Facilitate the adoption of Al, robotics, and smart cities through effective business practices and technology transfer.',
  },
  {
    id: 3,
    text: 'International and Domestic Partnerships: Work with institutions both locally and globally to share knowledge and conduct advanced technology training',
  },
  {
    id: 4,
    text: "Human Resource Development: Assist in the mobilization and development of skilled professionals in Al, robotics, and smart cities to support Cambodia's technological advancement. Economic Growth: Contribute to the rapid growth of the national economy by promoting innovative practices and fostering a collaborative environment.",
  },
])
</script>

<template>
  <!-- 👉🏼 Banner About -->
  <div class="relative w-full h-[220px]">
    <div
      :style="{ backgroundImage: `url(${banner})` }"
      class="w-full h-full bg-cover bg-center bg-no-repeat grid place-items-center"
    >
      <div class="text-4xl font-bold uppercase text-white">
        About The Association
      </div>
    </div>
  </div>

  <div class="fixed-width my-4">
    <ul
      class="grid grid-cols-1 md:grid-cols-2 gap-7 w-full lg:w-2/3 mx-auto list-disc list-outside"
    >
      <li>
        <span>
          The Cambodia AI Robotics and Technology Transfer Association (CARTA)
          is committed to driving technological advancement in Cambodia. We
          collaborate with the government to promote education and training in
          high technology, facilitating the exchange of expertise that is
          essential for the nation’s growth.
        </span>
      </li>
      <li>
        <span>
          Our goal is to foster strong cooperation between industry and
          government, ensuring the seamless implementation of artificial
          intelligence (AI), robotics, smart cities, and technology transfer.
          These initiatives are designed to stimulate economic and social
          development, positioning Cambodia as a key player in the regional tech
          landscape.
        </span>
      </li>
      <li>
        <span>
          CARTA also works to organize and support agents and traders across the
          country, helping them fulfill business obligations effectively. By
          promoting a culture of participation and innovation, we aim to
          accelerate the growth of the national economy, making it more
          resilient and dynamic.
        </span>
      </li>
      <li>
        <span>
          We are dedicated to driving technological advancement and economic
          growth by fostering Knowledge, building a strong Network, creating
          vibrant Marketplace opportunities, and exemplifying Leadership in all
          our initiatives.
        </span>
      </li>
      <li>
        <span>
          Through our efforts, CARTA is building a future where technology and
          collaboration are at the heart of Cambodia’s progress, driving
          sustainable development for the benefit of all.rk, creating vibrant
          Marketplace opportunities, and exemplifying Leadership in all our
          initiatives.
        </span>
      </li>
    </ul>
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
          Our Mission
        </h4>
        <ul class="flex flex-col gap-7 mt-7">
          <li class="flex items-center gap-4">
            <Icon
              class="flex-none self-start text-2xl text-primary-500 mt-1"
              name="material-symbols:line-end-arrow-notch-rounded"
            />
            <span>
              The Cambodia AI Robotics and Technology Transfer Association
              (CARTA) is committed to driving technological advancement in
              Cambodia. We collaborate with the government to promote education
              and training in high technology, facilitating the exchange of
              expertise that is essential for the nation’s growth.
            </span>
          </li>
          <li class="flex items-center gap-4">
            <Icon
              class="flex-none self-start text-2xl text-primary-500 mt-1"
              name="material-symbols:line-end-arrow-notch-rounded"
            />
            <span>
              Our goal is to foster strong cooperation between industry and
              government, ensuring the seamless implementation of artificial
              intelligence (AI), robotics, smart cities, and technology
              transfer. These initiatives are designed to stimulate economic and
              social development, positioning Cambodia as a key player in the
              regional tech landscape.
            </span>
          </li>
          <li class="flex items-center gap-4">
            <Icon
              class="flex-none self-start text-2xl text-primary-500 mt-1"
              name="material-symbols:line-end-arrow-notch-rounded"
            />
            <span>
              CARTA also works to organize and support agents and traders across
              the country, helping them fulfill business obligations
              effectively. By promoting a culture of participation and
              innovation, we aim to accelerate the growth of the national
              economy, making it more resilient and dynamic.
            </span>
          </li>
          <li class="flex items-center gap-4">
            <Icon
              class="flex-none self-start text-2xl text-primary-500 mt-1"
              name="material-symbols:line-end-arrow-notch-rounded"
            />
            <span>
              We are dedicated to driving technological advancement and economic
              growth by fostering Knowledge, building a strong Network, creating
              vibrant Marketplace opportunities, and exemplifying Leadership in
              all our initiatives.
            </span>
          </li>
          <li class="flex items-center gap-4">
            <Icon
              class="flex-none self-start text-2xl text-primary-500 mt-1"
              name="material-symbols:line-end-arrow-notch-rounded"
            />
            <span>
              Through our efforts, CARTA is building a future where technology
              and collaboration are at the heart of Cambodia’s progress, driving
              sustainable development for the benefit of all.rk, creating
              vibrant Marketplace opportunities, and exemplifying Leadership in
              all our initiatives.
            </span>
          </li>
        </ul>
      </div>
      <div class="w-full pl-0 md:pl-7 mt-8">
        <img
          alt="Mission"
          class="w-24 h-24 object-cover mx-auto"
          src="@/assets/icons/vision.png"
        />
        <h4
          class="text-xl text-gray-800 dark:text-gray-300 font-semibold text-center"
        >
          Our Vision
        </h4>
        <ul class="flex flex-col gap-7 mt-7">
          <li class="flex items-center gap-4">
            <Icon
              class="flex-none self-start text-2xl text-primary-500 mt-1"
              name="material-symbols:line-end-arrow-notch-rounded"
            />
            <span>
              To advance Cambodia's technological landscape by collaborating
              with the government to enhance education and training in high
              technology, promoting the effective integration of Al, robotics,
              and smart cities, and fostering a culture of participation that
              drives economic and social development.
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>

  <!-- 👉🏼 Our Mission -->
  <section v-if="false" class="fixed-width w-full my-14">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-14">
      <div class="w-full flex flex-col justify-center gap-7">
        <AppTitle text="Our Mission" />
        <div v-for="item in about" :key="item.id" class="">
          <div class="flex items-center space-x-4">
            <div class="arrow"></div>
            <div>
              <p class="text-base text-gray-700 dark:text-gray-400 font-medium">
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <AppTitle text="Our Vision" />
        <p class="text-base mt-4 text-gray-700 dark:text-gray-400 font-medium">
          To advance Cambodia's technological landscape by collaborating with
          the government to enhance education and training in high technology,
          promoting the effective integration of Al, robotics, and smart cities,
          and fostering a culture of participation that drives economic and
          social development.
        </p>
      </div>
      <div v-if="false" class="gallery">
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
