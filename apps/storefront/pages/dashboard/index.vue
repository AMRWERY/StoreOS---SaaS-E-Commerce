<template>
  <div class="max-w-2xl space-y-4">
    <h1 class="text-2xl font-bold text-tx-primary">Dashboard</h1>
    <p class="text-sm text-tx-secondary leading-relaxed">
      This is the storefront dashboard shell. Open the visual editor to customize your shop pages.
    </p>
    <nuxt-link-locale
      to="/dashboard/builder/home"
      class="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
    >
      <Icon name="ph:paint-brush-fill" class="text-lg" />
      Open Store Builder
    </nuxt-link-locale>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })

useSeoMeta({
  title: 'Dashboard',
  robots: 'noindex, nofollow',
})
</script>
