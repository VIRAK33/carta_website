<script lang="ts" setup>
</script>

<template>
  <div class="footer fixed-width">
    <div class="footer--info">
      <AppLogo />

      <span v-if="false" class="text-sm text-gray-500 dark:text-gray-400">
        Lorem ipsum odor amet, consectetuer adipiscing elit.
      </span>
    </div>

    <div class="footer--column text-left">
      <h5 class="text-lg text-gray-700 dark:text-gray-300 font-semibold">
        Quick Links
      </h5>
      <ul class="flex flex-col gap-2 pt-4">
        <li>
          <a
            class="block text-sm text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-primary-400"
          >
            <NuxtLink to="/about">About</NuxtLink>
          </a>
        </li>
        <li>
          <a
            class="block text-sm text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-primary-400"
          >
            <NuxtLink to="/our-committees">Our Committees</NuxtLink>
          </a>
        </li>
        <li>
          <a
            class="block text-sm text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-primary-400"
          >
            <NuxtLink to="/members">Members</NuxtLink>
          </a>
        </li>
        <li v-if="false">
          <a
            class="block text-sm text-gray-500 dark:text-gray-400 font-medium cursor-pointer hover:text-primary-400"
          >
            <NuxtLink to="/news">News & Events</NuxtLink>
          </a>
        </li>
      </ul>
    </div>

    <div class="footer--contact">
      <h5 class="text-lg text-gray-700 dark:text-gray-300 font-semibold">
        Get In Touch
      </h5>
      <span
        class="flex items-center gap-2 my-2 font-medium text-gray-500 dark:text-gray-400"
      >
        <Icon class="flex-none text-lg" name="material-symbols:call" />
        <a class="text-sm" href="tel:+85592346767">+855 92 346 767</a>
      </span>
      <span
        class="flex items-center gap-2 my-2 font-medium text-gray-500 dark:text-gray-400"
      >
        <Icon
          class="flex-none text-lg"
          name="material-symbols:alternate-email"
        />
        <a class="text-sm" href="mailto:+85592346767">info@carta.org.kh</a>
      </span>
      <span
        class="flex items-center gap-2 my-2 font-medium text-gray-500 dark:text-gray-400"
      >
        <Icon
          class="flex-none text-lg"
          name="material-symbols:location-on-rounded"
        />
        <span class="text-sm">Phnom Penh, Cambodia</span>
      </span>
    </div>
  </div>
  <span class="divider" />
  <div class="w-full py-2 text-center">
    <p class="text-sm text-gray-400 font-medium">© 2024 by Carta</p>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  @apply grid grid-cols-2 md:grid-cols-3 gap-4 px-4 py-4
  border-t border-gray-200 dark:border-gray-700;

  &--info {
    @apply flex items-start w-full text-left;
  }
}
</style>
