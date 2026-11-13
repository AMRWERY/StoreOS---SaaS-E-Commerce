<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.emailDomain.title')"
          :subtitle="t('dashboard.ops.emailDomain.subtitle')"
          :count="records.length"
        >
          <LazyVButton
            icon="ph:seal-check-bold"
            :label="t('dashboard.ops.emailDomain.verify')"
            @click="verify"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.emailDomain.stats.sent')"
            :value="stats.sent.toLocaleString('en-US')"
            iconName="ph:paper-plane-tilt-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.emailDomain.stats.bounce')"
            :value="`${stats.bounceRate}%`"
            iconName="ph:arrow-bend-up-left-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.emailDomain.stats.complaint')"
            :value="`${stats.complaintRate}%`"
            iconName="ph:flag-bold"
            iconColor="text-danger"
          />
        </div>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-semibold">{{ t('dashboard.ops.emailDomain.senderSettings') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LazyVInput
              v-model="domain"
              :label="t('dashboard.ops.emailDomain.domain')"
              placeholder="mail.example.com"
              inputClass="font-mono"
            />
            <LazyVInput v-model="senderName" :label="t('dashboard.ops.emailDomain.senderName')" />
            <div class="space-y-2">
              <LazyVInput
                v-model="fromAddress"
                :label="t('dashboard.ops.emailDomain.fromAddress')"
                inputClass="font-mono"
              />
              <p class="text-[11px] text-tx-muted font-mono" dir="ltr">{{ fromAddress }}&#64;{{ domain }}</p>
            </div>
          </div>
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.emailDomain.dnsRecords') }}</h2>
            <p class="text-[11px] text-tx-muted mt-0.5">{{ t('dashboard.ops.emailDomain.dnsHint') }}</p>
          </div>
          <LazyVTable v-if="records.length" :headers="dnsHeaders" :items="records">
            <template #cell(purpose)="{ item }">
              <span class="text-xs font-semibold">{{ t(`dashboard.ops.emailDomain.purposes.${item.purpose}`) }}</span>
            </template>
            <template #cell(type)="{ item }">
              <span class="font-mono text-xs font-semibold text-brand">{{ item.type }}</span>
            </template>
            <template #cell(host)="{ item }">
              <span class="font-mono text-xs break-all">{{ item.host }}</span>
            </template>
            <template #cell(value)="{ item }">
              <span class="font-mono text-xs text-tx-secondary break-all">{{ item.value }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="dnsTones[item.status]">
                {{ t(`dashboard.ops.emailDomain.dnsStatus.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-2 py-1 text-[11px]"
                  icon="ph:copy-bold"
                  :label="t('dashboard.ops.emailDomain.copy')"
                  @click="copy(item.value)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.emailDomain.emptyRecords')"
            :hint="t('dashboard.ops.emailDomain.emptyRecordsHint')"
            icon="ph:globe-bold"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle flex flex-wrap items-end gap-3">
            <div class="me-auto">
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.emailDomain.suppression') }}</h2>
              <p class="text-[11px] text-tx-muted mt-0.5">{{ t('dashboard.ops.emailDomain.suppressionHint') }}</p>
            </div>
            <div class="w-56">
              <LazyVInput
                v-model="newAddress"
                :label="t('dashboard.ops.emailDomain.address')"
                placeholder="name@example.com"
                inputClass="font-mono"
              />
            </div>
            <div class="w-40">
              <LazyVSelectInput
                v-model="newReason"
                :label="t('dashboard.ops.emailDomain.reason')"
                :options="reasonOptions"
              />
            </div>
            <LazyVButton
              size="none"
              icon="ph:plus-bold"
              className="px-3 py-2 text-xs"
              :label="t('dashboard.ops.emailDomain.add')"
              @click="addEntry"
            />
          </div>
          <LazyVTable v-if="suppression.length" :headers="supHeaders" :items="suppression">
            <template #cell(address)="{ item }">
              <span class="font-mono text-xs">{{ item.address }}</span>
            </template>
            <template #cell(reason)="{ item }">
              <status-pill :tone="reasonTones[item.reason]">
                {{ t(`dashboard.ops.emailDomain.reasons.${item.reason}`) }}
              </status-pill>
            </template>
            <template #cell(date)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.date }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.emailDomain.remove')"
                  @click="removeSuppressed(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.emailDomain.emptySuppression')"
            :hint="t('dashboard.ops.emailDomain.emptySuppressionHint')"
            icon="ph:envelope-simple-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { SuppressionReason } from '@/types/trust'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.emailDomain.title') })

const store = useTrustEmailDomainStore()
const { domain, senderName, fromAddress, records, suppression, stats } = storeToRefs(store)
const { verify, removeSuppressed, addSuppressed } = store

const newAddress = ref('')
const newReason = ref<SuppressionReason>('bounced')

const dnsTones: Record<string, Tone> = { verified: 'success', pending: 'warning', failed: 'danger' }
const reasonTones: Record<string, Tone> = { bounced: 'warning', complained: 'danger', unsubscribed: 'neutral' }

const reasonOptions = computed(() =>
  (['bounced', 'complained', 'unsubscribed'] as SuppressionReason[]).map((r) => ({
    value: r,
    label: t(`dashboard.ops.emailDomain.reasons.${r}`),
  })),
)

function copy(value: string) {
  if (import.meta.client) navigator.clipboard?.writeText(value).catch(() => {})
}
function addEntry() {
  addSuppressed(newAddress.value, newReason.value)
  newAddress.value = ''
}

const dnsHeaders = computed(() => [
  { key: 'purpose', label: t('dashboard.ops.emailDomain.purpose') },
  { key: 'type', label: t('dashboard.ops.emailDomain.dnsType') },
  { key: 'host', label: t('dashboard.ops.emailDomain.dnsHost') },
  { key: 'value', label: t('dashboard.ops.emailDomain.dnsValue') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])
const supHeaders = computed(() => [
  { key: 'address', label: t('dashboard.ops.emailDomain.address') },
  { key: 'reason', label: t('dashboard.ops.emailDomain.reason') },
  { key: 'date', label: t('dashboard.ops.common.date') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
