<script lang="ts" setup>
import ThemeSwitcher from '~/layouts/components/ThemeSwitcher.vue'
import BtnBurger from '~/layouts/components/BtnBurger.vue'
import DrawerNavbar from '~/layouts/components/DrawerNavbar.vue'

/* STATES */

const $appStore = useAppConfigStore()

/* METHODS */
const onGetNavbarHeight = (): void => {
  const $el = document.querySelector('.navbar') as HTMLElement

  $appStore.navbarHeight =
    $el?.offsetHeight + 'px'
}

onMounted(() => onGetNavbarHeight())
</script>

<template>
  <nav class="navbar">
    <!-- 👉🏼Logo -->
    <RouterLink class="navbar--logo" to="/">
      <img alt="logo" class="rounded-full" src="/logo.png" />
    </RouterLink>

    <!-- 👉🏼Menus -->
    <ul class="navbar--menus">
      <li v-for="({title, value, children}, $i) in $appStore.menus" :key="$i" class="navbar--menus__item">
        <RouterLink v-if="!children" :to="{ name: value }">{{ title }}</RouterLink>

        <!-- 👉🏼Children Menu -->
        <HeadlessPopover v-else v-slot="{ open }" class="relative">
          <HeadlessPopoverButton>
            <a :class="{ 'router-link-active': open }">
              <span>{{ title }}</span>
              <Icon
                :class="[open ? 'rotate-180' : '', 'transition-all duration-300 text-xl text-gray-700']"
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
            <HeadlessPopoverPanel class="absolute left-0 z-10 w-screen max-w-xs -translate-x-1/2 transform px-4 mt-1">
              <ul class="navbar--menus__group">
                <li v-for="({ title, icon }, $j) in children" :key="$j">
                  <a class="relative">
                    <div class="icon">
                      <Icon :name="icon" class="text-xl text-primary-700" />
                    </div>
                    {{ title }}
                  </a>
                </li>
              </ul>
            </HeadlessPopoverPanel>
          </Transition>
        </HeadlessPopover>
      </li>
    </ul>

    <!-- Theme Switcher -->
    <div class="flex items-center gap-4">
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
  @apply w-full flex items-center justify-between px-4 md:px-10 py-4;

  &--logo {
    @apply h-12 aspect-square flex items-center text-xl font-semibold;

    img {
      @apply w-full h-full object-cover;
    }
  }

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
      @apply flex flex-col gap-2 p-2.5 rounded-lg shadow-lg dark:bg-gray-900 ring-1 ring-black/5;

      a {
        @apply flex p-2 gap-2 rounded-lg hover:bg-gray-100 hover:dark:bg-gray-800;

        &:before {
          content: '' !important;
          display: none;
        }

        .icon {
          @apply w-8 h-8 grid place-items-center rounded bg-primary-200/70;
        }
      }
    }
  }
}
</style>
