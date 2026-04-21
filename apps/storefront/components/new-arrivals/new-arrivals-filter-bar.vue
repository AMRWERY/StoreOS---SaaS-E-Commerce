<template>
  <section class="sticky top-0 z-40 bg-[#08080E]/80 backdrop-blur-xl border-b border-[#1C1C30] px-6 lg:px-12 py-4">
    <div class="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-6">
      <div class="flex flex-wrap items-center gap-2">
        <component :is="VButton" v-for="cat in categories" :key="cat" variant="none" type="button"
          :className="pillClass(cat)" @click="selectedFilter = cat">
          {{ cat }}
        </component>
      </div>

      <div class="flex items-center gap-6">
        <component :is="VButton" variant="none" type="button"
          className="flex items-center gap-2 text-[11px] font-bold text-[#50506A] tracking-widest hover:text-[#8888AA]">
          <Icon name="ph:funnel-simple" class="w-4 h-4" />
          {{ $t('storefront.shop.advancedFilter') }}
        </component>
        <component :is="VButton" variant="none" type="button"
          className="flex items-center gap-2 text-[11px] font-bold text-[#50506A] tracking-widest hover:text-[#8888AA]">
          {{ $t('storefront.shop.sortBy') }}: <span class="text-[#F0F0FF]">{{ $t('storefront.shop.latest') }}</span>
          <Icon name="ph:caret-down" class="w-3 h-3" />
        </component>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{ categories: string[] }>()
const selectedFilter = defineModel<string>('selectedFilter', { required: true })

const VButton = resolveComponent('VButton')

const pillClass = (cat: string) =>
  [
    'px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest border transition-all',
    selectedFilter.value === cat
      ? 'bg-[#6366F1] border-[#6366F1] text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]'
      : 'border-[#1C1C30] text-[#50506A] hover:border-[#262640] hover:text-[#8888AA]',
  ].join(' ')
</script>