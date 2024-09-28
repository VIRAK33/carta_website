<script lang="ts" setup>
/* IMPORTS */
import gsap from 'gsap'
import { round } from 'lodash-es'
import ThemeSwitcher from '~/layouts/components/ThemeSwitcher.vue'
import BtnBurger from '~/layouts/components/BtnBurger.vue'
import DrawerNavbar from '~/layouts/components/DrawerNavbar.vue'
import LanguageSwitcher from '~/layouts/components/LanguageSwitcher.vue'

/* STATES */
const $appStore = useAppConfigStore()
const $navbarRef = ref<HTMLElement | null>(null)
let lastScrollTop = 0

/* METHODS */
const onGetNavbarHeight = (): void => {
  nextTick(() => {
    const { height } = useElementBounding($navbarRef)
    $appStore.onSetNavbarHeight(round(height.value))
  })
}

const onSetNavbarAnimate = (): void => {
  // 👉🏼GSAP animation for navbar (appears from top to bottom on load)
  gsap.from($navbarRef.value, {
    y: -100, // Start 100px above the viewport
    opacity: 0, // Start fully transparent
    duration: 1, // 1 second duration
    ease: 'power3.out', // Smooth easing for the effect
  })
}

const onHandleScroll = (): void => {
  /* 👉🏼Set Navbar Sticky When Scroll To Top */
  const { scrollY } = window

  if (scrollY > lastScrollTop && scrollY > 100) {
    // 👉🏼Scroll down - hide the navbar
    gsap.to($navbarRef.value, {
      y: -$appStore.navbarHeight,
      duration: 0.2,
      ease: 'power2.out',
    })
  } else {
    // 👉🏼Scroll up - show the navbar
    gsap.to($navbarRef.value, { y: 0, duration: 0.2, ease: 'power2.out' })
  }

  lastScrollTop = scrollY <= 0 ? 0 : scrollY
}

onMounted(() => {
  onGetNavbarHeight()
  onSetNavbarAnimate()
  window.addEventListener('scroll', onHandleScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', onHandleScroll))
</script>

<template>
  <nav ref="$navbarRef" class="navbar">
    <!-- 👉🏼Logo -->
    <AppLogo />

    <!-- 👉🏼Menus -->
    <ul class="navbar--menus">
      <li
        v-for="({ title, route, children }, $i) in $appStore.menus"
        :key="$i"
        class="navbar--menus__item"
      >
        <RouterLink v-if="!children" :to="{ name: route }">
          {{ $t(title) }}
        </RouterLink>

        <!-- 👉🏼Children Menu -->
        <HeadlessPopover v-else v-slot="{ open }" class="relative">
          <HeadlessPopoverButton>
            <a :class="{ 'router-link-active': open }">
              <span>{{ $t(title) }}</span>
              <Icon
                :class="[
                  open ? 'rotate-180' : '',
                  'transition-all duration-300 text-xl text-gray-700',
                ]"
                name="material-symbols:keyboard-arrow-down-rounded"
              />
            </a>
          </HeadlessPopoverButton>
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <HeadlessPopoverPanel
              class="absolute left-0 z-10 w-screen max-w-xs -translate-x-1/2 transform px-4 mt-1"
            >
              <ul class="navbar--menus__group">
                <li v-for="({ title, icon, route }, $j) in children" :key="$j">
                  <RouterLink :to="{ name: route }" class="relative">
                    <div class="icon">
                      <Icon :name="icon" class="text-xl text-primary-700" />
                    </div>
                    {{ $t(title) }}
                  </RouterLink>
                </li>
              </ul>
            </HeadlessPopoverPanel>
          </Transition>
        </HeadlessPopover>
      </li>
    </ul>

    <!-- Theme Switcher -->
    <div class="flex items-center gap-4">
      <LanguageSwitcher />
      <ThemeSwitcher />
      <BtnBurger class="md:hidden" />
      <Teleport to="#teleports">
        <DrawerNavbar />
      </Teleport>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/@core/scss/_mixins.scss';

.navbar {
  @apply fixed top-0 left-0 right-0 w-full flex items-center justify-between
  px-4 md:px-10 py-4 transition-transform duration-500 bg-white dark:bg-gray-950;
  z-index: 9999;
  transition: all 0.2s ease;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;

  &--menus {
    @apply hidden md:flex items-center gap-9;

    &__item {
      @apply relative;

      a {
        @apply flex items-center lg:text-lg font-semibold tracking-wider cursor-pointer;

        &:before {
          content: '';
          @apply absolute bottom-0 w-0 h-[1.5px] rounded-md bg-primary-500 transition-all duration-300;
        }

        &:hover,
        &.router-link-active {
          @apply text-primary-500;

          &:before {
            @apply w-full;
          }
        }
      }
    }

    &__group {
      @apply flex flex-col gap-2 p-2.5 rounded-lg shadow-md bg-white dark:shadow-gray-500 dark:bg-gray-950 ring-1 ring-black/5;

      a {
        @apply flex p-2 gap-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800 text-base;

        &:before {
          content: '' !important;
          display: none;
        }

        &.router-link-active {
          @apply bg-primary-50;
        }

        .icon {
          @apply w-8 h-8 grid place-items-center rounded-full bg-primary-200/70;
        }
      }
    }
  }
}
</style>
