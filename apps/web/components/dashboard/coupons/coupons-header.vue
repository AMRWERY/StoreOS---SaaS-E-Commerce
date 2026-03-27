<template>
  <div>
    <VBreadcrumb />
    
    <header class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-bold tracking-tight">Coupons</h1>
        <span class="bg-white/5 px-2 py-0.5 rounded text-[10px] font-black text-gray-600 tracking-widest mt-1">
          {{ totalCoupons || 0 }} Active
        </span>
      </div>
      <div class="flex items-center gap-4">
        <VButton @click="$emit('create')"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
          <Icon name="ph:plus-bold" />
          Create Coupon
        </VButton>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  totalCoupons?: number;
}>();

defineEmits(['create']);
</script>