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
const i18nHead = useLocaleHead({ addSeoAttributes: true })

const RTL_LOCALES = ['ar', 'he', 'fa', 'ur']

useSeoPage(computed(() => ({
  htmlAttrs: {
    ...(i18nHead.value?.htmlAttrs ?? {}),
    dir: RTL_LOCALES.includes(locale.value) ? 'rtl' : 'ltr',
    lang: locale.value,
  },
  link: [...(i18nHead.value?.link ?? [])],
  meta: [...(i18nHead.value?.meta ?? [])],
})))
</script>
