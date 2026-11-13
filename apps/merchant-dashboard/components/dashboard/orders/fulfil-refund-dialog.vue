<template>
  <LazyVDialog
    :model-value="modelValue"
    :title="t('dashboard.ops.refundDialog.title')"
    max-width="2xl"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="space-y-5">
      <div class="space-y-2">
        <p class="text-[10px] font-bold text-tx-secondary tracking-wider">
          {{ t('dashboard.ops.refundDialog.items') }}
        </p>
        <div class="border border-border-subtle rounded-md divide-y divide-border-subtle">
          <div
            v-for="row in rows"
            :key="row.sku"
            class="grid grid-cols-[1fr_88px_110px] items-center gap-3 px-3 py-2.5"
          >
            <div class="min-w-0">
              <p class="text-xs font-semibold truncate">{{ row.name }}</p>
              <p class="font-mono text-[10px] text-tx-muted">
                {{ row.sku }} · {{ fmt(row.unitPrice) }}
              </p>
            </div>
            <LazyVInput
              :model-value="row.qty"
              type="number"
              :placeholder="t('dashboard.ops.refundDialog.qty')"
              input-class="font-mono"
              @update:model-value="setQty(row, $event)"
            />
            <LazyVInput
              :model-value="row.amount"
              type="number"
              :placeholder="t('dashboard.ops.refundDialog.amount')"
              input-class="font-mono"
              @update:model-value="setAmount(row, $event)"
            />
          </div>
        </div>
        <p class="text-[10px] text-tx-muted">{{ t('dashboard.ops.refundDialog.qtyHint') }}</p>
      </div>

      <LazyVInput
        v-model="shipping"
        type="number"
        :label="t('dashboard.ops.refundDialog.shipping')"
        input-class="font-mono"
      />

      <LazyVSelectInput
        v-model="reason"
        :label="t('dashboard.ops.refundDialog.reason')"
        :options="reasonOptions"
      />

      <LazyVSwitchButton v-model="restock" :label="t('dashboard.ops.refundDialog.restock')" />

      <div class="bg-bg-elevated border border-border-subtle rounded-md p-3 space-y-1.5 text-xs">
        <div class="flex justify-between text-tx-secondary">
          <span>{{ t('dashboard.ops.refundDialog.itemsSubtotal') }}</span>
          <span class="font-mono">{{ fmt(itemsTotal) }}</span>
        </div>
        <div class="flex justify-between text-tx-secondary">
          <span>{{ t('dashboard.ops.refundDialog.shipping') }}</span>
          <span class="font-mono">{{ fmt(shippingNum) }}</span>
        </div>
        <div class="flex justify-between pt-2 border-t border-border-subtle font-semibold">
          <span>{{ t('dashboard.ops.refundDialog.total') }}</span>
          <span class="font-mono text-base text-danger">{{ fmt(total) }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <LazyVButton
          variant="ghost"
          size="none"
          className="px-4 py-2 text-xs"
          :label="t('dashboard.ops.refundDialog.cancel')"
          @click="emit('update:modelValue', false)"
        />
        <LazyVButton
          size="none"
          className="px-4 py-2 text-xs"
          :disabled="total <= 0"
          :label="t('dashboard.ops.refundDialog.confirm')"
          @click="confirm"
        />
      </div>
    </template>
  </LazyVDialog>
</template>

<script lang="ts" setup>
import type { RefundLineInput, RefundPayload } from '@/types/fulfillment'

interface Row extends RefundLineInput {
  max: number
  amount: number
}

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    lines: RefundLineInput[]
    shippingPaid?: number
    currency?: string
  }>(),
  { shippingPaid: 0, currency: 'EGP' },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: [payload: RefundPayload]
}>()

const { t } = useI18n()

const rows = ref<Row[]>([])
const shipping = ref<string | number>(0)
const reason = ref('customer')
const restock = ref(true)

const reasonOptions = computed(() =>
  ['customer', 'damaged', 'wrongItem', 'unavailable', 'other'].map((r) => ({
    value: r,
    label: t(`dashboard.ops.refundDialog.reasons.${r}`),
  })),
)

function reset() {
  rows.value = props.lines.map((l) => ({ ...l, max: l.qty, qty: 0, amount: 0 }))
  shipping.value = 0
  reason.value = 'customer'
  restock.value = true
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) reset()
  },
  { immediate: true },
)

function setQty(row: Row, v: string | number | boolean) {
  const q = Math.min(row.max, Math.max(0, Math.floor(Number(v) || 0)))
  row.qty = q
  row.amount = Math.round(q * row.unitPrice * 100) / 100
}

function setAmount(row: Row, v: string | number | boolean) {
  row.amount = Math.max(0, Number(v) || 0)
}

const fmt = (n: number) => `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${props.currency}`
const itemsTotal = computed(() => rows.value.reduce((s, r) => s + r.amount, 0))
const shippingNum = computed(() => Math.min(props.shippingPaid, Math.max(0, Number(shipping.value) || 0)))
const total = computed(() => itemsTotal.value + shippingNum.value)

function confirm() {
  if (total.value <= 0) return
  emit('confirm', {
    lines: rows.value.filter((r) => r.qty > 0 || r.amount > 0).map((r) => ({ sku: r.sku, qty: r.qty, amount: r.amount })),
    shipping: shippingNum.value,
    reason: reason.value,
    restock: restock.value,
    total: total.value,
  })
  emit('update:modelValue', false)
}
</script>
