<script lang="ts" setup>
/* IMPORTS */
import EventMediaCard from '~/@core/components/card/EventMediaCard.vue'
import type { ICard } from '~/types/IComponent'

/* STATES */
const medias = ref<ICard[]>([
  {
    slug: '5kt3sP7kIIfo',
    thumbnail:
      'https://storage.cambo-report.com/post/202409/qntubdfwfdcELPZFfT4w7EW1S9vyfHGcqGiz9x59.jpg',
    title:
      'ស៊ីភីយូម៉ាស៊ីនហ្គេមចល័ត AMD Ryzen Z2 Extreme រំពឹងថាប្រកាសចេញនៅដើមឆ្នាំ 2025',
    photos: [
      'https://storage.googleapis.com/camboreport/post/202409/e4I2S28JNGAKuDDpK0gAKHqd9z3jUuDXmjWYidS1.jpg',
      'https://storage.googleapis.com/camboreport/post/202409/AoLtGajupahJ9ZM70X9OKahprMzt7Ert0CWPXnvp.webp',
    ],
  },
  {
    slug: '5kt3sP7kIIfo',
    thumbnail:
      'https://storage.cambo-report.com/post/202409/0mqBj0U4umehnFZH9IDmhGDHeK8YQFoP9g8uhHxu.jpg',
    title: 'ទស្សនាព្រឹត្តិការណ៍ប្រកាសចេញ iPhone 16 series នៅពាក់កណ្ដាលយប់នេះ',
    photos: [
      'https://storage.googleapis.com/camboreport/post/202409/L3e5RFQngARuItVJlnlxfoB9qrJIapRDh1rXEPmb.jpg',
      'https://storage.googleapis.com/camboreport/post/202409/Oc7DXwSg6mlA0MnCNjvdDaHfa6Y9zr9Eqe8NVho2.jpg',
      'https://imageio.forbes.com/specials-images/imageserve/66cca8b52af70293c8b5ef62/Screenshot-2024-08-26-at-17-06-02/960x0.png?height=841&width=711&fit=bounds',
      'https://i.ytimg.com/vi/xlqpzYOoSQs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBmB_xA8Uo6pkDgYI8Ey34ilcFDPw',
    ],
  },
  {
    slug: '5kt3sP7kIIfo',
    thumbnail:
      'https://storage.cambo-report.com/post/202409/NrutRwajG3uImiM1hyx0eLCqUj7OJjb9EZXI8tDl.jpg',
    title:
      'YouTubers បង្កើតរូបរាង iPhone 15 Pro Max កម្ពស់ 2 ម៉ែត្របានដោយជោគជ័យ',
    photos: [
      'https://storage.googleapis.com/camboreport/post/202409/sF9ZatPvIbUxEWre07RiUVrLJV4sV6WIXJKi7ZwS.jpg',
      'https://storage.googleapis.com/camboreport/post/202409/FPwp7dzkcNYHd8N6J9pxmRDRYc9rk2WRqT6CzORx.png',
      'https://storage.googleapis.com/camboreport/post/202409/FQby4w43cJTNIwB667SZYDrsNmGKex3M0ZSCzBpT.webp',
    ],
  },
  {
    slug: '5kt3sP7kIIfo',
    thumbnail:
      'https://storage.cambo-report.com/post/202409/ISOMCvqHjwRyG6z51l9g23qsq2bgt3bh9eHZYnxD.jpg',
    title:
      'Sony ប្រកាសចេញ PS5 Pro ជាផ្លូវការ បំពាក់ GPU ខ្លាំងជាងមុន និងមានមុខងារ AI upscaling',
    photos: [
      'https://storage.googleapis.com/camboreport/post/202409/hAErxFbKcNjMg9RokApvbTT6PsXgsfj3aEVkN4ri.webp',
      'https://storage.googleapis.com/camboreport/post/202409/shr2sJrjo59nnvLZf6Vx6iwiPTVu2Uz2KxfB22St.jpg',
      'https://storage.googleapis.com/camboreport/post/202409/rBEHyeFIYEZWKzLVgQ8e5OkmI1HfIQxzPAkDBkrm.webp',
      'https://storage.googleapis.com/camboreport/post/202409/BBSyLFA2gAtPcUOaraLug3znK10OkydHUbjb6fKc.webp',
      'https://storage.googleapis.com/camboreport/post/202409/qD20xlpDahXEl5yHt573swgB9ioe3Kv9LIbeWMsp.webp',
      'https://storage.googleapis.com/camboreport/post/202409/jXrAapU5Jo3taNU2ioXLJgaFqIvvJ8lvCDqLJt0q.webp',
    ],
  },
  {
    slug: '5kt3sP7kIIfo',
    thumbnail:
      'https://storage.cambo-report.com/post/202409/cR1vtPBu2WlLfQMOwbRwRFrMEhOXresJuGoX0XCZ.jpg',
    title:
      'OnePlus បានបញ្ជាក់ប្រាប់ហើយថា OnePlus 13 នឹងប្រកាសចេញនៅក្នុងខែតុលា 2024',
    photos: [
      'https://storage.googleapis.com/camboreport/post/202409/VxEfGHRRk9Uw1xMfawHpnqVPIhHydqsLbzDyBf0s.jpg',
      'https://storage.googleapis.com/camboreport/post/202409/zJ4XeVTEtRJdj3B6n4TwcE27GP2gUljZKdzJ93W9.png',
    ],
  },
])
</script>

<template>
  <div class="fixed-width py-14">
    <div
      class="w-full md:w-1/2 flex flex-col items-center justify-center mx-auto"
    >
      <AppTitle text="Our Event Media" />

      <span class="inline-block pt-4 subtitle text-center">
        Put your graphic novels down and your costume on, because it’s time to
        head to this year’s Woodbridge Comic Con! Meet your favorite characters
        from television and film, buy cool gear, and show off your latest
        cosplay to an audience of like minded enthusiasts.
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-7 my-14">
      <EventMediaCard
        v-for="({ title, thumbnail, photos }, $i) in medias"
        :key="$i"
        :gallery="photos"
        :src="thumbnail"
        :title="title"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
