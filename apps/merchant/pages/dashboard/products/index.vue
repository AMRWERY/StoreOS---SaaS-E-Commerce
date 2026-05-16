<template>
  <div>
    <div class="min-h-screen text-tx-primary -mt-5">
      <!-- Header -->
      <products-header :total="products.length" />

      <!-- Filter Bar -->
      <products-filter-bar v-model:view-mode="viewMode" />

      <!-- Status Sub-Filters -->
      <products-status-filters
        :filters="filters"
        v-model:active-filter="activeFilter"
      />

      <!-- Product Grid -->
      <div
        :class="[
          'grid gap-6',
          viewMode === 'list'
            ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        ]"
      >
        <products-card
          v-for="product in paginatedProducts"
          :key="product.id"
          :product="product"
          :viewMode="viewMode"
        />
      </div>

      <!-- Footer -->
      <div class="mt-8">
        <LazyVPagination
          :total="filteredProducts.length"
          :perPage="perPage"
          v-model:currentPage="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const productsStore = useProductsStore();
const {
  activeFilter,
  viewMode,
  currentPage,
  perPage,
  filters,
  products,
  filteredProducts,
  paginatedProducts,
} = storeToRefs(productsStore);

definePageMeta({
  layout: "dashboard",
});

useHead({
  titleTemplate: () => "Products",
});
</script>
