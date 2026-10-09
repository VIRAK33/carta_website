<script lang="ts" setup>
/* Logo component */
</script>

<template>
  <RouterLink class="app-logo" to="/" aria-label="CARTA Home">
    <!-- Logo Image -->
    <img
      alt="CARTA - Cambodia AI Robotics and Technology Transfer Association"
      src="/logo.webp"
      width="56"
      height="56"
      fetchpriority="high"
    />
    <div class="text">
      <span class="full-name">{{ $t('app_name') }}</span>
      <span class="short-name">CARTA</span>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.app-logo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;

  img {
    width: auto;
    height: 3.5rem;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
  }

  .text {
    max-width: 24rem;
    font-size: 1rem;
    font-weight: 600;

    .full-name {
      display: none;
    }

    .short-name {
      display: inline;
      white-space: nowrap;
    }
  }
}

@media (min-width: 768px) {
  .app-logo .text {
    .full-name {
      display: inline;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .short-name {
      display: none;
    }
  }
}
</style>
