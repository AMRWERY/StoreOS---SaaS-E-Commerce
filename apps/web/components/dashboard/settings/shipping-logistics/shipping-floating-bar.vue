<template>
  <div>
    <div
      class="fixed bottom-10 start-1/2 -translate-x-1/2 bg-[#1a1a1e]/90 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-8 shadow-2xl z-50">
      <div class="flex items-center gap-2 border-e border-white/10 pe-8">
        <span class="bg-white/10 text-[9px] font-bold px-1.5 py-0.5 rounded text-gray-400">CMD K</span>
      </div>
      <div class="flex items-center gap-8">
        <button class="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
          <Icon name="ph:rocket-launch-bold" /> Quick Action
        </button>
        <button class="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
          <Icon name="ph:clock-counter-clockwise-bold" /> Audit Logs
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>