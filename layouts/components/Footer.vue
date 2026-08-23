<script lang="ts" setup>
const quickLinks = [
  { to: '/about', label: 'menus.about' },
  { to: '/our-committees', label: 'menus.our_committees' },
  { to: '/members', label: 'menus.members' },
  { to: '/events', label: 'menus.events' },
  { to: '/news', label: 'menus.news' },
]

const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/share/185ECdH5nd/?mibextid=wwXIfr', icon: 'mdi:facebook' },
]
</script>

<template>
  <footer class="bg-gray-50 dark:bg-gray-950/60 border-t border-gray-200 dark:border-gray-800">
    <!-- 👉🏼Gradient accent strip -->
    <div class="h-1 bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600" />

    <div class="fixed-width py-14">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <AppLogo />
          <p class="mt-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-md">
            {{ $t('footer.tagline') }}
          </p>
          <div class="flex items-center gap-3 mt-6">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              :aria-label="s.name"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 grid place-items-center text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-br hover:from-primary-500 hover:to-primary-700 hover:ring-primary-400 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Icon :name="s.icon" class="text-lg" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <AppReveal :delay="100">
          <div>
            <h5 class="text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-5">
              {{ $t('menus.quick_links') }}
            </h5>
            <ul class="space-y-3">
              <li v-for="link in quickLinks" :key="link.to">
                <NuxtLink
                  :to="link.to"
                  class="group inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  <span class="w-0 group-hover:w-3 transition-all duration-300 overflow-hidden text-primary-500">→</span>
                  {{ $t(link.label) }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </AppReveal>

        <!-- Contact -->
        <AppReveal :delay="200">
          <div>
            <h5 class="text-sm font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-5">
              {{ $t('menus.get_in_touch') }}
            </h5>
            <ul class="space-y-3">
              <li>
                <a href="tel:+85561809888" class="group flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  <span class="flex-none w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/40 grid place-items-center transition-colors group-hover:bg-primary-100 dark:group-hover:bg-primary-900/70">
                    <Icon class="text-primary-500" name="material-symbols:call-rounded" />
                  </span>
                  +855 (61) 809 888
                </a>
              </li>
              <li>
                <a href="mailto:info@carta.org.kh" class="group flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">
                  <span class="flex-none w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/40 grid place-items-center transition-colors group-hover:bg-primary-100 dark:group-hover:bg-primary-900/70">
                    <Icon class="text-primary-500" name="material-symbols:alternate-email-rounded" />
                  </span>
                  info@carta.org.kh
                </a>
              </li>
              <li>
                <span class="group flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex-none w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-900/40 grid place-items-center">
                    <Icon class="text-primary-500" name="material-symbols:location-on-rounded" />
                  </span>
                  Phnom Penh, Cambodia
                </span>
              </li>
            </ul>
          </div>
        </AppReveal>
      </div>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-800">
      <div class="fixed-width py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-sm text-gray-400">© {{ new Date().getFullYear() }} CARTA. {{ $t('footer.rights') }}</p>
        <p class="text-xs text-gray-400 uppercase tracking-wider">{{ $t('footer.caption') }}</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped></style>
