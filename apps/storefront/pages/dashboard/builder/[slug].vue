<template>
  <div class="rounded-xl border border-border-subtle bg-bg-elevated/30 p-8 min-h-[320px]">
    <p class="text-[10px] font-bold text-tx-muted tracking-widest uppercase mb-2">
      Canvas
    </p>
    <h1 class="text-2xl font-bold text-tx-primary mb-2">
      Builder / {{ pageSlug }}
    </h1>
    <p class="text-sm text-tx-secondary max-w-lg">
      The three-panel builder (pages, preview, settings) will mount here. Use the left sidebar to switch pages or return to the storefront.
    </p>
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
