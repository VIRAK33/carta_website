<script lang="ts" setup>
/* IMPORTS */
import BaseTitle from '~/@core/components/BaseTitle.vue'
import MemberCard from '~/@core/components/pages/MemberCard.vue'

/* STATES */
const banner = ref<string>('https://images.pexels.com/photos/1029606/pexels-photo-1029606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
</script>

<template>
  <!-- Banner -->
  <div :style="{ backgroundImage: `url(${banner}` }" class="w-full h-64 bg-cover bg-center bg-no-repeat"></div>
  <section class="fixed-width py-14">
    <div class="w-full md:w-1/3 flex flex-col items-center justify-center mx-auto">
      <BaseTitle text="Out Best Working Team" />

      <span class="inline-block pt-4 subtitle text-center">
        Effective teams communication openly, leverage strength, and embrace
        diversity for success.
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-7">
      <MemberCard
        img="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2024/06/15/17184214562297.jpg"
        subtitle="Football Superstar"
        title="Leonel Messi"
      />
      <MemberCard
        img="https://assets.architecturaldigest.in/photos/638dc400d8be961106a0cdc1/16:9/w_2560%2Cc_limit/GettyImages-1443064180.jpg"
        subtitle="Football Superstar"
        title="Cristiano Ronaldo"
      />
      <MemberCard
        img="https://cdn.kiripost.com/static/images/photo_2023-06-13_16-49-51.2e16d0ba.fill-960x540.jpg"
        subtitle="Rapper Star"
        title="Vannda Mann"
      />
      <MemberCard
        img="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/G-Devith_image.jpg/1200px-G-Devith_image.jpg"
        subtitle="Rapper Star"
        title="Ngoun Chan Devith"
      />
      <MemberCard
        img="https://images.khmer24.co/profiles/pictures/24-06-14/profile_76303717183501843059.jpg"
        subtitle="Mengleang Tuong"
        title="Fullstack Developer"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
