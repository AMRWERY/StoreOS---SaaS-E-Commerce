/**
 * Scroll an inner scroll container (e.g. the dashboard layout's <main>) back to
 * the top whenever the user navigates to a different page.
 *
 * Nuxt's router `scrollBehavior` only moves the window, which is not what
 * scrolls in layouts that use `h-screen overflow-y-auto`. `page:finish` fires
 * once the new page has replaced the old one, so the old page never visibly
 * jumps while it is still fading out.
 */
export function useScrollTopOnNavigate(target: Ref<HTMLElement | null>) {
  const route = useRoute();
  const nuxtApp = useNuxtApp();
  let lastPath = route.path;

  const stop = nuxtApp.hook("page:finish", () => {
    if (route.path === lastPath) return; // query-only change: keep position
    lastPath = route.path;
    if (route.hash) return; // in-page anchor: let the browser handle it
    target.value?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  });

  onBeforeUnmount(stop);
}
