<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h2 class="text-sm font-semibold text-tx-primary">{{ t('shop.filters.title') }}</h2>
      <button v-if="active" type="button" class="text-xs text-brand hover:text-brand-hover transition-colors duration-200" @click="emit('reset')">{{ t('shop.filters.clear') }}</button>
    </div>

    <fieldset class="space-y-3">
      <legend class="text-xs font-semibold tracking-widest uppercase text-tx-muted mb-3">{{ t('shop.filters.price') }}</legend>
      <div class="flex items-center gap-2">
        <input :value="modelValue.minPrice" type="number" inputmode="numeric" min="0" :placeholder="t('shop.filters.min')" :aria-label="t('shop.filters.min')"
          class="w-full min-w-0 bg-bg-primary border border-border-default focus:border-brand rounded-xl px-3 py-2 text-sm font-mono text-tx-primary placeholder:font-sans placeholder:text-tx-muted outline-none transition-colors duration-200"
          @input="patch({ minPrice: ($event.target as HTMLInputElement).value })">
        <span class="text-tx-muted">-</span>
        <input :value="modelValue.maxPrice" type="number" inputmode="numeric" min="0" :placeholder="t('shop.filters.max')" :aria-label="t('shop.filters.max')"
          class="w-full min-w-0 bg-bg-primary border border-border-default focus:border-brand rounded-xl px-3 py-2 text-sm font-mono text-tx-primary placeholder:font-sans placeholder:text-tx-muted outline-none transition-colors duration-200"
          @input="patch({ maxPrice: ($event.target as HTMLInputElement).value })">
      </div>
      <p class="text-xs text-tx-muted font-mono">{{ formatMoney(bounds.min) }} - {{ formatMoney(bounds.max) }}</p>
    </fieldset>

    <fieldset class="space-y-3">
      <legend class="text-xs font-semibold tracking-widest uppercase text-tx-muted mb-3">{{ t('shop.filters.availability') }}</legend>
      <label class="flex items-center gap-3 cursor-pointer text-sm text-tx-secondary">
        <input type="checkbox" class="w-4 h-4 accent-brand" :checked="modelValue.inStockOnly" @change="patch({ inStockOnly: ($event.target as HTMLInputElement).checked })">
        {{ t('shop.filters.inStockOnly') }}
      </label>
    </fieldset>

    <fieldset v-for="f in facets" :key="f.key" class="space-y-3">
      <legend class="text-xs font-semibold tracking-widest uppercase text-tx-muted mb-3">{{ loc(f.label) }}</legend>
      <div class="flex flex-wrap gap-2">
        <button v-for="v in f.values" :key="v.value" type="button" :aria-pressed="isOn(f.key, v.value)"
          :class="['rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-200', isOn(f.key, v.value) ? 'border-brand bg-brand-dim text-tx-primary' : 'border-border-default text-tx-secondary hover:border-tx-muted']"
          @click="toggle(f.key, v.value)">
          {{ loc(v.label) }}
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import type { FilterState, Localized } from '@/types/shop'

const props = defineProps<{
  modelValue: FilterState
  facets: { key: string; label: Localized; values: { value: string; label: Localized }[] }[]
  bounds: { min: number; max: number }
}>()
const emit = defineEmits<{ 'update:modelValue': [value: FilterState]; reset: [] }>()
const { t } = useI18n()
const { loc } = useLocalized()
const { formatMoney } = useShopFormat()

const active = computed(() =>
  !!props.modelValue.minPrice || !!props.modelValue.maxPrice || props.modelValue.inStockOnly
  || Object.values(props.modelValue.options).some(v => v.length),
)

const patch = (p: Partial<FilterState>) => emit('update:modelValue', { ...props.modelValue, ...p })
const isOn = (key: string, value: string) => props.modelValue.options[key]?.includes(value) ?? false
function toggle(key: string, value: string) {
  const current = props.modelValue.options[key] ?? []
  const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
  patch({ options: { ...props.modelValue.options, [key]: next } })
}
</script>
