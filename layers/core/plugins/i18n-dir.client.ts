export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n as { locale: Ref<string>; locales: Ref<{ code: string; dir?: string }[]> }

  const applyDir = (code: string) => {
    const match = i18n.locales.value.find((l) => l.code === code)
    const dir = match?.dir ?? 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', code)
  }

  applyDir(i18n.locale.value)
  watch(i18n.locale, applyDir)
})
