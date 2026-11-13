<template>
  <div class="bg-bg-elevated border border-border-subtle rounded-md p-4 space-y-4" :dir="rtl ? 'rtl' : 'ltr'">
    <div v-for="section in sections" :key="section.placement" class="space-y-2">
      <h3 class="text-[10px] font-bold uppercase tracking-widest text-tx-muted">
        {{ t(`dashboard.ops.checkoutFields.placements.${section.placement}`) }}
      </h3>
      <div v-for="f in section.fields" :key="f.id" class="space-y-1">
        <label v-if="f.type === 'checkbox'" class="flex items-center gap-2 text-xs">
          <input type="checkbox" class="accent-brand" />
          <span>{{ labelOf(f) }}</span>
          <span v-if="f.required" class="text-danger">*</span>
        </label>
        <template v-else>
          <p class="text-[11px] text-tx-secondary">
            {{ labelOf(f) }}<span v-if="f.required" class="text-danger ms-1">*</span>
            <span v-if="f.codOnly" class="ms-2 text-[9px] font-semibold text-warning">
              {{ t('dashboard.ops.checkoutFields.codBadge') }}
            </span>
          </p>
          <div
            v-if="f.type === 'textarea'"
            class="h-14 bg-bg-primary border border-border-subtle rounded-md"
          ></div>
          <div
            v-else
            class="h-8 bg-bg-primary border border-border-subtle rounded-md flex items-center justify-between px-3"
          >
            <span v-if="f.type === 'select'" class="text-[11px] text-tx-muted">{{ f.options[0] }}</span>
            <Icon v-if="f.type === 'select'" name="ph:caret-down-bold" class="text-tx-muted" />
          </div>
        </template>
      </div>
    </div>
    <p v-if="!sections.length" class="text-xs text-tx-muted text-center py-4">
      {{ t('dashboard.ops.checkoutFields.previewEmpty') }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { CheckoutField, CheckoutFieldPlacement } from '@/types/checkoutExtras'

const props = defineProps<{
  fields: CheckoutField[]
  rtl: boolean
}>()

const { t } = useI18n()

const ORDER: CheckoutFieldPlacement[] = ['contact', 'shipping', 'payment', 'notes']

const labelOf = (f: CheckoutField) => (props.rtl ? f.labelAr || f.labelEn : f.labelEn || f.labelAr)

const sections = computed(() =>
  ORDER.map((placement) => ({
    placement,
    fields: props.fields.filter((f) => f.enabled && f.placement === placement),
  })).filter((s) => s.fields.length),
)
</script>
