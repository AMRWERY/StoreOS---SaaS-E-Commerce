<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 bg-[#08080E]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 selection:bg-[#6366F1]/30">

      <!-- Icon -->
      <div class="w-24 h-24 bg-[#0D0D18] border border-[#1C1C30] rounded-[20px] flex items-center justify-center shadow-2xl">
        <div class="w-14 h-14 bg-[#6366F1] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)]">
          <Icon name="ph:checks-bold" class="w-8 h-8 text-white" />
        </div>
      </div>

      <!-- Text -->
      <div class="text-center space-y-3">
        <h1 class="text-4xl font-bold tracking-tight text-white">{{ $t('storefront.checkout.orderConfirmed') }}</h1>
        <p class="text-[14px] text-[#8888AA]">{{ $t('storefront.checkout.orderConfirmedDesc') }}</p>
      </div>

      <!-- Progress bar -->
      <div class="w-48 h-[2px] bg-[#1C1C30] rounded-full overflow-hidden">
        <div class="h-full bg-[#6366F1] rounded-full animate-drain shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
      </div>

      <p class="text-[10px] font-black tracking-[0.3em] text-[#50506A]">{{ $t('storefront.checkout.redirectingToTracking') }}</p>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
</script>

<style scoped>
@keyframes drain {
  from { width: 100%; }
  to   { width: 0%; }
}
.animate-drain {
  animation: drain 3s linear forwards;
}
</style>
