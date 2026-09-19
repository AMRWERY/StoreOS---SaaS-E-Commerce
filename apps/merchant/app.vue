<template>
  <div>
    <div class="min-h-screen">
      <NuxtRouteAnnouncer />

      <navbar v-if="!$route.path.includes('/dashboard')" />
      
      <nuxt-layout>
        <main>
          <nuxt-page />
        </main>

        <Footer v-if="!$route.path.includes('/dashboard')" />
      </nuxt-layout>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n()
const route = useRoute()
const i18nHead = useLocaleHead({ addSeoAttributes: true })

const RTL_LOCALES = ['ar', 'he', 'fa', 'ur']

const isPublicRoute = computed(() =>
  !route.path.includes('/dashboard') && !route.path.includes('/onboarding')
)

useSeoPage(computed(() => ({
  htmlAttrs: {
    ...(i18nHead.value?.htmlAttrs ?? {}),
    dir: RTL_LOCALES.includes(locale.value) ? 'rtl' : 'ltr',
    lang: locale.value,
  },
  link: [...(i18nHead.value?.link ?? [])],
  meta: [
    ...(i18nHead.value?.meta ?? []),
    { name: 'robots', content: isPublicRoute.value ? 'index, follow' : 'noindex, nofollow' },
  ],
})))
</script>
