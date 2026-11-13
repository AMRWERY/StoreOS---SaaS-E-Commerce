<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.fulfillment.title')"
          :subtitle="t('dashboard.ops.fulfillment.subtitle')"
          :count="orders.length"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.fulfillment.stats.toPack')"
            :value="countOf('toPack')"
            iconName="ph:package-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.fulfillment.stats.inTransit')"
            :value="countOf('shipped')"
            iconName="ph:truck-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.fulfillment.stats.exceptions')"
            :value="countOf('exception')"
            iconName="ph:warning-bold"
            iconColor="text-danger"
          />
        </div>

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <p
          v-if="notice"
          class="text-xs bg-success-dim text-success border border-border-subtle rounded-md px-3 py-2"
        >
          {{ notice }}
        </p>

        <section class="card overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border-subtle">
            <label class="flex items-center gap-2 text-xs text-tx-secondary cursor-pointer">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-border-default bg-bg-elevated accent-brand"
                :checked="allSelected"
                :disabled="!filtered.length"
                @change="toggleAll"
              />
              <span>{{ t('dashboard.ops.fulfillment.selectAll') }}</span>
              <span v-if="selected.length" class="font-mono text-tx-muted">({{ selected.length }})</span>
            </label>
            <div class="flex gap-2">
              <LazyVButton
                variant="secondary"
                size="none"
                icon="ph:printer-bold"
                iconPosition="left"
                className="px-3 py-1.5 text-[11px]"
                :disabled="!selected.length"
                :label="t('dashboard.ops.fulfillment.printSlips')"
                @click="printSlips"
              />
              <LazyVButton
                size="none"
                icon="ph:barcode-bold"
                iconPosition="left"
                className="px-3 py-1.5 text-[11px]"
                :disabled="!selected.length"
                :label="t('dashboard.ops.fulfillment.buyLabels')"
                @click="bulkLabels"
              />
            </div>
          </div>

          <LazyVTable v-if="filtered.length" :headers="headers" :items="filtered">
            <template #cell(select)="{ item }">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-border-default bg-bg-elevated accent-brand"
                :checked="selected.includes(item.id)"
                :aria-label="item.id"
                @change="toggleOne(item.id)"
              />
            </template>
            <template #cell(order)="{ item }">
              <div>
                <span class="font-mono text-sm font-semibold text-brand">{{ item.orderId }}</span>
                <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
              </div>
            </template>
            <template #cell(customer)="{ item }">
              <div>
                <p class="text-xs font-semibold">{{ item.customer }}</p>
                <p class="text-[10px] text-tx-muted">{{ item.governorate }}</p>
              </div>
            </template>
            <template #cell(items)="{ item }">
              <span class="font-mono text-xs">
                {{ shippedUnits(item) }}/{{ totalUnits(item) }}
              </span>
            </template>
            <template #cell(courier)="{ item }">
              <span class="text-xs text-tx-secondary">
                {{ item.packages.length ? courierLabel(item.packages[0].courier) : '—' }}
              </span>
            </template>
            <template #cell(tracking)="{ item }">
              <span v-if="item.packages.length" class="font-mono text-xs">
                {{ item.packages[0].tracking }}
                <span v-if="item.packages.length > 1" class="text-tx-muted">+{{ item.packages.length - 1 }}</span>
              </span>
              <span v-else class="text-tx-muted">—</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.fulfillment.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.fulfillment.open')"
                  @click="openPanel(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.fulfillment.empty')"
            :hint="t('dashboard.ops.fulfillment.emptyHint')"
            icon="ph:package-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      width="lg"
      :title="active ? active.orderId : ''"
      :subtitle="active ? `${active.customer} · ${active.governorate}` : ''"
    >
      <div v-if="active" class="space-y-6 p-1">
        <section class="space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="text-[10px] font-bold text-tx-secondary tracking-wider">
              {{ t('dashboard.ops.fulfillment.pickList') }}
            </h4>
            <status-pill :tone="tones[active.status]">
              {{ t(`dashboard.ops.fulfillment.status.${active.status}`) }}
            </status-pill>
          </div>
          <ul class="border border-border-subtle rounded-md divide-y divide-border-subtle">
            <li v-for="line in active.lines" :key="line.sku" class="flex items-center gap-3 px-3 py-2.5">
              <input
                type="checkbox"
                class="w-4 h-4 rounded border-border-default bg-bg-elevated accent-brand"
                :checked="line.picked"
                :disabled="active.status !== 'toPack'"
                :aria-label="line.name"
                @change="store.togglePick(active.id, line.sku)"
              />
              <div class="min-w-0 flex-1">
                <p class="text-xs font-semibold truncate" :class="{ 'line-through text-tx-muted': line.picked }">
                  {{ line.name }}
                </p>
                <p class="text-[10px] text-tx-muted">
                  <span class="font-mono">{{ line.sku }}</span>
                  · {{ t('dashboard.ops.fulfillment.bin') }}
                  <span class="font-mono text-tx-secondary">{{ line.bin }}</span>
                </p>
              </div>
              <span class="font-mono text-xs">
                {{ line.shippedQty }}/{{ line.qty }}
              </span>
            </li>
          </ul>
          <LazyVButton
            v-if="active.status === 'toPack'"
            variant="secondary"
            size="none"
            icon="ph:package-bold"
            iconPosition="left"
            className="px-3 py-1.5 text-[11px]"
            :label="t('dashboard.ops.fulfillment.markPacked')"
            @click="store.markPacked(active.id)"
          />
        </section>

        <section v-if="active.packages.length" class="space-y-2">
          <h4 class="text-[10px] font-bold text-tx-secondary tracking-wider">
            {{ t('dashboard.ops.fulfillment.packages') }}
            <span class="font-mono">({{ active.packages.length }})</span>
          </h4>
          <ul class="space-y-2">
            <li
              v-for="pkg in active.packages"
              :key="pkg.id"
              class="bg-bg-elevated border border-border-subtle rounded-md px-3 py-2 text-xs"
            >
              <div class="flex items-center justify-between">
                <span class="font-mono font-semibold">{{ pkg.id }} · {{ pkg.tracking }}</span>
                <span class="text-tx-secondary">{{ courierLabel(pkg.courier) }}</span>
              </div>
              <p class="font-mono text-[10px] text-tx-muted mt-1">
                {{ pkg.weightKg }} kg · {{ pkg.lengthCm }}×{{ pkg.widthCm }}×{{ pkg.heightCm }} cm ·
                {{ pkg.lines.map((l) => `${l.sku} ×${l.qty}`).join(', ') }}
              </p>
            </li>
          </ul>
        </section>

        <form
          v-if="canShip"
          class="space-y-4 border-t border-border-subtle pt-5"
          @submit.prevent="createShipment"
        >
          <h4 class="text-[10px] font-bold text-tx-secondary tracking-wider">
            {{ t('dashboard.ops.fulfillment.newPackage') }}
          </h4>
          <p class="text-[10px] text-tx-muted">{{ t('dashboard.ops.fulfillment.splitHint') }}</p>

          <div class="space-y-2">
            <p class="text-[10px] font-bold text-tx-secondary tracking-wider">
              {{ t('dashboard.ops.fulfillment.qtyInPackage') }}
            </p>
            <div
              v-for="line in shippable"
              :key="line.sku"
              class="grid grid-cols-[1fr_90px] items-center gap-3"
            >
              <div class="min-w-0">
                <p class="text-xs truncate">{{ line.name }}</p>
                <p class="font-mono text-[10px] text-tx-muted">
                  {{ t('dashboard.ops.fulfillment.remaining') }} {{ line.qty - line.shippedQty }}
                </p>
              </div>
              <LazyVInput
                :model-value="form.qty[line.sku] ?? 0"
                type="number"
                input-class="font-mono"
                @update:model-value="setQty(line, $event)"
              />
            </div>
          </div>

          <LazyVSelectInput
            v-model="form.courier"
            :label="t('dashboard.ops.fulfillment.courier')"
            :options="courierOptions"
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <LazyVInput v-model="form.weightKg" type="number" :label="t('dashboard.ops.fulfillment.weight')" input-class="font-mono" />
            <LazyVInput v-model="form.lengthCm" type="number" :label="t('dashboard.ops.fulfillment.length')" input-class="font-mono" />
            <LazyVInput v-model="form.widthCm" type="number" :label="t('dashboard.ops.fulfillment.width')" input-class="font-mono" />
            <LazyVInput v-model="form.heightCm" type="number" :label="t('dashboard.ops.fulfillment.height')" input-class="font-mono" />
          </div>

          <LazyVButton
            type="submit"
            class="w-full"
            icon="ph:truck-bold"
            iconPosition="left"
            :disabled="!packageUnits"
            :label="t('dashboard.ops.fulfillment.createShipment')"
          />
        </form>

        <div v-if="active.status === 'shipped'" class="flex gap-2 border-t border-border-subtle pt-5">
          <LazyVButton
            variant="secondary"
            size="none"
            className="px-3 py-1.5 text-[11px]"
            :label="t('dashboard.ops.fulfillment.markDelivered')"
            @click="store.setStatus(active.id, 'delivered')"
          />
          <LazyVButton
            variant="ghost"
            size="none"
            className="px-3 py-1.5 text-[11px]"
            :label="t('dashboard.ops.fulfillment.flagException')"
            @click="store.setStatus(active.id, 'exception')"
          />
        </div>
      </div>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { FulfilCourier, FulfilLine, FulfilOrder, FulfilStatus } from '@/types/fulfillment'

const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.fulfillment.title') })

const store = useFulfilBoardStore()
const { orders } = storeToRefs(store)

const statuses: FulfilStatus[] = ['toPack', 'packed', 'shipped', 'delivered', 'exception']
const tab = ref<string>('toPack')
const selected = ref<string[]>([])
const notice = ref('')
const panelOpen = ref(false)
const activeId = ref('')

const countOf = (s: FulfilStatus) => orders.value.filter((o) => o.status === s).length

const tabs = computed(() =>
  statuses.map((s) => ({
    name: t(`dashboard.ops.fulfillment.status.${s}`),
    value: s,
    count: countOf(s),
  })),
)

const filtered = computed(() => orders.value.filter((o) => o.status === tab.value))

watch(tab, () => {
  selected.value = []
})

const allSelected = computed(
  () => filtered.value.length > 0 && filtered.value.every((o) => selected.value.includes(o.id)),
)

function toggleAll() {
  selected.value = allSelected.value ? [] : filtered.value.map((o) => o.id)
}

function toggleOne(id: string) {
  selected.value = selected.value.includes(id)
    ? selected.value.filter((x) => x !== id)
    : [...selected.value, id]
}

const tones: Record<string, Tone> = {
  toPack: 'warning',
  packed: 'info',
  shipped: 'purple',
  delivered: 'success',
  exception: 'danger',
}

const courierNames: Record<FulfilCourier, string> = {
  bosta: 'Bosta',
  aramex: 'Aramex',
  jt: 'J&T',
  manual: '',
}
const courierLabel = (c: FulfilCourier) =>
  c === 'manual' ? t('dashboard.ops.fulfillment.manual') : courierNames[c]
const courierOptions = computed(() =>
  (Object.keys(courierNames) as FulfilCourier[]).map((c) => ({ value: c, label: courierLabel(c) })),
)

const totalUnits = (o: FulfilOrder) => o.lines.reduce((s, l) => s + l.qty, 0)
const shippedUnits = (o: FulfilOrder) => o.lines.reduce((s, l) => s + l.shippedQty, 0)

const headers = computed(() => [
  { key: 'select', label: '' },
  { key: 'order', label: t('dashboard.ops.common.order') },
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'items', label: t('dashboard.ops.common.items') },
  { key: 'courier', label: t('dashboard.ops.fulfillment.courier') },
  { key: 'tracking', label: t('dashboard.ops.fulfillment.tracking') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

function printSlips() {
  navigateTo({
    path: localePath('/dashboard/orders/packing-slips'),
    query: { ids: selected.value.join(',') },
  })
}

function bulkLabels() {
  const n = store.buyLabels(selected.value)
  notice.value = t('dashboard.ops.fulfillment.labelsBought', { n })
  selected.value = []
}

// Side panel
const active = computed(() => orders.value.find((o) => o.id === activeId.value))
const shippable = computed(() => (active.value?.lines ?? []).filter((l) => l.qty - l.shippedQty > 0))
const canShip = computed(
  () => !!active.value && (active.value.status === 'toPack' || active.value.status === 'packed') && shippable.value.length > 0,
)

const form = reactive({
  courier: 'bosta' as FulfilCourier,
  weightKg: 1 as string | number,
  lengthCm: 30 as string | number,
  widthCm: 20 as string | number,
  heightCm: 10 as string | number,
  qty: {} as Record<string, number>,
})

function resetQty() {
  form.qty = Object.fromEntries(shippable.value.map((l) => [l.sku, l.qty - l.shippedQty]))
}

function openPanel(id: string) {
  activeId.value = id
  resetQty()
  panelOpen.value = true
}

function setQty(line: FulfilLine, v: string | number | boolean) {
  const max = line.qty - line.shippedQty
  form.qty[line.sku] = Math.min(max, Math.max(0, Math.floor(Number(v) || 0)))
}

const packageUnits = computed(() => Object.values(form.qty).reduce((s, q) => s + q, 0))

function createShipment() {
  if (!active.value || !packageUnits.value) return
  const pkg = store.createShipment(active.value.id, {
    courier: form.courier,
    weightKg: Number(form.weightKg) || 0,
    lengthCm: Number(form.lengthCm) || 0,
    widthCm: Number(form.widthCm) || 0,
    heightCm: Number(form.heightCm) || 0,
    lines: Object.entries(form.qty).map(([sku, qty]) => ({ sku, qty })),
  })
  if (pkg) notice.value = t('dashboard.ops.fulfillment.shipmentCreated', { tracking: pkg.tracking })
  resetQty()
}
</script>
