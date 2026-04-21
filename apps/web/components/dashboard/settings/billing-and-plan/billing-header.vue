<template>
  <div>
    <header class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
      <div>
        <h1 class="text-4xl font-bold tracking-tight text-tx-primary mt-2">{{ $t('dashboard.settings.billing.title') }}</h1>
        <p class="text-sm text-tx-secondary mt-2 leading-relaxed">
          {{ $t('dashboard.settings.billing.subtitle') }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <VButton variant="ghost" :label="$t('dashboard.settings.billing.comparePlans')" className="px-6 py-2.5 text-xs font-bold" />
        <VButton :label="$t('dashboard.settings.billing.upgradePlan')" className="px-6 py-2.5 text-xs font-bold shadow-lg shadow-indigo-600/30" />
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>

</script>