import type { RouterConfig } from '@nuxt/schema'

/**
 * Explicit scroll behavior for client-side navigations.
 *
 * The default layout uses a plain `<RouterView>` + `<KeepAlive>` (not
 * `<NuxtPage />`), so Nuxt's built-in scroll-to-top is not applied and pages
 * keep their scroll position when navigating (e.g. clicking a related article
 * at the bottom of a news detail page leaves you near the bottom).
 *
 * This configures vue-router directly, so it works with `<RouterView>`:
 * - scroll to the top when navigating to a new page
 * - restore the saved scroll position when using back/forward
 * - scroll to the target element for hash links (offset below the fixed navbar)
 */
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
}
