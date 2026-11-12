<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.tracking.title')"
          :subtitle="t('dashboard.ops.tracking.subtitle')"
          :count="shipments.length"
        />

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.tracking.stats.deliveredRate')"
            :value="`${deliveredRate}%`"
            iconName="ph:check-circle-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.tracking.stats.avgTime')"
            :value="t('dashboard.ops.tracking.days', { n: avgDays })"
            iconName="ph:timer-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.tracking.stats.inTransit')"
            :value="inTransitCount"
            iconName="ph:truck-bold"
            iconColor="text-info"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.tracking.stats.exceptions')"
            :value="exceptionCount"
            iconName="ph:warning-bold"
            iconColor="text-danger"
          />
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div v-for="k in exceptionKinds" :key="k" class="card px-4 py-3 flex items-center justify-between">
            <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.tracking.state.${k}`) }}</span>
            <span class="font-mono text-lg font-semibold">{{ shipments.filter((s) => s.state === k).length }}</span>
          </div>
        </div>

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <section class="card overflow-hidden">
          <LazyVTable v-if="filtered.length" :headers="headers" :items="filtered">
            <template #cell(tracking)="{ item }">
              <div>
                <span class="font-mono text-sm font-semibold text-brand">{{ item.tracking }}</span>
                <p class="text-[10px] text-tx-muted">{{ courierLabel(item.courier) }}</p>
              </div>
            </template>
            <template #cell(orderId)="{ item }">
              <div>
                <span class="font-mono text-xs">{{ item.orderId }}</span>
                <p class="text-[10px] text-tx-muted">{{ item.customer }} · {{ item.governorate }}</p>
              </div>
            </template>
            <template #cell(lastEvent)="{ item }">
              <div v-if="item.events[0]">
                <p class="text-xs">{{ t(`dashboard.ops.tracking.events.${item.events[0].label}`) }}</p>
                <p class="font-mono text-[10px] text-tx-muted">{{ item.events[0].at }}</p>
              </div>
            </template>
            <template #cell(attempts)="{ item }">
              <span class="font-mono text-xs">{{ item.attempts }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.state]">
                {{ t(`dashboard.ops.tracking.state.${item.state}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end gap-2">
                <LazyVButton
                  v-if="item.state === 'failedAttempt' || item.state === 'refused'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.tracking.retry')"
                  @click="retry(item.id)"
                />
                <LazyVButton
                  v-if="item.state === 'failedAttempt' || item.state === 'refused'"
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.tracking.returnToSender')"
                  @click="returnToSender(item.id)"
                />
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.tracking.events.title')"
                  @click="openEvents(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.tracking.empty')"
            :hint="t('dashboard.ops.tracking.emptyHint')"
            icon="ph:truck-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      :title="active ? active.tracking : ''"
      :subtitle="active ? `${active.orderId} · ${courierLabel(active.courier)}` : ''"
    >
      <ol v-if="active" class="space-y-4 p-1">
        <li v-for="(ev, i) in active.events" :key="i" class="flex gap-3">
          <span
            class="w-2 h-2 rounded-full mt-1.5 shrink-0"
            :class="i === 0 ? 'bg-brand' : 'bg-border-default'"
          />
          <div>
            <p class="text-xs font-semibold">{{ t(`dashboard.ops.tracking.events.${ev.label}`) }}</p>
            <p class="text-[10px] text-tx-muted">
              {{ ev.location }} · <span class="font-mono">{{ ev.at }}</span>
            </p>
          </div>
        </li>
      </ol>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { FulfilCourier, TrackingState } from '@/types/fulfillment'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.tracking.title') })

const store = useFulfilTrackingStore()
const { shipments } = storeToRefs(store)
const { retry, returnToSender } = store

const exceptionKinds: TrackingState[] = ['failedAttempt', 'refused', 'rto']
const isException = (s: TrackingState) => exceptionKinds.includes(s)

const tab = ref('all')
const tabs = computed(() => [
  { name: t('dashboard.ops.common.all'), value: 'all', count: shipments.value.length },
  { name: t('dashboard.ops.tracking.exceptionsTab'), value: 'exceptions', count: exceptionCount.value },
])

const exceptionCount = computed(() => shipments.value.filter((s) => isException(s.state)).length)
const inTransitCount = computed(
  () => shipments.value.filter((s) => s.state === 'inTransit' || s.state === 'outForDelivery').length,
)
const filtered = computed(() =>
  tab.value === 'exceptions' ? shipments.value.filter((s) => isException(s.state)) : shipments.value,
)

const deliveredRate = computed(() => {
  if (!shipments.value.length) return 0
  const delivered = shipments.value.filter((s) => s.state === 'delivered').length
  return Math.round((delivered / shipments.value.length) * 100)
})
const avgDays = computed(() => {
  const done = shipments.value.filter((s) => s.deliveryDays !== null)
  if (!done.length) return 0
  return Math.round((done.reduce((s, x) => s + (x.deliveryDays ?? 0), 0) / done.length) * 10) / 10
})

const tones: Record<string, Tone> = {
  inTransit: 'info',
  outForDelivery: 'purple',
  delivered: 'success',
  failedAttempt: 'warning',
  refused: 'danger',
  rto: 'danger',
}

const courierNames: Record<FulfilCourier, string> = { bosta: 'Bosta', aramex: 'Aramex', jt: 'J&T', manual: '' }
const courierLabel = (c: FulfilCourier) =>
  c === 'manual' ? t('dashboard.ops.fulfillment.manual') : courierNames[c]

const headers = computed(() => [
  { key: 'tracking', label: t('dashboard.ops.tracking.tracking') },
  { key: 'orderId', label: t('dashboard.ops.common.order') },
  { key: 'lastEvent', label: t('dashboard.ops.tracking.lastEvent') },
  { key: 'attempts', label: t('dashboard.ops.tracking.attempts') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

const panelOpen = ref(false)
const activeId = ref('')
const active = computed(() => shipments.value.find((s) => s.id === activeId.value))
function openEvents(id: string) {
  activeId.value = id
  panelOpen.value = true
}
</script>
