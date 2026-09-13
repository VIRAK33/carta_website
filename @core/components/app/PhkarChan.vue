<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: string
    customClass?: string
    filled?: boolean
  }>(),
  {
    size: 'w-10 h-10',
    customClass: 'text-[#C22B27]/25 dark:text-[#C5A059]/30',
    filled: true,
  },
)
</script>

<template>
  <svg
    :class="[size, customClass]"
    class="pointer-events-none transition-all duration-300 group-hover:text-[#C22B27]/60 dark:group-hover:text-[#C5A059]/60 group-hover:scale-105"
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <!-- North Outer Petal -->
    <path
      d="M196 196C172 150 198 100 250 35C302 100 328 150 304 196"
      stroke="currentColor"
      stroke-width="12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- North Inner Petal -->
    <path
      d="M213 183C196 150 214 115 250 75C286 115 304 150 287 183C272 206 228 206 213 183Z"
      stroke="currentColor"
      stroke-width="12"
      stroke-linejoin="round"
    />
    <!-- North Curls / Barbs -->
    <path
      d="M223 110C217.286 102.76 207.762 100.692 203 102.76"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
    />
    <path
      d="M277 110C282.714 102.76 292.238 100.692 297 102.76"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
    />

    <!-- East Outer Petal -->
    <path
      d="M304 196C350 172 400 198 465 250C400 302 350 328 304 304"
      stroke="currentColor"
      stroke-width="12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- East Inner Petal -->
    <path
      d="M317 213C350 196 385 214 425 250C385 286 350 304 317 287C294 272 294 228 317 213Z"
      stroke="currentColor"
      stroke-width="12"
      stroke-linejoin="round"
    />
    <!-- East Curls / Barbs -->
    <path
      d="M390 223C397.24 217.286 399.308 207.762 397.24 203"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
    />
    <path
      d="M390 277C397.24 282.714 399.308 292.238 397.24 297"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
    />

    <!-- South Outer Petal -->
    <path
      d="M304 304C328 350 302 400 250 465C198 400 172 350 196 304"
      stroke="currentColor"
      stroke-width="12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- South Inner Petal -->
    <path
      d="M287 317C304 350 286 385 250 425C214 385 196 350 213 317C228 294 272 294 287 317Z"
      stroke="currentColor"
      stroke-width="12"
      stroke-linejoin="round"
    />
    <!-- South Curls / Barbs -->
    <path
      d="M277 390C282.714 397.24 292.238 399.308 297 397.24"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
    />
    <path
      d="M223 390C217.286 397.24 207.762 399.308 203 397.24"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
    />

    <!-- West Outer Petal -->
    <path
      d="M196 304C150 328 100 302 35 250C100 198 150 172 196 196"
      stroke="currentColor"
      stroke-width="12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <!-- West Inner Petal -->
    <path
      d="M183 287C150 304 115 286 75 250C115 214 150 196 183 213C206 228 206 272 183 287Z"
      stroke="currentColor"
      stroke-width="12"
      stroke-linejoin="round"
    />
    <!-- West Curls / Barbs -->
    <path
      d="M110 277C102.76 282.714 100.692 292.238 102.76 297"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
    />
    <path
      d="M110 223C102.76 217.286 100.692 207.762 102.76 203"
      stroke="currentColor"
      stroke-width="10"
      stroke-linecap="round"
    />

    <!-- Central Center Ring (Masked with card background when filled) -->
    <path
      d="M250 326C291.974 326 326 291.974 326 250C326 208.026 291.974 174 250 174C208.026 174 174 208.026 174 250C174 291.974 208.026 326 250 326Z"
      :class="filled ? 'fill-[#FCFAF7] dark:fill-gray-900' : 'fill-transparent'"
      stroke="currentColor"
      stroke-width="12"
    />
    <!-- Innermost Concentric Ring -->
    <path
      d="M250 292C273.196 292 292 273.196 292 250C292 226.804 273.196 208 250 208C226.804 208 208 226.804 208 250C208 273.196 226.804 292 250 292Z"
      stroke="currentColor"
      stroke-width="12"
    />
  </svg>
</template>
