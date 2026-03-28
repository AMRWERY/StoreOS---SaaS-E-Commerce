<template>
  <div>
    <VAlertBanner variant="error" icon="ph:warning-octagon-bold" :dismissible="false" class="w-full">
      <div class="flex flex-col gap-1 items-start">
        <h4 class="text-sm font-bold text-danger">Unmapped Regions Detected</h4>
        <p class="text-xs text-danger/70 leading-relaxed font-medium">
          There are 12 countries currently without shipping rules. Customers in these regions will be unable to
          complete checkout.
        </p>
        <button
          class="mt-2 text-[10px] font-black tracking-widest text-danger border-b border-red-400/30 pb-0.5 hover:text-danger hover:border-red-200 transition-all">
          Fix Mapping Now
        </button>
      </div>
    </VAlertBanner>
  </div>
</template>

<script lang="ts" setup>

</script>