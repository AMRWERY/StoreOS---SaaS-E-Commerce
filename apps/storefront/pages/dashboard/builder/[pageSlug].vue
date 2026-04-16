<template>
  <builder-shell />
</template>

<script lang="ts" setup>
/**
 * Main builder route: `/dashboard/builder/:pageSlug` (e.g. `home`).
 * Nuxt does not allow `-` inside dynamic param names; use camelCase `pageSlug` in the filename.
 */
definePageMeta({ layout: 'builder' })

const route = useRoute()
const pageSlug = computed(() => String(route.params.pageSlug ?? ''))

useSeoMeta({
  title: () => `Builder — ${pageSlug.value || 'Page'}`,
  robots: 'noindex, nofollow',
})
</script>
