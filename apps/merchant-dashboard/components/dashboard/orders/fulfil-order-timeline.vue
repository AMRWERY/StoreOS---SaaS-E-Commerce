<template>
  <div>
    <ol v-if="events.length" class="relative space-y-5">
      <li v-for="(ev, i) in events" :key="ev.id" class="relative flex gap-3">
        <span
          v-if="i < events.length - 1"
          class="absolute top-8 bottom-[-20px] start-[13px] w-px bg-border-subtle"
          aria-hidden="true"
        />
        <span
          class="w-[27px] h-[27px] shrink-0 rounded-full flex items-center justify-center text-[13px]"
          :class="toneClass[ev.type]"
        >
          <Icon :name="icons[ev.type]" />
        </span>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-3">
            <p class="text-xs font-semibold text-tx-primary">
              {{ t(`dashboard.ops.orderTimeline.events.${ev.type}`) }}
            </p>
            <span class="font-mono text-[10px] text-tx-muted whitespace-nowrap">{{ ev.at }}</span>
          </div>
          <p class="text-[10px] text-tx-muted mt-0.5">
            {{ t('dashboard.ops.orderTimeline.by') }}
            {{ ev.actor === 'system' ? t('dashboard.ops.orderTimeline.system') : ev.actor }}
          </p>
          <p
            v-if="ev.note"
            class="text-xs text-tx-secondary mt-1.5 bg-bg-elevated border border-border-subtle rounded-md px-2.5 py-1.5"
            :class="{ 'font-mono': ev.type === 'refund' || ev.type === 'paid' }"
          >
            {{ ev.note }}
          </p>
        </div>
      </li>
    </ol>
    <ops-empty-state
      v-else
      :title="t('dashboard.ops.orderTimeline.empty')"
      :hint="t('dashboard.ops.orderTimeline.emptyHint')"
      icon="ph:clock-counter-clockwise-bold"
    />
  </div>
</template>

<script lang="ts" setup>
import type { OrderEvent, OrderEventType } from '@/types/fulfillment'

defineProps<{ events: OrderEvent[] }>()

const { t } = useI18n()

const icons: Record<OrderEventType, string> = {
  created: 'ph:shopping-bag-bold',
  paid: 'ph:credit-card-bold',
  confirmed: 'ph:check-circle-bold',
  packed: 'ph:package-bold',
  shipped: 'ph:truck-bold',
  delivered: 'ph:house-line-bold',
  refund: 'ph:receipt-x-bold',
  note: 'ph:note-pencil-bold',
}

const toneClass: Record<OrderEventType, string> = {
  created: 'bg-bg-elevated text-tx-secondary',
  paid: 'bg-success-dim text-success',
  confirmed: 'bg-info-dim text-info',
  packed: 'bg-brand-dim text-brand',
  shipped: 'bg-brand-dim text-brand',
  delivered: 'bg-success-dim text-success',
  refund: 'bg-danger-dim text-danger',
  note: 'bg-warning-dim text-warning',
}
</script>
