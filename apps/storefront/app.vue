<template>
  <div>
    <NuxtRouteAnnouncer />
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n()
const route = useRoute()
const i18nHead = useLocaleHead({ addSeoAttributes: true })

const RTL_LOCALES = ['ar', 'he', 'fa', 'ur']
const PRIVATE_SEGMENTS = ['/cart', '/checkout', '/account', '/auth', '/order-status']

// Strip the locale prefix before matching, as every route is /en/... or /ar/...
const isPrivateRoute = computed(() => {
  const path = route.path.replace(/^\/(en|ar)(?=\/|$)/, '')
  return PRIVATE_SEGMENTS.some(s => path === s || path.startsWith(`${s}/`))
})

useSeoPage(computed(() => ({
  htmlAttrs: {
    ...(i18nHead.value?.htmlAttrs ?? {}),
    dir: RTL_LOCALES.includes(locale.value) ? 'rtl' : 'ltr',
    lang: locale.value,
  },
  link: [...(i18nHead.value?.link ?? [])],
  meta: [
    ...(i18nHead.value?.meta ?? []),
    { name: 'robots', content: isPrivateRoute.value ? 'noindex, nofollow' : 'index, follow' },
  ],
})))
</script>
