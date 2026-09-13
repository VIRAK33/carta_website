<script lang="ts" setup>
/* IMPORTS */
import { useAppConfigStore } from '~/stores/use-app-config.store'

/* STATES */
const $appConfigStore = useAppConfigStore()
const $route = useRoute()

// Immediately close drawer on route navigation
watch(
  () => $route.fullPath,
  () => {
    $appConfigStore.onUpdateActiveDrawer(false)
  },
)

function onRouteChange(): void {
  $appConfigStore.onUpdateActiveDrawer(false)
}

onMounted(() => {
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
  $appConfigStore.onUpdateActiveDrawer(false)
})

function onWindowResize(): void {
  if (window.innerWidth >= 768 && $appConfigStore.activeDrawer) {
    $appConfigStore.onUpdateActiveDrawer(false)
  }
}
</script>

<template>
  <div v-if="$appConfigStore.activeDrawer" class="md:hidden">
    <div
      class="drawer-navbar--overlay"
      @click="$appConfigStore.onUpdateActiveDrawer(false)"
    />
    <Transition name="slide-up">
      <div
        v-if="$appConfigStore.activeDrawer"
        :style="{ '--navbar-height': $appConfigStore.navbarHeight }"
        class="drawer-navbar--content"
      >
        <ul class="drawer-navbar--content--menus">
          <li
            v-for="({ title, value, children }, $key) in $appConfigStore.menus"
            :key="$key"
            @click="onRouteChange"
          >
            <RouterLink
              v-if="!children"
              :to="{ name: value }"
            >
              {{ $t(title) }}
            </RouterLink>

          <HeadlessDisclosure v-else v-slot="{ open }">
            <HeadlessDisclosureButton class="w-full">
              <a class="w-full flex items-center justify-between">
                {{ $t(title) }}
                <Icon
                  :class="[
                    open ? 'rotate-90' : '',
                    'transition-all duration-300 text-2xl text-gray-700 dark:text-gray-200',
                  ]"
                  name="ic:round-keyboard-arrow-right"
                />
              </a>
            </HeadlessDisclosureButton>
            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-out"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <HeadlessDisclosurePanel>
                <ul class="w-full flex flex-col gap-4 pl-4 py-4">
                  <li
                    v-for="({ title, icon, route }, $index) in children"
                    :key="$index"
                    @click="onRouteChange"
                  >
                    <RouterLink
                      :to="{ name: route }"
                      class="flex items-center gap-4 text-lg"
                    >
                      <div
                        class="w-7 h-7 grid place-items-center rounded bg-primary-200/70"
                      >
                        <Icon :name="icon" class="text-primary-700" />
                      </div>
                      {{ $t(title) }}
                    </RouterLink>
                  </li>
                </ul>
              </HeadlessDisclosurePanel>
            </Transition>
          </HeadlessDisclosure>
        </li>
      </ul>

      <!-- Mobile Actions Footer -->
      <div class="drawer-navbar--content--footer">
        <a
          href="https://mail.carta.org.kh/webmail"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-email-mobile"
          title="Open Webmail"
        >
          <img src="/assets/icons/email.png" alt="email icon" />
        </a>
      </div>
    </div>
  </Transition>
  </div>
</template>

<style lang="scss" scoped>
.btn-email-mobile {
  @apply p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200;

  img {
    @apply w-7 h-7;
  }
}

.drawer-navbar--overlay {
  @apply fixed w-full h-full top-0 bg-gray-700/50 backdrop-blur-sm z-[99];
}

.drawer-navbar--content {
  @apply fixed bottom-0 w-full h-[70vh] bg-white dark:bg-gray-900 z-[999] text-white flex flex-col rounded-t-2xl shadow-2xl;
  //height: calc(100vh - var(--navbar-height));

  &--menus {
    @apply flex flex-col gap-5 w-full p-7 text-xl flex-1 overflow-y-auto;

    li {
      @apply relative text-gray-700 dark:text-white font-semibold;

      a:hover {
        @apply text-primary-500;
      }
    }
  }

  &--footer {
    @apply border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-center;

    .footer-item {
      @apply p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200;

      img {
        @apply h-6 w-6;
      }
    }
  }
}

a.router-link-active {
  @apply relative text-primary-500;

  &:before {
    content: '';
    @apply absolute bottom-0 w-full h-px bg-primary-500;
  }
}

/* Transition classes for the slide-up effect */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0%);
}
</style>
