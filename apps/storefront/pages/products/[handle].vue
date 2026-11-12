<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <template v-if="product">
      <v-breadcrumb :items="crumbs" class="mb-8" />

      <div class="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <product-gallery :product="product" />

        <div class="space-y-7 lg:py-4">
          <div class="space-y-3">
            <p class="text-xs font-semibold tracking-widest uppercase text-brand">{{ loc(catalog.getCategory(product.category)?.title) }}</p>
            <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-tx-primary">{{ loc(product.title) }}</h1>
            <div class="flex items-center gap-3 text-sm text-tx-secondary">
              <span class="flex items-center gap-1"><Icon name="lucide:star" class="w-4 h-4 text-warning" /><span class="font-mono text-tx-primary">{{ product.rating.toFixed(1) }}</span></span>
              <span class="font-mono text-xs">({{ product.reviews }})</span>
              <span>{{ t('shop.product.reviews') }}</span>
            </div>
          </div>

          <div class="flex items-center gap-3 flex-wrap">
            <shop-price :amount="variant?.price ?? product.price" :compare-at="product.compareAt" size="lg" />
            <span v-if="product.cod" class="inline-flex items-center gap-1.5 rounded-full bg-success-dim text-success px-3 py-1 text-[10px] font-semibold">
              <Icon name="lucide:banknote" class="w-3.5 h-3.5" />{{ t('shop.product.codAvailable') }}
            </span>
          </div>

          <p class="text-sm text-tx-secondary leading-relaxed">{{ loc(product.description) }}</p>

          <!-- Option pickers -->
          <div v-for="o in product.options" :key="o.key" class="space-y-3">
            <p class="text-sm font-medium text-tx-primary">
              {{ loc(o.label) }}<span class="text-tx-muted font-normal">: {{ loc(o.values.find(v => v.value === selected[o.key])?.label) }}</span>
            </p>
            <div class="flex flex-wrap gap-2" role="radiogroup" :aria-label="loc(o.label)">
              <button v-for="v in o.values" :key="v.value" type="button" role="radio" :aria-checked="selected[o.key] === v.value" :disabled="!optionAvailable(o.key, v.value)"
                :class="['rounded-full border px-4 py-2 text-sm transition-colors duration-200 disabled:opacity-40 disabled:line-through',
                  selected[o.key] === v.value ? 'border-brand bg-brand-dim text-tx-primary' : 'border-border-default text-tx-secondary hover:border-tx-muted']"
                @click="selected[o.key] = v.value">
                {{ loc(v.label) }}
              </button>
            </div>
          </div>

          <!-- Stock -->
          <p v-if="variant" :class="['text-xs inline-flex items-center gap-2', variant.stock === 0 ? 'text-danger' : variant.stock <= 3 ? 'text-warning' : 'text-success']">
            <span class="w-1.5 h-1.5 rounded-full bg-current" />
            <template v-if="variant.stock === 0">{{ t('shop.product.outOfStock') }}</template>
            <template v-else-if="variant.stock <= 3">{{ t('shop.product.lowStock', { count: variant.stock }) }}</template>
            <template v-else>{{ t('shop.product.inStock') }}</template>
            <span class="font-mono text-tx-muted">{{ variant.sku }}</span>
          </p>
          <p v-else class="text-xs text-danger">{{ t('shop.product.unavailable') }}</p>

          <!-- Quantity + add to cart -->
          <div class="flex items-center gap-3">
            <qty-stepper v-model="qty" :max="Math.max(1, variant?.stock ?? 1)" />
            <v-button class="flex-1 rounded-full py-3" icon="lucide:shopping-bag" icon-position="left" :disabled="!variant || variant.stock === 0" :label="t('shop.product.addToCart')" @click="addToCart" />
          </div>

          <ul class="space-y-3 rounded-2xl bg-bg-primary border border-border-subtle p-5 text-sm">
            <li class="flex items-center gap-3 text-tx-secondary"><Icon name="lucide:truck" class="w-4 h-4 text-brand" />{{ t('shop.product.deliveryEstimate', { from: 2, to: 4 }) }}</li>
            <li class="flex items-center gap-3 text-tx-secondary"><Icon name="lucide:rotate-ccw" class="w-4 h-4 text-brand" />{{ t('shop.product.freeReturns') }}</li>
          </ul>
        </div>
      </div>

      <!-- Tabs -->
      <section class="mt-16 max-w-3xl">
        <v-tabs v-model="tab" :tabs="tabs" />
        <div class="pt-6 text-sm text-tx-secondary leading-relaxed space-y-3">
          <p v-if="tab === 'description'">{{ loc(product.description) }}</p>
          <ul v-else-if="tab === 'shipping'" class="space-y-2 list-disc ps-5">
            <li>{{ t('shop.product.shipping1') }}</li>
            <li>{{ t('shop.product.shipping2') }}</li>
            <li>{{ t('shop.product.shipping3') }}</li>
          </ul>
          <ul v-else class="space-y-2 list-disc ps-5">
            <li>{{ t('shop.product.returns1') }}</li>
            <li>{{ t('shop.product.returns2') }}</li>
          </ul>
        </div>
      </section>

      <!-- Related -->
      <section class="mt-24">
        <shop-section-heading :title="t('shop.product.related')" />
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          <shop-product-card v-for="p in catalog.related(product)" :key="p.id" :product="p" />
        </div>
      </section>
    </template>

    <shop-empty-state v-else icon="lucide:package-x" :title="t('shop.product.notFoundTitle')" :description="t('shop.product.notFoundDesc')">
      <v-button to="/collections/all" :label="t('shop.cart.continue')" />
    </shop-empty-state>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const { loc } = useLocalized()
const cart = useCartStore()
const catalog = useCatalogStore()

const product = computed(() => catalog.getProduct(String(route.params.handle)))

// Default selection: first in-stock variant (or first variant).
const initial = () => {
  const v = product.value?.variants.find(x => x.stock > 0) ?? product.value?.variants[0]
  return { ...(v?.options ?? {}) }
}
const selected = reactive<Record<string, string>>(initial())
watch(() => route.params.handle, () => {
  for (const k of Object.keys(selected)) delete selected[k]
  Object.assign(selected, initial())
  qty.value = 1
})

const variant = computed(() => product.value?.variants.find(v => Object.entries(selected).every(([k, val]) => v.options[k] === val)))
const qty = ref(1)
watch(variant, () => { qty.value = 1 })

// A value is available if some in-stock variant has it with the other current selections.
function optionAvailable(key: string, value: string) {
  return !!product.value?.variants.some(v =>
    v.stock > 0 && v.options[key] === value
    && Object.entries(selected).every(([k, val]) => k === key || v.options[k] === val))
}

function addToCart() {
  if (product.value && variant.value && variant.value.stock > 0) cart.add(product.value.id, variant.value.id, qty.value)
}

const tab = ref('description')
const tabs = computed(() => [
  { name: t('shop.product.tabDescription'), value: 'description' },
  { name: t('shop.product.tabShipping'), value: 'shipping' },
  { name: t('shop.product.tabReturns'), value: 'returns' },
])

const crumbs = computed(() => [
  { label: t('shop.common.home'), to: '/' },
  { label: t('shop.header.shopAll'), to: '/collections/all' },
  { label: loc(product.value?.title), active: true },
])

useSeoMeta({
  title: () => (product.value ? loc(product.value.title) : t('shop.product.notFoundTitle')),
  description: () => (product.value ? loc(product.value.description) : t('shop.product.notFoundDesc')),
  ogTitle: () => (product.value ? loc(product.value.title) : ''),
  ogDescription: () => (product.value ? loc(product.value.description) : ''),
  ogType: 'website',
  robots: () => (product.value ? 'index, follow' : 'noindex, nofollow'),
})

useHead(computed(() => {
  const p = product.value
  if (!p) return {}
  const inStock = catalog.isInStock(p)
  return {
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: loc(p.title),
        description: loc(p.description),
        sku: p.variants[0]?.sku,
        category: p.category,
        aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EGP',
          price: p.price,
          availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      }),
    }],
  }
}))
</script>
