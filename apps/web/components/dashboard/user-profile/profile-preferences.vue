<template>
  <aside class="lg:col-span-4 bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 space-y-8">
    <div class="flex items-center gap-3">
      <Icon name="ph:sliders-horizontal-bold" class="text-indigo-500 text-lg" />
      <h3 class="text-sm font-bold">Preferences</h3>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <label class="text-[10px] font-bold text-gray-500 tracking-wider">Language</label>
        <div class="relative">
          <select
            class="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-sm appearance-none outline-none">
            <option>English (US)</option>
          </select>
          <Icon name="ph:caret-down-bold" class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
      </div>
      <div class="space-y-2">
        <label class="text-[10px] font-bold text-gray-500 tracking-wider">Timezone</label>
        <div class="relative">
          <select
            class="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-sm appearance-none outline-none">
            <option>(GMT+09:00) Tokyo, Japan</option>
          </select>
          <Icon name="ph:caret-down-bold" class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
      </div>
      <div class="space-y-3 pt-4 border-t border-white/5">
        <label class="text-[10px] font-bold text-gray-500 tracking-wider">Interface Theme</label>
        <div class="flex items-center justify-between p-4 bg-black rounded-xl border border-white/5 opacity-60">
          <div class="flex items-center gap-3 text-xs font-bold text-gray-400">
            <Icon name="ph:moon-stars-fill" />
            Dark Terminal Mode
          </div>
          <Icon name="ph:lock-key-fill" class="text-gray-700" />
        </div>
        <p class="text-[8px] font-bold text-gray-800 italic">* Locked to Brand Standard</p>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>

</script>