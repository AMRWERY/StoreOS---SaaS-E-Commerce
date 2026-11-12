<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <template v-if="page">
      <v-breadcrumb :items="crumbs" class="mb-8" />
      <header class="mb-12 space-y-4">
        <h1 class="text-4xl font-semibold tracking-tight text-tx-primary">{{ loc(page.title) }}</h1>
        <p class="text-lg text-tx-secondary">{{ loc(page.intro) }}</p>
      </header>
      <div class="space-y-10">
        <section v-for="(s, i) in page.sections" :key="i" class="space-y-3">
          <h2 class="text-xl font-semibold text-tx-primary">{{ loc(s.heading) }}</h2>
          <p class="text-sm text-tx-secondary leading-relaxed">{{ loc(s.body) }}</p>
        </section>
      </div>
      <p class="mt-14 text-xs text-tx-muted">{{ t('shop.pages.contactNote') }}</p>
    </template>
    <shop-empty-state v-else icon="lucide:file-question" :title="t('shop.pages.notFoundTitle')" :description="t('shop.pages.notFoundDesc')">
      <v-button to="/" :label="t('shop.common.home')" />
    </shop-empty-state>
  </div>
</template>

<script lang="ts" setup>
import { CONTENT_PAGES } from '@/data/shop-data'

const { t } = useI18n()
const route = useRoute()
const { loc } = useLocalized()

const page = computed(() => CONTENT_PAGES.find(p => p.slug === String(route.params.slug)))
const crumbs = computed(() => [
  { label: t('shop.common.home'), to: '/' },
  { label: loc(page.value?.title), active: true },
])

useSeoMeta({
  title: () => (page.value ? loc(page.value.title) : t('shop.pages.notFoundTitle')),
  description: () => (page.value ? loc(page.value.intro) : t('shop.pages.notFoundDesc')),
})
</script>
