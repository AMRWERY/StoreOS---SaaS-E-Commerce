<template>
  <div
    class="fixed bottom-10 start-1/2 -translate-x-1/2 bg-bg-overlay/90 backdrop-blur-xl border border-border-default px-6 py-3 rounded-2xl flex items-center gap-6 shadow-2xl z-50">
    <div class="flex items-center gap-3 border-e border-border-default pe-6">
      <div class="flex gap-1">
        <span class="bg-bg-elevated text-[9px] font-bold px-1.5 py-0.5 rounded text-tx-secondary">⌘</span>
        <span class="bg-bg-elevated text-[9px] font-bold px-1.5 py-0.5 rounded text-tx-secondary">K</span>
      </div>
      <span class="text-[11px] font-bold text-tx-secondary ms-1">Quick Command</span>
    </div>
    <div class="flex items-center gap-5 text-tx-secondary">
      <Icon name="ph:magnifying-glass-bold" class="text-lg hover:text-tx-primary cursor-pointer transition-colors" />
      <Icon name="ph:hand-pointing-bold" class="text-lg hover:text-tx-primary cursor-pointer transition-colors" />
      <Icon name="ph:clock-counter-clockwise-bold"
        class="text-lg hover:text-tx-primary cursor-pointer transition-colors" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>