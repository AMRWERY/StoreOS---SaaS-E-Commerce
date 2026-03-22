<template>
  <div>
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight">Products</h1>
          <span
            class="bg-white/5 px-2 py-0.5 rounded text-[10px] font-black text-gray-500 tracking-widest mt-1">
            {{ total }} Total
          </span>
        </div>
        <p class="text-sm text-gray-500 mt-2">Manage your catalog, stock levels, and product availability.</p>
      </div>
      <VButton to=""
        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20">
        <icon name="ph:plus-bold" />
        Add Product
      </VButton>
    </header>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  total: number
}>()
</script>