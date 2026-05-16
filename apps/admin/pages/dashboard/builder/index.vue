<template>
  <div class="text-sm text-tx-muted">Redirecting…</div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

definePageMeta({
  layout: 'dashboard',
  middleware: ['redirect-builder-home'],
})

useSeoMeta({
  title: 'Builder',
  robots: 'noindex, nofollow',
})
</script>
