<template>
  <div>
    <section class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5">
      <div class="flex justify-between items-center mb-8">
        <h3 class="text-[10px] font-black text-tx-muted tracking-widest">{{ $t('dashboard.settings.billing.paymentMethod') }}</h3>
        <button class="text-[10px] font-bold text-tx-secondary hover:text-tx-primary transition-colors">{{ $t('common.edit') }}</button>
      </div>

      <!-- Card Visual -->
      <div class="bg-bg-primary border border-border-default rounded-2xl p-6 relative group overflow-hidden mb-6">
        <div class="flex justify-between items-start mb-6 relative z-10">
          <div class="bg-bg-elevated px-2 py-1 rounded text-[10px] font-black tracking-widest">VISA</div>
          <Icon name="ph:check-circle-fill" class="text-brand" />
        </div>
        <div class="relative z-10">
          <p class="text-sm font-bold tracking-[0.2em] text-tx-secondary">•••• •••• •••• 9012</p>
          <p class="text-[10px] font-bold text-tx-muted mt-2 tracking-widest">Expires 12/28</p>
        </div>
        <div class="absolute -bottom-10 -end-10 w-24 h-24 bg-brand-dim rounded-full blur-2xl" />
      </div>

      <!-- Alert -->
      <div class="bg-accent-dim border border-accent/20 rounded-2xl p-5 flex gap-4">
        <Icon name="ph:info-bold" class="text-accent mt-1 shrink-0" />
        <p class="text-[11px] text-accent leading-relaxed font-medium">
          Your card will be charged <span class="text-tx-primary font-bold">$249.00</span> automatically on October 24.
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>

</script>