<template>
  <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 flex flex-col justify-between">
    <div class="flex justify-between items-start mb-10">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
          <icon name="ph:stripe-logo-duotone" class="text-gray-400 text-2xl" />
        </div>
        <div>
          <h3 class="text-base font-bold">Stripe</h3>
          <p class="text-xs text-gray-500 mt-1">Global credit & debit cards</p>
        </div>
      </div>
      <span
        class="text-[8px] font-black text-orange-500/60 border border-orange-500/20 px-2 py-0.5 rounded tracking-widest">Disconnected</span>
    </div>

    <div class="mt-auto">
      <VButton variant="none"
        className="w-full bg-[#818cf8] hover:bg-[#6366f1] text-white py-4 rounded-2xl font-black text-[11px] tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
        <icon name="ph:link-bold" class="text-base" />
        Connect Stripe Account
      </VButton>
      <p class="text-center text-[8px] font-bold text-gray-700 tracking-[0.2em] mt-4">
        Redirects to stripe connect auth
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>

</script>