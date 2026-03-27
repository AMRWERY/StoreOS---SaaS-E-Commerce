<template>
  <div
    class="fixed bottom-10 start-1/2 -translate-x-1/2 bg-[#1a1a1e]/90 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-6 shadow-2xl z-50">
    <div class="flex items-center gap-3 border-e border-white/10 pe-6">
      <div class="flex gap-1">
        <span class="bg-white/10 text-[9px] font-bold px-1.5 py-0.5 rounded text-gray-500">⌘</span>
        <span class="bg-white/10 text-[9px] font-bold px-1.5 py-0.5 rounded text-gray-500">K</span>
      </div>
      <span class="text-[11px] font-bold text-gray-500 ms-1">Quick Command</span>
    </div>
    <div class="flex items-center gap-5 text-gray-500">
      <Icon name="ph:magnifying-glass-bold" class="text-lg hover:text-white cursor-pointer transition-colors" />
      <Icon name="ph:hand-pointing-bold" class="text-lg hover:text-white cursor-pointer transition-colors" />
      <Icon name="ph:clock-counter-clockwise-bold"
        class="text-lg hover:text-white cursor-pointer transition-colors" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>