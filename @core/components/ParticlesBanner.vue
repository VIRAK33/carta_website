<script lang="ts">
let slimLoaded = false
</script>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { Container } from '@tsparticles/engine'

const isLoaded = ref(false)
let container: Container | undefined

onMounted(async () => {
  const { tsParticles } = await import('@tsparticles/engine')

  if (!slimLoaded) {
    const { loadSlim } = await import('@tsparticles/slim')
    try {
      await loadSlim(tsParticles)
    } catch { /* already registered */ }
    slimLoaded = true
  }

  container = await tsParticles.load({
    id: 'banner-particles',
    options: {
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        color: { value: ['#ffffff', '#a8c8f0', '#c0d8ff'] },
        links: {
          color: '#a8c8f0',
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'out' },
          random: true,
          speed: 0.8,
          straight: false,
        },
        number: {
          density: { enable: true, width: 1920, height: 220 },
          value: 60,
        },
        opacity: { value: { min: 0.3, max: 0.7 } },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 2.5 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 200, links: { opacity: 0.9 } },
          push: { quantity: 3 },
        },
      },
      detectRetina: true,
    },
  })

  requestAnimationFrame(() => { isLoaded.value = true })
})

onBeforeUnmount(() => {
  container?.destroy()
  container = undefined
})
</script>

<template>
  <div style="position: relative; width: 100%; height: 140px; overflow: hidden; background: linear-gradient(135deg, #5b4b9a 0%, #1e2d4a 50%, #1a4a5a 100%);">
    <div
      id="banner-particles"
      style="position: absolute; inset: 0;"
      :style="{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }"
    />
    <div
      style="position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at center, transparent 30%, rgba(30,45,74,0.5) 100%);"
    />
    <!-- pointer-events: none so hover/click reaches the canvas behind -->
    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none;">
      <slot />
    </div>
  </div>
</template>
