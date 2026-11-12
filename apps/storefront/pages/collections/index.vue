<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <v-breadcrumb :items="crumbs" class="mb-8" />
    <shop-section-heading :title="t('shop.collections.title')" :subtitle="t('shop.collections.subtitle')" />
    <div v-if="catalog.collections.length" class="grid sm:grid-cols-2 gap-5 sm:gap-6">
      <nuxt-link-locale v-for="c in catalog.collections" :key="c.handle" :to="`/collections/${c.handle}`" class="group">
        <product-visual :tone="c.tone" :icon="c.icon" ratio="aspect-[16/10]" icon-size="w-16 h-16" class="rounded-3xl border border-border-subtle">
          <div class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-bg-base/85 to-transparent">
            <h2 class="text-xl font-semibold text-tx-primary">{{ loc(c.title) }}</h2>
            <p class="text-sm text-tx-secondary mt-1">{{ loc(c.description) }}</p>
            <p class="text-xs text-tx-muted mt-2 font-mono">{{ t('shop.collections.productCount', { count: catalog.search({ collection: c.handle }).length }) }}</p>
          </div>
        </product-visual>
      </nuxt-link-locale>
    </div>
    <shop-empty-state v-else :title="t('shop.collections.emptyTitle')" :description="t('shop.collections.emptyDesc')" />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { loc } = useLocalized()
const catalog = useCatalogStore()

const crumbs = computed(() => [
  { label: t('shop.common.home'), to: '/' },
  { label: t('shop.collections.title'), active: true },
])

useSeoMeta({
  title: () => t('shop.seo.collectionsTitle'),
  description: () => t('shop.seo.collectionsDesc'),
})
</script>
