<template>
  <header class="relative pb-16 px-6 lg:px-12 border-b border-[#1C1C30]">
    <div class="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <span
            class="text-[10px] font-bold text-[#6366F1] bg-[#6366F1]/10 px-2 py-1 rounded border border-[#6366F1]/20 tracking-widest">
            Batch: 04-X
          </span>
          <span class="text-[10px] font-bold text-[#50506A] tracking-widest">
            Last Sync: 10.04.2024
          </span>
        </div>
        <h1 class="text-5xl lg:text-6xl font-bold tracking-tight">{{ $t('storefront.newArrivals.title') }}</h1>
        <p class="text-[15px] text-[#8888AA] max-w-xl leading-relaxed">
          {{ $t('storefront.newArrivals.subtitle') }}
        </p>
      </div>

      <div class="flex items-center gap-4 bg-[#0D0D18] border border-[#1C1C30] p-1.5 rounded-[10px]">
        <VButton variant="none" type="button" :className="[
          'p-2 rounded-[6px] transition-all',
          viewMode === 'grid'
            ? 'bg-[#141422] text-[#6366F1] shadow-lg shadow-black/40'
            : 'text-[#50506A] hover:text-[#8888AA]',
        ].join(' ')" @click="viewMode = 'grid'">
          <Icon name="ph:squares-four-fill" class="w-5 h-5" />
        </VButton>
        <VButton variant="none" type="button" :className="[
          'p-2 rounded-[6px] transition-all',
          viewMode === 'list'
            ? 'bg-[#141422] text-[#6366F1] shadow-lg shadow-black/40'
            : 'text-[#50506A] hover:text-[#8888AA]',
        ].join(' ')" @click="viewMode = 'list'">
          <Icon name="ph:list-bold" class="w-5 h-5" />
        </VButton>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const viewMode = defineModel<'grid' | 'list'>('viewMode', { required: true })
</script>