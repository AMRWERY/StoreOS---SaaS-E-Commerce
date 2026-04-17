<template>
  <div>
    <VBreadcrumb />

    <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight">Products</h1>
          <span
            class="bg-bg-elevated px-2 py-0.5 rounded text-[10px] font-black text-tx-secondary tracking-widest mt-1">
            {{ total }} Total
          </span>
        </div>
        <p class="text-sm text-tx-secondary mt-2">Manage your catalog, stock levels, and product availability.</p>
      </div>
      <VButton to="/dashboard/products/product-form"
        className="flex items-center gap-2 px-4 py-2.5 bg-brand hover:bg-brand-hover rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand/20">
        <Icon name="ph:plus-bold" />
        Add Product
      </VButton>
    </header>

    <!-- Search Bar Row -->
    <div class="flex items-center gap-4 mb-8">
      <VSearchInput wrapperClass="flex-1" placeholder="Search product names, SKUs, or tags..." />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  total: number
}>()
</script>