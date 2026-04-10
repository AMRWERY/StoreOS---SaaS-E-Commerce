<template>
  <div class="sticky top-0 z-40 bg-bg-base/60 backdrop-blur-md border-b border-border-subtle">
    <header class="flex justify-between items-center py-4 px-6 md:px-8 lg:px-10 gap-4">
      <div class="min-w-0 flex-1">
        <h2 class="text-xl md:text-2xl font-bold text-tx-primary truncate">
          Store Builder
        </h2>
        <p class="text-xs text-tx-muted mt-1 font-medium">
          Builder / {{ pageLabel }}
        </p>
      </div>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <nuxt-link-locale
          to="/"
          class="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-tx-secondary hover:text-brand transition-colors px-3 py-2 rounded-md hover:bg-bg-elevated"
        >
          <Icon name="ph:storefront-bold" class="text-base shrink-0" />
          View storefront
        </nuxt-link-locale>

        <VButton
          variant="none"
          className="lg:hidden p-2 bg-bg-primary border border-border-subtle rounded-md text-tx-secondary hover:text-tx-primary transition-colors"
          @click="$emit('toggle-sidebar')"
        >
          <Icon name="ph:list-bold" class="text-xl" />
        </VButton>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{ 'toggle-sidebar': [] }>()

const route = useRoute()

const pageLabel = computed(() => {
  const s = route.params.slug
  if (s) return String(s)
  if (route.path.includes('/dashboard/builder')) return 'home'
  return 'overview'
})
</script>
