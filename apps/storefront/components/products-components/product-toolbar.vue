<template>
  <div class="flex items-center justify-between bg-[#0D0D18] border border-[#1C1C30] rounded-[12px] p-2 px-4 shadow-xl">
    <div class="flex gap-1 p-1 bg-black/20 rounded-[8px]">
      <button @click="$emit('update:viewMode', 'grid')"
        :class="viewMode === 'grid' ? 'bg-[#1C1C30] text-[#6366F1] shadow-lg shadow-[#6366F1]/10' : 'text-[#50506A]'"
        class="p-2 px-4 rounded-[6px] transition-all flex items-center gap-2">
        <Icon name="solar:widget-2-bold" class="w-4 h-4" />
        <span class="text-[11px] font-bold tracking-widest">Grid</span>
      </button>
      <button @click="$emit('update:viewMode', 'list')"
        :class="viewMode === 'list' ? 'bg-[#1C1C30] text-[#6366F1] shadow-lg shadow-[#6366F1]/10' : 'text-[#50506A]'"
        class="p-2 px-4 rounded-[6px] transition-all flex items-center gap-2">
        <Icon name="solar:list-bold" class="w-4 h-4" />
        <span class="text-[11px] font-bold tracking-widest">List</span>
      </button>
    </div>

    <div class="flex items-center gap-4">
      <span class="text-[10px] font-black text-[#50506A] tracking-widest">Sort By</span>
      <div class="relative group">
        <div
          class="bg-black/20 border border-[#1C1C30] rounded-[8px] p-2 px-4 text-[12px] font-semibold flex items-center gap-6 cursor-pointer hover:border-[#6366F1]/40 transition-all">
          {{ selectedSort }}
          <Icon name="solar:alt-arrow-down-linear" class="w-4 h-4 text-[#50506A]" />
        </div>
        <!-- Mock Dropdown -->
        <div class="absolute top-full right-0 mt-2 w-48 bg-[#0D0D18] border border-[#1C1C30] rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50 p-2">
          <div v-for="opt in sortOptions" :key="opt" @click="$emit('update:selectedSort', opt)"
            class="px-3 py-2 text-[12px] font-medium text-[#8888AA] hover:text-[#F0F0FF] hover:bg-[#1C1C30] rounded-lg cursor-pointer transition-all">
            {{ opt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  viewMode: 'grid' | 'list';
  selectedSort: string;
}>();

const sortOptions = ['Popularity', 'Newest', 'Price: Low to High', 'Price: High to Low'];

defineEmits(['update:viewMode', 'update:selectedSort']);
</script>
