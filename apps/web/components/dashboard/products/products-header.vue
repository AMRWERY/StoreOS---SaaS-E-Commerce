<template>
  <div>
    <VBreadcrumb />

    <header
      class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
    >
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ t("dashboard.products.title") }}
          </h1>
          <span
            class="bg-bg-elevated px-2 py-0.5 rounded text-[10px] font-black text-tx-secondary tracking-widest mt-1"
          >
            {{ total }} {{ t("dashboard.products.total") }}
          </span>
        </div>
        <p class="text-sm text-tx-secondary mt-2">
          {{ t("dashboard.products.subtitle") }}
        </p>
      </div>
      <VButton
        to="/dashboard/products/product-form"
        className="flex items-center gap-2 px-4 py-2.5 bg-brand hover:bg-brand-hover rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand/20"
      >
        <Icon name="ph:plus-bold" />
        {{ t("dashboard.products.addProduct") }}
      </VButton>
    </header>

    <!-- Search Bar Row -->
    <div class="flex items-center gap-4 mb-8">
      <VSearchInput
        wrapperClass="flex-1"
        :placeholder="t('dashboard.products.searchPlaceholder')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  total: number;
}>();
</script>