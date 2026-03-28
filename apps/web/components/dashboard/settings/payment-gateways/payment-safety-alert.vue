<template>
  <div>
    <section
      class="bg-orange-950/20 border border-accent/10 rounded-2xl px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-start gap-5 max-w-2xl">
        <div class="mt-1">
          <Icon name="ph:warning-octagon-bold" class="text-accent text-2xl" />
        </div>
        <div>
          <h4 class="text-sm font-bold text-accent">Transaction Safety Lock</h4>
          <p class="text-xs text-accent/60 leading-relaxed font-medium mt-1">
            When enabled, all incoming payments will be held in escrow for
            24 hours to mitigate fraud vectors.
          </p>
        </div>
      </div>
      <VButton variant="outline"
        className="bg-transparent border border-accent/30 text-accent/70 hover:text-accent hover:border-orange-500/50 px-5 py-2.5 rounded-lg text-[10px] font-black tracking-widest transition-all">
        Disable_Protocol_X
      </VButton>
    </section>
  </div>
</template>

<script lang="ts" setup>

</script>