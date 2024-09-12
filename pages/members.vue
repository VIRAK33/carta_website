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

  <!-- Membership -->
  <h1 class="text-5xl font-bold text-red-700 text-center">Membership</h1>
  <div class="py-8">
    <div class="mx-auto max-w-7xl px-4">
      <!-- Membership Section -->
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Corporate Membership -->
        <div class="rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 class="mb-4 text-2xl font-bold text-red-700">Corporate Membership</h2>
          <p class="mb-4 text-gray-600">Tailored for businesses looking to integrate advanced technologies, gain access to exclusive events, and collaborate on innovative projects. Corporate members benefit from networking opportunities, industry insights, and tailored consultancy services.</p>
          <img src="https://media.canva.com/v2/image-resize/format:JPG/height:698/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2F72AZI%2FMAGPT472AZI%2F1%2Fp.jpg/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAACuyB7s8aNWccQjQLkqQFm97Pk5Y6tL4mkTeEXmag-dL&exp=1726162896&osig=AAAAAAAAAAAAAAAAAAAAAPIoqNIKqrybnK5wB-LCEC3ZORjs-rpWTVjqayQfbN2F&signer=media-rpc&x-canva-quality=screen" alt="Corporate Membership Icon" class="mx-auto mb-4 h-24 w-24" />
        </div>

        <!-- Professional Membership -->
        <div class="rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 class="mb-4 text-2xl font-bold text-red-700">Professional Membership</h2>
          <p class="mb-4 text-gray-600">Designed for individuals working in the technology sector who seek to stay at the forefront of industry trends, enhance their skills, and connect with peers. Professional members gain access to workshops, training sessions, and a network of industry experts.</p>
          <img src="https://media.canva.com/v2/image-resize/format:PNG/height:250/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FduzSY%2FMAGPT4duzSY%2F1%2Fp.png/watermark:F/width:250?csig=AAAAAAAAAAAAAAAAAAAAAHNqIyRWQW5-Z7cHG74fAT6KnoQHvuaWB1Gp5u4V9sCI&exp=1726162935&osig=AAAAAAAAAAAAAAAAAAAAALZXHdjVlF3H8lT8viL0jXucGfUBE-_VSUf02L2nCWnN&signer=media-rpc&x-canva-quality=screen" alt="Professional Membership Icon" class="mx-auto mb-4 h-24 w-24" />
        </div>

        <!-- Associate Membership -->
        <div class="rounded-lg bg-white p-6 text-center shadow-lg">
          <h2 class="mb-4 text-2xl font-bold text-red-700">Associate Membership</h2>
          <p class="mb-4 text-gray-600">Ideal for organizations and individuals interested in supporting CARTA’s mission and participating in our initiatives. Associate members are involved in events, receive updates on industry developments, and have opportunities to contribute to collaborative projects.</p>
          <img src="https://media.canva.com/v2/image-resize/format:PNG/height:788/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FAi1Dc%2FMAGPT1Ai1Dc%2F1%2Fp.png/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAALO8bXULFh-8D_CRV1DK9wr3oGilb9PKl-v6xqPUn65r&exp=1726164120&osig=AAAAAAAAAAAAAAAAAAAAALmC7v7qOnC6Y1GpG6Sk-HGP1EOV_JqR6aebZCyfE1Mv&signer=media-rpc&x-canva-quality=screen" alt="Associate Membership Icon" class="border-round mx-auto mb-4 h-24 w-24" />
        </div>
      </div>
    </div>
  </div>

  <!-- Our Partnership -->
  <h1 class="text-5xl font-bold text-red-700 text-center">Our Partnership</h1>
  <div class="flex flex-col items-center justify-center bg-white py-12">
    <div class="mx-auto max-w-7xl px-4 text-center">
      <!-- Partnership Section -->
      <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <!-- Government Partnerships -->
        <div>
          <div class="flex justify-center space-x-8">
            <div class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4">
              <img src="https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2F8GPHI%2FMAGPT28GPHI%2F1%2Fp.png/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAH6qXawRjvQdvfSwTWGom8WSisKf2CRRfFWLQKsraLTQ&exp=1726162285&osig=AAAAAAAAAAAAAAAAAAAAALP4kEfd0Nd-YBI4mHgMgfcyeHx7KUl5K_nEVhvelsul&signer=media-rpc&x-canva-quality=thumbnail" alt="Icon 1" class="h-12 w-12" />
            </div>
          </div>
          <h2 class="mb-4 text-2xl font-bold text-red-700">Government Partnerships</h2>
          <p class="mb-4 text-gray-600">We collaborate with government agencies to promote high technology education, implement technology transfer programs, and support policy development that fosters innovation and growth.</p>
          <div class="flex justify-center space-x-4">
            <img src="https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FRRFVs%2FMAGPT5RRFVs%2F1%2Fp.png/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAK_IbDDvY1RyNj_8COU_oEH1HvOPtGu4rYHCQnGFAjLJ&exp=1726164249&osig=AAAAAAAAAAAAAAAAAAAAAD1jGBNjHvU4s1ErEZcu1x2SrGZLJ5Vkn2Cb4d0gOqxt&signer=media-rpc&x-canva-quality=thumbnail" alt="Gov Logo 1" class="h-16 w-16" />
            <img src="https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FCwZak%2FMAGPTwCwZak%2F1%2Fp.png/watermark:F/width:194?csig=AAAAAAAAAAAAAAAAAAAAAK_uVNvEU4X9uaV_n8JJ1hmfvQ8Vgk3Ta8m2hKZu9Ouu&exp=1726163422&osig=AAAAAAAAAAAAAAAAAAAAAIP6IPrhbUyItZOh9NjGiy-T6Id_VlnVnN_Q_ltZjsyh&signer=media-rpc&x-canva-quality=thumbnail" alt="Gov Logo 2" class="h-16 w-16" />
            <img src="https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FDzRd8%2FMAGPT4DzRd8%2F1%2Fp.png/watermark:F/width:182?csig=AAAAAAAAAAAAAAAAAAAAAM5BDKsPBzknkY6GPjvXJC8jPQBx8HWijIKl4oCvWpfx&exp=1726164432&osig=AAAAAAAAAAAAAAAAAAAAAH1N_DC0Xmxp8079TeEosc9kuNJpsH0IRo3vjEDD0xBO&signer=media-rpc&x-canva-quality=thumbnail" alt="Gov Logo 3" class="h-16 w-16" />
          </div>
        </div>

        <!-- Educational Partnerships -->
        <div>
          <div class="flex justify-center space-x-8">
            <div class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4">
              <img src="https://media.canva.com/v2/image-resize/format:PNG/height:500/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2F9FbXc%2FMAGPUy9FbXc%2F1%2Fp.png/watermark:F/width:500?csig=AAAAAAAAAAAAAAAAAAAAACCmDdeQ2E9jL63BMadRd7KayLjs3QVYq-787bZJ-jpL&exp=1726162981&osig=AAAAAAAAAAAAAAAAAAAAALB7geGnfq_7K6nW5gsQf1qYAfonuBilmon7rgjbZOcd&signer=media-rpc&x-canva-quality=screen" alt="Icon 1" class="h-12 w-12" />
            </div>
          </div>
          <h2 class="mb-4 text-2xl font-bold text-red-700">Educational Partnerships</h2>
          <p class="mb-4 text-gray-600">Partnering with universities and research centers, we facilitate knowledge exchange, advanced technology training, and collaborative research efforts to drive technological innovation.</p>
          <img src="" alt="Education Logo" class="mx-auto h-16 w-16" />
        </div>

        <!-- Industry Partnerships -->
        <div>
          <div class="flex justify-center space-x-8">
            <div class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4">
              <img src="https://media.canva.com/v2/image-resize/format:PNG/height:115/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FYwYlg%2FMAGPU8YwYlg%2F1%2Fp.png/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAL6uBcHo9q-qL_rILirqI0fbSg5vewgM0joMqHl3WY3d&exp=1726161774&osig=AAAAAAAAAAAAAAAAAAAAAIWgSarKQjIr1HJhxkv_qSEOqOVmsPKJYmRqAQKTZqOU&signer=media-rpc&x-canva-quality=thumbnail" alt="Icon 1" class="h-12 w-12" />
            </div>
          </div>
          <h2 class="mb-4 text-2xl font-bold text-red-700">Industry Partnerships</h2>
          <p class="mb-4 text-gray-600">We work closely with leading companies and industry organizations to advance the adoption of AI, robotics, and smart cities. These partnerships provide mutual benefits through joint projects, research initiatives, and shared resources.</p>
          <div class="flex justify-center space-x-4">
            <img src="" alt="Industry Logo 1" class="h-16 w-16" />
            <img src="" alt="Industry Logo 2" class="h-16 w-16" />
          </div>
        </div>

        <!-- International Organizations -->
        <div>
          <div class="flex justify-center space-x-8">
            <div class="flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-500 p-4">
              <img src="https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FW8SEM%2FMAGPT0W8SEM%2F1%2Fp.png/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAADjOR6sfTjB7kX4dlLTdLkPbiUtKbfpkXzWV4He99gm6&exp=1726163723&osig=AAAAAAAAAAAAAAAAAAAAAP1wx4Mn3Icsbr2Drm5jvmGnRbPIOOQpvTyHkHm9-HYl&signer=media-rpc&x-canva-quality=thumbnail" alt="Icon 1" class="h-12 w-12" />
            </div>
          </div>
          <h2 class="mb-4 text-2xl font-bold text-red-700">International Organization</h2>
          <p class="mb-4 text-gray-600">By engaging with global institutions, we bring international expertise and opportunities to Cambodia, enhancing our members' access to global markets and best practices.</p>
          <div class="flex justify-center space-x-4">
            <img src="https://media.canva.com/v2/image-resize/format:PNG/height:200/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2F12lcE%2FMAGPT712lcE%2F1%2Fp.png/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAABWWvirnmMjhcmEhSm26mPan8_aYazaq5BmfiDNqQ7W9&exp=1726161870&osig=AAAAAAAAAAAAAAAAAAAAAJiH2nCnqcN5-dJBfhFRkgAx_40Itq0qZk4MrafllN4w&signer=media-rpc&x-canva-quality=thumbnail" alt="International Logo 1" class="h-16" />
            <img src="https://media.canva.com/v2/image-resize/format:PNG/height:203/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FUHLAk%2FMAGPT9UHLAk%2F1%2Fp.png/watermark:F/width:584?csig=AAAAAAAAAAAAAAAAAAAAABG7cw6rK_1ar5WbJn0es2l7QoMwOV45epxuXF0Okk6N&exp=1726162142&osig=AAAAAAAAAAAAAAAAAAAAACiGE_88VD1z5eudJlDYtRLtyfsm8ssnI-LQrXv8IA87&signer=media-rpc&x-canva-quality=screen" alt="International Logo 2" class="h-16" />
            <img src="https://media.canva.com/v2/image-resize/format:JPG/height:141/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2FWTW-s%2FMAGPT5WTW-s%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAPIV9QQgUb_DmDpO1o8inVbGj-6NN9XQTe-mLUHkyc-0&exp=1726163942&osig=AAAAAAAAAAAAAAAAAAAAAA1_53pVaUNsatjK8ej2TFdN-0u41uKscQFwLDGeWnvB&signer=media-rpc&x-canva-quality=thumbnail" alt="International Logo 3" class="h-16" />
          </div>
          <div class="flex justify-center space-x-4">
            <img src="https://media.canva.com/v2/image-resize/format:JPG/height:231/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2FQ0Y7U%2FMAGPTxQ0Y7U%2F1%2Fp.jpg/watermark:F/width:651?csig=AAAAAAAAAAAAAAAAAAAAAJ6ADSZvLRFT6NQYpxMI0rKiOqMouawGkMjkumcO7aYa&exp=1726162505&osig=AAAAAAAAAAAAAAAAAAAAAPD04v1CiAwfjErr5OJpMkla3XKXTEZz8Rxe_fHhiYg6&signer=media-rpc&x-canva-quality=screen" alt="International Logo 3" class="h-16" />
            <img src="https://media.canva.com/v2/image-resize/format:PNG/height:128/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2FEVBMc%2FMAGPT3EVBMc%2F1%2Fp.png/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAGo72kL-RgLp5vMn7PhyxG7prTcRdaI7ctRIOlZJIQu8&exp=1726162112&osig=AAAAAAAAAAAAAAAAAAAAAPgoFFybE4KiB0cfGjZyuEj3belIcmwaVnIf2onwXXHg&signer=media-rpc&x-canva-quality=thumbnail" alt="International Logo 3" class="h-16 w-16" />
            <img src="https://media.canva.com/v2/image-resize/format:PNG/height:215/quality:100/uri:s3%3A%2F%2Fmedia-private.canva.com%2F2t1pY%2FMAGPT_2t1pY%2F1%2Fp.png/watermark:F/width:598?csig=AAAAAAAAAAAAAAAAAAAAALIIWC61Yh4TLbGSVuvP0zWmqlweXBog5fLaMgTUhxGw&exp=1726163221&osig=AAAAAAAAAAAAAAAAAAAAANj0Gdgt0t65cEgrkGG-RNsTkIofTXKUWXtFH_cW9_k5&signer=media-rpc&x-canva-quality=screen" alt="International Logo 3" class=" h-16" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

</style>
