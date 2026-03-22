<template>
  <div>
    <div
      class="fixed bottom-8 start-1/2 -translate-x-1/2 flex items-center px-2 py-2 bg-[#121214] border border-white/10 rounded-2xl shadow-2xl shadow-black z-50">
      <div class="flex items-center gap-4 border-r border-white/5 px-4 me-4">
        <div class="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-xs font-black text-white">
          {{ selectedCount }}
        </div>
        <span class="text-xs font-bold text-gray-400 tracking-widest">selected</span>
      </div>
      <div class="flex items-center gap-1">
        <VButton variant="none"
          className="flex items-center gap-2 px-4 py-3 text-[10px] font-black tracking-widest text-gray-400 hover:text-white transition-colors">
          <icon name="ph:check-circle-bold" class="text-indigo-400 text-sm" /> Confirm Selected
        </VButton>
        <VButton variant="none"
          className="flex items-center gap-2 px-4 py-3 text-[10px] font-black tracking-widest text-gray-400 hover:text-white transition-colors">
          <icon name="ph:printer-bold" class="text-sm" /> Print Labels
        </VButton>
        <VButton variant="none"
          className="flex items-center gap-2 px-4 py-3 text-[10px] font-black tracking-widest text-gray-400 hover:text-white transition-colors">
          <icon name="ph:export-bold" class="text-sm" /> Export
        </VButton>
        <div class="w-px h-6 bg-white/5 mx-2"></div>
        <VButton variant="none"
          className="flex items-center gap-2 px-4 py-3 text-[10px] font-black tracking-widest text-red-500/80 hover:text-red-500 transition-colors">
          <icon name="ph:x-circle-bold" class="text-sm" /> Cancel Selected
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  selectedCount: number;
}>();
</script>