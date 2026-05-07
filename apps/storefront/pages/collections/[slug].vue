<template>
  <div
    class="min-h-screen bg-bg-base text-tx-primary selection:bg-brand/30 p-6 lg:p-10"
  >
    <div
      v-if="!meta"
      class="max-w-[1400px] mx-auto py-20 text-center space-y-6"
    >
      <p class="text-tx-secondary">
        {{ t("storefront.collections.notFound") }}
      </p>
      <nuxt-link-locale
        to="/collections"
        class="inline-flex text-brand font-bold text-sm tracking-widest hover:underline"
      >
        {{ t("storefront.collections.backToCollections") }}
      </nuxt-link-locale>
    </div>

    <div v-else class="max-w-[1400px] mx-auto space-y-10">
      <VBreadcrumb :items="breadcrumbItems" />

      <header class="space-y-3 border-b border-border-subtle pb-10">
        <p class="text-[10px] font-black tracking-[0.3em] text-tx-muted">
          {{ t("storefront.collections.filteredCatalog") }}
        </p>
        <h1 class="text-4xl lg:text-tx-mutedxl font-bold tracking-tight">
          {{ meta.name }}
        </h1>
        <p class="text-[15px] text-tx-secondary max-w-2xl leading-relaxed">
          {{ meta.description }}
        </p>
        <p class="text-[11px] font-bold text-brand tracking-widest">
          {{
            t("storefront.collections.productsInCollection", {
              count: filteredProducts.length,
            })
          }}
        </p>
      </header>

      <div
        v-if="filteredProducts.length"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <div v-for="p in filteredProducts" :key="p.id" class="h-full min-h-0">
          <nuxt-link-locale
            :to="`/shop-all/${p.slug}`"
            class="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            <VProductCard :product="toCardProduct(p)" view-mode="grid" />
          </nuxt-link-locale>
        </div>
      </div>

      <p v-else class="text-center text-tx-muted py-16 text-sm">
        {{ t("storefront.collections.noProducts") }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from "../../../../layers/ui/types/v-breadcrumb";
import type { Product } from "../../../../layers/ui/types/v-product-card";
import {
  collectionCatalogProducts,
  collectionMeta,
  type CollectionCatalogProduct,
} from "../../data/collections-catalog";

const { t } = useI18n();
const route = useRoute();

const slug = computed(() => String(route.params.slug ?? ""));

const meta = computed(() => collectionMeta[slug.value] ?? null);

const filteredProducts = computed(() =>
  collectionCatalogProducts.filter((p) => p.collectionSlug === slug.value)
);

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  { label: t("common.home"), to: "/" },
  { label: t("storefront.collections.title"), to: "/collections" },
  {
    label: meta.value?.name ?? t("storefront.collections.collection"),
    active: true,
  },
]);

function toCardProduct(p: CollectionCatalogProduct): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price.toLocaleString(),
    category: p.category,
    status: "active",
    stock: 12,
    image: p.image,
  };
}

useSeoMeta({
  title: () => meta.value?.name ?? "Collection",
  description: () =>
    meta.value?.description ?? "Browse products in this collection.",
  ogTitle: () =>
    meta.value?.name ? `${meta.value.name} | StoreOS` : "Collection | StoreOS",
  ogType: "website",
});
</script>