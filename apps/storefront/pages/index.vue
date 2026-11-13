<template>
  <div>
    <!-- Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <div class="space-y-6 lg:py-12">
          <p class="text-xs font-semibold tracking-widest uppercase text-brand">{{ t('shop.home.eyebrow') }}</p>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-tx-primary leading-[1.1]">{{ t('shop.home.title') }}</h1>
          <p class="text-base text-tx-secondary max-w-md">{{ t('shop.home.subtitle') }}</p>
          <div class="flex flex-wrap gap-3 pt-2">
            <v-button to="/collections/all" :label="t('shop.home.shopNow')" icon="lucide:arrow-right" class="rounded-full px-7 py-3" />
            <v-button to="/collections/new-arrivals" variant="secondary" :label="t('shop.home.newArrivals')" class="rounded-full px-7 py-3" />
          </div>
          <p class="inline-flex items-center gap-2 text-xs text-tx-muted pt-2"><Icon name="lucide:banknote" class="w-4 h-4" />{{ t('shop.home.codNote') }}</p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <product-visual :tone="0" icon="lucide:shirt" image="/img/prod-01.png" ratio="aspect-[3/4]" icon-size="w-20 h-20" class="rounded-3xl border border-border-subtle" />
          <product-visual :tone="3" icon="lucide:lamp" image="/img/prod-04.png" ratio="aspect-[3/4]" icon-size="w-20 h-20" class="rounded-3xl border border-border-subtle mt-10" />
        </div>
      </div>
    </section>

    <!-- Featured collection -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <shop-section-heading :eyebrow="t('shop.home.featuredEyebrow')" :title="t('shop.home.featuredTitle')" to="/collections/best-sellers" :link-label="t('shop.common.viewAll')" />
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
        <shop-product-card v-for="p in catalog.featured" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- Categories -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <shop-section-heading :title="t('shop.home.categoriesTitle')" :subtitle="t('shop.home.categoriesSubtitle')" />
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <nuxt-link-locale v-for="c in catalog.categories" :key="c.handle" :to="`/collections/all?category=${c.handle}`" class="group">
          <product-visual :tone="c.tone" :icon="c.icon" :image="c.image" ratio="aspect-square" icon-size="w-12 h-12" class="rounded-3xl border border-border-subtle">
            <div class="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex items-center justify-between bg-gradient-to-t from-bg-base/80 to-transparent">
              <span class="text-sm font-semibold text-tx-primary">{{ loc(c.title) }}</span>
              <Icon name="lucide:arrow-right" class="w-4 h-4 text-tx-primary rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </div>
          </product-visual>
        </nuxt-link-locale>
      </div>
    </section>

    <!-- New arrivals -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <shop-section-heading :eyebrow="t('shop.home.freshEyebrow')" :title="t('shop.home.freshTitle')" to="/collections/new-arrivals" :link-label="t('shop.common.viewAll')" />
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
        <shop-product-card v-for="p in catalog.newArrivals.slice(0, 4)" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- Trust -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 py-12 border-y border-border-subtle">
      <trust-badges />
    </section>

    <!-- Newsletter -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <newsletter-form />
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { loc } = useLocalized()
const catalog = useCatalogStore()

useSeoMeta({
  title: () => t('shop.seo.homeTitle'),
  description: () => t('shop.seo.homeDesc'),
  ogTitle: () => t('shop.seo.homeTitle'),
  ogDescription: () => t('shop.seo.homeDesc'),
})
</script>
