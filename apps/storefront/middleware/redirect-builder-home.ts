/**
 * `/dashboard/builder` → `/dashboard/builder/home` (preserves locale prefix).
 * Script-only `navigateTo` in page setup is unreliable on some client navigations.
 */
export default defineNuxtRouteMiddleware((to) => {
  const n = to.path.replace(/\/$/, '')
  if (/\/dashboard\/builder$/.test(n)) {
    return navigateTo(`${n}/home`, { replace: true })
  }
})
