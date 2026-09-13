<script lang="ts" setup>
/* IMPORTS */
import { round } from 'lodash-es'
import BtnBurger from '~/layouts/components/BtnBurger.vue'
import DrawerNavbar from '~/layouts/components/DrawerNavbar.vue'
import LanguageSwitcher from '~/layouts/components/LanguageSwitcher.vue'

/* STATES */
const $appStore = useAppConfigStore()
const $navbarRef = ref<HTMLElement | null>(null)

/* METHODS */
const onGetNavbarHeight = (): void => {
  nextTick(() => {
    const { height } = useElementBounding($navbarRef)
    $appStore.onSetNavbarHeight(round(height.value))
  })
}

onMounted(() => {
  onGetNavbarHeight()
})
</script>

<template>
  <nav ref="$navbarRef" class="navbar">
    <!-- 👉🏼Logo -->
    <AppLogo
      v-motion
      :delay="200"
      :duration="1200"
      :enter="{ opacity: 1, x: 0, scale: 1 }"
      :initial="{ opacity: 0, x: -100 }"
      :variants="{ custom: { scale: 2 } }"
    />

    <!-- 👉🏼Menus -->
    <ul
      v-motion
      :delay="200"
      :duration="1200"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :initial="{ opacity: 0, y: -100 }"
      :variants="{ custom: { scale: 2 } }"
      class="navbar--menus"
    >
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
                  'transition-all duration-300 text-xl text-gray-700 dark:text-gray-200',
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
    <div
      v-motion
      :delay="200"
      :duration="1200"
      :enter="{ opacity: 1, x: 0, scale: 1 }"
      :initial="{ opacity: 0, x: 100 }"
      :variants="{ custom: { scale: 2 } }"
      class="navbar--controls"
    >
      <!-- Email Button -->
      <a
        href="https://mail.carta.org.kh/webmail"
        target="_blank"
        rel="noopener noreferrer"
        class="navbar--controls__btn"
        title="Open Webmail"
      >
        <img src="/assets/icons/email.png" alt="email icon" />
      </a>
      <LanguageSwitcher />
      <BtnBurger class="md:hidden" />
      <ClientOnly>
        <Teleport to="body">
          <DrawerNavbar v-if="$appStore.activeDrawer" />
        </Teleport>
      </ClientOnly>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/@core/scss/_mixins.scss';

.navbar {
  @apply fixed top-0 left-0 right-0 w-full flex items-center justify-between
  px-4 md:px-10 py-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-black/5 dark:border-white/10;
  z-index: 10;
  transform: translateZ(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px -12px rgba(185, 28, 28, 0.18);

  &--menus {
    @apply hidden md:flex items-center gap-9;

    &__item {
      @apply relative;

      a {
        @apply flex items-center lg:text-lg font-semibold tracking-wider cursor-pointer text-gray-700 dark:text-gray-200;

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

  /* 👉🏼Refined right-side controls */
  &--controls {
    @apply flex items-center gap-1.5;

    &__btn {
      @apply h-9 aspect-square grid place-items-center rounded-xl ring-1 ring-black/5 dark:ring-white/10
      hover:bg-primary-50 hover:ring-primary-200 dark:hover:bg-gray-800 dark:hover:ring-primary-700
      transition-all duration-200;

      img {
        @apply w-6 h-6;
      }
    }
  }
}
</style>
