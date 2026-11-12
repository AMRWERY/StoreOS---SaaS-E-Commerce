<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-tx-primary mb-8">{{ t('shop.search.title') }}</h1>

    <form class="relative max-w-xl mb-10" role="search" @submit.prevent="submit">
      <Icon name="lucide:search" class="w-5 h-5 text-tx-muted absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input v-model="input" type="search" :placeholder="t('shop.search.placeholder')" :aria-label="t('shop.search.placeholder')"
        class="w-full bg-bg-primary border border-border-default focus:border-brand rounded-full ps-12 pe-5 py-3.5 text-sm text-tx-primary placeholder:text-tx-muted outline-none transition-colors duration-200">
    </form>

    <template v-if="q">
      <p class="text-sm text-tx-secondary mb-8">{{ t('shop.search.resultsFor', { count: results.length, query: q }) }}</p>
      <div v-if="results.length" class="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
        <shop-product-card v-for="p in results" :key="p.id" :product="p" />
      </div>
      <shop-empty-state v-else icon="lucide:search-x" :title="t('shop.search.noResultsTitle', { query: q })" :description="t('shop.search.noResultsDesc')">
        <v-button to="/collections/all" :label="t('shop.search.browseAll')" />
      </shop-empty-state>
    </template>

    <template v-else>
      <shop-empty-state icon="lucide:search" :title="t('shop.search.startTitle')" :description="t('shop.search.startDesc')" />
      <div class="mt-16">
        <shop-section-heading :title="t('shop.search.popular')" />
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          <shop-product-card v-for="p in catalog.featured" :key="p.id" :product="p" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const catalog = useCatalogStore()

const q = computed(() => (typeof route.query.q === 'string' ? route.query.q.trim() : ''))
const input = ref(q.value)
watch(q, v => { input.value = v })

const results = computed(() => (q.value ? catalog.search({ search: q.value }, locale.value as 'en' | 'ar') : []))
const submit = () => router.push(localePath({ path: '/search', query: input.value.trim() ? { q: input.value.trim() } : {} }))

useSeoMeta({
  title: () => (q.value ? t('shop.search.seoTitle', { query: q.value }) : t('shop.search.title')),
  description: () => t('shop.search.seoDesc'),
  robots: 'noindex, follow',
})
</script>
