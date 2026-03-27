<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-[2.5rem] p-8">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-[10px] font-black text-gray-600 tracking-widest">Payment Method</h3>
        <button class="text-[10px] font-bold text-gray-500 hover:text-white transition-colors">Update</button>
      </div>

      <!-- Card Visual -->
      <div class="bg-black border border-white/10 rounded-2xl p-6 relative group overflow-hidden mb-6">
        <div class="flex justify-between items-start mb-10 relative z-10">
          <div class="bg-white/5 px-2 py-1 rounded text-[10px] font-black tracking-widest">VISA</div>
          <Icon name="ph:check-circle-fill" class="text-indigo-500" />
        </div>
        <div class="relative z-10">
          <p class="text-sm font-bold tracking-[0.2em] text-gray-400">•••• •••• •••• 9012</p>
          <p class="text-[10px] font-bold text-gray-700 mt-2 tracking-widest">Expires 12/28</p>
        </div>
        <div class="absolute -bottom-10 -end-10 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl" />
      </div>

      <!-- Alert -->
      <div class="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-5 flex gap-4">
        <Icon name="ph:info-bold" class="text-orange-500 mt-1 shrink-0" />
        <p class="text-[11px] text-orange-200/70 leading-relaxed font-medium">
          Your card will be charged <span class="text-white font-bold">$249.00</span> automatically on October 24.
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>

</script>