<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.privacy.title')"
          :subtitle="t('dashboard.ops.privacy.subtitle')"
          :count="requests.length"
        />

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <section v-if="tab === 'requests'" class="card overflow-hidden">
          <LazyVTable v-if="requests.length" :headers="requestHeaders" :items="requests">
            <template #cell(id)="{ item }">
              <span class="font-mono text-xs font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(customer)="{ item }">
              <p class="text-sm">{{ item.customer }}</p>
              <p class="font-mono text-[11px] text-tx-muted">{{ item.email }}</p>
            </template>
            <template #cell(type)="{ item }">
              <status-pill :tone="typeTones[item.type]">{{ t(`dashboard.ops.privacy.types.${item.type}`) }}</status-pill>
            </template>
            <template #cell(requestedAt)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.requestedAt }}</span>
            </template>
            <template #cell(dueAt)="{ item }">
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs">{{ item.dueAt }}</span>
                <status-pill v-if="item.status !== 'completed'" :tone="slaTone(item.daysLeft)">
                  {{ item.daysLeft < 0 ? t('dashboard.ops.privacy.sla.overdue') : t('dashboard.ops.privacy.sla.daysLeft', { n: item.daysLeft }) }}
                </status-pill>
              </div>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="statusTones[item.status]">{{ t(`dashboard.ops.privacy.status.${item.status}`) }}</status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end gap-2">
                <LazyVButton
                  v-if="item.status === 'open'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.privacy.process')"
                  @click="setStatus(item.id, 'processing')"
                />
                <LazyVButton
                  v-if="item.status === 'processing'"
                  size="none"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.privacy.complete')"
                  @click="complete(item.id, item.type)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.privacy.emptyRequests')"
            :hint="t('dashboard.ops.privacy.emptyRequestsHint')"
            icon="ph:user-circle-minus-bold"
          />
        </section>

        <section v-else-if="tab === 'consent'" class="card overflow-hidden">
          <LazyVTable v-if="consents.length" :headers="consentHeaders" :items="consents">
            <template #cell(contact)="{ item }">
              <span class="font-mono text-xs">{{ item.contact }}</span>
            </template>
            <template #cell(channel)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.privacy.channels.${item.channel}`) }}</span>
            </template>
            <template #cell(given)="{ item }">
              <status-pill :tone="item.given ? 'success' : 'danger'">
                {{ item.given ? t('dashboard.ops.privacy.consent.given') : t('dashboard.ops.privacy.consent.withdrawn') }}
              </status-pill>
            </template>
            <template #cell(source)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.privacy.sources.${item.source}`) }}</span>
            </template>
            <template #cell(at)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.at }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.privacy.emptyConsent')"
            :hint="t('dashboard.ops.privacy.emptyConsentHint')"
            icon="ph:check-square-bold"
          />
        </section>

        <template v-else>
          <section class="card p-4 space-y-4">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.privacy.retention.title') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LazyVSelectInput
                v-for="k in retentionKeys"
                :key="k"
                v-model="retention[k]"
                :label="t(`dashboard.ops.privacy.retention.${k}`)"
                :options="periodOptions"
              />
            </div>
          </section>

          <section class="rounded-lg border border-info/30 bg-info-dim p-4 flex items-start gap-3">
            <Icon name="ph:scales-bold" class="text-xl text-info shrink-0 mt-0.5" />
            <div class="space-y-1">
              <p class="text-sm font-semibold">{{ t('dashboard.ops.privacy.law.title') }}</p>
              <p class="text-xs text-tx-secondary">{{ t('dashboard.ops.privacy.law.body') }}</p>
              <p class="text-[11px] text-tx-muted">{{ t('dashboard.ops.privacy.law.disclaimer') }}</p>
            </div>
          </section>

          <section class="card overflow-hidden">
            <div class="px-4 py-3 border-b border-border-subtle">
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.privacy.subprocessors.title') }}</h2>
            </div>
            <LazyVTable v-if="subprocessors.length" :headers="subHeaders" :items="subprocessors">
              <template #cell(name)="{ item }">
                <span class="text-sm">{{ item.name }}</span>
              </template>
              <template #cell(purpose)="{ item }">
                <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.privacy.subprocessors.purposes.${item.purpose}`) }}</span>
              </template>
              <template #cell(region)="{ item }">
                <span class="font-mono text-xs">{{ item.region }}</span>
              </template>
            </LazyVTable>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.privacy.subprocessors.empty')"
              :hint="t('dashboard.ops.privacy.subprocessors.emptyHint')"
              icon="ph:buildings-bold"
            />
          </section>
        </template>
      </div>
    </div>

    <LazyVDialog v-model="confirmOpen" :title="t('dashboard.ops.privacy.confirmDelete.title')">
      <div class="p-4 space-y-4">
        <p class="text-xs text-tx-secondary">{{ t('dashboard.ops.privacy.confirmDelete.body') }}</p>
        <div class="flex justify-end gap-2">
          <LazyVButton
            variant="ghost"
            size="none"
            className="px-4 py-2 text-xs"
            :label="t('dashboard.ops.privacy.confirmDelete.cancel')"
            @click="confirmOpen = false"
          />
          <LazyVButton
            size="none"
            className="px-4 py-2 text-xs"
            :label="t('dashboard.ops.privacy.confirmDelete.confirm')"
            @click="confirmDelete"
          />
        </div>
      </div>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { DataRequestType, RetentionSettings } from '@/types/trust'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.privacy.title') })

const store = useTrustPrivacyStore()
const { requests, consents, retention, subprocessors } = storeToRefs(store)
const { setStatus } = store

const tab = ref('requests')
const tabs = computed(() => [
  { name: t('dashboard.ops.privacy.tabs.requests'), value: 'requests', count: requests.value.length },
  { name: t('dashboard.ops.privacy.tabs.consent'), value: 'consent', count: consents.value.length },
  { name: t('dashboard.ops.privacy.tabs.retention'), value: 'retention' },
])

const confirmOpen = ref(false)
const pendingId = ref('')

function complete(id: string, type: DataRequestType) {
  if (type === 'delete') {
    pendingId.value = id
    confirmOpen.value = true
    return
  }
  setStatus(id, 'completed')
}
function confirmDelete() {
  setStatus(pendingId.value, 'completed')
  confirmOpen.value = false
}

const typeTones: Record<string, Tone> = { export: 'info', delete: 'danger', correct: 'purple' }
const statusTones: Record<string, Tone> = { open: 'warning', processing: 'info', completed: 'success' }
function slaTone(daysLeft: number): Tone {
  if (daysLeft < 0) return 'danger'
  return daysLeft <= 7 ? 'warning' : 'success'
}

const retentionKeys: (keyof RetentionSettings)[] = ['orders', 'customers', 'logs', 'abandoned']
const periodOptions = computed(() =>
  ['90d', '1y', '3y', '5y', '10y'].map((p) => ({ value: p, label: t(`dashboard.ops.privacy.retention.periods.${p}`) })),
)

const requestHeaders = computed(() => [
  { key: 'id', label: t('dashboard.ops.privacy.id') },
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'type', label: t('dashboard.ops.privacy.type') },
  { key: 'requestedAt', label: t('dashboard.ops.privacy.requestedAt') },
  { key: 'dueAt', label: t('dashboard.ops.privacy.dueAt') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])
const consentHeaders = computed(() => [
  { key: 'contact', label: t('dashboard.ops.privacy.contact') },
  { key: 'channel', label: t('dashboard.ops.privacy.channel') },
  { key: 'given', label: t('dashboard.ops.privacy.consentLabel') },
  { key: 'source', label: t('dashboard.ops.privacy.source') },
  { key: 'at', label: t('dashboard.ops.privacy.timestamp') },
])
const subHeaders = computed(() => [
  { key: 'name', label: t('dashboard.ops.privacy.subprocessors.name') },
  { key: 'purpose', label: t('dashboard.ops.privacy.subprocessors.purpose') },
  { key: 'region', label: t('dashboard.ops.privacy.subprocessors.region') },
])
</script>
