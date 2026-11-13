/**
 * `/` and `/builder` → `/builder/home` (preserves locale prefix).
 */
export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath()
  const n = to.path.replace(/\/$/, '')

  if (/\/builder$/.test(n) || n === '' || /^\/(en|ar)$/.test(n)) {
    return navigateTo(localePath('/builder/home'), { replace: true })
  }
})
