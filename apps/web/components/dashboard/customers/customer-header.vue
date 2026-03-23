<template>
  <div>
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-bold tracking-tight">Customers</h1>
        <span
          class="bg-white/5 px-2 py-0.5 rounded text-[10px] font-black text-gray-600 uppercase tracking-widest mt-1">{{
          totalCustomers }}
          total</span>
      </div>
      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold transition-all"
          @click="$emit('export')">
          <icon name="ph:export-bold" />
          Export
        </button>
        <button
          class="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20"
          @click="$emit('add')">
          <icon name="ph:plus-bold" />
          Add Customer
        </button>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  totalCustomers: string | number
}>()

defineEmits(['export', 'add'])
</script>