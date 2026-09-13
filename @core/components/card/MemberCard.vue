<script lang="ts" setup>
/* PROPS */
const props = defineProps<{
  title: string
  subtitle?: string
  email?: string
  img: string
}>()

/* STATES */
const imgFailed = ref(false)

const initials = computed(() =>
  props.title
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)
</script>

<template>
  <div class="member-card group">
    <!-- 👉🏼Avatar -->
    <div class="member-card__avatar">
      <div v-if="imgFailed || !img" class="member-card__fallback" aria-hidden="true">
        {{ initials }}
      </div>
      <img v-else :src="img" :alt="title" loading="lazy" @error="imgFailed = true" >
    </div>

    <!-- 👉🏼Card Content -->
    <div class="member-card__content">
      <!-- Cyber-Khmer Phkar Chan (ផ្កាច័ន្ទ) Corner Accent -->
      <AppPhkarChan size="w-10 h-10" class="absolute top-0 right-0 pointer-events-none" />

      <!-- Digitalized Prasat Architectural Corner Accent -->
      <svg
        class="absolute -bottom-3 -right-3 w-16 h-16 text-[#C22B27]/[0.035] dark:text-white/[0.03] pointer-events-none transition-all duration-500 group-hover:scale-105 group-hover:text-[#C22B27]/[0.07] dark:group-hover:text-[#C5A059]/[0.07]"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
        aria-hidden="true"
      >
        <path d="M50 8 L50 22 M44 22 L56 22 M50 22 L36 46 L64 46 Z M36 46 L26 70 L74 70 Z M26 70 L16 94 L84 94 Z" />
        <path d="M22 94 H6 M78 94 H94 M32 70 H12 M68 70 H88 M40 46 H18 M60 46 H82" stroke-dasharray="2 3" />
        <circle cx="6" cy="94" r="2.5" fill="currentColor" />
        <circle cx="94" cy="94" r="2.5" fill="currentColor" />
        <circle cx="50" cy="8" r="3" fill="currentColor" />
      </svg>

      <div class="relative z-10">
        <span v-if="subtitle" class="member-card__role" v-text="subtitle" />
        <h3 class="member-card__title" v-text="title" />
        <a
          v-if="email"
          class="member-card__email"
          :href="`mailto:${email}`"
        >
          <Icon name="material-symbols:mail-rounded" class="w-4 h-4" aria-hidden="true" />
          <span v-text="email" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.member-card {
  @apply relative flex flex-col items-center text-center h-full;

  /* 👉🏼Gradient-ring avatar, overlapping the card */
  &__avatar {
    @apply relative z-10 transition-transform duration-300 group-hover:scale-105;

    &::before {
      content: '';
      @apply absolute -inset-1.5 rounded-full bg-gradient-to-br from-primary-500 to-primary-700;
      z-index: -1;
    }

    img {
      @apply w-24 h-24 rounded-full object-cover ring-4 ring-white dark:ring-[#161f30] shadow-lg;
    }
  }

  /* 👉🏼Initials fallback when no image */
  &__fallback {
    @apply w-24 h-24 rounded-full ring-4 ring-white dark:ring-[#161f30] shadow-lg grid place-items-center bg-gradient-to-br from-primary-600 to-primary-800 text-2xl font-bold text-white;
  }

  /* 👉🏼Card body */
  &__content {
    @apply relative overflow-hidden w-full rounded-2xl pt-14 pb-6 px-4 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl;
    background-color: #FCFAF7;
    border: 1px solid rgba(194, 43, 39, 0.12);

    &:hover {
      border-color: rgba(194, 43, 39, 0.32);
    }

    /* Khmer-Tech Geometric Watermark: Kbach Phkar Chan silk grid */
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0.055;
      background-image: url("/patterns/phkar-chan-crimson.svg");
      background-size: 32px 32px;
      background-repeat: repeat;
      background-position: center;
      mask-image: linear-gradient(to bottom, transparent 10%, black 100%);
      -webkit-mask-image: linear-gradient(to bottom, transparent 10%, black 100%);
    }

    > * {
      position: relative;
      z-index: 1;
    }
  }

  &__role {
    @apply inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-primary-700 dark:text-primary-400 bg-primary-50/90 dark:bg-primary-900/40 border border-primary-200/60 dark:border-primary-800/40 mb-3;
  }

  &__title {
    @apply text-lg font-bold tracking-tight text-gray-800 dark:text-gray-100;
  }

  &__email {
    @apply mt-3 inline-flex items-center justify-center gap-1.5 text-xs text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors break-all;
  }
}

:global(.dark) .member-card__content {
  background-color: #161f30;
  border-color: rgba(255, 255, 255, 0.12);

  &::before {
    background-image: url("/patterns/phkar-chan-gold.svg");
    opacity: 0.075;
  }
}
</style>
