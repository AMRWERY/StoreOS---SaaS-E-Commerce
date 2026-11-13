<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.cod.title')"
          :subtitle="t('dashboard.ops.cod.subtitle')"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.cod.stats.pending')"
            :value="confirmations.filter((c) => c.status === 'pending').length"
            iconName="ph:phone-call-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.cod.stats.toCollect')"
            :value="money(pendingRemittance)"
            iconName="ph:hand-coins-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.cod.stats.blocked')"
            :value="blocklist.length"
            iconName="ph:prohibit-bold"
            iconColor="text-danger"
          />
        </div>

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <!-- Confirmation queue -->
        <section v-if="tab === 'confirmations'" class="card overflow-hidden">
          <LazyVTable v-if="confirmations.length" :headers="confirmHeaders" :items="confirmations">
            <template #cell(orderId)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.orderId }}</span>
            </template>
            <template #cell(phone)="{ item }">
              <span class="font-mono text-xs" dir="ltr">{{ item.phone }}</span>
            </template>
            <template #cell(amount)="{ item }">
              <span class="font-mono text-sm">{{ money(item.amount) }}</span>
            </template>
            <template #cell(attempts)="{ item }">
              <span class="font-mono text-xs">{{ item.attempts }}</span>
            </template>
            <template #cell(risk)="{ item }">
              <status-pill :tone="riskTones[item.risk]">{{ t(`dashboard.ops.cod.risk.${item.risk}`) }}</status-pill>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="confirmTones[item.status]">
                {{ t(`dashboard.ops.cod.confirmStatus.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div v-if="item.status === 'pending' || item.status === 'no_answer'" class="flex justify-end gap-2">
                <LazyVButton
                  size="none"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.cod.confirm')"
                  @click="setConfirmation(item.orderId, 'confirmed')"
                />
                <LazyVButton
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.cod.noAnswer')"
                  @click="setConfirmation(item.orderId, 'no_answer')"
                />
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.cod.refused')"
                  @click="setConfirmation(item.orderId, 'refused')"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.cod.emptyConfirmations')"
            icon="ph:phone-call-bold"
          />
        </section>

        <!-- Remittance -->
        <section v-else-if="tab === 'remittance'" class="card overflow-hidden">
          <LazyVTable v-if="remittances.length" :headers="remitHeaders" :items="remittances">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(orders)="{ item }">
              <span class="font-mono text-sm">{{ item.orders }}</span>
            </template>
            <template #cell(collected)="{ item }">
              <span class="font-mono text-sm">{{ money(item.collected) }}</span>
            </template>
            <template #cell(fees)="{ item }">
              <span class="font-mono text-sm text-tx-muted">{{ money(item.fees) }}</span>
            </template>
            <template #cell(net)="{ item }">
              <span class="font-mono text-sm font-semibold">{{ money(item.collected - item.fees) }}</span>
            </template>
            <template #cell(date)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.date }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="remitTones[item.status]">
                {{ t(`dashboard.ops.cod.remitStatus.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.cod.emptyRemittance')"
            icon="ph:hand-coins-bold"
          />
        </section>

        <!-- Blocklist -->
        <section v-else class="space-y-4">
          <form class="card p-4 flex flex-wrap items-end gap-3" @submit.prevent="addBlock">
            <div class="flex-1 min-w-[200px]">
              <LazyVInput v-model="blockPhone" :label="t('dashboard.ops.cod.phone')" placeholder="+20 1XX XXX XXXX" />
            </div>
            <div class="min-w-[200px]">
              <LazyVSelectInput v-model="blockReason" :label="t('dashboard.ops.cod.reason')" :options="reasonOptions" />
            </div>
            <LazyVButton type="submit" :label="t('dashboard.ops.cod.addToBlocklist')" />
          </form>

          <div class="card overflow-hidden">
            <LazyVTable v-if="blocklist.length" :headers="blockHeaders" :items="blocklist">
              <template #cell(phone)="{ item }">
                <span class="font-mono text-sm" dir="ltr">{{ item.phone }}</span>
              </template>
              <template #cell(reason)="{ item }">
                <status-pill tone="danger">{{ t(`dashboard.ops.cod.reasons.${item.reason}`) }}</status-pill>
              </template>
              <template #cell(refusals)="{ item }">
                <span class="font-mono text-sm">{{ item.refusals }}</span>
              </template>
              <template #cell(addedAt)="{ item }">
                <span class="font-mono text-xs text-tx-muted">{{ item.addedAt }}</span>
              </template>
              <template #cell(actions)="{ item }">
                <button
                  class="text-[11px] font-semibold text-tx-muted hover:text-danger transition-colors"
                  @click="unblock(item.id)"
                >
                  {{ t('dashboard.ops.cod.unblock') }}
                </button>
              </template>
            </LazyVTable>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.cod.emptyBlocklist')"
              icon="ph:prohibit-bold"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BlockedContact, Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.cod.title') })

const store = useCodStore()
const { confirmations, remittances, blocklist } = storeToRefs(store)
const { setConfirmation, unblock } = store

const tab = ref('confirmations')
const tabs = computed(() => [
  { name: t('dashboard.ops.cod.tabs.confirmations'), value: 'confirmations', count: confirmations.value.length },
  { name: t('dashboard.ops.cod.tabs.remittance'), value: 'remittance', count: remittances.value.length },
  { name: t('dashboard.ops.cod.tabs.blocklist'), value: 'blocklist', count: blocklist.value.length },
])

const pendingRemittance = computed(() =>
  remittances.value.filter((r) => r.status !== 'settled').reduce((s, r) => s + r.collected - r.fees, 0),
)

const riskTones: Record<string, Tone> = { low: 'success', medium: 'warning', high: 'danger' }
const confirmTones: Record<string, Tone> = {
  pending: 'warning',
  confirmed: 'success',
  no_answer: 'neutral',
  refused: 'danger',
}
const remitTones: Record<string, Tone> = {
  pending: 'warning',
  settled: 'success',
  disputed: 'danger',
}

const confirmHeaders = computed(() => [
  { key: 'orderId', label: t('dashboard.ops.common.order') },
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'phone', label: t('dashboard.ops.cod.phone') },
  { key: 'governorate', label: t('dashboard.ops.cod.governorate') },
  { key: 'amount', label: t('dashboard.ops.common.amount') },
  { key: 'attempts', label: t('dashboard.ops.cod.attempts'), align: 'center' as const },
  { key: 'risk', label: t('dashboard.ops.cod.riskLabel') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])
const remitHeaders = computed(() => [
  { key: 'id', label: t('dashboard.ops.cod.batch') },
  { key: 'courier', label: t('dashboard.ops.cod.courier') },
  { key: 'orders', label: t('dashboard.ops.cod.ordersCount'), align: 'center' as const },
  { key: 'collected', label: t('dashboard.ops.cod.collected') },
  { key: 'fees', label: t('dashboard.ops.cod.fees') },
  { key: 'net', label: t('dashboard.ops.cod.net') },
  { key: 'date', label: t('dashboard.ops.common.date') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])
const blockHeaders = computed(() => [
  { key: 'phone', label: t('dashboard.ops.cod.phone') },
  { key: 'reason', label: t('dashboard.ops.cod.reason') },
  { key: 'refusals', label: t('dashboard.ops.cod.refusals'), align: 'center' as const },
  { key: 'addedAt', label: t('dashboard.ops.common.date') },
  { key: 'actions', label: '', align: 'end' as const },
])

const blockPhone = ref('')
const blockReason = ref<BlockedContact['reason']>('merchant_blocked')
const reasonOptions = computed(() =>
  (['refused_parcels', 'fake_orders', 'merchant_blocked'] as const).map((r) => ({
    value: r,
    label: t(`dashboard.ops.cod.reasons.${r}`),
  })),
)

function addBlock() {
  if (!blockPhone.value.trim()) return
  store.block(blockPhone.value.trim(), blockReason.value)
  blockPhone.value = ''
}
</script>
