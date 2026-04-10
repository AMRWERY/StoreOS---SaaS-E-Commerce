<template>
  <div>
    <h1>Builder / {{ pageSlug }}</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const pageSlug = computed(() => String(route.params.slug ?? ''))

useSeoMeta({
  title: () => `Builder — ${pageSlug.value || 'Page'}`,
  robots: 'noindex, nofollow',
})
</script>
