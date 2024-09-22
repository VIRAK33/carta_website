<script lang="ts" setup>
import MemberCard from '~/@core/components/card/MemberCard.vue'
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
        img="https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2FeCDRk%2FMAGPlKeCDRk%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAHXq91BIi7fycJIll1XJVrdlNXqJgOTjZkG3nkRWBv8E&exp=1726225343&osig=AAAAAAAAAAAAAAAAAAAAADN8VGllB2dsD93CnvXdq3aZSndURcebiA3_PHUe3mcm&signer=media-rpc&x-canva-quality=thumbnail"
        subtitle="President"
        title="Pheng Sokliep"
      />
      <MemberCard
        img="https://static.canva.com/web/images/87e22a62965f141aa08e93699b0b3527.jpg"
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
        img="https://static.canva.com/web/images/87e22a62965f141aa08e93699b0b3527.jpg"
        subtitle="Director General in charge Robotics"
        title="Voeurn Yong Ann"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
