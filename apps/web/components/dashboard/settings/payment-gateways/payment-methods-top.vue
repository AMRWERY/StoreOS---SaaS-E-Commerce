<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Cash on Delivery -->
      <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 flex flex-col justify-between">
        <div class="flex justify-between items-start mb-10">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10">
              <Icon name="ph:money-duotone" class="text-indigo-400 text-2xl" />
            </div>
            <div>
              <h3 class="text-base font-bold">Cash on Delivery</h3>
              <div class="flex items-center gap-1.5 mt-1">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                <span class="text-[9px] font-black text-emerald-500 tracking-widest">Status: Active</span>
              </div>
            </div>
          </div>
          <!-- Toggle -->
          <VSwitchButton v-model="codActive" />
        </div>

        <div class="bg-black/40 border border-white/5 rounded-xl p-5 mb-6">
          <p class="text-[9px] font-black text-gray-600 tracking-widest mb-2">Settlement_Type</p>
          <p class="text-sm font-bold text-gray-300">Immediate Physical Exchange</p>
        </div>

        <div class="flex justify-between text-[9px] font-black text-gray-700 tracking-widest">
          <span>Fee: 0.00%</span>
          <span>Limit: $5,000.00</span>
        </div>
      </section>

      <payment-method-stripe />
    </div>
  </div>
</template>

<script lang="ts" setup>
const codActive = ref(true);
</script>