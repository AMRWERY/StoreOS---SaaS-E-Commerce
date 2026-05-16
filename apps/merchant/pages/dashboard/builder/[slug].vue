<template>
  <builder-shell />
</template>

<script lang="ts" setup>
const route = useRoute()

const pageSlug = computed(() => String(route.params.slug ?? ''))

definePageMeta({ layout: 'builder' })

useSeoMeta({
  title: () => `Builder — ${pageSlug.value || 'Page'}`,
  robots: 'noindex, nofollow',
})
</script>
