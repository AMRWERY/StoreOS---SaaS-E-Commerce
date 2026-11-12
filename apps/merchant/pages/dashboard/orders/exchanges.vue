<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.exchanges.title')"
          :subtitle="t('dashboard.ops.exchanges.subtitle')"
          :count="exchanges.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.exchanges.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.exchanges.stats.open')"
            :value="openCount"
            iconName="ph:arrows-left-right-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.exchanges.stats.completed')"
            :value="exchanges.filter((e) => e.status === 'completed').length"
            iconName="ph:check-circle-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.exchanges.stats.diff')"
            :value="signedMoney(diffTotal)"
            iconName="ph:coins-bold"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="exchanges.length" :headers="headers" :items="exchanges">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(orderId)="{ item }">
              <div>
                <span class="font-mono text-xs">{{ item.orderId }}</span>
                <p class="text-[10px] text-tx-muted">{{ item.customer }}</p>
              </div>
            </template>
            <template #cell(items)="{ item }">
              <div class="flex items-center gap-2 text-xs">
                <span class="text-tx-secondary">{{ item.returnedItem }}</span>
                <Icon name="ph:arrow-right-bold" class="text-tx-muted rtl:rotate-180 shrink-0" />
                <span class="font-semibold">{{ item.replacementItem }}</span>
              </div>
            </template>
            <template #cell(priceDiff)="{ item }">
              <span
                class="font-mono text-sm"
                :class="item.priceDiff > 0 ? 'text-warning' : item.priceDiff < 0 ? 'text-success' : 'text-tx-muted'"
              >
                {{ signedMoney(item.priceDiff) }}
              </span>
            </template>
            <template #cell(createdAt)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.createdAt }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.exchanges.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  v-if="item.status === 'requested'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.exchanges.markShipped')"
                  @click="setStatus(item.id, 'shipped')"
                />
                <LazyVButton
                  v-else-if="item.status === 'shipped'"
                  size="none"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.exchanges.complete')"
                  @click="setStatus(item.id, 'completed')"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.exchanges.empty')"
            :hint="t('dashboard.ops.exchanges.emptyHint')"
            icon="ph:arrows-left-right-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.exchanges.create')"
      :subtitle="t('dashboard.ops.exchanges.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.orderId" :label="t('dashboard.ops.exchanges.originalOrder')" input-class="font-mono" required />
        <LazyVInput v-model="form.customer" :label="t('dashboard.ops.common.customer')" required />
        <LazyVInput v-model="form.returnedItem" :label="t('dashboard.ops.exchanges.returnedItem')" required />
        <LazyVInput v-model="form.replacementItem" :label="t('dashboard.ops.exchanges.replacementItem')" required />
        <LazyVInput
          v-model="form.priceDiff"
          type="number"
          :label="t('dashboard.ops.exchanges.priceDiff')"
          input-class="font-mono"
        />
        <p class="text-[10px] text-tx-muted">{{ t('dashboard.ops.exchanges.priceDiffHint') }}</p>
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.exchanges.create')" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.exchanges.title') })

const store = useFulfilExchangesStore()
const { exchanges } = storeToRefs(store)
const { setStatus } = store

const isOpen = ref(false)
const form = reactive({
  orderId: '',
  customer: '',
  returnedItem: '',
  replacementItem: '',
  priceDiff: 0 as string | number,
})

const openCount = computed(() => exchanges.value.filter((e) => e.status !== 'completed').length)
const diffTotal = computed(() => exchanges.value.reduce((s, e) => s + e.priceDiff, 0))

const signedMoney = (n: number) => (n > 0 ? `+${money(n)}` : money(n))

const tones: Record<string, Tone> = {
  requested: 'warning',
  shipped: 'purple',
  completed: 'success',
}

const headers = computed(() => [
  { key: 'id', label: t('dashboard.ops.exchanges.id') },
  { key: 'orderId', label: t('dashboard.ops.exchanges.originalOrder') },
  { key: 'items', label: t('dashboard.ops.exchanges.swap') },
  { key: 'priceDiff', label: t('dashboard.ops.exchanges.priceDiff') },
  { key: 'createdAt', label: t('dashboard.ops.common.date') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

function submit() {
  if (!form.orderId.trim() || !form.customer.trim() || !form.returnedItem.trim() || !form.replacementItem.trim()) return
  store.create({
    orderId: form.orderId.trim(),
    customer: form.customer.trim(),
    returnedItem: form.returnedItem.trim(),
    replacementItem: form.replacementItem.trim(),
    priceDiff: Number(form.priceDiff) || 0,
  })
  Object.assign(form, { orderId: '', customer: '', returnedItem: '', replacementItem: '', priceDiff: 0 })
  isOpen.value = false
}
</script>
