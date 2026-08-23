<script setup></script>

<template>
  <div
    class="absolute inset-0 overflow-hidden grid place-items-center text-center"
  >
    <div class="w-full">
      <div class="text-gold -mt-32">
        <div v-animate-number="{ value: 404, duration: 1 }" class="bg" />
        <div v-animate-number="{ value: 404, duration: 1 }" class="fg" />
      </div>
      <div
        v-if="false"
        v-animate-number="{ value: 404, duration: 1 }"
        class="headline"
      />
      <h4 class="title">Page Not Found!</h4>
      <span class="subtitle block">
        The page you're searching for isn't available.
      </span>

      <RouterLink class="btn mt-7" to="/"> Go to home</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-gold {
  --active-color: #dc2626;
  --light-shadow: #77571d;
  --dark-shadow: #3e2904;

  display: grid;
  place-content: center;

  & > div {
    background-clip: text;
    -webkit-background-clip: text;
    color: #363833;
    font-weight: 900;
    font-size: clamp(3em, 18vw, 15rem);
    grid-area: overlap;
    letter-spacing: 1px;
    -webkit-text-stroke: 4px transparent;
  }

  .bg {
    background-image: repeating-linear-gradient(
      105deg,
      var(--active-color) 0%,
      var(--dark-shadow) 5%,
      var(--active-color) 12%
    );
    color: transparent;
    filter: drop-shadow(2px 7px 7px black);
    transform: scaleY(1.05);
    transform-origin: top;
  }

  .fg {
    background-image: repeating-linear-gradient(
      5deg,
      var(--active-color) 0%,
      var(--light-shadow) 23%,
      var(--active-color) 31%
    );
    transform: scale(1);
    @apply text-white dark:text-black;
  }
}

.headline {
  --color-background: #000119;
  --stroke-width: calc(1em / 16);
  --letter-spacing: calc(1em / 8);
  font-size: clamp(1rem, -0.875rem + 8.333vw, 10rem);
  font-weight: bold;
  padding: 10px;

  background-clip: text;
  background-image: linear-gradient(
    to right,
    #09f1b8,
    #00a2ff,
    #ff00d2,
    #fed90f
  );
  color: var(--color-background);
  letter-spacing: var(--letter-spacing);
  -webkit-text-stroke-color: transparent;
  -webkit-text-stroke-width: var(--stroke-width);
}

.title {
  font-size: clamp(1rem, -0.875rem + 8.333vw, 2rem);
  @apply font-semibold text-primary-700 dark:text-primary-400;
}

.btn {
  @apply inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm md:text-base transition-colors duration-200;
}
</style>
