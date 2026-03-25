<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6">
      <div class="flex items-center gap-3 mb-6">
        <Icon name="ph:truck-bold" class="text-indigo-400 text-lg" />
        <h3 class="text-xs font-black uppercase tracking-widest text-gray-400">Default Carrier</h3>
      </div>

      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-[9px] font-black text-gray-600 uppercase tracking-widest">Active Gateway</label>
          <div class="relative">
            <select
              class="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm appearance-none focus:border-indigo-500/50 outline-none transition">
              <option>FedEx Priority Global</option>
              <option>DHL Express</option>
            </select>
            <Icon name="ph:caret-down-bold" class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-600" />
          </div>
        </div>

        <div class="flex justify-between items-end pt-4">
          <div class="space-y-1">
            <p class="text-[10px] font-bold text-gray-600 uppercase">API Status</p>
            <p class="text-[10px] font-bold text-gray-700">Last ping: 14:02:11 UTC</p>
          </div>
          <span
            class="bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-2.5 py-1 rounded tracking-widest uppercase border border-emerald-500/10">Active</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>

</script>