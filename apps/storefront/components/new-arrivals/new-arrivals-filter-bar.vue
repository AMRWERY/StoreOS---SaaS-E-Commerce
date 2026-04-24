<template>
  <section class="sticky top-0 z-40 bg-bg-base/80 backdrop-blur-xl border-b border-border-subtle px-6 lg:px-12 py-4">
    <div class="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-6">
      <div class="flex flex-wrap items-center gap-2">
        <component :is="VButton" v-for="cat in categories" :key="cat" variant="none" type="button"
          :className="pillClass(cat)" @click="selectedFilter = cat">
          {{ cat }}
        </component>
      </div>

      <div class="flex items-center gap-6">
        <component :is="VButton" variant="none" type="button"
          className="flex items-center gap-2 text-[11px] font-bold text-tx-muted tracking-widest hover:text-tx-secondary">
          <Icon name="ph:funnel-simple" class="w-4 h-4" />
          {{ $t('storefront.shop.advancedFilter') }}
        </component>
        <component :is="VButton" variant="none" type="button"
          className="flex items-center gap-2 text-[11px] font-bold text-tx-muted tracking-widest hover:text-tx-secondary">
          {{ $t('storefront.shop.sortBy') }}: <span class="text-tx-primary">{{ $t('storefront.shop.latest') }}</span>
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
      ? 'bg-brand border-brand text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]'
      : 'border-border-subtle text-tx-muted hover:border-border-default hover:text-tx-secondary',
  ].join(' ')
</script>