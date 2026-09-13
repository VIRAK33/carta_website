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
  <footer class="relative overflow-hidden bg-gray-50 dark:bg-[#0e1626]/80 border-t border-gray-200 dark:border-gray-800">
    <!-- Kbach Phkar Chan Silk Grid Watermark -->
    <div class="footer-phkar-chan-texture" aria-hidden="true" />

    <!-- Corner Kbach Phkar Chan Watermark Accents -->
    <AppPhkarChan
      size="w-20 h-20 sm:w-28 sm:h-28"
      custom-class="text-primary-500/15 dark:text-[#C5A059]/20"
      class="absolute -top-4 -right-4 pointer-events-none"
    />
    <AppPhkarChan
      size="w-16 h-16 sm:w-24 sm:h-24"
      custom-class="text-primary-500/10 dark:text-[#C5A059]/15"
      class="absolute -bottom-4 -left-4 pointer-events-none"
    />

    <!-- 👉🏼Gradient accent strip -->
    <div class="h-0.5 bg-gradient-to-r from-primary-600 via-primary-400 to-primary-600 relative z-10" />

    <div class="fixed-width py-5 sm:py-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <!-- Brand -->
        <div class="md:col-span-5">
          <AppLogo />
          <p class="mt-2 text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm">
            {{ $t('footer.tagline') }}
          </p>
          <div class="flex items-center gap-2.5 mt-3">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              :aria-label="s.name"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 grid place-items-center text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-br hover:from-primary-500 hover:to-primary-700 hover:ring-primary-400 transition-all duration-200"
            >
              <Icon :name="s.icon" class="text-base" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="md:col-span-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">
            {{ $t('menus.quick_links') }}
          </h3>
          <ul class="space-y-0.5 text-xs">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-2 px-1 rounded"
              >
                <span class="text-primary-500/70">›</span>
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="md:col-span-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 mb-2">
            {{ $t('menus.get_in_touch') }}
          </h3>
          <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <li>
              <a href="tel:+85561809888" class="inline-flex items-center gap-2 py-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Icon class="text-sm text-primary-500 flex-shrink-0" name="heroicons:phone-20-solid" />
                <span>+855 (61) 809 888</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@carta.org.kh" class="inline-flex items-center gap-2 py-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <Icon class="text-sm text-primary-500 flex-shrink-0" name="heroicons:at-symbol-20-solid" />
                <span>info@carta.org.kh</span>
              </a>
            </li>
            <li class="inline-flex items-center gap-2 py-1">
              <Icon class="text-sm text-primary-500 flex-shrink-0" name="heroicons:map-pin-20-solid" />
              <span>Phnom Penh, Cambodia</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Sub-footer -->
    <div class="border-t border-gray-200/80 dark:border-gray-800/80 relative z-10">
      <div class="fixed-width py-2.5 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-gray-500 dark:text-gray-400">
        <p>© {{ new Date().getFullYear() }} CARTA. {{ $t('footer.rights') }}</p>
        <p class="uppercase tracking-wider">{{ $t('footer.caption') }}</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer-phkar-chan-texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("/patterns/phkar-chan-crimson.svg");
  background-size: 34px 34px;
  background-repeat: repeat;
  background-position: center;
  mask-image: linear-gradient(to right, transparent 5%, black 50%, transparent 95%);
  -webkit-mask-image: linear-gradient(to right, transparent 5%, black 50%, transparent 95%);
}

.dark .footer-phkar-chan-texture {
  background-image: url("/patterns/phkar-chan-gold.svg");
  opacity: 0.07;
}
</style>
