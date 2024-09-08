<script lang="ts" setup>

</script>

<template>
  <div class="footer">
    <div class="footer--info">
      <div class="flex items-center gap-4">
        <h1 class="text-xl text-gray-700 dark:text-gray-300 font-semibold">Website Name</h1>
        <img alt="" src="https://cdn.pixabay.com/photo/2022/08/22/02/05/logo-7402513_640.png" />
      </div>

      <span class="text-sm text-gray-500 dark:text-gray-400">
        Lorem ipsum odor amet, consectetuer adipiscing elit.
      </span>
    </div>

    <div class="footer--column text-left">
      <h5 class="text-lg text-gray-700 dark:text-gray-300 font-semibold">Quick Links</h5>
      <ul class="flex flex-col gap-2 pt-4">
        <li>
          <a class="block text-sm text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-primary-400">
            About
          </a>
        </li>
        <li>
          <a class="block text-sm text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-primary-400">
            Our Committees
          </a>
        </li>
        <li>
          <a class="block text-sm text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-primary-400">
            Members
          </a>
        </li>
        <li>
          <a class="block text-sm text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-primary-400">
            News & Events
          </a>
        </li>
      </ul>
    </div>

    <div class="footer--contact">
      <h5 class="text-lg text-gray-700 dark:text-gray-300 font-semibold">Get In Touch</h5>
      <span class="flex items-center gap-2 my-2 font-medium text-gray-500 dark:text-gray-400">
        <Icon class="flex-none text-lg" name="material-symbols:call" />
        <a class="text-sm" href="tel:+85592346767">+855 92 346 767</a>
      </span>
      <span class="flex items-center gap-2 my-2 font-medium text-gray-500 dark:text-gray-400">
        <Icon class="flex-none text-lg" name="material-symbols:alternate-email" />
        <a class="text-sm" href="mailto:+85592346767">info@educonnectkh.com</a>
      </span>
      <span class="flex items-center gap-2 my-2 font-medium text-gray-500 dark:text-gray-400">
        <Icon class="flex-none text-lg" name="material-symbols:location-on-rounded" />
        <span class="text-sm">Phnom Penh, Cambodia</span>
      </span>
    </div>
  </div>
  <hr />
  <div class="w-full py-2 text-center">
    <p class="text-sm text-gray-400 font-medium">© 2024 by Website Name</p>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  @apply w-full grid grid-cols-2 md:grid-cols-3 gap-4 px-4 py-4
  border-t border-gray-200 dark:border-gray-700;

  &--info {
    @apply w-full text-left;
    img {
      @apply h-14 aspect-square mx-auto md:mx-0 object-cover;
    }
  }
}
</style>
