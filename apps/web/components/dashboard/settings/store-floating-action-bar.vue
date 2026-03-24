<template>
  <div>
    <div
      class="fixed bottom-10 start-1/2 -translate-x-1/2 bg-[#1a1a1e]/90 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-8 shadow-2xl z-50">
      <div class="flex items-center gap-3 border-e border-white/10 pe-8">
        <icon name="ph:command-bold" class="text-gray-600 text-lg" />
        <span class="text-[11px] font-black uppercase tracking-widest text-gray-400">Quick Action</span>
      </div>
      <div class="flex items-center gap-6">
        <VButton variant="ghost" size="none"
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
          <icon name="ph:eye-bold" /> Preview Store
        </VButton>

        <VButton variant="ghost" size="none"
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
          <icon name="ph:list-bullets-bold" /> Logs
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>