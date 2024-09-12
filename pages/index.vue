<script lang="ts" setup>
/* IMPORTS */
import SwiperBanner from '~/@core/components/pages/SwiperBanner.vue'
import BaseTitle from '~/@core/components/BaseTitle.vue'

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <!-- 👉🏼Swiper Images -->
  <SwiperBanner />

  <!-- 👉🏼Core -->
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4">

      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-red-700">Our Core Values</h1>
        <p class="text-lg text-gray-700 mt-2">Knowledge, Network, Marketplace, Leadership</p>
      </div>

      <!-- Card Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <!-- Knowledge Card -->
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
          <img src="https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2FP6hXg%2FMAGPTvP6hXg%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAACEUPA3oCCQuip7JK4uUwnJBd_ZzgJ0-sk9hmqzW2DI5&exp=1726164363&osig=AAAAAAAAAAAAAAAAAAAAANAjIYvjyBGvTk1kuQe0RXASjhGfVxap9gGCSjdzSMMM&signer=media-rpc&x-canva-quality=thumbnail" alt="Knowledge Icon" class="w-16 h-16 mb-4">
          <h2 class="text-xl font-semibold text-blue-700">Knowledge</h2>
          <p class="text-gray-600 mt-2">We are committed to advancing technological expertise and industry insights, providing our members with valuable information and resources to stay ahead in their fields.</p>
        </div>

        <!-- Network Card -->
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
          <img src="https://media.canva.com/v2/image-resize/format:JPG/height:387/quality:92/uri:s3%3A%2F%2Fmedia-private.canva.com%2Fl7qng%2FMAGPTpl7qng%2F1%2Fp.jpg/watermark:F/width:580?csig=AAAAAAAAAAAAAAAAAAAAAEIz4LfRoF344XEglF5tRV4Y0p-uWxNsY6w2n-e-Q-vq&exp=1726164132&osig=AAAAAAAAAAAAAAAAAAAAAPWfVIr_gfdCOVpAzQZrI9TDfzG_B5cGqaByKcnrzMLq&signer=media-rpc&x-canva-quality=screen" alt="Network Icon" class="w-16 h-16 mb-4">
          <h2 class="text-xl font-semibold text-blue-700">Network</h2>
          <p class="text-gray-600 mt-2">We build and sustain strong connections within Cambodia and across the region, facilitating access to a broad network of local and international partners and opportunities.</p>
        </div>

        <!-- Marketplace Card -->
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
          <img src="https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2FXTL30%2FMAGPTnXTL30%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAITtCNwosbGB4i3s_hG6YMpvTdFYyZDHWr1U0CH-LKpb&exp=1726162643&osig=AAAAAAAAAAAAAAAAAAAAAD6SzPGkSYodj9WyW1vE97S2KSvm58zLGuo9__3wgMmg&signer=media-rpc&x-canva-quality=thumbnail" alt="Marketplace Icon" class="w-16 h-16 mb-4">
          <h2 class="text-xl font-semibold text-blue-700">Marketplace</h2>
          <p class="text-gray-600 mt-2">We create and support dynamic platforms for engagement, offering our members a space to showcase their innovations, explore new markets, and connect with potential clients and collaborators.</p>
        </div>

        <!-- Leadership Card -->
        <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
          <img src="https://media.canva.com/v2/image-resize/format:JPG/height:200/quality:75/uri:s3%3A%2F%2Fmedia-private.canva.com%2FFNu6Q%2FMAGPTgFNu6Q%2F1%2Fp.jpg/watermark:F/width:200?csig=AAAAAAAAAAAAAAAAAAAAAFRKyIl71iWNZ5TwUMSYqO-mLkJbX3LIDGYb26WY9QGZ&exp=1726161635&osig=AAAAAAAAAAAAAAAAAAAAAHqO_X5EgvCu_zw3eWX77F3Gl22T1kjvnusxMudP9UTg&signer=media-rpc&x-canva-quality=thumbnail" alt="Leadership Icon" class="w-16 h-16 mb-4">
          <h2 class="text-xl font-semibold text-blue-700">Leadership</h2>
          <p class="text-gray-600 mt-2">We lead with vision and integrity, guiding our members through strategic initiatives and fostering a culture of excellence that drives progress and development in technology and business.</p>
        </div>

      </div>
    </div>
  </div>


  <!-- 👉🏼Initiatives & Activities -->
  <div class="my-4 fixed-width">
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-red-700">Initiatives & Activities</h1>
      </div>

      <!-- Content Section -->
      <div class="flex flex-col md:flex-row md:space-x-8">

        <!-- Left Column -->
        <div class="flex-1 space-y-6">
          <p class="text-lg font-semibold text-red-700">At CARTA, our focus projects are designed to drive innovation and growth across key areas:</p>
          <ul class="list-disc pl-6 space-y-4">
            <li><strong>Consultancy & Training:</strong> We provide expert consultancy and tailored training programs to help businesses and individuals enhance their technological capabilities and adapt to evolving industry needs.</li>
            <li><strong>Ecosystem Development:</strong> We build and strengthen a robust ecosystem that fosters collaboration among industry players, accelerates the adoption of advanced technologies, and drives sustainable growth across sectors.</li>
            <li><strong>Talent Development:</strong> We invest in talent by offering targeted programs to develop skills in emerging technologies, ensuring that the workforce is equipped to meet the demands of the future.</li>
          </ul>
        </div>

        <!-- Middle Column (Image as Background) -->
        <div class="hidden md:flex justify-center w-64 h-64 bg-center bg-no-repeat bg-cover" style="background-image: url('https://media-public.canva.com/NJusY/MAEl1yNJusY/1/s3.jpg');">
        </div>

        <!-- Right Column -->
        <div class="flex-1 space-y-6">
          <p class="text-lg font-semibold text-red-700">We host a diverse range of activities and events designed to foster collaboration, knowledge sharing, and innovation:</p>
          <ul class="list-disc pl-6 space-y-4">
            <li><strong>Workshops and Training:</strong> Hands-on sessions and educational programs tailored to enhance skills and knowledge in emerging technologies.</li>
            <li><strong>Networking Events:</strong> Opportunities for members to connect with industry leaders, potential partners, and peers to build valuable relationships and explore new opportunities.</li>
            <li><strong>Conferences and Seminars:</strong> In-depth discussions and presentations on the latest trends, challenges, and advancements in technology and business.</li>
            <li><strong>Exhibitions and Showcases:</strong> Platforms for members to showcase their innovations, products, and services to a wider audience.</li>
            <li><strong>Collaborative Projects:</strong> Joint initiatives with industry and government partners to drive technological advancements and address key challenges.</li>
          </ul>
        </div>

      </div>

      <!-- Footer Section -->
      <div class="mt-12 text-center">
        <p class="text-lg font-semibold text-red-700">Our activities and events are designed to support our mission of promoting technology, fostering industry growth, and facilitating valuable connections.</p>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped></style>
