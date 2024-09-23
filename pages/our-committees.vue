<script lang="ts" setup>
import MemberCard from '~/@core/components/card/MemberCard.vue'
import Dr_Pheng_Sokliep from '@/assets/images/committees/Dr_Pheng_Sokliep.jpg'
import Heng_Sokunthy from '@/assets/images/committees/Heng_Sokunthy.png'
import Voeurn_Yong_Ann from '@/assets/images/committees/Voeurn_Yong_Ann.jpeg'
</script>

<template>
  <section class="fixed-width py-14">
    <div
      class="w-full md:w-1/3 flex flex-col items-center justify-center mx-auto"
    >
      <AppTitle text="Our Organization Structure" />

      <span class="inline-block pt-4 subtitle text-center">
        The Cambodia AI Robotics and Technology Transfer Association is
        organized to efficiently achieve its mission and support its members.
        The structure includes the following key components:
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-7">
      <MemberCard
        :img="Dr_Pheng_Sokliep"
        subtitle="President"
        title="Pheng Sokliep"
      />
      <MemberCard
        :img="Heng_Sokunthy"
        subtitle="Vice President"
        title="Heng Sokunthy"
      />
      <MemberCard
        img="https://static.canva.com/web/images/87e22a62965f141aa08e93699b0b3527.jpg"
        subtitle="Administration"
        title="Heng Thylavann"
      />
      <MemberCard
        img="https://static.canva.com/web/images/87e22a62965f141aa08e93699b0b3527.jpg"
        subtitle="Treasurer"
        title="Sokhelly"
      />
      <MemberCard
        :img="Voeurn_Yong_Ann"
        subtitle="Director General in charge Robotics"
        title="Voeurn Yong Ann"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
