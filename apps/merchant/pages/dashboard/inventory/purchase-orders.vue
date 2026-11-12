<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.purchaseOrders.title')"
          :subtitle="t('dashboard.ops.purchaseOrders.subtitle')"
          :count="orders.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.purchaseOrders.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.purchaseOrders.stats.open')"
            :value="orders.filter((o) => o.status === 'ordered' || o.status === 'partial').length"
            iconName="ph:truck-bold"
            iconColor="text-info"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.purchaseOrders.stats.value')"
            :value="money(openValue)"
            iconName="ph:receipt-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.purchaseOrders.stats.received')"
            :value="orders.filter((o) => o.status === 'received').length"
            iconName="ph:check-circle-bold"
            iconColor="text-success"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="orders.length" :headers="headers" :items="orders">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(expectedAt)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.expectedAt }}</span>
            </template>
            <template #cell(items)="{ item }">
              <span class="font-mono text-xs">{{ item.items }}</span>
            </template>
            <template #cell(total)="{ item }">
              <span class="font-mono text-sm">{{ money(item.total) }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.purchaseOrders.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end gap-2">
                <LazyVButton
                  v-if="item.status === 'draft'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.purchaseOrders.place')"
                  @click="setStatus(item.id, 'ordered')"
                />
                <LazyVButton
                  v-if="item.status === 'ordered' || item.status === 'partial'"
                  size="none"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.purchaseOrders.receive')"
                  @click="setStatus(item.id, 'received')"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.purchaseOrders.empty')"
            :hint="t('dashboard.ops.purchaseOrders.emptyHint')"
            icon="ph:clipboard-text-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.purchaseOrders.create')"
      :subtitle="t('dashboard.ops.purchaseOrders.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVSelectInput
          v-model="form.supplier"
          :label="t('dashboard.ops.purchaseOrders.supplier')"
          :options="supplierOptions"
        />
        <LazyVInput v-model="form.expectedAt" type="date" :label="t('dashboard.ops.purchaseOrders.expected')" required />
        <LazyVInput v-model="form.items" type="number" :label="t('dashboard.ops.common.items')" required />
        <LazyVInput v-model="form.total" type="number" :label="t('dashboard.ops.purchaseOrders.total')" required />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.purchaseOrders.create')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.purchaseOrders.title') })

const store = useCatalogPurchaseOrdersStore()
const { orders } = storeToRefs(store)
const { setStatus } = store
const { suppliers } = storeToRefs(useCatalogSuppliersStore())

const isOpen = ref(false)
const form = reactive({ supplier: '', expectedAt: '', items: '' as string | number, total: '' as string | number })

const supplierOptions = computed(() => suppliers.value.map((s) => ({ value: s.name, label: s.name })))

const openValue = computed(() =>
  orders.value.filter((o) => o.status === 'ordered' || o.status === 'partial').reduce((s, o) => s + o.total, 0),
)

const tones: Record<string, Tone> = {
  draft: 'neutral',
  ordered: 'info',
  partial: 'warning',
  received: 'success',
}

const headers = computed(() => [
  { key: 'id', label: t('dashboard.ops.purchaseOrders.po') },
  { key: 'supplier', label: t('dashboard.ops.purchaseOrders.supplier') },
  { key: 'expectedAt', label: t('dashboard.ops.purchaseOrders.expected') },
  { key: 'items', label: t('dashboard.ops.common.items') },
  { key: 'total', label: t('dashboard.ops.purchaseOrders.total') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

function submit() {
  const supplier = form.supplier || supplierOptions.value[0]?.value
  const items = Number(form.items)
  const total = Number(form.total)
  if (!supplier || !form.expectedAt || !items || !total) return
  store.add({ supplier, expectedAt: form.expectedAt, items, total })
  Object.assign(form, { supplier: '', expectedAt: '', items: '', total: '' })
  isOpen.value = false
}
</script>
