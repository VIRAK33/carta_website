<script lang="ts" setup>
import MemberCard from '~/@core/components/card/MemberCard.vue'
import Dr_Pheng_Sokliep from '@/assets/images/committees/Dr_Pheng_Sokliep.jpg'
import Heng_Sokunthy from '@/assets/images/committees/Heng_Sokunthy.png'
import Ly_Diamand from '@/assets/images/committees/Dimand.webp'
import Voeurn_Yong_Ann from '@/assets/images/committees/Voeurn_Yong_Ann.jpeg'
import Thinh_Raksmey from '@/assets/images/committees/Thinh_Raksmey.webp'

</script>

<template>
  <section class="fixed-width py-14">
    <div
      class="w-full md:w-1/3 flex flex-col items-center justify-center mx-auto"
    >
      <AppTitle :text="$t('committee.our_organization_structure')" />

      <span class="inline-block pt-4 subtitle text-center">
        {{ $t('committee.our_organization_structure_des') }}
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 mt-7">
      <MemberCard
        :img="Dr_Pheng_Sokliep"
        subtitle="President"
        title="Pheng Sokliep"
        email="sokliep@carta.org.kh"
      />
      <MemberCard
        :img="Heng_Sokunthy"
        subtitle="Vice President"
        title="Heng Sokunthy"
        email="sokunthy@carta.org.kh"
      />
        <MemberCard
            :img="Ly_Diamand"
            subtitle="Vice President"
            title="Ly Diamand"
            email="diamand@carta.org.kh"
        />
      <MemberCard
        img="https://static.canva.com/web/images/87e22a62965f141aa08e93699b0b3527.jpg"
        subtitle="Administration"
        title="Heng Thylavann"
        email="thylavann@carta.org.kh"
      />
      <MemberCard
        :img="Voeurn_Yong_Ann"
        subtitle="Head Unit of AI and Robotics"
        title="Voeurn Yong Ann"
        email="yongann@carta.org.kh"
      />
      <MemberCard
        :img="Thinh_Raksmey"
        subtitle="Head Unit of Technology Transfer"
        title="Thinh Raksmey"
        email="raksmey@carta.org.kh"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
