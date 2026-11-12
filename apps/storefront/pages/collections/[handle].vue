<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <template v-if="collection">
      <v-breadcrumb :items="crumbs" class="mb-8" />
      <header class="mb-10 space-y-2">
        <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-tx-primary">{{ loc(collection.title) }}</h1>
        <p class="text-sm text-tx-secondary max-w-xl">{{ loc(collection.description) }}</p>
      </header>

      <div class="grid lg:grid-cols-[240px_1fr] gap-10">
        <!-- Filters (desktop) -->
        <aside class="hidden lg:block">
          <collection-filters v-model="filters" :facets="facets" :bounds="bounds" @reset="resetFilters" />
        </aside>

        <div>
          <div class="flex items-center justify-between gap-3 mb-8">
            <div class="flex items-center gap-3">
              <button type="button" class="lg:hidden inline-flex items-center gap-2 rounded-full border border-border-default px-4 py-2 text-sm text-tx-primary" @click="filtersOpen = true">
                <Icon name="lucide:sliders-horizontal" class="w-4 h-4" />{{ t('shop.filters.title') }}
              </button>
              <p class="text-sm text-tx-secondary"><span class="font-mono text-tx-primary">{{ results.length }}</span> {{ t('shop.collections.results') }}</p>
            </div>
            <div class="w-48">
              <shop-select v-model="sort" :options="sortOptions" :aria-label="t('shop.sort.label')" />
            </div>
          </div>

          <div v-if="paged.length" class="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
            <shop-product-card v-for="p in paged" :key="p.id" :product="p" />
          </div>
          <shop-empty-state v-else icon="lucide:search-x" :title="t('shop.collections.noResultsTitle')" :description="t('shop.collections.noResultsDesc')">
            <v-button variant="secondary" :label="t('shop.filters.clear')" @click="resetFilters" />
          </shop-empty-state>

          <div v-if="results.length > PER_PAGE" class="mt-12">
            <v-pagination v-model:current-page="page" :total="results.length" :per-page="PER_PAGE" />
          </div>
        </div>
      </div>

      <!-- Filters (mobile) -->
      <v-side-panel v-model="filtersOpen" :title="t('shop.filters.title')" width="sm">
        <div class="p-5"><collection-filters v-model="filters" :facets="facets" :bounds="bounds" @reset="resetFilters" /></div>
        <template #footer><v-button class="w-full" :label="t('shop.filters.show', { count: results.length })" @click="filtersOpen = false" /></template>
      </v-side-panel>
    </template>

    <shop-empty-state v-else icon="lucide:folder-search" :title="t('shop.collections.notFoundTitle')" :description="t('shop.collections.notFoundDesc')">
      <v-button to="/collections" :label="t('shop.collections.title')" />
    </shop-empty-state>
  </div>
</template>

<script lang="ts" setup>
import type { FilterState } from '@/types/shop'
import type { CatalogSort } from '@/stores/catalog'

const PER_PAGE = 6
const { t, locale } = useI18n()
const route = useRoute()
const { loc } = useLocalized()
const catalog = useCatalogStore()

const collection = computed(() => catalog.getCollection(String(route.params.handle)))
const category = computed(() => (typeof route.query.category === 'string' ? route.query.category : undefined))

const emptyFilters = (): FilterState => ({ minPrice: '', maxPrice: '', inStockOnly: false, options: {} })
const filters = ref<FilterState>(emptyFilters())
const sort = ref<CatalogSort>('featured')
const page = ref(1)
const filtersOpen = ref(false)

const resetFilters = () => { filters.value = emptyFilters() }

const base = computed(() => catalog.search({ collection: collection.value?.handle, category: category.value }))
const facets = computed(() => catalog.facets(base.value))
const bounds = computed(() => catalog.priceBounds())

const results = computed(() => catalog.search({
  collection: collection.value?.handle,
  category: category.value,
  minPrice: filters.value.minPrice ? Number(filters.value.minPrice) : undefined,
  maxPrice: filters.value.maxPrice ? Number(filters.value.maxPrice) : undefined,
  inStockOnly: filters.value.inStockOnly,
  options: filters.value.options,
  sort: sort.value,
}, locale.value as 'en' | 'ar'))

const paged = computed(() => results.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE))
watch([filters, sort, () => route.fullPath], () => { page.value = 1 }, { deep: true })

const sortOptions = computed(() => (['featured', 'price-asc', 'price-desc', 'newest', 'rating'] as const).map(v => ({ value: v, label: t(`shop.sort.${v}`) })))

const crumbs = computed(() => [
  { label: t('shop.common.home'), to: '/' },
  { label: t('shop.collections.title'), to: '/collections' },
  { label: loc(collection.value?.title), active: true },
])

useSeoMeta({
  title: () => (collection.value ? loc(collection.value.title) : t('shop.collections.notFoundTitle')),
  description: () => (collection.value ? loc(collection.value.description) : t('shop.seo.collectionsDesc')),
  ogTitle: () => (collection.value ? loc(collection.value.title) : t('shop.collections.title')),
})
</script>
